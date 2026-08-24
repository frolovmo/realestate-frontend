import data from "./loanProviders.json";

export const getLoanProviders = () => {
  return data.data.Banks.map((provider) => provider.name);
};
