import { defineStore } from "pinia";
import {
  year_euro_one,
  year_euro_three,
  year_euro_two,
  year_default_one,
  year_default_two,
  year_default_three,
  url,
} from "../assets/config";
import axios from "axios";

export const useWelcomeStore = defineStore({
  id: "welcome",
  state: () => ({
    list: {},
    filteredList: {},
    currencies: {
      items: [
        {
          name: "USD",
          selected: true,
        },
        {
          name: "EUR",
          selected: false,
        },
        {
          name: "CAD",
          selected: false,
        },
      ],
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
    display: {
      items: [
        {
          name: "Spread",
          selected: true,
          suffix: "bp",
          preffix: "+",
        },
        {
          name: "Yield",
          selected: false,
          suffix: "%",
          preffix: "",
        },
        {
          name: "3MLSpread",
          selected: false,
          suffix: "bp",
          preffix: "+",
        },
      ],
    },
    ordered: {
      by: "date",
      asc: true,
    },
  }),
  getters: {
    getDates: (state) => {
      state.list.map((item) => {
        return item.DateSent;
      });
    },
    getList: (state) => {
      if (JSON.stringify(state.filteredList) === "{}") {
        return state.list;
      }
      return state.filteredList;
    },
    getCouponTypes: () => {
      return ["FIX", "FRN"];
    },
    getHighlightedValues: (state) => {
      return (year) => {
        let result = [];
        let quotes = state.getAllQuotes();

        if (quotes !== undefined) {
          let shouldHighlight = {
            value: 100000000,
            name: "",
          };

          const mergedQuotes = quotes.reduce((allQuotes, item) => {
            item.Quote.forEach((quote) => {
              quote.Company = item.Company;
              allQuotes.push(quote);
            });
            return allQuotes;
          }, []);

          mergedQuotes.forEach(
            function (item) {
              const value = item[state.getDisplays(true)[0].name];

              const valueIsNotNull = value !== null;
              const isMinimalValue = value < shouldHighlight.value;
              const isNeededYear = item.Years.toString() === year.toString();
              const isNeededCurrency =
                item.Currency === state.getSelectedCurrency[0].name;
              if (
                isMinimalValue &&
                isNeededYear &&
                isNeededCurrency &&
                valueIsNotNull
              ) {
                shouldHighlight.value = value;
                shouldHighlight.name = item.Company + "FIX" + year;
              }
            }.bind(this)
          );

          if (!result.includes(shouldHighlight.name)) {
            result.push(shouldHighlight.name);
          }

          return result;
        }
      };
    },
    getAllQuotes: (state) => {
      return () => {
        if (JSON.stringify(state.getList) !== "{}") {
          return state.getList
            .map(({ Company, Quote }) => {
              return { Company, Quote };
            })
            .filter((item) => {
              return item.Quote !== null;
            });
        }
      };
    },
    getAllQuotesForCompany: (state) => {
      return (company, year) => {
        return company.Quote.filter(
          function (item) {
            return (
              item.Years.toString() === year.toString() &&
              item.Currency === state.getSelectedCurrency[0].name
            );
          }.bind(this)
        );
      };
    },
    getDisplays: (state) => {
      return (selected) => {
        if (selected) {
          return state.display.items.filter((item) => {
            return item.selected;
          });
        }
        return state.display.items.filter((item) => {
          return !item.selected;
        });
      };
    },
    getSelectedCurrency: (state) => {
      return state.currencies.items.filter((item) => {
        return item.selected;
      });
    },
  },

  actions: {
    async fetchList() {
      let response = await axios.get(url);
      response = this.initSorted(response);
      this.setList(response.data);
    },
    initSorted(response) {
      response.data.sort((item, another) => {
        return new Date(another.DateSent) - new Date(item.DateSent);
      });

      response.data.sort((item, another) => {
        if (item.Quote === null) {
          return 1;
        }
        if (another.Quote === null) {
          return -1;
        }
        let itemDate = new Date(item.DateSent);
        let anotherDate = new Date(another.DateSent);
        let equalDates =
          itemDate.getDate() === anotherDate.getDate() &&
          itemDate.getMonth() === anotherDate.getMonth() &&
          itemDate.getFullYear() === anotherDate.getFullYear();
        if (equalDates) {
          return another.Preferred - item.Preferred;
        }
      });

      return response;
    },
    setList(list) {
      this.list = list;
    },
    updateYear(year) {
      this.years[year.tag].active = !year.active;
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
      this.currencies.items.forEach(function (item) {
        item.selected = item.name === curr;
      });
    },
    updateDisplay(dis) {
      this.display.items.forEach(function (item) {
        item.selected = item.name === dis;
      });
    },
    filterListByCompany(company) {
      if (!company) {
        return (this.filteredList = {});
      }
      this.filteredList = this.list.filter((item) => {
        return item.Company.toLowerCase().includes(company);
      });
    },
    orderListBy(val) {
      this.ordered.by = val;
      this.ordered.asc = !this.ordered.asc;

      if (val === "company") {
        this.filteredList = this.sortByCompany(this.ordered.asc);
      }
      if (val === "date") {
        this.filteredList = this.sortByDate(this.ordered.asc);
        this.filteredList = this.sortbyPreferredOnEqualDates();
      }
    },
    sortByCompany(isAsc) {
      return this.list.sort(function (item, another) {
        if (item.Quote === null) {
          return 1;
        }
        if (another.Quote === null) {
          return -1;
        }
        if (isAsc) {
          return another.Company.charCodeAt(0) - item.Company.charCodeAt(0);
        } else {
          return item.Company.charCodeAt(0) - another.Company.charCodeAt(0);
        }
      });
    },
    sortByDate(isAsc) {
      return this.list.sort(function (item, another) {
        if (item.Quote === null) {
          return 1;
        }
        if (another.Quote === null) {
          return -1;
        }
        if (isAsc) {
          return new Date(another.DateSent) - new Date(item.DateSent);
        } else {
          return new Date(item.DateSent) - new Date(another.DateSent);
        }
      });
    },
    sortbyPreferredOnEqualDates() {
      return this.list.sort(function (item, another) {
        let itemDate = new Date(item.DateSent);
        let anotherDate = new Date(another.DateSent);

        let equalDates =
          itemDate.getDate() === anotherDate.getDate() &&
          itemDate.getMonth() === anotherDate.getMonth() &&
          itemDate.getFullYear() === anotherDate.getFullYear();

        if (equalDates) {
          return another.Preferred - item.Preferred;
        }
      });
    },
  },
});
