import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import "./Sidebar.css"


export default function Sidebar() {

    // 1. ESTADOS
    // ESTABLECER EL LISTADO DE TODAS LAS DIVISAS
    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        
        // FUNCIÓN DECLARADA
        const getCurrenciesFromDB = async () => {
            const response      = await axios.get("https://api.exchangerate.host/latest")
            const data          = response.data.rates
            const arrData       = Object.keys(data)
    
            setCurrencies(arrData)
        }
        
        // INVOCAR LA FUNCIÓN
        getCurrenciesFromDB()
        
    }, [])


    // 2. FUNCIONES



    // 3. RETORNO

    return (
        <div>
            <h1>
                ¿Cuánto vale esta moneda en USD?
            </h1>
            <nav>
                {
                    currencies.map((e, i) => {

                        return (
                            <Link key={i} to={`/${e}`} >
                                <p><span>ÍCONO</span>{e}</p>
                            </Link>
                        )
                    })
                }
            </nav>
        </div>
    )
}
