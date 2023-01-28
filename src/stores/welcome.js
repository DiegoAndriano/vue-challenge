import { defineStore } from "pinia";

export const useWelcomeStore = defineStore({
  id: "welcome",
  state: () => ({
    list: {},
    currency: "USD",
    years: {
      5: true,
      10: true,
      40: true,
    },
    display: "Spread",
  }),
  getters: {
    getCouponTypes: () => {
      return ["FIX", "FRN"];
    },
    getDates: (state) => {
      state.list.map((item) => {
        return item.DateSent;
      });
    },
    getList: (state) => {
      return state.list;
    },
  },

  actions: {
    setList(list) {
      this.list = list;
    },
  },
});
