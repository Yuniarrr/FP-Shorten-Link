<template>
  <div class="w-full py-6 ml-24 mr-5 rounded-lg mb-9 my-7 bg-neutral-900 px-7 h-fit">
    <div class="flex flex-row gap-x-6">
      <div
        class="flex items-center justify-center w-10 h-10 p-1 rounded-lg cursor-pointer bg-neutral-800 text-neutral-50"
        @click="this.$router.push('/dashboard/links')"
      >
        <Icon
          icon="ic:round-arrow-back"
          class="self-center cursor-pointer hover:text-yellow-200"
          width="30"
        />
      </div>
      <h1 class="text-4xl font-bold text-neutral-50">Detail Link</h1>
    </div>

    <div
      class="flex flex-row flex-wrap 2xl:justify-between xl:justify-between lg:justify-between md:justify-center sm:justify-center md:items-center sm:items-center items-center gap-3 w-full my-5"
    >
      <div class="p-3 rounded-md bg-neutral-800 w-64 h-full">
        <div class="flex justify-between">
          <p class="text-sm font-bold text-slate-400">LINKS</p>
        </div>
        <div @click="app.visitUrl(path)">
          <p
            class="my-2 text-3xl font-semibold hover:text-yellow-200 cursor-pointer hover:underline"
          >
            {{ `s.it/${path}` }}
          </p>
        </div>
      </div>
      <div class="p-3 rounded-md bg-neutral-800 w-64">
        <div class="flex justify-between">
          <p class="text-sm font-bold text-slate-400">VISITOR</p>
          <Icon
            icon="material-symbols:keyboard-double-arrow-up-rounded"
            width="23"
            color="#31c48d"
          />
        </div>
        <div class="grid grid-cols-2">
          <div>
            <p class="my-2 text-4xl font-semibold">
              {{ total }}
            </p>
          </div>
          <Icon
            class="p-2.5 bg-blue-900 rounded-md place-self-end"
            icon="mdi:user"
            color="#299CDB"
            width="40"
          />
        </div>
      </div>
      <div class="p-3 rounded-md bg-neutral-800 w-64">
        <div class="flex justify-between">
          <p class="text-sm font-bold text-slate-400">DAILY VISITED</p>
          <Icon
            :icon="
              daily > next_daily
                ? 'material-symbols:keyboard-double-arrow-up-rounded'
                : 'material-symbols:keyboard-double-arrow-down-rounded'
            "
            width="23"
            :color="daily > next_daily ? '#31c48d' : '#ff4a37'"
          />
        </div>
        <div class="grid grid-cols-2">
          <div>
            <p class="my-2 text-4xl font-semibold">
              {{ daily }}
            </p>
          </div>
          <Icon
            class="p-2.5 bg-amber-900 opacity-80 rounded-md place-self-end"
            icon="bi:calendar-day"
            color="#F7B84B"
            width="40"
          />
        </div>
      </div>
      <div class="p-3 rounded-md bg-neutral-800 w-64">
        <div class="flex justify-between">
          <p class="text-sm font-bold text-slate-400">MONTHLY VISITED</p>
          <Icon
            :icon="
              monthly > next_monthly
                ? 'material-symbols:keyboard-double-arrow-up-rounded'
                : 'material-symbols:keyboard-double-arrow-down-rounded'
            "
            width="23"
            :color="monthly > next_monthly ? '#31c48d' : '#ff4a37'"
          />
        </div>
        <div class="grid grid-cols-2">
          <div>
            <p class="my-2 text-4xl font-semibold">
              {{ monthly }}
            </p>
          </div>
          <Icon
            class="p-2.5 bg-zinc-900 opacity-95 rounded-md place-self-end"
            icon="bi:calendar-month"
            color="#5167AD"
            width="40"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-8 gap-3">
      <div class="col-span-4 bg-neutral-800 rounded-md">
        <div class="border-b-2 border-b-neutral-600">
          <p class="text-lg my-2 ml-5 font-bold text-neutral-50">Daily Visitor</p>
        </div>
        <div class="w-full">
          <Line
            :chart-data="app.chartDataDaily"
            class="w-full p-3 rounded-lg bg-neutral-800"
          />
        </div>
      </div>
      <div class="col-span-4 bg-neutral-800 rounded-md">
        <div class="border-b-2 border-b-neutral-600">
          <p class="text-lg my-2 ml-5 font-bold text-neutral-50">Monthly Visitor</p>
        </div>
        <div class="w-full">
          <Line
            :chart-data="app.chartDataMonthly"
            class="w-full p-3 rounded-lg bg-neutral-800"
          />
        </div>
      </div>
    </div>
    <div>
      {{ app.statistics.links.find((link) => link.id === id) }}
    </div>
    <div>==============================</div>
    <div>
      {{ app.statistics }}
    </div>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
import { Icon } from "@iconify/vue";
import { useApp, useView } from "../../stores/index.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default {
  data() {
    return {
      id: "",
      path: "",
      daily: "",
      monthly: "",
      total: "",
      next_daily: "",
      next_monthly: "",
    };
  },
  setup() {
    const view = useView();
    const app = useApp();
    return {
      app,
      view,
    };
  },
  beforeMount() {
    this.id = this.$router.currentRoute.value.params.id;
    if (this.app.links.all_links.find((link) => link.id === this.id)) {
      this.path = this.app.links.all_links.find((link) => link.id === this.id).path;
      this.total = this.app.statistics.links.find((link) => link.id === this.id).total;
      this.daily = this.app.statistics.links.find((link) => link.id === this.id).daily[0];
      this.monthly = this.app.statistics.links.find(
        (link) => link.id === this.id
      ).monthly[0];
      this.next_daily = this.app.statistics.links.find(
        (link) => link.id === this.id
      ).daily[1];
      this.next_monthly = this.app.statistics.links.find(
        (link) => link.id === this.id
      ).monthly[1];
    }
  },
  watch: {
    "app.links.all_links": {
      handler() {
        this.app.getStatistics();
      },
      deep: true,
    },
    "app.statistics": {
      handler() {
        this.path = this.app.links.all_links.find((link) => link.id === this.id).path;
        this.total = this.app.statistics.links.find((link) => link.id === this.id).total;
        this.daily = this.app.statistics.links.find(
          (link) => link.id === this.id
        ).daily[0];
        this.monthly = this.app.statistics.links.find(
          (link) => link.id === this.id
        ).monthly[0];
        this.next_daily = this.app.statistics.links.find(
          (link) => link.id === this.id
        ).daily[1];
        this.next_monthly = this.app.statistics.links.find(
          (link) => link.id === this.id
        ).monthly[1];
      },
      deep: true,
    },
  },
  components: {
    Line,
    Icon,
  },
};
</script>
