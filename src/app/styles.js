const files = await import.meta.webpackContext("../", {
  regExp: /\.scss$/,
  mode: "eager",
});

// Определите массив с приоритетами
const priorityOrder = [
  "./app/styles/vars.scss", // Полный путь к файлу
  "./app/styles/palette.scss",
  "./app/styles/fonts.scss",
  "./app/styles/global.scss",
  "./app/styles/utils.scss",
  // добавьте другие файлы по мере необходимости
];

// Получите все файлы
const allFiles = files.keys();

// Фильтруйте файлы, чтобы разделить на те, которые в приоритете, и остальные
const prioritizedStyles = priorityOrder.filter(
  (name) => allFiles.includes(name) // Проверяем на соответствие полному пути
);

// Отфильтруйте остальные стили
const otherStyles = allFiles.filter(
  (path) => !prioritizedStyles.includes(path)
);

// Объедините массивы, чтобы сначала загружались приоритетные стили
const orderedFiles = [...prioritizedStyles, ...otherStyles];

// Загружайте стили в нужном порядке
const styles = await Promise.all(orderedFiles.map((path) => files(path)));

export { styles };
