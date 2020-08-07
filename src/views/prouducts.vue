<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品</th>
          <th width="120">原始價格</th>
          <th width="120">售價</th>
          <th width="100">啟用狀態</th>
          <th width="70">編輯</th>
          <th width="70">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{item.origin_price | currency}}</td>
          <td class="text-right">{{item.price | currency}}</td>
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
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUpLoading"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img :src="tempProduct.imageUrl" class="img-fluid" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success == true) {
          vm.isLoading = false;
          vm.products = response.data.products;
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
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
      let htppMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        htppMethod = "put";
      } else {
      }
      this.$http[htppMethod](api, { data: vm.tempProduct }).then((response) => {
        // console.log("temp", vm.tempProducts);
        // console.log("response", response);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProduct();
        } else {
          $("#productModal").modal("hide");
          vm.getProduct();
          alart("產品新增失敗");
        }
      });
    },
    deletedProduct(item) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`; // const api = "https://vue-course-api.hexschool.io/api/redbs/products/all";
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
    uploadFile() {
      const files = this.$refs.files.files[0];
      const vm = this;
      const formDate = new FormData();
      formDate.append("file-to-upload", files);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.status.fileUpLoading = true;
      this.$http
        .post(url, formDate, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          vm.status.fileUpLoading = false;
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            this.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
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