import React, { useState, useEffect } from "react";

/**
 * Представление модального окна для редактирования
 * @param info - данные для редактирования
 * @return {JSX.Element}
 */
export const ItemEditModalWindow = ({ info }) => {
  const { id, title, description, date, time, photo } = info;
  const keys = [...Object.keys(info)];

  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialData = keys.reduce((acc, key) => {
      acc[key] = info[key] || "";
      return acc;
    }, {});
    setFormData(initialData);
  }, [info]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = (e) => {
    console.debug("Сохраненные данные:", formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <form className={"itemEditModalWindow"} onSubmit={handleSave}>
        <h3 className={"itemEditModalWindow__title"}>Редактирование</h3>
        {keys.map((key, index) => {
          console.debug(key);
          switch (key) {
            case "id":
              return;

            case "photo":
              return (
                <div className={"itemEditModalWindow__item"} key={index}>
                  <label className={"itemEditModalWindow__item__label"}>
                    {key}
                  </label>
                  <input
                    id={key}
                    className={"itemEditModalWindow__item__input"}
                    type={"file"}
                    onChange={handleFileChange}
                  />
                </div>
              );

            default:
              return (
                <div className={"itemEditModalWindow__item"} key={index}>
                  <label className={"itemEditModalWindow__item__label"}>
                    {key}
                  </label>
                  <input
                    id={key}
                    onChange={handleInputChange}
                    className={"itemEditModalWindow__item__input"}
                    type={"text"}
                    value={formData[key] || ""}
                  />
                </div>
              );
          }
        })}
        <div className={"itemEditModalWindow__controls"}>
          <button
            type={"submit"}
            data-js-save-button={JSON.stringify(formData)}
            className={"itemEditModalWindow__controls__saveBtn"}
          >
            Сохранить
          </button>
          <button
            type={"button"}
            data-js-cancel-button={""}
            className={"itemEditModalWindow__controls__cancelBtn"}
          >
            Отменить
          </button>
        </div>
      </form>
    </>
  );
};
