import React from "react";
import "./ListBookItem.css";

const ListBooksItem = ({
  authorName,
  bookText,
  id,
  img,
  getDataFunc,
  editForm,
}) => {
  const deleteHandler = e => {
    const elem = e.target.getAttribute("data-id");
    localStorage.removeItem(`${elem}`);
    getDataFunc();
  };
  return (
    <div className="col s12 m3">
      <div className="card blue-grey darken-1">
        <div className="cardClose">
          <i
            data-id={id}
            className="small material-icons"
            onClick={e => deleteHandler(e)}
          >
            close
          </i>
        </div>
        <div className="cardEdit">
          <i className="small material-icons" data-id={id} onClick={editForm}>
            edit
          </i>
        </div>
        <div className="card-content white-text">
          <img src={img} height="205px" width="145px" alt="img" />
          <span className="card-title">{authorName}</span>
          <p>{bookText}</p>
        </div>
      </div>
    </div>
  );
};

export default ListBooksItem;
