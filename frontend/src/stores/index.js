import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";

export const useStore = defineStore({
  id: "Store",
  state: () => ({
    use_custom_link: false
  }),
  actions: {
    UseCustomLink() {
      this.use_custom_link = !this.use_custom_link;
    },
    DeleteLink() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
    EditLink() {
      Swal.fire({
        title: "Edit Link",
        input: "text",
        inputValue: "https://example.com",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Changed Successfully", "Your file has been changed.", "success");
        }
      });
    },
    async NewLink() {
      const { value: formValues } = await Swal.fire({
        title: 'Add New Short Link',
        html: `
        <div>
          <div>
            <label
              for="swal-input1"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Link</label
            >
            <div class="flex mb-2">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                id="swal-input1"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://www.google.com/"
              />
            </div>
            <div class="flex justify-end">
              Use&nbsp;
              <p
                class="hover:text-blue-500 hover:underline cursor-pointer"
                @click="${this.UseCustomLink()}"
              >
                Custom Link
              </p>
            </div>
          </div>
          <div :class="{ hidden: ${this.use_custom_link == false} }">
            <label
              for="swal-input2"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Custom Link</label
            >
            <div class="flex">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                id="swal-input2"
                class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://www.google.com/"
              />
            </div>
          </div>
        </div>
        `,
        inputAttributes: {
          required: true
        },
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })

      if (formValues) {
        Swal.fire(JSON.stringify(formValues))
      }
    },
  },
  getters: {},
});

export const useSettings = defineStore({
  id: "Settings",
  state: () => ({
    user_settings: false
  }),
  actions: {
    toggleUserSettings() {
      this.user_settings = !this.user_settings;
      console.log(this.user_settings);
    }
  },
  getters: {},
});
