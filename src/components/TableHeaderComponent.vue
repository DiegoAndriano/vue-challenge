<template>
  <thead
    class="border border-b-1 border-r-0 border-t-0 border-l-0 border-app-main"
  >
    <tr>
      <th></th>
      <th></th>
      <th
        colspan="2"
        v-for="(i, year) in getYrs"
        :key="year"
        class="text-app-mute text-sm uppercase"
      >
        <p
          class="text-app-text border border-b-1 border-r-0 border-t-0 border-l-0 border-app-main mx-1.5"
        >
          {{ year }} YRS
        </p>
      </th>
    </tr>
    <tr>
      <th class="text-app-mute text-sm uppercase text-start">Date Sent</th>
      <th class="text-app-mute text-sm uppercase text-start">Company</th>
      <th
        v-for="couponType in couponTypes"
        :key="couponType + 5"
        class="text-app-mute text-sm uppercase"
      >
        {{ couponType }}
      </th>
      <th
        v-for="couponType in couponTypes"
        :key="couponType + 10"
        class="text-app-mute text-sm uppercase"
      >
        {{ couponType }}
      </th>
      <th
        v-for="couponType in couponTypes"
        :key="couponType + 40"
        class="text-app-mute text-sm uppercase"
      >
        {{ couponType }}
      </th>
    </tr>
  </thead>
</template>

<script>
import { useWelcomeStore } from "../stores/welcome";

export default {
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  computed: {
    couponTypes() {
      return this.welcomeStore.getCouponTypes;
    },
    dates() {
      return this.welcomeStore.getDates;
    },
    getYrs() {
      return this.welcomeStore.years;
    },
    list() {
      return this.welcomeStore.list;
    },
  },
};
</script>
