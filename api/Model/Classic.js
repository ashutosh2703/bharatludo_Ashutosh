const mongoose = require("mongoose");

const gameData = new mongoose.Schema(
    {
        gameId: {
            type: String,
            required: true,
            unique: true,
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
                    p1: [],
                    p2: [],
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
const Classic = mongoose.model("ClassicGame", gameData);

module.exports = Classic;
