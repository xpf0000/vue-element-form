import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import BaseForm from './index'
Vue.use(BaseForm, {
  labelWidth: '200px',
  labelPosition: 'left',
  maxLabelFont: 10
})
new Vue({
  el: '#app',
  render: (h) => h(App)
})
