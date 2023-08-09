import { useState } from "react";
import Heading from "../components/Heading";
import { useRegisterMutation } from "../app/apis/usersApiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../app/slices/authSlice";
import { Button } from "../components";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [imageFile, setImgFile] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPwd || !imageFile) {
      toast.error("All field are required");
    } else {
      if (password === confirmPwd) {
        try {
          const res = await register({
            name,
            email,
            password,
            imageFile,
          }).unwrap();

          if (res) {
            dispatch(setCredentials({ ...res }));
            toast.success("User was registered successfully");
            setConfirmPwd("");
            setPassword("");
            setEmail("");
            setName("");

            setTimeout(() => {
              navigate("/");
            }, 5000);
          } else {
            toast.error("User was not registered please do try again");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("Password does not match");
      }
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // transform the file so we can use it
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
    } else {
      setImgFile("");
    }
  };

  return (
    <section className='text-dark'>
      <div className='px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto'>
        <Heading text={"Register"} />
        {isLoading && <h4>Loading...</h4>}
      </div>
      <div className='max-w-[530px] mx-auto w-full bg-extra_light rounded-2xl p-4 mt-3'>
        <div className='w-16 h-16 rounded-full border-2 border-secondary_extra_light my-2 overflow-hidden'>
          {imageFile ? (
            <div className='w-[100px] h-[100px]'>
              <img
                src={imageFile}
                alt='User profile photo'
                className='w-full h-full object-contain object-left-top'
              />
            </div>
          ) : (
            <>
              <div className='w-full h-full bg-white' />
            </>
          )}
        </div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter your name'
            className='w-full h-10 rounded-2xl px-4'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='email'
            placeholder='Enter your email'
            className='w-full h-10 rounded-2xl px-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            className='w-full h-10 rounded-2xl px-4'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='password'
            placeholder='confirm password'
            className='w-full h-10 rounded-2xl px-4'
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
          <input
            onChange={handleImageChange}
            type='file'
            className='border border-white py-2 px-4 bg-white rounded-2xl'
            accept='image/'
          />
          <Button text={"Submit"} type={"submit"} className={"self-start"} />
          <p>
            Already have an account?{" "}
            <Link to='/login' className='font-semibold text-base_color'>
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
