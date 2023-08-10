/* eslint-disable react/prop-types */
import Button from "./Button";
import {
  handleImage,
  handleListChange,
  handleListsDelete,
} from "../utils/func";
import { FaTimes } from "react-icons/fa";

const Form = ({
  handleSubmit,
  recipe_name,
  setDescription,
  setRecipeName,
  setHour,
  description,
  ingredients,
  ingredient,
  setIngredient,
  imgFile,
  instruction,
  setIngredients,
  setInstructions,
  setInstruction,
  instructions,
  setImgFile,
  hour,
  setMinute,
  minute,
}) => {
  const handleIngredients = (e) => {
    handleListChange(ingredient, e, setIngredients, setIngredient);
  };

  const handleInstruction = (e) => {
    handleListChange(instruction, e, setInstructions, setInstruction);
  };

  const handleInstructionDelete = (i) => {
    handleListsDelete(instructions, i, setInstructions);
  };

  const handleIngredientDelete = (i) => {
    handleListsDelete(ingredients, i, setIngredients);
  };

  const handleImageChange = async (e) => {
    handleImage(e, setImgFile);
  };

  const checkKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit}
      onKeyDown={checkKey}
    >
      <input
        type='text'
        placeholder='Enter recipe name'
        className='w-full h-10 rounded-2xl px-4 outline-none'
        value={recipe_name}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <textarea
        rows={3}
        className='w-full rounded-2xl px-4 py-4 outline-none'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Enter recipe description'
      ></textarea>
      <input
        type='text'
        placeholder='Enter ingredient'
        className='w-full h-10 rounded-2xl px-4 outline-none'
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        onKeyDown={handleIngredients}
      />
      <p className='text-xs text-dark px-4'>Press Enter to add ingredient.</p>
      {ingredients.length ? (
        <div className='flex gap-2 scrollbar-hide whitespace-nowrap overflow-x-scroll'>
          {ingredients.map((ingre, ind) => (
            <div
              key={ind}
              className='flex gap-4 items-center justify-center bg-base_color px-4 py-2 rounded-2xl'
            >
              <span className='text-extra_light'>{ingre}</span>
              <span
                className='text-extra_light'
                onClick={() => handleIngredientDelete(ind)}
              >
                <FaTimes />
              </span>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <input
        type='text'
        placeholder='Enter instruction'
        className='w-full h-10 rounded-2xl px-4 outline-none'
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        onKeyDown={handleInstruction}
      />
      <p className='text-xs text-dark px-4'>
        Press Enter key to add instruction.
      </p>
      {instructions.length ? (
        <div className='flex flex-col gap-2'>
          {instructions.map((inst, i) => (
            <p
              key={i}
              className='w-full bg-base_color text-extra_light rounded-2xl py-2 px-4 relative'
            >
              {inst}
              <span
                className='absolute right-4 text-extra_light'
                onClick={() => handleInstructionDelete(i)}
              >
                <FaTimes />
              </span>
            </p>
          ))}
        </div>
      ) : (
        ""
      )}
      <input
        onChange={handleImageChange}
        type='file'
        className='border border-white py-2 px-4 bg-white rounded-2xl text-xs'
        accept='image/'
      />
      <div className='w-full h-[200px] bg-white border-2 rounded-2xl border-secondary_extra_light overflow-hidden'>
        {imgFile ? (
          <img
            src={imgFile}
            alt='recipe image'
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='flex justify-center items-center w-full h-full'>
            <p>Preview your image</p>
          </div>
        )}
      </div>
      <div className='flex justify-between gap-4'>
        <div className='w-1/2'>
          <label htmlFor='hour'>Hour</label> <br />
          <input
            type='number'
            className='w-full h-10 rounded-2xl px-4 outline-none'
            max={10}
            name='hour'
            min={0}
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
        </div>
        <div className='w-1/2'>
          <label htmlFor='minute'>Minute</label> <br />
          <input
            type='number'
            className='w-full h-10 rounded-2xl px-4 outline-none'
            value={minute}
            name='minute'
            min={0}
            max={59}
            onChange={(e) => setMinute(e.target.value)}
          />
        </div>
      </div>
      <Button text={"Submit"} className={"self-start"} />
    </form>
  );
};

export default Form;
