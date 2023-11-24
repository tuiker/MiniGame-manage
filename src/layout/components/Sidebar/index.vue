<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
        :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText"
        :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  data(){
    return{
      canActiveItemList: [],//可以拥有选中状态的菜单
    }
  },
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      //跳转的目标路由路径在可以拥有选中状态的菜单集合中才去进行选中操作
      if (meta.activeMenu && this.canActiveItemList.some(item => item === meta.activeMenu)) {
        return meta.activeMenu
      }
      // if (meta.keepMenuActive) {
      //   return meta.targetPath;
      // }
      //跳转的目标路由路径在可以拥有选中状态的菜单集合中才去进行选中操作
      if(this.canActiveItemList.some(item => item === path)){
        return path
      }
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted(){
    this.getCanActiveItem(this.$router.options.routes);
    console.log(this.canActiveItemList);
  },
  methods: {
    //递归获取可选中的菜单路径
    getCanActiveItem(routers){
      let self = this;
      routers.forEach(item => {
        if((!item.children || item.children.length < 1) && !item.hidden){
          self.canActiveItemList.push(item.path);
        }else if(item.children && item.children.length > 0){
          self.getCanActiveItem(item.children);
        }
      });
    }
  }
}
</script>
