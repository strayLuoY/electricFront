import tableRight from '@/components/table-right'
export const init = {
  components: {
    tableRight
  },
  data() {
    return {
      form: {},
      query: {},
      page: { //分页控制
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      data: [],
      types: ['warning', 'info', 'success', 'danger'],
      option: {
        dialogClickModal: false,
        selectionWidth: 40,
        size: 'mini',
        // stripe:true,
      }
    }
  },
  computed: {
    ids() { //所有勾选的id
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(",");
    }
  },
  methods: {
    handleImage(row) {
      var timestamp = new Date().getTime();
      this.flowUrl = `/api/blade-flow/process/diagram-view?processInstanceId=${row.processInstanceId}&time=${timestamp}`;
      this.flowBox = true;
    },
    handleAgree(row) {
      var timestamp = new Date().getTime();
      this.flowUrl = row.processInstanceId + `&time=${timestamp}`;
      this.flowBox = true;
    },
    isCheck(createUser, userId) {
      if (createUser == userId) {
        return true
      } else { return false }
    },
    searchReset() {
      //清空触发
      // let inputs = this.getByClass(document, 'el-input__inner');
      // Array.from(inputs).forEach((input, index) => {
      //   if (index == 0) return;
      //   input.value = '';
      // });
      if (this.searchForm) {
        Object.keys(this.searchForm).forEach(key => this.searchForm[key] = '');
      };
      this.query = {}
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    searchChange(params, done) { //搜索触发
      this.query = params;
      if (this.searchForm) {//如果有自定义搜索条件
        params = Object.assign(this.query, this.searchForm);
      }
      this.page.currentPage = 1
      this.onLoad(this.page, params);
      done()
    },
    selectionChange(list) { //勾选项发生变化触发
      this.selectionList = list;
    },
    currentChange(currentPage) { //切换分页时触发该事件
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) { //切换分页每页显示的条数触发该事件
      this.page.pageSize = pageSize;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    refreshChange() { //刷新
      if (this.searchForm) {//如果有自定义搜索条件
        Object.assign(this.query, this.searchForm);
      }
      this.onLoad(this.page, this.query);
    },
    handleSearchShow() {
      this.$refs.crud.headerSearch.handleSearchShow();
    },
    getByClass(parent, cls) {
      var res = [];
      var reg = new RegExp('(^|\\s)' + cls + '($|\\s)', 'i');
      var ele = parent.getElementsByTagName('*');
      for (var i = 0; i < ele.length; i++) {
        if (reg.test(ele[i].className)) {
          res.push(ele[i]);
        }
      }
      return res;
    }
  }

}
