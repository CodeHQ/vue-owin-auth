/* eslint-disable import/no-unresolved */
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
// eslint-disable-next-line import/extensions
import DummyApp from '~src/App.vue';
import authPlugin from '~src/vueOwinAuth';

const localVue = createLocalVue();
const options = {
  clientId: 'testClient',
  secret: 'mySecret',
  url: 'https://localhost',
};
localVue.use(authPlugin, options);

describe('authPlugin', () => {
  it('shouldAllow', () => {
    const wrapper = mount(DummyApp, {
      localVue,
    });
    expect(wrapper.vm.$auth).to.not.eq(undefined);
    expect(wrapper.vm.$auth).to.not.eq(null);
    expect(wrapper.vm.$auth.login).to.be.a('function');
  });
});
