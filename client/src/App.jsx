import React, { useEffect, useState } from 'react'
import Owner from './components/Owner'
import Lottery from './components/Lottery'
import Participant from './components/Participant'
import { ethers } from 'ethers'
import StatsContainer from './components/StatsContainer'
import { contractABI, contractAddress } from './util/constant'

const App = () => {
  const [contract, setContract] = useState();
  const [address, setAddress] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  const connectBlockchain = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);
    
    window.ethereum.on('accountsChanged', (accounts) => {
      setAddress(accounts[0]);
    });
  }

  const initContract = async ()=>{
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contractInstance);
    setIsOwner(await contractInstance.isOwner());

    contractInstance.on('LotteryCreated', (joinFee, joinLimit) => {
      console.log('LotteryCreated event:', joinFee.toString(), joinLimit.toString());
    });
    contractInstance.on('ParticipantJoined', (address, balance) => {
      console.log('LotteryCreated event:', address.toString(), balance.toString());
    });
    contractInstance.on('WinnerAnnounced', (address) => {
      console.log('LotteryCreated event:', address.toString());
    });
  }

  useEffect(() => {
    connectBlockchain();
    initContract();
  },[]);
  useEffect(() => {
    initContract();
  }, [address]);

  return (
    <>
    <div className='m-20 flex flex-col items-center gap-10'>
      <StatsContainer title={'Address: '} value={address}/>
      {
        isOwner ? (
          <Owner contract={contract}/>
        ) : (
          <Participant contract={contract}/>
        )
      }
       <DividerLine/>
      
      <Lottery contract={contract}/>
    </div>
    </>
  )
}

const DividerLine = () => {
  return <div className='w-[100%] h-[1px] bg-white '></div>
}

export default App