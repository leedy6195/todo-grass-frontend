<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-5">
        <div class="card border-0 rounded-lg shadow">
          <div class="card-body p-5">
            <h3 class="text-center mb-4">Sign In</h3>
            <form @submit.prevent="submitForm">

              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="email" v-model="email" placeholder="name@example.com" required>
                <label for="email">Email Address</label>
                <div v-if="!isEmailValid" class="invalid-feedback">{{ emailErrorMessage }}</div>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Password" required>
                <label for="password">Password</label>
                <div v-if="!isPasswordValid" class="invalid-feedback">{{ passwordErrorMessage }}</div>
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary btn-lg">Sign In</button>
              </div>
            </form>
          </div>
          <div class="card-footer bg-transparent text-center py-3">
            <div class="small">Don't have an account? <router-link to="/signup">Sign Up</router-link></div>
            <div class="mt-3">Or sign in with:</div>
            <div class="mt-3">
              <button @click="signInWithProvider('naver')" class="btn btn-outline-dark me-2">Naver</button>
              <button @click="signInWithProvider('kakao')" class="btn btn-outline-dark me-2">Kakao</button>
              <button @click="signInWithProvider('google')" class="btn btn-outline-dark">Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/scripts/router";
import store from "@/scripts/store";

export default {
  data() {
    return {
      email: '',
      password: '',
      isEmailValid: true,
      isPasswordValid: true,
      emailErrorMessage: '',
      passwordErrorMessage: ''
    };
  },
  methods: {
    submitForm() {
      // 유효성 검사
      this.isEmailValid = this.validateEmail(this.email);
      this.isPasswordValid = this.validatePassword(this.password);

      // 에러 메시지 설정
      this.emailErrorMessage = this.isEmailValid ? '' : '유효한 이메일 주소를 입력하세요.';
      this.passwordErrorMessage = this.isPasswordValid ? '' : '비밀번호는 영어 대문자, 특수문자, 숫자를 포함하여야 합니다. (8자 이상)';

      // 모든 유효성 검사 통과 시 폼 제출
      if (this.isEmailValid && this.isPasswordValid) {
        axios.post(`/api/members/signin`, {
          email: this.email,
          password: this.password
        }).then((response) => {
          store.commit('setMemberInfo', response.data.data);
          router.push(`/${response.data.data.nickname}`);
        }).catch(() => {
          alert('로그인 실패!');
        });
      }
    },
    signInWithProvider(provider) {
      // 각 소셜 로그인 제공자에 대한 처리
      alert(`${provider} 로그인`);
    },
    validateEmail(email) {
      const emailPattern = /\S+@\S+\.\S+/;
      return emailPattern.test(email);
    },
    validatePassword(password) {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      return passwordPattern.test(password);
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #ffffff;
}

.btn-primary {
  background-color: #4caf50;
  border-color: #4caf50;
}

.btn-primary:hover {
  background-color: #388e3c;
  border-color: #388e3c;
}

.btn-primary:focus {
  background-color: #388e3c;
  border-color: #388e3c;
  box-shadow: 0 0 0 0.25rem rgba(76, 175, 80, 0.5);
}

.invalid-feedback {
  color: #dc3545;
  font-size: 80%;
  display: block;
}
</style>
