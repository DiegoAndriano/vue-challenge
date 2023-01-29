import { defineStore } from "pinia";
import {
  year_euro_one,
  year_euro_three,
  year_euro_two,
  year_default_one,
  year_default_two,
  year_default_three,
} from "../assets/config";

export const useWelcomeStore = defineStore({
  id: "welcome",
  state: () => ({
    list: {},
    filteredList: {},
    currency: "USD",
    ordered: {
      by: "date",
      asc: true,
    },
    years: {
      one: {
        tag: "one",
        num: 5,
        active: true,
      },
      two: {
        tag: "two",
        num: 10,
        active: true,
      },
      three: {
        tag: "three",
        num: 40,
        active: true,
      },
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
    updateYear(year) {
      let isThereAtLeastOneActive =
        Object.keys(this.years).filter((item) => {
          return this.years[item].active !== false;
        }).length > 1;

      if (isThereAtLeastOneActive || !year.active) {
        this.years[year.tag].active = !year.active;
      }
    },
    updateCurrency(curr) {
      if (curr === "EUR") {
        this.years.one.num = year_euro_one;
        this.years.two.num = year_euro_two;
        this.years.three.num = year_euro_three;
      } else {
        this.years.one.num = year_default_one;
        this.years.two.num = year_default_two;
        this.years.three.num = year_default_three;
      }
      this.currency = curr;
    },
    updateDisplay(dis) {
      this.display = dis;
    },
    filterListByCompany(company) {
      this.filteredList = this.list.filter((item) => {
        return item.Company.toLowerCase().includes(company);
      });
    },
    orderListBy(val) {
      if (val === "company") {
        if (this.ordered.by !== "company") {
          this.ordered.by = "company";
          this.ordered.asc = true;
        } else {
          this.ordered.asc = !this.ordered.asc;
        }
        if (this.ordered.asc) {
          this.filteredList = this.list.sort(function (item, another) {
            return another.Company.charCodeAt(0) - item.Company.charCodeAt(0);
          });
        } else {
          this.filteredList = this.list.sort(function (item, another) {
            return item.Company.charCodeAt(0) - another.Company.charCodeAt(0);
          });
        }
      }
      if (val === "date") {
        if (this.ordered.by !== "date") {
          this.ordered.by = "date";
          this.ordered.asc = true;
        } else {
          this.ordered.asc = !this.ordered.asc;
        }
        if (this.ordered.asc) {
          this.filteredList = this.list.sort(function (item, another) {
            return new Date(another.DateSent) - new Date(item.DateSent);
          });

          this.filteredList = this.list.sort(function (item, another) {
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
        } else {
          this.filteredList = this.list.sort(function (item, another) {
            return new Date(item.DateSent) - new Date(another.DateSent);
          });

          this.filteredList = this.list.sort(function (item, another) {
            let itemDate = new Date(item.DateSent);
            let anotherDate = new Date(another.DateSent);

            if (
              itemDate.getDate() === anotherDate.getDate() &&
              itemDate.getMonth() === anotherDate.getMonth() &&
              itemDate.getFullYear() === anotherDate.getFullYear()
            ) {
              return item.Preferred - another.Preferred;
            }
          });
        }
      }
    },
  },
});
