import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const TopBar = () => {
  return (
    <div className="border-stone-350 border-b bg-white/90 backdrop-blur-sm ">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="flex items-center justify-between py-4 ">
          <Link to="/">
            <img src={logo} alt="meiro-logo" />
          </Link>
          <div>
            <Link to="/attributes" className="font-semibold text-gray-900">
              Attributes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
