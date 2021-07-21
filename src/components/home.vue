<template>
  <div id="home">
    <div v-if="isLogged">
      <Cuerpo></Cuerpo>
    </div>
    <div v-else>
      <router-link to="/login">A login</router-link>
    </div>

  </div>
</template>
<script>
import Cuerpo from "@/components/body";

export default {
  name: "home",
  components: {Cuerpo,},
  mounted() {
    this.checkLogin()
  },
  methods:{
    checkLogin(){
      var id = localStorage.getItem('USER_ID').trim();
      if (id == null || id == ''){
        this.isLogged = false



      }
      else{
        this.isLogged = true;
      }
    }


  },
  data() {
    return {
      isLogged: false


    }
  }
}
</script>

<style scoped>
#home {
  width: 100%; margin: 0 auto;}

</style>