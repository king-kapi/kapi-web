import {atom} from "jotai";

export interface partyFinderSurvey {
    partyOption: string,
    honorConduct: boolean,
    games: string[],
    interestMatch: number,
    timezone: number,
    message: string,
    lobbyName: string,
    lobbySize: number,
    lobbyDescription: string,
    nickname: string,
    inGameName: string
}

const partyFinderAtom = atom(<Partial<partyFinderSurvey>>({partyOption: '', honorConduct: false, games: []}))

export {partyFinderAtom}