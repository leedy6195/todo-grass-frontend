<template>
  <div>

  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      activeTab: 0,
      tabs: ['Overview', 'Todo Items', 'Following']
    };
  },
  methods: {
    activateTab(index) {
      this.activeTab = index;
    }
  }
}
</script>

<style>
.custom-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
}

.indicator {
  position: absolute;
  bottom: 2px;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: orange;
  display: block;
  transition: opacity 0.3s ease;
}

.tab:hover .indicator {
  opacity: 1;
}

.indicator.active {
  opacity: 1;
}

.tab-content {
  width: 65%;
  padding: 10px 20px;
}
</style>
