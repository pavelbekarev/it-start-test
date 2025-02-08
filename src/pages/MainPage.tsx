import React, { useEffect } from "react";
import { SeminarsList } from "#widgets/SerminarsList";
import { SeminarsListModel } from "#widgets/SerminarsList/model";

/**
 *
 */
export const MainPage = () => {
  useEffect(() => {
    new SeminarsListModel();
  }, []);

  return (
    <div className={"mainPage"}>
      <div data-js-seminars-list={""} className={"seminarsList"} />
    </div>
  );
};
