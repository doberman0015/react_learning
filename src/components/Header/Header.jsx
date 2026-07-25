import cls from "./Header.module.css";
import HeaderLogo from "../../assets/react.svg"
import { Button } from '../Button';

export const Header = () => {
    return (
        <header className={cls.header}>
            <p>
                <img src={HeaderLogo} alt="site logo" />
                <span>React Cards</span>
            </p>

            <div className={cls.buttonList}>
                <Button>
                    Add
                </Button>
                <Button>
                    Login
                </Button>
            </div>
        </header>
    );
};