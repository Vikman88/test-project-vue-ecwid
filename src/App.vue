<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app',
})
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
}
.app {
  padding: 0 14.375rem;
}
</style>
