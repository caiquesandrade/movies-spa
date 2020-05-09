<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">NETFLY MOVIES</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          The field <b>{{ erro.value }}</b> - {{ erro.message }}
        </li>
      </ul>
      
      <form @submit.prevent="create">

          <label>Name</label>
          <input type="text" placeholder="Name" v-model="movie.name">
          <label>Description</label>
          <input type="text" placeholder="Description" v-model="movie.description">
          <label>Genre</label>
          <input type="text" placeholder="Genre" v-model="movie.gender">
          <label>Week</label>
          <input type="number" placeholder="Week" v-model="movie.week" required>

          <button class="waves-effect waves-light btn-small">Save<i class="material-icons left">save</i></button>

      </form>

      <div class="input-field col s12">
        <select>
          <option value="" disabled selected>Choose a week</option>
          <option v-for="movie of movies" :key="movie.id" :value="movie.week">{{ movie.week }}</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>GENRE</th>
            <th>WEEK</th>
            <th>OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie of movies" :key="movie.id">
            <td>{{ movie.name }}</td>
            <td>{{ movie.description }}</td>
            <td>{{ movie.gender }}</td>
            <td>{{ movie.week }}</td>
            <td>
              <button @click="edit(movie)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remove(movie)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>

import Movie from './services/movies'

export default {

  data(){
    return {
      movie: {
        id: '',
        name: '',
        description: '',
        gender: '',
        week: ''
      },

      movies: [],
      errors: []
    }
  },

  mounted() {
      this.list()
  },

  methods: {

    list() {
      Movie.list().then(response => {
      this.movies = response.data.data
    })
    },

    create() {

      if(!this.movie.id)
      {
        Movie.create(this.movie).then(response => {
          var movieName = response.data.data.name
          if(response.data.code >= 300) 
          {
            this.errors = response.data.data
          } else {
            this.movie = {}
            alert('Movie ' + movieName + ' created !')
            this.list() 
            this.errors = []
          }
        })

      } else {
        Movie.uptade(this.movie).then(response => {
          var movieName = response.data.data.name
          if(response.data.code >= 300) 
          {
            this.errors = response.data.data
          } else {
            this.movie = {}
            alert('Movie ' + movieName + ' updated !')
            this.list() 
            this.errors = []
          }
        })
      }
    },

    edit(movie) {
      this.movie = movie
    },

    remove(movie) {
      Movie.delete(movie).then(response => {
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
