<template>
  <div id="central">
    <barnav v-on:creacion="showCreation"/>
    <div  class="welcome">
      <b>Bienvenido : {{userEmail}}</b>
    </div>
    <div id='Cuerpo' align="center">
      <Header></Header>
      <h1 v-if="hasError">API no disponible.</h1>

      <div v-else>
        <h1 v-if="loading">Cargando Boletas...</h1>
        <div v-else>
          <h1>Boletas</h1>

          <div >
            <form class="Creacion" v-show ="showCR">
              Institucion:
              <select v-model="receipt.idEnterprice" required>
                <option v-for="enterprice in enterprices" v-bind:key="enterprice.id" v-bind:value="enterprice.id" >{{ enterprice.name }}</option>
              </select>
              Numero de Boleta:<input v-model="receipt.numberReceipt" type="text" required>
              Fecha de Emision:<input v-model="receipt.issueDate" type="date" required>
              Fecha de Vencimiento:<input v-model="receipt.expirationDate" type="date" required>
              Monto a Pagar:<input v-model="receipt.amountPayable" type="int" required>
              Estado de Boleta:
              <select v-model="receipt.idStatus" required>
                <option v-for="stat in status" v-bind:key="stat.id" v-bind:value="stat.id">{{ stat.name }}</option>
              </select>
              <button class="button-add" @click="addReceipt">Agregar</button>
              <button class="button-clean" @click="clean()">Limpiar</button>
              <button class="button-cancel" @click="hideCreation">Cancelar</button>

            </form>
          </div>
          <div class="search-box">
            <button class="btn-search"><font-awesome-icon icon="search"/></button>
            <input type="text" class="input-search" placeholder="Buscar Institución, Estado, Nro Boleta" v-model="searchQuery">
          </div>
          <div class="content-table">
            <table class="blueTable" >
              <tr>
                <th>Institucion</th>
                <th>Numero de Boleta</th>
                <th>Fecha de Emision</th>
                <th>Fecha de Vencimiento</th>
                <th>Monto de Pagar</th>
                <th>Estado de Boleta</th>
                <th>Acciones</th>

              </tr>
              <tr v-for="receipt in resultQuery" :key="receipt.id">
                <td>

                  {{receipt.enterprise ? receipt.enterprise.bussinessName : 'No definido'}}
                </td>
                <td>
                  {{ receipt.numberReceipt }}
                </td>
                <td>
                  {{ receipt.issueDate | formatDate}}
                </td>
                <td>
                  {{ receipt.expirationDate | formatDate}}
                </td>
                <td>
                  {{ receipt.amountPayable | formatNumber}}
                </td>
                <td>

                  {{receipt.status ? receipt.status.description : 'No definido'}}

                </td>
                <td>
                  <button class="button-update"  @click="updateReceipt(receipt);showCreation()">Actualizar</button>
                  <button class="button-delete" @click="removeReceipt(receipt.id)">Eliminar</button>

                </td>
              </tr>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'
import axios from "axios";
import Barnav from "@/components/barnav";
import moment from 'moment'
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})
var numeral = require("numeral");
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("1,0");
});



export default {
  name: "Cuerpo",
  components: {Barnav},
  data() {
    return {
      searchQuery: null,
      showCR: false,
      receipts: null,
      hasError: false,
      loading: true,
      receipt: {
        idEnterprice: null,
        numberReceipt: null,
        issueDate: null,
        expirationDate: null,
        amountPayable: null,
        idStatus: null,
        idUser: 1
      },

      userEmail: null,
      enterprices: [
        {
          id: 1,
          name: "Falabella"
        },
        {
          id: 2,
          name: "Paris"
        },
        {
          id: 3,
          name: "Ripley"
        }],
      status: [
        {
          id: 6,
          name: "Por Pagar"
        },
        {
          id: 7,
          name: "Atrasada"
        }],
      creation: true
    };
  },

  computed: {
    resultQuery(){
      if(this.searchQuery){
        console.log(this.searchQuery)
        return this.receipts.filter((item)=>{
          return this.searchQuery.toLowerCase().split(' ').every(v => item.enterprise.bussinessName.toLowerCase().includes(v)) ||
              this.searchQuery.toLowerCase().split(' ').every(v => item.numberReceipt.toLowerCase().includes(v)) ||
              this.searchQuery.toLowerCase().split(' ').every(v => item.status.description.toLowerCase().includes(v))

        })
      }else{
        return this.receipts;
      }
    }
  },

  methods: {
    hideCreation() {
      this.showCR = false
    },
    showCreation() {
      this.showCR = true
    },
    removeReceipt: function (id) {
      axios.delete('http://127.0.0.1:8000/api/receipts/' + id)
          .then(() => {
            this.receipts = this.receipts.filter(receipt => receipt.id !== id);
          });
    },
    addReceipt() {
      if (this.creation) {
        axios.post('http://127.0.0.1:8000/api/receipts/', this.receipt)
            .then(response => {
              this.receipts.push(response.data.data);
              alert("boleta Añadida")
              this.clean();
            })
      } else {
        axios.put('http://127.0.0.1:8000/api/receipts/' + this.receipt.id, this.receipt)
            .then(response => {
              this.receipts.push(response.data.data);
              this.showCR = false
              alert("Boleta Actualizada")
            })
        this.creation = false;
        this.clean();
      }
    },
    updateReceipt(receipt) {
      this.receipt = receipt;
      this.creation = false;
    },
    clean() {
      this.receipt = {
        idEnterprice: null,
        numberReceipt: null,
        issueDate: null,
        expirationDate: null,
        amountPayable: null,
        idStatus: null,
        idUser: 1
      };
      this.creation = true;
    },
    obtainEnterprice(id) {
      for (const key in this.enterprices) {
        if (this.enterprices[key].id.toString() === id.toString()) {
          return this.enterprices[key].name;
        }
      }
      return 'No hay informacion'
      //return instituciones.filter(institucion => institucion.id === id)[0].nombre;
    },
    obtainStatus(id) {
      for (const key in this.status) {
        if (this.status[key].id.toString() === id.toString()) {
          return this.status[key].name;
        }
      }
      return 'No hay informacion'
    },
  },
  mounted() {
    axios
        .get('http://127.0.0.1:8000/api/receipts')
        .then(response => (this.receipts = response.data.data))
        // eslint-disable-next-line no-unused-vars
        .catch(error => this.hasError = true)
        .finally(() => this.loading = false)
    this.userEmail = localStorage.getItem('USER_EMAIL')
  }



}
</script>

<style scoped>
#central h1 {
  font-family:'Quicksand', sans-serif;

}
#central .welcome {
  font-family:'Quicksand', sans-serif;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 400px;
  margin-right: 400px;

  background-image: url("https://cdn.pixabay.com/photo/2014/04/14/20/11/pink-324175_960_720.jpg");
  border: 2px solid #ccc;

 
  font-family:'Quicksand', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
}

#central .Creacion{
  margin-top: 20px;
  margin-bottom: 20px;
  background-image: url("https://image.freepik.com/vector-gratis/fondo-abstracto-formas-blancas_79603-1362.jpg");
  border: 2px solid #ccc;
  width: 100%;
  max-width: 600px;
  font-family:'Quicksand', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
}
#central .Creacion form {
  font-family: 'Quicksand', sans-serif;
}
#central .Creacion input{
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
  width: 78%;
  cursor: pointer;
  padding: 7px 10px;
  height: 20px;
  outline: 0;

  background: #f0f0f0;

  font-size: 1em;
  color: black;
  font-family:
      'Quicksand', sans-serif;
  border:2px solid rgba(0,0,0,0.2);
  border-radius: 12px;
  position: relative;
  transition: all 0.25s ease;
  margin-bottom: 20px;
  margin-top: 20px;
}
#central .Creacion select{
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
  width: 80%;
  cursor: pointer;
  padding: 7px 10px;
  height: 42px;
  outline: 0;

  background: #f0f0f0;
  color: black;
  font-size: 1em;
margin-bottom: 20px;
  margin-top: 20px;
  font-family:'Quicksand', sans-serif;
  border:2px solid rgba(0,0,0,0.2);
  border-radius: 12px;
  position: relative;
  transition: all 0.25s ease;

}

#central .Creacion button {
  border-radius: 30px;
  font-size: 12px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 50px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-image: url("https://www.dhresource.com/0x0/f2/albu/g9/M01/CA/F4/rBVaWF6MElqAfa4CAACDx132CXw700.jpg/blue-wallpapers-simple-modern-abstract-3d.jpg");
  color: white;
}

#central .Creacion button:hover {
  opacity: 0.8;
}
.content-table *{
  font-family:'Quicksand', sans-serif;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
.content-table {
  margin: 10px 70px 70px;
  box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
}
.blueTable{
  border-radius: 5px;
  font-size: 12px;
  font-weight: normal;
  border: none;
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  background-color: white;
}

.blueTable td, .blueTable th {
  text-align: center;
  padding: 8px;
}

.blueTable td {
  border-right: 1px solid #f8f8f8;
  font-size: 12px;
}

.blueTable  th {
  color: #ffffff;
  background: #324960;
}


.blueTable th:nth-child(odd) {
  color: #ffffff;
  background: #324960;
}

.blueTable tr:nth-child(even) {
  background: #F8F8F8;
}



.button-add{
  margin-top: 5px;
  margin-bottom: 5px;
}
.button-clean{
  margin-bottom: 5px;
}
.button-update{
  border-radius: 30px;
  font-size: 12px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 50px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-image: url("https://www.dhresource.com/0x0/f2/albu/g9/M01/CA/F4/rBVaWF6MElqAfa4CAACDx132CXw700.jpg/blue-wallpapers-simple-modern-abstract-3d.jpg");
  color: white;

}
.button-update:hover {
  opacity: 0.8;
}
.button-delete:hover {
  opacity: 0.8;
}

.button-delete{
  border-radius: 30px;
  font-size: 12px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 50px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: #f44336;
  color: white;
  margin-left: 40px;


}

.search-box{
  width: fit-content;
  height: fit-content;
  position: relative;

}
.input-search{
  height: 30px;
  width: 0px;
  border-style: none;
  padding: 10px;
  font-size: 15px;
  letter-spacing: 1px;
  outline: none;
  border-radius: 25px;
  transition: all .5s ease-in-out;
  background-color: #22a6b3;
  padding-right: 40px;
  color:#fff;
}
.input-search::placeholder{
  color:rgba(255,255,255,.5);
  font-size: 15px;
  letter-spacing: 2px;
  font-weight: 100;
}
.btn-search{
  margin-top: 10px;
  width: 50px;
  height: 30px;
  border-style: none;
  font-size: 16px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color:#ffffff ;
  background-color:transparent;
  pointer-events: painted;
}
.button-cancel{
  margin-bottom: 20px;
}
.btn-search:focus ~ .input-search{
  width: 400px;
  border-radius: 12px;
  background-color: #0373C1;
  border-bottom:1px solid rgba(255,255,255,.5);
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
.input-search:focus{
  width: 400px;
  border-radius: 12px;
  background-color: #0373C1;
  border-bottom:1px solid rgba(255,255,255,.5);
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}

</style>