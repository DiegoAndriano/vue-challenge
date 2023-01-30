<template>
  <div class="entrance-from" v-infocus="{ css: 'entrance-to', delay: delay }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["infocusVar", "delay"],
  methods: {},
  directives: {
    infocus: {
      isLiteral: true,
      inserted: (el, binding) => {
        let f = () => {
          let rect = el.getBoundingClientRect();
          let inView =
            rect.width > 0 &&
            rect.height > 0 &&
            rect.top >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight);
          if (inView) {
            setTimeout(() => {
              el.classList.add(binding.value.css);
              window.removeEventListener("scroll", f);
            }, binding.value.delay);
          }
        };
        window.addEventListener("scroll", f);
        f();
      },
    },
  },
};
</script>
