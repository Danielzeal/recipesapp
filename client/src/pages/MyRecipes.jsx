import { useDispatch, useSelector } from "react-redux";
import { Button, Heading } from "../components";
import {
  useDeleteRecipeMutation,
  useGetUserRecipesQuery,
} from "../app/apis/recipesApiSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useLogoutMutation,
} from "../app/apis/usersApiSlice";
import { logoutUser } from "../app/slices/authSlice";

const MyRecipes = () => {
  const userDetail = useSelector((state) => state.auth.userDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetUserRecipesQuery(userDetail?._id);

  const [deleteRecipe] = useDeleteRecipeMutation();
  const [logout] = useLogoutMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      await deleteRecipe({ id }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      await deleteUser({ id }).unwrap();
      await logout().unwrap();
      dispatch(logoutUser());
      toast.success("Account deleted");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  return (
    <section>
      <div className='px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto font-body'>
        <Heading text='My Recipes' />
        <div className='flex justify-end gap-4 sm:flex-row my-2 flex-col items-center p'>
          <Button
            text={"Delete Account"}
            className={"bg-red-500 hover:bg-red-700"}
            onClick={() => handleDeleteAccount(userDetail?._id)}
          />
          <Link
            to={`/user/${userDetail?._id}/edit`}
            className='text-extra_light bg-base_color rounded-2xl hover:bg-light hover:text-secondary_extra_light transition-colors duration-150 ease-in-out px-4 py-2'
          >
            Edit User Detail
          </Link>
        </div>
        {isLoading ? (
          <div className='mt-[120px] text-center'>
            <h3 className='font-body text-2xl md:text-3xl font-semibold'>
              Loading Recipes...
            </h3>
          </div>
        ) : !data || !data.length ? (
          <div className='mt-[120px] text-center'>
            <h3 className='font-body text-2xl md:text-3xl font-semibold'>
              Empty vault!{" "}
              <span className='text-base_color'>
                <Link to={"/create-recipe"}>create new recipe</Link>
              </span>
            </h3>
          </div>
        ) : (
          <div className='mt-4'>
            <h3>Hi {userDetail?.name}</h3>
            <table className='table-fixed w-full text-dark'>
              <thead>
                <tr className='bg-extra_light'>
                  <th className='h-12'>Recipe ID</th>
                  <th className=''>Recipe Name</th>
                  <th className=''>Recipe Image</th>
                  <th className=''></th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((recipe) => (
                    <tr
                      key={recipe._id}
                      className='text-center h-12 even:bg-secondary_extra_light odd:bg-slate-300'
                    >
                      <td>{recipe._id}</td>
                      <td>{recipe.recipe_name}</td>
                      <td>
                        <img
                          src={recipe.recipe_image.secure_url}
                          alt={recipe.title}
                          className='w-8 h-8 rounded-full object-cover object-center m-auto'
                        />
                      </td>
                      <td>
                        <button className='text-base_color mr-4'>
                          <Link to={`/${recipe._id}/edit`}>
                            <FaEdit size={24} />
                          </Link>
                        </button>
                        <button
                          className='text-red-500'
                          onClick={() => handleDelete(recipe._id)}
                        >
                          <FaTrashAlt size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyRecipes;
