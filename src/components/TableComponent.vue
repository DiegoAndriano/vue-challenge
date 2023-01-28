<template>
  <div class="min-w-[768px] overflow-x-scroll md:overflow-x-hidden">
    <table class="w-full">
      <table-header-component></table-header-component>
      <tbody>
        <row-component
          v-for="company in list"
          :key="company"
          :company="company"
        ></row-component>
      </tbody>
    </table>
  </div>
</template>

<script>
import RowComponent from "./RowComponent.vue";
import TableHeaderComponent from "./TableHeaderComponent.vue";
import { useWelcomeStore } from "../stores/welcome";

export default {
  components: {
    "row-component": RowComponent,
    "table-header-component": TableHeaderComponent,
  },
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  computed: {
    list() {
      return this.welcomeStore.list;
    },
  },
};
</script>
