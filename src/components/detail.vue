<template>
  <div id="detail">
  <p></p>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'detail',
  mounted () {
    window.onscroll = function () {
    }
    this.$commonjs.ajax({
      url: this.$commonjs.apiurl + '/getDetail.html',
      async: true,
      type: 'GET',
      data: {
        url: this.$route.params.url
      },
      success: (data) => {
        data = JSON.parse(data)
        if (data.code === 200) {
          if (data.title) {
            document.title = data.title
          }
          document.getElementById('detail').innerHTML = data.htmlContent
        }
      },
      cache: true,
      error: (e) => {
        // this.showcal = false;
      }
    });
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
