import mongoose from "mongoose";

const gameData = new mongoose.Schema(
    {
        gameId: {
            type: String,
            required: true,
            unique: true,
        },
        gameType:{
            type:String,
            required:true,
            enum:['Classic','Owner']
        },
        price:{
            type:Number,
            required:true
        },
        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        status: {
            type: Number,
            default: 0,
            enum: [0, 1, 2],
        },
        gameState: {
            type: Object,
            default: {
                position: {
                    P1: [500,501, 502, 503],
                    P2: [600, 601, 602, 603],
                },
                turn:0,
                dice:1,        
            },
        },
    },
    {
        timestamps: true, // Properly included in schema options
    }
);

// Create the model
const Game = mongoose.model("ClassicGame", gameData);

export default Game;
