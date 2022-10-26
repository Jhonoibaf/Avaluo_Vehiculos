import React, { useEffect, useState } from "react";
import vehiclesService from '../Services/vehicles'
import currencyService from '../Services/currency'
import '../Styles/Detail.css'

export default function Detail(props) {
  const [cuoteDetail, setCuoteDetail] = useState()
  const [showCOP, setShowCOP] = useState(false)

  useEffect(() => {
    if (props.typeAuto && props.selectedMarca && props.selectedModel && props.selectedYear) {
      const getCuoteData = async () => {
        const { data } = await vehiclesService.getCuote({ typeAuto: props.typeAuto, selectedMarca: props.selectedMarca, selectedModel: props.selectedModel, selectedYear: props.selectedYear })
        const { data: currencyData } = await currencyService.getRate()
        let taxPercetange = 0
        let totalTax = 0
        const valorString = data.Valor.split(' ')[1]
        const valor = parseInt(valorString.replace('.', ''));

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

        const priceCOP = currencyData.data.COP.value * valor
        const formatedPrice = new Intl.NumberFormat('es-ES', {style:'currency', currency:'COP'}).format(priceCOP)
        setCuoteDetail({
          ...data,
          totalTax: totalTax.toFixed(1),
          taxPercetange,
          priceCOP: formatedPrice
        })
        console.log(currencyData);
      }
      getCuoteData()
    }
  }, [props])

  function handleClick(e) {
    e.preventDefault()
    setShowCOP(true)
  }

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
            <button onClick={(e) => handleClick(e)}>Cambiar a COP</button>
            { showCOP ? <div > <b>Valor en pesos:</b> {cuoteDetail.priceCOP}</div> : <div/>}
            <div> <b>Impuesto {cuoteDetail.taxPercetange}%:</b> R$ {cuoteDetail.totalTax} </div>
          </div> :
          <div>
            ...Loading
          </div>
      }
    </div>

  )
}