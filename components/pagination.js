/*** 分頁元件 ***/
export default{
    data() {
        return{
            pagination: {}
        }
    },
    methods: {
        emitPagination(page) {
            this.$emit("emitPages", page);
        }
    },
    props: [
        "propsPages"
    ],  
    template:
    `
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{'disabled': !propsPages.has_pre}">
                <a class="page-link" href="#" @click.prevent="emitPagination(propsPages.current_page - 1)" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" :class="{'active': item === propsPages.current_page}" v-for="(item, index) in propsPages.total_pages" :key="item">
                <a class="page-link" href="#" @click.prevent="emitPagination(item)">{{ item }}</a>
            </li>
            <li class="page-item" :class="{'disabled': !propsPages.has_next}">
                <a class="page-link" href="#" @click.prevent="emitPagination(propsPages.current_page + 1)" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
    `
};