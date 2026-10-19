// Прикладная логика задач. Здесь нет console.log, DOM и глобального изменяемого состояния:
// каждая функция работает только с переданными аргументами.
// Ожидаемые ошибки возвращаются как данные: { ok: false, error: "..." }.

const PRIORITIES = ["low", "medium", "high"];
const MAX_TITLE_LENGTH = 100;

// ---------- внутренние функции проверки ----------

function checkId(id) {
  // Строка "4" не преобразуется в число: isSafeInteger для не-числа даёт false.
  if (!Number.isSafeInteger(id) || id <= 0) {
    return "Идентификатор должен быть положительным безопасным целым числом";
  }
  return null;
}

// Возвращает { ok: true, title } или { ok: false, error }.
function normalizeTitle(title) {
  // Сначала тип, затем trim(): у не-строки метода trim нет.
  if (typeof title !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }
  const clean = title.trim();
  if (clean.length === 0) {
    return { ok: false, error: "Название не должно быть пустым" };
  }
  if (clean.length > MAX_TITLE_LENGTH) {
    return { ok: false, error: `Название не должно быть длиннее ${MAX_TITLE_LENGTH} символов` };
  }
  return { ok: true, title: clean };
}

function checkPriority(priority) {
  if (!PRIORITIES.includes(priority)) {
    return 'Приоритет должен быть одним из значений: "low", "medium", "high"';
  }
  return null;
}

// ---------- создание ----------

export function createTask(id, title, priority = "medium") {
  const idError = checkId(id);
  if (idError !== null) return { ok: false, error: idError };

  const titleResult = normalizeTitle(title);
  if (!titleResult.ok) return { ok: false, error: titleResult.error };

  const priorityError = checkPriority(priority);
  if (priorityError !== null) return { ok: false, error: priorityError };

  // Каждый успешный вызов создаёт новый объект.
  return {
    ok: true,
    task: { id, title: titleResult.title, completed: false, priority },
  };
}

// ---------- чтение ----------

export function findTaskById(tasks, id) {
  // Строгое сравнение: "4" !== 4. Если совпадения нет, find вернёт undefined.
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const pending = total - completed;
  // Без округления: toFixed относится к отображению, а не к расчёту.
  const progress = total > 0 ? (completed / total) * 100 : 0;
  return { total, completed, pending, progress };
}

// ---------- изменение (без мутации входных данных) ----------

export function addTask(tasks, id, title, priority = "medium") {
  const created = createTask(id, title, priority);
  if (!created.ok) return { ok: false, error: created.error };

  if (findTaskById(tasks, id) !== undefined) {
    return { ok: false, error: "Задача с таким id уже существует" };
  }
  // Spread создаёт новый массив; исходный не изменяется.
  return { ok: true, tasks: [...tasks, created.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  const idError = checkId(id);
  if (idError !== null) return { ok: false, error: idError };

  if (typeof completed !== "boolean") {
    return { ok: false, error: "Статус выполнения должен быть значением true или false" };
  }
  if (findTaskById(tasks, id) === undefined) {
    return { ok: false, error: "Задача не найдена" };
  }
  // map создаёт новый массив; для выбранной записи — новый объект через spread.
  const updated = tasks.map((task) => (task.id === id ? { ...task, completed } : task));
  return { ok: true, tasks: updated };
}

export function renameTask(tasks, id, title) {
  const idError = checkId(id);
  if (idError !== null) return { ok: false, error: idError };

  const titleResult = normalizeTitle(title);
  if (!titleResult.ok) return { ok: false, error: titleResult.error };

  if (findTaskById(tasks, id) === undefined) {
    return { ok: false, error: "Задача не найдена" };
  }
  const updated = tasks.map((task) =>
    task.id === id ? { ...task, title: titleResult.title } : task,
  );
  return { ok: true, tasks: updated };
}

export function removeTask(tasks, id) {
  const idError = checkId(id);
  if (idError !== null) return { ok: false, error: idError };

  if (findTaskById(tasks, id) === undefined) {
    return { ok: false, error: "Задача не найдена" };
  }
  // filter сохраняет порядок остальных записей и их id.
  return { ok: true, tasks: tasks.filter((task) => task.id !== id) };
}
