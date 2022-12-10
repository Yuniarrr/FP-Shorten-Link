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
        <div>
          <a
            :href="`http://s.it/${
              app.links.all_links.find((link) => link.id == this.$route.params.id) ===
              undefined
                ? ''
                : app.links.all_links.find((link) => link.id == this.$route.params.id)
                    .path
            }`"
            target="_blank"
            class="my-2 text-3xl font-semibold hover:text-yellow-200 cursor-pointer hover:underline"
          >
            {{
              `s.it/${
                app.links.all_links.find((link) => link.id == this.$route.params.id) ===
                undefined
                  ? ""
                  : app.links.all_links.find((link) => link.id == this.$route.params.id)
                      .path
              }`
            }}
          </a>
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
              {{
                app.statistics.links.find((link) => link.id == this.$route.params.id) ===
                undefined
                  ? ""
                  : app.statistics.links.find((link) => link.id == this.$route.params.id)
                      .total
              }}
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
              {{
                app.statistics.links.find((link) => link.id == this.$route.params.id) ===
                undefined
                  ? ""
                  : app.statistics.links.find((link) => link.id == this.$route.params.id)
                      .daily[0]
              }}
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
              {{
                app.statistics.links.find((link) => link.id == this.$route.params.id) ===
                undefined
                  ? ""
                  : app.statistics.links.find((link) => link.id == this.$route.params.id)
                      .monthly[0]
              }}
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
            :chart-data="
              app.chartDataPerLink.find((link) => link.id === this.$route.params.id) ===
              undefined
                ? chartDataDaily
                : app.chartDataPerLink.find((link) => link.id === this.$route.params.id)
                    .daily
            "
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
            :chart-data="
              app.chartDataPerLink.find((link) => link.id === this.$route.params.id) ===
              undefined
                ? chartDataMonthly
                : app.chartDataPerLink.find((link) => link.id === this.$route.params.id)
                    .monthly
            "
            class="w-full p-3 rounded-lg bg-neutral-800"
          />
        </div>
      </div>
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
      chartDataDaily: {
        labels: [
          dayjs().subtract(6, "day").format("DD/MM"),
          dayjs().subtract(5, "day").format("DD/MM"),
          dayjs().subtract(4, "day").format("DD/MM"),
          dayjs().subtract(3, "day").format("DD/MM"),
          dayjs().subtract(2, "day").format("DD/MM"),
          dayjs().subtract(1, "day").format("DD/MM"),
          dayjs().format("DD/MM"),
        ],
        datasets: [
          {
            label: "Daily Visitor",
            backgroundColor: "#2dd4bf",
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
      chartDataMonthly: {
        labels: [
          dayjs().subtract(11, "month").format("MMM"),
          dayjs().subtract(10, "month").format("MMM"),
          dayjs().subtract(9, "month").format("MMM"),
          dayjs().subtract(8, "month").format("MMM"),
          dayjs().subtract(7, "month").format("MMM"),
          dayjs().subtract(6, "month").format("MMM"),
          dayjs().subtract(5, "month").format("MMM"),
          dayjs().subtract(4, "month").format("MMM"),
          dayjs().subtract(3, "month").format("MMM"),
          dayjs().subtract(2, "month").format("MMM"),
          dayjs().subtract(1, "month").format("MMM"),
          dayjs().format("MMM"),
        ],
        datasets: [
          {
            label: "Monthly Visitor",
            backgroundColor: "#2dd4bf",
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },
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
  watch: {
    "app.links.all_links": {
      handler() {
        this.app.getStatistics();
      },
      deep: true,
    },
  },
  components: {
    Line,
    Icon,
  },
  methods: {
    sayGretting() {
      const hour = dayjs().hour();
      if (hour >= 0 && hour < 12) {
        return "Good Morning";
      } else if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    },
  },
};
</script>
