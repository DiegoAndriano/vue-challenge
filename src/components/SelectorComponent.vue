<template>
  <div
    class="flex flex-col md:flex-row items-center mx-auto w-full space-x-6 space-y-6 md:space-y-0"
  >
    <group-button-component type="single" :total="3">
      <template v-slot:1>
        <button-component
          v-on:clicked="currencyClicked('USD')"
          text="USD"
          :init="true"
        ></button-component>
      </template>

      <template v-slot:2>
        <button-component
          v-on:clicked="currencyClicked('EUR')"
          text="EUR"
          :init="false"
        ></button-component>
      </template>

      <template v-slot:3>
        <button-component
          v-on:clicked="currencyClicked('CAD')"
          text="CAD"
          :init="false"
        ></button-component>
      </template>
    </group-button-component>

    <group-button-component type="multiple" :total="3">
      <template v-slot:1>
        <button-component
          v-on:clicked="yearClicked(welcomeStore.years.one)"
          :text="welcomeStore.years.one.num + ' YRS'"
          :init="true"
        ></button-component>
      </template>

      <template v-slot:2>
        <button-component
          v-on:clicked="yearClicked(welcomeStore.years.two)"
          :text="welcomeStore.years.two.num + ' YRS'"
          :init="true"
        ></button-component>
      </template>

      <template v-slot:3>
        <button-component
          v-on:clicked="yearClicked(welcomeStore.years.three)"
          :text="welcomeStore.years.three.num + ' YRS'"
          :init="true"
        ></button-component>
      </template>
    </group-button-component>

    <group-button-component type="single" :total="3">
      <template v-slot:1>
        <button-component
          v-on:clicked="displayClicked('Spread')"
          text="Spread"
          :init="true"
        ></button-component>
      </template>

      <template v-slot:2>
        <button-component
          v-on:clicked="displayClicked('Yield')"
          text="Yield"
          :init="false"
        ></button-component>
      </template>

      <template v-slot:3>
        <button-component
          v-on:clicked="displayClicked('3MLSpread')"
          text="3MLSpread"
          :init="false"
        ></button-component>
      </template>
    </group-button-component>
  </div>
</template>

<script>
import ButtonComponent from "./elements/ButtonComponent.vue";
import GroupButtonComponent from "./elements/GroupButtonComponent.vue";
import { useWelcomeStore } from "../stores/welcome";

export default {
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  components: {
    "button-component": ButtonComponent,
    "group-button-component": GroupButtonComponent,
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
