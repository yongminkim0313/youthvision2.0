<template>
  <v-container class="mx-auto pa-0">
    <v-card v-scroll="handleScroll" elevation="0" class="home-card">
      <!-- <div class="frame-img"> -->
      <!-- <img src="../assets/frame.svg" class="purple-line"/> -->

      <!-- </div> -->
      <v-img
        src="../assets/camps/2023_winter_camp_short.jpeg"
        contain
        class="mx-auto"
        width="920"
      ></v-img>

      <!-- <svg id="svg-purpleline" height="100%" stroke-miterlimit="" style="" version="1.1" viewBox="0 0 3370.82 2384.24" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:vectornator="http://vectornator.io" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs/>
                <g clip-path="url(#ArtboardFrame)" id="레이어-1" vectornator:layerName="레이어 1">
                <path id="path-a" d="M1094.3 649.952L1593.73 141.907C1612.36 122.962 1642.58 122.939 1661.23 141.856L1661.23 141.856C1679.88 160.772 1679.9 191.466 1661.28 210.411L1161.85 718.455C1143.22 737.4 1113 737.424 1094.35 718.507L1094.35 718.507C1075.7 699.59 1075.68 668.897 1094.3 649.952Z" fill="#6437b2" fill-rule="nonzero" opacity="1" stroke="none"/>
                <path id="path-b" d="M2064.45 419.416L2316.76 162.748C2357.06 121.758 2422.44 121.708 2462.79 162.636L2462.79 162.636C2503.15 203.564 2503.2 269.971 2462.9 310.96L2210.59 567.628C2170.29 608.618 2104.91 608.668 2064.56 567.74L2064.56 567.74C2024.2 526.812 2024.15 460.406 2064.45 419.416Z" fill="#6437b2" fill-rule="nonzero" opacity="1" stroke="none"/>
                <path id="path-c" d="M2260.67 760.605L2512.99 503.937C2553.28 462.948 2621.69 465.972 2665.79 510.692L2665.79 510.692C2709.88 555.413 2712.97 624.894 2672.67 665.883L2420.35 922.552C2380.06 963.541 2311.65 960.517 2267.55 915.796L2267.55 915.796C2223.46 871.076 2220.38 801.595 2260.67 760.605Z" fill="#6437b2" fill-rule="nonzero" opacity="1" stroke="none"/>
                <path id="path-d" d="M1981.05 2086.06L2561.66 1489.25C2626.12 1422.99 2731.24 1422.36 2796.47 1487.82L2796.47 1487.82C2861.7 1553.29 2862.33 1660.07 2797.87 1726.32L2217.26 2323.14C2152.8 2389.39 2047.68 2390.03 1982.45 2324.56L1982.45 2324.56C1917.22 2259.09 1916.6 2152.31 1981.05 2086.06Z" fill="#6437b2" fill-rule="nonzero" opacity="1" stroke="#6437b2" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1"/>
                <path id="path-e" d="M67.605 785.254L789.094 64.6869C873.209-19.3197 1008.44-18.1613 1091.15 67.2742L1091.15 67.2742C1173.86 152.71 1172.72 290.07 1088.6 374.076L367.114 1094.64C283 1178.65 147.765 1177.49 65.0576 1092.06L65.0576 1092.06C-17.6496 1006.62-16.5091 869.261 67.605 785.254Z" fill="#6437b2" fill-rule="nonzero" opacity="1" stroke="#6437b2" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1"/>
                <path id="path-f" d="M134.871 2088.74L788.481 1428.65C834.024 1382.65 908.231 1382.29 954.226 1427.83L954.226 1427.83C1000.22 1473.37 1000.59 1547.58 955.043 1593.58L301.433 2253.66C255.89 2299.66 181.683 2300.02 135.688 2254.48L135.688 2254.48C89.6935 2208.94 89.3275 2134.73 134.871 2088.74Z" fill="#6437b2" fill-rule="nonzero" opacity="1" stroke="#6437b2" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1"/>
                <path id="path-g" d="M445.836 1308.14L760.027 990.155C796.296 953.448 855.454 953.093 892.161 989.362L892.161 989.362C928.868 1025.63 929.223 1084.79 892.955 1121.5L578.763 1439.48C542.494 1476.19 483.336 1476.55 446.629 1440.28L446.629 1440.28C409.922 1404.01 409.567 1344.85 445.836 1308.14Z" fill="#6437b2" fill-rule="nonzero" opacity="1" stroke="#6437b2" stroke-linecap="butt" stroke-linejoin="round" stroke-width="1"/>
                </g>
            </svg> -->

      <span class="lside onlyjesus-o">O</span>
      <span class="lside onlyjesus-n">N</span>
      <span class="lside onlyjesus-l">L</span>
      <span class="lside onlyjesus-y">Y</span>
      <span class="lside onlyjesus-j">J</span>
      <span class="lside onlyjesus-e">E</span>
      <span class="lside onlyjesus-s">S</span>
      <span class="lside onlyjesus-u">U</span>
      <span class="lside onlyjesus-s2">S</span>
    </v-card>
    <v-btn
      class="mx-auto btn-linear mb-10"
      block
      elevation="2"
      @click="aplyCamp"
      >등록하러 가기</v-btn
    >
  </v-container>
</template>

<script scoped>
export default {
  components: {},
  name: "Home",
  data: () => {
    return {
      clientHeight: 1000,
      purpleline: "../assets/frame.svg",
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted: function () {},
  watch: {},
  methods: {
    handleResize() {
      this.clientHeight = window.innerHeight;
      console.log("clientHeight:::", this.clientHeight);
    },
    handleScroll: function (event) {
      console.log(window.scrollY);
    },
    aplyCamp: function () {
        alert("준비중입니다.");
        return;
        this.$router.push("/aplyCamp").catch(() => {});
    },
  },
};
</script>

<style>
/* .stick-a {
    position: absolute;
    top: 31rem;
    left: 18rem;
    width: 0rem;
    height: 0rem;
    border-radius: 3.5rem 3.5rem 3.5rem 3.5rem !important;
    border-bottom: 7rem solid #ffffff;
    border-left: 19rem solid #ffffff;
    border-right: 11.7rem solid #ffffff; 
    transform: rotate(-45deg);
    opacity: 1;
    animation: stick-a 2s ease-out forwards;
} */
/* @keyframes stick-a {
    from{
        top: 36.8rem;
        left: 0rem;
    }
    to{
        top: 26.8rem;
        left: 10rem;
    }
} */
.v-main {
  background-color: #6437b2;
}
.home-card {
  background-color: #6437b2 !important;
}
.frame-img {
  position: absolute;
  top: 10rem;
  left: 8rem;
  width: 70rem;
  height: 70rem;
  background-image: url("../assets/screen.png");
  background-size: cover;
}
.picture {
  width: 50rem;
  position: absolute;
  top: 9.2rem;
  left: 13.4rem;
}
.purple-line {
  position: absolute;
  width: 90rem;
  z-index: 9999;
  top: 0;
  left: 0;
}
#svg-purpleline {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
}
.mask {
  -webkit-mask-image: url("../assets/frame.svg");
  mask-image: url("../assets/frame.svg");
  -webkit-mask-position: 0rem 0rem;
  mask-position: 5rem 5rem;
  -webkit-mask-size: 50%;
  mask-size: 50%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}
@keyframes move {
    from { -webkit-mask-position: 50rem 50rem; mask-position: 50rem 50rem; }
    to { -webkit-mask-position: 100rem 100rem; mask-position: 100rem 100rem; }
}
.lside {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16rem;
  font-weight: 620;
  transform: rotate(90deg);
  position: absolute;
  left: 3rem;
  display: inline-block;
  height: 24rem;
  width: 11rem;
  color: white;
  opacity: 0;
}
.onlyjesus-o { font-weight: 600; color: aliceblue; animation: onlyjesus-o 2s ease-out forwards; }
.onlyjesus-n { animation: onlyjesus-n 2s ease-out forwards; animation-delay: 0.2s; }
.onlyjesus-l { animation: onlyjesus-l 2s ease-out forwards; animation-delay: 0.4s; }
.onlyjesus-y { animation: onlyjesus-y 2s ease-out forwards; animation-delay: 0.6s; }
.onlyjesus-j { animation: onlyjesus-j 2s ease-out forwards; animation-delay: 0.8s; }
.onlyjesus-e { animation: onlyjesus-e 2s ease-out forwards; animation-delay: 1s; }
.onlyjesus-s { animation: onlyjesus-s 2s ease-out forwards; animation-delay: 1.2s; }
.onlyjesus-u { animation: onlyjesus-u 2s ease-out forwards; animation-delay: 1.4s; }
.onlyjesus-s2 { animation: onlyjesus-s2 2s ease-out forwards; animation-delay: 1.6s; }

@keyframes onlyjesus-o {
  from { top: -20rem; opacity: 0; }
  to { top: -5rem; opacity: 1; }
}
@keyframes onlyjesus-n {
  from { top: -9rem; opacity: 0; }
  to { top: 8rem; opacity: 1; }
}
@keyframes onlyjesus-l {
  from { top: 3rem; opacity: 0; }
  to { top: 20rem; opacity: 1; }
}
@keyframes onlyjesus-y {
  from { top: 19.5rem; opacity: 0; }
  to { top: 29.5rem; opacity: 1; }
}
@keyframes onlyjesus-j {
  from { top: 33.5rem; opacity: 0; }
  to { top: 43.5rem; opacity: 1; }
}
@keyframes onlyjesus-e {
  from { top: 43rem; opacity: 0; }
  to { top: 53rem; opacity: 1; }
}
@keyframes onlyjesus-s {
  from { top: 54.5rem; opacity: 0; }
  to { top: 64.5rem; opacity: 1; }
}
@keyframes onlyjesus-u {
  from { top: 66.5rem; opacity: 0; }
  to { top: 76.5rem; opacity: 1; }
}
@keyframes onlyjesus-s2 {
  from { top: 79.5rem; opacity: 0; }
  to { top: 89.5rem; opacity: 1; }
}
</style>
<style type="text/css">
path { display: inline-block; position: absolute; }
#path-a { animation: path-a 1.9s ease; }
#path-b { animation: path-b 1.1s ease; }
#path-c { animation: path-c 1.9s ease; }
#path-d { animation: path-d 2.3s ease; }
#path-e { animation: path-e 1.5s ease; }
#path-f { animation: path-f 1.2s ease; }
#path-g { animation: path-g 2.3s ease; }
@keyframes path-a {
  from { transform: translate(-140rem, 140rem); }
  to { transform: translate(0rem, 0rem); }
}
@keyframes path-b {
  from { transform: translate(330rem, -330rem); }
  to { transform: translate(0rem, 0rem); }
}
@keyframes path-c {
  from { transform: translate(130rem, -130rem); }
  to { transform: translate(0rem, 0rem); }
}
@keyframes path-d {
  from { transform: translate(-120rem, 120rem); }
  to { transform: translate(0rem, 0rem); }
}
@keyframes path-e {
  from { transform: translate(150rem, -150rem); }
  to { transform: translate(0rem, 0rem); }
}
@keyframes path-f {
  from { transform: translate(100rem, -100rem); }
  to { transform: translate(0rem, 0rem); }
}
@keyframes path-g {
  from { transform: translate(250rem, -250rem); }
  to { transform: translate(0rem, 0rem); }
}
@-webkit-keyframes AnimationName {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@-moz-keyframes AnimationName {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@-o-keyframes AnimationName {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes AnimationName {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.btn-linear {
  font-size: large !important;
  color: #fff !important;
  background: linear-gradient(-45deg, #dbbdfe, #e73c7e, #23a6d5, #92c7fe);
  background-size: 400% 400%;
  animation: AnimationName 15s ease infinite;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 35%;
  text-align: center;
}
</style>
