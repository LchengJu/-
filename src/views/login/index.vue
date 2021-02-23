<template>
  <div class="login-container">
    <div class="box-left">
      <div class="box_head">
        <img src="@/assets/login-logo.png" alt="" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="title_tow">用户登录</span>
      </div>
      <div class="box_body">
        <el-form
          status-icon
          ref="ruleForm"
          :model="ruleForm"
          class="demo-ruleForm"
          :rules="rules"
        >
          <!-- 手机号码 -->
          <el-form-item prop="num" class="input_box">
            <el-input
              type="type"
              v-model="ruleForm.num"
              placeholder="请输入手机号"
              ><i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>

          <!-- 密码框 -->
          <el-form-item prop="password" class="input_box">
            <el-input
              show-password
              v-model="ruleForm.password"
              placeholder="请输入密码"
              ><i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>

          <!-- 验证码框 -->
          <el-form-item prop="code" class="yzm input_box">
            <el-input v-model="ruleForm.code" placeholder="请输入验证码">
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
            <img :src="url" alt="" @click="urlClick" />
          </el-form-item>
          <!-- 多选框 -->

          <el-form-item class="checked" prop="checked">
            <el-checkbox v-model="ruleForm.checked"
              >我已阅读并同意<el-link type="primary">用户协议</el-link
              >和<el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-form-item>

          <!-- 登录注册框 -->
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <br />
          <el-button type="primary" @click="resetForm()">注册</el-button>
        </el-form>
      </div>
    </div>
    <img src="@/assets/login-banner.png" alt="" />
    <register ref="register"> </register>
  </div>
</template>

<script>
import { userLogin, codeUrl } from "@/api/login";
import { setToken } from "../../utils/token";
import register from "./register";
export default {
  components: {
    register,
  },
  name: "login",
  data() {
    // 表单绑定的数据
    return {
      url: codeUrl(),
      ruleForm: {
        num: "",
        password: "",
        code: "",
        checked: [],
      },
      // 校验规则
      rules: {
        num: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "请输入11位手机号码",
            trigger: "change",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "请输入6-12位数的密码",
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4位数的验证码", trigger: "change" },
        ],
        checked: [
          { required: true, message: "赶紧勾上该死的靓仔", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(
            this.ruleForm.num,
            this.ruleForm.password,
            this.ruleForm.code
          );
          userLogin({
            phone: this.ruleForm.num,
            password: this.ruleForm.password,
            code: this.ruleForm.code,
          }).then((res) => {
            if (res.data.code == 200) {
              //成功回调
              setToken(res.data.data.token);
              this.$router.push("/index");
            } else {
              this.$message.error(res.data.message);
            }
            console.log(res);
          });
        } else {
          this.$message.error("好好输入你的信息靓仔");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.register.dialogFormVisible=true;
    },
    urlClick() {
      this.url = codeUrl();
      console.log(this.url);
    },
  },
};
</script>

<style lang="less" >
// 背景盒子
.login-container {
  height: 100%;
  background: linear-gradient(#1493fa 28%, #01c6fa 96%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  // 左边盒子
  .box-left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    // 盒子头部
    .box_head {
      margin-top: 48px;
      margin-left: 48px;
      display: flex;
      align-items: center;
      .title {
        font-size: 22px;
        margin-right: 14px;
      }
      img {
        width: 25px;
        height: 18px;
        margin-right: 13px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: #c7c7c7;
      }
      .title_tow {
        font-size: 20px;
        margin-left: 12px;
      }
    }

    // 盒子主体
    .box_body {
      margin-top: 29px;
      padding: 42px;
      padding-top: 0;
      line-height: 0;
      .input_box {
        margin-bottom: 26px;
        input {
          width: 394px;
          height: 45px;
        }
      }
      // 验证码框
      .yzm {
        .el-input {
          width: 284px;
          float: left;
          input {
            width: 100%;
          }
        }
        img {
          width: 110px;
          height: 42px;
          border: dashed 1px #999;
          float: right;
          margin-top: 1px;
        }
      }
      // 协议勾选框
      .checked {
        margin-bottom: 28px;
        .el-form-item__content {
          line-height: 0;
        }
        .el-link {
          font-size: 16px;
          margin-bottom: 3px;
        }
        .el-checkbox__label {
          font-size: 16px;
        }
      }
      // 按钮
      .el-button {
        width: 394px;
        height: 40px;
        background: #1493fa;
        border-radius: 4px;
        margin-bottom: 26px;
        font-size: 15px;
      }
    }
  }
}
</style>