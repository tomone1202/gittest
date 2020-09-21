import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoading: false,
        products: [],
        carts: '',
    },
    actions: {
        updateLoading(context, status) {
            context.commit('LOADING', status)
        },
        getProducts(context) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";

            context.commit('LOADING', true)
            axios.get(api).then((response) => {


                context.commit("PRODUCTS", response.data.products);

                context.commit('LOADING', false)
                console.log("556885278");
            });
        },
        getCart(context) {
            const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
            const vm = this;

            axios.get(api).then((response) => {
                context.commit("CARTS", response.data.data.carts.length);



            });
        },
    },
    mutations: {
        LOADING(state, status) {
            state.isLoading = status
        },
        PRODUCTS(state, payload) {
            state.products = payload
        },
        CARTS(state, payload) {
            state.carts = payload
        }
    }
})