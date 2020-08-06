<template>
  <div class="teba-month-view">
    <h2>
      <span>{{ monthName | capitalize }}</span> <span>{{ year }}</span>
    </h2>

    <div class="weekdays-headers">
      <div class="day"
           v-for="weekdayName in weekdayNames"
           :key="weekdayName"
      >
        {{ weekdayName | capitalize }}
      </div>
    </div>

    <div class="calendar-body">
      <div class="week"
           v-for="week in weeks"
           :key="`week-row-${week}`"
      >
        <div class="day"
             v-for="(day, index) in week"
             :key="`day-cell-${index}`"
        >
          <div class="day-content"
               v-if="day"
               @click="onClickDate(day)"
          >
            <slot name="dayContent">
              <template>
                <a>{{ day }}</a>
                <span class="badge btn-primary">{{ eventsMap[day - 1] | defaultValue(0) }}</span>
              </template>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { localeMixin, eventsMixin } from '@/mixins';
import { getDaysInMonthFromLocalDate, getFirstDateTimeInMonthByDate, getLastDateTimeInMonthByDate } from '@/utils';

export default {
  name: 'MonthView',
  mixins: [localeMixin, eventsMixin],
  props: {
    date: {
      type: Date,
      default() {
        return new Date();
      },
    },
  },
  data() {
    return {
      localeType: 'short',
    };
  },
  computed: {
    startDate() {
      return getFirstDateTimeInMonthByDate(this.date);
    },
    endDate() {
      return getLastDateTimeInMonthByDate(this.date);
    },
    daysInMonth() {
      return getDaysInMonthFromLocalDate(this.date);
    },
    year() {
      return this.date.getFullYear();
    },
    monthName() {
      return this.getMonthName(this.date);
    },
    weekdayNames() {
      return this.getWeekdayNames(this.localeType);
    },
    weeks() {
      const weeks = [];
      const firstDay = this.startDate.getDay();
      const { daysInMonth } = this;

      let date = 1;
      for (let week = 0; week < 6; week += 1) {
        weeks[week] = new Array(7).fill(null);
        for (let day = 0; day < 7; day += 1) {
          if (date > daysInMonth) {
            break;
          } else if (!(week === 0 && day < firstDay) || (date > daysInMonth)) {
            weeks[week][day] = date;
            date += 1;
          }
        }
      }

      return weeks;
    },
    eventsMap() {
      const eventsList = this.fetchEvents();
      const startDateTime = this.startDate.getTime();
      const endDateTime = this.endDate.getTime();
      const { daysInMonth } = this;

      return eventsList
        .filter((event) => {
          const eventTime = event.date.getTime();

          return eventTime >= startDateTime && eventTime <= endDateTime;
        })

        /* get event counts */
        .reduce((list, event) => {
          // eslint-disable-next-line no-param-reassign
          list[event.date.getDate() - 1] += 1;

          return list;
        }, new Array(daysInMonth).fill(0));

      // /* get events */
      // .reduce((list, event) => {
      //   list[event.date.getDate() - 1].push(event);
      //
      //   return list;
      // }, new Array(daysInMonth).fill([]));
    },
  },
  methods: {
    onClickDate(date) {
      this.$emit('on-click-date', new Date(this.date.getFullYear(), this.date.getMonth(), date));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/variable";

.teba-month-view {
  padding: .5em;
  margin-bottom: .5em;
  border-radius: 8px;
  background-color: rgba(white, .2);
}

.weekdays-headers {
  font-weight: bold;
  font-size: 1.5em;
  color: $black;
  margin-bottom: 4px;
  border-bottom: 1px solid $black;
}

.day {
  display: inline-block;
  position: relative;
  font-size: $baseFontSize;
  width: calc(100% / 7);
  text-align: center;
}

.week {
  border-bottom: 1px $black solid;

  .day-content {
    border-right: 1px $black solid;
  }

  &:first-child {
    .day-content {
      border-top: 1px $black solid;
      border-left: 1px $black solid;
    }
  }

  &:last-child {
    border-bottom: none;

    .day-content {
      border-bottom: 1px $black solid;
    }
  }

  .day {
    &:first-child {
      .day-content {
        border-left: 1px $black solid;
      }
    }
  }
}

.day-content {
  a {
    font-size: 1.25em;
    color: $black;
    display: block;
    cursor: pointer;
    padding: 20% 0 20% 0;
    text-shadow: 0 1px 0 $grayLight;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      text-decoration: none;
    }
  }
}

.badge {
  top: 2px;
  right: 2px;
  z-index: 0;
  position: absolute;
  background-color: $primary;
  border-radius: 0 4px 0 4px;
}

</style>
