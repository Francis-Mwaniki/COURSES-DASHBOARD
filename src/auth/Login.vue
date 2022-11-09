<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div
      class="sm:mx-auto sm:w-full sm:max-w-md flex justify-center flex-col items-center"
    >
      <span v-if="userData">
        <img :src="userData.user_metadata.avatar_url" class="rounded-full" alt="" />
      </span>
      <span v-else>
        <img
          class="mx-auto h-12 w-auto rounded-full"
          src="../assets/catoon.png"
          alt="Workflow"
        />
      </span>
      <div class="">
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300"
          v-if="!userData"
        >
          Sign in to your account
        </h2>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300"
          v-else
        >
          Your signed as {{ userData.user_metadata.full_name }}
        </h2>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
      <div
        v-if="errorMsg"
        class="danger-alert bg-red-500 flex py-3 px-5 text-white w-full box-border rounded-md"
      >
        <span class="text-2xl mr-3">
          <Icon icon="ic:outline-dangerous" />
        </span>
        <span> {{ errorMsg }}</span>
      </div>
      <div
        v-if="statusMsg"
        class="m-2 p-4 rounded-md bg-light-grey shadow-lg border-l-8 border-green-500"
      >
        <p class="text-blue">{{ statusMsg }}</p>
      </div>
      <form class="space-y-6" @submit.prevent="login">
        <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="w-full flex items-center justify-between space-x-4"></div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                v-bind="field"
                name="password"
                required
                type="password"
                v-model="password"
                autocomplete="current-password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

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

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 text-gray-300 bg-gray-300 dark:bg-slate-900"
              >create a new account?
            </span>
          </div>
        </div>

        <router-link
          to="/Signup"
          class="w-full inline-flex justify-center text-sm font-medium text-indigo-600 cursor-pointer"
        >
          signup
        </router-link>
        <div class="mt-6"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
export default {
  name: "loginForm",
  setup() {
    let userData = ref([]);
    const getUser = () => {
      const supabaseUser = supabase.auth.user();
      userData.value = supabaseUser;
      console.log(userData.value);
    };

    getUser();
    return { getUser, userData };
  },

  data() {
    return {
      email: "",
      statusMsg: "",
      password: "",
      errorMsg: "",
      statusMsg: "",
      log_in_submission: false,
      log_show_alert: false,
      log_error: false,
    };
  },
  methods: {
    async login() {
      const router = useRouter();
      this.log_in_submission = true;
      this.log_show_alert = true;
      try {
        const { error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        });
        if (error) {
          this.errorMsg = error.message;
          this.log_in_submission = true;
          this.log_show_alert = true;
        } else {
          this.statusMsg = "Welcome your are authenticated!";
          setTimeout(() => {
            this.$router.push("/Dashboard");
          }, 4000);
        }
      } catch (error) {
        this.log_in_submission = true;
        this.log_show_alert = true;
        this.errorMsg = error.message;
        setTimeout(() => {
          this.errorMsg = null;
        }, 5000);
      }
    },
  },
};
</script>
