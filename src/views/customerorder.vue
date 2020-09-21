<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="container">
      <div class="row">
        <div class="col-3">
          <div
            class="list-group mt-5 position-fixed display-md-none"
            style="width:200px"
            id="list-tab"
            role="tablist"
          >
            <a
              class="list-group-item list-group-item-action active"
              data-toggle="list"
              href="#"
              @click.prevent="category=''"
            >全部</a>
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#"
              @click.prevent="category='樂器學習'"
            >樂器學習</a>
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#"
              @click.prevent="category='樂器買賣'"
            >樂器買賣</a>
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#"
              @click.prevent="category='聲音工程'"
            >聲音工程</a>
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#"
              @click.prevent="category='其他'"
            >其他</a>
          </div>
        </div>
        <div class="col-md-9">
          <!-- 模擬商城 -->
          <div class="row mt-4">
            <div class="col-md-6 mb-4" v-for="item in filterData" :key="item.id">
              <div class="card border-0 shadow-sm">
                <div
                  style="height: 150px; background-size: cover; background-position: center"
                  :style="{backgroundImage:`url(${item.imageUrl})`}"
                ></div>
                <div class="card-body">
                  <a
                    href="#"
                    class="badge badge-secondary float-right ml-2"
                    @click="category=item.category"
                  >{{item.category}}</a>
                  <h5 class="card-title">
                    <a href="#" class="text-dark" @click="intoProuduct(item.id)">{{item.title}}</a>
                  </h5>
                  <p class="card-text">{{item.description}}</p>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <!-- <div class="h5">2,800 元</div> -->
                    <del class="h6">原價 {{item.origin_price | currency}} 元</del>
                    <div class="h5">現在只要 {{item.price | currency}} 元</div>
                  </div>
                </div>
                <div class="card-footer d-flex">
                  <!-- <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm"
                    @click="getProuduct(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.lodingItem===item.id"></i>
                    查看更多
                  </button>-->
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm"
                    @click="intoProuduct(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.lodingItem===item.id"></i>
                    查看更多
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm ml-auto"
                    @click="addToCart(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.lodingItem===item.id"></i>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3"></div>
      </div>
    </div>

    <!-- cart -->
    <!-- <div class="row justify-content-center mt-5 mb-5">
      <table class="table col-lg-5">
        <thead>
          <tr>
            <th scope="col" width="50">刪除</th>
            <th scope="col">品名</th>
            <th scope="col">數量</th>
            <th scope="col" class="text-right">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in carts" :key="item.id">
            <th scope="row">
              <button type="button" class="btn btn-outline-danger" @click="deleteCart(item.id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </th>
            <td>{{item.product.title}}</td>
            <td>{{item.qty}} {{item.product.unit}}</td>
            <td class="text-right">{{item.product.price | currency}} 元</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{total | currency}} 元</td>
          </tr>
          <tr v-if="total!==final_total">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right">{{final_total | currency}} 元</td>
          </tr>
        </tfoot>
      </table>
    </div>-->

    <!-- 優惠券 -->
    <!-- <div class="row justify-content-center mt-5 mb-5 no-gutters">
      <div class="input-group mb-3 input-group-sm col-lg-5">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
        </div>
      </div>
    </div>-->

    <!-- 資料填寫 -->
    <!-- 
    <div class="mt-5 row justify-content-center no-gutters">
      <ValidationObserver ref="form" class="col-lg-5">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
              <label for="useremail">Email</label>
              <input
                type="email"
                class="form-control"
                :class="{'is-invalid':errors[0]}"
                name="email"
                id="useremail"
                v-model="form.user.email"
                placeholder="請輸入 Email"
              />
              <span class="text-danger" v-if="errors[0]">{{errors[0]}}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider name="name" rules="required" v-slot="{ errors }">
              <label for="username">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                :class="{'is-invalid':errors[0]}"
                name="First Name"
                id="username"
                v-model="form.user.name"
                placeholder="輸入姓名"
              />
              <span class="text-danger" v-if="errors[0]">{{errors[0]}}</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider name="tel" rules="required" v-slot="{ errors }">
              <label for="usertel">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                :class="{'is-invalid':errors[0]}"
                id="usertel"
                v-model="form.user.tel"
                placeholder="請輸入電話"
              />
              <span class="text-danger" v-if="errors[0]">請填入電話</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <ValidationProvider name="address" rules="required" v-slot="{ errors }">
              <label for="useraddress">收件人地址</label>
              <input
                type="text"
                class="form-control"
                name="address"
                :class="{'is-invalid':errors[0]}"
                id="useraddress"
                v-model="form.user.address"
                placeholder="請輸入地址"
              />
              <span class="text-danger">地址欄位不得留空</span>
            </ValidationProvider>
          </div>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <button type="reset" class="btn btn-info">重設資料</button>
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </form>
      </ValidationObserver>
    </div>-->

    <!-- modal -->
    <div class="modal" tabindex="-1" role="dialog" id="productModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" />
            <blockquote>
              <p class="mb-0">{{product.content}}</p>
              <span class="badge badge-secondary">{{product.category}}</span>
              <footer class="blockquote-footer text-right">{{product.description}}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{product.origin_price}}元</div>
              <div class="h6" v-if="product.price">{{product.origin_price}}元</div>
              <div class="h4" v-if="product.price">{{product.price}}元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num" id>
              <option :value="num" v-for="num in 10 " :key="num">選購{{num}}{{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{product.num*product.price}}元</strong>
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id,product.num)"
            >加到購物車</button>
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
      category: "",
      // products: [],
      product: {},
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

      status: { fileUpLoading: false },
    };
  },
  computed: {
    filterData() {
      const vm = this;
      const filterProducts = vm.products.filter(
        (word) => word.category === vm.category
      );

      if (vm.category) {
        return filterProducts;
      } else {
        return vm.products;
      }
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    products() {
      return this.$store.state.products;
    },
  },

  methods: {
    getProducts() {
      this.$store.dispatch("getCart");
      this.$store.dispatch("getProducts");
    },
    getProuduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;

      vm.status.lodingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        $("#productModal").modal("show");
        console.log("response", response.data);
        // vm.pagination = response.data.pagination;
        console.log("個別資料", vm.product);
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
      });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;
      vm.status.lodingItem = id;
      const cart = { product_id: id, qty };
      this.$http.post(api, { data: cart }).then((response) => {
        console.log("response", response.data);
        vm.getCart();
        $("#productModal").modal("hide");
        vm.status.lodingItem = "";
        this.$store.dispatch("getCart");
      });
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;

      this.$http.get(api).then((response) => {
        vm.carts = response.data.data.carts;
        vm.final_total = response.data.data.final_total;
        vm.total = response.data.data.total;
        console.log("取得購物車", response);
        // console.log("vm購物車", vm.carts);
      });
    },
    deleteCart(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;

      this.$http.delete(api).then((response) => {
        vm.getCart();
        // console.log("刪除購物車", response);
        this.$store.dispatch("getCart");
      });
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;
      const coupon = { code: vm.coupon_code };
      this.$http.post(api, { data: coupon }).then((response) => {
        vm.getCart();
        console.log("折扣", response);
      });
    },
    creatorOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;
      const order = vm.form;
      this.$http.post(api, { data: order }).then((response) => {
        console.log("訂單建立", response);
        if (response.data.success) {
          vm.$router.push(`/customer_check_out/${response.data.orderId}`);
        }
      });
    },
    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          // 證成功後的行為包含 AJAX傳送、重製表單等等
          this.creatorOrder();
        } else {
          // 驗證失敗產生的行為
          console.log("訂單建立失敗");
        }
      });
    },
  },

  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
</style>