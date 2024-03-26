<template>
  <div class="tab-content-text">
    <ul class="list-group mt-2">
      <li class="list-group-item" v-for="(item, index) in todoItems" :key="index">
        {{ item.title }}
      </li>
    </ul>

    <div class="card mt-2" >
      <div class="card-body" >
        <todo-heatmap></todo-heatmap>
      </div>
    </div>
  </div>
</template>
<script>
import TodoHeatmap from "@/components/TodoHeatmap.vue";

export default {
  name: 'TabOverview',
  components: { TodoHeatmap },
  props: ["todoItems"]
}
</script>

<style scoped>
.card-body {
  width: 100%; /* 컨테이너의 너비를 설정합니다 (적절한 값으로 조정이 필요할 수 있습니다) */
  overflow-x: auto; /* 가로 스크롤을 활성화합니다 */
  white-space: nowrap; /* 컨텐츠가 강제로 줄바꿈되는 것을 방지합니다 */
}
</style>