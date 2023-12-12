import { Typeahead } from "react-bootstrap-typeahead"; // Import the Typeahead component


import s from "./TopMenu.module.css";
import { ChangeEvent } from "react";

const options = [
  { name: "Option 1" },
  { name: "Option 2" },
  { name: "Option 3" },
  // Add more options as needed
];


export const SerachLine = () => {
    return(

      <Typeahead
        clearButton

        id='selections-example'
        labelKey='name'
        onInputChange={(text: string, e: ChangeEvent<HTMLInputElement>) => {
          console.log(text, e);
        }}
        options={options}
        placeholder='Search'
      />



    )
}