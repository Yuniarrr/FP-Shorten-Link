<template>
  <div class="left-0 right-0 bottom-0 top-0">
    <RouterView />
    <LoadingVue v-if="app.loading" />
  </div>
</template>
<script>
import { useApp } from "./stores";
import LoadingVue from "./components/Loading.vue";
export default {
  name: "App",
  setup() {
    const app = useApp();
    return {
      app,
    };
  },
  components: {
    LoadingVue,
  },
  beforeMount() {
    this.app.sessionCheck();
  },
};
</script>
