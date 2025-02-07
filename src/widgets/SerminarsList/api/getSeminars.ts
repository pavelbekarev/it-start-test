export const getSeminarsAsync = async () => {
  return fetch("http://localhost:5000/seminars")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error("Ошибка:", error));
};
