import { useState } from 'react';

export default function useFormField(initialState) {
    const [field, setField] = useState(initialState);

    const handleFieldChange = (event) => setField(event.target.value);

    return [field, handleFieldChange, setField];
}
