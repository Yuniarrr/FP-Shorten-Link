<template>
  <div class="grid grid-flow-row grid-cols-12">
    <Sidebar class="h-screen col-span-2" />
    <div class="col-span-10 ml-10">
      dashboard
    </div>
  </div>
</template>

<script>
import { useView } from "../stores/index.js";
import AddToggle from "../components/AddToggle.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  setup() {
    const view = useView();
    return {
      view,
    };
  },
  components: {
    AddToggle,
    Sidebar,
  },
  methods: {
    SetWidth(str) {
      return str.length > 50 ? str.substring(0, 35) + "..." : str;
    },
    OpenLink(link) {
      window.open(link, "_blank");
    },
  },
};
</script>
