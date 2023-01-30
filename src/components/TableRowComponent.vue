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
          {{ getQuotes(company, year, undefined)[couponType.toLowerCase()] }}
        </td>
      </template>
    </tr>
    <template v-for="(quote, i) in welcomeStore.getDisplays(false)">
      <tr
        :key="quote.name"
        class="border border-l-0 border-r-0 border-t-0 border-b-1 border-app-mute"
        v-if="open"
      >
        <td class="flex items-center my-4"></td>
        <td class="my-2">{{ quote.name }}</td>
        <template v-for="year in getYrs">
          <td
            v-for="couponType in couponTypes"
            :key="company.Company + couponType + year"
            class="text-center text-app-text my-2"
          >
            {{ getQuotes(company, year, i)[couponType.toLowerCase()] }}
          </td>
        </template>
      </tr>
    </template>
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
    getQuotes(company, yrs, index) {
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
            let isSelectedDisplay = isNaN(index);
            let selected =
              this.welcomeStore.getDisplays(isSelectedDisplay)[
                isSelectedDisplay ? 0 : index
              ];

            values[item.CouponType.toLowerCase()] = "";

            let valueIsNotNull =
              item[
                this.welcomeStore.getDisplays(isSelectedDisplay)[
                  isSelectedDisplay ? 0 : index
                ].name
              ];

            if (valueIsNotNull) {
              values[item.CouponType.toLowerCase()] =
                selected.preffix +
                item[
                  this.welcomeStore.getDisplays(isSelectedDisplay)[
                    isSelectedDisplay ? 0 : index
                  ].name
                ] +
                selected.suffix;
            }
          }.bind(this)
        );

        return values;
      }

      return "";
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
