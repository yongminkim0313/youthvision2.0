<template>
  <div class="youth-text">
    <!-- <textarea v-model.lazy="editor" style="width:80%;height:40px;"></textarea> -->
    <transition-group tag="div" class="title text-md-h3 text-sm-h4 text-h6 text-deco">
      <span v-for="el in text" :key="el.id" class="item" v-text="el.text"/>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    autoplay: Boolean
  },
  data() {
    return {
      timer: null,
      index: 0,
      // 원본 메시지
      original: [
        '회복을 넘어',
        '부흥의 새역사를 쓰자!',
        '예수가 답이다',
        ],
      // 분해한 메시지
      messages: [],
      text: ''
    }
  },
  computed: {
    editor: {
      get() { return this.text.map(e => e.text).join('') },
      set(text) { this.text = this.convText(text) }
    }
  },
  watch: {
    autoplay(val) {
      clearTimeout(this.timer)
      if (val) {
        this.ticker()
      }
    }
  },
  methods: {
    // 데모 전용 타이머
    ticker() {
      this.timer = setTimeout(() => {
          this.index = this.index < this.messages.length-1 ? this.index + 1 : 0
          this.text = this.messages[this.index]
          this.ticker()
      }, 3000)
    },
    // 텍스트를 분리해서 객체로 리턴하기
    convText(text) {
      const alms = {}
      const result = text.split('').map(el => {
        alms[el] = alms[el] ? ++alms[el] : 1
        return { id: `${el}_${alms[el]}`, text: el }
      })
      return Object.freeze(result) // 감시하지 않음
    }
  },
  created() {
    this.messages = this.original.map(el => this.convText(el))
    this.text = this.messages[0]
    this.ticker()
  }
}
</script>

<style scoped>
.youth-text{
  text-align: center;
}
.title {
  font-size: 5rem;
}
.item {
  display: inline-block;
  min-width: 0.3em;
  color: transparent;
  -webkit-background-clip: text;
  background-image: linear-gradient(90deg,#9f310e,#e34912);
}
/* 트랜지션 전용 스타일 */
.v-enter-active,
.v-leave-active,
.v-move {
  transition: all 1s;
}
.v-leave-active {
  position: absolute;
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.text-deco{
    font-weight: 600;
    letter-spacing: 0em;
    font-family: SF Pro KR,SF Pro Display,SF Pro Icons,Apple Gothic,HY Gulim,MalgunGothic,HY Dotum,Lexi Gulim,Helvetica Neue,Helvetica,Arial,sans-serif;
    display: inline-block;
}
</style>