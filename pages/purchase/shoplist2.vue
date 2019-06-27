<template>
  <article>
    <table id="shoplist">
      <caption>商品列表</caption>
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
        <tr v-for="item in products" :key="item.id" class="shoplist-item">
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
    <button @click="addCart(renewed)" class="btn">加入购物车</button>
  </article>
</template>

<script>
import api from "@/utils/api.js";
import Count from "@/components/base/Count.vue";

export default {
  async asyncData() {
    const [
      {
        data: {
          result: { data: products }
        }
      },
      {
        data: {
          result: { data: cart }
        }
      }
    ] = await Promise.all([
      api.get("/v1/query_all_products"),
      api.get("/v1/query_shopping_cart")
    ]);
    const shoplist = {};
    products.forEach(
      item =>
        (shoplist[item.id] = {
          product: item,
          count: 1
        })
    );
    let checked = [];
    if (cart.length > 0) {
      checked = cart[0].orders[0].product_list.map(item => item.id);
      cart[0].orders[0].product_list.forEach(
        item => (shoplist[item.id].count = item.dose.dose)
      );
    }
    return {
      products,
      shoplist,
      cart,
      checked
    };
  },

  components: {
    Count
  },

  data() {
    return {
      picked: []
    };
  },

  computed: {
    species() {
      return this.checked.length;
    },
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
    addCart() {
      const that = this;
      const orders = [];
      const product_list = that.checked.map(item => ({
        id: item,
        dose: {
          dose: that.shoplist[item].count,
          unit: "day"
        },
        sku_price: that.shoplist[item].product.priceInfo.required,
        type: "required"
      }));
      orders.push({
        product_list,
        specify: 1,
        num: 1,
        name: "name",
        remark: "无"
      });
      if (that.cart.length === 0) {
        api
          .post("/v1/create_shopping_cart", {
            goodsInfo: {
              orders
            }
          })
          .then(res => {
            if (res.data.status === "success") {
              window.location.href = "/purchase/cart2";
            } else {
              // +++ server validation
              console.log(res.data.error);
            }
          })
          .catch(e => {
            console.log("发送数据失败");
          });
      } else {
        api
          .post("/v1/update_shopping_cart", {
            goodsInfo: {
              orders
            }
          })
          .then(res => {
            if (res.data.status === "success") {
              window.location.href = "/purchase/cart2";
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
  }
};
</script>

<style scoped>
#shoplist {
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

.btn {
  margin: 8px;
  background: yellow;
  border-radius: 5px;
}
</style>

