import { useState } from 'react';

export default function LoginInput( defaultValue ) {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    return { value, onChange: handleChange };
}