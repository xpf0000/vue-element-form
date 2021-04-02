<template>
  <el-form
    ref="form"
    :model="form"
    :label-position="config.labelPosition"
    :rules="rules"
    :label-width="config.labelWidth"
  >
    <template v-for="(item, index) in list">
      <el-form-item :key="index" :label="item.label" :prop="item.prop">
        <el-input
          v-if="item.type === 'input'"
          v-model.trim="form[item.prop]"
          clearable
          :placeholder="item.placeholder"
          autocomplete="off"
        ></el-input>
        <el-input
          v-else-if="item.type === 'password'"
          v-model.trim="form[item.prop]"
          clearable
          show-password
          :placeholder="item.placeholder"
          autocomplete="off"
        ></el-input>
        <el-input
          v-else-if="item.type === 'number'"
          v-model.number="form[item.prop]"
          clearable
          type="number"
          :placeholder="item.placeholder"
          autocomplete="off"
        ></el-input>
        <el-input
          v-else-if="item.type === 'textarea'"
          v-model.number="form[item.prop]"
          type="textarea"
          :rows="4"
          clearable
          :placeholder="item.placeholder"
          autocomplete="off"
        ></el-input>
        <el-select
          v-else-if="item.type === 'select'"
          v-model="form[item.prop]"
          class="base-form-select"
          filterable
          clearable
          :placeholder="item.placeholder || '请选择'"
        >
          <el-option
            v-for="op in item.options"
            :key="op.value"
            :label="op.label"
            :value="op.value"
          ></el-option>
        </el-select>
        <BaseDate
          v-else-if="item.type === 'date'"
          v-model="form[item.prop]"
          type="date"
          :placeholder="item.placeholder || '选择日期'"
        ></BaseDate>
        <BaseDate
          v-else-if="item.type === 'datetime'"
          v-model="form[item.prop]"
          type="datetime"
          value-format="timestamp"
          :placeholder="item.placeholder || '选择日期时间'"
        ></BaseDate>
        <BaseDate
          v-else-if="item.type === 'daterange'"
          v-model="form[item.prop]"
          type="datetimerange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></BaseDate>
        <el-checkbox-group
          v-else-if="item.type === 'checkbox'"
          v-model="form[item.prop]"
        >
          <el-checkbox
            v-for="op in item.options"
            :key="op.value"
            :label="op.value"
          >
            {{ op.label }}
          </el-checkbox>
        </el-checkbox-group>
        <el-radio-group
          v-else-if="item.type === 'radio'"
          v-model="form[item.prop]"
        >
          <el-radio
            v-for="op in item.options"
            :key="op.value"
            :label="op.value"
          >
            {{ op.label }}
          </el-radio>
        </el-radio-group>
        <ImageSelect
          v-else-if="item.type === 'image'"
          v-model="form[item.prop]"
          :choose="item.choose"
        ></ImageSelect>
        <ImagesSelect
          v-else-if="item.type === 'images'"
          v-model="form[item.prop]"
          :max="item.max || 5"
          :choose="item.choose"
        ></ImagesSelect>
        <template v-else-if="!item.type">
          <slot :name="item.label"></slot>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
  import ImageSelect from '../BaseImageSelect'
  import ImagesSelect from '../BaseImagesSelect'
  import BaseDate from '../BaseDate'
  const BaseFormConfig = {
    labelWidth: '120px',
    labelPosition: 'right',
    maxLabelFont: 6
  }
  /**
   * @author 徐鹏飞
   * @desc 通用列表
   */
  export default {
    config(c) {
      for (let k in c) {
        BaseFormConfig[k] = c[k]
      }
    },
    components: { ImageSelect, ImagesSelect, BaseDate },
    props: {
      form: {
        type: Object,
        default: function () {
          return {}
        }
      },
      rules: {
        type: Object,
        default: function () {
          return {}
        }
      },
      list: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        config: {}
      }
    },
    created() {
      this.config = JSON.parse(JSON.stringify(BaseFormConfig))
      if (this.config.maxLabelFont) {
        let gt = this.list.some((item) => {
          return item.label.length > this.config.maxLabelFont
        })
        if (gt) {
          this.config.labelPosition = 'top'
        }
      }
    }
  }
</script>
