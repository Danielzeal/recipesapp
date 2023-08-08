/* eslint-disable react/prop-types */
const Button = ({ className, text, onClick, type }) => {
  return (
    <button
      className={`${className} font-body text-extra_light bg-base_color rounded-2xl hover:bg-light hover:text-secondary_extra_light transition-colors duration-150 ease-in-out px-4 py-2`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
