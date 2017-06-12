<template>
  <div 
  @click = 'clickFunc'
  class="tel-carousel-item"
  :style="{
    msTransform: translate,
    webkitTransform: translate,
    transform: translate
  }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'carouselItem',
  props: {
    height: String,
    width: String,
    callback: Function,
    url: String
  },
  data () {
    return {
      translate: '',
      active: false
    }
  },

  mounted () {
    // console.log(this.callback)
  },

  methods: {
    setTranslate (index, actIndex) {
      const parentWidth = this.$parent.width
      this.translate = 'translateX(' + parentWidth * (index - actIndex) + 'px)'
    },
    clickFunc () {
      this.callback(this.url)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tel-carousel-item{
  width: 100%;
  height: 100%;
  position: absolute;
  transition: .4s ease-in-out;
}
.tel-carousel-item h3{
  font-size: .18rem;
  position: absolute;
  left: 15px;
  bottom: 5px;
  color: white;
}
.tel-carousel-item img{
  width: 100%;
  height: 100%;
}
</style>
