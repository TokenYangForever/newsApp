<template>
  <div id="newslist">
    <tel-carousel
      :height = 'calImgheight'
      :width = 'calImgwidth'
      :isMobile = "true"
      :picNum = 'calNews.length'
      v-if = 'showcal'
    >
      <tel-carousel-item v-for="(item, index) in calNews" :key="index">
        <img :src='item.picurl'>
        <h3>{{ item.intext }}</h3>
      </tel-carousel-item>
    </tel-carousel>

    <div class="scroll-news-containers" v-if = 'showcal'>
      <div class="hot-title">热点</div>
      <div class="scroll-content" 
           :style="{
             msTransform: translatescroll,
             webkitTransform: translatescroll,
             transform: translatescroll
           }">
        <div class="scroll-item" v-for="(item, index) in scrollNews">{{item.text}}</div>
      </div>
    </div>

    <div class="main-news-list">
      <div class="main-news-item" v-for="(item, index) in mainnewsList" :id='index'>
        <div class="news-item-pic" v-if='item.allPics'>
          <img src='default.jpg' :data-src='item.allPics' class='lazyloadimg'>
        </div>
        <div class="news-item-content">
          <h4 class="news-item-title">{{item.title}}</h4>
          <div class="news-item-source">
            <span class="news-author">{{item.author}}</span>
            <span class="news-comments"><i class='news-iconsmile'></i>{{item.comments}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="nomore" v-show='nomoreNews'>
      我是有底线的
    </div>
  </div>
</template>

<script>
import telcarousel from '@/components/public/carousel'
import telcarouselItem from '@/components/public/carouselItem'
export default{
  name: 'home',
  data () {
    return {
      mainnewsList: [],
      calImgheight: Math.round(0.6 * window.innerWidth),
      calImgwidth: window.innerWidth,
      calNews: [],
      scrollNews: [],
      translatescroll: '',
      scrollIndex: 0,
      showcal: true,
      shownewType: 'recommend', // 显示新闻类型
      shownewIndex: 0,
      shownewLength: 10, // 每次刷新显示新闻条数
      nomoreNews: false,
      loadimgs: 0
    }
  },
  mounted () {
    window.onscroll = this.$commonjs.throttle(this.watchscroll, 200)
    this.getCalnews();
    this.getNewsByType(this.shownewType, this.shownewIndex, this.shownewLength);
  },
  methods: {
    getCalnews () {
      // let _this = this
      this.$commonjs.ajax({
        url: this.$commonjs.apiurl + '/getcalNews.html',
        async: true,
        type: 'GET',
        success: (data) => {
          let backdata = JSON.parse(data);
          this.calNews = backdata.data;
          this.scrollNews = backdata.scrollNews;
          if (this.scrollNews.length > 0) {
            this.scrollHotnews(this.scrollNews.length)
          }
        },
        cache: true,
        error: (e) => {
          this.showcal = false;
        }
      });
    },

    scrollHotnews (len) {
      setInterval(() => {
        if (this.scrollIndex < len - 1) {
          this.scrollIndex++
        } else {
          this.scrollIndex = 0
        }
        this.translatescroll = 'translateY(-' + 24 * (this.scrollIndex) + 'px)'
      }, 2000)
    },

    getNewsByType (type, index, len) {
      let _this = this;
      this.$commonjs.ajax({
        url: this.$commonjs.apiurl + '/getNewsByType.html',
        async: true,
        type: 'GET',
        data: {
          type: type,
          index: index,
          len: len
        },
        success: (data) => {
          let backdata = JSON.parse(data);
          if (backdata.data && backdata.data.length > 0) {
            _this.mainnewsList = _this.mainnewsList.concat(backdata.data);
          } else {
            _this.nomoreNews = true
          }
        },
        cache: true,
        error: (e) => {
          // show error contents
        }
      });
    },

    watchscroll () {
      let body = document.getElementById('newslist');
      let imgs = document.getElementsByClassName('news-item-pic');
      if (window.scrollY + window.innerHeight > body.offsetHeight) {
        this.shownewIndex += this.shownewLength;
        this.getNewsByType(this.shownewType, this.shownewIndex, this.shownewLength);
      }
      for (let i = this.loadimgs; i < imgs.length; i++) {
        if (imgs[i].offsetTop < window.innerHeight + document.body.scrollTop) {
          if (imgs[i].children[0].getAttribute('src') === 'default.jpg') {
            imgs[i].children[0].src = imgs[i].children[0].getAttribute('data-src');
          }
          this.loadimgs = i + 1;
        }
      }
    }
  },

  components: {
    'tel-carousel': telcarousel,
    'tel-carousel-item': telcarouselItem
  }
}
</script>

<style scoped>
.nomore{
  font-size: .16rem;
  margin: 10px 0;
}
.main-news-item{
  padding: .1rem 0;
  margin: 0 .1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
}

.news-item-pic{
  margin-right: 10px;
  position: relative;
  height: .66rem;
  width: 1rem;
}
.news-item-pic img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.news-comments .news-iconsmile{
  margin-right: 5px;
}

.main-news-list{
  margin-top: 10px;
}

.news-item-source{
  font-size: .1rem;
  line-height: .2rem;
}

.news-item-content{
  flex:1;
}

.news-item-source{
  color: #888;
  margin-top: 5px;
}

.news-author{
  float: left;
}

.news-comments{
  float: right;
}

.news-item-content h4{
  line-height: .2rem;
  font-size: .17rem;
  word-break:break-all;
  text-align: justify;
}

#newslist{
  margin-top: 89px
}
.hot-title{
  padding: 1px 2px;
  display: inline-block;
  background-color: #e02f2f;
  color: #fff;
  text-align: center;
  font-size: .14rem;
  margin-top: 2px;
  border-radius: 2px;
  position: absolute;
  left: 30px;
}
.scroll-news-containers{
  height: 24px;
  overflow-y: hidden; 
  margin-top: 10px;
  position: relative;
}
.scroll-item{
  font-size: 18px;
}
.scroll-content{
  transition: 1s ease-out 0s;
  transform: translatey(-1px);
}
</style>
