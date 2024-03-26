<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ modalTitle }}</h2>
      <div class="form-group">
        <label for="title">제목:</label>
        <input type="text" class="form-control" v-model="todoTitle" id="title">
      </div>
      <div class="form-group">
        <label for="description">설명:</label>
        <textarea class="form-control" v-model="todoDescription" id="description"></textarea>
      </div>
      <button @click="isAddModal ? addNewItem() : editItem()" class="btn btn-primary">{{
          isAddModal ? '추가' : '수정'
        }}
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref, watchEffect, defineProps, defineEmits} from 'vue';
import axios from 'axios';

const props = defineProps({
  showModal: Boolean,
  todoId: Number
});

const emits = defineEmits(['close', 'change'])

const modalTitle = ref('');
const todoTitle = ref('');
const todoDescription = ref('');
const isAddModal = ref(false);

const emptyTodoItem = () => {
  todoTitle.value = '';
  todoDescription.value = '';
};

watchEffect(() => {
  if (props.todoId) {
    modalTitle.value = 'Todo Item 수정';
    isAddModal.value = false;
    getTodoItem();
  } else {
    modalTitle.value = 'Todo Item 추가';
    isAddModal.value = true;
    emptyTodoItem();
  }
});

const getTodoItem = () => {
  axios.get(`/api/todos/${props.todoId}`)
      .then((res) => {
        todoTitle.value = res.data.data.title;
        todoDescription.value = res.data.data.description;
      })
      .catch(() => {
        alert(`Todo Item을 불러오는데 실패했습니다.`);
      });
};

const closeModal = () => {
  emits('close');
};

const addNewItem = () => {
  axios.post(`/api/todos`, {
    title: todoTitle.value,
    description: todoDescription.value
  })
      .then(() => {
        emits('change');
        closeModal();
      })
      .catch(() => {
        alert('Todo Item 추가 실패');
      });
};

const editItem = () => {
  axios.put(`/api/todos/${props.todoId}`, {
    title: todoTitle.value,
    description: todoDescription.value
  })
      .then(() => {
        emits('change');
        closeModal();
      })
      .catch(() => {
        alert('Todo Item 수정 실패');
      });
};
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90%;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  color: #555;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

</style>
