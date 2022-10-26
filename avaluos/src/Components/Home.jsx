import React, { useState } from "react"
import Detail from "./Detail"
import Form from './Form'
import '../Styles/Home.css'

export default function Home() {
  const [formData, setFormData] = useState({})

  function setValue(data) {
    console.log(data)
    setFormData(data)
  }

  return (
    <div className='home'>
      <div className='card'>
        <h2>
          Selecciona los datos de tu vehículo para hacerte una cotización
        </h2>
        <div className="form-section">
          <Form onSubmit={setValue} />
        </div>
        {formData.typeAuto && formData.selectedMarca && formData.selectedModel && formData.selectedYear ?
          <div>
            <Detail
              typeAuto={formData.typeAuto}
              selectedMarca={formData.selectedMarca}
              selectedModel={formData.selectedModel}
              selectedYear={formData.selectedYear}
            />
          </div> : <div></div>
        }
      </div>
    </div>

  )
}