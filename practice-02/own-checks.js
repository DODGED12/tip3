// Собственные проверки ПР2 (дополняют checks.js, не заменяют его).
import assert from "node:assert/strict";
import { demoTasks } from "./src/data.js";
import { addTask, removeTask, setTaskCompleted } from "./src/task-service.js";

let passed = 0;
function check(name, action) {
  action();
  passed += 1;
  console.log(`OK: ${name}`);
}

const fresh = () => demoTasks.map((task) => ({ ...task }));

check("1. Добавление после удаления", () => {
  const start = fresh();
  const removed = removeTask(start, 7);
  const added = addTask(removed.tasks, 30, "Новая после удаления");
  assert.equal(added.ok, true);
  assert.equal(added.tasks.length, 4);
  assert.equal(added.tasks.at(-1).id, 30);
  assert.deepEqual(start, fresh(), "исходный список не изменён");
});

check("2. Изменение первой и последней записи", () => {
  const start = fresh();
  const first = setTaskCompleted(start, 1, false);
  const last = setTaskCompleted(first.tasks, 10, false);
  assert.equal(last.tasks[0].completed, false);
  assert.equal(last.tasks[3].completed, false);
  assert.equal(last.tasks[1].completed, start[1].completed);
  assert.notEqual(last.tasks, start);
  assert.notEqual(last.tasks[0], start[0], "новый объект выбранной записи");
  assert.equal(last.tasks[1], start[1], "неизменённая запись переиспользована");
});

check("3. Последовательное обновление нескольких задач", () => {
  const start = fresh();
  const step1 = setTaskCompleted(start, 4, true);
  const step2 = setTaskCompleted(step1.tasks, 7, true);
  assert.equal(step2.tasks.every((task) => task.completed), true);
  assert.deepEqual(start, fresh(), "исходный список не изменён");
});

console.log(`Собственных проверок пройдено: ${passed}; не пройдено: 0.`);
