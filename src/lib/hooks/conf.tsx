import React, {createContext, useContext, useMemo, useState} from "react";

import {useAPI} from "./api";
import { LoginConfigProviderProps } from "../components/interface/comp_interface";
import { setup } from "../api/interface";


export const LoginConfigContext = createContext({});
export const ActivepageContext = createContext({})
export const WithLoginConfigContext:React.FC<LoginConfigProviderProps> = ({children}) => {
    const { response, error, loading } = useAPI(() => setup.getSetupState());
    const [page,setPage] = useState('')
    const activepage = {page,setPage}
    const lc = useMemo(() => (error || loading) ? {} : response?.login_config || {}, [response]);
    return <LoginConfigContext.Provider value={lc}>
            <ActivepageContext.Provider value={activepage}>
             {children}
            </ActivepageContext.Provider>
           </LoginConfigContext.Provider>;
};

export const useLoginConfigContext = () => {
  const context = useContext(LoginConfigContext);
  if (!('RBAC' in context)) {
      console.warn('RBAC is not available in LoginConfigContext');
  }
  return context;
}
