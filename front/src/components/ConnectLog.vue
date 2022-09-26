<template>
    <v-card>
        ConnectLog page
        <!-- <v-data-table
            :headers="headers"
            :items="connectLog"
            :items-per-page="5"
            class="elevation-1"
        ></v-data-table> -->

        <v-container>
            <v-row v-for="(val , index) in connectLog" :key="index">
                <v-col>{{val.conectDt}}</v-col>
                <v-col>{{val.osNm}}</v-col>
                <v-col>{{val.browserNm}}</v-col>
                <v-col>{{val.conectUrl}}</v-col>
                <v-col>{{val.ipAdres}}</v-col>
                <v-col>{{val.prmanentCookie}}</v-col>
            </v-row>
        </v-container>
    </v-card>    
</template>
<script>
export default {
    name:'ConnectLog',
    data: ()=>{
        return {
        headers: [
          {
            text: 'browserNm',
            align: 'start',
            sortable: false,
            value: 'browserNm',
          },
          { text: 'conectDt', value: 'conectDt' },
          { text: 'conectUrl', value: 'conectUrl' },
          { text: 'ipAdres', value: 'ipAdres' },
          { text: 'menuNm', value: 'menuNm' },
        //   { text: 'osKnd', value: 'osKnd' },
          { text: 'osNm', value: 'osNm' },
        //   { text: 'prmanentCookie', value: 'prmanentCookie' },
          { text: 'refUrl', value: 'refUrl' },
        //   { text: 'tmprCookie', value: 'tmprCookie' },
        ],
        connectLog: [],
      }
    },
    watch: {
    },
    created: function(){
        var _this = this;
        this.$socket.connect();
        
    },
    mounted: function(){
        this.getConnectLog();
        this.addConnectLog();
    },
    methods:{
        getConnectLog: function(){
            var _this = this;
            this.$socket.on('getConnectLog', (data)=>{
                for(var key in data){
                    console.log('getConnectLog',data[key]);
                    _this.connectLog.push(data[key]);
                }
            });
        }
        ,addConnectLog: function(){
            var _this = this;
            this.$socket.on('addConnectLog', (data)=>{
                console.log('addConnectLog',data);
                _this.connectLog.push(data);
            });
        }
    }
}
</script>
