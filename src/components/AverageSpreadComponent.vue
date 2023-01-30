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
    getAverageQuotes(year) {},
    getRelevantQuotes(company, yrs) {
      return company.Quote.filter(
        function (item) {
          return (
            item.Years.toString() === yrs.toString() &&
            item.Currency === this.welcomeStore.getSelectedCurrency[0].name
          );
        }.bind(this)
      );
    },
  },
  omputed: {
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
