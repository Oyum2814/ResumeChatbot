import React from 'react';
import useSWR from 'swr';
import fetcher from "@/lib/fetcher";

const useTemplates = ()=>{
    const {data, error, isLoading, mutate } 
    = useSWR('/api/template',fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    };
};

export default useTemplates;