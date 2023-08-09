import { FaClock, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAddFavRecipeMutation,
  useGetFavoritesQuery,
  useRemoveFavRecipeMutation,
} from "../app/apis/recipesApiSlice";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const Card = ({ recipe }) => {
  const userDetail = useSelector((state) => state.auth.userDetail);

  const { data } = useGetFavoritesQuery(userDetail?._id);

  const [addFavRecipe] = useAddFavRecipeMutation();
  const [removeFavRecipe] = useRemoveFavRecipeMutation();

  const handleAddFav = async (id) => {
    try {
      await addFavRecipe({
        userId: userDetail._id,
        recipeId: id,
      }).unwrap();
      toast.success("Recipe added to favorite");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleRemoveFav = async (id) => {
    try {
      await removeFavRecipe({
        userId: userDetail._id,
        recipeId: id,
      }).unwrap();
      toast.success("Recipe removed from favorite");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <div className='relative h-[250px]'>
        <Link to={`/recipes/${recipe._id}`}>
          <img
            src={recipe.recipe_image?.secure_url}
            alt={recipe.recipe_name}
            className='h-full w-full object-cover hover:scale-x-125 transition-all duration-150 ease-in cursor-pointer'
          />
        </Link>
        <div className='w-full bg-dark opacity-70 h-6 absolute bottom-0 p-4 flex gap-2 items-center text-extra_light font-body'>
          <FaClock />
          <span>
            {recipe.hour > 0 ? `${recipe.hour}hrs :` : ""} {recipe.minute}mins
          </span>
        </div>
        {userDetail && (
          <div className='h-10 w-10 bg-secondary_extra_light right-3 rounded-full absolute top-3 flex items-center justify-center'>
            {data?.includes(recipe._id) ? (
              <FaHeart
                color='red'
                size={24}
                onClick={() => handleRemoveFav(recipe._id)}
              />
            ) : (
              <FaHeart size={24} onClick={() => handleAddFav(recipe._id)} />
            )}
          </div>
        )}
      </div>
      <div className='p-4'>
        <h3 className='text-center font-header italic font-bold capitalize'>
          {recipe.recipe_name}
        </h3>
        <div className='flex gap-3 items-center'>
          <img
            src={recipe.user.coverPhoto?.url}
            className='h-10 w-10 object-cover rounded-full object-top'
          />
          <p className='text-lg font-body capitalize'>{recipe.user.name}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
