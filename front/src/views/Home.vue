<template>
    <v-container fluid class="pa-0">
      <section>
        <Carousel></Carousel>
      </section>
      <section>
        <Cross></Cross>
        <!-- <v-img src="../assets/camps/main/2023_winter_001.jpeg" contain></v-img> -->
      </section>
      <section>
        <Squre></Squre>
      </section>
    </v-container>
</template>
<script scoped>

import Carousel from '@/components/Carousel.vue';
import Cross from '@/components/Cross.vue';
import Squre from '@/components/Squre.vue';
  export default {
      components: {Carousel, Cross, Squre},
      name: "Home",
      data: () => {
          return { };
        },
        created() { },
        destroyed() { },
        mounted: function () { },
        watch: {},
        methods: { },
    };
</script>

<style>
</style>
  