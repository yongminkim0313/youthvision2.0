<template>
    <v-container fluid class="pa-0">
      <!-- <div style="position:fixed; color: aqua; display: inline-block; z-index: 9999;">{{ scrollYpos }}</div> -->
      <section>
        <Carousel></Carousel>
      </section>
      <section>
        <BoardList></BoardList>
      </section>
      <section>
        <Cross></Cross>
      </section>
      <section>
        <YouthvisionMovie></YouthvisionMovie>
      </section>
    </v-container>
</template>
<script scoped>
import Carousel from '@/components/Carousel.vue';
import Cross from '@/components/Cross.vue';
import Squre from '@/components/Squre.vue';
import FlyToTheSky from '@/components/FlyToTheSky.vue';
import YouthvisionMovie from '@/components/YouthvisionMovie.vue';
import BoardList from '@/components/BoardList.vue';
  export default {
      components: {Carousel, Cross, Squre, YouthvisionMovie, FlyToTheSky, BoardList},
      props:{userInfo:Object},
      name: "Home",
        data: () => {
            return { };
        },
        methods:{
        },
        created() { 
        },
        destroyed() { },
        mounted: function () { },
        watch: {},
    };
</script>

<style>
</style>
  