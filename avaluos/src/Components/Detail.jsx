import React, { useEffect, useState } from "react";
import vehiclesService from '../Services/vehicles'
import '../Styles/Detail.css'

export default function Detail(props) {
  const [cuoteDetail, setCuoteDetail] = useState()

  useEffect(() => {
    if (props.typeAuto && props.selectedMarca && props.selectedModel && props.selectedYear) {
      const getCuoteData = async () => {
        const { data } = await vehiclesService.getCuote({ typeAuto: props.typeAuto, selectedMarca: props.selectedMarca, selectedModel: props.selectedModel, selectedYear: props.selectedYear })
        let taxPercetange = 0
        let totalTax = 0
        const valorString = data.Valor.split( ' ' )[1]
        const valor = parseInt(valorString.replace( '.' , ''));

        if (data.Combustivel === 'Gasolina') {
          taxPercetange = 5
          totalTax = valor * taxPercetange / 100
        }
        if (data.Combustivel === 'Diesel') {
          taxPercetange = 2.5
          totalTax = valor * taxPercetange / 100
        }
        if (data.Combustivel === 'Elétrico') {
          taxPercetange = 2.5
          totalTax = valor * taxPercetange / 100
        }

        setCuoteDetail({...data, totalTax: totalTax.toFixed(1), taxPercetange})
      }
      getCuoteData()
    }
  }, [props])

  return (
    <div className="detail">
      {
        cuoteDetail ?
          <div className="card-detail">
            <h3>Este es avalúo de tu vehículo</h3>
            <div><b>Marca:</b> {cuoteDetail.Marca}</div>
            <div> <b>Modelo:</b> {cuoteDetail.Modelo}</div>
            <div> <b>Año:</b> {cuoteDetail.AnoModelo}</div>
            <div> <b>Combustible:</b> {cuoteDetail.Combustivel}</div>
            <div> <b>Valor:</b> {cuoteDetail.Valor} </div>
            <div> <b>Impuesto {cuoteDetail.taxPercetange}%:</b> R$ {cuoteDetail.totalTax} </div>
          </div> :
          <div>
            ...Loading
          </div>
      }
    </div>

  )
}