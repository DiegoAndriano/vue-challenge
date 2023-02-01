<template>
  <thead
    class="border border-b-1 border-r-0 border-t-0 border-l-0 border-app-main"
  >
    <tr>
      <th></th>
      <th></th>
      <th
        colspan="2"
        v-for="year in getYrs"
        :key="year"
        class="text-app-lighttext text-sm uppercase"
      >
        <p
          class="text-app-text border border-b-1 border-r-0 border-t-0 border-l-0 border-app-main mx-1.5"
        >
          {{ year }} YRS
        </p>
      </th>
    </tr>
    <tr>
      <th class="text-app-lighttext text-sm uppercase text-start flex">
        <span class="flex items-center font-medium">
          Date Sent
          <caret-icon
            @click.native="welcomeStore.orderListBy('date')"
            :class="getSvgColorAndDirectionFor('date')"
            class="w-4 h-4"
          ></caret-icon>
        </span>
      </th>
      <th class="text-app-lighttext text-sm uppercase text-start">
        <span class="flex items-center font-medium">
          Company
          <caret-icon
            @click.native="welcomeStore.orderListBy('company')"
            :class="getSvgColorAndDirectionFor('company')"
            class="w-4 h-4"
          ></caret-icon>
        </span>
      </th>
      <template v-for="year in getYrs">
        <th
          v-for="couponType in couponTypes"
          :key="couponType + year"
          class="text-app-lighttext text-sm uppercase font-medium"
        >
          {{ couponType }}
        </th>
      </template>
    </tr>
  </thead>
</template>

<script>
import { useWelcomeStore } from "../stores/welcome";
import CaretIcon from "./icons/CaretIcon.vue";

export default {
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  components: {
    "caret-icon": CaretIcon,
  },
  methods: {
    getSvgColorAndDirectionFor(val) {
      const isAsc = this.welcomeStore.ordered.asc;
      const isSelected = this.welcomeStore.ordered.by === val;

      return {
        "text-app-text transform cursor-pointer z-10":
          isAsc && this.welcomeStore.ordered.by === val,
        "text-app-text transform rotate-180 cursor-pointer z-10":
          !isAsc && isSelected,
        "text-app-lighttext transform rotate-180 cursor-pointer z-10":
          !isSelected,
      };
    },
  },
  computed: {
    couponTypes() {
      return this.welcomeStore.getCouponTypes;
    },
    dates() {
      return this.welcomeStore.getDates;
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
    list() {
      return this.welcomeStore.filteredList;
    },
  },
};
</script>
