import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className='font-bold font-logo_bold text-secondary_base hover:text-dark text-3xl cursor-pointer transition-colors duration-150 ease-in'
    >
      Re
      <span className='text-dark font-logo hover:text-secondary_base transition-colors duration-150 ease-in'>
        cipes
      </span>
    </Link>
  );
};

export default Logo;
