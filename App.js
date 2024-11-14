function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Do groceries", done: true },
  ]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "done", "in-progress"
  const [newTask, setNewTask] = useState("");

  
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
      setNewTask("");
    }
  };

  // تغییر وضعیت (done/in-progress)
  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

 
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "done" && task.done) ||
      (filter === "in-progress" && !task.done);

    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>To-Do List</h1>
      {/* نوار جستجو */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* فیلتر وضعیت */}
      <Filter filter={filter} setFilter={setFilter} />

      {/* اضافه کردن وظیفه جدید */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          style={{
            padding: "10px",
            width: "80%",
            marginRight: "10px",
            border: "1px solid #ccc",
          }}
        />
        <button onClick={addTask} style={{ padding: "10px" }}>
          Add
        </button>
      </div>

      {/* لیست وظایف */}
      <TaskList
        tasks={filteredTasks}
        toggleTaskStatus={toggleTaskStatus}
        deleteTask={deleteTask}
      />
    </div>
  );
}

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search tasks"
      style={{
        padding: "10px",
        width: "100%",
        marginBottom: "10px",
        border: "1px solid #ccc",
      }}
    />
  );
}

function Filter({ filter, setFilter }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => setFilter("all")}
        style={{
          padding: "10px",
          marginRight: "10px",
          backgroundColor: filter === "all" ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        All
      </button>
      <button
        onClick={() => setFilter("done")}
        style={{
          padding: "10px",
          marginRight: "10px",
          backgroundColor: filter === "done" ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Done
      </button>
      <button
        onClick={() => setFilter("in-progress")}
        style={{
          padding: "10px",
          backgroundColor: filter === "in-progress" ? "#007bff" : "#ccc",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        In Progress
      </button>
    </div>
  );
}

function TaskList({ tasks, toggleTaskStatus, deleteTask }) {
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTaskStatus={toggleTaskStatus}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

function TaskItem({ task, toggleTaskStatus, deleteTask }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: task.done ? "#d4edda" : "#f8d7da",
      }}
    >
      <span
        onClick={() => toggleTaskStatus(task.id)}
        style={{
          textDecoration: task.done ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.text}
      </span>
      <button
        onClick={() => deleteTask(task.id)}
        style={{
          padding: "5px 10px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default App;
