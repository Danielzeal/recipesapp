/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const ProfileImage = ({ recipe }) => {
  return (
    <div className='flex gap-3 text-extra_light items-center'>
      <img
        src={recipe?.user.coverPhoto.url}
        alt={recipe?.recipe_name}
        className='w-10 h-10 rounded-full object-cover object-top'
      />
      <h3 className='capitalize text-lg'>{recipe?.user.name}</h3>
    </div>
  );
};

export default ProfileImage;
