import { useState } from "react";
import Heading from "../components/Heading";
import { toast } from "react-toastify";
import { useCreateRecipeMutation } from "../app/apis/recipesApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form } from "../components";

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [instructions, setInstructions] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [recipe_name, setRecipeName] = useState("");
  const [description, setDescription] = useState("");

  const userDetail = useSelector((state) => state.auth.userDetail);

  const [createRecipe, { isLoading }] = useCreateRecipeMutation();

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
        await createRecipe({
          recipe_name,
          description,
          imgFile,
          ingredients,
          minute: Number(minute) || 0,
          hour: Number(hour) || 0,
          instructions,
          user: userDetail._id,
        }).unwrap();
        toast.success("Recipe created");
        navigate("/my-recipes");
      } catch (err) {
        toast.error("Server error please try again!");
        console.log(err?.data?.message);
      }
    }
  };

  return (
    <section className='text-dark font-body'>
      <div className='px-4 lg:px-16 sm:px-12 md:px-6 2xl:max-w-7xl mx-auto'>
        <Heading text={"Create Recipe"} />
      </div>
      {isLoading && <h4>Loading...</h4>}
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

export default CreateRecipe;
