<template>
  <div
    class="fixed z-50 flex flex-col items-center justify-center w-1/3 py-5 -mt-4 -ml-8 rounded-lg opacity-100 pb-11 bg-neutral-800 gap-y-1 md:px-2"
  >
    <Icon
      icon="material-symbols:close-rounded"
      class="self-end mr-6 cursor-pointer hover:text-yellow-200"
      width="25"
      @click="(app.links.success = false), (app.links.path = ``)"
    />
    <p class="text-2xl text-center">Link created successfully !!</p>
    <div class="flex md:flex-col lg:flex-row gap-x-3 md:mx-3 sm:flex-col sm:gap-y-3 sm:mt-2">
      <p class="text-4xl font-semibold">{{ app.links.path }}</p>
      <Icon
        v-if="copy == false"
        icon="carbon:copy"
        width="30"
        class="self-center mt-1 cursor-pointer hover:text-yellow-200"
        @click="(copy = true), copyURL(app.links.path)"
      />
      <Icon
        v-if="copy == true"
        icon="material-symbols:check-small-rounded"
        color="green"
        class="z-auto self-center mt-1 cursor-pointer"
        width="40"
      />
    </div>
  </div>
</template>

<script>
import { useApp } from "../stores/index.js";
import { Icon } from "@iconify/vue";

export default {
  setup() {
    const app = useApp();
    return {
      app,
    };
  },
  props: {
    copy: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Icon,
  },
  methods: {
    copyURL(url) {
      navigator.clipboard.writeText(url);
    },
  },
};
</script>
