import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';


const BattleCard = ({ playingFor, player1, player2, prizePool, playingNow, waitingNow, entryFee, onClick, onClick2,handleGameClick}) => {
  // const socket = io("http://localhost:5000")
  const [GamePrize, SetGamePrize] = useState();

  const handleClick = (e) => {
    // e.preventDefault();
    //         SetGamePrize(entryFee);
    onClick(entryFee);
    // socket.emit("NewPlayer",GamePrize,socket.id)
  }
  const hanleclickRejoin = () => {
    onClick2();
  }

  return (
    <div className="battle-card">
      {/* {playingFor ? (
        <div className="open-battle">
          <span>PLAYING FOR</span>
          <span className="playing-for">{playingFor}</span>
          <div className="players">
            <span>{player1}</span>
            <span>VS</span>
            <span>{player2}</span>
          </div>
          <button className="view-button" onClick = {hanleclickRejoin}>VIEW</button>
        </div>
      ) : (
        <div className="battle">
          <div className="prize-pool">PRIZE POOL {prizePool}</div>
          <div className="playing-now">{playingNow} PLAYING NOW</div>
          {waitingNow ? <div className="waiting-now">{waitingNow} WAITING NOW</div> : null}
          <button className="entry-button" onClick= {handleClick}>₹{entryFee}</button>
        </div>
      )} */}
      <div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:"0 16px"}}>
        <div className='price_pool'>PRICE POOL</div>
        <div className='entry'>ENTRY</div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:"0 16px 8px 16px"}}>
        <div>
          <img src='/Images/battleCard/cash.png' style={{width:'26px'}}></img>
          <span className='price_span'>{prizePool}</span>
        </div>
        <div className='betcard_buttton' onClick={()=>{handleGameClick(entryFee)}}>₹{entryFee}</div>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:"auto", borderTop: '.3px solid #ec97a561',width:'100%',padding:'6px 16px'}}>
       <div className='playing_now'>{playingNow} PLAYING NOW</div>
       <div className='waiting_now'>{waitingNow} WAITING NOW</div>
      </div>

    </div>
  );
};

export default BattleCard;
