"use strict";

// Вариант 3
const totalTasks = 9;
const completedTasks = 9;

const MAX_TASKS = 1000;

// Проверка: только числа (строки не преобразуем), конечные, целые, в диапазоне.
function validationError(total, completed) {
  if (typeof total !== "number" || typeof completed !== "number") {
    return "количество задач должно быть числом, а не строкой или другим типом";
  }
  if (!Number.isFinite(total) || !Number.isFinite(completed)) {
    return "недопустимое числовое значение (NaN или Infinity)";
  }
  if (!Number.isInteger(total) || !Number.isInteger(completed)) {
    return "количество задач должно быть целым числом";
  }
  if (total < 0 || completed < 0) {
    return "количество задач не может быть отрицательным";
  }
  if (total > MAX_TASKS) {
    return `всего задач не может быть больше ${MAX_TASKS}`;
  }
  if (completed > total) {
    return "выполнено больше задач, чем существует";
  }
  return null;
}

const error = validationError(totalTasks, completedTasks);

if (error !== null) {
  console.log(`Ошибка: ${error}`);
} else if (totalTasks === 0) {
  // При нуле процент не считаем — иначе деление на ноль даст NaN.
  console.log("Задач пока нет");
} else {
  const remainingTasks = totalTasks - completedTasks;
  const percentage = (completedTasks / totalTasks) * 100;

  // Статус — по исходным количествам, а не по округлённому проценту.
  let status;
  if (completedTasks === 0) {
    status = "Не начато";
  } else if (completedTasks === totalTasks) {
    status = "Завершено";
  } else {
    status = "В работе";
  }

  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${remainingTasks}`);
  console.log(`Прогресс: ${percentage.toFixed(1)}%`);
  console.log(`Статус: ${status}`);
}
