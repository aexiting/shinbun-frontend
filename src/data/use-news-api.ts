import { useCallback, useEffect, useState } from "react";

const BACK_END_ROUTE = '/news'

export interface NewsQuery {
    query: string;
}

export interface NewsRequest {
    status: string;
}

export interface NewsDataState {
    isError: boolean;
    isLoading: boolean;
    data: NewsRequest | undefined;
}

export interface NewsDataActions {
    makeRequest: () => void;
}

const fetchNewsData = async ({query}: NewsQuery) => {
    const apiBaseUrl = process.env.REACT_APP_BACK_END_BASE_URL;

    const params = new URLSearchParams({
        query: query,
        // will add more params later on...
    });

    const response = await fetch(`${apiBaseUrl + BACK_END_ROUTE}?${params}`);
    return await response.json();
}

export const useNewsData = (query: string): [NewsDataState, NewsDataActions] => {
    const initialState: NewsDataState = {
        isError: false,
        isLoading: true,
        data: undefined,
    }

    const [state, setState] = useState<NewsDataState>(initialState)

    const makeRequest = useCallback(async () => {
        setState(prevState => ({...prevState, isLoading: true, isError: false}))
        try {
            const data = await fetchNewsData({query})
            setState(prevState => ({...prevState, isLoading: false, isError: false, data: data}))
        } catch (e) {
            setState(prevState => ({...prevState, isLoading: false, isError: true}))
            console.error(`Error caused when fetching News Data: ${e}`)
        }
    }, [query])

    useEffect(() => {
        makeRequest();
    }, [makeRequest]);


    return [state, {makeRequest}]
}