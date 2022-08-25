<template>
    <v-card :height="secHeight" elevation="0">
    <v-card-title class="justify-center text-md-h4 text-sm-h6 text-caption">YOUTHVISION 2022 SUMMER CAMP</v-card-title>
        <youthvision-title class="fc t-20" :pos="pos"></youthvision-title>
        <youthvision-text class="fc t-50"></youthvision-text>
        <v-img 
            src="../assets/camps/summercamp.gif" 
            :height="secHeight*0.4"
            contain
            class="fc t-80"
        ></v-img>
    </v-card>
</template>
<script>
import YouthvisionTitle from '../components/YouthvisionTitle.vue';
import YouthvisionText from '../components/YouthvisionText.vue';

export default {
    components: { YouthvisionTitle, YouthvisionText },
    name:'',
    props:{
        pos: Number,
        secHeight: Number
    },
    data: ()=>{
        return{
        }
    },
    watch: {
        pos: function(val){
        },
    },
    created: function(){
    },
    mounted: function(){
    },
    methods:{
    }
}
</script>
<style scoped>

.slide-fade-enter-active {
  transition: all 1.3s ease;
}
.slide-fade-leave-active {
  transition: all 1.8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to, .slide-fade-leave-active{
  transform: translate(50px, -100%);
  opacity: 0;
}

.fc{
    position: fixed;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
}

.t-40{
    top: 40%;
}

.t-50{
    top: 50%;
}

.t-20{
    top:20%;
}

.t-30{
    top:30%;
}
.t-80{
    top:60%;
}
</style>