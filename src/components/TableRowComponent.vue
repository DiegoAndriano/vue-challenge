<template>
  <tbody>
    <tr
      class="border border-l-0 border-r-0 border-t-0 border-b-1 border-app-mute"
    >
      <td
        :class="company.Quote === null ? 'my-4' : 'my-2'"
        class="flex items-center text-app-text my-2"
      >
        <chevron-down-icon
          v-if="open && company.Quote !== null"
          @click.native="toggleOpen"
          class="w-3 h-3 text-app-text cursor-pointer"
        ></chevron-down-icon>
        <chevron-right-icon
          v-if="!open && company.Quote !== null"
          @click.native="toggleOpen"
          class="w-3 h-3 text-app-mute cursor-pointer"
        ></chevron-right-icon>
        {{ parseDate(company.DateSent) }}
      </td>
      <td
        class="font-semibold text-app-text my-2"
        :class="company.Quote === null ? 'text-app-mute' : ''"
      >
        {{ company.Company }}
      </td>
      <template v-for="year in getYrs">
        <td
          v-for="couponType in couponTypes"
          :key="company.Company + couponType + year"
          class="text-center text-app-text my-2"
        >
          {{ getQuotes(company, year)[couponType.toLowerCase()] }}
        </td>
      </template>
    </tr>
    <tr
      class="border border-l-0 border-r-0 border-t-0 border-b-1 border-app-mute"
      v-if="open"
    >
      <td class="flex items-center my-4"></td>
      <td class="my-2">Yield</td>
      <template v-for="year in getYrs">
        <td
          v-for="couponType in couponTypes"
          :key="company.Company + couponType + year"
          class="text-center text-app-text my-2"
        >
          {{ getQuotes(company, year)[couponType.toLowerCase()] }}
        </td>
      </template>
    </tr>
  </tbody>
</template>

<script>
import ChevronDownIcon from "./icons/ChevronDownIcon.vue";
import ChevronRightIcon from "./icons/ChevronRightIcon.vue";
import { useWelcomeStore } from "../stores/welcome";

export default {
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  components: {
    "chevron-down-icon": ChevronDownIcon,
    "chevron-right-icon": ChevronRightIcon,
  },
  props: {
    company: Object,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    parseDate(date) {
      if (!date) {
        return "";
      }

      let toFormat = new Date(date);
      const day = toFormat.toLocaleString("en-us", { day: "2-digit" });
      const month = toFormat.toLocaleString("en-us", { month: "short" });
      const year = toFormat.toLocaleString("en-us", { year: "numeric" });
      return day + "-" + month + "-" + year;
    },
    getQuotes(company, yrs) {
      if (company.Quote !== null) {
        let quotes = company.Quote.filter(
          function (item) {
            return (
              item.Years.toString() === yrs.toString() &&
              item.Currency === this.welcomeStore.currency
            );
          }.bind(this)
        );
        let values = {
          fix: "",
          frn: "",
        };

        quotes.forEach(
          function (item) {
            if (item.CouponType === "FIX") {
              values.fix = item[this.welcomeStore.display];
            } else if (item.CouponType === "FRN") {
              values.frn = item[this.welcomeStore.display];
            }
          }.bind(this)
        );
        values.fix = this.parseValue(values.fix, this.welcomeStore.display);
        values.frn = this.parseValue(values.frn, this.welcomeStore.display);

        return values;
      }

      return "";
    },
    parseValue(val, display) {
      if (!val) {
        return "";
      }
      if (display === "Spread" || display === "3MLSpread") {
        return "+" + val + "bp";
      }
      if (display === "Yield") {
        return val.toFixed(3) + "%";
      }
    },
  },
  computed: {
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
