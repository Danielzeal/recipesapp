import { useParams } from "react-router-dom";
import { Heading, ProfileImage } from "../components";
import { useGetRecipeQuery } from "../app/apis/recipesApiSlice";
import { FaClock } from "react-icons/fa";

const RecipeDetails = () => {
  const { id } = useParams();

  const { data: recipe, isLoading } = useGetRecipeQuery(id);

  return (
    <section className='mb-[60px] text-dark font-body'>
      <div className='px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto'>
        <Heading text={"Recipe"} />
      </div>
      {isLoading ? (
        <div className='mt-[100px] text-center'>
          <h3 className='font-body text-2xl md:text-3xl font-semibold'>
            Loading Recipe...
          </h3>
        </div>
      ) : (
        <>
          <figure className=''>
            <div className='h-[450px] w-full relative'>
              <img
                src={recipe?.recipe_image.secure_url}
                className='h-full w-full object-cover'
              />
              <div className='absolute top-0 left-0 bottom-0 right-0 bg-dark opacity-50' />
              <div className='absolute bottom-6 left-0 right-0 bg-dark opacity-70 px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto w-full py-4'>
                <div className='w-full flex justify-between items-center'>
                  <ProfileImage recipe={recipe} />
                  <span className='text-extra_light flex items-center gap-2'>
                    <FaClock />
                    {recipe.hour > 0 ? `${recipe.hour}hrs :` : ""}{" "}
                    {recipe.minute}mins
                  </span>
                </div>
              </div>
            </div>
            <figcaption className='text-center font-header italic font-bold capitalize'>
              {recipe?.recipe_name}
            </figcaption>
          </figure>
          <div className='px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto mt-8 flex flex-col gap-4'>
            <div>
              <Heading text={"Description"} />
              <p className='font-body px-6'>{recipe?.description}</p>
            </div>
            <div>
              <Heading text={"Ingredient"} />
              <ul className='flex items-center gap-4 pl-6 scrollbar-hide whitespace-nowrap overflow-x-scroll'>
                {recipe?.ingredients.map((ingredient, index) => (
                  <li
                    className='bg-extra_light py-2 px-6 rounded-3xl font-body'
                    key={index}
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Heading text={"Instruction"} />
              {recipe?.instructions.map((instruct, index) => (
                <div key={index} className='font-body px-6'>
                  <h4 className='font-semibold text-2xl'>Step {index + 1}:</h4>
                  <p>{instruct}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default RecipeDetails;
