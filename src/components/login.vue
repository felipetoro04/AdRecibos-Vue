<template>


  <div id="login">
    <form method="post"  v-on:submit.prevent="login()">
      <div class="imgcontainer">
        <img src="../assets/images/DC_Comics_logo.png" alt="login" class="avatar">
      </div>

      <div class="container">
        <label><b>Email</b></label>
        <input type="text" v-model="user.email" placeholder="Ingresa Email" required>

        <label><b>Contrasena</b></label>
        <input type="password" v-model="user.password" placeholder="Ingresa Contrasena" required>

        <button type="submit">LOGIN</button>

        <label>
          <input type="checkbox" checked="checked" name="remember"> Recordar
        </label>
      </div>

      <div class="container" style="background-color:#f1f1f1">
        <router-link to="/registro"><button type="button" class="registro">REGISTRAR</button></router-link>


      </div>
    </form>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: null,
        password: null,
      },


    }
  },
  methods: {
    login() {
      axios.post('http://127.0.0.1:8000/api/auth/', this.user)
          .then(response => {
            // this.users.push(response.data.data)
            console.log(
                response
            )
            if(response.status === 200) {
              this.$router.push('home')
              localStorage.setItem('USER_EMAIL', response.data.email)
              localStorage.setItem('USER_ID', response.data.id)
            }else {
              alert("usuario o password incorrecto")
            }

          })
    },
  }
}

</script>
<style>
/* Bordered form */
#login form {
  border: 3px solid #f1f1f1;
}
/* Full-width inputs */
#login input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
/* Set a style for all buttons */
#login button {
  background-color: mediumslateblue;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}
/* Add a hover effect for buttons */
#login button:hover {
  opacity: 0.8;
}
/* Center the avatar image inside this container */
#login .imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}
/* Avatar image */
#login img.avatar {
  width: 200px;
  border-radius: 50%;
  text-align: center;
}
/* Add padding to containers */
#login .container {
  padding: 16px;
  text-align: center;
}
/* The "Forgot password" text */
#login span.psw {
  float: right;
  padding-top: 16px;
}
/* Change styles for span and cancel button on extra small screens */
#login @media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .registro {
    width: 100%;
  }
}
</style>
