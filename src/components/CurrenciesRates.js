import React, {useState, useEffect}  from 'react'
import axios from 'axios'

import { useParams } from 'react-router-dom'

import { Line } from 'react-chartjs-2'

import Loader from "react-loader-spinner";

export default function CurrenciesRates() {

    // 1. ESTADOS

    // ESTABLECER LOS DATOS PARA LA GRÁFICA
    const [data, setData] = useState({})

    // ESTABLECER LA CARGA DE PÁGINA
    const [loading, setLoading] = useState(true)

    // ESTABLECER LAS FECHAS DE INICIO Y DE TÉRMINO DE BÚSQUEDA
    const [date, setDate] = useState({
        startDate: "2020-01-01",
        endDate: "2020-02-28"
    })

    // ESTABLECER UN MENSAJE EN CASO DE QUE NO EXISTAN DATOS O ESTEN INCOMPLETOS
    const [message, setMessage] = useState(null)

    // OBTENER EL LA DIVISA DE ACUERDO A LA URL
    const { currency } = useParams()


    useEffect(() => {

        const getRatesFromDb = async () => {

            setLoading(true)
            setMessage(null)


            const response = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${currency}`)

            const rates = response.data.rates
            const dateLabels = Object.keys(rates)

            /*
                [ 121.97 , 121.973 , 121.245 ]
            */

            const arrDataRates = dateLabels.map((e) => {
                // rates["2020-01-01"]["CZK"] => 23.3984
                return rates[e][currency]
            })

            // VALIDACIÓN
            if(arrDataRates.includes(undefined)){
                setMessage("No hay datos para esta moneda todavía")
                setLoading(false)
                return
            }

            setData({
                labels: dateLabels,
                datasets: [
                    {
                        label: `Un euro, vale en ${currency} :`,
                        data: arrDataRates,
                        borderColor: "#000a8b",
                        pointBackgroundColor: "#f42534",
                        pointRadius:7
                    }
                ]
            })           

            setLoading(false)
        }

        getRatesFromDb()




    }, [date, currency])


    // 2. FUNCIONES
    const cambiarEstadoFecha = (event) => {

        setDate({
            ...date,
            [event.target.name]: event.target.value
        })
    }


    // 3. RETORNO


    return (
        <div>
            {/* Sección de cambios de fecha */}
            <div>
                <label>Escoge una fecha de inicio</label>
                <input
                    type="date"
                    value={date.startDate}
                    onChange={(e) => {cambiarEstadoFecha(e)}}
                    name="startDate"
                />

                <label>Escoge una fecha de término</label>
                <input
                    type="date"
                    value={date.endDate}
                    onChange={(e) => {cambiarEstadoFecha(e)}}
                    name="endDate"
                />
            </div>
            {/* Sección de la gráfica */}
            <div>
                {

                    loading ?
                    <Loader
                        type="Hearts"
                        color="#f42534"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                    />
                    :
                    message ? message : <Line data={data} options={
                        {
                            responsive: true
                        }
                    } />
                }
                
            </div>

        </div>
    )
}
