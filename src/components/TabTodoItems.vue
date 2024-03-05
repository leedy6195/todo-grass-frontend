<template>
  <div>
    <ul class="list-group mt-2">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item, index) in todoItems" :key="index">
        {{ item.title }}
        <div>
          <span @click="editItem(item.id)" class="icon-edit m-2">
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

export default {
  name: "TabTodoItems",
  components: { TodoAddModal, FontAwesomeIcon },
  props: ["todoItems"],
  setup(props) {
    const modalShow = ref(false);
    const selectedTodoId = ref(null);

    const editItem = (todoId) => {
      // 수정 기능 구현
      console.log(todoId);
      // 모달 열기
      selectedTodoId.value = todoId;
      modalShow.value = true;
    };

    const deleteItem = (index) => {
      // 삭제 기능 구현
      console.log("삭제:", props.todoItems[index]);
    };

    const openModal = () => {
      modalShow.value = true;
    };

    const closeModal = () => {
      // 모달 닫기
      modalShow.value = false;
    };

    // todoItems와 modalShow, modalTitle, modalContent를 반환하여 템플릿에서 사용할 수 있도록 합니다.
    return { modalShow, selectedTodoId, editItem, deleteItem, openModal, closeModal };
  }
};
</script>

<style>
.icon-edit,
.icon-delete {
  cursor: pointer;
}
</style>
