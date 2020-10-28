/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/**
  * vue-owin-auth
  * (c) 2020 craigp@codehq.co.za
  * @license MIT
  */

import AspnetAuth from './AspnetAuth';

const vueOwinAuth = {};

// eslint-disable-next-line func-names
vueOwinAuth.install = function (Vue, options) {
  AspnetAuth.init(options);
  Vue.prototype.$auth = AspnetAuth;
};

/**
 * Auto install
 */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueOwinAuth);
}

export default vueOwinAuth;
