<template>
  <form style="border:1px solid #ccc"  v-on:submit.prevent="addUser()">
    <div class="container" >

      <h1>Registrate</h1>
      <p>Por favor, completa todos los campos para registrarte.</p>
      <hr>
      <label><b>Selecccione Tipo Documento</b></label><br>
      <select v-model="user.idTypeDoc" required>
        <option v-for="typedoc in typeDocs" v-bind:key="typedoc.id" v-bind:value="typedoc.id" >{{ typedoc.name }}</option>
      </select><br>
      <label><b>Numero de Documento</b></label>
      <input v-model="user.numberDoc" placeholder="Ingresa Numero de Documento"  type="text" required>

      <label><b>Nombre</b></label>
      <input v-model="user.name" type="text" placeholder="Ingresa tu nombre completo" required>


      <label><b>Selecccione Sexo</b></label><br>
      <select v-model="user.idTypeSex" required>
        <option v-for="typeSex in typeSexs" v-bind:key="typeSex.id" v-bind:value="typeSex.id" >{{ typeSex.name }}</option>
      </select><br>


      <label><b>Edad</b></label><br>
      <input v-model="user.age" type="number" placeholder="Ingresa edad" required><br>
      <hr>
      <label><b>Correo Electronico</b></label>
      <input v-model="user.email" type="text" placeholder="Ingresa Corre Electronico"  required>

      <label><b>Password</b></label>
      <input v-model="user.password" type="password" placeholder="Ingresa Password"  required>
      <label><b>Selecccione Perfil de usuario</b></label><br>
      <select v-model="user.idProfile" required>
        <option v-for="profile in profiles" v-bind:key="profile.id" v-bind:value="profile.id" >{{ profile.name }}</option>
      </select><br>




      <div class="clearfix">

        <button type="submit" class="signupbtn">REGISTRAR</button>
        <router-link to="/login"><button   class="cancelbtn">CANCELAR</button></router-link>

      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "registroUser",

  data() {

    return {
      user: {
        idTypeDoc: null,
        numberDoc: null,
        name: null,
        idTypeSex: null,
        age: null,
        email: null,
        password: null,
        idProfile: null
      },

      typeDocs: [
        {
          id: 1,
          name: "Cedula de identidad"
        },
        {
          id: 2,
          name: "Pasaporte"
        }],
      typeSexs: [
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
      profiles: [
        {
          id: 1,
          name: "Administrador"
        },
        {
          id: 2,
          name: "Usuario"
        }],
    }
  },
  methods: {
    addUser () {
      axios.post('http://127.0.0.1:8000/api/users/', this.user)
          .then(response => {
            // this.usuarios.push(response.data.data)
            console.log(
                response
            )
            alert("Usuario Creado")
            this.$router.push('login')

          })
    },

  }
}

</script>

<style scoped>
* {box-sizing: border-box}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
select {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for all buttons */
button {
  background-color: mediumslateblue;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn, .signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

</style>