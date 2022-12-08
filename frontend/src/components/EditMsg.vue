<template>
  <div
    class="absolute w-full grid grid-flow-row grid-cols-12 place-content-center content-center"
  >
    <div class="col-span-full row-span-full bg-black opacity-25 w-full h-full"></div>
    <div class="bg-neutral-700 z-50 col-span-4 px-3 rounded-md py-2 flex flex-col">
      <div class="flex flex-row justify-between">
        <div class="flex flex-row">
          <Icon
            icon="material-symbols:edit"
            width="17"
            class="text-neutral-50 mt-1 mr-2"
          ></Icon>
          <p>Edit Tautan</p>
        </div>
        <Icon
          icon="material-symbols:close-rounded"
          class="cursor-pointer hover:text-yellow-200"
          width="30"
        />
      </div>
      <div>
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium">Title</label>
          <input
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            required
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  components: {
    Icon,
  },
};
</script>
