<template>
  <div class="bg-light">
    <!-- <router-link to="/login" type="button" class="btn btn-primary">登入</router-link>
    <router-link to="/customer_order" type="button" class="btn btn-info">模擬訂單</router-link>
    <a href="#" @click.prevent="signout" class="btn btn-secondary">登出</a>-->
    <!-- <router-link to="/login">登入</router-link> |
    <router-link to="/login">登出</router-link>-->
    <TopInfo></TopInfo>
    <Navbar class="sticky-top"></Navbar>

    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Navbar from "./HomeNavBar";
import HomeInfo from "./HomeInfo";
import Footer from "./footer";
import TopInfo from "./HomeNavbarTop";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Navbar,
    HomeInfo,
    Footer,
    TopInfo,
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    },
  },
};
</script>
