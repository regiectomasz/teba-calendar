import { getRandomInt, getFirstDateTimeInMonthByDate, getLastDateTimeInMonthByDate } from '@/utils';

const keyName = `${process.env.VUE_APP_LOCAL_STORAGE_KEY}_events`;

export const eventsMixin = {
  methods: {
    createEvent(title, date = new Date(), startTime = '00:00', endTime = '00:00', description = '') {
      const id = Math.random()
        .toString(36)
        .substr(2, 9);

      return {
        id,
        date,
        color: '#'.concat(
          Math.floor(Math.random() * 16777215).toString(16),
        ),
        startTime,
        endTime,
        description,
        title: title || `event - ${id}`,
      };
    },
    updateEvent(event) {
      const eventsList = this.fetchEvents();

      if (event && event.id) {
        const eventId = event.id;
        const index = eventsList.findIndex((e) => e.id === eventId);

        if (index > 1) {
          eventsList[index] = event;
        } else {
          console.log(event);
          eventsList.push(event);
        }

        this.saveEvents(eventsList);
      }

      return eventsList;
    },
    removeEvent(event) {
      const eventsList = this.fetchEvents();

      if (event && event.id) {
        const eventId = event.id;
        const index = eventsList.findIndex((e) => e.id === eventId);

        if (index > 1) {
          eventsList.splice(index, 1);
          this.saveEvents(eventsList);
        }
      }

      return eventsList;
    },
    generateEvents(count, startDate, endDate) {
      return new Array(count).fill('')
        .map((v, i) => {
          const dateTime = getRandomInt(startDate.getTime(), endDate.getTime());
          const startTime = getRandomInt(0, 23);
          const endTime = getRandomInt(startTime, 23);

          return this.createEvent(
            `Generated event - ${i}`,
            new Date(dateTime),
            `${('0'.concat(startTime)).substr(-2)}:00`,
            `${('0'.concat(endTime)).substr(-2)}:00`,
          );
        });
    },
    generateEventsInMonthFromDate(count = 100, date = new Date()) {
      return this.generateEvents(
        count,
        getFirstDateTimeInMonthByDate(date),
        getLastDateTimeInMonthByDate(date),
      );
    },
    fetchEvents() {
      let events = [];

      try {
        events = JSON.parse(localStorage.getItem(keyName));
        events = Array.isArray(events) ? events : [];

        events.forEach((event) => {
          // eslint-disable-next-line no-param-reassign
          event.date = new Date(event.date);
        });
      } catch (e) {
        console.warn(e);
        localStorage.removeItem(keyName);
      }

      return events;
    },
    saveEvents(events) {
      localStorage.setItem(keyName, JSON.stringify(events));
    },
  },
};

export default eventsMixin;
