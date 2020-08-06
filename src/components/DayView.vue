<template>
  <div class="teba-day-view">
    <div class="row">
      <div class="col-md-6">
        <div class="data-container">
          <h1>{{ day }}</h1>
          <h2>{{ weekdayName | capitalize }}</h2>
          <h3>
            <span>{{ month | capitalize }}</span>, <span>{{ year }}</span>
          </h3>
        </div>
      </div>
      <div class="col-md-6">
        <div class="data-container">
          <h1>
            <span>{{ weather.city }}</span>
          </h1>
          <div class="row">
            <div class="col-md-6">
              <h2>
                <span>{{ weather.temp }}&#730; C</span>
              </h2>
              <div class="weather-stat">
                <span>min: </span>
                <span>{{ weather.temp_min }}&#730; C</span>
              </div>
              <div class="weather-stat">
                <span>max: </span>
                <span>{{ weather.temp_max }}&#730; C</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="weather-stat">
                <span>Wind: </span>
                <span>{{ weather.wind }} Km/h</span>
              </div>
              <div class="weather-stat">
                <span>Humidity: </span>
                <span>{{ weather.humidity }} %</span>
              </div>
              <div class="weather-stat">
                <span>Pressure: </span>
                <span>{{ weather.pressure }} hPa</span>
              </div>
              <div class="weather-stat">
                <span>Sunrise: </span>
                <span>{{ weather.sunrise }}</span>
              </div>
              <div class="weather-stat">
                <span>Sunset: </span>
                <span>{{ weather.sunrise }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div v-if="event">
          <EventForm :event="event"
                     @on-apply="applyEvent"
                     @on-cancel="cancelEvent"/>
        </div>

        <div v-else>
          <div class="event-container" style="padding: 1em;">
            <a class="btn btn-sm btn-primary" type="button" @click="editEvent()">
              Add new event
            </a>
          </div>
          <div class="event-container"
               v-for="event in eventsList"
               :key="event.id"
          >
            <div class="event-body">
              <div class="event-time text-right">
                <div>
                  <span>From: </span>
                  <span>{{ event.startTime }}</span>
                </div>
                <div class="event-time-separator"> -</div>
                <div>
                  <span>To: </span>
                  <span>{{ event.endTime }}</span>
                </div>
              </div>
              <div class="event-divider" :style="{borderColor: event.color}"></div>
              <div class="event-text">
                <div class="event-title">{{ event.title }}</div>
                <div class="event-desc">{{ event.description }}</div>
              </div>
            </div>
            <div class="event-action">
              <div class="btn-group">
                <a class="btn btn-sm btn-primary" @click="editEvent(event)"> Edit </a>
                <a class="btn btn-sm btn-primary" @click="deleteEvent(event)"> Remove </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventsMixin, localeMixin } from '@/mixins';
import EventForm from '@/components/EventForm.vue';

export default {
  name: 'DayView',
  mixins: [localeMixin, eventsMixin],
  components: {
    EventForm,
  },
  props: {
    date: {
      type: Date,
      default() {
        return new Date();
      },
    },
    weatherData: Object,
  },
  created() {
    setInterval(() => {
      this.$emit('refresh-weather-data');
    }, 5 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.refreshWeatherId);
  },
  data() {
    return {
      event: null,
      events: this.fetchEvents(),
      refreshWeatherId: null,
    };
  },
  computed: {
    weather() {
      const w = this.weatherData;

      console.log(w.wind.speed);

      return {
        date: new Date(w.dt * 1000),
        city: w.name,
        temp: (w.main.temp - 273.15).toFixed(1),
        temp_min: (w.main.temp_min - 273.15).toFixed(1),
        temp_max: (w.main.temp_max - 273.15).toFixed(1),
        pressure: w.main.pressure,
        humidity: w.main.humidity,
        wind: w.wind.speed,
        sunset: new Date(w.sys.sunset * 1000).toLocaleTimeString(),
        sunrise: new Date(w.sys.sunrise * 1000).toLocaleTimeString(),
      };
    },
    year() {
      return this.date.getFullYear();
    },
    month() {
      return this.getMonthName(this.date);
    },
    day() {
      return this.date.getDate();
    },
    weekdayName() {
      return this.getWeekdayName(this.date);
    },
    eventsList() {
      const eventsList = this.events;
      const startDateTime = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
      ).getTime();
      const endDateTime = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        23, 59, 59, 999,
      ).getTime();

      return eventsList
        .filter((event) => {
          const eventTime = event.date.getTime();

          return eventTime >= startDateTime && eventTime <= endDateTime;
        })
        .sort((eventA, eventB) => {
          if (eventA.startTime < eventB.startTime) {
            return -1;
          }
          if (eventA.startTime > eventB.startTime) {
            return 1;
          }
          if (eventA.endTime < eventB.endTime) {
            return -1;
          }
          if (eventA.endTime > eventB.endTime) {
            return 1;
          }
          return 0;
        });
    },
  },
  methods: {
    backToMonth() {
      this.$emit('on-back-to-month', this.date);
    },
    applyEvent(event) {
      this.events = this.updateEvent(event);
      this.event = null;
    },
    cancelEvent() {
      this.event = null;
    },
    editEvent(event) {
      this.event = event || this.createEvent('', this.date);
    },
    deleteEvent(event) {
      this.events = this.removeEvent(event);
    },
  },
};
</script>

<style lang="scss" scoped>
.data-container {
  padding: .5em;
  margin-bottom: .5em;
  border-radius: 8px;
  background-color: rgba(white, .2);
}

.event-container {
  margin-bottom: .5em;
  position: relative;
  border-radius: 4px;
  background-color: rgba(white, .2);

  &:hover {
    .event-action {
      display: flex;
    }
  }
}

.event-body {
  display: flex;
}

.event-action {
  display: none;
  top: 0;
  right: 0;
  padding: .25em;
  align-items: center;
  vertical-align: center;
  position: absolute;
  border-radius: 4px;
  background-color: rgba(black, .2);
}

.event-divider {
  border: 1px solid black;
}

.event-time {
  padding: 0.5em;
  flex: 0 0 auto;
}

.event-time-separator {
  display: none;
  padding: 0 1em;
}

.event-text {
  padding: 0.5em;
  flex: 0 0 auto;
  text-align: left;
}

.event-title {
  font-size: 1.25em;
}

.event-desc {
  font-size: 0.75em;
}

@media only screen and (max-width: 768px) {
  .event-body {
    flex-direction: column;
  }
  .event-time {
    display: flex;
  }
  .event-time-separator {
    display: block;
  }
  .event-action {
    display: block;
  }
}

.weather-stat{
  display: flex;
  text-align: right;

  span {
    width: 50%;

    &:last-child{
      text-align: left;
      padding-left: 20px;
    }
  }
}

</style>
