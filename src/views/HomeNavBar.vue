<template>
  <div>
    <!-- navbar -->

    <nav class="navbar navbar-expand-lg bg-danger sticky-top navbar-dark">
      <div class="container">
        <router-link class="nav-link navbar-brand" to="/">
          <strong>
            <i class="fa fa-home text-danger" aria-hidden="true"></i>
            RedHomeMusic
          </strong>
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <a class="nav-link">
            <span class="navbar-toggler-icon"></span>
          </a>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">關於我們</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/customer_order">商城</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">聯絡我們</router-link>
            </li>
            <li class="nav-item"></li>
          </ul>

          <router-link class="ml-auto text-warning mr-4" to="/test">
            <h6>
              <strong>限時優惠卷領取</strong>
            </h6>
          </router-link>
          <router-link class="nav-link mr-4" to="/cart">
            <i class="fa fa-cart-plus text-warning fa-2x">{{carts}}</i>
          </router-link>

          <router-link class="btn btn-warning mr-1 py-1 text-dark" to="/login">
            <strong>登入</strong>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getCart() {
      this.$store.dispatch("getCart");
    },
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
</style>