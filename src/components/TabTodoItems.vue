<template>
  <div>
    <ul class="list-group mt-2">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item, index) in todoItems" :key="index">
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
    <button @click="openModal" class="btn btn-success mt-3">
      Todo Item 추가
    </button>
    <TodoAddModal :show="modalShow" :todoId="selectedTodoId" @close="closeModal"/>
  </div>
</template>

<script>

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TodoAddModal from "@/components/TodoAddModal.vue";
import { ref } from "vue";
import axios from "axios";

export default {
  name: "TabTodoItems",
  components: { TodoAddModal, FontAwesomeIcon },
  props: ["todoItems"],
  setup() {
    const modalShow = ref(false);
    const selectedTodoId = ref(null);

    const openEditModal = (todoId) => {
      selectedTodoId.value = todoId;
      modalShow.value = true;
    };

    const deleteItem = (todoId) => {
      if(confirm("Do you want to delete this item?")) {
        axios.delete(`/api/todos/${todoId}`).then(() => {
          alert("Todo Item이 삭제되었습니다.");
          location.reload();
        }).catch(() => {
          alert("Todo Item을 삭제하는데 실패했습니다.");
        });
      }
    };

    const openModal = () => {
      modalShow.value = true;
    };

    const closeModal = () => {
      modalShow.value = false;
    };

    return { modalShow, selectedTodoId, openEditModal, deleteItem, openModal, closeModal };
  }
};
</script>

<style>
.icon-edit,
.icon-delete {
  cursor: pointer;
}
</style>
