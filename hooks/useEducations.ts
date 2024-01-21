import React from 'react';
import useSWR from 'swr';
import fetcher from "@/lib/fetcher";

const useEducations = (userId:string)=>{
    const {data, error, isLoading, mutate } 
    = useSWR(userId?`/api/educations/${userId}`: null,fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useEducations;