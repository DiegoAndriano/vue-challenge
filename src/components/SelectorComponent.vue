<template>
  <div
    class="flex flex-col md:flex-row items-center mx-auto w-full space-x-6 space-y-6 md:space-y-0"
  >
    <!--    <fieldset class="flex border border-app-main rounded-md">-->
    <!--      <template v-for="currency in welcomeStore.currencies.items">-->
    <!--        <single-radio-selector-component-->
    <!--          v-on:changed="currencyClicked"-->
    <!--          v-model="curr"-->
    <!--          :object="currency"-->
    <!--          :key="currency"-->
    <!--        ></single-radio-selector-component>-->
    <!--      </template>-->
    <!--    </fieldset>-->

    <fieldset class="flex">
      <template v-for="(currency, i) in welcomeStore.currencies.items">
        <input
          :key="currency.name"
          @change="currencyClicked"
          class="appearance-none"
          type="radio"
          name="curr"
          :id="currency.name"
          :value="currency.name"
          v-model="curr"
        />
        <label
          :key="currency.name + 'l'"
          :class="
            getSingleSelectorClasses(
              curr === currency.name,
              i,
              Object.keys(welcomeStore.currencies.items).length - 1
            )
          "
          class="cursor-pointer py-2 w-full px-2 ease-in-out transition transform duration-100"
          :for="currency.name"
          >{{ currency.name }}</label
        >
      </template>
    </fieldset>

    <fieldset class="flex">
      <template v-for="(year, key, index) in welcomeStore.years">
        <input
          :key="year.num"
          class="appearance-none"
          @change="yearClicked(year)"
          type="checkbox"
          v-model="selectedyears"
          :id="year.tag"
          :value="year"
        />
        <label
          :key="year.num + 'l'"
          :class="
            getSingleSelectorClasses(
              selectedyears.includes(year),
              index,
              Object.keys(welcomeStore.years).length - 1
            )
          "
          class="cursor-pointer py-2 w-full px-2 ease-in-out transition transform duration-100 whitespace-nowrap"
          :for="year.tag"
          >{{ year.num + " YRS" }}</label
        >
      </template>
    </fieldset>

    <fieldset class="flex">
      <template v-for="(item, i) in welcomeStore.display.items">
        <input
          :key="item.name"
          @change="displayClicked"
          class="appearance-none"
          type="radio"
          name="display"
          :id="item.name"
          :value="item.name"
          v-model="dis"
        />
        <label
          :key="item.name + 'l'"
          :class="
            getSingleSelectorClasses(
              dis === item.name,
              i,
              Object.keys(welcomeStore.display.items).length - 1
            )
          "
          class="cursor-pointer py-2 w-full px-2 ease-in-out transition transform duration-100"
          :for="item.name"
          >{{ item.name }}</label
        >
      </template>
    </fieldset>
  </div>
</template>

<script>
import { useWelcomeStore } from "../stores/welcome";
import SingleRadioSelectorComponent from "./SingleRadioSelectorComponent.vue";

export default {
  components: {
    "single-radio-selector-component": SingleRadioSelectorComponent,
  },
  setup() {
    const welcomeStore = useWelcomeStore();

    return { welcomeStore };
  },
  data() {
    return {
      curr: "USD",
      dis: "Spread",
      selectedyears: [
        this.welcomeStore.years.one,
        this.welcomeStore.years.two,
        this.welcomeStore.years.three,
      ],
    };
  },
  methods: {
    getSingleSelectorClasses(selected, i, lastIndex) {
      let isFirstIndex = i === 0;
      let isMiddleIndex = i % 2 === 1;

      return {
        "bg-app-main hover:bg-app-reverse text-app-reverse hover:text-app-text rounded-l-md border border-l-1 border-b-1 border-t-1 border-r-0 border-app-main":
          selected && isFirstIndex,
        "bg-app-reverse hover:bg-app-main text-app-text hover:text-app-reverse rounded-l-md border border-l-1 border-b-1 border-t-1 border-r-0 border-app-main":
          !selected && isFirstIndex,
        "bg-app-main hover:bg-app-reverse text-app-reverse hover:text-app-text rounded-r-md  border border-l-0 border-b-1 border-t-1 border-r-1 border-app-main":
          selected && i === lastIndex,
        "bg-app-reverse hover:bg-app-main text-app-text hover:text-app-reverse rounded-r-md border border-l-0 border-b-1 border-t-1 border-r-1 border-app-main":
          !selected && i === lastIndex,
        "bg-app-main hover:bg-app-reverse text-app-reverse hover:text-app-text border border-t-1 border-b-1 border-r-1 border-l-1 border-app-main":
          selected && isMiddleIndex,
        "bg-app-reverse hover:bg-app-main text-app-text hover:text-app-reverse border border-t-1 border-b-1 border-r-1 border-l-1 border-app-main":
          !selected && isMiddleIndex,
      };
    },
    yearClicked(year) {
      this.welcomeStore.updateYear(year);
    },
    currencyClicked() {
      this.welcomeStore.updateCurrency(this.curr);
    },
    displayClicked() {
      this.welcomeStore.updateDisplay(this.dis);
    },
  },
};
</script>
