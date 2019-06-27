<template>
  <article>
    <header>
      <i class/>
      确认订单
    </header>
    <main>
      <!-- <Address/> -->
      <Order/>
      <ul class="mail">
        <li>
          <label for="preference">店铺优惠</label>
          <button id="preference" @click>店铺包邮</button>
        </li>
        <li>
          <label for="way">配送方式</label>
          <button id="way" @click>快递免邮</button>
        </li>
        <li>
          <label for="insurance">运费险</label>
          <button id="insurance" @click>卖家送，确认收获前退货可赔</button>
        </li>
        <li>
          <label for="receipt">开具发票</label>
          <input type="checkbox" id="receipt" v-model="receipt">
        </li>
        <li>
          <label for="message">买家留言：</label>
          <input type="text" id="message" v-model="message">
        </li>
        <li>
          <label for="anonymous">匿名购买</label>
          <input type="checkbox" id="anonymous" v-model="anonymous">
        </li>
        <li>
          <label for="address">送至：</label>
          <span id="address">{{address}}</span>
        </li>
      </ul>
    </main>
    <footer>
      <span>{{cost}}</span>
      <button>提交</button>
    </footer>
  </article>
</template>

<script>
// 
import api from "@/utils/api.js";
// 
import Order from "@/components/purchase/Order.vue";

export default {};
</script>

<style scoped>
.mail {
}

li {
  display: flex;
  justify-content: space-between;
}
</style>
