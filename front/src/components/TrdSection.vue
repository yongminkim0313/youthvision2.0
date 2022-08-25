<template>
    <v-card :height="secHeight" elevation="0">
        <v-card-title class="justify-center text-md-h4 text-sm-h6 text-caption">2022년 유스비전 여름 캠프(둘째날 영상)</v-card-title>
        <v-card-text class="mt-1">
            <iframe class="ac" width="100%" :height="secHeight*0.4" :src="'https://www.youtube.com/embed/eIvLqPgnNqY'" title="하이라이트" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p class="wow" :style="{ '--gradient-position': (140-pos*1.8)+'%' }">
                유스비전 2022 둘째날 영상
            </p>
        </v-card-text>
    </v-card>
</template>
<script>

export default {
    components: { },
    name:'',
    props:{
        pos: Number,
        secHeight: Number
    },
    data: ()=>{
        return{
            secWidth: 200,
        }
    },
    watch: {
        pos: function(val){
        },
    },
    created: function(){
        // this.secWidth = window.innerWidth;
    },
    mounted: function(){
    },
    methods:{
    }
}
</script>
<style scoped>
.ac{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.area {
  position: relative; /* absolute는 부모가 relative일 때 부모를 따라간다. */
  max-width: 400px;
  padding-bottom: 56.25%; /* 16:9 비율 */
}
.video {
  position: absolute;
  width: 100%; /* 부모에 맞게 꽉 채운다. */
  height: 100%;
}


.wow{
    position:absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    --r-globalnav-height: 44px;
    --r-globalnav-segmentbar-height: 0px;
    --r-globalnav-viewport-large-min-width: 1024px;
    --r-globalnav-viewport-large-max-width: 1441px;
    --r-globalnav-viewport-large-query: (min-width: 1024px);
    --r-globalnav-viewport-medium-min-width: 834px;
    --r-globalnav-viewport-medium-max-width: 1023px;
    --r-globalnav-viewport-medium-query: (max-width: 1023px);
    --r-globalnav-viewport-small-min-width: 420px;
    --r-globalnav-viewport-small-max-width: 833px;
    --r-globalnav-viewport-small-query: (max-width: 833px);
    --r-globalnav-viewport-xsmall-min-width: 320px;
    --r-globalnav-viewport-xsmall-max-width: 419px;
    --r-globalnav-viewport-xsmall-query: (max-width: 419px);
    --r-globalnav-segmentbar-text-color: rgba(255,255,255,0.92);
    --r-globalnav-segmentbar-border-color: rgba(255,255,255,0.24);
    --r-globalnav-segmentbar-background: #424245;
    -webkit-text-size-adjust: 100%;
    quotes: "“" "”";
    --enhanced-xp-css-token: "enhance-xp";
    --enhanced-media-query: "(min-height: 500px) and (max-height: 1500px)";
    --headline-gradient-start: #194BB5;
    --headline-gradient-end: #009DE4;
    --headline-gradient-shimmer: #5AC8FA;
    --r-localnav-stacked-height: 66px;
    --r-localnav-gn-height: var(--r-globalnav-height, 44px);
    --r-localnav-viewport-large-min-width: 1024px;
    --r-localnav-viewport-large-query: (min-width: 1024px);
    --r-localnav-viewport-medium-min-width: 834px;
    --r-localnav-viewport-medium-max-width: 1023px;
    --r-localnav-viewport-medium-query: (min-width: 834px);
    --r-localnav-viewport-small-min-width: 320px;
    --r-localnav-viewport-small-max-width: 833px;
    --r-localnav-viewport-small-query: (min-width: 320px);
    --router-gutter: 20px;
    --router-grid-max-viewport: 1420px;
    --router-grid-max-width: calc(var(--router-grid-max-viewport) - var(--router-gutter)*2);
    --router-wrapper-bg-color: white;
    --router-item-bg-color: #fafafa;
    --router-item-border-radius: 0px;
    --router-item-column-padding: 8%;
    --router-columns: 2;
    --r-localnav-height: 66px;
    color: #1d1d1f;
    font-synthesis: none;
    -webkit-font-smoothing: antialiased;
    direction: ltr;
    text-align: left;
    --hero-image-width: 2182px;
    --hero-image-height: 484px;
    --hero-video-width: 2566px;
    --hero-video-height: 484px;
    --clip-nav-height: 0px;
    --clip-adjustment: 0px;
    --clip-offset: calc(var(--clip-nav-height) + var(--clip-adjustment));
    --scroll-duration: 200;
    --scroll-offset: 0;
    --media-scroll-duration: 100vh;
    --hero-margin-top: 191px;
    --hero-overlay-width: 410px;
    --badges-spacing: 70px;
    --badges-subsection-spacing: 6px;
    --badges-item-spacing: 0;
    --gradient-start: calc(var(--media-scroll-duration) - 25vh);
    --gradient-duration: 35vh;
    --headline-anchor: a0t;
    --feature-alternate: design-hero-full-headline;
    --headline-offset: var(--scroll-offset);
    --hero-offset: 242px;
    font-size: 50px;
    font-weight: 600;
    line-height: 1.1461533333;
    letter-spacing: 0em;
    font-family: SF Pro KR,SF Pro Display,SF Pro Icons,Apple Gothic,HY Gulim,MalgunGothic,HY Dotum,Lexi Gulim,Helvetica Neue,Helvetica,Arial,sans-serif;
    margin: 0;
    padding: 0;
    font-style: normal;
    word-break: keep-all;
    display: inline-block;
    --headline-gradient-direction: 90deg;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-bottom: .1em;
    margin-bottom: -0.1em;
    --gradient-highlight-spread: 20%;
    --gradient-shimmer-angle: 100deg;
    --gradient-position-start: 140;
    --gradient-position-end: -40;
    background-image: linear-gradient(var(--gradient-shimmer-angle),transparent calc(50% - var(--gradient-highlight-spread)),var(--headline-gradient-shimmer),transparent calc(50% + var(--gradient-highlight-spread))),linear-gradient(var(--headline-gradient-direction),var(--headline-gradient-start),var(--headline-gradient-end));
    background-repeat: no-repeat;
    background-size: 200% 100%,100% 100%;
    background-position: var(--gradient-position) 50%,50% 50%;
    --gradient-position: 140%;
}
</style>