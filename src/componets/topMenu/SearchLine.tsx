import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { ChangeEvent } from "react";

import s from "./TopMenu.module.css";

const options = [
  { name: "Option 1" },
  { name: "Option 2" },
  { name: "Option 3" },
  // Add more options as needed
];

export const SearchLine = () => {
  return (
    <div className={s.searchWrapper}>
      <Typeahead
        clearButton
        id='selections-example'
        labelKey='name'
        onInputChange={(text: string, e: ChangeEvent<HTMLInputElement>) => {
          console.log(text, e);
        }}
        options={options}
        placeholder='Search'
        className={s.searchInput} // Apply the CSS class here
      />
    </div>
  );
};
