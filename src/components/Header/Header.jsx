import cls from "./Header.module.css";
import HeaderLogo from "../../assets/react.svg"
import { Button } from '../Button';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { AUTH_STORAGE } from "../../constants";
import { ThemeToggler } from "../../features/ThemeToggler";

export const Header = () => {

    const navigate = useNavigate();
    const { isAuth, setIsAuth } = useAuth();

    const loginHandler = () => {
        localStorage.setItem(AUTH_STORAGE, !isAuth);
        setIsAuth(!isAuth);
    }

    return (
        <header className={cls.header}>
            <p onClick={() => navigate("/")}>
                <img src={HeaderLogo} alt="site logo" />
                <span>React Cards</span>
            </p>

            <div className={cls.buttonList}>
                <ThemeToggler />
                {isAuth && <Button onClick={() => navigate("/addquestion")}>
                    Add
                </Button>}
                <Button isActive={!isAuth} onClick={loginHandler}>
                    {isAuth ? "Logout" : "Login"}
                </Button>
            </div>
        </header>
    );
};