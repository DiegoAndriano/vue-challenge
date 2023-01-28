<template>
  <tr>
    <td class="flex items-center text-app-text">
      <chevron-down v-if="open" class="w-3 h-3 text-app-text"></chevron-down>
      <chevron-right v-if="!open" class="w-3 h-3 text-app-text"></chevron-right>
      {{ parseDate(company.DateSent) }}
    </td>
    <td
      class="font-semibold text-app-text"
      :class="company.Quote === null ? 'text-app-mute' : ''"
    >
      {{ company.Company }}
    </td>
    <td class="text-center text-app-text">
      {{ getQuotes(company, 5).fix }}
    </td>
    <td class="text-center text-app-text">
      {{ getQuotes(company, 5).frn }}
    </td>
    <td class="text-center text-app-text">
      {{ getQuotes(company, 10).fix }}
    </td>
    <td class="text-center text-app-text">
      {{ getQuotes(company, 10).frn }}
    </td>
    <td class="text-center text-app-text">
      {{ getQuotes(company, 40).fix }}
    </td>
    <td class="text-center text-app-text">
      {{ getQuotes(company, 40).frn }}
    </td>
  </tr>
  <!--      <tr></tr>-->
  <!--      <tr></tr>-->
</template>

<script>
import ChevronDown from "./icons/ChevronDown.vue";
import ChevronRight from "./icons/ChevronRight.vue";
import { useWelcomeStore } from "../stores/welcome";

export default {
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  components: {
    "chevron-down": ChevronDown,
    "chevron-right": ChevronRight,
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
    parseDate(date) {
      let toFormat = new Date(date);
      const day = toFormat.toLocaleString("en-us", { day: "2-digit" });
      const month = toFormat.toLocaleString("en-us", { month: "short" });
      const year = toFormat.toLocaleString("en-us", { year: "numeric" });
      return day + "-" + month + "-" + year;
    },
    getQuotes(company, yrs) {
      if (company.Quote !== null) {
        let quotes = company.Quote.filter(function (item) {
          return item.Years === yrs;
        });

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
      if (val === "") {
        return "";
      }
      if (display === "Spread") {
        return "+" + val + "bp";
      }
    },
  },
};
</script>
