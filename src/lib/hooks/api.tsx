import {DependencyList, useEffect, useState} from 'react';
import {useRouter} from "./router";
import { APIState, InitialPaginationState, PromiseFunction,} from '../components/interface/comp_interface';

const initialPaginationState:InitialPaginationState = {
    loading: true,
    error: null,
    nextPage: null,
    results: []
};

export const useAPIWithPagination = (promise: ()=> Promise<any>, deps: DependencyList = []) => {
    const [pagination, setPagination] = useState(initialPaginationState);

    // do the actual API request
    // we do this if pagination changed, or if we reset to an initial state
    const {response, error, loading} = useAPI(() => {
        setPagination({...initialPaginationState});
        return promise();
    }, [...deps, initialPaginationState]);

    useEffect(() => {
        if (loading) {
            setPagination({results: [], loading: true, nextPage: null,error: null
            });
            return;
        }
            if (!!error || !response) {
                setPagination({error, loading: false});
                return;
            }
        
        

        // calculate current state on API response
        setPagination({
            error: null,
            nextPage: (!!response.data.pagination && response.data.pagination.has_more) ? response.data.pagination.next_offset : null,
            loading: false,
            results: response.data.results
        });
    }, [response, loading, error]);

    return pagination;
}

const initialAPIState:APIState = {
    loading: true,
    error: null,
    response: null,
    responseHeaders: null,
};

export const useAPI = (promise: PromiseFunction, deps: DependencyList = []) => {
    const router = useRouter();
    const [request, setRequest] = useState(initialAPIState);
    const [login, setLogin] = useState(false);
    
    useEffect(() => {
        if (login) {
            const loginPathname = '/login';
            if (router.route === loginPathname) {
                return;
            }
            router.push({
                pathname: loginPathname,
                query: { redirected: '' + true},
                params:{}
            });
            setLogin(false);
        }
    }, [login, router])

    useEffect(() => {
        let isMounted = true;
        setRequest(initialAPIState);
        const execute = async () => {
            try {
                const response = await promise();
                setRequest({
                    loading: false,
                    error: null,
                    response,
                    responseHeaders:null,
                });
            } catch (error:any) {         
                       
                if (error.status == 401) {
                    
                    if (isMounted) {
                        setLogin(true);
                    }
                    return;
                }
                if(error instanceof Error || error === null) {
                    setRequest({
                        loading: false,
                        error,
                        response: null,
                        responseHeaders: null,
                    });
                }
            }
        };
        execute();
        return () => {isMounted = false;}
    }, deps);
    return {...request};
}
