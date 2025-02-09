export const editSeminar = async (editedData) => {
  console.debug(editedData);
  const response = await fetch(
    `http://localhost:5000/seminars/${editedData.id}`,
    {
      method: "PUT",
      body: JSON.stringify(editedData), // Предполагается, что вы отправляете JSON
      headers: {
        "Content-Type": "application/json", // Указываем тип содержимого
      },
    }
  );

  if (!response.ok) {
    throw new Error("Ошибка при редактировании семинара");
  }

  return await response.json();
};
