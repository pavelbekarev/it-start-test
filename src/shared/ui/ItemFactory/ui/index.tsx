import React, { useEffect } from "react";
import { ItemFactoryModel } from "../model";

/**
 * Представление одной карточки
 */
export const ItemFactoryUI = ({ data }) => {
  useEffect(() => {
    new ItemFactoryModel();
  }, []);

  /**
   * Изображение не доступно. Переходя по ссылке, пишет, что меня заблокировали.
   */
  return (
    <>
      <img src={data.photo} alt={"Изображение"} />
      <h2 className={"itemFactoryUI__title"}>{data.title}</h2>
      <p className={"itemFactoryUI__description"}>{data.description}</p>
      <p className={"itemFactoryUI__date"}>{data.date}</p>
      <p className={"itemFactoryUI__time"}>Начало в {data.time}</p>
      <div className={"itemFactoryUI__controls"}>
        <button
          data-js-edit-button={""}
          className={
            "itemFactoryUI__controls__editBtn itemFactoryUI__controls__btn"
          }
        >
          Редактировать
        </button>
        <button
          data-js-delete-button={""}
          className={
            "itemFactoryUI__controls__deleteBtn itemFactoryUI__controls__btn"
          }
        >
          Удалить
        </button>
      </div>
    </>
  );
};
