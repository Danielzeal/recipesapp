import { useParams } from "react-router-dom";
import { useGetRecipesQuery } from "../app/apis/recipesApiSlice";
import { Heading, Paginate, Recipes, Container } from "../components";

const Home = () => {
  const { search_term, pageNumber } = useParams();
  const { data, isLoading } = useGetRecipesQuery({ search_term, pageNumber });

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
        ) : !data ? (
          <div className='mt-[150px] text-center'>
            <h3 className='font-body text-2xl md:text-3xl font-semibold'>
              No data in our recipe database!
            </h3>
          </div>
        ) : (
          <>
            <Recipes recipes={data?.recipes} loading={isLoading} />
            {data?.totalpages > 1 && (
              <div className='w-full'>
                <Paginate pages={data?.totalpages} page={data?.page} />
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default Home;
