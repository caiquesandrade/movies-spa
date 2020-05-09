import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://costumers.dev.com.br/api/'
});