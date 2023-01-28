<template>
  <div class="w-full lg:w-1/2 my-10 px-10">
    <selector-component></selector-component>
    <search-component></search-component>
    <table-component></table-component>
  </div>
</template>

<script>
import SelectorComponent from "./SelectorComponent.vue";
import SearchComponent from "./SearchComponent.vue";
import TableComponent from "./TableComponent.vue";
import axios from "axios";
import { url } from "../assets/config";
import { useWelcomeStore } from "../stores/welcome";

export default {
  components: {
    "selector-component": SelectorComponent,
    "search-component": SearchComponent,
    "table-component": TableComponent,
  },
  mounted() {
    axios.get(url).then((response) => {
      const welcomeStore = useWelcomeStore();
      welcomeStore.setList(response.data);
    });
  },
};
</script>
