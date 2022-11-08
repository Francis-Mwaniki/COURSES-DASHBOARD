<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="../assets/catoon.png" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <vee-form
          class="space-y-6"
          action="#"
          method="POST"
          :validation-schema="schema"
          @submit="register"
        >
          <div class="w-full flex items-center justify-between space-x-4">
            <div class="w-1/2">
              <label for="email" class="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div class="mt-1">
                <vee-field
                  id="firstName"
                  name="firstName"
                  type="text"
                  autocomplete="firstName"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage class="text-red-600" name="firstName" />
              </div>
            </div>

            <div class="w-1/2">
              <label for="email" class="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div class="mt-1">
                <vee-field
                  id="lastName"
                  name="lastName"
                  type="text"
                  autocomplete="lastName"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage class="text-red-600" name="lastName" />
              </div>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <vee-field
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage class="text-red-600" name="email" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <vee-field name="password" :bails="false" v-slot="{ field, errors }">
                <input
                  v-bind="field"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div class="text-red-600" v-for="error in errors" :key="error">
                  {{ error }}
                </div>
              </vee-field>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"
              >Confirm Password
            </label>
            <div class="mt-1">
              <vee-field
                id="password"
                name="confirmation"
                type="password"
                autocomplete="current-password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage class="text-red-600" name="confirmation" />
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
        </vee-form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Already a Member? </span>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",

  data() {
    return {
      schema: {
        firstName: "required|min:3|max:100|alpha_spaces",
        lastName: "required|min:3|max:100|alpha_spaces",
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:17|max_value:101",
        password: "required|min:8|max:32",
        confirmation: "required|confirmed:@password",
      },

      reg_in_submission: false,
      reg_show_alert: false,
      reg_error: false,
    };
  },
  methods: {
    register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      console.log(values);
    },
  },
};
</script>
