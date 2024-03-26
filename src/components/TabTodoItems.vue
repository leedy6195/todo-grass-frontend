<template>
  <div>
    <ul class="list-group mt-2">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item, index) in props.todoItems" :key="index">
        {{ item.title }}
        <div>
          <span @click="openEditModal(item.id)" class="icon-edit m-2">
            <font-awesome-icon icon="edit" />
          </span>
          <span @click="deleteItem(item.id)" class="icon-delete m-2">
            <font-awesome-icon icon="trash-alt" />
          </span>
        </div>
      </li>
    </ul>
    <button @click="openAddModal" class="btn btn-success mt-3">
      Todo Item 추가
    </button>
    <TodoAddModal :showModal="showModal" :todoId="selectedTodoId" @close="closeModal" @change="refreshTodos"/>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TodoAddModal from "@/components/TodoAddModal.vue";
import { ref, defineProps, defineEmits } from "vue";
import axios from "axios";

const props = defineProps({
  todoItems: Array
})
const emits = defineEmits(['change'])

const showModal = ref(false);
const selectedTodoId = ref(null);


const refreshTodos = () => {
  emits('change');
}

const openEditModal = (todoId) => {
  selectedTodoId.value = todoId;
  showModal.value = true;
};

const deleteItem = (todoId) => {
  if(confirm("Do you want to delete this item?")) {
    axios.delete(`/api/todos/${todoId}`).then(() => {
      emits('change');
    }).catch(() => {
      alert("Todo Item을 삭제하는데 실패했습니다.");
    });
  }
};

const openAddModal = () => {
  selectedTodoId.value = null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style>
.icon-edit,
.icon-delete {
  cursor: pointer;
}
</style>
