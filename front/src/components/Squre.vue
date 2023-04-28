
<template>
    <v-card class="d-flex flex-column card-bg" :class="{'open':isScroll,'close':!isScroll, 'bd-radius' : bdRadius}">
    <v-card-title class="mt-5 white--text text-h6 align-self-start">YOUTHVISION CAMP</v-card-title>
    <v-card-subtitle class="mb-5 white--text align-self-start">  주님오실길을 예비하라</v-card-subtitle>
    <div class="d-sm-flex d-md-none align-self-center flex-column">
        <v-img class="img-card-sm rounded-lg" src="../assets/camps/card001.jpeg" cover>
            <v-card-text class="white--text text-subtitle-1">무너진 다윗의 장막을 일으키리</v-card-text>
        </v-img>
        <v-img class="img-card-sm mt-5 rounded-lg" src="../assets/camps/card002.jpeg" cover>
            <v-card-text class="white--text text-subtitle-1">다음세대가 희망이다</v-card-text>
        </v-img>
        <v-img class="img-card-sm mt-5 rounded-lg" src="../assets/camps/card003.jpeg" cover>
            <v-card-text class="white--text text-subtitle-1">주님오실길을 예비하라</v-card-text>
        </v-img>
    </div>
    <div class="d-none d-md-flex align-self-center">
        <router-link to="/aplyCamp">
            <v-img class="img-card-md ml-10 rounded-xl elevation-5" src="../assets/camps/card001.jpeg" cover>
                <v-card-text class="white--text text-subtitle-1">무너진 다윗의 장막을 일으키리</v-card-text>
            </v-img>
        </router-link>
        <router-link to="/aplyCamp">
            <v-img class="img-card-md ml-10 rounded-xl elevation-5" src="../assets/camps/card002.jpeg" cover>
                <v-card-text class="white--text text-subtitle-1">다음세대가 희망이다</v-card-text>
            </v-img>
        </router-link>
        <router-link to="/aplyCamp">
            <v-img class="img-card-md ml-10 rounded-xl elevation-5" src="../assets/camps/card003.jpeg" cover>
                <v-card-text class="white--text text-subtitle-1">주님오실길을 예비하라</v-card-text>
            </v-img>
        </router-link>
    </div>
</v-card>
</template>
<script>
export default {
  data () {
    return {
        isScroll: false,
        bdRadius: false,
    }
  },
  created() {
    var _this = this;    
    this.$eventBus.$on('scrollValue',function(p){
        console.log('squre',p);
        _this.scrollCross(p);
    })
    window.addEventListener("resize", this.resizeWidth);
    },
    methods:{
      scrollCross:function(p){
        p > 1 ? this.isScroll = true : this.isScroll = false ;
      },
      resizeWidth: function(){
        var w = window.innerWidth;
        w > 959 ? this.bdRadius =true : this.bdRadius = false;
      }
    }
}
</script>
<style scoped>
.bd-radius{
    border-radius: 64px 0px 0px 192px !important;
}
.card-bg{
    transform: translateX(100px); opacity: 0;  height: 70vh;
    background: linear-gradient(90deg, #b16afe 7.62%, rgba(187, 106, 254, 0.591) 100vw, #fff);
    width: 100vw;
}
.card-bg.open{
    animation: card-bgOpen 1.2s ease-out forwards;
}

@keyframes card-bgOpen {
    from { transform: translateX(100vw); opacity: 0;} to { transform: translateX(0vw); opacity: 1; }
}
.card-bg.close{
    animation: card-bgClose 1.2s ease-out forwards;
}

@keyframes card-bgClose {
    from { transform: translateX(0vw); opacity: 1; } to { transform: translateX(100vw);opacity: 0; }
}

.img-card-md{
    max-width: 20vw;
    max-height: 60vh;
}

.img-card-sm{
    max-height: 15vh;
    max-width: 90vw;
}

.img-card-md:hover {
  transform : translateY(-1vh);
  transition : all 300ms ease-in;
}
</style>