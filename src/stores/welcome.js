import { defineStore } from "pinia";

export const useWelcomeStore = defineStore({
  id: "welcome",
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
