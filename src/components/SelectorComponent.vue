<template>
  <div
    class="flex flex-col md:flex-row items-center mx-auto w-full space-x-6 space-y-6 md:space-y-0"
  >
    <group-button-component :total="3">
      <template v-slot:1>
        <button-component text="USD" :selected="true"></button-component>
      </template>

      <template v-slot:2>
        <button-component text="EUR" :selected="false"></button-component>
      </template>

      <template v-slot:3>
        <button-component text="CAD" :selected="false"></button-component>
      </template>
    </group-button-component>

    <group-button-component :total="3">
      <template v-slot:1>
        <button-component text="5 YRS" :selected="true"></button-component>
      </template>

      <template v-slot:2>
        <button-component text="10 YRS" :selected="true"></button-component>
      </template>

      <template v-slot:3>
        <button-component text="40 YRS" :selected="true"></button-component>
      </template>
    </group-button-component>

    <group-button-component :total="3">
      <template v-slot:1>
        <button-component text="Spread" :selected="true"></button-component>
      </template>

      <template v-slot:2>
        <button-component text="Yield" :selected="false"></button-component>
      </template>

      <template v-slot:3>
        <button-component text="3MLSpread" :selected="false"></button-component>
      </template>
    </group-button-component>
  </div>
</template>

<script>
import ButtonComponent from "./elements/ButtonComponent.vue";
import GroupButtonComponent from "./elements/GroupButtonComponent.vue";

export default {
  components: {
    "button-component": ButtonComponent,
    "group-button-component": GroupButtonComponent,
  },
};
</script>
