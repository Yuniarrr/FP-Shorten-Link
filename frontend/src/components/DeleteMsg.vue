<template>
  <div
    class="fixed z-50 flex flex-col items-center justify-center w-1/3 py-5 -mt-4 -ml-8 rounded-lg opacity-100 pb-11 bg-neutral-800 gap-y-1 md:px-2"
  >
    <Icon
      icon="material-symbols:close-rounded"
      class="self-end mr-6 cursor-pointer hover:text-yellow-200"
      width="25"
      @click="app.links.delete = false"
    />
    <p class="text-2xl font-medium md:mx-3 sm:mx-3 sm:text-center">
      Are you sure delete it?
    </p>
    <div
      class="flex my-5 -mb-2 lg:flex-row md:flex-row sm:flex-col sm:gap-y-4 gap-x-6"
    >
      <button
        type="submit"
        class="w-24 p-3 font-bold bg-green-400 rounded-lg hover:bg-green-500"
        @click="(app.links.delete = false), app.deleteLink(id)"
      >
        Yes
      </button>
      <button
        type="submit"
        class="w-24 p-3 font-bold bg-red-500 rounded-lg hover:bg-red-600"
        @click="app.links.delete = false"
      >
        No
      </button>
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
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    Icon,
  },
};
</script>
