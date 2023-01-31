<template>
  <div class="min-w-[768px] overflow-x-scroll md:overflow-x-hidden">
    <table style="border-collapse: collapse; border-spacing: 0" class="w-full">
      <table-header-component></table-header-component>
      <table-row-component
        v-for="(company, i) in list"
        :isLastIndex="i === Object.keys(list).length - 1"
        :key="company + i"
        :company="company"
      ></table-row-component>
      <average-spread-component></average-spread-component>
    </table>
  </div>
</template>

<script>
import TableRowComponent from "./TableRowComponent.vue";
import TableHeaderComponent from "./TableHeaderComponent.vue";
import { useWelcomeStore } from "../stores/welcome";
import AverageSpreadComponent from "./AverageSpreadComponent.vue";

export default {
  components: {
    "table-row-component": TableRowComponent,
    "table-header-component": TableHeaderComponent,
    "average-spread-component": AverageSpreadComponent,
  },
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  computed: {
    list() {
      return this.welcomeStore.getList;
    },
  },
};
</script>
