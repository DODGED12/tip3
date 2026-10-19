"use strict";

// Вариант 3
const totalTasks = 9;
const completedTasks = 9;
const dailyLimit = 3;

const MAX_VALUE = 1000;

function validationError(total, completed, limit) {
  if (
    typeof total !== "number" ||
    typeof completed !== "number" ||
    typeof limit !== "number"
  ) {
    return "все значения должны быть числами, а не строками или другими типами";
  }
  if (!Number.isFinite(total) || !Number.isFinite(completed) || !Number.isFinite(limit)) {
    return "недопустимое числовое значение (NaN или Infinity)";
  }
  if (!Number.isInteger(total) || !Number.isInteger(completed) || !Number.isInteger(limit)) {
    return "все значения должны быть целыми числами";
  }
  if (total < 0 || completed < 0) {
    return "количество задач не может быть отрицательным";
  }
  if (total > MAX_VALUE) {
    return `всего задач не может быть больше ${MAX_VALUE}`;
  }
  if (completed > total) {
    return "выполнено больше задач, чем существует";
  }
  // Проверка нормы обязательна даже если задач не осталось.
  if (limit < 1 || limit > MAX_VALUE) {
    return `дневная норма должна быть от 1 до ${MAX_VALUE}`;
  }
  return null;
}

const error = validationError(totalTasks, completedTasks, dailyLimit);

if (error !== null) {
  console.log(`Ошибка: ${error}`);
} else {
  let remaining = totalTasks - completedTasks;
  let day = 0;

  console.log(`Осталось задач: ${remaining}`);

  if (remaining === 0) {
    console.log("Все задачи уже выполнены");
  }

  // Каждая итерация приближает остаток к нулю, поэтому цикл конечен.
  while (remaining > 0) {
    day += 1;
    const doneToday = Math.min(dailyLimit, remaining);
    remaining -= doneToday;
    console.log(`День ${day}: выполнено ${doneToday}, осталось ${remaining}`);
  }

  console.log(`Потребуется дней: ${day}`);
}
