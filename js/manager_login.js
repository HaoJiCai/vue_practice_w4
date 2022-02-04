import {createApp} from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.23/vue.esm-browser.js";

const loginApp = {
    data() {
        return{
            manager:{
                username: "",
                password: ""
            }
        }
    },
    methods: {
        // 當點擊 Sign In 按鈕，並執行登入動作
        login() {
            const baseURL = "https://vue3-course-api.hexschool.io/v2"; // 預設宣告 API URL
            const api_login = "/admin/signin"; // 宣告 Login API
            // 串接 /Admin/signin API 
            axios.post(`${baseURL}${api_login}`, this.manager).then(res =>{
                //console.log(res);
                if (res.data.success){
                    const {token, expired} = res.data;
                    document.cookie = `hasToken=${token}; expires=${new Date(expired)};`;
                    window.location = "../templates/productsPage.html"; // 執行成功，跳轉產品管理頁面
                };
            }).catch(err =>{
                Swal.fire({
                    icon: 'error',
                    title: '登入失敗！！',
                    text: `${err}`,
                    confirmButtonText: 'Ok'
                });
                this.manager.username = "";
                this.manager.password = "";
            });
        }
    },
    created() {
        this.manager.username = "";
        this.manager.password = "";
    }
};

createApp(loginApp).mount("#app");