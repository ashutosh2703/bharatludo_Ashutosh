import express from "express"
import { Server } from "socket.io";
import { createServer } from "http";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Game from "./models/Classic.js"
import cors from "cors";

mongoose.connect('mongodb+srv://infotechmaxway:GElux8prQiN9M4dD@cluster0.0jod2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
});


const app = express();
const server = createServer(app);
const io = new Server(server, {cors:{
    origin:"*"
}});



var corsOptions = {
  origin: '*',
  //optionsSuccessStatus: 200 // For legacy browser support
}


app.use(cors(corsOptions));
let user = 0;
let Live_Games =0;
// const User_term = 5;
let games = {}
let playersQueue = {}

// mongoose.Connection("mongodb://infayoudigital:<db_password>@<hostname>/?ssl=true&replicaSet=atlas-aih4gf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0",()=>{
// console.log("db is connected !")
// })

const createGame = (betAmount, player1) => {
    const gameId = `game-${Date.now()}`;
    games[gameId] = {
      players: [player1],
      betAmount,
      gameState: {
        Poistion:{
          P1: [500,501,502,503],
          P2: [600,601,602,603]
        },
        turn:0,
        dice:1
      }, 
    };
    return gameId;
  };
  const joinGame = (gameId, player) => {
    const game = games[gameId];
    game.players.push(player);
    if (game.players.length === 2) {
      
      startGame(gameId);
    }
    else{
    }
  };
  
  const startGame = (gameId) => {
    const game = games[gameId];
    console.log("Start Game Trigged !")
    io.to(gameId).emit('startGame', { gameId, players: game.players, gameState: game.gameState });
  };
  
 
io.on("connection",(socket)=>{
//     console.log("new use connected")
//     console.log("socket-id",socket.id)

 user++;
// console.log(user)
//     // socket.emit("waiting","seraching for your Partner !")
//     socket.on("NewPlayer",(msg)=>{
//         console.log(" newe player msg",msg,socket.id)
//         activeuserforthree++;
//         console.log(activeuserforthree)
//         Players.push = {
//             Player1 : socket.id,
//             Betammount: msg
//         }
//     })




  // socket.emit("RunningBalttel",{Live_Games,})


    console.log('New player connected:', socket.id,user);
  
    socket.on('joinBet', async(msg) => {
      console.log(msg,'msg')
      const decoded = jwt.verify(msg.token, "soyal");
      console.log(decoded,'decoded')
      const user = await User.findOne({_id: decoded._id, "tokens.token": msg.token });
      if(!user){
        return;
      }
      const game = await Game.findOne({
        gameType:msg.game,
        status: 0,
        price:msg.betAmount
    });
   
      if (game) {
        socket.join(game.gameId);
        console.log(game)
        if(game.players.includes(user._id)){
          console.log("user already applied for room");
          return;
        }
        await Game.findByIdAndUpdate(
          game._id,
          {
              $set: { status: 1 },
              $push: { players: user._id },
          }
      );
        
        socket.emit('playerJoined', { playerId: user._id ,gameId:game.gameId});
        console.log("Now Running Games",game.gameState);
        io.to(game.gameId).emit('startGame', { gameId:game.gameId, players: game.players, gameState: game.gameState });
        setTimeout(()=>{
          socket.emit('offTurn');
        },1000)
       
      } else {
        
        const newGame = new Game({
          gameId:socket.id+Date.now(),
          players:[user._id],
          price:msg.betAmount,
          gameType:msg.game,
          gameState:{
            position:{
              p1:[500,501,502,503],
              p2:[600,601,602,603]
            },
            turn:0,
            dice:1
          }
        })

        const sevedGame = await newGame.save();
        socket.join(sevedGame.gameId);
        io.to(sevedGame.gameId).emit("OnePlayer",{gameId:sevedGame.gameId,playerId:user._id});
      }
    });


    socket.on("Dice-Value",({gameId,roll,diceValue,player})=>{
        console.log("trigged Dice-Value event",gameId,roll,diceValue)
        io.to(gameId).emit("DiceValueClient",{roll,player});
    })  
    socket.on("handleClickPiece",({gameId,player,piece,turn})=>{
        console.log("handleClickpiece",gameId,player,piece,turn)
        io.to(gameId).emit("handleClickPiececClient",{player,piece,turn})
    })
    socket.on("GameState",async(msg)=>{
      console.log("new current poistion update",msg)
      const gameId = msg.gameId;
      const game = await Game.findOne({
        gameId,
        status: 1 
    });
      // const game = games[gameId]
      if(game){
        const {playerId} = msg;
        if(game.players[0]===playerId){
         game.gameState.position = msg.currentPositions;
         game.gameState.turn = msg.turn;
        }
        else{
          game.gameState.position.P1 = msg.currentPositions.P2;
          game.gameState.position.P1 = msg.currentPositions.P1;
          game.gameState.turn = msg.turn==0?1:0;
        }
        
       
        game.gameState.dice = msg.diceValue;
        await game.save();
      }
    })

    socket.on("changeTurnClient",(gameId)=>{
      console.log('step2',socket.id);
      io.to(gameId).emit("changeTurn");
      console.log('change trun');
    })

    socket.on("rejoin",(msg)=>{
      console.log(msg,"msg")
      const gameId = msg.gameId;
      console.log("game id form local storage",gameId)
      const playerid = socket.id;
      // const PlayerId = playerid.toString();
      console.log(playerid,"socket id ")
      const checkingforgame = games[gameId]
      console.log("checkingforgame",checkingforgame)
      console.log(checkingforgame.players) 
      if(checkingforgame){ ``
        const checkingforplayer = checkingforgame.players.includes(playerid);
        console.log("checkingforplayer",checkingforplayer)
        if(checkingforplayer){
          io.to(gameId).emit('startGame', { gameId, players: checkingforgame.players, gameState: checkingforgame.gameState });

        }
      }
    })

    socket.on('userLeaving',async(playerId)=>{
      const userIdToCheck = new mongoose.Types.ObjectId(playerId);
      
      const deletedGame = await Game.findOneAndDelete({
        players: userIdToCheck,        
        status: 0,                   
        'players.1': { $exists: false } 
      });
    })

    // socket.on("Reconnect",())

    socket.on("disconnect",()=>{
        console.log("one  disconnect",socket.id)
        // Live_Games--;
        console.log(user);
        // user--;
        // io.to(socket.id).emit("clean",socket.id)
    })
})
console.log("games",games)
server.listen(8012,()=>{
    console.log("server is running on port 8012");
})
