import { useGetAllFavoritesQuery } from "../app/apis/recipesApiSlice";
import { Heading, Recipes, Container } from "../components";
import { useSelector } from "react-redux";

const SavedRecipes = () => {
  const userDetail = useSelector((state) => state.auth.userDetail);

  const { data, isLoading } = useGetAllFavoritesQuery(userDetail._id);

  return (
    <section>
      <Container className='pb-10 text-dark font-body'>
        <Heading text={"Recipe"} />
        {isLoading ? (
          <div className='mt-[150px] text-center'>
            <h3 className='font-body text-2xl md:text-3xl font-semibold'>
              Loading Recipes...
            </h3>
          </div>
        ) : !data || !data?.favorite_recipes ? (
          <div className='mt-[150px] text-center'>
            <h3 className='font-body text-2xl md:text-3xl font-semibold'>
              Add to your recipe collections
            </h3>
          </div>
        ) : (
          <>
            <Recipes recipes={data?.favorite_recipes} loading={isLoading} />
          </>
        )}
      </Container>
    </section>
  );
};

export default SavedRecipes;
