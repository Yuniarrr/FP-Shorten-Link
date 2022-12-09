<template>
  <div class="w-full ml-24 mr-5 mb-9">
    <PopupMsg :copy="copy" :id="id" />
    <div class="w-full py-6 rounded-lg bg-neutral-900 my-7 px-7 h-fit">
      <h1 class="text-4xl font-bold text-neutral-50">Your Links</h1>
      <div class="mt-8 space-y-3">
        <div>
          <div class="flex items-center w-2/3 rounded-lg bg-neutral-800 mb-9">
            <input
              type="url"
              name="url"
              id="url"
              class="w-full border-0 rounded-lg bg-neutral-800 focus:outline-none focus:ring-0 md:ml-3"
              placeholder="Place your link here!"
              autocomplete="off"
              autofocus
              v-model="app.links.link"
            />
            <button @click="use_custom ? app.newLink(app.links.link, app.links.custom_link) : app.newLink(app.links.link)"
              type="submit"
              class="w-24 p-3 font-bold bg-green-400 rounded-r-lg hover:bg-green-500"
            >
              Short it!
            </button>
          </div>
          <div class="flex items-end justify-end w-2/3 mb-6 -mt-4">
            <p class="font-light">Use 
              <span v-if="use_custom == false" class="cursor-pointer hover:underline" @click="use_custom = true">
              Custom Link
              </span>
              <span v-if="use_custom == true" class="cursor-pointer hover:underline" @click="use_custom = false">
              Default Link
              </span>
            </p>
          </div>
          <div v-if="use_custom == true" class="flex flex-row w-2/3 p-5 -mt-8 rounded-lg">
            <div class="self-center text-lg font-medium basis-1/12">s.it/</div>
            <div class="basis-11/12 bg-neutral-800">
              <input
                type="url"
                name="url"
                id="url"
                class="w-full border-0 rounded-lg bg-neutral-800 focus:outline-none focus:ring-0 md:ml-3"
                placeholder="Place your custom-link here!"
                autocomplete="off"
                v-model="app.links.custom_link"
              />
            </div>
          </div>
        </div>

        <!-- Rendering list -->
        <div v-for="link in app.links.all_links" :key="link.id">
          <div class="w-2/3 p-5 rounded-lg bg-neutral-800">
            <div class="relative flex">
              <h1 class="text-2xl font-medium text-yellow-200 cursor-pointer hover:underline">
                {{ `s.it/${link.path}` }}
              </h1>
              <Icon
                icon="carbon:copy"
                width="20"
                class="ml-1 cursor-pointer hover:text-yellow-200"
                @click="view.copyURL(`s.it/${link.path}`)"
              ></Icon>
              <div
                class="bg-neutral-700 px-1.5 py-1 rounded-md ml-3 absolute right-24 flex justify-center items-center space-x-1 cursor-pointer hover:bg-neutral-600"
                @click="(app.links.edit = true), id = link.id"
              >
                <h1 class="text-sm font-semibold">Edit</h1>
                <Icon
                  icon="material-symbols:edit"
                  width="17"
                  class="cursor-pointer text-neutral-50"
                ></Icon>
              </div>
              <div
                class="bg-neutral-700 px-1.5 py-1 rounded-md ml-3 absolute right-0 flex justify-center items-center space-x-1 cursor-pointer hover:bg-neutral-600"
                @click="app.deleteLink(link.id)"
              >
                <h1 class="text-sm font-semibold">Delete</h1>
                <Icon
                  icon="material-symbols:delete-outline-rounded"
                  width="17"
                  class="cursor-pointer text-neutral-50"
                ></Icon>
              </div>
            </div>
            <p @click="openLink(link.url)" class="cursor-pointer text-neutral-400 hover:underline">{{ link.url }}</p>
            <hr class="mt-1" />
            <div class="relative flex w-full mt-2">
              <div class="flex items-center space-x-1">
                <Icon
                  icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
                  width="20"
                  class="text-neutral-500"
                ></Icon>
                <h1 class="text-neutral-500">{{ convertTime(link.updated_at) }}</h1>
              </div>
              <div class="absolute right-0">
                <div class="flex items-center space-x-2">
                  <div
                    class="p-1 rounded-md cursor-pointer bg-neutral-700 h-7 hover:bg-neutral-600"
                  >
                    <Icon
                      icon="material-symbols:lock-outline"
                      width="20"
                      class="text-neutral-50"
                    ></Icon>
                  </div>
                  <div
                    class="bg-neutral-700 px-1.5 h-7 rounded-md flex items-center cursor-pointer hover:bg-neutral-600"
                  >
                    <Icon
                      icon="material-symbols:bar-chart-rounded"
                      width="20"
                      class="text-neutral-50"
                    ></Icon>
                    <h1 class="text-neutral-50">Statistics</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      {{app.links.all_links}}
    </div>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue";
import { useApp, useView } from "../../stores/index.js";
import PopupMsg from "../PopupMsg.vue"

export default {
  data() {
    return {
      copy: false,
      use_custom: false,
      id: null,
    };
  },
  components: {
    Icon,
    PopupMsg
  },
  created() {
    this.app.getLinks();
  },
  setup() {
    const view = useView();
    const app = useApp();
    return {
      app,
      view,
    };
  },
  methods: {
    convertTime(time) {
      let date = new Date(time).toLocaleString();
      let month = this.convertMonth(date.split("/")[0]);
      let day = date.split("/")[1];
      let year = date.split("/")[2].split(",")[0];
      let hour = date.split("/")[2].split(",")[1].split(":")[0];
      let minute = date.split("/")[2].split(",")[1].split(":")[1];
      let ampm = date.split("/")[2].split(",")[1].split(":")[2].split(" ")[1];
      return `${day} ${month} ${year} ${hour}:${minute} ${ampm}`;
    },
    openLink(url) {
      window.open(url, "_blank");
    },
    convertMonth(month) {
      switch (month) {
        case "01":
          return "January";
        case "02":
          return "February";
        case "03":
          return "March";
        case "04":
          return "April";
        case "05":
          return "May";
        case "06":
          return "June";
        case "07":
          return "July";
        case "08":
          return "August";
        case "09":
          return "September";
        case "10":
          return "October";
        case "11":
          return "November";
        case "12":
          return "December";
      }
    },
  },
  watch: {
    copy() {
      if (this.copy == true) {
        setTimeout(() => {
          this.copy = false;
        }, 2000);
      }
    },
  },
};
</script>
