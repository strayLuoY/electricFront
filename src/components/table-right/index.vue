<template>
  <span>
    <slot name='otherTips'></slot>
    <el-button type="text" icon="el-icon-plus" class="rightbtn" v-if="addPermission && addBtn" @click="add">{{ $t('crud.addBtn') }}</el-button>
    <el-button type="text" icon="el-icon-delete" class="rightbtn" v-if="delPermission && delBtn" @click="handleDelete"> {{ $t('crud.delBtn') }}</el-button>
    <slot></slot>
    <el-tooltip style="height:auto" effect="dark" class="rightbtn" :content="$('scopecrud.exportBtn')" v-if="exportPermission" placement="bottom">
      <div class="top-bar__item">
        <!-- <el-button type="text" icon="el-icon-download" @click="handleExport"></el-button> -->
        <i class="el-icon-download" @click="handleExport"></i>
      </div>
    </el-tooltip>
    <el-tooltip style="height:auto" effect="dark" v-if="fullBtn && rightbtn" :content="isFullscreen?$t('navbar.screenfullF'):$t('navbar.screenfull')" placement="bottom">
      <div class="top-bar__item">
        <i :class="isFullscreen?'el-icon-crop':'el-icon-full-screen'" @click="sendScreen"></i>
      </div>
    </el-tooltip>
    <el-dropdown placement="bottom" v-if='lineHeightBtn' :hide-on-click="false" trigger="click">
      <el-tooltip style="height:auto" effect="dark" class="rightbtn" :content="$t('scopecrud.rowHeightBtn')" placement="bottom">
        <div class="top-bar__item">
          <i class="iconfont icon--zitihanggao"></i>
        </div>
      </el-tooltip>
      <el-dropdown-menu slot="dropdown" style="width: 200px;">
        <el-dropdown-item>
          <el-slider v-model="value2" :max="500" :format-tooltip="formatFontTool"></el-slider>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown placement="bottom" v-if='fontSizeBtn' :hide-on-click="false" trigger="click">
      <el-tooltip style="height:auto" effect="dark" class="rightbtn" :content="$t('scopecrud.fontSizeBtn')" placement="bottom">
        <div class="top-bar__item">
          <i class="iconfont icon-zitidaxiao"></i>
        </div>
      </el-tooltip>
      <el-dropdown-menu slot="dropdown" style="width: 200px;">
        <el-dropdown-item>
          <el-slider :min='12' v-model="value1" :format-tooltip="formatFontTool"></el-slider>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tooltip style="height:auto" effect="dark" v-if='refreshBtn && rightbtn' class="rightbtn" :content="$t('crud.refreshBtn')" placement="bottom">
      <div class="top-bar__item">
        <i class="el-icon-refresh" @click="refresh"></i>
      </div>
    </el-tooltip>
    <el-tooltip style="height:auto" effect="dark" class="rightbtn" v-if='columnBtn && rightbtn' :content="$t('crud.filterBtn')" placement="bottom">
      <div class="top-bar__item">
        <i class="el-icon-s-operation" @click="showColumnChange"></i>
      </div>
    </el-tooltip>
    <el-tooltip style="height:auto" effect="dark" class="rightbtn" v-if='searchBtn && rightbtn' :content="$t('crud.searchBtn')" placement="bottom">
      <div class="top-bar__item">
        <i class="el-icon-search" @click="changeSearchShow"></i>
      </div>
    </el-tooltip>
  </span>
</template>

<script>
import { getByClass } from '@/util/func';
import { mapState } from 'vuex';
import { EventBus } from '@/event/event-bus';
import '@/styles/iconfont/iconfont.css';
export default {
  props: {
    refreshChange: {
      required: false,
      default: false,
    },
    delPermission: {
      required: false,
      default: false,
    },
    addPermission: {
      required: false,
      default: false,
    },
    exportPermission: {
      required: false,
      default: false,
    },
    handleDelete: {
      required: false,
      default: false,
    },
    handleExport: {
      required: false,
      default: false,
    },
    crud: {
      required: false,
      default: '',
    },
    addBtn: {
      required: false,
      default: true,
    },
    delBtn: {
      required: false,
      default: true,
    },
    lineHeightBtn: {
      required: false,
      default: true,
    },
    fontSizeBtn: {
      required: false,
      default: true,
    },
    refreshBtn: {
      required: false,
      default: true,
    },
    columnBtn: {
      required: false,
      default: true,
    },
    searchBtn: {
      required: false,
      default: true,
    },
    rightbtn: {
      required: false,
      default: true,
    },
    fullBtn: {
      required: false,
      default: true,
    },
    handleAdd: {
      required: false,
    },
    addTitle: {
      required: false,
      default: '新 增',
    },
    id: {
      required: false,
      default: '',
    },
    data: {
      required: true,
      default: [],
    },
  },
  data() {
    return {
      value1: 12,
      value2: 22,
      isFullscreen: false,
    };
  },
  computed: {
    ...mapState({
      showFullScren: (state) => state.common.showFullScren,
    }),
  },
  methods: {
    changeSearchShow() {
      this.crud.$refs.headerSearch.handleSearchShow();
    },
    showColumnChange() {
      this.crud.$refs.dialogColumn.columnBox = true;
    },
    refresh() {
      this.refreshChange();
    },
    add() {
      if (this.handleAdd) {
        this.handleAdd();
      } else {
        this.crud.rowAdd();
      }
    },
    formatFontTool(val) {
      return val + 'px';
    },
    sendScreen() {
      this.isFullscreen = !this.isFullscreen;
      EventBus.$emit('fullscreen', this.isFullscreen);
    },
    fontFn(val) {
      const table = getByClass(document.getElementById(this.id) || document, 'el-table')[0];
      const tableChildren = table.getElementsByTagName('*');
      for (var j = 0; j < tableChildren.length; j++) {
        tableChildren[j].style.fontSize = val + 'px';
        tableChildren[j].style.lineHeight = val + 9.5 + 'px';
      }
    },
    lineHeightFn(val) {
      const table = getByClass(document.getElementById(this.id) || document, 'el-table')[0];
      const tableChildren = table.getElementsByTagName('td');
      for (var i = 0; i < tableChildren.length; i++) {
        if (tableChildren[i].tagName == 'TD') {
          tableChildren[i].style.height = val + 'px';
        }
      }
    },
  },
  watch: {
    value1(newValue, oldValue) {
      this.fontFn(newValue);
    },
    value2(newValue, oldValue) {
      this.lineHeightFn(newValue);
    },
    'crud.$refs.dialogColumn.columnBox'(newValue) {
      if (!newValue) {
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.$nextTick(() => {
              this.fontFn(this.value1);
              this.lineHeightFn(this.value2);
            });
          });
        });
      }
    },
    data: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.$nextTick(() => {
              this.fontFn(this.value1);
              this.lineHeightFn(this.value2);
            });
          });
        });
      },
      immediate: false,
    },
  },
  created() {
    // this.changeSearchShow();
  },
  mounted() {
    //
    // 	  setTimeout(()=>{
    // 		  this.fontFn(this.value1);
    // 		  this.lineHeightFn(this.value2);
    // 	  },2000)
  },
};
</script>
<style lang="scss" scoped>
</style>