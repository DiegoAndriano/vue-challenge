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
    getAverageQuotes(year) {
      let values = {
        fix: 0,
        frn: 0,
      };

      if (this.welcomeStore.getAllQuotes() !== undefined) {
        let quotes = this.welcomeStore
          .getAllQuotes()
          .map(function (item) {
            return item.Quote.flat();
          })
          .flat()
          .filter(
            function (item) {
              return (
                item.Currency ===
                  this.welcomeStore.getSelectedCurrency[0].name &&
                item.Years.toString() === year.toString()
              );
            }.bind(this)
          );

        let count = {
          fix: 0,
          frn: 0,
        };

        let selectedDisplay = this.welcomeStore.getDisplays(true)[0];

        const preffix = selectedDisplay.preffix;
        const suffix = selectedDisplay.suffix;

        quotes.forEach(
          function (item) {
            let valueIsNotNull = item[selectedDisplay.name];

            if (valueIsNotNull) {
              let value = item[selectedDisplay.name];

              count[item.CouponType.toLowerCase()] =
                count[item.CouponType.toLowerCase()] + 1;
              values[item.CouponType.toLowerCase()] =
                value + values[item.CouponType.toLowerCase()];
            }
          }.bind(this)
        );

        if (selectedDisplay.name === "Yield") {
          if (values.fix !== 0) {
            values.fix = preffix + (values.fix / count.fix).toFixed(3) + suffix;
          } else {
            values.fix = "";
          }
          if (values.frn !== 0) {
            values.frn = preffix + (values.frn / count.frn).toFixed(3) + suffix;
          } else {
            values.frn = "";
          }
        } else {
          if (values.fix !== 0) {
            values.fix = preffix + Math.floor(values.fix / count.fix) + suffix;
          } else {
            values.fix = "";
          }
          if (values.frn !== 0) {
            values.frn = preffix + Math.floor(values.frn / count.frn) + suffix;
          } else {
            values.frn = "";
          }
        }
      }
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
