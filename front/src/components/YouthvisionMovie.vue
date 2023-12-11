<template>
    <v-card>
        <v-card-title>2024 겨울 유스비전 홍보영상
            <v-btn v-if="isAdmin" icon><v-icon @click="videoEditDialog=true;">mdi-image-multiple</v-icon></v-btn>
        </v-card-title>
        <video controls width="100%" class="justify-center" >
            <source src="../assets/camps/youthvision_2024_winter.mp4" type="video/mp4">
            Download the
            <a href="../assets/camps/youthvision_2024_winter.mp4">MP4</a>
            video.
        </video>
    </v-card>
</template>
<script>
export default {
    components: {},
    props: { isAdmin: Boolean },
    data () {
        return {
            videoEditDialog: false,
            items:[],
            imageSn:0,
            model:1,
            mode:'',
        }
    },
    created: function(){
        this.getVideoList();
    },
    methods:{
        getVideoList: function(){
            this.$axios.get('/api/video')
            .then((result)=>{
                this.items = result.data; 
            })
        },
        setAtchmnflId: function(data){
            var _this = this;
            this.$axios.post('/api/admin/carousel',data)
            .then((result)=>{
                _this.getImageList();
            })
        },
        addCarousel: function(){
            this.imageSn = this.items.length+1;
        },
        deleteCarousel: function(data){
            var _this = this;
            _this.imageSn = 0;
            console.log(data);
            this.$axios.delete('/api/admin/carousel/'+data.imageSn)
            .then((data)=>{
                console.log(data);
                _this.getImageList();
            })
        }
    }
}
</script>