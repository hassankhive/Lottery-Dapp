import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import Input from './Input';
import StatsContainer from './StatsContainer';

const Participant = ({contract}) => {
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const onJoin = async () => {
    const joinFee = (await contract.joiningFee()).toNumber();
    const transaction = await contract.joinLottery({value:joinFee});
    const receipt = await transaction.wait();

    if(receipt.status == 1)
    {
      console.log("Joined successfully!");
      setAlreadyJoined(true);
    }
    else
    {
      console.error("Joining failed " + receipt);
    }
  }

  useEffect(() => {
    const init = async () => {
      setAlreadyJoined(await contract.hasAlreadyJoined());
    }

    if(contract) init();
  }, [contract])

  return (
    <div className='text-white flex flex-col items-center gap-2'>
        <h1 className='text-[50px]'>Participant</h1>
        {
          !alreadyJoined ? (
            <Button onClick={onJoin} text={'Join Lottery'}/>

          ) : (
            <StatsContainer value={"Already joined!"}/>
          )
        }
    </div>
  )
}

export default Participant