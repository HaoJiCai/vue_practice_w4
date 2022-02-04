const messages = {
    addText: "新增成功！！",
    editText: "編輯成功！！",
    deleteText: "刪除成功！！",
};

// 建立 Toast 訊息物件
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

// 新增產品 success message
export function addMsg(){
    Toast.fire({
        icon: 'success',
        title: `${messages.addText}`
    });   
};
// 編輯產品 success message
export function editMsg(){
    Toast.fire({
        icon: 'success',
        title: `${messages.editText}`
    });   
};
// 刪除產品 success message
export function deleteMsg(){
    Toast.fire({
        icon: 'success',
        title: `${messages.deleteText}`
    });   
};