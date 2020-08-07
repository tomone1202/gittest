<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{'disabled':!pagination.has_pre}"
          @click.prevent="getProduct(pagination.current_page-1)"
        >
          <a class="page-link" href="#">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{'active':pagination.current_page==page}"
          @click.prevent="getProduct(page)"
        >
          <a class="page-link" href="#">{{page}}</a>
        </li>
        <li
          class="page-item"
          :class="{'disabled':!pagination.has_next}"
          @click.prevent="getProduct(pagination.current_page+1)"
        >
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {}
    };
  },
  methods: {
    getProduct(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        // vm.isLoading = false;
        // vm.products = response.data.products;
        console.log("response元件", response.data);
        vm.pagination = response.data.pagination;
        // console.log("資料5678", vm.products);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
