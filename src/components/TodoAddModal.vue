<template>
  <div class="modal" v-if="show">
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
      <button @click="modalShowAddItem ? addNewItem() : editItem()" class="btn btn-primary">{{ modalShowAddItem ? '추가' : '수정' }}</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['show', 'todoId', 'modalTitleProp', 'todoTitleProp', 'todoDescriptionProp'],
  data() {
    return {
      modalTitle: '',
      todoTitle: '',
      todoDescription: '',
      modalShowAddItem: false
    };
  },
  watch: {
    todoId: {
      immediate: true,

      handler(newVal) {
        if (newVal) {
          this.modalTitle = this.modalTitleProp || 'Todo Item 수정';
          this.modalShowAddItem = false;
          this.getTodoItem();
        } else {
          this.modalTitle = this.modalTitleProp || 'Todo Item 추가';
          this.modalShowAddItem = true;
        }
      }
    }
  },
  methods: {
    getTodoItem() {
      axios.get(`/api/todos/${this.todoId}`).then((res) => {
        this.todoTitle = this.todoTitleProp || res.data.data.title;
        this.todoDescription = this.todoDescriptionProp || res.data.data.description;
      }).catch(() => {
        alert(`Todo Item을 불러오는데 실패했습니다.`)
      })
    },
    closeModal() {
      this.$emit('close');
    },
    addNewItem() {
      // 추가 로직
    },
    editItem() {
      axios.put(`/api/todos/${this.todoId}`, {
        title: this.todoTitle,
        description: this.todoDescription
      }).then(() => {
        alert('Todo Item 수정 성공');
        this.closeModal();
      }).catch(() => {
        alert('Todo Item 수정 실패');
      });
    }
  }
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
