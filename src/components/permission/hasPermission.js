import Vue from 'vue';
import store from '@/store'

// 检测是否有权限
// 使用Vue.directive声明自定义指令permission
Vue.directive('permission', {
    inserted(el, binding, vnode) {
        // console.log(el.localName, binding, vnode)
        const permission = binding.value
        const result = havePermission(permission)
        if (!result) {
            el.remove()
        }
    }
})

//判断用户是否有权限
const havePermission = (value) => {
    let permissionArr = value.split('|')
    let flag = false
    for (let i = 0; i < permissionArr.length; i++) {
        if (store.state.user.btnPermissions.indexOf(permissionArr[i]) >= 0) {
            flag = true
            break;
        }
    }
    return flag
}