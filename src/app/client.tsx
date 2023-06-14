import { createContext, useContext } from "react";

const ClientContext = createContext<boolean>(false);

export const ClientProvider: React.FC = ({ children }) => {
  return (
    <ClientContext.Provider value={true}>{children}</ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
