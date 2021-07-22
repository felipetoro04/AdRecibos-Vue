<template>
  <div id="home">
    <div>
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
  mixins:[loginMixin],

}
</script>

<style scoped>
#home {
  width: 100%; margin: 0 auto;}

</style>