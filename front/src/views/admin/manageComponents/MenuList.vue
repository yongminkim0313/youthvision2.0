<template>
    <v-card flat>

      <!-- <v-card-title class="indigo white--text text-h5"> 홈 </v-card-title> -->
      <v-row class="" justify="space-between" >
        <v-col cols="5">
          <v-treeview :active.sync="active" :items="items" 
          item-key="menuId" 
          item-text="title"
          item-children="subMenu"
          :open.sync="open" activatable color="warning" open-on-click 
          transition 
          >
            <template v-slot:prepend="{ item }">
              <v-icon> {{ item.menuIcon }} </v-icon>
            </template>
            
          </v-treeview>
        </v-col>
          <v-divider vertical></v-divider>
        <v-col cols="7" class="d-flex text-center" >
          <v-scroll-y-transition mode="out-in">
            <div v-if="!selected" class="text-h6 grey--text text--lighten-1 font-weight-light" style="align-self: center;" > 메뉴를 선택하세요 </div>
            <v-card v-else :key="selected.menuId" class="mx-auto" flat width="100%">
              <v-card-text>
                <v-text-field v-model="selected.title" label="메뉴명" required></v-text-field>
                <v-text-field v-model="selected.menuPath" label="경로" required></v-text-field>
                <v-icon>{{selected.menuIcon}}</v-icon>
                <v-text-field v-model="selected.menuIcon" label="아이콘" required></v-text-field>
                <a href="https://pictogrammers.com/library/mdi/">아이콘 링크</a>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="save">저장</v-btn>
                <v-btn @click="del">삭제</v-btn>
              </v-card-actions>
            </v-card>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-card>
  </template>
  <script>

  export default {
    data: () => ({
      active: [],
      avatar: null,
      open: [],
      items: [],
    }),

    computed: {
      selected () {
        if (!this.active.length) return undefined
        const id = this.active[0]
        
        for(var menu of this.items){
          var sub = menu.subMenu;
          var res = sub.find(item => item.menuId === id);
          if(res)return res;
        }
        return temp;
      },
    },
    created(){
      this.loadData();
    },
    methods: {
      async fetchUsers (item) {
        console.log(item);
      },
      loadData: function(){
        return fetch('api/common/menu')
          .then(res => res.json())
          .then(json => (this.items = json))
          .catch(err => console.warn(err))
      },
      save: function(){
        this.$axios.put('api/common/menu',this.selected)
        .then((data)=>{
          console.log(data);
        })
      },
      del: function(){
        console.log(this.selected)
      }
    },
  }
</script>