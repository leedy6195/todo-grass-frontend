<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class="card-body text-center">
            <img :src="visitedMemberInfo.profileImgPath" class="img-fluid rounded-circle mb-3"
                 alt="Avatar">
            <h5 class="card-title">{{ visitedMemberInfo.nickname }}</h5>
            <p class="card-text">{{ visitedMemberInfo.email }}</p>
            <router-link to="/profile" v-if="isMyPage"><font-awesome-icon icon="edit"/></router-link>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="custom-tabs">
          <div class="tab" v-for="(tab, index) in filteredTabs" :key="index" @click="activateTab(index)"
               :class="{ 'active': activeTab === index }">

            {{ tab }}
            <span class="indicator" v-if="activeTab === index"></span>
          </div>
        </div>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade" :class="{ 'show active': activeTab === 0 }" id="overview" role="tabpanel"
               aria-labelledby="overview-tab">
            <TabOverview :todoItems="todoItems"/>
          </div>
          <div class="tab-pane fade" :class="{ 'show active': activeTab === 1 }" id="todo-items" role="tabpanel"
               aria-labelledby="todo-items-tab">
            <TabTodoItems :todoItems="todoItems" @change="getTodos"/>
          </div>
          <div class="tab-pane fade" :class="{ 'show active': activeTab === 2 }" id="following" role="tabpanel"
               aria-labelledby="following-tab">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabOverview from "@/components/TabOverview.vue";
import TabTodoItems from "@/components/TabTodoItems.vue";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: 'MemberHome',
  components: {TabTodoItems, TabOverview, FontAwesomeIcon},
  data() {
    return {
      activeTab: 0,
      tabs: ['Overview', 'Todo Items', 'Daily Report'],
      visitedMemberInfo: {
        email: '',
        nickname: '',
        profileImgPath: ''
      },
      isMyPage: false,
      todoItems: []
    };
  },
  mounted() {


    this.getMemberInfo();

    this.getTodos();
  },
  computed: {
    filteredTabs() {
      return this.tabs.filter((tab, index) => {

        if (index === 0) {
          return true;
        }
        if (index === 1 || index === 2) {
          return this.isMyPage;
        }
        return false; // 나머지 탭은 표시하지 않음
      });
    }
  },
  methods: {
    getMemberInfo() {
      axios.get(`/api/members/nicknames/${this.$route.params.nickname}`).then((res) => {
        const memberInfo = res.data.data;
        this.visitedMemberInfo.email = memberInfo.email;
        this.visitedMemberInfo.nickname = memberInfo.nickname;
        this.visitedMemberInfo.profileImgPath = memberInfo.profileImgPath;

        this.isMyPage = this.$route.params.nickname === JSON.parse(sessionStorage.getItem('vuex')).memberInfo.nickname;
      })
    },
    getTodos() {
      axios.get(`/api/todos/nicknames/${this.$route.params.nickname}`).then((res) => {
        this.todoItems = res.data.data.map(todo => {
          return {
            id: todo.id,
            title: todo.title,
            description: todo.description
          }
        })
      }).catch((error) => {
        console.error("An error occurred while fetching todos:", error);
      });
    },

    activateTab(index) {
      this.activeTab = index;
    }
  }
}
</script>

<style>
.custom-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
}

.indicator {
  position: absolute;
  bottom: 2px;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: orange;
  display: block;
  transition: opacity 0.3s ease;
}

.tab:hover .indicator {
  opacity: 1;
}

.indicator.active {
  opacity: 1;
}

.tab-content {
  width: 65%;
  padding: 10px 20px;
}
</style>
