import React, { useEffect, useRef, useState } from "react";
import "../css/layout.css";
import css from "../Modulecss/Home.module.css";
import axios from "axios";
import Swal from "sweetalert2";
//import Rightcontainer from "../Components/Rightcontainer";
// import { useNavigate } from 'react-router-dom'
import BattleCard from "./Battelcard";
import BetCard from "./BetCard";
import RunningCard from "./RunningCard";
import Header from "../Components/Header";
import socket from "./socketconnection"
import cssp from "../css/Battellist.css"
import { useParams, useLocation ,useHistory} from 'react-router-dom';
//import { Alert } from "@mui/material";3 


export default function HomepageGame({ walletUpdate }) {
  const Location = useLocation();
  const history = useHistory();
  const [pending,setPending] = useState(null);
  //const history = useHistory();
  //   let userID = useRef();
  //   const isMounted = useRef(true);
  // const socket = getSocket();
  const beckendLocalApiUrl = process.env.REACT_APP_BACKEND_LOCAL_API;
  const beckendLiveApiUrl = process.env.REACT_APP_BACKEND_LIVE_API;
  const nodeMode = process.env.NODE_ENV;
  if (nodeMode === "development") {
    var baseUrl = beckendLocalApiUrl;
  } else {
    baseUrl = beckendLiveApiUrl;
  }

  useEffect(()=>{
    const baseUrl = process.env.REACT_APP_BACKEND_LIVE_API;
    async function fatchPendingGameData(){
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(baseUrl+'pendingClassicGame',{},{headers}).then((res)=>{
        console.log('pending game',res.data)
        if(res.data.game){
          console.log('hello',res.data.game)
          setPending(res.data.game);
        }
      })
    }
    fatchPendingGameData();
  },[]);

  useEffect(()=>{
 console.log(pending,'pending');
  },[pending])
  const { game }  = Location.state.state;
  console.log(game,'game')
  function handleGameClick(Fee) {
    const { game }  = Location.state.state;
    // const token = localStorage.getItem("token");
    // console.log(Fee);
    // socket.emit("joinBet",{betAmount:Fee,token})
    history.push(`/ludoGame/betstage`, { state: { betAmount: Fee,game} });
  }

  const handelclickForRejoin = () => {
    const gameId = localStorage.getItem("gameId");
    console.log("local storage game Id ", gameId)
    socket.emit("rejoin", { gameId }, () => {
      console.log("socket id ", socket.id)
    })
  }

  // socket.on("playerJoined", (msg) => {
  //   console.log(msg);
  // });

  // useEffect(() => {
  //     let access_token = localStorage.getItem("token");
  //     access_token = localStorage.getItem("token");
  //     if (!access_token) {
  //       window.location.reload();
  //       setTimeout(() => {
  //         //  history.push("/login")
  //       }, 500);
  //     }
  //     role();
  //     if (mount) {
  //     //   Allgames();
  //     //   runningGame();
  //     }
  //   }, [mount]);

  /// user details end



  return (
    <>
      <div className="leftContainer" style={{ minHeight: "100vh" }}>
        <div
          className={css.mainArea}
          style={{ paddingTop: "60px", minHeight: "100vh" }}
        >
          <div className="battle-list">
            {/* {pending?
            <div className="open-battles">
            <h2>Your Open Battles</h2>
            <div className="battle-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: "auto", borderBottom: '.3px solid #ec97a561', width: '100%', padding: '6px 16px' }}>
                <div className='playing_now'>Playing for<img src='/Images/battleCard/cash.png' style={{ width: '26px' }}></img>3</div>
                <div className='betcard_buttton' onclick={handleContinueGame}>VIEW</div>
              </div>
              <div style={{padding:'7px',display:'flex',alignItems:'center',justifyContent:"space-between",padding:'6px 16px 6px 16px'}}>
                <div style={{textAlign:'center'}}>
                <img src="/user.png" width={"40px"}></img>
                <div style={{fontSize:'13px'}}>duen_239euwkW</div>
                </div>
                <img src="/user.png" width={"40px"}></img>
                <div style={{textAlign:'center'}}>
                <img src="/user.png" width={"40px"}></img>
                <div style={{fontSize:'13px'}}>duen_239euwkW</div>
                </div>
              </div>

            </div>
          </div>:''
            } */}
            
            <div className="battles">
              <h2>Battles</h2>
              <BattleCard prizePool={5} playingNow={36} waitingNow={1} entryFee={3} handleGameClick={handleGameClick} />
              <BattleCard prizePool={20} playingNow={20} waitingNow={1} entryFee={12} handleGameClick={handleGameClick} />
              <BattleCard prizePool={50} playingNow={14} waitingNow={0} entryFee={29} handleGameClick={handleGameClick} />
              <BattleCard prizePool={100} playingNow={18} waitingNow={0} entryFee={59} handleGameClick={handleGameClick} />
            </div>
          </div>
        </div>
      </div>



    </>
  );
}
