<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table
      class="table mt-4"
      v-for="(item) in products"
      :key="item.id"
      :class="{'table-success':item.is_paid,'table-danger':!item.is_paid,}"
    >
      <thead>
        <tr>
          <th width="200">購買時間</th>
          <th width="400">email</th>
          <th>購買款項</th>
          <th width="120">應付金額</th>
          <th width="100">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ item.create_at| date }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product) in item.products">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{item.total | currency}}</td>

          <td class="text-right">{{item.is_paid | TFT}}</td>
        </tr>
      </tbody>
    </table>

    <!-- pagination -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{'disabled':!pagination.has_pre}"
          @click.prevent="getProduct(pagination.current_page-1)"
        >
          <a class="page-link" href="#">上一頁</a>
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
          <a class="page-link" href="#">下一頁</a>
        </li>
      </ul>
    </nav>
    <!-- <productpagination></productpagination> -->
    <!-- modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-10 justify-content-center">
                <div class="form-group">
                  <label for="title">折扣碼名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入折扣碼名稱"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">折扣%數</label>
                    <input
                      type="phone"
                      class="form-control"
                      id="category"
                      placeholder="請輸入折扣%數"
                      v-model="tempProduct.percent"
                    />
                  </div>
                  <div class="form-group col-md-6 input-group date">
                    <label for="price">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入到期日"
                      v-model="tempProduct.due_date"
                    />
                    <span class="input-group-addon">
                      <i class="glyphicon glyphicon-calendar"></i>
                    </span>
                  </div>
                </div>

                <div class="col-md-12">
                  <label for="price">折扣碼</label>
                  <input
                    type="unit"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入折扣碼"
                    v-model="tempProduct.code"
                  />
                </div>
                <hr />

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import productpagination from "./productPage";

export default {
  data() {
    return {
      products: [],

      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: { fileUpLoading: false },
    };
  },
  methods: {
    getProduct(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success == true) {
          vm.isLoading = false;
          vm.products = response.data.orders;

          console.log("response", response.data);
          vm.pagination = response.data.pagination;
          // console.log("資料5678", vm.products);
        } else {
          vm.$router.push("/login");
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      let htppMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${vm.tempProduct.id}`;
        htppMethod = "put";
      } else {
      }
      this.$http[htppMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log("temp", vm.tempProduct);
        console.log("新增response", response);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProduct();
        } else {
          $("#productModal").modal("hide");
          vm.getProduct();
          console.log("產品新增失敗");
        }
      });
    },
    deletedProduct(item) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${item.id}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      // let htppMethod = "post";
      const vm = this;

      this.$http.delete(api).then((response) => {
        // console.log("temp", vm.tempProducts);
        // console.log("response", response);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProduct();
        } else {
          $("#productModal").modal("hide");
          vm.getProduct();
          alart("產品刪除失敗");
        }
      });
    },
  },
  created() {
    this.getProduct();
  },
  components: {
    productpagination,
  },
};
</script>

<style lang="scss" scoped>
</style>