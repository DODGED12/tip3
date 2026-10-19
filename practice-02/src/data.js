// Общий контрольный набор. Для своего варианта ниже предусмотрен отдельный массив.
// Идентификатор задачи не совпадает с её индексом в массиве.
export const demoTasks = [
  { id: 1, title: "Изучить функции", completed: true, priority: "medium" },
  { id: 4, title: "Подготовить модель задач", completed: false, priority: "high" },
  { id: 7, title: "Проверить методы массивов", completed: false, priority: "low" },
  { id: 10, title: "Оформить README", completed: true, priority: "medium" },
];

// Вариант 3: «Создание сайта-портфолио». Выполнены первые K = 2 задачи.
// Приоритеты включают low, medium и high. Приоритет новой задачи id = 80 — low.
export const variantNumber = 3;
export const variantTasks = [
  { id: 11, title: "Выбрать структуру сайта-портфолио", completed: true, priority: "high" },
  { id: 23, title: "Подготовить тексты о себе", completed: true, priority: "medium" },
  { id: 37, title: "Собрать список проектов для показа", completed: false, priority: "low" },
  { id: 41, title: "Сверстать главную страницу", completed: false, priority: "high" },
  { id: 58, title: "Добавить контактную форму", completed: false, priority: "medium" },
  { id: 64, title: "Опубликовать сайт и проверить ссылки", completed: false, priority: "low" },
];
