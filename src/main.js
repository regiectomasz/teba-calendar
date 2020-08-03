import Vue from 'vue';
import filters from '@/filters';
import App from './App.vue';

Vue.config.productionTip = false;

// register all filters
// eslint-disable-next-line no-restricted-syntax
for (const [key, value] of Object.entries(filters)) {
  Vue.filter(key, value);
}

new Vue({
  render: (h) => h(App),
}).$mount('#app');
