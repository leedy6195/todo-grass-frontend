<template>
  <div>
    <!-- Profile Header -->
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class="card-body text-center">
            <img src="https://avatars.githubusercontent.com/u/583231?s=400&v=4" class="img-fluid rounded-circle mb-3"
                 alt="Avatar">
            <h5 class="card-title">John Doe</h5>
            <p class="card-text">Software Developer</p>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <!-- Custom Tabs -->
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
            <TabTodoItems :todoItems="todoItems"/>
          </div>
          <div class="tab-pane fade" :class="{ 'show active': activeTab === 2 }" id="following" role="tabpanel"
               aria-labelledby="following-tab">
            <!-- Following tab content -->
          </div>
          <!-- Add more tab content as needed -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabOverview from "@/components/TabOverview.vue";
import TabTodoItems from "@/components/TabTodoItems.vue";
import axios from "axios";


export default {
  name: 'MemberHome',
  components: {TabTodoItems, TabOverview},
  data() {
    return {
      activeTab: 0,
      tabs: ['Overview', 'Todo Items', 'Following'],
      todoItems: []
    };
  },
  mounted() {

    this.getTodos();
  },
  computed: {
    filteredTabs() {
      return this.tabs.filter((tab, index) => {

        if (index === 0) {
          return true; // 항상 첫 번째 탭은 표시
        }
        if (index === 1 || index === 2) {
          console.log(this.$store.state.memberInfo.nickname)

          return this.$route.params.nickname === JSON.parse(sessionStorage.getItem('vuex')).memberInfo.nickname;
        }
        return false; // 나머지 탭은 표시하지 않음
      });
    }
  },
  methods: {
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
