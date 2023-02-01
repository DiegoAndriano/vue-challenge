<template>
  <div class="w-full lg:w-1/2 my-10 px-10">
    <entrance-component>
      <selector-component></selector-component>
    </entrance-component>

    <entrance-component :delay="50">
      <search-component></search-component>
    </entrance-component>

    <table-component v-if="!welcomeStore.filteredList.error"></table-component>
  </div>
</template>

<script>
import EntranceComponent from "./EntranceComponent.vue";
import SelectorComponent from "./SelectorComponent.vue";
import SearchComponent from "./SearchComponent.vue";
import TableComponent from "./TableComponent.vue";
import { useWelcomeStore } from "../stores/welcome";

export default {
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  components: {
    "entrance-component": EntranceComponent,
    "selector-component": SelectorComponent,
    "search-component": SearchComponent,
    "table-component": TableComponent,
  },
  mounted() {
    this.welcomeStore.fetchList();
  },
};
</script>
