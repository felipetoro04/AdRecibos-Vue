<template>
<div id="bar">
  <nav>
    <ul>
      <li><router-link to="/home"><button>Inicio</button></router-link> </li>
      <li><router-link to="/home"><button @click="mostrarCreacionBoleta">Creación de Boletas</button></router-link></li>
      <li><router-link to="/Consultas"><button>Consultas</button></router-link></li>
      <li><router-link to="/Configuraciones"><button>Configuración</button></router-link></li>
      <li><button @click="logout()">Cerrar Sesión</button></li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {
name: "barnav",
  props:{
  funcion:Function
  },
  methods:{
    logout(){
      this.$router.push('login')
      localStorage.clear()
    },
    mostrarCreacionBoleta(){
      this.$emit('creacion')
    },
  }
}
</script>

<style scoped>

</style>