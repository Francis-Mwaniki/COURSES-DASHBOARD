<template>
  <div class="accordion-packed">
    <h2 class="font-semibold dark:text-gray-200 px-2">Programming</h2>
    <p class="mt-1 dark:text-gray-200 px-2">
      you can
      <span class="dark:text-gray-200">Code</span>
    </p>
    <div class="wrapper mt-5">
      <!-- copy this component  -->
      <menu-accordion class="">
        <template v-slot:icon>
          <Icon icon="akar-icons:link-out" />
        </template>
        <template v-slot:title>See Insights </template>
        <template v-slot:content>
          <p class="dark:text-white text-black text-center mx-auto">
            Coding is the skill to gain in this world of technology
          </p>
        </template>
      </menu-accordion>
      <!-- end copy -->
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import AppAccordion from "../components/AppAccordion.vue";
import MenuAccordion from "../components/MenuAccordion.vue";
export default {
  components: {
    Icon,
    AppAccordion,
    MenuAccordion,
  },
};
</script>

<style></style>
