<template>
    <v-card color="white">
        <div id="faq_top"></div>
    </v-card>
</template>
<script>
export default {
    components: {},
    data(){
      return {}
    },
    computed: {},
    created: function(){},
    methods:{}
}
</script>
<style scoped>
#faq_top{position: relative;padding-top:10vh;background: linear-gradient(to right, #8ed973 0%, #8c62fc 45%,  #8ed973 100%);animation: infinite}
#faq_top{background-size: 400% 400%; animation: gradient 7s ease forwards infinite!important; }
@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 00% 50%; }
}
</style>