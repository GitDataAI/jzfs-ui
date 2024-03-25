import React, {createContext, useContext, useMemo, useState} from "react";

import {useAPI} from "./api";
import { LoginConfigProviderProps } from "../components/interface/comp_interface";
import { setup } from "../api/interface";
import { activepage } from "./interface";


export const LoginConfigContext = createContext({});
export const ActivepageContext = createContext<activepage>({
  page: "",
  setPage: function (_value: React.SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
  refresh: false,
  setRefresh: function (_value: React.SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  }
})
export const WithLoginConfigContext:React.FC<LoginConfigProviderProps> = ({children}) => {
    const { response, error, loading } = useAPI(() => setup.getSetupState());
    const [page,setPage] = useState('')
    const [refresh,setRefresh] = useState(false)
    const activepage = {page,setPage,refresh,setRefresh}
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
