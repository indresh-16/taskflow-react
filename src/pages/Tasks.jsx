import TaskForm from "../components/Task/TaskForm";
import TaskStats from "../components/Task/TaskStats";
import TaskList from "../components/Task/TaskList";

export default function Tasks({
    addTask,
    toggleTask,
    tasks,
    filteredTask,
    deleTask,
    filter,
    setFilter
}) {
    return (
        <>
            <TaskForm addTask={addTask} />

            <TaskList
                tasks={filteredTask}
                deleTask={deleTask}
                toggleTask={toggleTask}
            /> 
            <TaskStats
                total={tasks.length}
                remaining={tasks.filter(task => !task.completed).length}
                completed={tasks.filter(task => task.completed).length}
            />

            {/* Filter buttons */}
            <div className="flex justify-around mt-3">
                <button
                    onClick={() => setFilter("all")}
                    className="border-1 font-semibold pl-4 pr-4 active:scale-95 cursor-pointer rounded-lg"
                >
                    All
                </button>

                <button
                    onClick={() => setFilter("active")}
                    className="border-1 font-semibold pl-4 pr-4 active:scale-95 cursor-pointer rounded-lg"
                >
                    Active
                </button>

                <button
                    onClick={() => setFilter("completed")}
                    className="border-1 font-semibold pl-4 pr-4 active:scale-95 cursor-pointer rounded-lg"
                >
                    Completed
                </button>
            </div>


        </>
    );
}
/*
        <div className="flex justify-around mt-3">
            <button onClick={() => setFilter("all")}>
                All
            </button>

            <button onClick={() => setFilter("active")}>
                Active
            </button>

            <button onClick={() => setFilter("completed")}>
                Completed
            </button>
        </div>

        <TaskStats
            total={tasks.length}
            remaining={tasks.filter(task => !task.completed).length}
            completed={tasks.filter(task => task.completed).length}
        />

        */