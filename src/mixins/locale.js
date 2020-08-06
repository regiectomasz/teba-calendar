export const localeMixin = {
  methods: {
    /**
     * Get locale month name of date
     * @param date
     * @param type
     * @param locales
     * @returns {string}
     */
    getMonthName(date, type = 'long', locales = 'default') {
      return date.toLocaleString(locales, { month: type });
    },

    /**
     * Get locale month names
     * @param type
     * @param locales
     * @returns {string[]}
     */
    getMonthNames(type = 'long', locales = 'default') {
      return new Array(12).fill('')
        .map((v, i) => this.getMonthName(new Date(1989, i, 1), type, locales));
    },

    /**
     * Get locale weekday name of date
     * @param date
     * @param type
     * @param locales
     * @returns {string}
     */
    getWeekdayName(date, type = 'long', locales = 'default') {
      return date.toLocaleString(locales, { weekday: type });
    },

    /**
     * Get locale weekday names
     *
     * 1989 january - because it start from sunday
     * @param type
     * @param locales
     * @returns {string[]}
     */
    getWeekdayNames(type = 'long', locales = 'default') {
      return new Array(7).fill('')
        .map((v, i) => this.getWeekdayName(new Date(1989, 0, i + 1), type, locales));
    },
  },
};

export default localeMixin;
