<template>
<v-row >
  
  <v-col cols="6" v-for="(item, colNum) in lists" :key="item.id">
    <v-row  @dragenter.prevent @dragover.prevent >
      <v-col ref="dr" cols="12"  v-for="(numItem, rowNum) in item.numberList" :key="rowNum"
      @drop.prevent="onDrop($event, colNum, rowNum)" 
      @dragstart="startDrag($event, numItem)" draggable="true" 
      @dragenter="enterDrag($event, numItem)"
      @dragover="overDrag($event, numItem)"
      @dragleave="leaveDrag($event, numItem)"
      @dragend="endDrag($event,numItem)"
      >
      {{ numItem.title }}
      <v-img :src="'data:image/jpeg;base64,'+convert(numItem.thumbImg)" width="100">
        <v-btn @click="youtubeImgDown(numItem,colNum);">
          down
        </v-btn>
      </v-img>
        <!-- <iframe v-if="numItem.src" width="300" :src="'https://www.youtube.com/embed/'+numItem.src+'?controls=0&modestbranding=1'" title="YouTube video player" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen></iframe> -->
      </v-col>
    </v-row>
  </v-col>
</v-row >
</template>
<script>
export default {
  name: "MoveTest",
  data() {
    return {
      dragged:null,
      lists: [
        {
          id: 1,
          numberList: [  ]
        },
        {
          id: 2,
          numberList: [  ]
        }
      ]
    };
  },
  created: function(){
    this.get('캠프실황',0);
    this.get('언론보도',1);
  },
  methods: {
    get(mtype, mid){
      this.$axios.get('/api/youtube',{params:{type:mtype}})
        .then((result)=>{
            this.lists[mid].numberList = result.data;
        }).catch((err)=>{console.log(err);})
        .then(()=>{
            this.loading = false;
        })
    },
    startDrag(event, item) {
      
      this.dragged = event.target;
      event.target.classList.add("dragging");

      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.effectAllowed = "move"
      event.dataTransfer.setData("selectedItem", item.seq)
    },
    enterDrag(event, item) {
      //console.log(event);
      event.target.classList.add("dragover");
    },
    overDrag(event, item) {
      //console.log(item);
    },
    leaveDrag(event, item) {
      //console.log(item);
      event.target.classList.remove("dragover");
    },
    endDrag(event,item){
      var list = this.$refs.dr;
      for(var l of list){
        l.classList.remove("dragover");
        l.classList.remove("dragging");
      }

      event.target.classList.remove("dragover");
    },
    onDrop(event, colNum, rowNum) {
      
      const selectedItem = Number(event.dataTransfer.getData("selectedItem"))

      // 리스트에서 선택된 아이템과 같은 content 값을 가진 요소를 찾아 index를 반환한다.
      let targetIdx
      let targetItem
      this.lists.forEach((obj, index) => {
        obj.numberList.forEach((ob) => {
          if(ob.seq === selectedItem) {
            targetIdx = index
            targetItem = ob
          }
        })
      })
      //console.log( rowNum, this.lists[targetIdx].numberList.indexOf(targetItem))
      // drop이 된 <div> index(=colNum)를 받아 리스트에 추가한다. 
      // 기존 리스트에서는 요소를 삭제한다. (splice() 사용)
      //this.lists[colNum].numberList.push(targetItem)
      this.lists[targetIdx].numberList.splice(this.lists[targetIdx].numberList.indexOf(targetItem), 1)
      this.lists[colNum].numberList.splice(rowNum,0,targetItem);
    },
    colDrop(event, rowNum) {
      const selectedItem = Number(event.dataTransfer.getData("selectedItem"))
      console.log(rowNum, selectedItem)
    },
    youtubeImgDown(item, colNum){
      var _this = this;
      this.$axios.post('/api/common/youtube',item)
        .then((result)=>{
          console.log(result);
          var sub = _this.lists[colNum].numberList
          var res = sub.find(it => it.seq === item.seq);
          console.log(res);
          res.thumbImg['data'] = result.data;
        }).catch((err)=>{console.log(err);})
        .then(()=>{
        })
    },
    convert(a){
      if(!a || !a.data) return " ";
      let byteArray = new Uint8Array(a.data); 
      let decoder = new TextDecoder("utf-8");
      let str = decoder.decode(byteArray); 
      return str;
    }
  },
};
</script>
<style lang="scss">

.dragging {
  opacity: 0.5;
}
.dragover {
  background-color: purple;
}
</style>