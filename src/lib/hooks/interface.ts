export interface activepage{
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    refresh:boolean,
    setRefresh:React.Dispatch<React.SetStateAction<boolean>>
}

export interface urlProps{
     pathname: string; 
     params?:Object;
     query?:Object; 
}