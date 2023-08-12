<template>
<div class="star-back">
    <svg id="svg-star" class="svg-star" height="100%" stroke-miterlimit="10" style="fill-rule:nonzero;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;" version="1.1" viewBox="-0.395872 -0.31407 51.8449 51.7113" width="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:vectornator="http://vectornator.io" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
    <filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="10.8616" id="Filter" width="51.8449" x="-0.395872" y="20.0942">
    <feGaussianBlur in="SourceGraphic" result="Blur" stdDeviation="1"/>
    </filter>
    <filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="51.7113" id="Filter_2" width="10.8741" x="20.0918" y="-0.31407">
    <feGaussianBlur in="SourceGraphic" result="Blur" stdDeviation="1"/>
    </filter>
    </defs>
    <g id="레이어-1" vectornator:layerName="레이어 1" class="star">
    <path d="M14.1875 25.5424L25.5232 24.1063L36.8699 25.5526L25.5384 26.9445L14.1875 25.5424Z" fill="#ffffff" fill-rule="nonzero" filter="url(#Filter)" opacity="1" stroke="#ffffff" stroke-linecap="butt" stroke-linejoin="miter" stroke-opacity="0.5" stroke-width="3" vectornator:blur="2" vectornator:layerName="곡선 1"/>
    <path d="M25.5209 14.211L24.1035 25.5487L25.5184 36.878L26.9539 25.546L25.5209 14.211Z" fill="#ffffff" fill-rule="nonzero" filter="url(#Filter_2)" opacity="1" stroke="#ffffff" stroke-linecap="butt" stroke-linejoin="miter" stroke-opacity="0.5" stroke-width="3" vectornator:blur="2" vectornator:layerName="곡선 2"/>
    </g>
    </svg>
</div>
</template>
<script>
export default {
    name:'TopMenuBack',
    data(){ return { idNum: 0}},
    created:function(){
    },
    mounted:function(){
        for(var i = 0 ; i < 20; i ++){
            this.deepCopy();
        }
    },
    methods: {
        deepCopy: function(){
            // 'test' node 선택
            const starSvg = document.getElementById('svg-star');
            // 노드 복사하기 (deep copy)
            const newNode = starSvg.cloneNode(true);
            // 복사된 Node id 변경하기
            this.idNum++;
            newNode.id = 'svg-star' + this.idNum;
            var ry = this.getRandomArbitrary(-20, 20);
            newNode.style.top =ry+'px';
            var rx = this.getRandomArbitrary(-1000, 1000);
            newNode.style.left =rx+'px';
            var rt = this.getRandomArbitrary(0, 10);
            newNode.childNodes[1].style.animationDelay = rt+'s';
            // 복사한 노드 붙여넣기
            starSvg.after(newNode);
        },
        getRandomArbitrary: function(min, max) {
            return Math.random() * (max - min) + min;
        }
    }
}
</script>
<style type="text/css">
 @keyframes star-act {
	 0% { transform: scale(0.4) } 95%{transform: scale(0.3)} 100% { transform: scale(0.5); }
}
.star {
    transform: scale(0.4);
    animation: star-act 2s linear infinite;
    animation-direction: alternate;
    animation-delay: 0s;
    transform-origin: 25px 25px 0px;
}
.svg-star{
    position:absolute;
    top: 10px;
    left: 50px;
    width: 100%;
}
.star-back{
    background: linear-gradient(to right, #0000008d 0%, #000e5274 45%,  #1713406d 100%);
    background-size: 400% 400%;
    height: 56px; 
    width: 100%; 
    background-color: black; 
    position:relative; 
}
</style>
