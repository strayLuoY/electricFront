<template>
  <div class="basic-container">
    <el-card :class="{ 'fullscreen_true': isFullScreen }">
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
import { EventBus } from '@/event/event-bus';
export default {
  name: 'basicContainer',
  props: {
    radius: {
      type: [String, Number],
      default: 10,
    },
    background: {
      type: String,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFullScreen: false,
    };
  },
  computed: {
    styleName() {
      return {
        borderRadius: this.setPx(this.radius),
        background: this.background,
      };
    },
  },
  mounted() {
    EventBus.$on('fullscreen', (msg) => {
      const avuemain = document.getElementsByClassName('avue-main')[0];
      if (msg) {
        avuemain.style.zIndex = 1027;
      } else {
        avuemain.style.zIndex = 1024;
      }
      this.isFullScreen = msg;
    });
  },
};
</script>

<style lang="scss">
.basic-container {
  padding: 10px 6px;
  box-sizing: border-box;
  &--block {
    height: 100%;
    .el-card {
      height: 100%;
    }
  }
  .el-card {
    width: 100%;
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
