import { shallowMount } from '@vue/test-utils';
import Calendar from '@/components/Calendar.vue';
import { CALENDAR_TYPE_MONTH } from '@/constants';

describe('Calendar.vue', () => {
  it('Valid type prop', () => {
    const type = CALENDAR_TYPE_MONTH;
    const wrapper = shallowMount(Calendar, {
      propsData: { type },
    });
    expect(wrapper.text()).toMatch(type);
  });
});
