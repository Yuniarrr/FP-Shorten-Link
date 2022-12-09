<template>
  <div
    class="fixed z-10 flex items-center justify-center w-full h-full mr-5"
    :class="{ hidden: app.links.success == false, hidden: app.links.edit == false }"
  >
    <div
      class="z-20 flex items-center justify-center w-full h-full mr-5 bg-black opacity-60 my-7"
      @click="
        (app.links.success = false), (app.links.edit = false), (app.links.path = ``)
      "
    ></div>
    <SuccessMsg v-if="app.links.success" :copy="copy" />
    <EditMsg v-if="app.links.edit" :id="id" />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { useApp } from "../stores/index.js";
import SuccessMsg from "./SuccessMsg.vue";
import EditMsg from "./EditMsg.vue";

export default {
  props: {
    copy: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    Icon,
    SuccessMsg,
    EditMsg,
  },
  setup() {
    const app = useApp();
    return {
      app,
    };
  },
};
</script>
