export const getUrl = (serverName: string): string => {
  return `https://www.ffxivmb.com/${serverName}`;
};

export const getItemUrlMock = (id: number): string => {
  console.log(id)
  return `./api/items/${id}.json`;
};

export const getListUrlMock = (): string => {
  return './api/items.json';
};