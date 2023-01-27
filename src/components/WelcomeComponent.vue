<template>
  <div class="w-1/2 my-10">
    <selector-component></selector-component>
    <search-component></search-component>
    <table-component></table-component>
  </div>
</template>

<script>
import SelectorComponent from "./SelectorComponent.vue";
import SearchComponent from "./SearchComponent.vue";
import TableComponent from "./TableComponent.vue";

export default {
  components: {
    "selector-component": SelectorComponent,
    "search-component": SearchComponent,
    "table-component": TableComponent,
  },
};
</script>
