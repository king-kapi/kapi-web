import { atom } from "jotai";
import mongoose from "mongoose";

export interface partyFinderSurvey {
    partyOption: String, 
    honorConduct: Boolean,
    games: mongoose.Types.ObjectId[]
}

const partyFinderAtom = atom(<Partial<partyFinderSurvey>>({partyOption: '', honorConduct: false, games: []}))

export {partyFinderAtom}