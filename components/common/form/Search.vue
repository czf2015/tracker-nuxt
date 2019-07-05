<template>
  <label class="search">
    <img :src="icon.search" />
    <input type="search" placeholder="" list="suggests" />
    <datalist id="suggests">
      <option v-for="(item, index) in suggests" :value="item" :key="index" />
    </datalist>
    <img :src="icon.voice" @click="speech" />
  </label>
</template>

<script>
import axios from 'axios'

export default {
	  asyncData() {
	  return axios.get('http://localhost:3000/api/search.json')
	    .then(res => ({
	      suggests: res.data.suggests
	    }))
	},
  data() {
    return {
      icon: {
        search: 'img/icons/search.png',
        voice: 'img/icons/voice.png'
      }
    }
  },
  methods: {
    speech() {
    // 
    }
  }
}
</script>

<style scoped>
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  background: #cccc;
  border-radius: .25rem;
}

input[type="search"] {
  width: 100%;
  background: transparent;
}
</style>
