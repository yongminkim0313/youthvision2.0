<template>
    <v-container fluid class="pa-0">
      <!-- <div style="position:fixed; color: aqua; display: inline-block; z-index: 9999;">{{ scrollYpos }}</div> -->
      <section>
        <Carousel :isAdmin="userInfo.auth=='admin'"></Carousel>
      </section>
      <section>
        <Cross></Cross>
        <!-- <v-img src="../assets/camps/main/2023_winter_001.jpeg" contain></v-img> -->
      </section>
      <section>
        <Squre></Squre>
      </section>
      <section>
        <FlyToTheSky></FlyToTheSky>
      </section>
      <section>
        <YouthvisionMovie :isAdmin="userInfo.auth=='admin'"></YouthvisionMovie>
      </section>
    </v-container>
</template>
<script scoped>

import Carousel from '@/components/Carousel.vue';
import Cross from '@/components/Cross.vue';
import Squre from '@/components/Squre.vue';
import FlyToTheSky from '@/components/FlyToTheSky.vue';
import YouthvisionMovie from '@/components/YouthvisionMovie.vue';
  export default {
      components: {Carousel, Cross, Squre, YouthvisionMovie, FlyToTheSky},
      props:{userInfo:Object},
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
  