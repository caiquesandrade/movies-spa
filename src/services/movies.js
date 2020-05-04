import { http } from './config'

export default {

    list:() => {
        return http.get('movies')
    },

    create:(movie) => {
        return http.post('movies/', movie)
    },

    uptade:(movie) => {
        return http.put('movies/'+movie.id, movie)
    },

    delete:(movie) => {
        return http.delete('movies/'+movie.id)
    },

    week:(movie) => {
        return http.delete('movies/week-movie'+movie.week)
    }


}

