import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Dashboard from '../views/Dashboard.vue'
import Customerorder from '../views/customerorder.vue'
import CustomerCheckOut from '../views/customercheckout.vue'
import About from '../views/About.vue'
import Index from '../views/HomeInfo.vue'
import Cart from '../views/Cart.vue'
import Contact from '../views/contact.vue'
import test from '../views/test.vue'
import customerOrder from '../views/productinfo.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,

    children: [{

        path: 'products',
        name: 'Products',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/prouducts.vue')
      },
      {

        path: 'orders',
        name: 'Orders',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/Orders.vue')
      },
      {

        path: 'coupons',
        name: 'Coupons',
        meta: {
          requiresAuth: true
        },
        component: () => import('../views/Coupons.vue')
      },

    ]
  },

  {

    path: '*',
    redirect: 'index'

  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [
      // {

      //   path: 'customer_order',
      //   name: 'Customerorder',

      //   component: Customerorder,
      // },
      // {

      //   path: 'customer_check_out/:orderId',
      //   name: 'CustomerCheckOut',

      //   component: CustomerCheckOut,
      // },
      {
        path: '/',
        name: 'Index',
        component: Index,
      },
      {
        path: 'about',
        name: 'About',
        component: About,
      },
      {

        path: 'customer_order',
        name: 'Customerorder',

        component: Customerorder,
        // children: [{

        //   path: 'product/:productId',
        //   name: 'customerOrder',

        //   component: customerOrder,
        // }, ]
      },
      {

        path: 'customer_check_out/:orderId',
        name: 'CustomerCheckOut',

        component: CustomerCheckOut,
      },
      {

        path: 'cart',
        name: 'Cart',

        component: Cart,
      },
      {

        path: 'contact',
        name: 'Contact',

        component: Contact,
      },
      {

        path: 'test',
        name: 'test',

        component: test,
      },
      {

        path: 'product/:productId',
        name: 'customerOrder',

        component: customerOrder,
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,

    // children: [{

    //     path: 'customer_order',
    //     name: 'Customerorder',

    //     component: Customerorder,
    //   },
    //   {

    //     path: 'customer_check_out/:orderId',
    //     name: 'CustomerCheckOut',

    //     component: CustomerCheckOut,
    //   },

    // ]
  },

]

const router = new VueRouter({
  routes
})

export default router