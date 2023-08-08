import { useSelector } from "react-redux";
import { Button, Heading } from "../components";
import {
  useDeleteRecipeMutation,
  useGetUserRecipesQuery,
} from "../app/apis/recipesApiSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyRecipes = () => {
  const userDetail = useSelector((state) => state.auth.userDetail);

  const { data, isLoading, refetch } = useGetUserRecipesQuery(userDetail?._id);
  const [deleteRecipe] = useDeleteRecipeMutation();

  const handleDelete = async (id) => {
    try {
      await deleteRecipe({ id }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className='px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto font-body'>
        <Heading text='My Recipes' />
        <div className='flex items-en justify-end gap-4 flex-col sm:flex-row'>
          <Button
            text={"Delete Account"}
            className={"bg-red-500 hover:bg-red-700"}
          />
          <Button text={"Edit Account"} />
        </div>
        {isLoading ? (
          <div className='mt-[120px] text-center'>
            <h3 className='font-body text-2xl md:text-3xl font-semibold'>
              Loading Recipes...
            </h3>
          </div>
        ) : !data ? (
          <div className='mt-[120px] text-center'>
            <h3 className='font-body text-2xl md:text-3xl font-semibold'>
              You have not add any recipe!{" "}
              <span className='text-base_color'>
                <Link to={"/create-recipe"}>Add Recipe</Link>
              </span>
            </h3>
          </div>
        ) : (
          <div className='mt-4'>
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
