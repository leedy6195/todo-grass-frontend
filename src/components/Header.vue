<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">GitHub-like Design</router-link>
      <!-- Search bar -->
      <div class="input-group input-group-sm" style="max-width: 200px; margin-left: auto;">
        <input type="text" class="form-control bg-dark text-white placeholder-gray border-gray" placeholder="Search..."
               aria-label="Search">
        <!-- Search button removed -->
      </div>

      <!-- Sign In and Sign Up -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/signin" class="nav-link" v-if="!$store.state.isSignedIn">Sign In</router-link>
          <a class="nav-link" @click="signout()" v-else>Sign Out</a>
        </li>
        <li class="nav-item">
          <router-link to="/signup" class="nav-link">Sign Up</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import router from "@/scripts/router";
import store from "@/scripts/store";

export default {
  name: 'Header',
  setup() {
    const signout = () => {
      axios.post(`/api/members/signout`)
          .then(() => {
            alert('로그아웃 성공');
            store.commit('setSignedIn', false);
            router.push('/');
          })
          .catch(() => {
            alert('로그아웃 실패')
          })
    }
    return { signout }
  }
}
</script>
<style scoped>
.placeholder-gray::placeholder {
  color: #ccc !important;
}

.border-gray {
  border-color: #ccc !important;
}

.text-white {
  color: #ccc !important;
}
</style>