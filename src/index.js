/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/**
  * vue-owin-auth
  * (c) 2020 craigp@codehq.co.za
  * @license MIT
  */

const AspnetAuth = require('./owin-auth');

const vueOwinAuth = {};
/**
 * Plugin API
 */
// eslint-disable-next-line func-names
vueOwinAuth.install = function (Vue, options) {
  Vue.$auth = new AspnetAuth(options);
};

/**
 * Auto install
 */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueOwinAuth);
}

export default vueOwinAuth;
