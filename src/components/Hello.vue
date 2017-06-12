<template>
  <div class="hello">
    <button @click='getNews'>获取并插入</button>
    <button @click='get2'>国内</button>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'hello',
  mounted () {
    // console.log(1)
    // axios.get('http://localhost:8081/getusers.html', {}).then(function (res) {
    //   console.log(res)
    // })
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newsList: []
    }
  },
  methods: {
    getNews () {
      let ajaxdata = {
        cateid: '1o',
        cre: 'tianyi',
        mod: 'wnews',
        merge: 3,
        statics: 1,
        tm: 1489716199,
        action: 0,
        up: 0,
        down: 0,
        length: 12,
        _: 1496716010393
      }
      window.$.ajax({
        url: 'https://cre.dp.sina.cn/api/v3/get',
        data: ajaxdata,
        dataType: 'jsonp',
        success: function (d) {
          let data = d.data;
          var sendData = [];
          for (let i = 0; i < data.length; i++) {
            let dataItem = {}
            dataItem.author = data[i].media;
            if (data[i].thumbs) {
              dataItem.allPics = data[i].thumbs[0]
            } else if (data[i].mthumbs) {
              dataItem.allPics = data[i].mthumbs[0]
            } else {
              dataItem.allPics = ''
            }
            dataItem.URL = data[i].url;
            dataItem.title = data[i].mtitle;
            dataItem.summary = data[i].intro;
            dataItem.comments = data[i].comment_count || 1;
            if (data[i].category) {
              dataItem.type = Object.keys(data[i].category)[0];
            }
            if (dataItem.type === '新闻中心_国内' && dataItem.title) {
              sendData.push(dataItem);
            }
          }
          window.$.ajax({
            url: 'http://localhost:8081/saveNews.html',
            type: 'POST',
            data: {
              'sendData': sendData,
              'datalength': sendData.length,
              'tablename': 'domesticnews'// 'recommendNews',sociologyNews 'internationalNews'
            },
            success: function (d) {
              console.log(d)
            }
          })
        },
        error: function (err) {
          console.log(err)
        }
      })
    },
    get2 () {
      let ajaxdata = {
        showcid: 56261,
        col: 56261,
        level: '1,2',
        show_num: 30,
        page: 2,
        act: 'more',
        callback: 'jsonp1',
        jsoncallback: 'callbackFunction'
      }
      window.$.ajax({
        url: 'http://interface.sina.cn/wap_api/layout_col.d.json',
        data: ajaxdata,
        dataType: 'jsonp',
        success: function (d) {
          console.log(d);
          // let data = d.data;
          // var sendData = [];
          // for (let i = 0; i < data.length; i++) {
          //   let dataItem = {}
          //   dataItem.author = data[i].media;
          //   if (data[i].thumbs) {
          //     dataItem.allPics = data[i].thumbs[0]
          //   } else if (data[i].mthumbs) {
          //     dataItem.allPics = data[i].mthumbs[0]
          //   } else {
          //     dataItem.allPics = ''
          //   }
          //   dataItem.URL = data[i].url;
          //   dataItem.title = data[i].mtitle;
          //   dataItem.summary = data[i].intro;
          //   dataItem.comments = data[i].comment_count || 1;
          //   if (data[i].category) {
          //     dataItem.type = Object.keys(data[i].category)[0];
          //   }
          //   sendData.push(dataItem);
          // }
          // window.$.ajax({
          //   url: 'http://localhost:8081/saveNews.html',
          //   type: 'POST',
          //   data: {
          //     'sendData': sendData,
          //     'datalength': sendData.length,
          //     'tablename': 'militaryNews'// 'recommendNews',sociologyNews
          //   },
          //   success: function (d) {
          //     console.log(d)
          //   }
          // })
        },
        error: function (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
