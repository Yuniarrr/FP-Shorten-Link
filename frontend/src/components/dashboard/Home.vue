<template>
  <div class="w-full py-6 ml-24 mr-5 rounded-lg mb-9 my-7 bg-neutral-900 px-7 h-fit">
    <h1 class="text-4xl font-bold text-neutral-50">Dashboard</h1>

    <div class="my-2">
      <p class="text-lg font-light">Good Morning, Yuni</p>
      <p class="font-light text-slate-400">
        Here's what's happening with your links today.
      </p>
    </div>

    <div
      class="flex flex-row flex-wrap 2xl:justify-between xl:justify-between lg:justify-between md:justify-center sm:justify-center items-center gap-3 w-full my-5"
    >
      <div class="p-3 rounded-md bg-neutral-800 w-64">
        <div class="flex justify-between">
          <p class="text-sm font-bold text-slate-400">TOTAL LINKS</p>
          <Icon
            icon="material-symbols:keyboard-double-arrow-up-rounded"
            width="23"
            color="#31c48d"
          />
        </div>
        <div class="grid grid-cols-2">
          <div>
            <p class="my-2 text-4xl font-semibold">27</p>
            <p class="font-thin underline cursor-pointer">View All Links</p>
          </div>
          <Icon
            class="p-2.5 bg-green-900 rounded-md place-self-end"
            icon="ph:link-simple-bold"
            color="#31c48d"
            width="40"
          />
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
            <p class="my-2 text-4xl font-semibold">1,029</p>
            <p class="font-thin underline cursor-pointer">View All Links</p>
          </div>
          <Icon
            class="p-2.5 bg-green-900 rounded-md place-self-end"
            icon="mdi:user"
            color="#31c48d"
            width="40"
          />
        </div>
      </div>
      <div class="p-3 rounded-md bg-neutral-800 w-64">
        <div class="flex justify-between">
          <p class="text-sm font-bold text-slate-400">DAILY VISITED</p>
          <Icon
            icon="material-symbols:keyboard-double-arrow-down-rounded"
            width="23"
            color="#ff4a37"
          />
        </div>
        <div class="grid grid-cols-2">
          <div>
            <p class="my-2 text-4xl font-semibold">27</p>
            <p class="font-thin underline cursor-pointer">View All Links</p>
          </div>
          <Icon
            class="p-2.5 bg-green-900 rounded-md place-self-end"
            icon="bi:calendar-day"
            color="#31c48d"
            width="40"
          />
        </div>
      </div>
      <div class="p-3 rounded-md bg-neutral-800 w-64">
        <div class="flex justify-between">
          <p class="text-sm font-bold text-slate-400">MONTHLY VISITED</p>
          <Icon
            icon="material-symbols:keyboard-double-arrow-down-rounded"
            width="23"
            color="#ff4a37"
          />
        </div>
        <div class="grid grid-cols-2">
          <div>
            <p class="my-2 text-4xl font-semibold">27</p>
            <p class="font-thin underline cursor-pointer">View All Links</p>
          </div>
          <Icon
            class="p-2.5 bg-green-900 rounded-md place-self-end"
            icon="bi:calendar-month"
            color="#31c48d"
            width="40"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-5 gap-3">
      <div class="col-span-4 bg-neutral-800 rounded-md">
        <div class="border-b-2 border-b-neutral-600">
          <p class="text-lg my-2 ml-5 font-bold text-neutral-50">Graphics</p>
        </div>
        <div class="w-full">
          <Line
            :chart-data="chartData"
            class="w-full h-80 p-3 rounded-lg bg-neutral-800"
          />
        </div>
      </div>
      <div class="col-span-1 bg-neutral-800 rounded-md">
        <div class="border-b-2 border-b-neutral-600">
          <p class="text-lg my-2 ml-5 font-bold text-neutral-50">Top Visited Links</p>
        </div>
        <div class="flex flex-col mx-5 my-3 gap-y-2">
          <p class="font-light text-xl">1. http</p>
          <p class="font-light text-xl">2. http</p>
        </div>
      </div>
    </div>

    <div class="grid w-full grid-cols-2">
      <div class="grid w-full grid-cols-2 grid-rows-4 gap-6 mt-7">
        <div class="px-5 pt-3 pb-5 mr-3 rounded-lg bg-neutral-800 w-60">
          <h1 class="text-xl font-normal">Total Links</h1>
          <h1 class="text-6xl font-bold text-green-400">27</h1>
        </div>
        <div class="px-5 pt-3 pb-5 mr-3 rounded-lg bg-neutral-800 w-60">
          <h1 class="text-xl font-normal">Visitor</h1>
          <h1 class="text-6xl font-bold text-green-400">1,029</h1>
        </div>
        <div class="px-5 pt-3 pb-5 mr-3 rounded-lg bg-neutral-800 w-60">
          <h1 class="text-xl font-normal">Unique Visitor</h1>
          <h1 class="text-6xl font-bold text-green-400">762</h1>
        </div>
      </div>
      <div class="mt-7">
        <Line
          :chart-data="chartData"
          class="w-full h-full p-3 rounded-lg bg-neutral-800"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Line } from "vue-chartjs";
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
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "Mei",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#2dd4bf",
            data: [0, 20, 12],
          },
          {
            label: "Data Two",
            backgroundColor: "#fbbf24",
            data: [0, 20, 30],
          },
          {
            label: "Data Three",
            backgroundColor: "#3b82f6",
            data: [0, 10, 40],
          },
        ],
      },
    };
  },
  components: {
    Line,
    Icon,
  },
};
</script>
