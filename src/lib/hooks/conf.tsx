import React, {createContext, useContext, useMemo} from "react";

import {useAPI} from "./api";
import {setup} from "../api";
import { LoginConfigProviderProps } from "../components/interface/comp_interface";


export const LoginConfigContext = createContext({});

export const WithLoginConfigContext:React.FC<LoginConfigProviderProps> = ({children}) => {
    const { response, error, loading } = useAPI(() => setup.getState());
    const lc = useMemo(() => (error || loading) ? {} : response?.login_config || {}, [response]);
    return <LoginConfigContext.Provider value={lc}>
             {children}
           </LoginConfigContext.Provider>;
};

export const useLoginConfigContext = () => useContext(LoginConfigContext);
