import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://movie-api.dev.com.br/api/'
});