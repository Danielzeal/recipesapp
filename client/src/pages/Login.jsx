import { useState } from "react";
import Heading from "../components/Heading";
import { toast } from "react-toastify";
import { useLoginMutation } from "../app/apis/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../app/slices/authSlice";
import { Button } from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in the required details");
    }

    try {
      const data = await login({ email, password }).unwrap();

      if (data) {
        dispatch(setCredentials({ ...data }));
        setEmail("");
        setPassword("");
        toast.success("Used is logged in");

        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        toast.error("User could not logged in do try again");
      }
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <section className='text-dark font-body'>
      <div className='px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto'>
        <Heading text={"Login"} />
        {isLoading && <h3>Loading...</h3>}
      </div>
      <div className='max-w-[530px] mx-auto w-full bg-extra_light rounded-2xl px-4 py-8 mt-3'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Enter your email'
            className='w-full h-11 rounded-2xl px-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            className='w-full h-11 rounded-2xl px-4'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button text={"Login"} className={"self-start"} type='submit' />
          <p>
            Don&apos;t have an account?{" "}
            <Link to='/register' className='font-semibold text-base_color'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
