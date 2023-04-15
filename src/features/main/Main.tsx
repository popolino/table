import Songs from "./songs/Songs";
import React from "react";
import classes from "./Main.module.scss";
import CustomSelect from "./customSelect/CustomSelect";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Movies from "./movies/Movies";
import { changeCategory } from "./songs/Songs.slice";
import { TOption } from "./customSelect/CustomSelect.types";
import clsx from "clsx";

const categoryOptions: TOption[] = [
  { value: "songs", label: "Songs" },
  { value: "movies", label: "Movies" },
];

const Main = () => {
  const { category } = useAppSelector((state) => state.songsReducer);
  console.log("category", category);
  const dispatch = useAppDispatch();

  const handleChangeCategory = (category: string) => {
    dispatch(changeCategory(category));
  };
  return (
    <main>
      <div className={classes.container}>
        <div className={clsx("panel", classes.row)}>
          <h1>{category}</h1>
          <CustomSelect
            options={categoryOptions}
            value={category}
            onChange={handleChangeCategory}
          />
        </div>
        {category === categoryOptions[0].value ? <Songs /> : <Movies />}
      </div>
    </main>
  );
};
export default Main;
