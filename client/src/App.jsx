import React from 'react'
import Owner from './components/Owner'
import Lottery from './components/Lottery'
import Participant from './components/Participant'

const App = () => {
  return (
    <>
    <div className='m-20 flex flex-col items-center gap-10'>
      <Owner/>
       <DividerLine/>
      <Participant/>
       <DividerLine/>
      <Lottery/>
    </div>
    </>
  )
}

const DividerLine = () => {
  return <div className='w-[100%] h-[1px] bg-white '></div>
}

export default App