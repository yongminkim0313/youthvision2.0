<template>
  <div class="youth-title" :style="{'width':vWidth+'%'}">
    <span
      v-for="(t, index) in text"
      :key="index"
      class="item font-weight-bold"
      :style="{animationDelay: index*100+'ms', fontSize: vFontSize}"
      v-text="t"
      />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'YOUTHVISION',
      vFontSize: '30px',
      vWidth: 100
    }
  },
  props:{
    pos: Number
  },
  watch: {
    pos: function(val){
        this.vFontSize = (30+val)+'px';
        this.vWidth = 100 + val;
    },
    secHeight: function(val){
        this.theStyle.height = val+'px';
    }
  },
  mounted: function(){
  }
}
</script>

<style scoped>
@keyframes text-in {
  0% {
    transform: translate(0, -20px);
    opacity: 0;
  }
}
.youth-title{
  text-align: center;
}
.item {
  display: inline-block;
  min-width: 0.3em;
  /* font-size: 10rem; */
  
  text-shadow: 10px 10px 10px rgba(255, 220, 145, 0.6);

  animation: text-in .8s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
}
</style>