<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>새로운 할 일 추가</h2>
      <div class="form-group">
        <label for="title">제목:</label>
        <input type="text" class="form-control" v-model="title" id="title">
      </div>
      <div class="form-group">
        <label for="description">설명:</label>
        <textarea class="form-control" v-model="description" id="description"></textarea>
      </div>
      <button @click="addNewItem" class="btn btn-primary">추가</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['show'],
  data() {
    return {
      title: '',
      description: ''
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    addNewItem() {
      axios.post(`/api/todos`, {
        title: this.title,
        description: this.description
      }).then(() => {
        alert('added successfully')
        this.$emit('afterAdd')
        this.closeModal()
      }).catch(() => {
        alert('failed')
      })
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
