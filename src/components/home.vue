<template>
  <div id="home">
    <div v-if="showCN">
      <Cuerpo></Cuerpo>
    </div>
  </div>
</template>
<script>
import Cuerpo from "@/components/body";
import loginMixin from "@/mixins/login-mixins";
export default {
  name: "home",
  components: {Cuerpo,},
  mixins: [loginMixin],
  data() {
    return {
      showCN : false
    }
  },
  created() {
    setTimeout(() => { this.showCN = true }, 1000)
  }
}
</script>
<style scoped>
#home {
  width: 100%; margin: 0 auto;}
</style>
