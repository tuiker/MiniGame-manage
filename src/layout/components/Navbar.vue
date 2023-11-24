<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <div class="userName">{{ name }}</div>
      <div class="avatar-container">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
        </div>
      </div>
      <div class="header-quit" divided @click="logout"><svg-icon icon-class="logout" /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Cookies from 'js-cookie'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  mounted() {
    this.getMyUserInfo();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    getMyUserInfo() {
      this.$store.dispatch('user/getInfo')
    },
    async logout() {
      this.$confirm('是否确认退出登录？', '确认信息', {
        distinguishCancelAndClose: true
      }).then(async () => {
        await this.$store.dispatch('user/logout')
        // Cookies.remove("vue_admin_template_token")
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 70px;
  overflow: hidden;
  position: relative;
  background: #eeeeee;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 70px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    display: flex;
    height: 100%;
    line-height: 50px;
    align-items: center;

    &:focus {
      outline: none;
    }

    .userName {
      margin-right: 10px;
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }
      }

    }

    .header-quit {
      margin-right: 20px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      cursor: pointer;

      .svg-icon {
        width: 20px;
        height: 20px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
  }
}
</style>
