import { ObjectId } from "mongodb";

// data structure for information of a partiucular game
type Game = {
    _id?: ObjectId,
    name: string,
    activeUsers: number,
    partySizes: number[]
}

export const GamesList = [
    {
        name: "Valorant",
        activeUsers: 22703469,
        partySizes: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
        name: "Apex Legends",
        activeUsers: 112415784,
        partySizes: [2, 3]
    },
    {
        name: "Overwatch",
        activeUsers: 739989,
        partySizes: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
        name: "Genshin Impact",
        activeUsers: 65039242,
        partySizes: [2, 3, 4]
    },
    {
        name: "Dota 2",
        activeUsers: 15012610,
        partySizes: [2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
        name: "Destiny 2",
        activeUsers: 788098,
        partySizes: [2, 3, 4, 5, 6]
    },
    {
        name: "Bread with Fred",
        activeUsers: 159,
        partySizes: [2]
    }
] as Game[];

export default Game;