import React, { useEffect, useState } from "react";
import vehiclesService from '../Services/vehicles'
import validation from "../Validation/validation";
import '../Styles/Form.css';

export default function Form(props) {
  const [typeAuto, setTypeAuto] = useState('')
  const [marcas, setMarcas] = useState([])
  const [selectedMarca, setSelectedMarca] = useState('')
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState('')
  const [yearsData, setYearsData] = useState([])
  const [selectedYear, setSelectedYear] = useState('')
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})


  useEffect(() => {
    if (step === 0 && typeAuto) {
      const getMarcasByType = async () => {
        const { data } = await vehiclesService.getMarcas({ typeAuto })
        setMarcas(data)
      }
      getMarcasByType()
    }
    if (step === 1 && selectedMarca) {
      const getModelsByMarca = async () => {
        const { data } = await vehiclesService.getModels({ typeAuto, selectedMarca })
        setModels(data.modelos)
      }
      getModelsByMarca()
    }
    if (step === 2 && selectedModel) {
      const getModelsByMarca = async () => {
        const { data } = await vehiclesService.getYears({ typeAuto, selectedMarca, selectedModel })
        setYearsData(data)
      }
      getModelsByMarca()
    }
  }, [typeAuto, selectedMarca, selectedModel])

  function handleSelectType(e) {
    setTypeAuto(e.target.value)
    setSelectedMarca('')
    setStep(0)
  }
  function handleSelectMarca(e) {
    setSelectedMarca(e.target.value)
    setStep(1)
  }

  function handleSelectModel(e) {
    setSelectedModel(e.target.value)
    setStep(2)
  }

  function handleSelectYear(e) {
    setSelectedYear(e.target.value)
    setStep(3)
  }

 
  function handleSubmit(e) {
    e.preventDefault()
    const dataForm = { typeAuto, selectedMarca, selectedModel, selectedYear }
    
    const currentErrors = validation(dataForm)

     if (Object.keys(errors).length > 0 || Object.keys(currentErrors).length > 0) {
      alert('Selecciona todos los datos requeridos para la cotización')
      return
    } 

    props.onSubmit({ typeAuto, selectedMarca, selectedModel, selectedYear })

  }

  function clearData (e) {
    e.preventDefault()
    setTypeAuto('')
    setSelectedMarca('')
    setSelectedModel('')
    setSelectedYear('')
    const typeAutoSelect = document.getElementById('typeAutoSelect')
    const selectedMarcaSelect = document.getElementById('selectedMarcaSelect')
    const selectedModelSelect = document.getElementById('selectedModelSelect')
    const selectedYearSelect = document.getElementById('selectedYearSelect')
    typeAutoSelect.value = 'DEFAULT'
    selectedMarcaSelect.value = 'DEFAULT'
    selectedModelSelect.value = 'DEFAULT'
    selectedYearSelect.value = 'DEFAULT'
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <select id="typeAutoSelect" name="typeAuto" defaultValue={'DEFAULT'} onChange={(e) => handleSelectType(e)} >
            <option value="DEFAULT">Secciona tipo de vehículo</option>
            <option value="carros">Carro</option>
            <option value="motos">Moto</option>
            <option value="caminhoes">Camión</option>
          </select>
        </div>
        <div>
          <select id="selectedMarcaSelect" name="selectedMarca" defaultValue={'DEFAULT'} onChange={(e) => handleSelectMarca(e)} >
            <option value="DEFAULT">Selecciona la marca</option>
            {
              marcas.map(marca => (
                <option key={marca.codigo} value={marca.codigo} >{marca.nome}</option>
              ))
            }
          </select>
        </div>
        <div>
          <select id="selectedModelSelect" name="selectedModel" defaultValue={'DEFAULT'} onChange={(e) => handleSelectModel(e)} >
            <option value="DEFAULT">Selecciona el modelo</option>
            {
              models.map(model => (
                <option key={model.codigo} value={model.codigo} >{model.nome}</option>
              )
              )
            }
          </select>
        </div>
        <div>
          <select id="selectedYearSelect" name="selectedYear" defaultValue={'DEFAULT'} onChange={(e) => handleSelectYear(e)} >
            <option value="DEFAULT">Selecciona el año</option>
            {
              yearsData.map(year => (
                <option key={year.codigo} value={year.codigo} >{year.nome}</option>
              )
              )
            }
          </select>
        </div>
        <button className="submit-button" type='submit' >Cotizar mi vehículo</button>
        <br />
        <button className="clear-button" onClick={(e) => clearData(e)} >Limpiar</button>
      </form>
    </div>

  )
}