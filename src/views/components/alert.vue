<template>
  <!-- Search component Alert with name of type,  press Ctrl + F -->

  <div>alert</div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
  mounted() {
    var alert_dis = document.querySelectorAll(".alert-dismiss");
    alert_dis.forEach((x) =>
      x.addEventListener("click", function () {
        x.parentElement.classList.add("hidden");
      })
    );
  },
};
</script>
