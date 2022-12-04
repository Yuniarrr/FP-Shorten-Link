<template>
  <div class="grid grid-flow-row grid-cols-12">
    <Sidebar class="h-screen col-span-2" />
    <div class="col-span-10">
      test
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
};
</script>
