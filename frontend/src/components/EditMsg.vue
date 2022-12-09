<template>
  <div
    class="fixed z-50 flex flex-col items-center justify-center w-2/5 py-5 -mt-4 -ml-8 rounded-lg opacity-100 pb-11 bg-neutral-800 gap-y-3 md:px-2"
  >
    <Icon
      icon="material-symbols:close-rounded"
      class="self-end mr-6 cursor-pointer hover:text-yellow-200"
      width="25"
      @click="app.links.edit = false"
    />
    <div class="flex flex-row gap-x-2">
      <Icon
        icon="material-symbols:edit"
        width="25"
        class="self-center text-neutral-50"
      ></Icon>
      <p class="text-2xl font-semibold">Edit Link</p>
    </div>
    <div class="flex flex-col w-5/6 gap-y-1">
      <p class="ml-1 text-lg font-normal">Full Url</p>
      <input
        type="url"
        class="w-full border-0 rounded-lg bg-neutral-900 focus:outline-none focus:ring-0"
        placeholder="Place your full-url here!"
        autocomplete="off"
        v-model="app.links.all_links.find(element => element.id == id).url"
      />
    </div>
    <div class="flex flex-col w-5/6 gap-y-1">
      <p class="ml-1 text-lg font-normal">Short Url</p>
      <div class="flex flex-row">
        <input
            type="url"
            class="w-full pl-12 border-0 rounded-lg bg-neutral-900 focus:outline-none focus:ring-0"
            placeholder="Place your short-url here!"
            autocomplete="off"
            v-model="app.links.all_links.find(element => element.id == id).path"
        />
        <p class="fixed z-20 self-center my-auto ml-3 font-semibold">s.it/</p>
      </div>
    </div>
    <button
      type="submit"
      class="w-24 p-3 mt-4 -mb-2 font-bold bg-green-400 rounded-lg hover:bg-green-500"
      @click="(app.links.edit = false), (app.editLink(id))"
    >
      Save
    </button>
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
