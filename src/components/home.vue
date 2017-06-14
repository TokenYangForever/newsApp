<template>
  <div id="newslist">
    <div class="headnav">
      <div class="topItems">
        <span class="topnav-search" @click='toSearch'><i class='news-iconsearch'></i></span>
        <span class="topnav-menu"><i class="news-iconmenu"></i></span>
      </div>
      <div class="flexbox navul">
        <div class="flex1 navitem" v-for="item in newsType" @click='choose(item)' :class="{'select': item == select}">{{item}}</div>
      </div>
    </div>
    <tel-carousel
      :height = 'calImgheight'
      :width = 'calImgwidth'
      :isMobile = "true"
      :picNum = 'calNews.length'
      v-if = 'showcal'
    >
      <tel-carousel-item v-for="(item, index) in calNews" :key="index" :callback = 'clickNews' :url='item.url'>
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
        <div class="scroll-item" v-for="(item, index) in scrollNews" @click='clickNews(item.url)'>{{item.text}}</div>
      </div>
    </div>

    <div class="main-news-list">
      <div class="main-news-item" v-for="(item, index) in mainnewsList" :id='index' v-if='item.title' @click='clickNews(item.URL)'>
        <div class="news-item-pic" v-if='item.allPics'>
          <img src='./../assets/default.png' :data-src='item.allPics' class='lazyloadimg'>
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
import vue from 'vue'
import router from '@/router'
export default{
  name: 'home',
  data () {
    return {
      newsType: ['推荐', '国际', '国内', '社会', '军事'],
      select: '推荐',
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
    document.title = 'XX新闻'
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
            if (_this.shownewIndex === 0) {
              vue.nextTick(() => {
                _this.lazyLoadimg()
              });
            }
            _this.shownewIndex += backdata.data.length;
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
      if (window.scrollY + window.innerHeight > body.offsetHeight && this.shownewIndex !== 0) {
        this.getNewsByType(this.shownewType, this.shownewIndex, this.shownewLength);
      }
      this.lazyLoadimg();
    },

    lazyLoadimg () {
      let imgs = document.getElementsByClassName('news-item-pic');
      for (let i = this.loadimgs; i < imgs.length; i++) {
        if (imgs[i].offsetTop < window.innerHeight + document.body.scrollTop) {
          if (imgs[i].children[0].getAttribute('src') !== imgs[i].children[0].getAttribute('data-src')) {
            imgs[i].children[0].src = imgs[i].children[0].getAttribute('data-src');
          }
          this.loadimgs = i + 1;
        }
      }
    },

    toSearch () {
      router.push({
        name: 'search'
      })
    },

    clickNews (url) {
      // location.href = url;
      router.push({
        name: 'detail',
        params: { url: url }
      })
    },

    choose (i) {
      let typemap = {
        '推荐': 'recommend',
        '国际': 'international',
        '国内': 'domestic',
        '社会': 'sociology',
        '军事': 'military'
      }
      if (this.select !== i) {
        this.select = i;
        this.shownewType = typemap[this.select]
      }
    }
  },

  watch: {
    shownewType: function (val, oldval) {
      if (val !== 'recommend') {
        this.showcal = false
      } else {
        this.showcal = true
      }
      this.mainnewsList = [];
      this.shownewIndex = this.loadimgs = 0;
      this.getNewsByType(this.shownewType, this.shownewIndex, this.shownewLength);
    }
  },

  components: {
    'tel-carousel': telcarousel,
    'tel-carousel-item': telcarouselItem
  }
}
</script>

<style scoped>
.topnav-search{
  padding: 7px;
  top: 7px;
  right: .45rem;
  font-size: .2rem;
  position: absolute;
}
.topnav-menu{
  padding: 7px;
  top: 5px;
  right: 5px;
  font-size: .24rem;
  position: absolute;
}
.topItems{
  position: relative;
  border-bottom: 1px solid #5dabf0;
  height: 49px;
}
.navul{
  height: 40px;
  line-height: 40px;
}
.headnav {
  position: fixed;
  top: 0;
  width: 100%;
  color: #c2daf8;
  text-align: center;
  background-color: #3e98f0;
  z-index: 11
}
.news-comments .news-iconsmile{
  margin-right: 5px;
}

.main-news-list{
  margin-top: 10px;
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
