<template>
  <form action="post">
    <fieldset>
      <legend>身份证</legend>
      <label class="required">
        真实姓名：
        <input type="text" v-model="identityInfo.name" :disabled="exist">
      </label>
      <label class="required">
        身份证号：
        <input type="text" v-model="identityInfo.identity_id" :disabled="exist">
      </label>
      <button class="save" @click.prevent="save(modified)" v-show="!exist">保存</button>
      <button class="edit" @click.prevent="edit" v-show="exist">编辑</button>
    </fieldset>
  </form>
</template>

<script>
import api from "@/utils/api.js";

export default {
  props: {
    exist: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      modified: false,
      identityInfo: {
        item_id: 1, // 必填，条目ID
        name: "", // 必填，姓名
        identity_id: "" // 必填，身份证号
      }
    };
  },

  methods: {
    save() {
      const that = this;
      if (that.modified) {
        api
          .post("/v1/update_identity_card", {
            identityInfo: that.identityInfo
          })
          .then(res => {
            if (res.data.status === "success") {
              that.exist = true;
            } else {
              console.log(res.data.result.message);
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        api
          .post("/v1/create_identity_card", {
            identityInfo: that.identityInfo
          })
          .then(res => {
            if (res.data.status === "success") {
              that.exist = true;
            } else {
              console.log(res.data.result.message);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    edit() {
      this.exist = false;
      this.modified = true;
    }
  }
};
</script>

<style scoped>
form {
  margin: 5px;
}

label {
  display: block;
  position: relative;
}

.required::before {
  content: "*";
  color: red;
}

input {
  position: absolute;
  left: 180px;
}

button {
  display: block;
  margin: 8px auto;
  padding: 5px 8px;
  border-radius: 5px;
}

button.save {
  background: green;
}

button.edit {
  background: blue;
}
</style>
