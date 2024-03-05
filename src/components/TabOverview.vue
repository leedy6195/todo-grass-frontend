<template>
  <div class="tab-content-text">
    <ul class="list-group mt-2">
      <li class="list-group-item" v-for="(item, index) in todoItems" :key="index">
        {{ item.title }}
      </li>
    </ul>

    <div class="card mt-2" >
      <div class="card-body">
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