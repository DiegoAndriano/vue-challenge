<template>
  <div class="w-1/3">
    <input
      class="w-full rounded-md text-app-mute border border-app-mute px-6 py-2 focus:px-8 transition ease-in-out duration-150"
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
