<template>
  <div class="tab-content-text">
    <ul class="list-group mt-2">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
      <li class="list-group-item">A fourth item</li>
      <li class="list-group-item">And a fifth one</li>
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
}
</script>