<!-- 组件说明：路由中的page是动态路由，props中的showItem表示要显示多少页，allPage表示一共多少页。
路由跳转后，你可以在父组件中的created钩子中根据路由请求数据(来源：https://www.cnblogs.com/yesyes/p/7809182.html) -->

<template>
  <ul class="pagination">
    <li @click="goTo(1)"><a>首页</a></li>
    <li v-show="current != 1" @click="goTo(current-1)"><a>上一页</a></li>
    <li v-for="index in pages" @click="goTo(index)" :class="{'active':current == index}" :key="index">
      <a>{{index}}</a>
    </li>
    <li v-show="allPage != current && allPage != 0 " @click="goTo(current+1)"><a>下一页</a></li>
    <li v-on:click="goTo(allPage)"><a>尾页</a></li>
  </ul>
</template>
<script>
  export default {
    props: ['showItem','allPage'],
    computed: {
      pages() {
        var pag = [];
        if (this.current < this.showItem) {
          var i = Math.min(this.showItem, this.allPage);
          while (i) {
            pag.unshift(i--);
          }
        } else {
          var middle = this.current - Math.floor(this.showItem / 2),
            i = this.showItem;
          if (middle > (this.allPage - this.showItem)) {
            middle = (this.allPage - this.showItem) + 1
          }
          while (i--) {
            pag.push(middle++);
          }
        }
        return pag
      },
      current(){
        return this.$route.params.page || 1
      }
    },
    methods: {
      goTo(index) {
        // 点击后路由跳转
        this.$router.push({
          params: {
            page: index
          }
        })
      }
    }
  }
</script>

<style scoped>
  .pagination {
    position: relative;
    text-align: center;
  }

  .pagination li {
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
  }

  .pagination li a {
    padding: 10px 13px;
    display: inline-block;
    border: 1px solid #f3f3f3;
    background: #fff;

    color: green;
  }

  .pagination li a:hover {
    background: #eee;
  }

  .pagination li.active a {
    background: #DE333A;
    color: #fff;
    border: 1px solid #DE333A;
  }
</style>