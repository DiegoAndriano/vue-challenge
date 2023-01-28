<template>
  <div class="w-full lg:w-1/3 my-6">
    <input
      class="md:w-[400px] w-full rounded-md text-app-mute border border-app-mute px-4 py-2 focus:px-6 transition ease-in-out duration-150"
      placeholder="Filter by company name ..."
      type="search"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      toSearch: "",
    };
  },
};
</script>
