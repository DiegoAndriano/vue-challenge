<template>
  <div class="flex border border-app-main rounded-md justify-between">
    <div v-for="i in total" :key="i">
      <slot :name="i"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
    type: String,
  },
};
</script>
