import React, { useEffect } from "react";
import { fetchSongs } from "./Songs.slice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { THeadCell } from "../../../components/table/Table.types";
import Table from "../../../components/table/Table";

type TSongsProps = {};

const songsHeadCells: THeadCell[] = [
  { name: "name", label: "Name" },
  { name: "singer", label: "Singer" },
  { name: "duration", label: "Duration" },
];

const Songs: React.FC<TSongsProps> = () => {
  const { songs } = useAppSelector((state) => state.songsReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSongs());
  }, []);
  return <Table data={songs} headCells={songsHeadCells} />;
};

export default Songs;
