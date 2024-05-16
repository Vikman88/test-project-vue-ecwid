<template>
  <my-button @click.stop="incrementCount(item)" v-if="item.count === 0">
    <img src="../assets/image/plus.svg" />
  </my-button>
  <my-button v-else>
    <div class="add-btn-overlay">
      <div @click.stop="decrementCount(item)"></div>
      <div @click.stop="incrementCount(item)"></div>
    </div>
    <div class="add-btn-wrapper">
      <div class="img-container">
        <img src="../assets/image/minus.svg"/>
      </div>
      <div class="add-btn-value">{{item.count}}</div>
      <div class="img-container">
        <img src="../assets/image/plus.svg"/>
      </div>
    </div>
  </my-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToggleThemeBtn',

  props: {
    item: {
      type: Object,
      required: true,
    },
    decrementCount: {
      type: Function,
      required: true,
    },
    incrementCount: {
      type: Function,
      required: true,
    }
  },
})
</script>

<style scoped>
.add-btn-value {
  margin: 0 0.7rem;
}
.add-btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.img-container {
  display: flex;
}
.add-btn-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.add-btn-overlay > * {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50%;
}
.add-btn-overlay > *:last-child {
  right: 0;
  left: auto;
}
</style>