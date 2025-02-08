import { SeminarInterface } from "../config/interface";

/**
 * Класс фабрика карточек
 */
export class ItemFactoryModel {
  target: string;

  attrs: any;

  data: SeminarInterface;

  /**
   * Класс-генератор карточек
   * @param data - информация для отображения на карточке
   * @param target - узел DOM-элемента, на котором нужно отобразить карточку
   */
  constructor() {
    this.attrs = {
      editBtn: "[data-js-edit-button]",
      deleteBtn: "[data-js-delete-button]",
    };

    setTimeout(() => {
      this.bindEvents();
    }, 100);
  }

  private bindEvents() {
    document.querySelector(this.attrs.editBtn).addEventListener("click", () => {
      console.debug("clicked");
    });
  }
}
