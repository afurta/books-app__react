import React, { useState } from "react";
import "./ContentBlock.css";
import Form from "../Form/Form";
import ListBooks from "./ListBooks/ListBooks";

const ContentBlock = () => {
  const [data, setData] = useState(getNewArr());
  const [booksBlock, setBooksBlock] = useState(true);

  function getNewArr() {
    let arr = [];
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue;
      }
      let item = JSON.parse(localStorage.getItem(key));
      arr.push(item);
    }
    return arr;
  }

  function getData() {
    setData(getNewArr());
  }

  const showForm = () => {
    setBooksBlock(false);
  };

  const showBooksBlock = () => {
    setBooksBlock(true);
  };

  return (
    <div className="ContentBlock">
      <div className="container">
        {booksBlock === true ? (
          <ListBooks data={data} getDataFunc={getData} showForm={showForm} />
        ) : (
          <Form getDataFunc={getData} showBooksBlock={showBooksBlock} />
        )}
      </div>
    </div>
  );
};

export default ContentBlock;
