<template>
  <el-date-picker
    v-model="value"
    :type="type"
    :placeholder="placeholder"
    value-format="timestamp"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  ></el-date-picker>
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
      init: {
        type: [Number, Array],
        default: function () {
          return []
        }
      },
      type: {
        type: String,
        default: 'date'
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        value: null
      }
    },
    watch: {
      init: {
        handler() {
          this.initing = true
          if (typeof this.init === 'number') {
            if (this.init <= 9999999999) {
              this.value = this.init * 1000
            }
          } else if (this.init && this.init.length > 0) {
            this.value = this.init.map((v) => {
              return v <= 9999999999 ? v * 1000 : v
            })
          }
          this.$nextTick(() => {
            this.initing = false
          })
        },
        immediate: true
      },
      value: {
        handler() {
          if (this.initing) {
            return
          }
          let value
          if (typeof this.value === 'number') {
            value = this.value > 9999999999 ? this.value / 1000 : this.value
          } else if (this.value && this.value.length > 0) {
            value = this.value.map((v) => {
              return v > 9999999999 ? v / 1000 : v
            })
          }
          this.$emit('change', value)
        },
        immediate: false
      }
    },
    created() {
      this.value = this.init
    },
    mounted() {
      this.value = this.init
    },
    methods: {}
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
