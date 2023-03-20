import { Fragment } from 'react'
import { marcas, years, planes } from '../constants/index'
import useCotizador from '../hooks/useCotizador'
import Error from './Error'

function Formulario() {

    const { handleChangeDatos, datos, error, setError, cotizarSeguro } = useCotizador()

    const handleSubmit = e => {
        e.preventDefault()

        //Validar
        if(Object.values(datos).includes('')){
            setError('Todos los Campos son Obligatorios!')
            return
        }

        setError('')

        cotizarSeguro()
    }

  return (
    <>
        {error && <Error /> }
        <form
            onSubmit={handleSubmit}
        >
            <div>
                <label className='block mb-3 font-bold text-gray-400 uppercase'>Marca</label>
                <select
                    name='marca'
                    className='w-full p-3 bg-white border border-gray-200'
                    onChange={ e => handleChangeDatos(e)}
                    value={datos.marca}
                >
                    <option value = "">-- Selecciona la Marca --</option>
                    {marcas.map(marca => (
                        <option
                            key={marca.id}
                            value={marca.id}
                        >
                            {marca.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className='block mb-3 font-bold text-gray-400 uppercase'>Año</label>
                <select
                    name='year'
                    className='w-full p-3 bg-white border border-gray-200'
                    onChange={ e => handleChangeDatos(e)}
                    value={datos.year}
                >
                    <option value = "">-- Selecciona año --</option>
                    {years.map(year => (
                        <option
                            key={year}
                            value={year}
                        >
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className='block mb-3 font-bold text-gray-400 uppercase'>Plan</label>
                <div className='flex gap-3'>
                    {planes.map(plan => (
                        <Fragment key={plan.id}>
                            <label>{plan.nombre}</label>
                            <input
                                type='radio'
                                name="plan"
                                value={plan.id}
                                onChange={ e => handleChangeDatos(e)}
                            />
                        </Fragment>
                    ))}
                </div>
            </div>

            <input
                type="submit"
                className = "w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold"
                value = "Cotizar"
            />
        </form>
    </>
  )
}

export default Formulario