<template>
  <div class="my-button">
    <div class="my-button-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'myButton'
})
</script>

<style scoped>
  .my-button {
    position: relative;
    padding: 1rem 2rem;
    font-size: 1.3rem;
    border-radius: 1.1rem;
    background-color: #fecb24;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .my-button:hover {
    background-color: #febd24;
    transition: background-color 0.3s ease;
  }
  .my-button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1rem;
  }
</style>