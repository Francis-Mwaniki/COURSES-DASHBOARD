<template>
  <!-- Search component card with name of type, press Ctrl + F -->

  <div class="card-page h-auto px-3">
    <!-- end nav -->
    <div class="mt-5 w-full">
      <h1 class="text-2xl text-gray-900 font-medium dark:text-gray-200">Course</h1>
      <p class="mt-1 text-sm font-normal text-gray-400">
        Show the location of the current page in a hierarchical structure using the
        Tailwind CSS breadcrumb components
      </p>
    </div>
    <router-link to="/component/badge">
      <button
        class="flex justify-end items-center mt-1 bg-indigo-700 text-white rounded-md px-8 py-2"
      >
        Add Course
      </button>
    </router-link>

    <div class="grid grid-cols-3 mt-10 gap-5">
      <div
        class="card w-full p-5 rounded-md bg-white dark:bg-gray-800"
        v-for="course in fetchedData[0]"
        :key="course"
      >
        <h2 class="dark:text-gray-200">Coding</h2>
        <div class="wrapper-button w-full box-border mt-4">
          <div
            class="card max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="rounded-t-lg"
                src="https://flowbite.com/docs/images/blog/image-1.jpg"
                alt=""
              />
            </a>
            <div class="p-5">
              <a href="#">
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ course.course }}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {{ course.description }}
              </p>
              <a
                href="#"
                class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="ml-2 -mr-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { supabase } from "../supabase/init";
export default {
  setup() {
    const fetchedData = ref([]);
    const getCourses = async () => {
      const { data, error } = await supabase.from("Courses").select("*");
      if (error) throw Error;
      fetchedData.value.push(data);
      console.log(fetchedData);
    };
    getCourses();
    return { getCourses, fetchedData };
  },
};
</script>
