<template>
  <div>
    <!-- 輪播 -->
    <header>
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div
            class="carousel-item active bg-cover header-carousel-item"
            style="background-image: url(https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);"
          >
            <div class="carousel-caption d-none d-block">
              <h3>樂器買賣</h3>
              <p>全新及二手樂器</p>
            </div>
          </div>
          <div
            class="carousel-item bg-cover header-carousel-item"
            style="background-image: url(https://images.unsplash.com/photo-1510279410431-2d0808d69bf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);"
          >
            <div class="carousel-caption d-none d-block">
              <h3>音樂後製</h3>
              <p>編曲、錄音、混音、母帶</p>
            </div>
          </div>
          <div
            class="carousel-item bg-cover header-carousel-item"
            style="background-image: url(https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);"
          >
            <div class="carousel-caption d-none d-block">
              <h3>樂器學習</h3>
              <p>吉他、貝斯、鋼琴、烏克莉莉、樂理</p>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </header>

    <section class="bg-info text-white py-5">
      <div class="container" style="padding:0 0 12px 0">
        <div class="row">
          <div class="col-md-4">
            <i class="fas fa-microphone fa-5x"></i>
            <h3>音樂後製</h3>
            <p>從編曲、錄音、混音、母帶製作，皆由專業老師一對一上機指導。主要DAW使用Cubase及ProTools</p>
          </div>
          <div class="col-md-4">
            <i class="far fa-handshake fa-5x"></i>
            <h3>樂器買賣</h3>
            <p>不管是全新或二手舊品樂器，都能聯絡我們，也能到店參觀試彈，我們提供七天鑑賞期。</p>
          </div>
          <div class="col-md-4">
            <i class="fas fa-play fa-5x"></i>
            <h3>線上課程</h3>
            <p>如果不方便與老師一對一教學，我們也有提出遠距教學的方案。在家也能輕鬆學習。</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        console.log("response", response.data);
        // vm.pagination = response.data.pagination;
        console.log("資料5678", vm.products);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>