<template>
  <div id="setting">
    <barnav></barnav>
    <div id="vertical">
      <ul id="subnav" class="metro-nav metro-nav-vertical">
        <li><a href="#" @click="mostrarModificarVerdadero">Modificar Usuario</a></li
        >
        <li><a href="#" @click="mostrarEliminarVerdadero">Eliminar Usuario</a></li>
      </ul>
    </div>
    <div id="modificar" v-show="mostrarModificar">
      <form v-on:submit.prevent="updateUser()">
        <div class="container">
          <h1>Modificar datos usuario</h1>
          <p>Modificar datos de usuario y para guadar cambios presione boton "Guardar"</p>

          <label><b>Nombre</b></label><br>
          <input v-model="user.name" type="text" placeholder="Ingresa tu nombre completo" required><br>

          <label><b>Selecccione Sexo</b></label><br>
          <select v-model="user.idTypeSex" required><br>
            <option v-for="typeSex in tipeSexs" v-bind:key="typeSex.id" v-bind:value="typeSex.id">{{
                typeSex.name
              }}
            </option><br>
          </select><br>

          <label><b>Edad</b></label><br>
          <input v-model="user.age" type="number" placeholder="Ingresa edad" required><br>
          <hr>
          <label><b>Correo Electronico</b></label><br>
          <input v-model="user.email" type="text" placeholder="Ingresa Corre Electronico" required><br>

          <label><b>Password</b></label><br>
          <input v-model="user.password" type="password" placeholder="Ingresa Password" required><br>

          <button type="submit" class="signupbtn">Guardar</button>
        </div>
      </form>
    </div>
    <div id="eliminar" v-show="mostrarEliminar">
      <h1>Eliminar cuenta usuario</h1>
      <p>Para eliminar usuario ingrese el dato solicitado y persione boton "Eliminar"</p>
      <label><b>Para eliminar usuario ingrese contraseña</b></label><br>
      <input v-model="password" type="password" placeholder="Ingrese contraseña" name="psw-repeat" required><br>
      <button type="submit" @click="OcultarEliminar()"  class="cancelbtn">Cancelar</button><br>

      <button class="deletebtn" type="submit" @click="deleteUser()">Eliminar</button>


    </div>
  </div>
</template>

<script>

import axios from "axios";
import Barnav from "@/components/barnav";
import loginMixin from "@/mixins/login-mixins";

export default {
  name: "setting",
  components: {Barnav},


  el: '#vertical',
  mixins:[loginMixin],
  beforeCreate() {
  },
  data() {
    return {
      password: null,
      mostrarModificar: false,
      mostrarEliminar: false,
      user: {
        idTypeDoc: null,
        numberDoc: null,
        name: null,
        idTypeSex: null,
        age: null,
        email: null,
        password: null,
        idProfile: null
      }, tipeSexs: [
        {
          id: 3,
          name: "Masculino"
        },
        {
          id: 4,
          name: "Femenino"
        },
        {
          id: 5,
          name: "Otro"
        }],
    };
  },

  methods: {
    mostrarModificarVerdadero() {
      this.mostrarModificar = true,
          this.mostrarEliminar = false
    },
    OcultarModificar() {
      this.mostrarModificar = false
    },
    mostrarEliminarVerdadero() {
      this.mostrarEliminar = true,
          this.mostrarModificar = false
    },
    OcultarEliminar() {
      this.mostrarEliminar = false
    },

    deleteUser() {
      if(this.password === this.user.password) {
        axios.delete('http://127.0.0.1:8000/api/users/' + this.user.id)
            .then( () => {
              localStorage.clear()
              alert("Usuario eliminado ")
              this.$router.push('login')
            })
      }else {
        alert("la contrasenia no es valida")
      }
    },
    updateUser() {
      console.log(this.user)


      axios.put('http://127.0.0.1:8000/api/users/' + this.user.id, this.user)
          .then(response => {
            alert("Usuario actualizado ")
            this.receipts.push(response.data.data);

            alert("Usuario actualizado ")
          })

    },
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/users/' + localStorage.getItem("USER_ID"))
        .then(response => {


          this.user = response.data.data;


        })
  }
}
</script>

<style scoped>

#setting{
  font-family:'Quicksand', sans-serif;
}
.metro-nav {
  box-shadow: 0 5px 15px #193047;
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  text-transform: uppercase;

  font-size: 10px;

}

.metro-nav li a {
  display: inline-block;
  *display: inline;
  zoom: 1;
}

.metro-nav li a {
  display: block;
  padding: 10px;
  transition: all 0.1s;
}

.metro-nav.metro-nav-vertical li a {
  display: block;
}

.metro-list li a {
  padding: 8px 12px;
}


.metro-nav {
  background: deepskyblue;
  width: 80%;
  margin: 20px auto;
}

.metro-nav li a {
  margin: 0px;
}

.metro-nav li a {
  color: Black;
  text-decoration: none;
  padding: 20px 25px;
  margin: 0;
}

.metro-nav li a:hover {
  color: white;
  background: mediumslateblue;
  box-shadow: 0px 2px 10px 5px deepskyblue;
}

.metro-nav.metro-nav-vertical {
  width: 200px;
}


.metro-pricing-table li a {
  list-style: none;
}

.metro-pricing-table .metro-pricing-pricerow td {
  padding: 20px 0;
  text-align: left;
}

/* Modificar*/
#modificar {


  text-align: center;
  padding-left: 250px;

}
#eliminar {


  text-align: center;
  padding-left: 250px;

}
#modificar input{
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
text-align: center;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 7px 10px;
  height: 20px;
  outline: 0;
  width: 200px;
  background: #f0f0f0;  
  border:2px solid rgba(0,0,0,0.2);
  border-radius: 12px;
  position: relative;
  transition: all 0.25s ease;

}
#eliminar input{
  margin-top: 20px;
  margin-bottom: 20px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 7px 10px;
  height: 40px;
  outline: 0;
  width: 200px;
  background: #f0f0f0;
  border:2px solid rgba(0,0,0,0.2);
  border-radius: 12px;
  position: relative;
  transition: all 0.25s ease;

}
#modificar select{
  appearance: none;
  margin-top: 20px;
  margin-bottom: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 7px 10px;
  height: 40px;
  outline: 0;
  width: 200px;
  background: #f0f0f0;
  border:2px solid rgba(0,0,0,0.2);
  border-radius: 12px;
  position: relative;
  transition: all 0.25s ease;


}

button {

  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 15%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.deletebtn , .signupbtn{
  background-image: url("https://www.dhresource.com/0x0/f2/albu/g9/M01/CA/F4/rBVaWF6MElqAfa4CAACDx132CXw700.jpg/blue-wallpapers-simple-modern-abstract-3d.jpg");
  width: 15%;
  border-radius: 30px;
}
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
  border-radius: 30px;
}



/* Add padding to container elements */
.container {
  padding: 16px;
}

#eliminar {
  margin-top:20px ;
  margin-bottom: 20px;
  text-align: center;


}


</style>
