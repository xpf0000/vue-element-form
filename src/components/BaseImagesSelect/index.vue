<template>
  <div class="base-form-images">
    <DragAble v-model="values" class="wapper" group="ImageSelecter">
      <template v-for="(i, index) in max">
        <ImageSelect
          :key="index"
          :init="values[index]"
          :index="index"
          :choose="choose"
          @valueChange="valueChange"
        ></ImageSelect>
      </template>
    </DragAble>
  </div>
</template>

<script>
  import ImageSelect from '../BaseImageSelect'
  import DragAble from 'vuedraggable'
  /**
   * @author 徐鹏飞
   * @desc 通用列表
   */
  export default {
    components: { ImageSelect, DragAble },
    model: {
      prop: 'init', //指向props的参数名
      event: 'change' //事件名称
    },
    props: {
      max: {
        type: Number,
        default: 5
      },
      init: {
        type: Array,
        default: function () {
          return []
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
        values: []
      }
    },
    computed: {
      arr() {
        return this.values.filter((item) => {
          return item && item.image.length > 0
        })
      }
    },
    watch: {
      init: {
        handler() {
          this.value = this.init
        },
        immediate: true,
        deep: true
      },
      arr: {
        handler() {
          this.$emit('change', this.arr)
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      valueChange({ value, index }) {
        console.log('valueChange !!!', value, index)
        this.$set(this.values, index, value)
      }
    }
  }
</script>
<style lang="scss">
  .base-form-images {
    display: flex;
    align-items: center;

    .wapper {
      display: flex;
      align-items: center;
    }

    .base-form-image {
      margin-right: 10px;
    }
  }
</style>
