import React, { useEffect, useState } from "react";

/**
 * Виджет для отображения семинаров
 * @return {JSX}
 */
export const SeminarsList = () => {
  const [seminarInfo, setSeminarInfo] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className={"seminarsList"}>
      {seminarInfo.map((item, key) => {
        return <p key={key}>{item.title}</p>;
      })}
    </div>
  );
};
