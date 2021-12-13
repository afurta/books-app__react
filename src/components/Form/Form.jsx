import React, { useRef, useState } from "react";
import "./Form.css";
import uniqid from "uniqid";

const Form = ({ getDataFunc, showBooksBlock, editObj }) => {
  const [baseImage, setBaseImage] = useState("");
  const [span, setSpan] = useState(false);
  const authorName = useRef();
  const bookText = useRef();

  const clickHandler = event => {
    event.preventDefault();
    if (authorName.current.value !== "" && bookText.current.value !== "") {
      setSpan(false);
      const object = {
        authorName: authorName.current.value,
        bookText: bookText.current.value,
        id: uniqid(),
        img: baseImage,
      };
      localStorage.setItem(object.id, JSON.stringify(object));
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
        <h2>Добавить книгу</h2>
        <label>
          Название книги
          <input
            type="text"
            name="number"
            ref={authorName}
            defaultValue={editObj}
            required
          />
        </label>
        <label>
          Текст
          <input
            type="text"
            name="firmName"
            ref={bookText}
            defaultValue={editObj}
            required
          />
        </label>
        <label>
          Изображение
          <input
            type="file"
            name="firmName"
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
          onClick={e => clickHandler(e)}
        >
          Отправить
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  );
};

export default Form;
