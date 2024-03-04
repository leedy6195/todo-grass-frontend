<template>
  <div>
    <ul class="list-group mt-2">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item, index) in todoItems" :key="index">
        {{ item }}
        <div>
          <span @click="editItem(index)" class="icon-edit mr-2">
            <font-awesome-icon icon="edit" />
          </span>
          <span @click="deleteItem(index)" class="icon-delete mr-2">
            <font-awesome-icon icon="trash-alt" />
          </span>
        </div>
      </li>
    </ul>
    <button @click="openModal" class="btn btn-success mt-3">
      Todo Item 추가
    </button>
    <TodoAddModal :show="modalShow" @afterAdd="getTodos" @close="closeModal"/>
  </div>
</template>

<script>

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TodoAddModal from "@/components/TodoAddModal.vue";
import axios from "axios";
import {onMounted, ref} from "vue";


export default {
  name: "TabTodoItems",
  components: { TodoAddModal, FontAwesomeIcon },
  props: ["nickname"],
  setup(props) {
    const modalShow = ref(false);
    const todoItems = ref([]);

    // 데이터 초기화
    onMounted(() => {
      getTodos()
    });
    const getTodos = () => {
      axios.get(`/api/todos/${props.nickname}`).then((res) => {
        todoItems.value = res.data.data.map(todo => todo.title)
      })
    }

    const editItem = (index) => {
      // 수정 기능 구현
      console.log("수정:", todoItems.value[index]);
    };

    const deleteItem = (index) => {
      // 삭제 기능 구현
      todoItems.value.splice(index, 1);
    };

    const openModal = () => {
      modalShow.value = true;
    };

    const closeModal = () => {
      modalShow.value = false;
    };


    // todoItems와 modalShow를 반환하여 템플릿에서 사용할 수 있도록 합니다.
    return { todoItems, modalShow, editItem, deleteItem, openModal, closeModal, getTodos };
  }
};
</script>

<style>
.icon-edit,
.icon-delete {
  cursor: pointer;
}
</style>
