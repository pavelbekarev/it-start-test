import React from "react";

export const ConfirmModalWindow = () => {
  return (
    <div className={"confirmModalWindow"}>
      <h2 className={"confirmModalWindow__title"}>Подтверждение удаления</h2>
      <div className={"confirmModalWindow__controls"}>
        <button
          data-js-confirm-button={""}
          className={"confirmModalWindow__controls__confirm"}
          type={"submit"}
        >
          Да
        </button>
        <button
          data-js-cancel-button={""}
          className={"confirmModalWindow__controls__cancel"}
        >
          Нет
        </button>
      </div>
    </div>
  );
};
