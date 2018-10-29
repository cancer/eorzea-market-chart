export const getUrl = (serverName: string): string => {
  return `https://www.ffxivmb.com/${serverName}`;
};

export const getItemUrlMock = (serverName: string): string => {
  return `./history.json`;
};

export const getListUrlMock = (): string => {
  return './history-list.json';
};