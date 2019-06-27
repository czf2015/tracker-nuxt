<template>
  <form>
    <fieldset>
      <legend>更改收货地址</legend>
      <label class="required">
        收货人：
        <input type="text" placeholder="必填" v-model="addressInfo.receiver_name" required>
      </label>
      <!-- <label>
      *身份证号：
      <input
        type="text"
        placeholder="必填"
        minlength="18"
        maxlength="18"
        v-model="addressInfo.identity_card"
        required
      >
      </label>-->
      <label class="required">
        联系电话：
        <input type="tel" v-model="addressInfo.receiver_tel" required>
      </label>
      <label class="required">
        省份/直辖市/自治区：
        <input type="text" v-model="addressInfo.delivery_province" required>
      </label>
      <label class="required">
        城市：
        <input type="text" v-model="addressInfo.delivery_city" required>
      </label>
      <label class="required">
        区/县：
        <input type="text" v-model="addressInfo.delivery_district" required>
      </label>
      <label class="required">
        详细地址：
        <input type="text" v-model="addressInfo.delivery_address" required>
      </label>
      <label class="optional">
        邮政编码：
        <input type="text" v-model="addressInfo.delivery_postal_code">
      </label>
      <button @click.prevent="save">保存</button>
    </fieldset>
  </form>
</template>

<script>
import api from "@/utils/api.js";

export default {
  asyncData({ params }) {
    return {
      addressInfo: JSON.parse(window.sessionStorage.getItem(params.id))
    };
  },

  methods: {
    save() {
      const that = this;
      delete that.addressInfo.update_time;
      api
        .post("/v1/update_address", { addressInfo: that.addressInfo })
        .then(res => {
          console.log(res.data.result.message);
        })
        .catch(e => {
          console.log(e);
        });
      window.sessionStorage.setItem(
        that.addressInfo.address_id,
        JSON.stringify(that.addressInfo)
      );
      window.location.href = "/address/query";
    }
  }
};
</script>

<style scoped>
form {
  margin: 5px;
}

label {
  position: relative;
  display: block;
  margin-top: 8px;
}

.required::before {
  content: "*";
  color: red;
}

input {
  position: absolute;
  left: 175px;
  text-align: center;
}

button {
  display: block;
  margin: 16px auto;
  padding: 5px 8px;
  background: yellowgreen;
  border-radius: 5px;
}
</style>
