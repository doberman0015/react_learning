import cls from './Badge.module.css';

export const Badge = ({variant,children}) => {

    let addedClas = '';
    switch (variant) {
        case 'primary':
            addedClas = cls.primary;
            break;
        case 'succes':
            addedClas = cls.succes;
            break;
        case 'warning':
            addedClas = cls.warning;
            break;
        case 'alert':
            addedClas = cls.alert;
            break;
        default:
            break;
    }

    return (
        <div className={`${cls.badge} ${addedClas}`}>
            { children }
        </div>
    );
};