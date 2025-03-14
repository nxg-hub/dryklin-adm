import { Link } from 'react-router-dom';
import logo from '../../assets/orange-logo.png';

const Logo = () => {
    return (
        <div>
            <Link to={'/'}>
                <img src={logo} alt="logo" className="w-60" />
            </Link>
        </div>
    );
};

export default Logo;
