<template>
  <button
    @click="clicked(this)"
    class="group cursor-pointer py-2 w-full px-2 ease-in-out transition transform duration-100"
    :class="
      selected
        ? 'bg-app-main hover:bg-app-reverse'
        : 'bg-app-reverse hover:bg-app-main'
    "
  >
    <span
      class="text-sm ease-in-out transition transform duration-100"
      :class="
        selected
          ? 'text-app-reverse group-hover:text-app-text'
          : 'text-app-text group-hover:text-app-reverse'
      "
    >
      {{ text }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    init: Boolean,
    text: String,
  },
  data() {
    return {
      selected: this.init,
    };
  },
  methods: {
    clicked(e) {
      this.$emit("clicked", e);
    },
    toggleSelected() {
      this.selected = !this.selected;
    },
  },
};
</script>
