<template>
  <div class="tel-carousel"
    @touchstart='startScroll'
    @touchend='stopScroll'
    @click="handleClick"
    @touchmove='mousemove'
  >
   <div class = "tel-carousel-ul" :style="{height:height + 'px',width:width + 'px'}">
    <span class='indexText'><b>{{activeIndex+1}}</b>/{{picNum}}</span>
    <slot></slot>
   </div>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  props: {
    height: [String, Number],
    width: [String, Number],
    picNum: [String, Number],
    isMobile: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      items: [],
      activeIndex: 0,
      hover: false,
      addTimer: {},
      startX: 0,
      stopX: 0
    }
  },

  watch: {
    activeIndex () {
      this.items.forEach((item, index) => {
        item.setTranslate(index, this.activeIndex);
      });
    }
  },

  methods: {
    subIndex () {
      this.activeIndex = this.activeIndex === 0 ? this.items.length - 1 : this.activeIndex - 1
    },

    addIndex () {
      this.activeIndex = this.activeIndex === this.items.length - 1 ? 0 : this.activeIndex + 1
    },

    startTimer () {
      const _this = this
      this.addTimer = setTimeout(function () {
        _this.addIndex()
        _this.startTimer()
      }, 2000)
    },

    pauseTimer () {
      clearTimeout(this.addTimer)
    },

    handleClick () {
      this.pauseTimer()
    },

    startScroll () {
      this.pauseTimer()
      this.startX = this.stopX = event.targetTouches[0].clientX
    },

    stopScroll () {
      if (this.stopX - this.startX > 60) {
        this.subIndex()
      } else if (this.startX - this.stopX > 60) {
        this.addIndex()
      }
      this.startX = 0;
      // this.startTimer()
    },

    mousemove () {
      this.stopX = event.targetTouches[0].clientX
    }
  },

  mounted () {
    this.items = this.$children
    this.items.forEach((item, index) => {
      item.setTranslate(index, this.activeIndex);
    });
    this.startTimer()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tel-carousel-ul{
  position: relative;
  overflow: hidden;
}
.tel-carousel-ul .indexText{
  font-size: .16rem;
  position: absolute;
  right: 15px;
  bottom: 5px;
  z-index: 10;
  color: white;
}
.tel-carousel-ul .indexText b{
  font-weight: 600;
  font-size: .20rem;
}
.tel-carousel-arrleft, .tel-carousel-arrright{
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: .3s;
  position: absolute;
  top: 40%;
  z-index: 10;
  font-size: 26px;
  opacity: .6
}
.tel-carousel-arrleft{
  left: 15px
}
.tel-carousel-arrright{
  right: 15px
}
</style>
