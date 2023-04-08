import { useState } from 'react'

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const reset = () => { setValues(initialState) }

  const handleInputChange = (e) => {
    if(e.target.name === 'file'){
      // const file = e.target.files[0]
      // const filePath = URL.createObjectURL(file)

      setValues({
        ...values,
        [e.target.name]: e.target.files[0]
      })
    } else{
      setValues({
        ...values, // por si hay valores del objeto que no hemos cambiado
        [e.target.name]: e.target.value // para reescribir el valor del campo con el mismo nombre que el name del input, si no tiene el mismo va a crear otro
      })
    }

    console.log(values)
  }

  return [values, handleInputChange, reset]
}
