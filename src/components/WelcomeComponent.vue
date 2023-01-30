<template>
  <div class="w-full lg:w-1/2 my-10 px-10">
    <entrance-component>
      <selector-component></selector-component>
    </entrance-component>

    <entrance-component :delay="50">
      <search-component></search-component>
    </entrance-component>

    <table-component></table-component>
  </div>
</template>

<script>
import EntranceComponent from "./EntranceComponent.vue";
import SelectorComponent from "./SelectorComponent.vue";
import SearchComponent from "./SearchComponent.vue";
import TableComponent from "./TableComponent.vue";
import axios from "axios";
import { url } from "../assets/config";
import { useWelcomeStore } from "../stores/welcome";

export default {
  components: {
    "entrance-component": EntranceComponent,
    "selector-component": SelectorComponent,
    "search-component": SearchComponent,
    "table-component": TableComponent,
  },
  mounted() {
    axios.get(url).then((response) => {
      const welcomeStore = useWelcomeStore();

      let res = this.initSorted(response);

      welcomeStore.setList(res.data);
    });
  },
  methods: {
    initSorted(response) {
      response.data.sort((item, another) => {
        return new Date(another.DateSent) - new Date(item.DateSent);
      });

      response.data.sort((item, another) => {
        let itemDate = new Date(item.DateSent);
        let anotherDate = new Date(another.DateSent);
        if (
          itemDate.getDate() === anotherDate.getDate() &&
          itemDate.getMonth() === anotherDate.getMonth() &&
          itemDate.getFullYear() === anotherDate.getFullYear()
        ) {
          return another.Preferred - item.Preferred;
        }
      });

      return response;
    },
  },
};
</script>
