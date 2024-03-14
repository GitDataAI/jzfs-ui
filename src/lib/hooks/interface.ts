export interface activepage{
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}

export interface urlProps{
     pathname: string; 
     params?:Object;
     query?:Object; 
}