<template>
  <div>
    <input
      :key="object.name"
      @change="$emit('changed')"
      class="appearance-none"
      type="radio"
      name="curr"
      :id="object.name"
      :value="object.name"
      v-model="model"
    />
    <label
      :key="object.name + 'l'"
      :class="
        curr === object.name
          ? 'bg-app-main hover:bg-app-reverse text-app-reverse hover:text-app-text'
          : 'bg-app-reverse hover:bg-app-main text-app-text hover:text-app-reverse'
      "
      class="cursor-pointer py-2 w-full px-2 ease-in-out transition transform duration-100"
      :for="object.name"
      >{{ object.name }}</label
    >
  </div>
</template>

<script>
export default {
  props: {
    object: Object,
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
