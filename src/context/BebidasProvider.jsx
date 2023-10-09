import { createContext, useEffect, useState } from "react" 
import axios from "axios"

const BebidasContext = createContext() 

const BebidasProvider = ({children}) => { 

    const [bebidas , setBebidas] = useState([])
    const [modal , setModal] = useState(false)
    const [bebidaId , setBebidaId] = useState(null)
    const [receta , setReceta] = useState({})
    const [cargando , setCargando] = useState(false)

    useEffect(() => {
        const obtenerReceta = async () => {
            setCargando(true)
            if(!bebidaId) return

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const {data} = await axios(url)
                setReceta(data.drinks[0])
            } catch (error) {
                console.log(error)
            } finally {
                setCargando(false)
            }
            setCargando(false)
        }
        obtenerReceta()
    },[bebidaId])

    const consutlarBebidas = async datos => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
            const {data} = await axios(url)
            setBebidas(data.drinks)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalClick = () => {
        setModal(!modal)
    }

    const handlebebidaidClick = id => {
        setBebidaId(id)
    }

    return ( 
        <BebidasContext.Provider 
            value={{ 
                consutlarBebidas,
                bebidas,
                handleModalClick,
                modal,
                handlebebidaidClick,
                receta,
                cargando
            }} 
        > 
            {children} 
        </BebidasContext.Provider> 
    ) 
} 

export { 
    BebidasProvider 
} 

export default BebidasContext 