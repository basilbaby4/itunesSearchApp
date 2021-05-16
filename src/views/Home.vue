<template>
  <div class="home">
    <SearchWorld  />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchWorld from "@/components/SearchWorld.vue";

export default {
  name: "Home",
  components: {
    SearchWorld,
  },
};
</script>
