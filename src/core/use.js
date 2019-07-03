import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import ViserVue from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'

// ext library
import VueClipboard from 'vue-clipboard2'
import PermissionHelper from '@/utils/helper/permission'
import { getDict, getDictData } from '../utils/dict'
// import '@/components/use'

VueClipboard.config.autoSetContainer = true

Vue.use(Antd)
Vue.use(ViserVue)

Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)
Vue.prototype.getDict = getDict
Vue.use(getDictData)
