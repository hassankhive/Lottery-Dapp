import React, { useRef } from 'react'
import Button from './Button';
import Input from './Input';

const Participant = () => {
    const addressInput = useRef();
    const onJoin = () => {
        alert(addressInput.current.value);
    }

  return (
    <div className='text-white flex flex-col items-center gap-2'>
        <h1 className='text-[50px]'>Participant</h1>
        <Input type={'text'} placeholder={"Enter Participant Address"} ref={addressInput}/>
        <Button onClick={onJoin} text={'Join Lottery'}/>
    </div>
  )
}

export default Participant