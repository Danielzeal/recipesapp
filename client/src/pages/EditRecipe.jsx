import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { toast } from "react-toastify";
import {
  useGetRecipeQuery,
  useUpdateRecipeMutation,
} from "../app/apis/recipesApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../components";

const EditRecipe = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [recipe_name, setRecipeName] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const { data: recipe } = useGetRecipeQuery(id);
  const [updateRecipe, { isLoading }] = useUpdateRecipeMutation();

  useEffect(() => {
    if (recipe) {
      setIngredients(recipe?.ingredients);
      setRecipeName(recipe?.recipe_name);
      setDescription(recipe?.description);
      setInstructions(recipe?.instructions);
      setHour(recipe?.hour);
      setMinute(recipe.minute);
    }
  }, [recipe]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !recipe_name ||
      !description ||
      !imgFile ||
      !Array.isArray(ingredients) ||
      !ingredients.length ||
      !Array.isArray(instructions) ||
      !instructions.length
    ) {
      toast.error("All field are required");
    } else {
      try {
        await updateRecipe({
          id,
          recipe_name,
          hour: Number(hour) || 0,
          minute: Number(minute) || 0,
          description,
          imgFile,
          ingredients,
          instructions,
        }).unwrap();
        toast.success("Recipe updated");
        navigate(`/recipes/${id}`);
      } catch (err) {
        toast.error(err?.data?.message);
      }
    }
  };

  return (
    <section className='text-dark font-body'>
      <div className='px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto'>
        <Heading text={"Create Recipe"} />
      </div>
      {isLoading && <h3>Loading...</h3>}
      <div className='max-w-[530px] mx-auto w-full bg-extra_light rounded-2xl px-4 py-8 mt-3 overflow-hidden'>
        <Form
          handleSubmit={handleSubmit}
          recipe_name={recipe_name}
          setDescription={setDescription}
          setRecipeName={setRecipeName}
          setHour={setHour}
          description={description}
          ingredients={ingredients}
          ingredient={ingredient}
          setIngredient={setIngredient}
          imgFile={imgFile}
          instruction={instruction}
          setIngredients={setIngredients}
          setInstructions={setInstructions}
          setInstruction={setInstruction}
          instructions={instructions}
          setImgFile={setImgFile}
          hour={hour}
          setMinute={setMinute}
          minute={minute}
        />
      </div>
    </section>
  );
};

export default EditRecipe;
