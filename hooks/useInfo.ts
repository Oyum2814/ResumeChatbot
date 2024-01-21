import React from 'react';
import useSWR from 'swr';
import fetcher from "@/lib/fetcher";

const useInfo = (userId:string,field:string)=>{
    const {data, error, isLoading, mutate } 
    = useSWR(userId?`/api/${field}/${userId}`: null,fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useInfo;