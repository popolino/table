import React, { useState } from "react";
import classes from "../../features/main/Main.module.scss";

import { THeadCell } from "./Table.types";
import CustomSelect from "../../features/main/customSelect/CustomSelect";
import { TOption } from "../../features/main/customSelect/CustomSelect.types";
import clsx from "clsx";
import SvgSelector from "../svgSelector/SvgSelector";
import CustomButton from "../../features/main/customButton/CustomButton";

const getCells = (row: Record<string, any>) => {
  const cells = [...Object.values(row)];
  cells.shift();
  return cells;
};
const rowsPerPageOptions: TOption[] = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
];
export interface ITableProps {
  data: Record<string, any>[];
  headCells: THeadCell[];
}

//sortable - name столбца, по которому будет сортировка или null
//sort - "asc" | "desc" | null
//ascending - возрастание
//descending - убывание

const compare = (
  a: Record<string, any>,
  b: Record<string, any>,
  sortable: string | null,
  sort: "asc" | "desc" | null
) => {
  if (!sortable || !sort) return 0;
  if (a[sortable] < b[sortable]) {
    return sort === "asc" ? -1 : 1;
  }
  if (a[sortable] > b[sortable]) {
    return sort === "asc" ? 1 : -1;
  }
  return 0;
};

const Table: React.FC<ITableProps> = ({ data, headCells }) => {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [sortable, setSortable] = useState<string | null>(null);
  const [sort, setSort] = useState<"asc" | "desc" | null>(null);

  const [rowsPerPage, setRowsPerPage] = useState<number>(
    rowsPerPageOptions[0].value as number
  );
  const pages = Math.ceil(data.length / rowsPerPage);
  const handleChangeOption = (value: string | number) => {
    setRowsPerPage(value as number);
  };
  const handleSort = (cell: string) => {
    const isCurrentSorted = sortable === cell;

    if (!isCurrentSorted) {
      setSortable(cell);
      setSort("asc");
      return;
    }
    if (sort === "desc") {
      setSortable(null);
      setSort(null);
      return;
    }
    setSort("desc");
  };
  const offset = rowsPerPage * (selectedPage - 1);
  const limit = rowsPerPage * selectedPage;
  const getPagesString = `${offset + 1}-${
    pages === selectedPage ? data.length : offset + rowsPerPage
  } of ${data.length}`;

  return (
    <div className="table-wrapper">
      <div className="scroll-page">
        <table>
          <thead>
            {headCells.map((cell) => (
              <th key={cell.name}>
                <div
                  className={clsx(classes.column, {
                    [classes.asc]: sortable === cell.name && sort === "asc",
                    [classes.desc]: sortable === cell.name && sort === "desc",
                  })}
                >
                  <p>{cell.label}</p>
                  <CustomButton onClick={() => handleSort(cell.name)}>
                    <SvgSelector id="arrow_sort" />
                  </CustomButton>
                </div>
              </th>
            ))}
          </thead>

          <tbody>
            {data
              .filter((row, i) => i + 1 > offset && i + 1 <= limit)
              .sort((a, b) => compare(a, b, sortable, sort))
              .map((row) => (
                <tr key={row.id}>
                  {getCells(row).map((cell: any) => (
                    <td>{cell}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={clsx("panel", classes.bottom)}>
        <div className={classes.row}>
          <div className={classes.title}>Rows per page</div>
          <CustomSelect
            className={"select"}
            options={rowsPerPageOptions}
            value={rowsPerPage}
            onChange={handleChangeOption}
          />
        </div>
        <div style={{ width: "12rem" }}>{getPagesString}</div>
        <div className={classes.buttons}>
          <CustomButton
            disabled={selectedPage === 1}
            onClick={() => setSelectedPage(1)}
          >
            <SvgSelector id="first_page" />
          </CustomButton>
          <CustomButton
            disabled={selectedPage <= 1}
            onClick={() => {
              setSelectedPage(selectedPage - 1);
            }}
          >
            <SvgSelector id="arrow_left" className={classes.arrow} />
          </CustomButton>
          <CustomButton
            disabled={selectedPage === pages}
            onClick={() => {
              setSelectedPage(selectedPage + 1);
            }}
          >
            <SvgSelector id="arrow_right" className={classes.arrow} />
          </CustomButton>
          <CustomButton
            disabled={selectedPage === pages}
            onClick={() => setSelectedPage(pages)}
          >
            <SvgSelector id="last_page" />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Table;
