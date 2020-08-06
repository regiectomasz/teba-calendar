<template>
  <div class="teba-calendar">
    <div class="controls">
      <a class="pull-left btn btn-sm btn-primary" @click="prev()"> &lt;</a>
      <slot name="control" :types="types" :change-type="changeType"></slot>
      <a class="pull-right btn btn-sm btn-primary" @click="next()"> &gt;</a>
    </div>

    <div v-if="isDayType">
      <DayView
        :date="date"
        :weather-data="weatherData"
        @on-back-to-month="changeType"
        @refresh-weather-data="fetchWeatherData"
      />
    </div>

    <div v-else-if="isMonthType">
      <MonthView
        :date="date"
        @on-click-date="clickDate"
      />
    </div>
  </div>
</template>

<script>
import { localeMixin } from '@/mixins';
import { CALENDAR_TYPES, CALENDAR_TYPE_DAY, CALENDAR_TYPE_MONTH } from '@/constants';
import DayView from '@/components/DayView.vue';
import MonthView from '@/components/MonthView.vue';

export default {
  name: 'Calendar',
  components: {
    DayView,
    MonthView,
  },
  mixins: [localeMixin],
  props: {
    initDate: {
      type: Date,
      default() {
        return new Date();
      },
    },
  },
  data() {
    return {
      date: this.initDate,
      type: CALENDAR_TYPE_MONTH,
      types: CALENDAR_TYPES,
      weatherData: null,
    };
  },
  created() {
    this.fetchWeatherData();
  },
  computed: {
    isDayType() {
      return this.type === CALENDAR_TYPE_DAY;
    },
    isMonthType() {
      return this.type === CALENDAR_TYPE_MONTH;
    },
  },
  methods: {
    prev() {
      switch (this.type) {
        case CALENDAR_TYPE_DAY:
          this.prevDay();
          break;
        case CALENDAR_TYPE_MONTH:
          this.prevMonth();
          break;
        default:
          console.log(this.type);
      }
    },
    next() {
      switch (this.type) {
        case CALENDAR_TYPE_DAY:
          this.nextDay();
          break;
        case CALENDAR_TYPE_MONTH:
          this.nextMonth();
          break;
        default:
          console.log(this.type);
      }
    },
    prevDay() {
      const date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1);
      this.changeDate(date);
    },
    nextDay() {
      const date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1);
      this.changeDate(date);
    },
    nextMonth() {
      const date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
      this.changeDate(date);
    },
    prevMonth() {
      const date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
      this.changeDate(date);
    },
    nextYear() {
      const date = new Date(this.date.getFullYear() + 1, this.date.getMonth(), 1);
      this.changeDate(date);
    },
    prevYear() {
      const date = new Date(this.date.getFullYear() - 1, this.date.getMonth(), 1);
      this.changeDate(date);
    },
    changeDate(date) {
      this.date = date;
    },
    changeType(type = CALENDAR_TYPE_MONTH) {
      this.type = type;
    },
    clickDate(date) {
      this.date = date;
      this.type = CALENDAR_TYPE_DAY;
    },
    async fetchWeatherData() {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=poznan&appid=${process.env.VUE_APP_OPEN_WEATHER_MAP_KEY}`);
        this.weatherData = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    // fetchWeatherData() {
    //   fetch(`https://api.openweathermap.org/data/2.5/weather?q=poznan&appid=${process.env.VUE_APP_OPEN_WEATHER_MAP_KEY}`)
    //     .then((response) => response.json())
    //     .then((result) => {
    //       this.weatherData = result;
    //     })
    //     .catch((error) => (console.log(error)));
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/variable";

.teba-calendar {
  font-size: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: rgba($white, .2);
}

.controls {
  padding: 1em;
  display: flex;
  justify-content: space-between;

  h4 {
    font-size: 1.5em;
    display: inline;
  }
}

</style>
