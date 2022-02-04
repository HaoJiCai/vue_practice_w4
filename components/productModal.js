/*** 產品新增/編輯 Modal 元件 ***/
import {addMsg, editMsg} from "../js/toastMessage.js";

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
      postProductsData() {
        let postApi = `${this.api.baseURL}/${this.api.api_path}${this.api.api_postProduct}`; // 宣告 POST API 變數
        let putApi = `${this.api.baseURL}/${this.api.api_path}${this.api.api_postProduct}/${this.productDetail.id}`; // 宣告 PUT API 變數
        let postObj = {
          data: this.productDetail
        };

        if (this.isNullModal){
          axios.put(putApi, postObj).then(res =>{
            if (res.data.success){
              this.$emit('postProduct');
              editMsg();
            }else {
              console.log(res.data.message);
            };
          }).catch(err =>{
            alert(err);            
          });
        }else {
          axios.post(postApi, postObj).then(res =>{
            if (res.data.success){
              this.$emit('postProduct');
              addMsg();
            }else {
              console.log(res.data.message);
            };
          }).catch(err =>{
            alert(err);
          });
        };
      },
      createImages() {
        this.productDetail.imagesUrl = [];
        this.productDetail.imagesUrl.push('');
      },
    },
    props: {
      productDetail: {
        default: {
          imagesUrl: []
        }
      },
      isNullModal: {
        default: true
      }
    },  
    template:
    `
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span>新增產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-1">
                  <div class="form-group">
                    <h2><label for="imageUrl">主要圖片</label></h2>
                    <input type="text" id="imageUrl" class="form-control" placeholder="請輸入圖片連結" v-model="productDetail.imageUrl">
                  </div>
                  <img class="img-fluid" v-if="productDetail.imageUrl" :src="productDetail.imageUrl" alt="圖片加載失敗">
                </div>
                <div v-if="Array.isArray(productDetail.imagesUrl)">
                  <div class="mb-1" v-for="(image, key) in productDetail.imagesUrl" :key="key">
                    <div class="form-group">
                      <h3><label for="imagesUrl">副圖片-{{key+1}}</label></h3>
                      <input v-model="productDetail.imagesUrl[key]" type="text" id="imagesUrl" class="form-control" placeholder="請輸入圖片連結">
                    </div>
                    <img class="img-fluid" :src="image">
                  </div>
                  <div v-if="!productDetail.imagesUrl.length || productDetail.imagesUrl[productDetail.imagesUrl.length - 1]">
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="productDetail.imagesUrl.push('')">
                      新增圖片
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="productDetail.imagesUrl.pop()">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages">
                    新增圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="productDetail.title">
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="productDetail.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="productDetail.unit">
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model="productDetail.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model="productDetail.price">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="productDetail.description">
               </textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容" v-model="productDetail.content">
               </textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="productDetail.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="postProductsData">確認</button>
          </div>
        </div>
      </div>
    </div>
    `
};