import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { links } from "../utils/constant";
import { FaArrowDown, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../app/slices/authSlice";
import { useLogoutMutation } from "../app/apis/usersApiSlice";
import Button from "./Button";
import Container from "./Container";

const Header = () => {
  const [menu, setMenu] = useState(false);

  const userDetail = useSelector((state) => state.auth.userDetail);

  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className='fixed top-0 z-[50] w-full py-4 bg-secondary_extra_light'>
      <Container className={"flex items-center justify-between font-logo_bold"}>
        <Logo />

        <nav className='md:flex gap-6 items-center hidden'>
          {links.map((link, index) => (
            <Link
              to={link.routeLink}
              key={index}
              className='text-dark text-base font-body capitalize font-semibold hover:text-base_color transition-colors duration-150 ease-in'
            >
              {link.navlink}
            </Link>
          ))}
        </nav>

        {userDetail ? (
          <div className='flex gap-4 items-center justify-center'>
            <img
              src={userDetail.coverPhoto?.url}
              className='hidden md:block w-10 h-10 rounded-full object-top object-cover'
              alt='user profile photo'
            />
            <p
              onClick={handleMenu}
              className='md:hidden flex items-center gap-4 border-2 border-extra_light p-2 rounded-2xl'
            >
              {userDetail.name} <FaArrowDown />
            </p>
            <Button
              className={"hidden md:block"}
              text={"Logout"}
              onClick={handleLogout}
              type={"button"}
            />
          </div>
        ) : (
          <div className='flex items-center gap-4 text-sm sm:text-base text-dark font-semibold'>
            <Link
              to={"/login"}
              className='border-2 border-dark rounded-2xl px-4 py-2 cursor-pointer hover:border-base_color hover:text-base_color transition-colors duration-150 ease-in-out'
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className='rounded-2xl px-4 py-2 bg-base_color text-extra_light cursor-pointer hover:bg-light hover:text-secondary_extra_light transition-colors duration-150 ease-in-out'
            >
              Sign up
            </Link>
          </div>
        )}
        <div
          className={`absolute top-[90px] z-[100] ${
            !menu ? "left-[100%]" : "left-[10%]"
          } right-0 overflow-hidden bg-extra_light transition-all duration-200 ease-in px-8`}
        >
          <button onClick={handleMenu} className='absolute top-10 right-10'>
            <FaXmark size={32} color='red' />
          </button>
          <nav className='flex flex-col md:h-[300px] h-[250px] md:mt-[150px] mt-[100px] gap-6'>
            {links.map((link, index) => (
              <Link
                to={link.routeLink}
                key={index}
                className='text-base_color md:text-3xl font-body uppercase font-semibold text-lg'
                onClick={handleMenu}
              >
                {link.navlink}
              </Link>
            ))}
            <Button
              className={"md:hidden text-2xl"}
              text={"Logout"}
              onClick={handleLogout}
              type={"button"}
            />
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
