<template>
  <tbody class="h-10">
    <tr
      style="background-clip: padding-box"
      class="border border-1 border-app-text"
    >
      <td class="flex items-center text-app-text my-2"></td>
      <td class="text-app-text">
        Average by {{ welcomeStore.getDisplays(true)[0].name }}
      </td>
      <template v-for="year in getYrs">
        <td
          v-for="couponType in couponTypes"
          :key="couponType + year"
          class="text-center text-app-text my-2"
        >
          {{ getAverageQuotes(year)[couponType.toLowerCase()] }}
        </td>
      </template>
    </tr>
  </tbody>
</template>

<script>
import { useWelcomeStore } from "../stores/welcome";

export default {
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  methods: {
    filterQuotesByYearAndSelectedCurrency(year) {
      return this.welcomeStore
        .getAllQuotes()
        .map(function (item) {
          return item.Quote.flat();
        })
        .flat()
        .filter(
          function (item) {
            return (
              item.Currency === this.welcomeStore.getSelectedCurrency[0].name &&
              item.Years.toString() === year.toString()
            );
          }.bind(this)
        );
    },
    getAverageQuotes(year) {
      let values = {
        fix: 0,
        frn: 0,
      };

      let count = {
        fix: 0,
        frn: 0,
      };

      if (this.welcomeStore.getAllQuotes() === undefined) {
        return values;
      }

      let quotes = this.filterQuotesByYearAndSelectedCurrency(year);
      let selectedDisplay = this.welcomeStore.getDisplays(true)[0];

      quotes.forEach((item) => {
        let valueIsNotNull = item[selectedDisplay.name];

        if (valueIsNotNull) {
          let value = item[selectedDisplay.name];
          let couponType = item.CouponType.toLowerCase();

          count[couponType] = count[couponType] + 1;
          values[couponType] += value;
        }
      });

      const preffix = selectedDisplay.preffix;
      const suffix = selectedDisplay.suffix;

      Object.keys(values).forEach((key) => {
        if (values[key] !== 0) {
          if (selectedDisplay.name === "Yield") {
            values[key] =
              preffix + (values[key] / count[key]).toFixed(3) + suffix;
          } else {
            values[key] =
              preffix + Math.floor(values[key] / count[key]) + suffix;
          }
        } else {
          values[key] = "";
        }
      });
      return values;
    },
  },
  computed: {
    list() {
      return this.welcomeStore.getList;
    },
    getYrs() {
      let active = Object.keys(this.welcomeStore.years).filter((item) => {
        return this.welcomeStore.years[item].active !== false;
      });

      let result = {};

      active.forEach((item) => {
        result[item] = this.welcomeStore.years[item].num;
      });

      return result;
    },
    couponTypes() {
      return this.welcomeStore.getCouponTypes;
    },
  },
};
</script>
