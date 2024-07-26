import React, { useRef, useState } from 'react'
import Input from './Input';
import Button from './Button';

const Owner = () => {
    const joiningFeeInput = useRef(null);
    const participantLimitInput = useRef(null);

    const onSubmit = () => {
        alert(joiningFeeInput.current.value);
    }

  return (
    <>
        <div className='flex flex-col gap-2 items-center text-white'>
            <h1 className='text-[50px]'>Owner</h1>
            <Input ref={joiningFeeInput} type={'number'} placeholder={'Enter joining fee'}/>
            <Input ref={participantLimitInput} type={'number'} placeholder={'Enter Participant Limit'}/>
            <Button onClick={onSubmit} text={'Create Lottery'}/>
        </div>
    </>
  )
}

export default Owner