/* eslint-disable react/prop-types */
const Container = ({ children, className }) => {
  return (
    <div
      className={`${className} px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto`}
    >
      {children}
    </div>
  );
};

export default Container;
