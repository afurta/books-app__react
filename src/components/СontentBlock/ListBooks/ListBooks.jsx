import React, { useState } from "react";
import ListBooksItem from "./ListBooksItem/ListBooksItem";
import "./ListBooks.css";
import FormEdit from "../../FormEdit/FormEdit";

const ListBooks = ({ data, getDataFunc, showForm }) => {
  const [formEdit, setFormEdit] = useState(false);
  const [editObj, setEditObj] = useState({});
  const editForm = e => {
    const elem = e.target.getAttribute("data-id");
    const obj = JSON.parse(localStorage.getItem(`${elem}`));
    setEditObj(obj);
    setFormEdit(true);
  };
  const showBooksBlock = () => {
    setFormEdit(false);
  };
  return (
    <div className="row ">
      {formEdit ? (
        <FormEdit
          editObj={editObj}
          getDataFunc={getDataFunc}
          showBooksBlock={showBooksBlock}
        />
      ) : (
        <>
          <div className="listBooks_add-btn" onClick={showForm}>
            <i className="material-icons medium">add</i>
          </div>
          <div className="books__container ">
            {data.map((elem, index) => (
              <ListBooksItem
                {...elem}
                key={index}
                getDataFunc={getDataFunc}
                editForm={editForm}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListBooks;
