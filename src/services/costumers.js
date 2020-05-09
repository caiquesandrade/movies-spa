import { http } from './config'

export default {

    list:() => {
        return http.get('costumers')
    },

    create:(costumer) => {  
        return http.post('costumers', costumer)
    },

    uptade:(costumer) => {
        return http.put('costumers/'+costumer.id, costumer)
    },

    delete:(costumer) => {
        return http.delete('costumers/'+costumer.id)
    }

}

