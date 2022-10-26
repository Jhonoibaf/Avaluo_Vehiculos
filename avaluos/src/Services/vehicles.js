import axios from 'axios'

//console.log(process.env.API_HOST);
const connection = axios.create({ baseURL: 'https://parallelum.com.br/fipe/api/v1' })

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getMarcas({ typeAuto }) {
    return connection.get(`/${typeAuto}/marcas`)
  },
  getModels({ typeAuto, selectedMarca }) {
    return connection.get(`/${typeAuto}/marcas/${selectedMarca}/modelos`)
  },
  getYears({ typeAuto, selectedMarca , selectedModel}){
    return connection.get(`/${typeAuto}/marcas/${selectedMarca}/modelos/${selectedModel}/anos`)
  },
  getCuote({ typeAuto, selectedMarca , selectedModel, selectedYear}){
    return connection.get(`/${typeAuto}/marcas/${selectedMarca}/modelos/${selectedModel}/anos/${selectedYear}`)
  }
}
