<template>
  <form>
    <fieldset>
      <legend>新建收货地址</legend>
      <label class="required">
        收货人：
        <input type="text" placeholder="必填" v-model="addressInfo.receiver_name" required>
      </label>
      <label class="required">
        联系电话：
        <input type="tel" placeholder="必填" v-model="addressInfo.receiver_tel" required>
      </label>
      <label class="required">
        省份/直辖市/自治区：
        <input
          type="text"
          placeholder="必填"
          v-model="addressInfo.delivery_province"
          required
        >
      </label>
      <label class="required">
        城市：
        <input type="text" placeholder="必填" v-model="addressInfo.delivery_city" required>
      </label>
      <label class="required">
        区/县：
        <input type="text" placeholder="必填" v-model="addressInfo.delivery_district" required>
      </label>
      <label class="required">
        详细地址：
        <input type="text" placeholder="必填" v-model="addressInfo.delivery_address" required>
      </label>
      <label class="optional">
        邮政编码：
        <input type="text" placeholder="可选" v-model="addressInfo.delivery_postal_code">
      </label>
      <button @click.prevent="save">保存</button>
    </fieldset>
  </form>
</template>

<script>
import api from "@/utils/api.js";

export default {
  data() {
    return {
      addressInfo: {
        receiver_name: "", //必填，收货人姓名
        receiver_tel: "", //必填，收货人电话
        delivery_postal_code: "\u0000", //选填，邮政编码
        delivery_province: "", //必填，所属省份
        delivery_city: "", //必填，所属城市
        delivery_district: "", //必填，所属地区
        delivery_address: "", //必填，详细地址
        default: false
      }
    };
  },

  methods: {
    save() {
      const that = this;
      api
        .post("/v1/create_address", { addressInfo: that.addressInfo })
        .then(res => {
          window.location.href = "/address/query";
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  line-height: 2;
}

fieldset {
  margin: 0 5px;
}

label {
  display: block;
  position: relative;
  margin: 5px;
}

.required::before {
  content: "*";
  color: red;
}

input {
  position: absolute;
  left: 165px;
  display: inline-block;
  text-align: center;
}

button {
  display: block;
  margin: 16px auto;
  padding: 5px 8px;
  color: rgb(133, 134, 130);
  background: rgba(10, 238, 10, 0.76);
  border-radius: 8px;
  border: 1px solid rgb(255, 255, 0);
}
</style>
