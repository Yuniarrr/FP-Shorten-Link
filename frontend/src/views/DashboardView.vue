<template>
  <div>
    <!-- <EditMsg class="absolute top-1/2 left-1/2" /> -->
    <div class="flex w-full h-screen bg-black text-neutral-50">
      <!-- Sidebar -->
      <Sidebar />
      <RouterView />
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { useApp, useView } from "../stores/index.js";
import AddToggle from "../components/AddToggle.vue";
import Sidebar from "../components/dashboard/Sidebar.vue";
// import NavDashboard from "../components/NavDashboard.vue";
import HomeDashboard from "../components/dashboard/Home.vue";
import EditMsg from "../components/EditMsg.vue";
import { onMounted } from '@vue/runtime-core';
// import EditMsg from "../components/EditMsg.vue";

export default {
  setup() {
    const view = useView();
    const app = useApp();

    if (app.user.logged_in === false) {
      this.$router.push("/login");
    }

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
    // EditMsg,
  },
};
</script>
