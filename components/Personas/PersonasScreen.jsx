import React from 'react'
import { useState, useEffect } from 'react'

export const PersonasScreen = () => {
    const [dataa, setData] = useState()

    useEffect(async () => {
        const res = await fetch('https://localhost:7286/api/people')
        const data = await res.json()
        setData(data)
    }, [])

    return (
        <div>
            <h1>Personas</h1>
            <hr />

            {
                data.map(() => (
                    <div>
                        
                    </div>
                ))
            }
        </div>
    )
}
