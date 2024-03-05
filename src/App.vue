<template>
  <Header/>
  <RouterView/>


</template>

<script>
import Header from "@/components/Header.vue";
import store from "@/scripts/store";
import axios from "axios";
import {useRoute} from "vue-router";
import {watch} from "vue";

export default {
  name: 'App',
  components: {Header},
  setup() {
    const check = () => {
      axios.get("/api/members/check").then((response) => {
          store.commit('setSignedIn', response.data.data);
          if (!response.data.data) {
            console.log("setMemberInfo 비움")
            store.commit('setMemberInfo', {email: '', nickname: ''})
          }
      })
    }

    const route = useRoute();

    watch(route, () => {
      check();
    })
  }
}
</script>


