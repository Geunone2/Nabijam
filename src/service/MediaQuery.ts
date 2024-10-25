import React, {useEffect, useState} from 'react';
import {useMediaQuery} from "react-responsive";

export const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    const mobile = useMediaQuery({query: '(max-width:767px)'});

    useEffect(() => {
        setIsMobile(mobile);
    }, [mobile]);

    return isMobile;
}

export const useTablet = () => {
    const [isTablet, setIsTablet] = useState(false);
    const tablet = useMediaQuery({query: '(min-width: 768px) and (max-width: 1023px)'});

    useEffect(() => {
        setIsTablet(tablet);
    }, [tablet]);

    return isTablet;
}

export const usePC = () => {
    const [isPC, setIsPC] = useState(false);
    const PC = useMediaQuery({query: '(min-width: 1024px) and (max-width: 2560px)'});

    useEffect(() => {
        setIsPC(PC);
    }, [PC]);

    return isPC;
}
