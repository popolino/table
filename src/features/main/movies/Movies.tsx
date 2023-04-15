import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchMovies } from "./Movies.slice";
import Table from "../../../components/table/Table";
import { THeadCell } from "../../../components/table/Table.types";

type TMoviesProps = {};

const moviesHeadCells: THeadCell[] = [
  { name: "name", label: "Name" },
  { name: "grade", label: "Grade" },
  { name: "duration", label: "Duration" },
];

const Movies: React.FC<TMoviesProps> = () => {
  const { movies } = useAppSelector((state) => state.moviesReducer);
  console.log(movies);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  return (
    <>
      <Table data={movies} headCells={moviesHeadCells} />
    </>
  );
};

export default Movies;
