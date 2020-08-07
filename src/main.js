import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'
import './bus'


import axios from 'axios'
import VueAxios from 'vue-axios'
import currencyFilter from './filters/currency.js';
import dateFilter from './filters/datefilter';
import TrueFalseTranslate from './filters/TrueFalseTranslate';
import {
  ValidationProvider,
  ValidationObserver,
  extend
} from 'vee-validate';

import {
  required,
  email
} from 'vee-validate/dist/rules'

extend('email', email)

extend('required', { // 這邊可以改寫我們 email 告知使用者是必填欄位的提示文字
  ...required,
  message: '請填入資料'
})

import {
  localize
} from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'

localize('zh_TW', TW)



// Add a rule，此範例中添加了一個名為'secret'的規則，若 value 值不為 'example'，就會回饋 message 裡的文字。
extend('secret', {
  validate: value => value === 'example',
  message: '請填入資料'
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

Vue.component('Loading', Loading);

Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)
Vue.filter('TFT', TrueFalseTranslate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');





router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {

    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    const vm = this;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next()
      } else {
        alert("這裡需要登入");
        next({
          path: "/login"
        })
      }
    })
  } else {
    next()
  }
}, )