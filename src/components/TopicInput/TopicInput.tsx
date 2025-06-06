import type { TopicInputActions, TopicInputState } from "./use-topic-input.ts";


export interface TopicInputProps {
    actions: TopicInputActions;
    state: TopicInputState;
}

export const TopicInput = ({state, actions}: TopicInputProps) => {
    return (
        <>
            <input id="key-word-input"
                   value={state.queryInput}
                   onChange={(e) => actions.setQueryInput(e.target.value)}
            />
            <button id="submit-button" onClick={() => actions.submitQuery()}/>
        </>
    )
}