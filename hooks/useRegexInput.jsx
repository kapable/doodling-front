import { useState, useCallback } from 'react';

const useRegexInput = (initialValue = null) => {
    const [value, setValue] = useState(initialValue);
    const reg = /\s/gi;
    const handler = useCallback(
        (e) => {
            setValue(e.target.value.replace(reg, ''));
        },
        [],
    );
    return [value, handler, setValue];
}

export default useRegexInput;