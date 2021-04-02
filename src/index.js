import BaseForm from './components/BaseForm'
import BaseDate from './components/BaseDate'
import BaseImageSelect from './components/BaseImageSelect'
import BaseImagesSelect from './components/BaseImagesSelect'

function install(Vue, config = {}) {
  if (install.installed) return
  install.installed = true
  BaseForm.config(config)
  Vue.component('BaseForm', BaseForm)
  Vue.component('BaseDate', BaseDate)
  Vue.component('BaseImageSelect', BaseImageSelect)
  Vue.component('BaseImagesSelect', BaseImagesSelect)
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(install)
}
export default install
export { BaseForm, BaseDate, BaseImageSelect, BaseImagesSelect }
