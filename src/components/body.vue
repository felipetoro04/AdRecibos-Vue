<template>
  <div>
  <div  class="content-table" style="margin-top: 20px">
    Bienvenido : {{userEmail}}
  </div>
  <div id='Cuerpo' align="center">
    <Header></Header>
    <h1 v-if="hasError">API no disponible.</h1>

    <div v-else>
      <h1 v-if="loading">Cargando Boletas...</h1>
      <div v-else>
        <h1>Boletas</h1>

        <div >
          <form class="content-data" v-show ="showCR">
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
            <button class="button-add" @click="addReceipt()">Agregar</button>
            <button class="button-clean" @click="clean()">Limpiar</button>
            <button class="button-clean" @click="hideCreation">Cancelar</button>

          </form>
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
            <tr v-for="receipt in receipts" :key="receipt.id">
              <td>
                {{ obtainEnterprice(receipt.idEnterprice) }}
              </td>
              <td>
                {{ receipt.numberReceipt }}
              </td>
              <td>
                {{ receipt.issueDate }}
              </td>
              <td>
                {{ receipt.expirationDate }}
              </td>
              <td>
                {{ receipt.amountPayable }}
              </td>
              <td>
                {{obtainStatus(receipt.idStatus) }}
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
import axios from "axios";
export default {
  name: "Cuerpo",


  data() {
    return {
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
          name: "falabella"
        },
        {
          id: 2,
          name: "paris"
        },
        {
          id: 3,
          name: "ripley"
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
              alert("Boleta Actualizada")
            })
        this.creation = false;

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

.content-data {
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 20px;
  display: grid;
  margin-left: 100px;
  margin-right: 100px;
}

.content-table{
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 20px;
}

table.blueTable {
  border: 1px solid #1C6EA4;
  background-color: #EEEEEE;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table.blueTable td, table.blueTable th {
  border: 1px solid #AAAAAA;
  padding: 3px 2px;
}
table.blueTable tbody td {
  font-size: 13px;
}
table.blueTable tr:nth-child(even) {
  background: #c0bae0;
}
table.blueTable thead {
  background: #1C6EA4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  border-bottom: 2px solid #444444;
}
table.blueTable thead th {
  font-size: 15px;
  font-weight: bold;
  color: #FFFFFF;
  border-left: 2px solid #D0E4F5;
}
table.blueTable thead th:first-child {
  border-left: none;
}

table.blueTable tfoot {
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
  background: #D0E4F5;
  background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
  background: -webkit-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
  background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
  border-top: 2px solid #444444;
}
table.blueTable tfoot td {
  font-size: 14px;
}
table.blueTable tfoot .links {
  text-align: right;
}
table.blueTable tfoot .links a{
  display: inline-block;
  background: #1C6EA4;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 5px;
}

.button-add{
  margin-top: 5px;
  margin-bottom: 5px;
}
.button-clean{
  margin-bottom: 5px;
}
.button-update{
  margin-right: 5px;
}
.button-delete{
  margin-right: 5px;
}
</style>