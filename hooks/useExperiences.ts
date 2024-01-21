import React from 'react';
import useSWR from 'swr';
import fetcher from "@/lib/fetcher";

const useExperiences = (userId:string)=>{
    const {data, error, isLoading, mutate } 
    = useSWR(userId?`/api/experiences/${userId}`: null,fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useExperiences;