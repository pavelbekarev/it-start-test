import React from "react";

/**
 * Представление секции семинаров
 * @return {JSX}
 */
export const SeminarListUI = ({ data }) => {
  /**
   * В значения атрибутов data-js-edit-button и data-js-delete-button
   * помещается значение текущего item.
   * Сделано так, чтобы в модели SeminarsListModel получать эти данные из атрибута
   */
  return data.map((item, key) => (
    <div className={"seminarListUI"} key={key}>
      <img src={item.photo} alt={"Изображение"} />
      <h2 className={"seminarListUI__title"}>{item.title}</h2>
      <p className={"seminarListUI__description"}>{item.description}</p>
      <p className={"seminarListUI__date"}>{item.date}</p>
      <p className={"seminarListUI__time"}>Начало в {item.time}</p>
      <div className={"seminarListUI__controls"}>
        <button
          data-js-edit-button={JSON.stringify(item)}
          className={
            "seminarListUI__controls__editBtn seminarListUI__controls__btn"
          }
        >
          Редактировать
        </button>
        <button
          data-js-delete-button={JSON.stringify(item)}
          className={
            "seminarListUI__controls__deleteBtn seminarListUI__controls__btn"
          }
        >
          Удалить
        </button>
      </div>
    </div>
  ));
};
