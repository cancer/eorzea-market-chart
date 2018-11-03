import * as React from 'react';

interface History {
  push(path: string): void;
}

const defaultHistory = {
  push() {}
} as History;

export const HistoryContext = React.createContext(defaultHistory);