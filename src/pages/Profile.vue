<template>
  <div class="container mt-5" style="width: 60%;">
    <h1 class="mb-4">프로필 수정</h1>
    <div class="mb-3">
      <label for="email" class="form-label">이메일:</label>
      <input type="email" id="email" class="form-control" v-model="email" readonly>
    </div>
    <div class="mb-3">
      <label for="nickname" class="form-label">닉네임:</label>
      <input type="text" id="nickname" class="form-control" v-model="nickname" readonly>
    </div>
    <div class="mb-3">
      <label for="profileImage" class="form-label">프로필 이미지:</label>
      <input type="file" id="profileImage" class="form-control" @change="onFileChange">
    </div>
    <div class="mb-3" v-if="profileImageUrl">
      <label class="form-label">현재 프로필 이미지:</label>
      <img :src="profileImageUrl" class="img-thumbnail" alt="프로필 이미지">
    </div>
    <button @click="saveProfile" class="btn btn-primary">저장</button>
  </div>
</template>

<script>
import {ref} from 'vue';
import axios from "axios";

export default {
  setup() {
    const email = ref('');
    const nickname = ref('');
    const profileImage = ref(null);
    const profileImageUrl = ref(''); // 기존 프로필 이미지 URL

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        profileImage.value = file;
        const reader = new FileReader();

        reader.onload = () => {
          // 미리보기 이미지 표시하는 로직
        };
        reader.readAsDataURL(file);
      }
    };

    const saveProfile = () => {
      const formData = new FormData();
      formData.append("profileImage", profileImage.value)
      axios.put(`/api/members/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })

    };

    const initializeProfile = () => {
      axios.get(`/api/members/profile`).then((res) => {
        const data = res.data.data;
        email.value = data.email;
        nickname.value = data.nickname;
        profileImageUrl.value = data.profileImgPath
      })
    };

    initializeProfile();

    return {
      email,
      nickname,
      profileImage,
      profileImageUrl,
      onFileChange,
      saveProfile
    };
  }
};
</script>

<style>
/* No custom styles needed, since Bootstrap classes are used */
</style>
