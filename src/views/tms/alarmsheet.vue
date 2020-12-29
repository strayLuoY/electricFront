<template>
  <basic-container>
    <avue-crud :option="option" :table-loading="loading" :data="data" :page.sync="page" ref="crud" @row-del="rowDel" v-model="form" :permission="permissionList" @row-update="rowUpdate" @row-save="rowSave" :before-open="beforeOpen" @search-change="searchChange" @search-reset="searchReset" @selection-change="selectionChange" @current-change="currentChange" @size-change="sizeChange" @refresh-change="refreshChange" @on-load="onLoad">
      <template slot="menuRight">
        <table-right :crud='$refs.crud' :data='data' :addPermission="false" :delPermission="permission.tms_alarm_delete" :handleDelete="handleDelete" :refreshChange='refreshChange'>
          <el-upload class="upload-tms" action="/api/blade-electric/alarm/importExcel" :on-success="handleSuccess" :before-upload="beforeUpload" :headers="headers" :show-file-list="false" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed">
            <el-button type="text" icon="el-icon-upload" class="rightbtn">TMS数据导入</el-button>
          </el-upload>
        </table-right>
      </template>
      <template slot-scope="{row}" slot="menu">
        <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
          <el-button icon="el-icon-view" size="small" type="text" @click.stop="$refs.crud.rowView(row,row.$index)" v-if="permission.tms_alarm_view"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
          <el-button icon="el-icon-edit" size="small" type="text" @click.stop="$refs.crud.rowEdit(row,row.$index)" v-if="permission.tms_alarm_edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
          <el-button icon="el-icon-delete" size="small" type="text" @click.stop="rowDel(row)" v-if="permission.tms_alarm_delete"></el-button>
        </el-tooltip>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { getList, remove, update, add, getDetail } from '@/api/tms/alarm';
import { mapGetters, mapState } from 'vuex';
import { init } from '@/mixins/init';

export default {
  mixins: [init],
  data() {
    return {
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectionList: [],
      option: {
        // height: 'auto',
        // calcHeight: 30,
        dialogWidth: 950,
        tip: false,
        searchShow: true,
        searchMenuSpan: 24,
        border: true,
        index: true,
        viewBtn: false,
        delBtn: false,
        editBtn: false,
        addBtn: false,
        selection: true,
        menuWidth: 100,
        // excelBtn: true,
        labelWidth: 110,
        dialogClickModal: false,
        column: [
          {
            label: '告警单号',
            prop: 'serialNum',
            span: 12,
            rules: [
              {
                required: true,
                message: '请输入告警单号',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '告警时间',
            prop: 'alarmNeTime',
            type: 'datetime',
            span: 12,
            search: true,
            searchRange: true,
            searchSpan: 12,
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            rules: [
              {
                required: true,
                message: '请输入网元告警时间',
                trigger: 'click',
              },
            ],
          },
          {
            label: '告警类型',
            prop: 'alarmType',
            span: 12,
            search: true,
            overHidden: true,
            rules: [
              {
                required: true,
                message: '请输入告警类型',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '告警对象',
            prop: 'alarmFormat',
            span: 12,
            hide: true,
            showColumn: false,
            overHidden: true,
            rules: [
              {
                required: true,
                message: '请输入告警对象',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '对象类型',
            prop: 'resTypeName',
            span: 12,
            rules: [
              {
                required: true,
                message: '请输入对象类型',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '告警原因',
            prop: 'alarmCause',
            span: 12,
            rules: [
              {
                required: true,
                message: '请输入告警原因',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '告警等级',
            prop: 'alarmLevel',
            span: 12,
            rules: [
              {
                required: true,
                message: '请输入告警等级',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '告警描述',
            prop: 'alarmDesc',
            span: 12,
            hide: true,
            showColumn: false,
            rules: [
              {
                required: true,
                message: '请输入告警描述',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '所属厂家',
            prop: 'producerName',
            span: 12,
            rules: [
              {
                required: true,
                message: '请输入所属厂家',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '所属系统',
            prop: 'sysName',
            span: 12,
            hide: true,
            showColumn: false,
            rules: [
              {
                required: true,
                message: '请输入所属系统',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '所属站点',
            prop: 'stationName',
            span: 12,
            minWidth: 110,
            rules: [
              {
                required: true,
                message: '请输入所属站点',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '所属网元',
            prop: 'neName',
            span: 12,
            minWidth: 110,
            hide: true,
            showColumn: false,
            rules: [
              {
                required: true,
                message: '请输入所属网元',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '设备类型',
            prop: 'devTypeName',
            span: 12,
            minWidth: 110,
            rules: [
              {
                required: true,
                message: '请输入设备类型',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '告警监视单位',
            prop: 'maintenanceDept',
            span: 12,
            minWidth: 110,
            hide: true,
            showColumn: false,
            rules: [
              {
                required: true,
                message: '请输入告警监视单位',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '确认人',
            prop: 'confirmPerson',
            span: 12,
            minWidth: 110,
            rules: [
              {
                required: true,
                message: '请输入确认人',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '确认时间',
            prop: 'confTime',
            type: 'datetime',
            span: 12,
            hide: true,
            showColumn: false,
            format: 'yyyy-MM-dd hh:mm:ss',
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
            rules: [
              {
                required: true,
                message: '请输入确认时间',
                trigger: 'click',
              },
            ],
          },

          {
            label: '处理状态',
            prop: 'processState',
            minWidth: 100,
            span: 12,
            search: true,
            rules: [
              {
                required: true,
                message: '请输入处理状态',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '数据导入时间',
            prop: 'createTime',
            type: 'datetime',
            minWidth: 130,
            span: 12,
            display: false,
          },
        ],
      },
      data: [],
    };
  },
  computed: {
    ...mapGetters(['permission']),
    ...mapState({
      headers: (state) => ({ 'Blade-Auth': `bearer ${state.user.token}` }),
    }),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.tms_alarm_add, false),
        viewBtn: this.vaildData(this.permission.tms_alarm_view, false),
        delBtn: this.vaildData(this.permission.tms_alarm_delete, false),
        editBtn: this.vaildData(this.permission.tms_alarm_edit, false),
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(',');
    },
  },
  methods: {
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      var reg = /^.*\.(?:xls|xlsx)$/i;
      if (!reg.test(file.name)) {
        this.$message.error('请上传excel格式文件!');
        return false;
      }
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!');
        return false;
      }
    },
    handleSuccess(res, file) {
      if (res.success) {
        this.$message.success('文件上传成功');
        this.onLoad(this.page);
      } else {
        this.$message.error('文件上传失败：' + res.msg);
      }
    },
    rowSave(row, done, loading) {
      add(row).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowUpdate(row, index, done, loading) {
      update(row).then(
        () => {
          this.onLoad(this.page);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          done();
        },
        (error) => {
          window.console.log(error);
          loading();
        }
      );
    },
    rowDel(row) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
        });
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning('请选择至少一条数据');
        return;
      }
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: 'success',
            message: '操作成功!',
          });
          this.$refs.crud.toggleSelection();
        });
    },
    beforeOpen(done, type) {
      if (['edit', 'view'].includes(type)) {
        getDetail(this.form.id).then((res) => {
          this.form = res.data.data;
        });
      }
      done();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      const { releaseTimeRange } = params;
      let values = {
        ...params,
      };
      if (releaseTimeRange) {
        values = {
          ...params,
          releaseTime_datege: releaseTimeRange[0],
          releaseTime_datelt: releaseTimeRange[1],
        };
        values.releaseTimeRange = null;
        this.query.releaseTimeRange = null;
      }
      this.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(values, this.query)).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
  },
};
</script>

<style>
</style>
