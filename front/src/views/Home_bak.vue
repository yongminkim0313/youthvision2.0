<template>
    <v-container class="mx-auto pa-0">
        <v-card v-scroll="handleScroll" elevation="0">
            <section ref="body" :key="1">
                <fst-section :pos="vInt[0]" :secHeight="clientHeight"></fst-section>
            </section>
            <section :key="2">
                <snd-section :pos="vInt[1]" :secHeight="clientHeight"></snd-section>
            </section>
            <section :key="3">
                <trd-section :pos="vInt[2]" :secHeight="clientHeight"></trd-section>
            </section>
        </v-card>
    </v-container>
</template>

<script>
import FstSection from '../components/FstSection.vue';
import SndSection from '../components/SndSection.vue';
import TrdSection from '../components/TrdSection.vue';

export default {
  components: { FstSection,SndSection,TrdSection},
    name:'Home',
    data: ()=>{
        return {
            page:1,
            lastPage:3,
            movePos:1,
            clientHeight: 1000,
            vInt:[0,0,0],
            setTimeId:null
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    mounted:function(){
        this.movePage(1);
    },
    watch: {
        page:function(newPage){
            console.log('page:::::', newPage);
            var _this = this;
            if(this.setTimeId){
                clearTimeout(_this.setTimeId);
            }
            _this.setTimeId = setTimeout(function(){
                                _this.movePage(newPage);
                            },500);
        },
    },
    methods:{
        handleResize() {
            this.clientHeight = window.innerHeight;
            console.log('clientHeight:::',this.clientHeight);
        },
        beforeEnter(el) {
            el.style.transitionDelay = 1000 + 'ms'
        },
        afterEnter(el) {
            el.style.transitionDelay = ''
        },
        movePage: function(page){
            var $html = $('html');
            var posTop = (page-1) * this.clientHeight;
            $html.animate({scrollTop : posTop});
            
            this.handleResize();
        },
        handleScroll: function (event) {
            var _this = this;
            var topPer = Math.round(window.scrollY/this.clientHeight * 100);
            
            if( topPer % 100 > 60 || topPer % 100 < 40 ){
                _this.page = Math.round(topPer/100)+1;
            }
            var p = Math.floor(topPer/100);
            this.vInt.splice( p ,1, topPer % 100 + 1);
            // console.log(this.vInt);
        }
    }
}
</script>

<style>
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
</style>