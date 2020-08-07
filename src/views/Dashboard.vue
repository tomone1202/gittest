<template>
  <div>
    <Navbar></Navbar>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <Sidebar></Sidebar>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Alert from "./alert";

export default {
  components: {
    Navbar,
    Sidebar,
    Alert,
  },
};
</script>

<style lang="scss" scoped>
</style>
