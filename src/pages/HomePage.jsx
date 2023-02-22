import React, { useContext } from 'react'
import { Card } from '../components/Card';
import { UserContext } from '../UserContext'

export const HomePage = () => {
    const { dataa } = useContext(UserContext);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            {
                
            }

        </div>
    )
}
