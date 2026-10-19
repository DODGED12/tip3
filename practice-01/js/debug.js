"use strict";

// ИСПРАВЛЕННАЯ версия.
// Исходная версия содержала две ошибки (см. README):
//   1) const completedTotal = completedText + additionalText;  -> "32" (конкатенация)
//      const remainingTasks = plannedText - completedTotal;    -> -24
//   2) for (let taskNumber = 1; taskNumber < 4; ...)           -> сумма 6, а не 10

const plannedText = "8";
const completedText = "3";
const additionalText = "2";

// Исправление 1: явно преобразуем строки в числа до сложения.
const completedTotal = Number(completedText) + Number(additionalText);
const remainingTasks = Number(plannedText) - completedTotal;

console.log("Выполнено:", completedTotal);
console.log("Осталось:", remainingTasks);

let controlSum = 0;

// Исправление 2: <= вместо <, чтобы включить задачу № 4.
for (let taskNumber = 1; taskNumber <= 4; taskNumber += 1) {
  controlSum += taskNumber;
}

console.log("Контрольная сумма:", controlSum);
