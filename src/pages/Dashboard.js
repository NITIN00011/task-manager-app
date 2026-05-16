import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const API = "https://task-manager-app-1-ca7d.onrender.com/api/tasks";

  const fetchTasks = async () => {
    const res = await axios.get(API);

    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title || !description) {
      alert("Please fill all fields");

      return;
    }

    await axios.post(API, {
      title,
      description,
      status: "Pending",
    });

    setTitle("");
    setDescription("");

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);

    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await axios.put(`${API}/${task._id}`, {
      ...task,
      status:
        task.status === "Pending"
          ? "Completed"
          : "Pending",
    });

    fetchTasks();
  };

  const logoutUser = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #020617, #0f172a)",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={logoutUser}
          style={{
            padding: "12px 20px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#38bdf8",
          textShadow: "0 0 15px #38bdf8",
          fontSize: "45px",
        }}
      >
        🚀 Task Manager Dashboard
      </motion.h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={addTask}
          style={buttonStyle}
        >
          Add Task
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
        }}
      >
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.03,
            }}
            style={{
              background: "#1e293b",
              padding: "25px",
              borderRadius: "18px",
              boxShadow:
                "0 0 20px rgba(56,189,248,0.3)",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
                color: "#38bdf8",
              }}
            >
              {task.title}
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                lineHeight: "1.6",
              }}
            >
              {task.description}
            </p>

            <p
              style={{
                marginTop: "15px",
                fontWeight: "bold",
                color:
                  task.status === "Pending"
                    ? "#facc15"
                    : "#22c55e",
              }}
            >
              {task.status}
            </p>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() =>
                  toggleStatus(task)
                }
                style={{
                  padding: "10px 18px",
                  background:
                    task.status === "Pending"
                      ? "#38bdf8"
                      : "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {task.status === "Pending"
                  ? "Mark Complete"
                  : "Completed"}
              </button>

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
                style={{
                  padding: "10px 18px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "14px",
  width: "250px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "14px 30px",
  background: "#38bdf8",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  boxShadow: "0 0 15px #38bdf8",
};

export default Dashboard;