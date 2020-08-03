<template>
  <div class="teba-calendar">
    <div>
      <h4>debugger</h4>
      <div>date: {{ date.toLocaleString() }}</div>
      <div>type: {{ type }}</div>
    </div>

    <div v-if="isDayType()">
      days
    </div>

    <div v-else-if="isMonthType()">
      month
    </div>

    <div v-else>
      Warning
    </div>
  </div>
</template>

<script>
import locale from '@/mixins/locale';
import { CALENDAR_TYPES, CALENDAR_TYPE_DAY, CALENDAR_TYPE_MONTH } from '@/constants';

export default {
  name: 'Calendar',
  mixins: [locale],
  props: {
    type: {
      type: String,
      default: CALENDAR_TYPE_MONTH,
      validator(value) {
        return CALENDAR_TYPES.includes(value);
      },
    },
    date: {
      type: Date,
      default() {
        return new Date();
      },
    },
  },
  methods: {
    isDayType() {
      return this.type === CALENDAR_TYPE_DAY;
    },
    isMonthType() {
      return this.type === CALENDAR_TYPE_MONTH;
    },
  },
};
</script>

<style scoped>

</style>
