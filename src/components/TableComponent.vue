<template>
  <div class="min-w-[768px] overflow-x-scroll md:overflow-x-hidden">
    <table class="w-full">
      <table-header-component></table-header-component>
      <table-row-component
        v-for="(company, i) in list"
        :key="company + i"
        :company="company"
      ></table-row-component>
    </table>
  </div>
</template>

<script>
import TableRowComponent from "./TableRowComponent.vue";
import TableHeaderComponent from "./TableHeaderComponent.vue";
import { useWelcomeStore } from "../stores/welcome";

export default {
  components: {
    "table-row-component": TableRowComponent,
    "table-header-component": TableHeaderComponent,
  },
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  computed: {
    list() {
      return this.welcomeStore.filteredList;
    },
  },
};
</script>
