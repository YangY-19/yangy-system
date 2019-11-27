<template>
  <div class="login">
    <el-container>
      <el-header class="el-header">你的系统</el-header>
      {{/*登录框*/}}
      <el-main>
          <el-button type="primary" @click="clearTokin">清除TOKIN</el-button>
          <div class="login-box">
            <p>登录框框</p>  
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                >
                <el-form-item label="账号" prop="account">
                  <el-input v-model.number="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
          </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { fakeAccountLogin } from '../../services/login';
import { Base64 } from 'js-base64';
 export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };

      return {
        ruleForm: {
          pass: '',
          account: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          account: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            debugger
              fakeAccountLogin({
                params:{
                    AccountNo: this.ruleForm.account,
                    Password:Base64.encode( this.ruleForm.pass),
                    type: 'account',
                }
            }).then(res => {
                  debugger
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      clearTokin() {
        localStorage.valueOf()
        debugger
        // localStorage.removeitem('access_token')
        delete localStorage["access_token"];
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-header{
      font-family: sans-serif;
      font-size: 30px;
       color: #999;
  }
  .login-box{
      width: 500px;
      padding: 20px 40px 20px 20px;
      border-radius: 10px;
      margin: 0px auto;
      margin-top: 100px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      p{
        color: #2c3e50;
        padding:0 0 30px 0;   
      }
  }
</style>