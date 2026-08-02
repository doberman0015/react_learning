import cls from './ForbiddenPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';


export const ForbiddenPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { isAuth } = useAuth();

    const fromPage = location.state?.from || '/';

    useEffect(() => {
        isAuth && navigate(fromPage, { replace: true });
    }, [ isAuth ]);

    return (
        <div className={cls.forbiddenPageWrapper}>
            <h1 className={cls.title}> Forbidden Page </h1>
        </div>
    );
};