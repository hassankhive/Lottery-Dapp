import React from 'react'

const StatsContainer = ({title, value}) => {
    return <div className='flex gap-4'>
        <h3 className='text-white'>{title}</h3>
        <h3 className='text-yellow-400'>{value}</h3>
    </div>
}

export default StatsContainer