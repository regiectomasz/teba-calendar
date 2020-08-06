<template>
  <div id="app">
    <div class="container">
      <Calendar>
        <template slot="control" slot-scope="{ types, changeType }">
          <div>
            <div class="btn-group">
              <button class="btn btn-primary"
                      v-for="type in types"
                      :key="type"
                      @click="changeType(type)"
              >
                {{ type | capitalize }} view
              </button>
            </div>
          </div>
        </template>
      </Calendar>
    </div>
  </div>
</template>

<script>
import { eventsMixin } from '@/mixins';
import Calendar from '@/components/Calendar.vue';
import { CALENDAR_TYPE_MONTH } from '@/constants';

export default {
  name: 'App',
  components: {
    Calendar,
  },
  data() {
    return {
      type: CALENDAR_TYPE_MONTH,
    };
  },
  mixins: [eventsMixin],
  created() {
    const eventsList = this.fetchEvents();
    if (eventsList.length === 0) {
      this.saveEvents(this.generateEventsInMonthFromDate());
    }
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import 'src/styles/variable';
@import 'src/styles/bootstrap-light';

#app {
  width: 100vw;
  height: 100vh;
  padding-top: 24px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: auto;
  background: rgb(255,213,124);
  background: linear-gradient(0deg, rgba(255,213,124,1) 0%, rgba(134,124,255,1) 100%);
}
</style>
