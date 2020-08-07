<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">折扣%數</th>
          <th>優惠券名稱</th>
          <th width="120">到期時間</th>
          <th width="120">優惠碼</th>
          <th width="100">啟用狀態</th>
          <th width="70">編輯</th>
          <th width="70">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.percent }}%</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{item.due_date}}</td>
          <td class="text-right">{{item.code}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td>
            <div class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</div>
          </td>
          <td>
            <div class="btn btn-outline-danger btn-sm" @click="deletedProduct(item)">刪除</div>
          </td>
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success == true) {
          vm.isLoading = false;
          vm.products = response.data.coupons;
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
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      let htppMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempProduct.id}`;
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
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
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