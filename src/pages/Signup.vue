<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-5">
        <div class="card border-0 rounded-lg shadow">
          <div class="card-body p-5">
            <h3 class="text-center mb-4">Sign Up</h3>

            <form @submit.prevent="submitForm">

              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="email" v-model="email" placeholder="name@example.com" required>
                <label for="email">이메일 주소</label>
                <div v-if="!isEmailValid" class="invalid-feedback">{{ emailErrorMessage }}</div>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="password" v-model="password" placeholder="비밀번호" required>
                <label for="password">비밀번호</label>
                <div v-if="!isPasswordValid" class="invalid-feedback">{{ passwordErrorMessage }}</div>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" placeholder="비밀번호 확인" required>
                <label for="confirmPassword">비밀번호 확인</label>
                <div v-if="password !== confirmPassword" class="invalid-feedback">비밀번호가 일치하지 않습니다.</div>
              </div>

              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="nickname" v-model="nickname" placeholder="사용자 이름" required>
                <label for="nickname">닉네임</label>
                <div v-if="!isNicknameValid" class="invalid-feedback">{{ nicknameErrorMessage }}</div>
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary btn-lg">가입하기</button>
              </div>
            </form>
          </div>
          <div class="card-footer bg-transparent text-center py-3">
            <div class="small">이미 계정이 있으신가요? <a href="#">로그인</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import router from "@/scripts/router";

export default {
  data() {
    return {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      isEmailValid: true,
      isPasswordValid: true,
      isNicknameValid: true,
      emailErrorMessage: '',
      passwordErrorMessage: '',
      nicknameErrorMessage: ''
    };
  },
  methods: {
    submitForm() {
      // 유효성 검사
      this.isEmailValid = this.validateEmail(this.email);
      this.isPasswordValid = this.validatePassword(this.password);
      this.isNicknameValid = this.validateNickname(this.nickname);

      // 에러 메시지 설정
      this.emailErrorMessage = this.isEmailValid ? '' : '유효한 이메일 주소를 입력하세요.';
      this.passwordErrorMessage = this.isPasswordValid ? '' : '비밀번호는 영어 대문자, 특수문자, 숫자를 포함하여야 합니다. (8자 이상)';
      this.nicknameErrorMessage = this.isNicknameValid ? '' : '닉네임은 영어와 숫자만 포함하여야 합니다.';

      // 모든 유효성 검사 통과 시 폼 제출
      if (this.isEmailValid && this.isPasswordValid && this.password === this.confirmPassword && this.isNicknameValid) {
        axios.post(`/api/members/signup`, {
          nickname: this.nickname,
          email: this.email,
          password: this.password
        }).then((res) => {
          if (res.data.header.success) {
            alert('회원가입이 완료되었습니다.');
            router.push('/signin');
          } else {
            alert(res.data.header.message);
          }
        }).catch(() => {
          alert('회원가입 중 오류가 발생했습니다.');
        });
      }
    },
    validateEmail(email) {
      const emailPattern = /\S+@\S+\.\S+/;
      return emailPattern.test(email);
    },
    validatePassword(password) {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      return passwordPattern.test(password);
    },
    validateNickname(nickname) {
      const nicknamePattern = /^[a-zA-Z0-9]+$/;
      return nicknamePattern.test(nickname);
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

a {
  color: #4caf50;
}

a:hover {
  color: #388e3c;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 80%;
  display: block;
}
</style>
