// Full Application Automated Test Suite
const BASE_URL = "http://localhost:5000";

async function runTests() {
  console.log("=================================================");
  console.log("🧪 STARTING FULL APPLICATION TEST SUITE");
  console.log("=================================================\n");

  const timestamp = Date.now();
  const userA = {
    email: `usera_${timestamp}@example.com`,
    password: "PasswordA123!",
  };
  const userB = {
    email: `userb_${timestamp}@example.com`,
    password: "PasswordB456!",
  };

  let tokenA = "";
  let tokenB = "";
  let taskId1 = null;
  let taskId2 = null;
  let taskId3 = null;

  let passedCount = 0;
  let totalCount = 0;

  function assert(condition, testName) {
    totalCount++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedCount++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
    }
  }

  try {
    // ----------------------------------------------------
    console.log("--- [1] AUTHENTICATION & ACCESS CONTROL TESTS ---");
    // ----------------------------------------------------

    // 1.1 Register User A
    const regResA = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userA),
    });
    const regDataA = await regResA.json();
    assert(regResA.status === 201 && regDataA.message === "Registration successful", "Register new user (User A)");

    // 1.2 Wrong password handling
    const wrongPassRes = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userA.email, password: "wrongpassword" }),
    });
    const wrongPassData = await wrongPassRes.json();
    assert(wrongPassRes.status === 401 && wrongPassData.message === "Invalid email or password", "Wrong password handling returns 401");

    // 1.3 Correct Login User A & JWT Generation
    const loginResA = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userA),
    });
    const loginDataA = await loginResA.json();
    tokenA = loginDataA.token;
    assert(loginResA.status === 200 && Boolean(tokenA), "Login user and receive JWT token");

    // 1.4 JWT Protection - Access /tasks without token
    const noTokenRes = await fetch(`${BASE_URL}/tasks`);
    const noTokenData = await noTokenRes.json();
    assert(noTokenRes.status === 401 && noTokenData.message === "Token missing", "Cannot access /tasks without login token (401)");

    // 1.5 JWT Protection - Access /tasks with invalid token
    const badTokenRes = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: "Bearer invalid.jwt.token" },
    });
    const badTokenData = await badTokenRes.json();
    assert(badTokenRes.status === 401 && badTokenData.message === "Invalid token", "Cannot access /tasks with malformed token (401)");

    // 1.6 Register User B
    const regResB = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userB),
    });
    assert(regResB.status === 201, "Register second user (User B)");

    // 1.7 Login User B
    const loginResB = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userB),
    });
    const loginDataB = await loginResB.json();
    tokenB = loginDataB.token;
    assert(loginResB.status === 200 && Boolean(tokenB), "Login User B and receive JWT token");

    console.log("\n--- [2] TASK MANAGEMENT & PRIORITY TESTS (USER A) ---");

    // 2.1 Add Task 1 (High Priority)
    const addRes1 = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ text: "Learn React", priority: "High" }),
    });
    const task1 = await addRes1.json();
    taskId1 = task1.id;
    assert(addRes1.status === 201 && task1.text === "Learn React" && task1.priority === "High", "Add task with Priority: High ('Learn React')");

    // 2.2 Add Task 2 (Medium Priority)
    const addRes2 = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ text: "Practice CSS", priority: "Medium" }),
    });
    const task2 = await addRes2.json();
    taskId2 = task2.id;
    assert(addRes2.status === 201 && task2.text === "Practice CSS" && task2.priority === "Medium", "Add task with Priority: Medium ('Practice CSS')");

    // 2.3 Add Task 3 (Low Priority)
    const addRes3 = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ text: "Read Documentation", priority: "Low" }),
    });
    const task3 = await addRes3.json();
    taskId3 = task3.id;
    assert(addRes3.status === 201 && task3.text === "Read Documentation" && task3.priority === "Low", "Add task with Priority: Low ('Read Documentation')");

    // 2.4 Refresh / Fetch Tasks -> Check persistence of all 3 tasks
    const getResA1 = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const tasksA1 = await getResA1.json();
    assert(Array.isArray(tasksA1) && tasksA1.length === 3, "Refresh → All 3 tasks remain in database");

    // 2.5 Edit Task 1 text
    const editRes1 = await fetch(`${BASE_URL}/tasks/${taskId1}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ text: "Master React 19 & Vite" }),
    });
    const editData1 = await editRes1.json();
    assert(editRes1.status === 200 && editData1.text === "Master React 19 & Vite", "Edit task text");

    // 2.6 Refresh → Check edited text persistence
    const getResA2 = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const tasksA2 = await getResA2.json();
    const foundEdited = tasksA2.find((t) => t.id === taskId1);
    assert(foundEdited && foundEdited.text === "Master React 19 & Vite", "Refresh → Edited text remains persisted");

    // 2.7 Complete Task 2 (toggle completed)
    const completeRes = await fetch(`${BASE_URL}/tasks/${taskId2}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ completed: true }),
    });
    assert(completeRes.status === 200, "Complete task (toggle completed: true)");

    // 2.8 Refresh → Check completion status persistence
    const getResA3 = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const tasksA3 = await getResA3.json();
    const foundCompleted = tasksA3.find((t) => t.id === taskId2);
    assert(foundCompleted && Boolean(foundCompleted.completed) === true, "Refresh → Completion status remains persisted");

    // 2.9 Filter & Search Logic Verification
    function filterTasks(items, filter, searchTerm) {
      return items.filter((task) => {
        if (filter === "active" && Boolean(task.completed)) return false;
        if (filter === "completed" && !Boolean(task.completed)) return false;
        return (task.text || "").toLowerCase().includes((searchTerm || "").toLowerCase());
      });
    }

    const allFiltered = filterTasks(tasksA3, "all", "");
    const activeFiltered = filterTasks(tasksA3, "active", "");
    const completedFiltered = filterTasks(tasksA3, "completed", "");
    const searchFiltered = filterTasks(tasksA3, "all", "Master");

    assert(allFiltered.length === 3, "Filter 'All' correctly includes all 3 tasks");
    assert(activeFiltered.length === 2 && activeFiltered.every((t) => !t.completed), "Filter 'Active' returns only active tasks (2 active)");
    assert(completedFiltered.length === 1 && completedFiltered[0].id === taskId2, "Filter 'Completed' returns only completed tasks (1 completed)");
    assert(searchFiltered.length === 1 && searchFiltered[0].text === "Master React 19 & Vite", "Search 'Master' filters correctly to matching task");

    // 2.10 Delete Task 3
    const deleteRes = await fetch(`${BASE_URL}/tasks/${taskId3}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(deleteRes.status === 200, "Delete task");

    // 2.11 Refresh → Check deleted task is removed
    const getResA4 = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const tasksA4 = await getResA4.json();
    assert(tasksA4.length === 2 && !tasksA4.some((t) => t.id === taskId3), "Refresh → Deleted task is permanently removed");

    console.log("\n--- [3] MULTI-USER ISOLATION & SECURITY TESTS ---");

    // 3.1 User B fetches tasks -> Must have 0 tasks (NOT User A's tasks)
    const getResB1 = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    const tasksB1 = await getResB1.json();
    assert(Array.isArray(tasksB1) && tasksB1.length === 0, "User B logs in → Must NOT see User A's tasks (0 tasks)");

    // 3.2 User B tries to update User A's task -> Must be Forbidden/Not Found (404)
    const crossUpdateRes = await fetch(`${BASE_URL}/tasks/${taskId1}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenB}`,
      },
      body: JSON.stringify({ text: "Hacked by User B" }),
    });
    assert(crossUpdateRes.status === 404, "User B cannot edit User A's task (404 Task not found or not yours)");

    // 3.3 User B tries to delete User A's task -> Must be Forbidden/Not Found (404)
    const crossDeleteRes = await fetch(`${BASE_URL}/tasks/${taskId1}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    assert(crossDeleteRes.status === 404, "User B cannot delete User A's task (404 Task not found or not yours)");

    // 3.4 User B creates their own task
    const addResB = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenB}`,
      },
      body: JSON.stringify({ text: "User B Private Project", priority: "High" }),
    });
    const taskB = await addResB.json();
    assert(addResB.status === 201 && taskB.text === "User B Private Project", "User B adds own task ('User B Private Project')");

    // 3.5 Refresh User B -> Sees ONLY User B's task
    const getResB2 = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    const tasksB2 = await getResB2.json();
    assert(tasksB2.length === 1 && tasksB2[0].text === "User B Private Project", "User B refresh → Sees ONLY User B's task");

    // 3.6 User A logs back in & Refreshes -> Sees ONLY User A's tasks
    const getResA5 = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const tasksA5 = await getResA5.json();
    const onlyUserATasks = tasksA5.every((t) => t.id === taskId1 || t.id === taskId2);
    assert(tasksA5.length === 2 && onlyUserATasks, "User A refresh → Sees ONLY User A's tasks (No data leakage)");

    // ----------------------------------------------------
    console.log("\n=================================================");
    console.log(`📊 TEST RESULTS: ${passedCount} / ${totalCount} PASSED (${Math.round((passedCount / totalCount) * 100)}%)`);
    console.log("=================================================\n");

  } catch (err) {
    console.error("Test execution failed with error:", err);
  }
}

runTests();
