import React, { useEffect,useRef } from 'react';
import socket from './socketconnection';
import { useParams, useLocation ,useHistory} from 'react-router-dom';

const BetStage = () => {
    const Location = useLocation();
    const history = useHistory();
    const prevLocation = useRef(null);

    useEffect(() => {

      const handleBackNavigation = () => {
        socket.emit('userLeaving');
      };
  
      const unlisten = history.listen((location, action) => {
        // Check if the navigation was a back navigation
        if (action === 'POP' && prevLocation.current !== location.pathname) {
          handleBackNavigation();
        }
        prevLocation.current = location.pathname; // Update previous location
      });
  
      // Cleanup on unmount
      return () => {
        const playerId = localStorage.getItem('playerId')
        unlisten();
        socket.emit('userLeaving',playerId); // Optionally emit on unmount
      };
    }, [socket, history]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const token = localStorage.getItem("token");
            const {betAmount,game} = Location.state.state;
            console.log(betAmount,Location.state,'data')
            socket.emit("joinBet",{betAmount,token,game})
        }, 3000);
    
        // Cleanup timeout on unmount
        return () => {
          clearTimeout(timeoutId);
        };
      }, []);

      useEffect(()=>{
        socket.on("startGame",(msg)=>{
            console.log('start game')
            console.log(msg);
            localStorage.setItem("gameId",msg.gameId);
            const {game} = Location.state.state;
           history.push(`/ludo/${msg.gameId}`, { state: { Data: msg,game} });
        })
    
    
        return ()=>{
            socket.off("startGame")
        }
    },[socket])

    socket.on("OnePlayer", (msg) => {
        localStorage.setItem("playerId", msg.playerId);
        console.log("searching for your partner", msg);
      });
    
  
  socket.on("playerJoined",(msg)=>{
      localStorage.setItem("playerId",msg.playerId);
      console.log("when both two player is meets",msg)
  })
  
    
    
  return (
    <div className="leftContainer" style={{ minHeight: "100vh" }}>
    <div style={{background:"black",display:"flex",alignItems:'center',justifyContent:'center',width:'100%',height:'100vh'}}>
       <img src='/Images/finding.gif' style={{display:'block',width:"75%",margin:"auto"}}></img>
    </div>
    </div>
  )
}

export default BetStage;