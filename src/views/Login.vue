<template>
  <div class="page-login">
    <div class="page-login--content">
      <el-card shadow="always">
        <h3>旅点管理平台</h3>
        <el-form
          ref="loginForm"
          label-position="top"
          :rules="rules"
          :model="formLogin"
          size="default"
          @keyup.enter.native="submit('loginForm')"
        >
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="formLogin.username"
              placeholder="用户名"
            >
              <i slot="prepend" class="iconfont icon-ziyuanxhdpi"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="formLogin.password"
              placeholder="密码"
            >
              <i slot="prepend" class="iconfont icon-mima"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="check">
            <div class="identify">
              <el-input
                placeholder="请输入验证码"
                v-model="formLogin.check"
                style="margin-right: 10px"
              >
                <i slot="prepend" class="iconfont icon-yanzhengma"></i>
              </el-input>
              <div class="get-code" @click="refreshCode()">
                <s-identify
                  :identifyCode="identifyCode"
                  :contentHeight="38"
                ></s-identify>
              </div>
            </div>
          </el-form-item>
          <el-checkbox style="margin-bottom:10px" v-model="checked">记住密码</el-checkbox>
          <el-button
            size="default"
            @click="submit('loginForm')"
            type="primary"
            v-loading.fullscreen.lock="loading"
            class="button-login"
          >
            登录
          </el-button>
        </el-form>
      </el-card>
    </div>
    <ul class="circles">
      <li v-for="n in 10" :key="n"></li>
    </ul>
  </div>
</template>
<script>
import SIdentify from '@/components/SIdentify'
export default {
  name: "Login",
  components:{
    SIdentify
  },
  data() {
    return {
      checked:true,
      loading: false,
      identifyCode: "",
      identifyCodes: "0123456789abcdwerwshdjeJKDHRJHKOOPLMKQMAPGIS", //随便
      formLogin: {
        username: "admin" /* admin */,
        password: "123456" /* 123abc!! */,
        check: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: "",
            trigger: "blur",
            required: true,
          },
        ],
        check: [
          {
            validator: (rule, value, callback) => {
              //ischeck(rule, value, callback, this.identifyCode);
            },
            trigger: "blur",
            required: true,
          },
        ],
      },
    };
  },
  computed: {},
  mounted() {
    this.refreshCode();
    this.formLogin.check = this.identifyCode;
  },
  methods: {
    // 登录
    submit(name) {
      localStorage.setItem("user",JSON.stringify(this.formLogin))
      this.$router.push("/map")
      this.$refs[name].validate((valid) => {
        if (valid) {
          let postData = {
            loginname: this.formLogin.username.trim(),
            psw: setMd5(this.formLogin.password),
            expiration: 600,
          };
          this.$store
            .dispatch("user/token", postData)
            .then((user) => {
              let userId = user.id0;
              this.$store
                .dispatch("user/getInfo", { userId: userId })
                .then(() => {
                  this.$router.push({ path: "/" });
                  this.$message({
                    showClose: true,
                    message: "登录成功！",
                    type: "success",
                  });
                })
                .catch((err) => {
                  this.$message.error(err);
                });
            })
            .catch((err) => {
              this.$message.error(err);
            });
        }
      });
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
      }
    },
  },
};
</script>

<style lang="scss">
.page-login {
  position: relative;
  height: 100%;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  .page-login--content {
    width: 400px;
    z-index: 9;
    h3 {
      text-align: center;
      margin: 0 0 30px 0;
      color: #707070;
      font-size: 20px;
    }
    .button-login {
      width: 100%;
    }
  }
}
.get-code {
  height: 38px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  .s-canvas {
    height: 38px;
  }
}
.identify {
  display: flex;
  justify-content: space-between;
}
// 背景
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: #fff;
    animation: animate 25s linear infinite;
    bottom: -200px;
    @keyframes animate {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
      }
      100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
      }
    }
    &:nth-child(1) {
      left: 15%;
      width: 80px;
      height: 80px;
      animation-delay: 0s;
    }
    &:nth-child(2) {
      left: 5%;
      width: 20px;
      height: 20px;
      animation-delay: 2s;
      animation-duration: 12s;
    }
    &:nth-child(3) {
      left: 70%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      animation-delay: 0s;
      animation-duration: 18s;
    }
    &:nth-child(5) {
      left: 65%;
      width: 20px;
      height: 20px;
      animation-delay: 0s;
    }
    &:nth-child(6) {
      left: 75%;
      width: 150px;
      height: 150px;
      animation-delay: 3s;
    }
    &:nth-child(7) {
      left: 35%;
      width: 200px;
      height: 200px;
      animation-delay: 7s;
    }
    &:nth-child(8) {
      left: 50%;
      width: 25px;
      height: 25px;
      animation-delay: 15s;
      animation-duration: 45s;
    }
    &:nth-child(9) {
      left: 20%;
      width: 15px;
      height: 15px;
      animation-delay: 2s;
      animation-duration: 35s;
    }
    &:nth-child(10) {
      left: 85%;
      width: 150px;
      height: 150px;
      animation-delay: 0s;
      animation-duration: 11s;
    }
  }
}
</style>
