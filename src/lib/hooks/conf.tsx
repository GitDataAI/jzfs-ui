import React, {createContext, useContext, useMemo} from "react";

import {useAPI} from "./api";
import { LoginConfigProviderProps } from "../components/interface/comp_interface";
import { setup } from "../api/interface/Api";


export const LoginConfigContext = createContext({});

export const WithLoginConfigContext:React.FC<LoginConfigProviderProps> = ({children}) => {
    const { response, error, loading } = useAPI(() => setup.getSetupState());
    
    const lc = useMemo(() => (error || loading) ? {} : response?.login_config || {}, [response]);
    return <LoginConfigContext.Provider value={lc}>
             {children}
           </LoginConfigContext.Provider>;
};

export const useLoginConfigContext = () => {
  const context = useContext(LoginConfigContext);
  if (!('RBAC' in context)) {
      console.warn('RBAC is not available in LoginConfigContext');
  }
  return context;
}
