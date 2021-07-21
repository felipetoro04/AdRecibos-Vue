<template>


  <div id="login"  >
    <form method="post"  v-on:submit.prevent="login()">
      <div class="imgcontainer">
        <img src="../assets/images/Addre.png" alt="login" class="avatar">
      </div>

      <div class="container">
        <label><b>EMAIL</b></label><br>
        <input type="text" v-model="user.email" placeholder="Ingresa Email" required><br>

        <label><b>CONTRASENA</b></label><br>
        <input type="password" v-model="user.password" placeholder="Ingresa Contrasena" required>


      </div>

      <div class="container" >
        <button type="submit">LOGIN</button><br>

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
#login{
  color: white;
  margin-right: 400px;
  margin-left: 400px;

  background-image: url(https://wallpaperstock.net/texture-wallpapers_53751_1920x1080.jpg);

  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;


}
#login *{
  text-align: center;
  font-family:'Quicksand', sans-serif;
}




/* Full-width inputs */
#login input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 20px;

}
/* Set a style for all buttons */
#login button {
  background-image: url("https://www.dhresource.com/0x0/f2/albu/g9/M01/CA/F4/rBVaWF6MElqAfa4CAACDx132CXw700.jpg/blue-wallpapers-simple-modern-abstract-3d.jpg");
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: 30px;
  border-radius: 30px;
  cursor: pointer;
  width: 50%;
}


#login .registro{
  width: 130px;
}
/* Add a hover effect for buttons */
#login button:hover {
  opacity: 0.8;
}
/* Center the avatar image inside this container */
#login .imgcontainer {
  background: white;
  border-radius: 40px;
  padding-top: 30px;
  text-align: center;
  margin: 24px 0 12px 0;
}
/* Avatar image */
#login img.avatar {
  width: 200px;

  text-align: center;
}
/* Add padding to containers */
#login .container,label {
  
}
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

</style>
