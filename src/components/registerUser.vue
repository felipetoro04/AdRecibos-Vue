<template>
  <div id="signIng">
  <form style="alignment: center"  v-on:submit.prevent="addUser()">
    <div class="container" >

      <h1>Registrate </h1>
      <p>Por favor, completa todos los campos para registrarte.</p>
      <hr>
      <label><b>Selecccione Tipo Documento</b></label><br>
      <select v-model="user.idTypeDoc" required><br>
        <option v-for="typedoc in typeDocs" v-bind:key="typedoc.id" v-bind:value="typedoc.id" >{{ typedoc.name }}</option><br>
      </select><br>
      <label><b>Numero de Documento</b></label><br>
      <input v-model="user.numberDoc" placeholder="Ingresa Numero de Documento"  type="text" required><br>

      <label><b>Nombre</b></label><br>
      <input v-model="user.name" type="text" placeholder="Ingresa tu nombre completo" required><br>


      <label><b>Selecccione Sexo</b></label><br>
      <select v-model="user.idTypeSex" required><br>
        <option v-for="typeSex in typeSexs" v-bind:key="typeSex.id" v-bind:value="typeSex.id" >{{ typeSex.name }}</option><br>
      </select><br>


      <label><b>Edad</b></label><br>
      <input v-model="user.age" type="number" placeholder="Ingresa edad" required><br>
      <hr>
      <label><b>Correo Electronico</b></label><br>
      <input v-model="user.email" type="text" placeholder="Ingresa Corre Electronico"  required><br>

      <label><b>Password</b></label><br>
      <input v-model="user.password" type="password" placeholder="Ingresa Password"  required><br>
      <label><b>Selecccione Perfil de usuario</b></label><br>
      <select v-model="user.idProfile" required><br>
        <option v-for="profile in profiles" v-bind:key="profile.id" v-bind:value="profile.id" >{{ profile.name }}</option><br>
      </select>




      <div class="clearfix">

        <button type="submit" class="signupbtn">REGISTRAR</button><br>
        <router-link to="/login"><button   class="cancelbtn">CANCELAR</button></router-link>

      </div>
    </div>
  </form>
  </div>
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
#signIng {
  margin-right: 400px;
  margin-left: 400px;
  font-family:'Quicksand', sans-serif;
  background-image: url("https://wallpaperstock.net/black-lines-wallpapers_44981_1920x1080.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  text-align: center;
  color: white;

}
#signIng * {
  margin-top: 20px;
  margin-bottom:20px ;
}

#signIng .container{
  justify-content: center;
  align-items: center;
  vertical-align: central;

}
#signIng .container select{
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
  width: 100%;
  cursor: pointer;
  padding: 7px 10px;
  height: 42px;
  outline: 0;
  border: 0;
  border-radius: 0;
  background: #f0f0f0;
  color: #7b7b7b;
  font-size: 1em;
  color: #999;
  font-family:
      'Quicksand', sans-serif;
  border:2px solid rgba(0,0,0,0.2);
  border-radius: 12px;
  position: relative;
  transition: all 0.25s ease;
}



#signIng .container input{
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
  width: 100%;
  cursor: pointer;
  padding: 7px 10px;
  height: 42px;
  outline: 0;
  border: 0;
  border-radius: 0;
  background: #f0f0f0;
  color: #7b7b7b;
  font-size: 1em;
  color: #999;
  font-family:
      'Quicksand', sans-serif;
  border:2px solid rgba(0,0,0,0.2);
  border-radius: 12px;
  position: relative;
  transition: all 0.25s ease;
}


#signIng button {


  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: 30px;
  border-radius: 30px;
  cursor: pointer;
  width: 50%;
}
#signIng .cancelbtn{
  background-color: red;
}
#signIng .signupbtn{
  background-image: url("https://www.dhresource.com/0x0/f2/albu/g9/M01/CA/F4/rBVaWF6MElqAfa4CAACDx132CXw700.jpg/blue-wallpapers-simple-modern-abstract-3d.jpg");
}



/* Add a hover effect for buttons */
#signIng button:hover {
  opacity: 0.8;
}


</style>