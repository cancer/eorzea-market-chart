export const makeUrl = (serverName: string): string => {
  return `https://www.ffxivmb.com/${serverName}`;
};

export const makeUrlMock = (serverName: string): string => {
  return `./history.json`;
};