<template>
  <div class="item-card">
    <div class="item-card-wrapper">
      <div class="item-card-img">
        <img :src="item.thumbnailUrl" :alt="item.name">
      </div>
      <div class="item-card-content">
        <div class="item-card-title">{{item.name}}</div>
        <div class="item-card-bottom" @click.stop>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyItemCard',

  props: {
    item: {
      type: Object,
      required: true,
    }
  },
});
</script>

<style scoped>
.item-card {
  flex-basis: 25%;
  flex-grow: 0;
  flex-shrink: 0;
  max-width: 25%;
  padding-right: 1.2rem;
  padding-left: 1.2rem;
  margin-bottom: 5rem;
}
.item-card-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(360deg, #F5F5F9 0%, rgba(245, 245, 249, 0) 60%);
  border-radius: 1.8rem;
  cursor: pointer;
}
.item-card-img {
  width: 16.6rem;
  height: 20rem;
  overflow: hidden;
}
.item-card-img img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.item-card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem 2rem 1rem;
  justify-content: space-between;
}
.item-card-title {
  margin: 0 0 1.7rem;
  font-size: 2rem;
  line-height: 1.2;
  color: #1a1a1a;
}
.item-card-dscr {
  flex-grow: 1;
  margin: 0 0 .7rem;
  font-size: 1.3rem;
}
.item-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
