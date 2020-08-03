<template>
  <div id="app">
    <div>
      <h3>Select calendar view</h3>
      <div>
        <button v-for="calendarType in calendarTypes"
                :key="calendarType"
                @click="changeCalendarType(calendarType)"
        >{{ calendarType | capitalize }} view</button>
      </div>
    </div>
    <Calendar :type="selectedCalendarType"/>
  </div>
</template>

<script>
import { CALENDAR_TYPES, CALENDAR_TYPE_MONTH } from '@/constants';
import Calendar from '@/components/Calendar.vue';

export default {
  name: 'App',
  components: {
    Calendar,
  },
  data() {
    return {
      calendarTypes: CALENDAR_TYPES,
      selectedCalendarType: CALENDAR_TYPE_MONTH,
    };
  },
  methods: {
    changeCalendarType(type) {
      this.selectedCalendarType = type;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
