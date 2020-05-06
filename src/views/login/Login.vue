<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="(item, index) in menuTab"
          :key="item.id"
          :class="{ current: item.isActive }"
          @click="togMenu(index)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!--表单开始-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="login-form"
      >
        <el-form-item prop="userName">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.userName"
            autocomplete="off"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passWord"
            autocomplete="off"
            size="medium"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWords" v-show="menuTab[1].isActive">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passWords"
            autocomplete="off"
            size="medium"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                type="text"
                v-model="ruleForm.code"
                size="medium"
                maxlength="6"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSmsClick()"
                :disabled="getSmsBtnStatus"
                >{{ getSmsBtnText }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="block"
            style="width: 100%"
            v-bind:disabled="loginBtnStatus"
            >{{ !menuTab[0].isActive ? "注册" : "登录" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { reactive, onMounted, ref } from "@vue/composition-api";
import { regUserName, regPassWord, regCode } from "@/utils/validate";
import { getSms, userRegister, userLogin } from "@/api/login";
import { setCookie } from "@/utils/app";
export default {
  setup: function(props, context) {
    /********************************************************************************************************
     * 表单验证
     */
    /*验证用户名*/
    let validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!regUserName(value)) {
        callback(new Error("用户名格式不对"));
      } else {
        callback();
      }
    };
    /* 验证密码*/
    let validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regPassWord(value)) {
        callback(new Error("密码为6至20位字母加数字"));
      } else {
        callback();
      }
    };
    /* 验证密码*/
    let validatePassWords = (rule, value, callback) => {
      if (!menuTab[1].isActive) {
        callback();
      } else if (value === "") {
        callback(new Error("请输入重复密码"));
      } else if (ruleForm.passWord !== value) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    /*验证码验证*/
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!regCode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    const menuTab = reactive([
      { txt: "登录", isActive: true },
      { txt: "注册", isActive: false }
    ]);
    /*************************************************************************************
     * 表单数据
     */
    const ruleForm = reactive({
      userName: "121877122@qq.com",
      passWord: "admin998",
      passWords: "",
      code: ""
    });
    const rules = reactive({
      userName: [{ validator: validateUserName, trigger: "blur" }],
      passWord: [{ validator: validatePassWord, trigger: "blur" }],
      passWords: [{ validator: validatePassWords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    /*************************************************************************************
     * 模块值
     */
    //登录按钮可操作状态
    const loginBtnStatus = ref(true);
    //获取验证码按钮可操作状态
    const getSmsBtnStatus = ref(false);
    // 获取验证码按钮显是的文字
    const getSmsBtnText = ref("获取验证码");
    //倒计时
    const timer = ref(null);
    //挂载完成后执行 方法
    onMounted(() => {});
    /*****************************************************************************
     * 登录注册切换
     */
    const togMenu = item => {
      if (item === 0) {
        menuTab[0].isActive = true;
        menuTab[1].isActive = false;
      } else {
        menuTab[0].isActive = false;
        menuTab[1].isActive = true;
      }
      context.refs["loginForm"].resetFields();
      clearCountDown();
    };
    /************************************************************************************************
     * 获取验证码
     */
    const getSmsClick = () => {
      if (ruleForm.userName === "") {
        context.root.$message.error("用户名为空");
        return false;
      } else if (!regUserName(ruleForm.userName)) {
        context.root.$message.error("用户名格式错误");
        return false;
      }
      let getSmsData = {
        username: ruleForm.userName,
        module: menuTab[1].isActive ? "register" : "login"
      };
      getSmsBtnStatus.value = true;
      getSmsBtnText.value = "发送中";
      getSms(getSmsData)
        .then(response => {
          // 接口调用成功
          let data = response.data;
          if (data.resCode === 0) {
            context.root.$message({
              message: data.message,
              type: "success"
            });
            loginBtnStatus.value = false;
            countDown();
          }
        })
        .catch(error => {
          context.root.$message.error(error.message);
          getSmsBtnStatus.value = false;
          getSmsBtnText.value = "重新发送";
        });
    };
    onMounted(() => {
      // getSms({a: "s"});
    });
    /**
     * 倒计时
     */
    const countDown = () => {
      let cDTime = 60;
      if (timer.value) {
        clearInterval(timer.value);
      } else {
        timer.value = setInterval(() => {
          getSmsBtnText.value = `倒计时 ${cDTime}秒`;
          cDTime--;
          if (cDTime === -1) {
            clearInterval(timer.value);
            // 更改按钮文字
            getSmsBtnText.value = "重新发送";
            // 按钮可点击
            getSmsBtnStatus.value = false;
          }
        }, 1000);
      }
    };
    /**
     * 清除倒计时
     */
    const clearCountDown = () => {
      getSmsBtnStatus.value = false;
      getSmsBtnText.value = "获取验证码";
      clearInterval(timer.value);
    };
    /*******************************************************************************************************************
     * 登录注册方法
     */
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          let registryData = {
            username: ruleForm.userName,
            passWord: sha1(ruleForm.passWord),
            code: ruleForm.code
          };
          if (menuTab[1].isActive) {
            // 注册
            userRegister(registryData)
              .then(response => {
                let data = response.data;
                context.root.$message({
                  message: data.message,
                  type: "success"
                });
                togMenu(0);
              })
              .catch(error => {
                context.root.$message.error(error.message);
              });
          } else {
            //登录
            userLogin(registryData)
              .then(response => {
                let data = response.data;
                context.root.$message({
                  message: data.message,
                  type: "success"
                });
                console.log(data.data);
                setCookie("username", data.data.username);
                setCookie("token", data.data.token);
                context.root.$router.push({
                  path: "/console",
                  query: { id: "xxxx" }
                });
              })
              .catch(error => {
                context.root.$message.error(error.message);
              });
          }
        } else {
          context.root.$message.error("数据格式错误");
          return false;
        }
      });
    };
    return {
      menuTab,
      togMenu,
      ruleForm,
      rules,
      submitForm,
      getSmsClick,
      loginBtnStatus,
      getSmsBtnStatus,
      getSmsBtnText
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}

.login-wrap {
  width: 380px;
  margin: auto;
}

.menu-tab {
  text-align: center;
  line-height: 36px;

  li {
    display: inline-block;
    width: 88px;
    height: 36px;
    color: #ffffff;
    cursor: pointer; //  悬浮手势
  }

  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

//表达label样式
.login-form {
  label {
    display: block;
    color: white;
    font-size: 14px;
  }

  .block {
    display: block;
    width: 100%;
    text-align: center;
  }
}
</style>
