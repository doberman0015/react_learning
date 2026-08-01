import { useState } from "react";
import { delayFn } from "../helpers/delayFn";
import { toast } from "react-toastify";

export const useFetch = (callback) => {

    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState('');

    const fetchFn = async (arg) => {
        try {
            setIsLoading(true);
            setError('');
            await delayFn(1500);
            const response = await callback(arg);
            
            return response;
        } catch ( error ) {
            console.error('error',error);
            setError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [ fetchFn, isLoading, error ];
}