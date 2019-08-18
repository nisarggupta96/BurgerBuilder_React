import { useState, useEffect } from 'react';

export default httpCLient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpCLient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const respInterceptor = httpCLient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    useEffect(() => {
        return () => {
            httpCLient.interceptors.request.eject(reqInterceptor);
            httpCLient.interceptors.response.eject(respInterceptor);
        };
    }, [reqInterceptor, respInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
}