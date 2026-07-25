import cls from "./Header.module.css";
import HeaderLogo from "../../assets/react.svg"
import { Button } from '../Button';
import { useNavigate } from "react-router-dom";

export const Header = () => {

    const navigate = useNavigate();

    return (
        <header className={cls.header}>
            <p onClick={() => navigate("/")}>
                <img src={HeaderLogo} alt="site logo" />
                <span>React Cards</span>
            </p>

            <div className={cls.buttonList}>
                <Button onClick={() => navigate("/addquestion")}>
                    Add
                </Button>
                <Button>
                    Login
                </Button>
            </div>
        </header>
    );
};