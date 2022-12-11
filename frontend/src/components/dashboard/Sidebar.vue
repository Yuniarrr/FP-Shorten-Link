<template>
  <div class="fixed h-[90%] mx-3 px-3 py-3 my-7 bg-neutral-900 rounded-lg">
    <!-- <div
      @click="this.$router.push('/dashboard/profile')"
      class="flex items-center justify-center w-10 h-10 p-1 rounded-lg cursor-pointer bg-neutral-800 text-neutral-50 hover:text-green-400"
      :class="$route.path == '/dashboard/profile' ? 'text-green-400' : ''"
    >
      <Icon icon="mdi:face-man" width="25"></Icon>
    </div> -->
    <div
      @click="this.$router.push('/dashboard')"
      class="flex items-center justify-center w-10 h-10 p-1 rounded-lg cursor-pointer bg-neutral-800 text-neutral-50 hover:text-green-400"
      :class="$route.path == '/dashboard' ? 'text-green-400' : ''"
    >
      <Icon icon="material-symbols:home-outline-rounded" width="25"></Icon>
    </div>
    <div
      @click="this.$router.push('/dashboard/links')"
      class="flex items-center justify-center w-10 h-10 p-1 mt-3 rounded-lg cursor-pointer bg-neutral-800 text-neutral-50 hover:text-green-400"
      :class="$route.path == '/dashboard/links' ? 'text-green-400' : ''"
    >
      <Icon icon="mdi:link-variant" width="25"></Icon>
    </div>
    <div
      class="absolute flex items-center justify-center w-10 h-10 p-1 rounded-lg cursor-pointer bg-neutral-800 bottom-3 text-neutral-50 hover:text-green-400"
      @click="app.signOut()"
    >
      <Icon icon="fa-solid:sign-out-alt" width="25"></Icon>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { useApp } from "../../stores/index.js";

export default {
  components: {
    Icon,
  },
  setup() {
    const app = useApp();
    return {
      app,
    };
  },
};
</script>
