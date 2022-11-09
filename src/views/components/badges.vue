<template>
  <!-- Search component Badge with name of type, press Ctrl + F -->

  <div class="dark:bg-slate-900">
    <section
      id="login"
      class="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto"
    >
      <div class="p-6 bg-sky-100 dark:bg-slate-700 rounded">
        <div class="flex items-center justify-center font-black m-3 mb-12 flex-row">
          <h1 class="tracking-wide text-3xl dark:text-gray-300 text-gray-900">
            Add Course
          </h1>
        </div>
        <form class="flex flex-col justify-center" @submit.prevent="submit">
          <div class="flex justify-between items-center mb-3">
            <div class="inline-flex items-center self-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 mr-3 bg-gradient-to-r from-pink-600 to-red-600 shadow-lg rounded p-1.5 dark:bg-slate-800 text-gray-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 7H7v6h6V7z" />
                <path
                  fill-rule="evenodd"
                  d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-bold text-gray-900 dark:text-gray-200"></span>
            </div>
          </div>
          <label class="text-sm font-medium dark:text-white text-gray-600"
            >Song Title</label
          >
          <input
            class="mb-3 px-2 py-2 mt-1 block w-full border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
            type="text"
            name="title"
            placeholder="title..."
            v-model="title"
          />
          <label class="text-sm font-medium dark:text-white text-gray-600"
            >Course Content</label
          >
          <textarea
            cols="30"
            rows="10"
            class="mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:invalid:border-red-500 focus:invalid:ring-red-500"
            name="messages"
            placeholder="content..."
            v-model="description"
          ></textarea>
          <div :class="[log_error ? 'hidden' : 'block']">
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :class="[log_in_submission ? 'bg-gray-400 hover:bg-slate-400' : '']"
              :disabled="log_in_submission"
            >
              <svg
                v-if="log_show_alert"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ log_show_alert ? "Processing..." : "login" }}
            </button>
          </div>
          <div v-show="log_error" :class="[log_error ? 'hidden' : 'block']">
            <button
              type="submit"
              class="animate-pulse w-full flex justify-center py-2 px-4 border border-transparent text-red-700 bg-red-100 rounded-md shadow-sm text-sm font-medium"
            >
              <svg
                v-if="log_show_alert"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-red-700 bg-transparent"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Unexpected Error occured, please refresh
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../../supabase/init";
import { useRoute } from "vue-router";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const log_in_submission = ref(false);
    const log_show_alert = ref(false);
    const log_error = ref(false);

    const submit = async () => {
      log_in_submission.value = true;
      log_show_alert.value = true;
      const { data, error } = await supabase.from("Courses").insert({
        course: title.value,
        description: description.value,
      });
      if (error) {
        log_in_submission.value = false;
        log_show_alert = false;
        throw Error;
      }
    };

    return {
      title,
      description,
      submit,
      log_in_submission,
      log_error,
      log_show_alert,
    };
  },
};
</script>
