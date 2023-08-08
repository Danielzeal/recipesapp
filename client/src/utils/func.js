export const handleListsDelete = (oldList, i, setInstructions) => {
  const newList = oldList.filter((_, index) => i !== index);
  setInstructions(newList);
};

export const handleListChange = (item, e, setItems, setItem) => {
  if (!item) return;
  if (e.key === "Enter") {
    setItems((prevIns) => [...prevIns, item]);
    setItem("");
  }
};

export const handleImage = (e, setImgFile) => {
  const file = e.target.files[0];

  // transform the file so we can use it
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  } else {
    setImgFile("");
  }
};
