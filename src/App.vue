<template>
  <div id="app">
    <div id="nav"></div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // console.log(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`);
    // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
    // this.$http.get(api).then(response => {
    //   console.log(response.data);
    // });
  }
};
</script>


<style lang="scss">
@import "./assets/all.scss";
</style>
