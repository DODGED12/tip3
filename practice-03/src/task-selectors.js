// Выборка по фильтру. Вход: корректный массив задач и фильтр all/pending/completed.
// Результат: всегда новый массив; порядок и исходные объекты сохраняются.
export function getVisibleTasks(tasks, filter = "all") {
  if (filter === "pending") {
    return tasks.filter((task) => task.completed === false);
  }
  if (filter === "completed") {
    return tasks.filter((task) => task.completed === true);
  }
  // "all": копия массива, чтобы вызывающий код не получил исходный массив.
  return [...tasks];
}
