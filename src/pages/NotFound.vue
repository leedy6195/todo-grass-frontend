<template>
  <div class="not-found">
    <h1>404 - 페이지를 찾을 수 없습니다.</h1>
    <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
    <router-link to="/">홈으로 돌아가기</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h1 {
  font-size: 48px;
  color: #333;
}

.not-found p {
  font-size: 18px;
  color: #666;
  margin-top: 20px;
}

.not-found router-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.not-found router-link:hover {
  background-color: #0056b3;
}
</style>
