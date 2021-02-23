<template>
  <div id="myindex">
    <el-container class="index_container" v-if="this.$store.state.userInfo">
      <!-- 头部盒子 -->
      <el-header class="box_header">
        <!-- 头部左侧盒子 -->
        <div class="header_left">
          <i class="el-icon-s-fold" @click="isCollapse = !isCollapse"></i>
          <img src="../../assets/Logo.png" alt="" />
          <span>黑马面面</span>
        </div>
        <!-- 头部右侧盒子 -->
        <div class="header_right">
          <div class="userImg">
            <el-avatar icon="el-icon-user-solid" :src="userImg"></el-avatar>
          </div>
          <span class="username"
            >{{ this.$store.state.userInfo.username }}，你好</span
          >
          <el-button type="primary" size="small" @click="open">退出</el-button>
        </div>
      </el-header>

      <el-container class="box_body">
        <el-aside width="auto" class="body_left">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            router
          >
            <template v-for="(item, index) in children">
              <el-menu-item
                :index="/index/ + item.path"
                :key="index"
                v-if="
                  item.meta.roles.includes($store.state.userInfo.role) ||
                  $store.state.userInfo.role == '超级管理员'
                "
              >
                <i :class="item.meta.icon"></i>
                <span slot="title">{{ item.meta.title }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="body_right">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getToken, removeToken } from "../../utils/token";
import { getUserInfo, userUrl } from "../../api/index";
import routes from "../../router/routes";
export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
      token: "",
      userInfo: {},
      userImg: "",
      children: routes[2].children,
    };
  },
  created() {
    this.token = getToken();
    if (this.token) {
      getUserInfo(this.token).then((res) => {
        if (res.data.code == 206) {
          this.$message.error("请先登录");
          removeToken();
          this.$router.push("/login");
        } else {
          // console.log(res);
          // this.userInfo = res.data.data;
          // console.log(this.userInfo);
          // console.log(this.userImg);
          if (res.data.data.status == 0) {
            this.$message.error("此号被封请充值");
            this.$router.push("/login");
          } else {
            this.$store.state.userInfo = res.data.data;
            this.userImg = userUrl(this.$store.state.userInfo.avatar);
          }

        }
      });
    } else {
      this.$message.error("请先登录");
      this.$router.push("/login");
    }
  },
  methods: {
    // 退出按钮事件
    open() {
      this.$confirm("真的要走吗？", "赶紧滚好吗", {
        confirmButtonText: "我这就滚",
        cancelButtonText: "我就不滚",
        type: "warning",
      })
        .then(() => {
          removeToken();
          this.$message({
            type: "success",
            message: "麻溜滚吧!",
          });
          this.$store.state.userInfo = undefined;
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "诶哟不滚了阿",
          });
        });
    },
  },
  watch: {
    $route() {
      console.log(this.$route.path);
      console.log(this.$route.meta.roles);
      console.log(this.$store.state.getUserInfo);
      if (
        this.$route.meta.roles.includes(this.$store.state.userInfo.role) ||
        this.$store.state.userInfo.role == "超级管理员"
      ) {
        console.log("可以");
      } else {
        this.$message.warning("滚粗切");
        this.$router.push("/index/chart");
      }
    },
  },
};
</script>

<style lang="less">
#myindex {
  height: 100%;
  .index_container {
    height: 100%;
    // 头部
    .box_header {
      height: 60px;
      display: flex;
      justify-content: space-between;
      // 头部左侧盒子
      .header_left {
        display: flex;
        align-items: center;
        span {
          font-size: 22px;
          color: #49a1ff;
        }
        i {
          font-size: 26px;
          margin-right: 22px;
        }
        img {
          height: 28px;
          width: 33px;
          margin-right: 11px;
        }
      }
      .header_right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .username {
          font-size: 14px;
          margin-right: 38px;
        }
        .userImg {
          margin-right: 9px;
        }
      }
    }

    .box_body {
      .body_left {
        background-color: #fff;
        .el-menu-vertical-demo:not(.el-menu--collapse) {
          width: 200px;
          min-height: 400px;
        }
      }
      .body_right {
        background-color: #e8e9ec;
      }
    }
  }
}
</style>