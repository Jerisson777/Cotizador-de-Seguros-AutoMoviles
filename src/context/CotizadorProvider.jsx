import { createContext, useState } from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearMonto } from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })
    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
       
    }
    const cotizarSeguro = () => {
        //Base
        let resultado = 2000

        //Obtener la diferencia
        const diferencia = obtenerDiferenciaYear(datos.year)

        //restar el 3% por año 
        resultado -= ((diferencia * 3 ) * resultado) / 100 

        //Americano 15%
        //Europeo 30%
        //Asiatico 5%
        resultado *= calcularMarca(datos.marca)

        console.log(resultado)

        //Basico 20%
        //Completo 50%
        resultado *= calcularPlan(datos.plan)
        
        //Formatear el monto

        resultado = formatearMonto(resultado)

        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 2000)

    } 
    

    return(
        <CotizadorContext.Provider
            value={{
                datos,
                error,
                resultado,
                handleChangeDatos,
                setError,
                cotizarSeguro,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}
export default CotizadorContext