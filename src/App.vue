<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper black darken-1">
        <a href="#" class="brand-logo center">CADASTRO DE CLIENTES</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          The field <b>{{ erro.value }}</b> - {{ erro.message }}
        </li>
      </ul>
      
      <form @submit.prevent="create">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="costumer.nome">
          <label>Data de Nascimento</label>
          <input type="text" class="datepicker" placeholder="Data de Nascimento" v-model="costumer.data_de_nascimento">
          <label>Sexo</label>
          <input type="text" placeholder="Sexo" v-model="costumer.sexo">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Sexo</th>
            <th>Data da Criação</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="costumer of costumers" :key="costumer.id">
            <td>{{ costumer.nome }}</td>
            <td>{{ costumer.data_de_nascimento }}</td>
            <td>{{ costumer.sexo }}</td>
            <td>{{ costumer.criado_em }}</td>
            <td>
              <button @click="edit(costumer)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remove(costumer)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>

import Costumer from './services/costumers'

export default {

  data(){
    return {
      costumer: {
        id: '',
        nome: '',
        data_de_nascimento: '',
        sexo: ''
      },

      costumers: [],
      errors: []
    }
  },

  mounted() {
      this.list()
  },

  methods: {

    list() {
      Costumer.list().then(response => {
      this.costumers = response.data.data
    })
    },

    create() {

      if(!this.costumer.id)
      {
        Costumer.create(this.costumer).then(response => {
          var costumerNome = response.data.data.nome
          if(response.data.code >= 300) 
          {
            this.errors = response.data.data
          } else {
            this.costumer = {}
            alert('Costumer ' + costumerNome + ' created !')
            this.list() 
            this.errors = []
          }
        })

      } else {
        Costumer.uptade(this.costumer).then(response => {
          var costumerNome = response.data.data.nome
          if(response.data.code >= 300) 
          {
            this.errors = response.data.data
          } else {
            this.costumer = {}
            alert('Costumer ' + costumerNome + ' updated !')
            this.list() 
            this.errors = []
          }
        })
      }
    },

    edit(costumer) {
      this.costumer = costumer
    },

    remove(costumer) {
      Costumer.delete(costumer).then(response => {
        if(response.data.code >= 300) 
          {
            this.errors = response.data.data
          } else {
            this.list();
            this.errors = [];
          }
      })
    }

  }

}

</script>

<style>

</style>
