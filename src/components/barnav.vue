<template>
<div id="bar">
  <nav>
    <ul>
      <li><router-link to="/home"><button>Inicio</button></router-link> </li>
      <li><router-link to="/home"><button @click="mostrarCreacionBoleta()">Creación de Boletas</button></router-link></li>
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
#bar *{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Quicksand', sans-serif;
  text-align: center;

}
#bar nav button{
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 10px;

  position: relative;
  background-image: url("https://www.dhresource.com/0x0/f2/albu/g9/M01/CA/F4/rBVaWF6MElqAfa4CAACDx132CXw700.jpg/blue-wallpapers-simple-modern-abstract-3d.jpg");
  border: none;
  color: #fff;
  padding: 20px;
  width: 200px;
  transition-duration: 0.4s;
  overflow: hidden;
  box-shadow: 0 5px 15px #193047;
  border-radius: 4px;
}


#bar nav li{
  display:inline-block;
  border:none;
  text-align:center;
  position:relative;
}

#bar nav button:hover{
  background: #fff;
  box-shadow: 0px 2px 10px 5px #1abc9c;
  color: #000;
  cursor: pointer;
}
#bar nav button:after{
  content: "";
  background: #1abc9c;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s

}
#bar nav button:active:after{
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}
#bar nav button:focus{outline:0;}

#bar nav li>ul{
  display: none;
}

#bar nav li:hover>ul{
  display:block;
  position:absolute;
  top:50px;
  left:0px;
}

</style>