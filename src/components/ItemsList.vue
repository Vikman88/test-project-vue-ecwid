<template>
  <div class="content-title">
    {{categoryName}}
  </div>
  <hr/>
  <div class="items-list">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ItemsList',

  props: {
    categoryName: {
      type: String,
      required: true,
    }
  }
})
</script>

<style scoped>
  .content-title {
    font-size: 2.2rem;
    margin: 0 0 1rem;
    color: #1a1a1a;
    font-weight: 700;
  }
  .items-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
</style>