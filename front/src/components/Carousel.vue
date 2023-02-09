<template>
    <v-card elevation="0" class="mx-auto" >
      <v-carousel
        :continuous="true"
        :cycle="true"
        :show-arrows="true"
        hide-delimiter-background
        reverse-transition="fade-transition"
        transition="fade-transition"
        style="width:100%;"
        height="90vh"
      >
        <v-carousel-item>
            <v-img style="height:100%" src="../assets/camps/main/2023_winter_001.jpeg"></v-img>
        </v-carousel-item>
        <v-carousel-item>
            <v-img style="height:100%" src="../assets/camps/main/2023_winter_002.jpeg"></v-img>
        </v-carousel-item>
        <v-carousel-item>
            <v-img style="height:100%" src="../assets/camps/main/2023_winter_003.jpeg"></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>