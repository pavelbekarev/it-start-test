import React from "react";
import ReactDOM from "react-dom/client";

/**
 * Класс менеджер модальных окон
 * @param data - данные, необходимые для отображения в модальном окне
 * @param componentForModalWindow - компонент, который необходимо отобразить в модальном окне
 * @param cb - Callback, который будет вызываться в положительном случае (принять / редактировать)
 */
export class ModalManager {
  componentForModalWindow: React.ReactNode;

  data: any;

  cb: any;

  attrs: any;

  constructor({
    data,
    componentForModalWindow,
    cb,
  }: {
    data?: any;
    componentForModalWindow: React.ReactNode;
    cb?: any;
  }) {
    this.componentForModalWindow = componentForModalWindow;
    this.data = data;
    this.cb = cb;
    this.attrs = {
      confirmBtn: "[data-js-confirm-button]",
      cancelBtn: "[data-js-cancel-button]",
    };

    this.createModalWindowLayout();
    this.renderModalWindow();
    console.debug(this.cb);
    this.bindEvents();
  }

  private createModalWindowLayout() {
    if (!document.getElementById("modalInstance")) {
      const modalInstance = document.createElement("div");
      modalInstance.setAttribute("id", "modalInstance");
      modalInstance.classList.add("modalInstance");

      const body = document.getElementById("root");
      body.appendChild(modalInstance);
    } else return;
  }

  private closeModalWindow() {
    const modalWindowInstanceNode = document.getElementById("modalInstance");
    const body = document.getElementById("root");
    console.debug("1", modalWindowInstanceNode);
    console.debug("2", body);

    if (modalWindowInstanceNode) body.removeChild(modalWindowInstanceNode);
  }

  private renderModalWindow() {
    const modalWindowInstanceNode = document.getElementById("modalInstance");
    if (!modalWindowInstanceNode) return;

    const root = ReactDOM.createRoot(modalWindowInstanceNode);
    root.render(this.componentForModalWindow);
  }

  private bindEvents() {
    const root = document.getElementById("root");
    /**
     * Закрытие модального окна при клике вне модального окна
     */
    root.addEventListener("click", (e) => {
      const modalWindowInstanceNode = document.getElementById("modalInstance");
      if (e.target === modalWindowInstanceNode) this.closeModalWindow();

      const cancelBtn = (e.target as HTMLElement).closest(this.attrs.cancelBtn);
      if (cancelBtn) this.closeModalWindow();

      const confirmBtn = (e.target as HTMLElement).closest(
        this.attrs.confirmBtn
      );
      if (confirmBtn) {
        if (this.cb) {
          (async () => {
            await this.cb();
          })();
        }
      }
    });
  }
}
