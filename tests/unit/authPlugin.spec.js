/* eslint-disable import/no-unresolved */
import { expect } from 'chai';
import { createLocalVue } from '@vue/test-utils';
// eslint-disable-next-line import/extensions
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
    expect(localVue.$auth).to.not.eq(undefined);
    expect(localVue.$auth).to.not.eq(null);
    expect(localVue.$auth.login).to.be.a('function');
  });
});
