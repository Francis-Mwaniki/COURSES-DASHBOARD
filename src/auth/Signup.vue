<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto rounded-full"
        src="../assets/catoon.png"
        alt="Workflow"
      />
      <h2
        class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300"
      >
        Sign in to your account
      </h2>
      <!--   <img
        :src=" "
        class="h-11 w-11 rounded-full"
        alt=""
      /> -->
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
      <div v-if="statusMsg" class="">
        <div
          class="success-alert bg-green-200 py-3 px-5 text-green-800 border-2 border-green-800 w-full box-border rounded-md"
        >
          {{ statusMsg }}
        </div>
      </div>
      <form class="space-y-6" @submit.prevent="register">
        <div class="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="w-full flex items-center justify-between space-x-4"></div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-400"
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
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >Confirm Password
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                v-model="confirmPassword"
                required
                autocomplete
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div :class="[reg_error ? 'hidden' : 'block']">
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :class="[reg_in_submission ? 'bg-gray-400 hover:bg-slate-400' : '']"
            :disabled="reg_in_submission"
          >
            <svg
              v-if="reg_show_alert"
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
            {{ reg_show_alert ? "Processing..." : "Register" }}
          </button>
        </div>
        <div v-show="reg_error" :class="[reg_error ? 'hidden' : 'block']">
          <button
            type="submit"
            class="animate-pulse w-full flex justify-center py-2 px-4 border border-transparent text-red-700 bg-red-100 rounded-md shadow-sm text-sm font-medium"
          >
            <svg
              v-if="reg_show_alert"
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
              >Already a Member?
            </span>
          </div>
        </div>

        <router-link
          to="/Login"
          class="w-full inline-flex justify-center text-sm font-medium text-indigo-600 cursor-pointer"
        >
          Sign In
        </router-link>
        <div class="mt-6"></div>
      </div>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300" />
          </div>

          <div class="relative flex justify-center text-sm">
            <span class="px-2 text-gray-300 bg-gray-300 dark:bg-slate-900">
              <button
                @click="handleSignInWithGoogle"
                type="button"
                class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <svg
                  class="w-4 h-4 mr-2 -ml-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </button>
            </span>
          </div>
        </div>

        <div class="mt-6"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";
export default {
  name: "register",
  setup() {
    /* disable eslint */
    // Create data / vars
    const router = useRouter();
    const email = ref();
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    // Register function
    const register = async () => {
      if (password.value !== confirmPassword.value) {
        errorMsg.value = "Passwords does not match";
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      } else {
        try {
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });
          if (error) {
            errorMsg.value = error.message;
          } else {
            statusMsg.value = "Confirm your email to login";
            setTimeout(() => {
              router.push({ name: "Login" });
            }, 4000);
          }
        } catch (error) {
          errorMsg.value = error.message;
          setTimeout(() => {
            errorMsg.value = null;
          }, 5000);
        }
      }

      /*  errorMsg.value = "Passwords does not match"; */
      /*    setTimeout(() => {
        errorMsg.value = null;
      }, 5000); */
    };
    const handleSignInWithGoogle = async () => {
      try {
        const { data, session, error } = await supabase.auth.signIn({
          provider: "google",
          options: {
            redirectTo: "/Login",
          },
        });

        setTimeout(() => {
          console.log(data);
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    const getUser = () => {
      const supabaseUser = supabase.auth.user();

      console.log(supabaseUser);
    };
    getUser();
    return {
      email,
      password,
      confirmPassword,
      errorMsg,
      statusMsg,
      register,
      handleSignInWithGoogle,
      getUser,
    };
  },
  methods: {},
};
</script>
