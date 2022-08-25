<template>
  <v-app>
    <router-view name="header"></router-view>
    <v-main>
      <router-view name="default"></router-view>
    </v-main>
    <router-view name="footer"></router-view>
  </v-app>
</template>
