import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [word, setWord] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim()) {
      setWord("");
      navigate(`/search/${word}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex items-center justify-center gap-2 font-body'
    >
      <input
        type='text'
        placeholder='Search...'
        className='border border-extra_light rounded-2xl px-4 p-1'
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button
        type='submit'
        className='bg-base_color text-extra_light rounded-full items-center flex justify-center p-2 hover:bg-light hover:text-secondary_extra_light transition-colors duration-150 ease-in placeholder:text-secondary_extra_light'
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
