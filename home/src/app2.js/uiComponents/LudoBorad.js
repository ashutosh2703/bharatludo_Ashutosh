
import React, { useState, useEffect, useRef } from 'react';
import "../css/layout.css";
import css from "../Modulecss/Home.module.css";
import PlayerPiece from './PlayerPiece';
import { BASE_POSITIONS, HOME_ENTRANCE, HOME_POSITIONS, PLAYERS, SAFE_POSITIONS, START_POSITIONS, STATE, TURNING_POINTS } from './constants';
// import socket from './socket';
import cssp from "../css/LudoBorad.css"
import { useParams, useLocation,useHistory} from 'react-router-dom';
import socket from './socketconnection';


const LudoBoard = () => {
    let [myturn,setMyturn] = useState(true);
    let [,setRender] = useState(0);
    let [isPeiceClicked,setIsPeiceClicked] = useState(false);
    let autoIncrement = useRef(false);
    let autoDiceRoll = useRef(true);
    // let autoInterval ;
    useEffect(() => {
        const changeTurn = ()=>{
            setMyturn((prev)=>!prev);
            autoDiceRoll.current = true;
        }
        socket.on('offTurn', () => {
           setMyturn(false);
           autoDiceRoll.current = true;
        });
        socket.on('changeTurn',changeTurn);
        return () => {
            socket.off("offTurn");
            socket.off("changeTurn");
        }
    }, [])
    const Location = useLocation();
    const history = useHistory();
    const {game} = Location.state.state;

    useEffect(() => {
        const handleBack = (event) => {
          event.preventDefault(); // Prevent default browser back behavior
          history.go(-1); // Skip one previous route (go back two entries in history)
        };
    
        window.addEventListener("popstate", handleBack);
    
        // Cleanup listener on unmount
        return () => {
          window.removeEventListener("popstate", handleBack);
        };
      }, [history]);
    
    const { gameId } = useParams();
    // let [currentPositions, setCurrentPositions] = useState({
    //     P1: [...BASE_POSITIONS.P1],
    //     P2: [...BASE_POSITIONS.P2]
    // })
    let currentPositions = useRef({
           P1: [...BASE_POSITIONS.P1],
           P2: [...BASE_POSITIONS.P2]
        })
    // useState(Data.gameState.Poistion);
    // const [diceValue, setDiceValue] = useState(1);
const diceValue = useRef(1);
    // (Data.gameState.dice);
    const [turn, setTurn] = useState(0)
    // (Data.gameState.turn);
    const [state, setState] = useState({...STATE}.DICE_NOT_ROLLED);
    const [isSpinning, setIsSpinning] = useState(false);

    // useEffect(() => {
    //   resetGame();
    // }, []);
    const resetGame = () => {
        // setCurrentPositions({
        //     P1: [...BASE_POSITIONS.P1],
        //     P2: [...BASE_POSITIONS.P2]
        // });
        currentPositions.current = {
               P1: [...BASE_POSITIONS.P1],
                 P2: [...BASE_POSITIONS.P2]
             }

        setTurn(0);
        setState(STATE.DICE_NOT_ROLLED);
    };

    const onDiceClick = () => {
        autoDiceRoll.current = false;
        setState({...STATE}.DICE_ROLLED);
        console.log('dice clicked by player step1')
        if (!myturn) {
            console.log('step1 not myturn')
            return;
        }
        setIsPeiceClicked(false);
        const player = localStorage.getItem("playerId")
        const roll = 1 + Math.floor(Math.random() * 6);
        console.log('step 1  -- myturn')
        socket.emit("Dice-Value", { gameId,roll,diceValue:diceValue.current,player})
    };

    useEffect(() => {
        socket.on("DiceValueClient", (msg) => {
            console.log('dice click event received from server');
            setIsSpinning(true);
            autoIncrement.current = true;
            const audio = new Audio('/images/dicerolling.mp3');
            audio.play();

            setTimeout(() => {
                // setDiceValue(msg.roll);
                diceValue.current = msg.roll;

                setIsSpinning(false);
                checkForEligiblePieces(msg.player);
                // AutoIncrement(msg.player);
            }, 800);

        })
        socket.on("handleClickPiececClient", ({ player, piece, turn }) => {
            console.log('server se peice click ka event aa gya h');
           autoIncrement.current = false;
            const user = localStorage.getItem("playerId");
            let Player = user===player?'P1':'P2';
            const currentPosition = currentPositions.current[Player][piece];

            if ( getEligiblePieces(Player).includes(piece)) {
                console.log('server se aane ke bad peice to thi lag rha h')
                if (BASE_POSITIONS[Player].includes(currentPosition)) {
                    console.log('peice home wala')
                    setPiecePosition(Player, piece, START_POSITIONS[Player]);
                    autoDiceRoll.current = true;
                    setState(STATE.DICE_NOT_ROLLED);
                   
                   
                }
                else{
                    console.log('home wala nhi h chalo aage')
                    movePiece(Player, piece, diceValue.current);
                   
                }
               
               

            }

        })
        return () => {
            socket.off("DiceValueClient");
            socket.off("handleClickPiececClient");
        };


    },[]);

    const setPiecePosition = (player, piece, newPosition) => {
        console.log(player,piece,newPosition,'inside set position')
        const updatedPositions = {
            ...currentPositions.current,
            [player]: currentPositions.current[player].map((pos, index) =>
                index === piece ? newPosition : pos
            )
        };
        // setCurrentPositions(updatedPositions);
        currentPositions.current = updatedPositions;
        const playerId = localStorage.getItem('playerId');
        setRender(prev=>(prev+1));
        if(player==='P1'){
        socket.emit("GameState", { gameId, currentPositions: updatedPositions, turn:myturn?0:1, diceValue:diceValue.current ,playerId});
        }
    };

    const movePiece = async (player, piece, moveBy) => {
        console.log('peice ko move krte h')
        let movesRemaining = moveBy;
        const moveInterval = 200 // Interval for updating position

        const moveIntervalId = setInterval(async () => {
           
            if (movesRemaining > 0) {
                console.log('inside movepeice')
                const currentPosition = currentPositions.current[player][piece];
                if (currentPosition === TURNING_POINTS[player]){
                    if(game==='Owner'){
                        console.log('inside movepeice Owner')
                        setPiecePosition(player, piece, HOME_POSITIONS[player]);
                        setState(STATE.DICE_NOT_ROLLED);
                        clearInterval(moveIntervalId);
                        
                    }
                    else{
                        setPiecePosition(player, piece, HOME_ENTRANCE[player][0]);
                    }
                    // return HOME_ENTRANCE[player][0];
                }
              else  if (currentPosition === 51){
                setPiecePosition(player, piece, 0);
                } 

                else{
                    setPiecePosition(player, piece, currentPosition + 1);
                }
                movesRemaining--;
            } else {
                clearInterval(moveIntervalId);

                if (hasPlayerWon(player)) {
                    alert(`Player: ${player} has won!`);
                    resetGame();
                    return;
                }

                const isKill = checkForKill(player, piece);
                if (!isKill && diceValue.current != 6) {
                    // incrementTurn();
                    if(player==='P1'){
                    socket.emit('changeTurnClient',gameId);
                    }
                    setState(STATE.DICE_NOT_ROLLED);
                   
                }

                else{
                    if(player==='P1'){
                        autoDiceRoll.current = true;
                    }
                }
                setState(STATE.DICE_NOT_ROLLED);
            }
        }, moveInterval);
    };

    useEffect(() => {
        let autoInterval;
    
        if (autoIncrement.current) {
            autoInterval = setTimeout(() => {
                if (myturn) {
                    const newPiece = getEligiblePieces('P1');
                    if (newPiece.length > 0) {
                        handlePieceClick('P1', newPiece[0]);
                    } else {
                        console.log("No eligible pieces to move.");
                    }
                }
            }, 30000);
        }

        else{
            clearTimeout(autoInterval);
        }
    
        return () => {
            if (autoInterval) clearTimeout(autoInterval);
        };
    }, [autoIncrement.current]);


    useEffect(()=>{
     let diceTimeout;
     if(autoDiceRoll.current && myturn){
        diceTimeout = setTimeout(() => {
            onDiceClick();
        },30000);
     }
     else{
        if (diceTimeout) clearTimeout(diceTimeout);
     }
     return ()=>{
        if (diceTimeout) clearTimeout(diceTimeout);
     }
    },[autoDiceRoll.current,myturn])
    
    const checkForKill = (player, piece) => {
        const currentPosition = currentPositions.current[player][piece];
        const opponent = player === 'P1' ? 'P2' : 'P1';
        let kill = false;
        [0, 1, 2, 3].forEach(opponentPiece => {
            const opponentPosition = currentPositions.current[opponent][opponentPiece];
            if (currentPosition === opponentPosition && !SAFE_POSITIONS.includes(currentPosition)) {
                setPiecePosition(opponent, opponentPiece, BASE_POSITIONS[opponent][opponentPiece]);
                kill = true;
            }
        });
        return kill;
    };

    const hasPlayerWon = (player) => {
        return [0, 1, 2, 3].every(piece => currentPositions.current[player][piece] === HOME_POSITIONS[player]);
    };

    const checkForEligiblePieces = (val) => {
        console.log('check for eligiblepeice')
        const user = localStorage.getItem('playerId')
        const player =val===user?"P1":"P2";
        const eligiblePieces = getEligiblePieces(player);
        console.log('eligible peice for player ',player)
        if (eligiblePieces.length<1) {
            if(player==='P1'){
                console.log('peice available nhi h to turn change kr do');
                socket.emit('changeTurnClient',gameId);
            }
          
            setState(STATE.DICE_NOT_ROLLED);
            // incrementTurn();
        }
    };

    const getEligiblePieces = (player) => {
        return [0, 1, 2, 3].filter(piece => {
            const currentPosition = currentPositions.current[player][piece];
            if (currentPosition === HOME_POSITIONS[player]) return false;
            if (BASE_POSITIONS[player].includes(currentPosition) && diceValue.current !== 6) return false;
            if (HOME_ENTRANCE[player].includes(currentPosition) && diceValue.current > HOME_POSITIONS[player] - currentPosition) return false;
            return true;
        });
    };


    // const incrementTurn = () => {
    //     setTurn(turn === 0 ? 1 : 0);
    //     setState(STATE.DICE_NOT_ROLLED);
    //     const gameId = localStorage.getItem('gameId')
       
    //     // setDiceValue(0)
    // };
    // useEffect(()=>{
    //   handlePieceClick
    // },[])
    const handlePieceClick = (player, piece, e=null) => {
        console.log('peice clicked by player ',player)
        autoDiceRoll.current = false;
        if (!myturn || isPeiceClicked) {
            console.log('mera turn nhi h ya fir peice already click ho chuki h ,', myturn , isPeiceClicked)
            return;
        }
        
        console.log('peice click thik ja rha h')
        if ((myturn && player == "P1") && getEligiblePieces(player).length>0) {
            setIsPeiceClicked(true);
            console.log('peice to shi h bhai')
            const user = localStorage.getItem("playerId");
            socket.emit("handleClickPiece", { gameId, player:user, piece, turn })
        }
        else {
            console.log('lagta h glt peice click kr di h')
        }

    };

    return (
        <>
            {/* style={{ minHeight: "100vh" }} */}
            <div className="leftContainer leftContainer-Ludo">
                <div className="ludomain">
                    <div className="sound"><img src="/image/images/soundon.png" alt="" srcset="" /></div>

                    <div className="ludo-container">
                        <div className={`ludo ${game}`}>
                            <div className="player-pieces">
                                {PLAYERS.map(player =>
                                    currentPositions.current[player].map((position, index) => (
                                        <PlayerPiece
                                            key={`${player}-${index}`}
                                            playerId={player}
                                            pieceId={index}
                                            position={position}
                                            onClick={handlePieceClick}
                                        />

                                    ))
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="footer">
                        <div className="footer-avtar">
                            <div className="img-left">
                            <div className={`P1 ${myturn ? 'animation' : ''}`}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnveTKwxve5MH7HXXKE-3iT7_ihOpC0CxLGg&s" alt="" srcset="" /></div>
                            </div>
                            <div className={`P2 ${!myturn ? 'animation' : ''}`}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnveTKwxve5MH7HXXKE-3iT7_ihOpC0CxLGg&s" alt="" srcset="" /></div>
                        </div>
                        {myturn? <div className={`arrow ${state !== STATE.DICE_ROLLED ? 'shrink' : 'dis'}`}>
                            <img src="/image/images/arrow.png" alt="Arrow" />
                        </div>:""}
                       
                        <div className={`dice-main ${state === STATE.DICE_ROLLED ? 'disabled' : ''}`}>
                            <img
                                src={`/image/images/Dice${diceValue.current}.png`}
                                className={`dice ${isSpinning ? 'spin' : ''} btn btn-dice`}
                                alt="This is zero"
                                onClick={state !== STATE.DICE_ROLLED ? onDiceClick : undefined}
                                id="dice-btn"
                            />
                        </div>

                        <div className="footer-last">
                            <div className="left">
                                <div className="left-upper">
                                    <div className="left-pieceimg">
                                        <img src="/image/images/P1.png" alt="" srcset="" />

                                    </div>
                                    <div className="coin-five">
                                        <div className="coin"></div>
                                        <div className="coin"></div>
                                        <div className="coin"></div>
                                        <div className="coin"></div>
                                        <div className="coin"></div>
                                    </div>
                                </div>
                                <div className="nameBox">
                                    <div className="name-heading">
                                        Name
                                    </div>
                                    <hr />
                                    <div className="Name">yte-ieh-idj</div>
                                </div>
                            </div>
                            <div className="right">

                                <div className="nameBox">
                                    <div className="name-heading">
                                        Name
                                    </div>
                                    <hr />
                                    <div className="Name">yte-ieh-idj</div>
                                </div>


                                <div className="right-upper">
                                    <div className="left-pieceimg">
                                        <img src="/image/images/P1.png" alt="" srcset="" />
                                    </div>
                                    <div className="coin-five">
                                        <div className="coin"></div>
                                        <div className="coin"></div>
                                        <div className="coin"></div>
                                        <div className="coin"></div>
                                        <div className="coin"></div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>

            </div>

        </>
    );
};

export default LudoBoard;
