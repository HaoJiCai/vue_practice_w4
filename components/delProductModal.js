/*** 產品刪除 Modal 元件 ***/
import {deleteMsg} from "../js/toastMessage.js";

export default{
    data() {
        return{
          api: {
            baseURL: "https://vue3-course-api.hexschool.io/v2/api", // 預設宣告 API URL
            api_path: "jimmycai", // 預設宣告 api_path 
            api_postProduct: "/admin/product", // 宣告 Post/Put/Delete Admin Products API
          }
        }
    },
    methods: {
      deleteProductsData() {
        let deleteApi = `${this.api.baseURL}/${this.api.api_path}${this.api.api_postProduct}/${this.productDetail.id}`; // 宣告 DELETE API 變數
        axios.delete(deleteApi).then(res =>{
          if (res.data.success){
            this.$emit('deleteProduct');
            deleteMsg();
          }else {
            console.log(res.data.message);
          };
        }).catch(err =>{
          alert(err);
        })
      }
    },
    props: {
      productDetail: {
        default: {
          imagesUrl: []
        }
      }      
    },  
    template:
    `
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ productDetail.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProductsData">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    `
};