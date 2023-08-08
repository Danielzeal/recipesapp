import Card from "./Card";

/* eslint-disable react/prop-types */
const Recipes = ({ recipes }) => {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 pt-6'>
      {recipes &&
        recipes.map((recipe) => (
          <div
            key={recipe._id}
            className='bg-extra_light rounded-2xl overflow-hidden hover:bg-secondary_extra_light transition-colors duration-150 ease-in'
          >
            <Card recipe={recipe} />
          </div>
        ))}
    </div>
  );
};

export default Recipes;
