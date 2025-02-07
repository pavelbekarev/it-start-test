import React from "react";
import { SeminarsList } from "#widgets/SerminarsList";
import { getSeminarsAsync } from "#widgets/SerminarsList/api/getSeminars";

/**
 *
 */
export const MainPage = () => {
  console.debug(getSeminarsAsync());

  return (
    <div className={"mainPage"}>
      <SeminarsList />
    </div>
  );
};
