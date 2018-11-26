// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import $ from 'jquery'
import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import './assets/bootstrap-3.3.7-dist/js/bootstrap.min.js' 
import Notice from 'iview';

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    Notice,
    components: { App },
    template: '<App/>'
})
