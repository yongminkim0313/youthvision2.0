<template>
    <div id="app">
        
      <v-app id="inspire">
        <v-card>
          <v-card-title>
            <v-container fluid>
                <v-row>
                    <v-col cols="6">
                        <v-select v-model="select" :hint="`${select.dt}, ${select.dt}`" :items="dtList" item-text="dt" item-value="dt"
                            label="날짜" persistent-hint return-object single-line hide-details @change="getDayLog" ></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            
          </v-card-title>
          <v-data-table :headers="headers" :items="connectLogList" :search="search" item-key="name"
          hide-default-footer
            :disable-items-per-page="true"
            :footer-props="{ 'items-per-page-options': [50, -1] }"
            :custom-sort="customSort"
            >
            <template v-slot:body="{items, headers}">
              <tbody name="list" is="transition-group" v-if="items.length > 0">
                <tr v-for="(val , index) in items" :key="index" class="item-row">
                    <td>{{index}}</td>  
                    <td>{{val.conectDt}}</td>
                    <td>{{val.osNm}}</td>
                    <td>{{val.browserNm}}</td>
                    <td>{{val.conectUrl}}</td>
                    <td>{{val.ipAdres}}</td>
                    <td>{{val.prmanentCookie}}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td :colspan="headers.length" style="text-align: center">No Results Here!</td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-app>
    </div>
    </template>
    <script>
    export default {
        name:'ConnectLog',
        data () {
        return {
          search: '',
          select: { dt: ''},
          dtList: [ ],
          headers: [
            { text: 'No', value: 'No' },
            { text: 'conectDt', value: 'conectDt' },
            { text: 'osNm', value: 'osNm' },
            { text: 'browserNm', value: 'browserNm', },
            { text: 'refUrl', value: 'refUrl' },
            { text: 'ipAdres', value: 'ipAdres' },
            { text: 'prmanentCookie', value: 'prmanentCookie' },
          ],
          connectLogList: [],
        }
      },
      created: function(){
        this.$socket.connect();
        this.getConnectLogKey();
      },
      mounted: function(){
        this.addConnectLog();
      },
      methods:{
        getDayLog : function(item){
          this.getOtherDayLog(item.dt)
        },
        getConnectLogKey : function(){
          var _this = this;  
            for(var i = -10; i <= 0 ; i++){
              var d = this.$common.getAddDate(i);
              _this.dtList.push({dt:d});
            };
        },
        getConnectLog : function(){
            var _this = this;
            this.$socket.on('getConnectLog', (data)=>{
                for(var key in data){
                    console.log('getConnectLog',data[key]);
                    _this.connectLogList.push(data[key]);
                }
            });
        }
        ,addConnectLog: function(){
            var _this = this;
            this.$socket.on('addConnectLog', (data)=>{
                _this.connectLogList.push(data);
            });
        }
        ,getOtherDayLog: function(dt){
            var _this = this;
            _this.connectLogList = [];
            this.$axios.get('/api/conectLog?dt='+dt)
            .then((res)=>{
                var data = res.data
                for(var key in data){
                    _this.connectLogList.push(data[key]);
                }
            })
            .catch((err)=>{
                console.log(err.response.data);
            })
        },
        customSort: function(items, index, isDesc) {
          items.sort((b,a) => {
              if (index[0]=='conectDt') {
                if (!isDesc[0]) {
                    return new Date(b[index]) - new Date(a[index]);
                } else {
                    return new Date(a[index]) - new Date(b[index]);
                }
              }
              else {
                if(typeof a[index] !== 'undefined'){
                  if (!isDesc[0]) {
                    return a[index].toLowerCase().localeCompare(b[index].toLowerCase());
                  }
                  else {
                      return b[index].toLowerCase().localeCompare(a[index].toLowerCase());
                  }
                }
              }
          });
          return items;
        }
    }
    }
    </script>
    <style scoped>
    #app {
      padding: 20px;
    }
    .list-enter-active,
    .list-leave-active {
      transition: transform 0.8s, opacity 1.8s, color 10s ease-out;
    }
    .list-enter,
    .list-leave-to {
      opacity: 0;
      transform: translateY(100%);
      color: red;
    }
    .list-move {
      transition: transform 0.5s, color 10s ease-out;
    }
    .item-row {
      display: table-row;
    }
    
    * {
    font-size: 9px;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
        height: 2px;
    }

    </style>