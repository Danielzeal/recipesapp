import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Paginate = ({ pages, page, search_word = "" }) => {
  return (
    pages > 1 && (
      <div className='flex items-center justify-center mt-6'>
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x}
            className={`font-body w-8 h-8 border-y border-r border-extra_light rounded-sm first:border-l ${
              x + 1 === page ? "bg-base_color text-extra_light" : ""
            }`}
          >
            <Link
              to={
                search_word
                  ? `/search/${search_word}/page/${x + 1}`
                  : `/page/${x + 1}`
              }
            >
              {x + 1}
            </Link>
          </button>
        ))}
      </div>
    )
  );
};

export default Paginate;
