<template>
  <div id="app">
    <main>
      <welcome-component></welcome-component>
    </main>
  </div>
</template>

<script>
import WelcomeComponent from "./components/WelcomeComponent.vue";

export default {
  components: {
    "welcome-component": WelcomeComponent,
  },
};
</script>
