<template>
  <article>
    <header>
      <i class="fas fa-chevron-left" @click/>
      <span class="title">收货地址</span>
    </header>
    <main>
      <ul>
        <li v-for="item in addresses" :key="item.address_id">
          <h4 class="contact">
            <span>{{item.receiver_name}}</span>
            <span>{{item.receiver_tel}}</span>
          </h4>
          <p class="address">
            <span>{{item.delivery_province}}</span>
            <span>{{item.delivery_city}}</span>
            <span>{{item.delivery_district}}</span>
            <span>{{item.delivery_address}}</span>
            <span>{{item.delivery__postal_code}}</span>
          </p>
          <p class="setup">
            <label>
              <input type="radio" :value="item.address_id" v-model="primary">默认
            </label>
            <button @click="edit(item.address_id)" class="edit-btn">编辑</button>
            <button @click="remove(item.address_id)" class="delete-btn">删除</button>
          </p>
        </li>
      </ul>
    </main>
    <footer>
      <button @click="add">新增收货地址</button>
    </footer>
  </article>
</template>

<script>
import api from "@/utils/api.js";

export default {
  asyncData() {
    return api
      .get("/v1/query_address")
      .then(res => {
        if (res.data.status === "success") {
          console.log(res.data.result.message);
          return {
            addresses: res.data.result.data
          };
        } else {
          alert(res.data.result.message);
        }
      })
      .catch(e => {
        console.log(e);
      });
  },

  data() {
    return {
      primary: []
    };
  },

  methods: {
    add() {
      window.location.href = "/address/create";
    },
    edit(address_id) {
      const that = this;
      window.sessionStorage.setItem(
        address_id,
        JSON.stringify(
          that.addresses.find(item => item.address_id === address_id)
        )
      );
      window.location.href = `/address/update/${address_id}`;
    },
    remove(address_id) {
      api
        .post("/v1/delete_address", {
          addressInfo: {
            itemIds: [address_id]
          }
        })
        .then(() => {
          // ~~~ 优化页面跳转问题
          window.location.reload();
        });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

article {
  background: #ccc;
}

header {
  position: fixed;
  font-size: 16px;
  line-height: 2;
  z-index: 99;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background: white;
}

header > i {
  padding: 8px;
}

header > span {
  padding: 8px;
  font-weight: bold;
}

main > ul {
  padding-top: 32px;
}

li {
  margin-top: 3px;
  padding: 5px;
  width: 100%;
  background: white;
  line-height: 1.5;
}

.contact {
  display: flex;
  justify-content: space-between;
}

.setup {
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  border-top: 1px dotted #ccc;
}

.address {
}

input[type="radio"] {
  margin-right: 5px;
}

.edit-btn {
  padding: 5px;
  background: yellowgreen;
}

.delete-btn {
  padding: 5px;
  background: red;
}

footer {
  position: fixed;
  bottom: 5px;
  z-index: 99;
  width: 100%;
  text-align: center;
}

footer > button {
  padding: 8px 32px;
  background: red;
}
</style>
