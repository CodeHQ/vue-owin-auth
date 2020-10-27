/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/**
  * vue-owin-auth
  * (c) 2020 craigp@codehq.co.za
  * @license MIT
  */

const OwinAuth = require('./owin-auth');

const auth = {};
/**
 * Plugin API
 */
// eslint-disable-next-line func-names
auth.install = function (Vue, options) {
  Vue.$auth = new OwinAuth(options);
};

/**
 * Auto install
 */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(auth);
}

export default auth;
