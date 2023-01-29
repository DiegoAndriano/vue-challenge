<template>
  <div class="w-full lg:w-1/3 my-6">
    <input
      v-model="input"
      class="md:w-[400px] w-full rounded-md text-app-text border border-app-lighttext px-4 py-2 focus:px-6 transition ease-in-out duration-150"
      placeholder="Filter by company name ..."
      type="search"
    />
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import { useWelcomeStore } from "../stores/welcome";

export default {
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  data() {
    return {
      input: "",
    };
  },

  watch: {
    input: {
      handler: debounce(function (value) {
        this.welcomeStore.filterListByCompany(value.toLowerCase());
      }, 200),
      immediate: true,
    },
  },
};
</script>
