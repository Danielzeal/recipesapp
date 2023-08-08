/* eslint-disable react/prop-types */
const Heading = ({ text }) => {
  return (
    <h3 className='inline-block text-2xl font-header mb-3'>
      {text}
      <div className='bg-secondary_base h-[3px] w-[50%]' />
    </h3>
  );
};

export default Heading;
