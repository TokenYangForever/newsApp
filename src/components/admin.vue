<template>
  <div class="admin">
    <div class="selectType">
      <div class="typeItem" @click='changeType("insert")'>新增新闻</div>
      <div class="typeItem" @click='changeType("sniffer")' v-show='false'>爬虫新增</div>
    </div>
    <div class="pageContent">
      <div v-if='type=="insert"'>
        <div class="inputItem">
          <span>标题</span>
          <input type="text" v-model = 'insertData.title' placeholder='新闻标题'>
        </div>
        <div class="inputItem">
          <span>跳转地址</span>
          <input type="text" v-model = 'insertData.url' placeholder='新闻详情跳转地址'>
        </div>
        <div class="inputItem">
          <span>来源</span>
          <input type="text" v-model = 'insertData.author' placeholder='新闻来源(非必须)'>
        </div>
        <div class="inputItem">
          <span>图片</span>
          <input type="text" v-model = 'insertData.pic' placeholder='新闻图片地址(非必须)'>
        </div>
        <div class="inputItem">
          <span>评论数</span>
          <input type="text" v-model = 'insertData.comments' placeholder='新闻评论数(非必须)'>
        </div>
        <div class="inputItem">
          <span>新闻类型</span>
          <select v-model="insertData.type">
            <option>推荐</option>
            <option>国际</option>
            <option>国内</option>
            <option>社会</option>
            <option>军事</option>
          </select>
        </div>
        <div class="insertNews btn" @click='insertNews'>新增新闻</div>
      </div>

      <div v-else-if='type=="sniffer"'>
        <div class="inputItem">
          <span>网站地址</span>
          <input type="text" v-model = 'snifferData.targetHtml' placeholder='爬取网址'>
        </div>
        <div class="inputItem">
          <span>图片</span>
          <input type="text" v-model = 'snifferData.pic' placeholder='输入图片img的类名Id等'>
        </div>
        <div class="inputItem">
          <span>标题</span>
          <input type="text" v-model = 'snifferData.title' placeholder='输入标题的类名Id等'>
        </div>
        <div class="inputItem">
          <span>跳转地址</span>
          <input type="text" v-model = 'snifferData.url' placeholder='输入跳转地址的属性'>
        </div>
        <div class="inputItem">
          <span>来源</span>
          <input type="text" v-model = 'snifferData.author' placeholder='输入类名Id等(非必须)'>
        </div>
        <div class="inputItem">
          <span>评论数</span>
          <input type="text" v-model = 'snifferData.comments' placeholder='输入类名Id等(非必须)'>
        </div>
        <div class="inputItem">
          <span>抓取条数</span>
          <input type="text" v-model = 'snifferData.num' placeholder='需要抓取的新闻数'>
        </div>
        <div class="inputItem">
          <span>新闻类型</span>
          <select v-model="snifferData.type">
            <option>推荐</option>
            <option>国际</option>
            <option>国内</option>
            <option>社会</option>
            <option>军事</option>
          </select>
        </div>
        <div class="insertNews btn" @click='startSniffer'>开始爬虫</div>
      </div>

    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'admin',
  mounted () {
  },
  data () {
    return {
      type: 'insert',
      insertData: {
        title: '',
        url: '',
        pic: '',
        author: '',
        comments: '',
        type: ''
      },
      snifferData: {
        title: '',
        url: '',
        pic: '',
        author: '',
        comments: '',
        type: '',
        targetHtml: '',
        num: ''
      }
    }
  },
  methods: {
    changeType (val) {
      this.type = val
    },
    insertNews () {
      let sendData = this.insertData
      let ajaxData = {}
      if (sendData.title.trim() === '') {
        alert('标题不能为空')
        return;
      }
      if (sendData.url.trim() === '') {
        alert('跳转地址不能为空')
        return;
      }
      if (sendData.type.trim() === '') {
        alert('需要指定新闻类型')
        return;
      }
      for (let key in sendData) {
        ajaxData[key] = sendData[key]
      }
      this.$commonjs.ajax({
        url: this.$commonjs.apiurl + '/saveNews.html',
        async: true,
        type: 'POST',
        data: ajaxData,
        success: (data) => {
          console.log(data)
        },
        cache: true,
        error: (e) => {
          // do error
        }
      });
    },
    startSniffer () {
      let sendData = this.snifferData
      let ajaxData = {}
      if (sendData.title.trim() === '') {
        alert('标题不能为空')
        return;
      }
      if (sendData.url.trim() === '') {
        alert('跳转地址不能为空')
        return;
      }
      if (sendData.type.trim() === '') {
        alert('需要指定新闻类型')
        return;
      }
      if (sendData.num.trim() === '') {
        alert('需要指定数目')
        return;
      }
      if (sendData.targetHtml.trim() === '') {
        alert('需要指定对象地址')
        return;
      }
      for (let key in sendData) {
        ajaxData[key] = sendData[key]
      }
      this.$commonjs.ajax({
        url: this.$commonjs.apiurl + '/snifferNews.html',
        async: true,
        type: 'POST',
        data: ajaxData,
        success: (data) => {
          console.log(data)
        },
        cache: true,
        error: (e) => {
          // do error
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selectType{
  background-color: #3e98f0;
  color: #c2daf8;
}
.typeItem{
  display: inline-block;
  width: 49%;
  font-size: .18rem;
  line-height: .18rem;
  padding: .1rem 0;
}
.pageContent{
  margin-top: .2rem;
}
.inputItem{
  margin-bottom: .1rem;
}
.inputItem span{
  display: inline-block;
  width: 30%;
  font-size: .18rem;
}
.btn{
  background-color: #3c6;
  color: white;
  padding: 5px;
  border-radius: 5px;
  margin: .2rem 1rem 0;
}
select{
  height: 30px;
}
</style>
