<template>
    <v-card flat style="height:100vw;" class="my-2 overflow-hidden">
        <div :class="isScroll?'cross1':'cross1e'" style="position: absolute; width:65vw; height:65vw; transform:rotate(45deg); background-color:aqua; transform-origin: 0 0; left: 0vw; top:20vw;">
        <v-img src="../assets/camps/main/2023_winter_001.jpeg"></v-img>
        </div>
        <div :class="isScroll?'cross2':'cross2e'" style="position: absolute; width:65vw; height:65vw; transform:rotate(45deg); background-color:aqua; transform-origin: 0 0; left:30vw; top:-50vw;"></div>
        <div :class="isScroll?'cross3':'cross3e'" style="position: absolute; width:65vw; height:65vw; transform:rotate(45deg); background-color:aqua; transform-origin: 0 0; left:100vw; top:-20vw;"></div>
        <div :class="isScroll?'cross4':'cross4e'" style="position: absolute; width:65vw; height:65vw; transform:rotate(45deg); background-color:aqua; transform-origin: 0 0; left:70vw; top:50vw;"></div>
        <div class="squre">
            <span class="monaco">JESUS</span>
            <br/>
            <span class="jesus2">예수가답이다</span>
        </div>
    </v-card>
</template>
<style>
.cross1{ animation: cross1 1s ease-out forwards; opacity: 0;}
.cross2{ animation: cross2 1s ease-out forwards; opacity: 0;}
.cross3{ animation: cross3 1s ease-out forwards; opacity: 0;}
.cross4{ animation: cross4 1s ease-out forwards; opacity: 0;}
.cross1e{ animation: cross1e 1s ease-out forwards; opacity: 1;}
.cross2e{ animation: cross2e 1s ease-out forwards; opacity: 1;}
.cross3e{ animation: cross3e 1s ease-out forwards; opacity: 1;}
.cross4e{ animation: cross4e 1s ease-out forwards; opacity: 1;}
@keyframes cross1{
    from{ transform: rotate(45deg) translate(-70vw, 0vw); opacity: 0;}
    to{ transform: rotate(45deg) translate(0vw, 0vw); opacity: 1;}
}
@keyframes cross2{
    from{ transform: rotate(45deg) translate(0vw, -70vw); opacity: 0;}
    to{ transform: rotate(45deg) translate(0vw, 0vw); opacity: 1; }
}
@keyframes cross3{
    from{ transform: rotate(45deg) translate(70vw, 0vw); opacity: 0;}
    to{ transform: rotate(45deg) translate(0vw, 0vw); opacity: 1; }
}
@keyframes cross4{
    from{ transform: rotate(45deg) translate(0vw, 70vw); opacity: 0;}
    to{ transform: rotate(45deg) translate(0vw, 0vw); opacity: 1; }
}
@keyframes cross1e{
    from{ transform: rotate(45deg) translate(0vw, 0vw); opacity: 1; }
    to{ transform: rotate(45deg) translate(-70vw, 0vw); opacity: 0.5;}
}
@keyframes cross2e{
    from{ transform: rotate(45deg) translate(0vw, 0vw); opacity: 1; }
    to{ transform: rotate(45deg) translate(0vw, -70vw); opacity: 0;}
}
@keyframes cross3e{
    from{ transform: rotate(45deg) translate(0vw, 0vw); opacity: 1; }
    to{ transform: rotate(45deg) translate(70vw, 0vw); opacity: 0;}
}
@keyframes cross4e{
    from{ transform: rotate(45deg) translate(0vw, 0vw); opacity: 1; }
    to{ transform: rotate(45deg) translate(0vw, 70vw); opacity: 0;}
}
</style>
<script>
export default {
  data () {
    return {
        isScroll: false
    }
  },
  created() {
        window.addEventListener("scroll", this.scrollCross);
    },
    methods:{
      scrollCross:function(){
        // console.log(window.pageYOffset, window.innerHeight, window.pageYOffset/window.innerHeight);
        var p = window.pageYOffset/window.innerHeight;
        if(p > 0.2){
          this.isScroll=true;
        }else{
          this.isScroll=false;
        }
      }
    }
}
</script>
<style>
.monaco{
    font-family: Consolas, Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace, serif;
    font-weight: 700;
    font-size: 7vw;
    display:contents;
    position: absolute;
    justify-content: center;
}
.jesus2{
    display:contents;
    font-size: 4vw;
}
.squre{
    position: absolute; 
    display: flex;
    top: 50%; 
    left: 50%;
    width: 30vw; 
    height: 30vw; 
    transform:translate(-50%, -50%);
    justify-content: center;
    margin-top: 5vw;
    line-height: 5vw;
}
</style>