import React from "react";
import ReactDOM from "react-dom/client";
import { getAttr } from "#shared/lib/getAttr";
import { ConfirmModalWindow } from "#shared/ui/ConfirmModalWindow/index.ts";
import { ItemEditModalWindow } from "#shared/ui/ItemEditModalWindow/index.ts";
import { ModalManager } from "#shared/utils/plugins/modalManager.tsx";
import { deleteSeminar } from "../api/deleteSeminar.ts";
import { editSeminar } from "../api/editSeminars.ts";
import { SeminarListUI } from "../index.ts";

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
      saveBtn: "[data-js-save-button]",
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
   * @param info
   */
  private editItem(info: any) {
    new ModalManager({
      data: info,
      componentForModalWindow: <ItemEditModalWindow info={info} />,
      cb: (editedData) => {
        // Теперь сюда приходят отредактированные данные
        editSeminar(editedData);
      },
    });
  }

  private refreshSeminarList() {
    (async () => {
      this.dataForItem = await this.fetchData();
      console.debug(this.dataForItem);
      this.renderSeminarList();
    })();
  }

  /**
   * TODO: Открывать модальное окно подтверждения
   * @param data
   */
  private deleteItem(data: any) {
    new ModalManager({
      componentForModalWindow: <ConfirmModalWindow />,
      cb: async () => {
        try {
          await deleteSeminar(data.id); // Удаляем семинар через API
          this.refreshSeminarList(); // Перерисовываем список семинаров после успешного удаления
        } catch (error) {
          console.error("Ошибка при удалении семинара:", error);
        }
      },
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
        console.debug("!!! Внимение !!!");

        console.debug(data);
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
