<template>
  <tbody>
    <tr
      style="background-clip: padding-box"
      class="h-10"
      :class="
        !isLastIndex
          ? 'border border-l-0 border-r-0 border-t-0 border-b-1 border-app-mute'
          : ''
      "
    >
      <td class="flex items-center text-app-text h-10">
        <chevron-down-icon
          v-if="open && company.Quote !== null"
          @click.native="toggleOpen"
          class="w-3 h-3 text-app-text cursor-pointer"
        ></chevron-down-icon>
        <chevron-right-icon
          v-if="!open && company.Quote !== null"
          @click.native="toggleOpen"
          class="w-3 h-3 text-app-text cursor-pointer"
        ></chevron-right-icon>
        {{ parseDate(company.DateSent) }}
      </td>
      <td
        class="font-semibold text-app-text"
        :class="company.Quote === null ? 'text-app-mute' : ''"
      >
        {{ company.Company }}
      </td>
      <template v-for="year in getYrs">
        <td
          v-for="couponType in couponTypes"
          :key="company.Company + couponType + year"
          :class="
            welcomeStore
              .getHighlightedValues(year)
              .includes(company.Company + couponType + year)
              ? 'bg-app-accent'
              : ''
          "
          class="text-center text-app-text"
        >
          {{ getQuotes(company, year, undefined)[couponType.toLowerCase()] }}
        </td>
      </template>
    </tr>
    <template v-for="(quote, i) in welcomeStore.getDisplays(false)">
      <transition name="animateappear" :key="quote.name">
        <tr
          class="border border-l-0 border-r-0 border-t-0 border-b-1 border-app-mute h-10"
          v-if="open"
        >
          <td class="flex items-center text-center"></td>
          <td>{{ quote.name }}</td>
          <template v-for="year in getYrs">
            <td
              v-for="couponType in couponTypes"
              :key="company.Company + couponType + year"
              class="text-center text-app-text"
            >
              {{ getQuotes(company, year, i)[couponType.toLowerCase()] }}
            </td>
          </template>
        </tr>
      </transition>
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
    isLastIndex: Boolean,
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
        let quotes = this.welcomeStore.getAllQuotesForCompany(company, yrs);
        let values = {
          fix: "",
          frn: "",
        };

        let isSelectedDisplay = isNaN(index);
        let display =
          this.welcomeStore.getDisplays(isSelectedDisplay)[
            isSelectedDisplay ? 0 : index
          ];

        quotes.forEach(
          function (item) {
            values[item.CouponType.toLowerCase()] = "";

            let valueIsNotNull =
              item[
                this.welcomeStore.getDisplays(isSelectedDisplay)[
                  isSelectedDisplay ? 0 : index
                ].name
              ];

            if (valueIsNotNull) {
              const preffix = display.preffix;
              const suffix = display.suffix;
              const value =
                item[
                  this.welcomeStore.getDisplays(isSelectedDisplay)[
                    isSelectedDisplay ? 0 : index
                  ].name
                ];

              values[item.CouponType.toLowerCase()] = preffix + value + suffix;
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
