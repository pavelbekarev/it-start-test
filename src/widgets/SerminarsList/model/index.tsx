import React from "react";
import ReactDOM from "react-dom/client";
import { getAttr } from "#shared/lib/getAttr";
import { ConfirmModalWindow } from "#shared/ui/ConfirmModalWindow/index.ts";
import { ModalManager } from "#shared/utils/plugins/modalManager.tsx";
import { SeminarListUI } from "../index.ts";
import { deleteSeminar } from "../api/deleteSeminar.ts";

/**
 * Класс - Список семинаров.
 */
export class SeminarsListModel {
  /**
   * data-js атрибуты для поиска по документу
   */
  attrs: any;

  /**
   * Данные для карточки
   */
  dataForItem: any;

  constructor() {
    this.attrs = {
      seminarsListNode: "[data-js-seminars-list]",
      editBtn: "[data-js-edit-button]",
      deleteBtn: "[data-js-delete-button]",
    };

    (async () => {
      this.dataForItem = await this.fetchData();
      console.debug(this.dataForItem);
      this.renderSeminarList();
    })();

    setTimeout(() => {
      this.bindEvents();
    }, 100);
  }

  private renderSeminarList() {
    const itemNode = document.querySelector(
      this.attrs.seminarsListNode
    ) as HTMLElement;

    const root = ReactDOM.createRoot(itemNode);
    root.render(<SeminarListUI data={this.dataForItem} />);
  }

  /**
   * Получение данных с сервера
   * @return {Promise}
   */
  private async fetchData() {
    return fetch("http://localhost:5000/seminars")
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Ошибка:", error));
  }

  /**
   *
   * TODO: Редактирование - нужно открыть модальное окно, в котором будет редактироваться полученная data
   * @param data
   */
  private editItem(data: any) {}

  /**
   * TODO: Открывать модальное окно подтверждения
   * @param data
   */
  private deleteItem(data: any) {
    new ModalManager({
      componentForModalWindow: <ConfirmModalWindow />,
      cb: () => deleteSeminar(data.id),
    });
  }

  /**
   * Функция отслеживания событий
   */
  private bindEvents() {
    const editButtons = document.querySelectorAll(this.attrs.editBtn);

    editButtons.forEach((editButton) => {
      editButton.addEventListener("click", () => {
        const data = editButton.getAttribute(getAttr(this.attrs.editBtn));

        this.editItem(JSON.parse(data));
      });
    });

    const deleteButtons = document.querySelectorAll(this.attrs.deleteBtn);

    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        const data = deleteButton.getAttribute(getAttr(this.attrs.deleteBtn));

        this.deleteItem(JSON.parse(data));
      });
    });
  }
}
