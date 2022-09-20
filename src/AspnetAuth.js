/**
 * ASP.NET OWIN Auth Javascript Client (https://github.com/Halceyon/aspnet-auth)
 *
 * Copyright © 2020 Code HQ (Pty) Ltd. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const axios = require('axios');
const qs = require('qs');

const AspnetAuth = {
  init(options) {
    const defaults = {
      url: '',
      client_id: options.clientId,
      client_secret: options.secret,
    };
    this.options = Object.assign(defaults, options);

    if (this.options.url.length === 0) {
      throw this.options;
    }
    this.axios = axios;
    this.http = axios;
    axios.defaults.baseURL = this.options.url;
  },

  setupAxios(val) {
    // setup axios
    this.axios.interceptors.response.use(null, (error) => Promise.reject(error));
    this.axios.defaults.headers.common.Authorization = `Bearer ${val.access_token}`;
    return axios;
  },

  register(username, email, password) {
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.post('/api/account/register', {
      Username: username,
      Password: password,
      Email: email,
    });
  },

  /**
   * Register a new user user with an organization role.
   *
   * @param {username} username - The username
   * @param {email} email - The email
   * @param {password} password - The password
   * @param {role} password - The role
   * @return {Promise} returns axios promise
   *
   * @example
   *
   *     registerWithRole('joe@soap.com', ''joe@soap.com', 'Password01', 'AuroraAdmins')
   */
  registerWithRole(username, email, password, role) {
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.post('/api/account/register', {
      Username: username,
      Password: password,
      Email: email,
      Role: role,
    });
  },

  forgot(email) {
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.post('/api/account/forgotpassword', {
      email,
    });
  },

  login(username, password) {
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    axios.defaults.timeout = 15000;
    return this.http.post('/token', qs.stringify({
      username,
      password,
      client_id: this.options.client_id,
      client_secret: this.options.client_secret,
      grant_type: 'password',
    }))
      .then((response) => response);
  },

  loginTwoFactor(username, password, code) {
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.post('/token', qs.stringify({
      username,
      password,
      code,
      client_id: this.options.client_id,
      client_secret: this.options.client_secret,
      grant_type: 'password',
    }))
      .then((response) => {
        this.saveAuth(response.data);
        this.fillAuth();
        return response;
      });
  },

  loginExternal(tokenRequest) {
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.get(`/api/account/ObtainLocalAccessToken?externalAccessToken=${tokenRequest.externalAccessToken}&provider=${tokenRequest.provider}`)
      .then((response) => {
        this.saveAuth(response.data);
        this.fillAuth();
        return response;
      });
  },

  refreshToken(refreshToken) {
    const tokenRequest = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.options.client_id,
      client_secret: this.options.client_secret,
    };
    // strange quirk where the baseURL is not persisted
    axios.defaults.baseURL = this.options.url;
    return this.http.post('/token', qs.stringify(tokenRequest))
      .then((response) => response);
  },
};

export default AspnetAuth;
