import axios from 'axios'

//console.log(process.env.API_HOST);
const connection = axios.create({ baseURL: 'https://api.currencyapi.com/v3/' })

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    getRate() {
        return connection.get('latest/?apikey=hq6xNSPXMEW5enRB6ntsoxBfHsDruH2QnH4XMmjM&base_currency=BRL&currencies=COP')
    }
}