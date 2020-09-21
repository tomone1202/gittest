<template>
  <div>
    <div class="container">
      <h2 class="modal-title">{{ product.title }}</h2>
      <div class="row">
        <div class="col">
          <img :src="product.imageUrl" class="img-fluid" />
          <blockquote>
            <span class="badge badge-secondary">{{ product.category }}</span>
          </blockquote>
        </div>
        <div class="col">
          <blockquote>
            <p class="mb-0">{{ product.content }}</p>
            <span class="badge badge-secondary">{{ product.category }}</span>
            <footer class="blockquote-footer text-right">
              {{ product.description }}
            </footer>
          </blockquote>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="h4" v-if="!product.price">
              {{ product.origin_price }}元
            </div>
            <div class="h6" v-if="product.price">
              {{ product.origin_price }}元
            </div>
            <div class="h4" v-if="product.price">{{ product.price }}元</div>
          </div>
          <select name class="form-control mt-3" v-model="product.num" id>
            <option :value="num" v-for="num in 10" :key="num"
              >選購{{ num }}{{ product.unit }}</option
            >
          </select>
          <div class="text-muted text-nowrap mr-3">
            小計
            <strong>{{ product.num * product.price }}元</strong>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            @click="addToCart(product.id, product.num)"
          >
            加到購物車
          </button>
        </div>
      </div>
      <hr />
      <h2>類似商品:</h2>
      <div class="row mt-4">
        <div class="col-md-3 mb-4" v-for="item in filterData" :key="item.id">
          <div class="card border-0 shadow-sm">
            <div
              style="height: 150px; background-size: cover; background-position: center"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
            <div class="card-body">
              <p class="badge badge-secondary float-right ml-2">
                {{ item.category }}
              </p>
              <h5 class="card-title">
                <a href="#" @click="intoProuduct(item.id)" class="text-dark">{{
                  item.title
                }}</a>
              </h5>
              <p class="card-text">{{ item.description }}</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <!-- <div class="h5">2,800 元</div> -->
                <del class="h6">原價 {{ item.origin_price | currency }} 元</del>
                <div class="h5">現在只要 {{ item.price | currency }} 元</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      productId: "",
      product: {},
      category: "",
      products: [],

      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      coupon_code: "",
      status: { lodingItem: "" },
      final_total: {},
      total: {},
      pagination: {},
      carts: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: { fileUpLoading: false },
    };
  },
  computed: {
    filterData() {
      const vm = this;
      const filterProducts = vm.products.filter(
        (word) => word.category === vm.product.category
      );

      const filterProduct = filterProducts.filter(
        (word) => word.title !== vm.product.title
      );

      if (vm.product.category) {
        return filterProduct;
      } else {
      }
    },
  },

  methods: {
    getProuduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;

      this.$http.get(api).then((response) => {
        vm.product = response.data.product;

        console.log("個別response", response.data);
      });
    },
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
    addToCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;
      vm.status.lodingItem = id;
      const cart = { product_id: id, qty };
      this.$http.post(api, { data: cart }).then((response) => {
        console.log("response", response.data);

        $("#productModal").modal("hide");
        vm.status.lodingItem = "";
      });
    },
    intoProuduct(productId) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${productId}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;

      vm.status.lodingItem = productId;
      this.$http.get(api).then((response) => {
        vm.$router.push(`/product/${response.data.product.id}`);
        vm.status.lodingItem = "";
        window.location.reload();
      });
    },
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getProuduct(this.productId);
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped></style>
