import { Link } from "react-router-dom";

export default function Dashboard({ tasks = [], handleLogout }) {

    const totalTasks = tasks.length;

    const completedTasks = tasks.reduce(
        (count, task) =>
            count + (Boolean(task.completed) ? 1 : 0),
        0
    );

    const activeTasks = totalTasks - completedTasks;

    const progress =
        totalTasks > 0
            ? Math.round((completedTasks / totalTasks) * 100)
            : 0;

    return (
        <div className="max-h-screen bg-gray-50 p-6">


            <header className="max-w-6xl mx-auto flex items-center justify-between mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        TaskFlow
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Your productivity overview
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white hover:bg-gray-100 active:scale-95 transition"
                >
                    Logout
                </button>

            </header>


            <main className="max-w-6xl mx-auto">

                
                <section className="mb-8">

                    <h2 className="text-2xl font-semibold text-gray-900">
                        Welcome back 👋
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Here's how your tasks are going.
                    </p>

                </section>


               
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                    <div className="bg-white border rounded-xl p-5">

                        <p className="text-sm text-gray-500">
                            Total Tasks
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {totalTasks}
                        </h3>

                    </div>


          
                    <div className="bg-white border rounded-xl p-5">

                        <p className="text-sm text-gray-500">
                            Active Tasks
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {activeTasks}
                        </h3>

                    </div>


                   <div className="bg-white border rounded-xl p-5">

                        <p className="text-sm text-gray-500">
                            Completed
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {completedTasks}
                        </h3>

                    </div>


                    
                    <div className="bg-white border rounded-xl p-5">

                        <p className="text-sm text-gray-500">
                            Progress
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {progress}%
                        </h3>

                    </div>

                </section>


                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                    <div className="bg-white border rounded-xl p-6">

                        <div className="flex justify-between items-center mb-4">

                            <div>
                                <h3 className="font-semibold text-lg">
                                    Overall Progress
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Task completion rate
                                </p>
                            </div>

                            <span className="font-bold">
                                {progress}%
                            </span>

                        </div>


                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-black rounded-full transition-all duration-500"
                                style={{
                                    width: `${progress}%`
                                }}
                            />

                        </div>


                        <p className="text-sm text-gray-500 mt-3">
                            {completedTasks} of {totalTasks} tasks completed
                        </p>

                    </div>


                    <div className="bg-white border rounded-xl p-6">

                        <h3 className="font-semibold text-lg mb-4">
                            Task Summary
                        </h3>


                        <div className="space-y-4">

                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Completed
                                </span>

                                <span className="font-semibold">
                                    {completedTasks}
                                </span>

                            </div>


                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Remaining
                                </span>

                                <span className="font-semibold">
                                    {activeTasks}
                                </span>

                            </div>


                            <div className="flex justify-between">

                                <span className="text-gray-500">
                                    Total
                                </span>

                                <span className="font-semibold">
                                    {totalTasks}
                                </span>

                            </div>

                        </div>

                    </div>

                </section>


                <section className="bg-white border rounded-xl p-6">

                    <h3 className="text-lg font-semibold">
                        Quick Actions
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 mb-5">
                        Continue managing your productivity.
                    </p>


                    <div className="flex flex-col sm:flex-row gap-3">

                        <Link
                            to="/tasks"
                            className="text-center bg-black text-white rounded-lg px-5 py-3 hover:opacity-90 active:scale-95 transition"
                        >
                            View All Tasks →
                        </Link>

                    </div>

                </section>

            </main>

        </div>
    );
}