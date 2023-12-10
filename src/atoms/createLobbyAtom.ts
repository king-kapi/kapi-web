import { atom } from 'jotai';
import Lobby from '@/src/types/Lobby';

const createLobbyAtom = atom<Partial<Lobby>>({});

export default createLobbyAtom;