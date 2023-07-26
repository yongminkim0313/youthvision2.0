<template>
  <v-card>
    <div class="header">
      <div class="inner-header"> 
        <v-card-title class="mx-auto flex">FLY WITH THE HOLY SPIRIT</v-card-title>
        <v-card-text> YOUTHVISION CAMP</v-card-text>
        <div class="ballon" v-show="showBallon">{{ output }}</div>
        <v-img @click="KoGPT" :class="{'fly_3':flyClass, 'fly_far': !flyClass}" src="../assets/fly_3.svg" contain height="15vh" width="20vw">
        </v-img>
      </div>
      <div class="svg-body">
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto" >
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
        
      </div>
    </div>
    <div class="content flex">
      <p>성령으로 | 비상하라</p>
    </div>
  </v-card>
</template>
<script>
  export default {
      props:{userInfo:Object},
      name: "Home",
        data: () => {
            return { 
              message: '오늘의 성경말씀',
              output: '',
              showBallon: false,
              flyClass: true
            };
        },
        created() { },
        destroyed() { },
        mounted: function () { },
        watch: { 
          output: function(val){
            var _this = this;
            this.showBallon = true;
            setTimeout(function() {
              _this.showBallon = false; 
              _this.flyClass =true;
            }, 8000);
          }
        },
        methods: { 
          KoGPT: function(){
            this.flyClass = false;
            var _this = this;
            this.$axios.post('/api/user/KoGPT',{prompt:_this.message})
            .then(({data})=>{
              var {generations} = data;
              var {text} = generations[0];
              _this.output = text;
              console.log(text);
            })
            .catch(err=>{
              console.log(err);
            })
          },
        },
    };
</script>
<style scoped>
.fly_3{
    position: absolute;
    top: 36vh;
    left: 38vw;
    animation: cloud-a 2s ease-in-out infinite;
    animation-direction: alternate;
}
@keyframes cloud-a {
  from { transform: translate(-2rem, -2rem); }
  to { transform: translate(0rem, 0rem); }
}
.fly_far{
  position: absolute;
  top: 36vh;
  left: 38vw;
  animation: fly_far 8s ease-out ;
  animation-fill-mode: forwards;
  animation-direction:normal;
}
@keyframes fly_far {
  from { transform: translate(0, 0) scale(1);;}
  to { transform: translate(10rem, -20rem) scale(0.5);;}
}

@keyframes cloud-b {
  from { transform: translate(-10rem, -10rem); }
  to { transform: translate(0rem, 0rem); }
}
body {
  margin:0;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-weight:300;
  letter-spacing: 2px;
  font-size:48px;
}
p {
  font-family: 'Lato', sans-serif;
  letter-spacing: 1px;
  font-size:14px;
  color: #333333;
}

.header {
  position:relative;
  text-align:center;
  background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
  color:white;
}
.inner-header {
  height:65vh;
  width:100%;
  margin: 0;
  padding: 60px 0 0 0;
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position:relative;
  width: 100%;
  height:15vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% { 
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}

.ballon {
    width: 50vw;
    transform: translate(50%, 50%);
    background: #7abcff;
    color: white;
    border-radius: 5px;
    padding: 12px 12.8px;
}
</style>