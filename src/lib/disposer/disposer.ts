import { createContext } from "react";

interface DisposerState {
  disposables: Map<string, () => void>;
}

const initialState = {
  disposables: new Map(),
} as DisposerState;

export const DisposalContext = createContext(initialState);
