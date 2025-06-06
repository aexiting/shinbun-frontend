import { useCallback, useEffect, useRef, useState } from "react";
import { clearTimeout } from "node:timers";


export interface TopicInputActions {
    setQueryInput: (queryString: string) => void;
    submitQuery: () => void;
}

export interface TopicInputState {
    queryInput: string;
}


export interface UseTopicInputProps {
    onTopicSubmit: (queryString: string) => void;
}

export const useTopicInput = ({ onTopicSubmit }: UseTopicInputProps): [TopicInputState, TopicInputActions] => {
    const [state, setState] = useState("");
    const debounceTimeout = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current)
            }
        }
    }, []);

    const submitQuery = useCallback(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current)
        }

        debounceTimeout.current = window.setTimeout(() => {
            if (state.trim() != "") {
                onTopicSubmit(state)
            }
        }, 500)
    }, [onTopicSubmit, state])

    return [{ queryInput: state }, { setQueryInput: setState, submitQuery }]
}