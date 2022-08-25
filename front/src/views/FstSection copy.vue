<template>
    <div :style="theStyle">
        <youthvision-title></youthvision-title>
        <youthvision-text></youthvision-text>
    </div>
</template>
<script>
import YouthvisionTitle from '../components/YouthvisionTitle.vue';
import YouthvisionText from '../components/YouthvisionText.vue';

export default {
    components: { YouthvisionTitle, YouthvisionText },
    name:'',
    data: ()=>{
        return{
            theStyle:{
                background: 'linear-gradient(130deg, rgba(2,0,36,1) 0%, rgba(121,9,118,1) 100%, rgba(255,224,0,1) 100%)'
            }
        }
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

</style>