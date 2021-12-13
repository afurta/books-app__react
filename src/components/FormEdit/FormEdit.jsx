import React, { useRef, useState } from "react";
import "./FormEdit.css";

const FormEdit = ({ editObj, getDataFunc, showBooksBlock }) => {
  const [baseImage, setBaseImage] = useState(editObj.img);
  const [span, setSpan] = useState(false);
  const authorName = useRef();
  const bookText = useRef();

  const clickHandler = (e, id) => {
    e.preventDefault();
    if (authorName.current.value !== "" && bookText.current.value !== "") {
      // const item = JSON.parse(localStorage.getItem(`${id}`));
      const newObj = {
        ...editObj,
        authorName: authorName.current.value,
        bookText: bookText.current.value,
        img: baseImage,
      };
      localStorage.setItem(id, JSON.stringify(newObj));
      getDataFunc();
    } else {
      setSpan(true);
    }
  };

  const uploadImage = async e => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = error => {
        reject(error);
      };
    });
  };

  return (
    <div className="form-block">
      <form className="form">
        <div>
          <i className=" medium material-icons" onClick={showBooksBlock}>
            close
          </i>
        </div>
        <h2>Изменить</h2>
        <label>
          Название книги
          <input
            type="text"
            name="number"
            ref={authorName}
            required
            defaultValue={editObj.authorName}
          />
        </label>
        <label>
          Текст
          <input
            type="text"
            name="firmName"
            ref={bookText}
            required
            defaultValue={editObj.bookText}
          />
        </label>
        <label>
          Изображение
          <input
            type="file"
            name="firmName"
            // defaultValue={editObj.img}
            onChange={e => {
              uploadImage(e);
            }}
            required
          />
        </label>
        {span === true ? <div className="divError"> Ошибка</div> : null}
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={e => clickHandler(e, editObj.id)}
        >
          Изменить
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  );
};

export default FormEdit;
