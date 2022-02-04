import {createApp} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.23/vue.esm-browser.js";
import pagination from "../components/pagination.js";
import productModal from "../components/productModal.js";
import delProductModal from "../components/delProductModal.js";

// 定義(接近)全域變數
let product_modal = {}; 
let delProduct_modal = {}; 

const productsApp = {
  data() {
    return {
      api: {
        baseURL: "https://vue3-course-api.hexschool.io/v2/api", // 預設宣告 API URL
        api_path: "jimmycai", // 預設宣告 api_path 
        api_checkedLoginStatus: "/user/check", // 宣告 Check Login API
        api_getProducts: "/admin/products", // 宣告 Get Admin Products API
        api_postProduct: "/admin/product", // 宣告 Post/Put/Delete Admin Products API
      },
      products: [],
      productDetail: {
        imagesUrl: []
      },
      pagination: {},
      isModal: '',
      isTemplateLoading: false
    }
  },
  mounted() {
    this.checkedLoginStatus();
    
    product_modal = new bootstrap.Modal(document.getElementById("productModal"));
    delProduct_modal = new bootstrap.Modal(document.getElementById("delProductModal"));
  },
  methods: {
    // 檢查登入驗證
    checkedLoginStatus() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hasToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); // 取得名為 hasToken 的 cookie 
      axios.defaults.headers.common['Authorization'] = token; // 把 Token 加入到 Headers Authorization 裡

      // 串接 /user/check API
      axios.post(`${this.api.baseURL}${this.api.api_checkedLoginStatus}`).then(status =>{
        //console.log(status);
        if (status.data.success){
          this.isTemplateLoading = true;
          this.getProductsData();
        };
      }).catch(err =>{
        Swal.fire({
          icon: 'warning',
          title: '登入逾時！！',
          text: `${err}`,
          confirmButtonText: 'Ok'
        }).then(() =>{
          window.location = "../templates/manager_login.html";
        });
      });
    },
    // GET Products API 
    getProductsData(page = 1) {
      axios.get(`${this.api.baseURL}/${this.api.api_path}${this.api.api_getProducts}?page=${page}`).then(res =>{
        if (res.data.success){
          const {products, pagination} = res.data;
          this.products = products;
          this.pagination = pagination;
        };
      }).catch(err =>{
        Swal.fire({
          icon: 'error',
          title: '無法讀取資料！！',
          text: `${err}`,
          confirmButtonText: 'Ok'
        });
      });
    },
    // 操作 Modal 畫面（開啟）
    openModal(modal, productData) {
      if (modal === ""){
        this.productDetail = {
          imagesUrl: []
        };
        this.isModal = false;
        product_modal.show();
        //console.log("新增modal");
      }else if (modal === "productModal"){
        //this.productDetail = { ...productData }; // 淺層拷貝
        this.productDetail = JSON.parse(JSON.stringify(productData)); // 深層拷貝
        this.isModal = true;
        product_modal.show();
        //console.log("編輯modal");
      }else if (modal === "delProductModal"){
        //this.productDetail = { ...productData }; // 淺層拷貝
        this.productDetail = JSON.parse(JSON.stringify(productData)); // 深層拷貝
        delProduct_modal.show();
        //console.log("刪除modal");
      }else {
        console.log("openModal Error！！")
      };
    },
    // 操作 Modal 畫面（關閉）
    closeModal(modal) {
      if (modal === "" || modal === "productModal"){
        product_modal.hide();
      }else if (modal === "delProductModal"){
        delProduct_modal.hide();
      };
      this.getProductsData(this.pagination.current_page);
    },
  },
  // 元件
  components: {
    pagination, productModal, delProductModal
  }
};

createApp(productsApp).mount('#app');