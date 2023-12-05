<template>
    <v-card ref="cross" flat style="height:100vw;" class="my-2 overflow-hidden">
        <v-img src="../assets/camps/main/cross_001.jpeg" contain :class="isScroll?'cross1 img-default':'cross1e img-default'" style=" left: 0vw; top:20vw;" ></v-img>
        <v-img src="../assets/camps/main/cross_002.jpeg" contain :class="isScroll?'cross2 img-default':'cross2e img-default'" style=" left:30vw; top:-50vw;"> </v-img>
        <v-img src="../assets/camps/main/cross_003.jpeg" contain :class="isScroll?'cross3 img-default':'cross3e img-default'" style=" left:100vw; top:-20vw;"></v-img>
        <v-img src="../assets/camps/main/cross_004.jpeg" contain :class="isScroll?'cross4 img-default':'cross4e img-default'" style=" left:70vw; top:50vw;"> </v-img>
        <v-img src="../assets/camps/main/cross_frame.jpeg" class="cross-frame"></v-img>
        <div class="squre">
                <span class="monaco">JESUS</span>
                <br/>
                <span class="jesus2">예수가답이다</span>
        </div>
    </v-card>
</template>
<style>
.img-default{position: absolute; width:65vw; height:65vw; transform:rotate(45deg); background-color:cornsilk; transform-origin: 0 0;}
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
       
    },
    mounted: function(){
        var _this = this;
        this.$intersection(this.$refs.cross.$el, function(res){
            _this.isScroll = res;
        });
    },
    methods:{
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
.cross-frame{
    position: absolute; 
    top: 52%; 
    left: 35%;
    width: 30vw; 
    height: 30vw; 
    transform:rotate(45deg) translate(-50%, -50%);
}
</style>