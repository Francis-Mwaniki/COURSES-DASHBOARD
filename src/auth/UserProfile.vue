<template>
  <body
    class="dark:bg-slate-900 bg-slate-200 font-sans antialiased overflow-hidden mt-0"
    v-if="userData"
  >
    <div class="container mx-auto md:my-36 my-44">
      <div>
        <div
          class="dark:bg-slate-800 bg-slate-400 relative shadow rounded-lg w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 mx-auto"
        >
          <div class="flex justify-center flex-col mx-auto items-center">
            <span>
              <img
                :src="userData.user_metadata.avatar_url"
                alt=""
                class="rounded-full mx-auto flex justify-center items-center absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
              />
            </span>
          </div>

          <div class="mt-16">
            <h1 class="font-bold text-center text-3xl dark:text-gray-300 text-gray-700">
              {{ userData.user_metadata.full_name }}
            </h1>

            <p class="text-center text-sm dark:text-gray-300 text-gray-700 font-medium">
              {{ userData.user_metadata.id }}
            </p>
            <p>
              <span> </span>
            </p>
            <div class="my-5 px-6">
              <a
                href="#"
                class="dark:text-gray-300 text-gray-300 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-indigo-600 hover:bg-teal-800 hover:text-white"
              >
                {{ userData.role }} <span class="font-bold"></span
              ></a>
            </div>
            <div class="flex justify-between items-center my-5 px-6">
              <a
                href="#!"
                class="dark:text-gray-300 text-gray-700 hover:text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >Love</a
              >
              <a
                href="#!"
                class="dark:text-gray-300 text-gray-700 hover:text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >Joy</a
              >
              <a
                href="#!"
                class="dark:text-gray-300 text-gray-700 hover:text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >Peace</a
              >
              <a
                href="#!"
                class="dark:text-gray-300 text-gray-700 hover:text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                >Discipline</a
              >
            </div>

            <div class="w-full">
              <h3 class="font-medium dark:text-gray-300 text-gray-700 text-left px-6">
                {{ userData.user_metadata.email }}
              </h3>
              <div class="mt-5 w-full flex flex-row items-center overflow-hidden text-sm">
                <a
                  class="w-full border-t border-gray-100 dark:text-gray-300 text-gray-700 py-4 pl-6 pr-3 w-full block dark:hover:bg-indigo-600 hover:bg-indigo-400 transition duration-150"
                >
                  Updated his status
                  <span class="dark:text-gray-300 text-gray-700 text-xs">24 min ago</span>
                </a>
                <span><ToggleMode /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  <body v-else>
    <div
      class="flex justify-center items-center mx-auto text-xl rounded-md p-10 max-w-md border border-emerald-400 bg-gray-800 font-lexend font-extrabold dark:text-white text-gray-300"
    >
      Please SignIn To view this page
    </div>
  </body>
</template>

<script>
import { supabase } from "../supabase/init";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    let userData = ref([]);
    const router = useRouter();
    const getUser = () => {
      const supabaseUser = supabase.auth.user();
      userData.value = supabaseUser;
      console.log(userData.value);
    };
    async function signout() {
      const { error } = await supabase.auth.signOut();
      router.push("/Login");
    }

    getUser();
    return { getUser, userData, signout };
  },
};
</script>

<style></style>
