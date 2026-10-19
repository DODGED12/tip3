import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  findTaskById,
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

// Вывод сводки. Все вычисления — в task-service.js, здесь только отображение.
function printStats(label, tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  console.log(`[${label}] Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);
  if (total === 0) {
    console.log("Задач пока нет");
  } else {
    console.log(`Прогресс: ${progress.toFixed(1)}%`);
  }
}

// Применяет результат операции: при успехе возвращает новый список,
// при отказе выводит ошибку и возвращает прежний список без изменений.
function apply(current, result) {
  if (result.ok) {
    return result.tasks;
  }
  console.error(`Ошибка: ${result.error}`);
  return current;
}

function runScenario(title, initial, steps) {
  console.log(`\n===== ${title} =====`);
  let current = initial;
  console.log("Исходные задачи:");
  console.table(current);
  console.log("Названия:", getTaskTitles(current));
  console.log("Невыполненные id:", getPendingTasks(current).map((task) => task.id));
  printStats("Исходный набор", current);

  for (const step of steps) {
    current = apply(current, step.run(current));
    printStats(step.label, current);
  }

  console.log("Итоговые задачи:");
  console.table(current);
  console.log("Итоговые id:", current.map((task) => task.id));
  return current;
}

// ---------- Общий сценарий (раздел 6.5) ----------
const snapshotDemo = JSON.stringify(demoTasks);

const finalDemo = runScenario("Общий сценарий (demoTasks)", demoTasks, [
  { label: "Добавление id 20", run: (t) => addTask(t, 20, "Добавить проверку", "high") },
  { label: "Выполнение id 4", run: (t) => setTaskCompleted(t, 4, true) },
  { label: "Переименование id 10", run: (t) => renameTask(t, 10, "Подготовить инструкцию запуска") },
  { label: "Удаление id 7", run: (t) => removeTask(t, 7) },
]);

// Показ обработанного отказа: id 20 уже существует. Состояние не меняется.
console.log("\nПовторное добавление id 20 (ожидается отказ):");
const duplicate = addTask(finalDemo, 20, "Дубликат");
const afterDuplicate = apply(finalDemo, duplicate);
console.log("Состояние не изменилось:", afterDuplicate === finalDemo);

const { id: pendingId } = getPendingTasks(finalDemo)[0];
console.log("Единственная невыполненная задача, id =", pendingId);
console.log("Поиск по id 4:", findTaskById(finalDemo, 4));

console.log(
  "demoTasks сохранён:",
  JSON.stringify(demoTasks) === snapshotDemo,
  "| id:",
  demoTasks.map((task) => task.id),
);

// ---------- Индивидуальный вариант (раздел 7) ----------
console.log(`\nНомер варианта: ${variantNumber}`);
const snapshotVariant = JSON.stringify(variantTasks);

const finalVariant = runScenario("Индивидуальный вариант (variantTasks)", variantTasks, [
  { label: "Добавление id 80", run: (t) => addTask(t, 80, "Подготовить презентацию портфолио", "low") },
  { label: "completed = true для id 11", run: (t) => setTaskCompleted(t, 11, true) },
  { label: "Переименование id 23", run: (t) => renameTask(t, 23, "Написать раздел «Обо мне»") },
  { label: "Удаление id 37", run: (t) => removeTask(t, 37) },
]);

console.log("\nПовторное добавление id 80 (ожидается отказ):");
const afterVariantDuplicate = apply(finalVariant, addTask(finalVariant, 80, "Дубликат"));
console.log("Состояние не изменилось:", afterVariantDuplicate === finalVariant);

console.log(
  "variantTasks сохранён:",
  JSON.stringify(variantTasks) === snapshotVariant,
  "| id:",
  variantTasks.map((task) => task.id),
);
