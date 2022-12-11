<template>
  <div>
    <!-- <EditMsg class="absolute top-1/2 left-1/2" /> -->
    <div class="flex w-full h-screen bg-black text-neutral-50">
      <!-- Sidebar -->
      <Sidebar :class="app.loading ? 'hidden' : ''"/>
      <RouterView :class="app.loading ? 'hidden' : ''"/>
      <Loading v-if="app.loading" />
      
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { useApp, useView } from "../stores/index.js";
import AddToggle from "../components/AddToggle.vue";
import Sidebar from "../components/dashboard/Sidebar.vue";
import HomeDashboard from "../components/dashboard/Home.vue";
import Loading from "../components/Loading.vue";

export default {
  setup() {
    const view = useView();
    const app = useApp();

    return {
      app,
      view,
    };
  },
  components: {
    Icon,
    AddToggle,
    Sidebar,
    HomeDashboard,
    Loading
  },
  beforeMount() {
    if (this.app.user.logged_in === false) {
      this.$router.push("/login");
    }
  },
  beforeCreate() {
    if (this.app.user.logged_in === true) {
      this.app.getLinks();
    }
  },
};
</script>
