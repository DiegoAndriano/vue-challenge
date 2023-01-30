<template>
  <div class="flex border border-app-main rounded-md justify-between">
    <div v-for="i in total" :key="i">
      <button-component
        v-on:clicked="handleState"
        :text="text[i]"
        :init="true"
      ></button-component>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "./ButtonComponent.vue";
import { useWelcomeStore } from "../../stores/welcome";

export default {
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  components: {
    "button-component": ButtonComponent,
  },
  props: {
    total: Number,
    type: String,
    text: Array,
    minOn: Number,
  },

  methods: {
    yearClicked(year) {
      this.welcomeStore.updateYear(year);
    },
    currencyClicked(curr) {
      this.welcomeStore.updateCurrency(curr);
    },
    displayClicked(dis) {
      this.welcomeStore.updateDisplay(dis);
    },
  },
};
</script>
