<template>
  <div class="base-form-image">
    <div v-if="!value.image" class="no-image" @click="doChoose">
      <i class="el-icon-plus"></i>
    </div>
    <template v-else>
      <el-image :src="value.image" :preview-src-list="[value.image]"></el-image>
      <div class="base-form-image-tool">
        <div class="btn" @click="value = { id: 0, image: '' }">
          <i class="el-icon-delete"></i>
        </div>
        <div class="btn" @click="doChoose">
          <i class="el-icon-refresh-left"></i>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  /**
   * @author 徐鹏飞
   * @desc 通用列表
   */
  export default {
    model: {
      prop: 'init', //指向props的参数名
      event: 'change' //事件名称
    },
    props: {
      index: {
        type: Number,
        default: 0
      },
      init: {
        type: Object,
        default: function () {
          return {
            id: 0,
            image: ''
          }
        }
      },
      choose: {
        type: Function,
        default: function () {
          return null
        }
      }
    },
    data() {
      return {
        value: {
          id: 0,
          image: ''
        }
      }
    },
    watch: {
      init: {
        handler() {
          console.log('this.init: ', this.init)
          this.value = this.init
        },
        immediate: true
      },
      value: {
        handler() {
          this.$emit('change', this.value)
          this.$emit('valueChange', { value: this.value, index: this.index })
        },
        immediate: false
      }
    },
    created() {
      console.log('created !!!')
      this.value = this.init
    },
    mounted() {
      console.log('mounted !!!')
      this.value = this.init
    },
    methods: {
      doChoose() {
        this.choose && this.choose(this)
      }
    }
  }
</script>
<style lang="scss">
  .base-form-image {
    width: 100px;
    height: 100px;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    box-sizing: border-box;

    .no-image {
      width: 100%;
      height: 100%;
      background-color: #fbfdff;
      border: 1px dashed #c0ccda;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: #8c939d;
      overflow: hidden;
      border-radius: 6px;
      box-sizing: border-box;
      cursor: pointer;
    }

    .el-image {
      overflow: hidden;
      background-color: #fff;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .base-form-image-tool {
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      display: none;
      justify-content: space-around;
      align-items: center;
      padding: 0 12px;
      font-size: 18px;

      .btn {
        cursor: pointer;
      }
    }

    &:hover {
      .base-form-image-tool {
        display: flex;
      }
    }
  }
</style>
