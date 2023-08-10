import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCredentials } from "../app/slices/authSlice";
import { Button } from "../components";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../app/apis/usersApiSlice";

const EditUser = () => {
  const { id } = useParams();
  const userDetail = useSelector((state) => state.auth.userDetail);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userDetail) {
      setName(userDetail.name || "");
      setEmail(userDetail.email || "");
    }
  }, [userDetail]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Please enter all field");
    } else {
      try {
        const data = await updateUser({ email, name, id }).unwrap();

        if (data) {
          dispatch(setCredentials({ ...data }));
          setEmail("");
          setName("");
          toast.success("User info updated");
          navigate("/my-recipes");
        } else {
          toast.error("User info updated failed!");
        }
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <section className='text-dark font-body'>
      <div className='px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto'>
        <Heading text={"Update User"} />
        {isLoading && <h3>Loading...</h3>}
      </div>
      <div className='max-w-[530px] mx-auto w-full bg-extra_light rounded-2xl px-4 py-8 mt-3'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter name'
            className='w-full h-11 rounded-2xl px-4'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='email'
            placeholder='Enter email'
            className='w-full h-11 rounded-2xl px-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button text={"Update"} className={"self-start"} type='submit' />
        </form>
      </div>
    </section>
  );
};

export default EditUser;
