<template>
  <article>
    <table class="order">
      <caption>订单</caption>
      <thead>
        <tr>
          <th class="select">
            <input type="checkbox" value="all" v-model="picked" @click="selectAll">
            {{picked[0] === 'all' ? '取消' : '全选'}}
          </th>
          <th class="species">品种</th>
          <th class="price">单价</th>
          <th class="count">数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in product_list" :key="item.id" class="shoplist-item">
          <td class="select">
            <input type="checkbox" :value="item.id" v-model="checked">
          </td>
          <td class="species">
            <figure class="species-figure">
              <img :src="item.image" :alt="item.productName" class="species-img">
              <figcaption class="species-figcaption">{{item.productName}}</figcaption>
            </figure>
          </td>
          <td class="price">{{item.priceInfo.required}}</td>
          <td class="count">
            <Count @change="count" :shop="shoplist[item.id]"/>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="shoplist-title">
          <td class="select">&#x2713;已选</td>
          <td class="species">品数：{{species}}</td>
          <td class="price">总价：{{cost}}</td>
          <td class="count">总量：{{counts}}</td>
        </tr>
      </tfoot>
    </table>
    <form class="info">
      <label>
        规格：
        <input type="number" min="1" step="1" v-model="specify">
      </label>
      <label>
        份数：
        <input type="number" min="1" step="1" v-model="num">
      </label>
      <label>
        用户：
        <input type="text" minlength="1" placeholder="*必填" v-model="name">
      </label>
    </form>
    <label>
      *备注：
      <textarea class="remark" v-model="remark" placeholder="留请注意"></textarea>
    </label>
    <span class="bill">金额：{{cost * specify * num}}元</span>
    <button @click="submit" class="submit_btn">下单</button>
    <button @click="remove" class="remove_btn">删除</button>
  </article>
</template>

<script>
import api from "@/utils/api.js";

import Count from "@/components/base/Count.vue";

export default {
  props: {
    order: Object,
    products: Array,
    id: String
  },

  data() {
    const that = this;
    const checked = that.order.product_list.map(item => item.id);
    const shoplist = {};
    that.products.forEach(
      item =>
        (shoplist[item.id] = {
          product: item,
          count: 1
        })
    );
    let product_list = checked.map(item => shoplist[item].product);
    that.order.product_list.forEach(
      item => (shoplist[item.id].count = item.dose.dose)
    );
    debugger;
    return {
      product_list,
      shoplist,
      checked,
      picked: ["all"],
      specify: that.order.specify || 1,
      num: that.order.num || "",
      name: that.order.name || "",
      remark: that.order.remark || "无"
    };
  },

  components: {
    Count
  },

  computed: {
    counts() {
      let total = 0;
      this.checked.forEach(item => (total += this.shoplist[item].count));
      return total;
    },
    cost() {
      let total = 0;
      this.checked.forEach(
        item =>
          (total +=
            this.shoplist[item].count *
            this.shoplist[item].product.priceInfo.required)
      );
      return total;
    }
  },

  methods: {
    count({ id, count }) {
      this.shoplist[id].count = count;
    },
    selectAll() {
      if (this.picked[0] !== "all") {
        this.checked = this.products.map(item => item.id);
      } else {
        this.checked = [];
      }
    },
    submit() {
      const that = this;
      that.order.product_list = that.checked.map(item => ({
        id: item,
        dose: {
          dose: that.shoplist[item].count,
          unit: "day"
        },
        sku_price: that.shoplist[item].product.priceInfo.required,
        type: "required"
      }));
      api
        .post("/v1/update_shopping_cart", {
          goodsInfo: {
            id: that.id,
            orders: [that.order]
          }
        })
        .then(res => {
          if (res.data.status === "success") {
            window.location.href = "/purchase/order";
          } else {
            // +++ server validation
            console.log(res.data.error);
          }
        })
        .catch(e => {
          console.log("发送数据失败");
        });
    },
    remove() {
      const that = this;
      api
        .post("/v1/delete_shopping_cart", {
          goodsInfo: {
            orderItemIds: [that.order.order_item_id]
          }
        })
        .then(res => {
          if (res.data.status === "success") {
            window.location.reload();
          } else {
            // +++ server validation
            console.log(res.data.error);
          }
        })
        .catch(e => {
          console.log("发送数据失败");
        });
    }
  }
};
</script>

<style scoped>
#cart {
  padding: 8px;
}

caption {
  font-weight: bold;
  font-size: 16px;
}

thead {
  font-weight: bold;
  background: #ccc;
}

tr:nth-child(2n) {
  background: rgb(203, 243, 170);
}

.shoplist-item {
}

.select {
  width: 64px;
}

.species {
}

.species-figure {
}

.species-img {
  width: 64px;
  height: 64px;
}

.species-figcaption {
}

.price {
  width: 64px;
}

.count {
  width: 96px;
}

.submit_btn {
  margin: 8px;
  background: yellow;
  border-radius: 5px;
}

.remove_btn {
  margin: 8px;
  background: red;
  border-radius: 5px;
}

.info {
  display: flex;
  justify-content: space-around;
}

input[type="text"],
input[type="number"] {
  max-width: 50px;
}

.remark {
}
</style>

