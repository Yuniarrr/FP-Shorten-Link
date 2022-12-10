<template>
  <div
    class="flex justify-center items-center h-screen bg-black pb-20 text-white relative"
  >
    <div class="text-center">
      <div class="mt-16 space-y-4">
        <h1>You are being redirected, Please wait...</h1>
        <h1>
          If you are not being redirected quickly, please click this button.
        </h1>
      </div>
      <div class="mt-16">
        <button
          @click="app.visitUrl(this.$route.params.pathLink)"
          class="bg-green-500 p-2 text-sm rounded-md font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
    <span class="absolute flex items-center bottom-11 text-center">
      <RouterLink to="/">
        <h1 class="font-black text-yellow-100 text-xl">ShortIT</h1>
      </RouterLink>
    </span>
  </div>
</template>

<script>
import { useApp } from "../stores";

export default {
  setup() {
    const app = useApp();

    return {
      app,
    };
  },
  created() {
    setTimeout(() => {
      this.app.visitUrl(this.$route.params.pathLink);
    }, 5000);
  },
};
</script>
