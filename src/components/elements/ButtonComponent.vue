<template>
  <div
    class="cursor-pointer py-2 w-full px-2"
    :class="selected ? 'bg-app-main' : 'bg-app-reverse'"
  >
    <p class="text-sm" :class="selected ? 'text-app-reverse' : 'text-app-main'">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    selected: Boolean,
    text: String,
  },
};
</script>
