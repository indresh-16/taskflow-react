/**
 * TaskFlow Railway Backend Production API Test Suite
 * 
 * Usage:
 *   node test_railway_backend.js
 *   or:
 *   node test_railway_backend.js https://your-backend-service.up.railway.app
 */

const targetUrlArg = process.argv[2];
const BASE_URL = (targetUrlArg || process.env.API_URL || "http://localhost:5000").replace(/\/$/, "");

async function runProductionTests() {
  console.log("=================================================");
  console.log(`🧪 TESTING TASKFLOW BACKEND API: ${BASE_URL}`);
  console.log("=================================================\n");

  const timestamp = Date.now();
  const userA = {
    email: `prod_user_a_${timestamp}@example.com`,
    password: "SecurePassword123!",
  };
  const userB = {
    email: `prod_user_b_${timestamp}@example.com`,
    password: "SecurePassword456!",
  };

  let tokenA = "";
  let tokenB = "";
  let taskId1 = null;
  let taskId2 = null;
  let taskId3 = null;

  let passedCount = 0;
  let totalCount = 0;

  function assert(condition, testName, details = "") {
    totalCount++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedCount++;
    } else {
      console.error(`  ❌ FAIL: ${testName} ${details ? `(${details})` : ""}`);
    }
  }

  try {
    // ---------------------------------------------------------
    console.log("--- [1] AUTHENTICATION & JWT VERIFICATION ---");
    // ---------------------------------------------------------

    // 1.1 Register User A
    const regResA = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userA),
    });
    const regDataA = await regResA.json().catch(() => ({}));
    assert(regResA.status === 201, "POST /register (User A)", `status: ${regResA.status}, msg: ${regDataA.message}`);

    // 1.2 Login User A
    const loginResA = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userA),
    });
    const loginDataA = await loginResA.json().catch(() => ({}));
    tokenA = loginDataA.token;
    assert(loginResA.status === 200 && Boolean(tokenA), "POST /login (Returns JWT token)", `status: ${loginResA.status}`);

    // 1.3 JWT Guard - Unauthenticated request to /tasks
    const noAuthRes = await fetch(`${BASE_URL}/tasks`);
    assert(noAuthRes.status === 401, "GET /tasks without token returns 401 Unauthorized");

    // 1.4 Register and Login User B (for Multi-User Isolation)
    const regResB = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userB),
    });
    assert(regResB.status === 201, "POST /register (User B)");

    const loginResB = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userB),
    });
    const loginDataB = await loginResB.json().catch(() => ({}));
    tokenB = loginDataB.token;
    assert(loginResB.status === 200 && Boolean(tokenB), "POST /login (User B returns JWT token)");

    // ---------------------------------------------------------
    console.log("\n--- [2] TASK CRUD & PRIORITY VERIFICATION ---");
    // ---------------------------------------------------------

    // 2.1 Create Task 1 with High Priority
    const addRes1 = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ text: "Deploy Railway MySQL", priority: "High" }),
    });
    const task1 = await addRes1.json().catch(() => ({}));
    taskId1 = task1.id;
    assert(addRes1.status === 201 && task1.priority === "High", "POST /tasks (Create High Priority Task)", `id: ${taskId1}`);

    // 2.2 Create Task 2 with Medium Priority
    const addRes2 = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ text: "Verify Backend Connection", priority: "Medium" }),
    });
    const task2 = await addRes2.json().catch(() => ({}));
    taskId2 = task2.id;
    assert(addRes2.status === 201 && task2.priority === "Medium", "POST /tasks (Create Medium Priority Task)", `id: ${taskId2}`);

    // 2.3 Create Task 3 with Low Priority
    const addRes3 = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ text: "Cleanup Temp Access", priority: "Low" }),
    });
    const task3 = await addRes3.json().catch(() => ({}));
    taskId3 = task3.id;
    assert(addRes3.status === 201 && task3.priority === "Low", "POST /tasks (Create Low Priority Task)", `id: ${taskId3}`);

    // 2.4 GET /tasks for User A
    const getResA = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    const tasksA = await getResA.json().catch(() => []);
    assert(getResA.status === 200 && Array.isArray(tasksA) && tasksA.length === 3, "GET /tasks (Retrieves all 3 tasks for User A)");

    // 2.5 PUT /tasks/:id - Edit text
    const editRes = await fetch(`${BASE_URL}/tasks/${taskId1}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ text: "Deploy Railway MySQL & Backend" }),
    });
    const editData = await editRes.json().catch(() => ({}));
    assert(editRes.status === 200 && editData.text === "Deploy Railway MySQL & Backend", "PUT /tasks/:id (Edit task text)");

    // 2.6 PUT /tasks/:id - Toggle completed
    const toggleRes = await fetch(`${BASE_URL}/tasks/${taskId2}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ completed: true }),
    });
    assert(toggleRes.status === 200, "PUT /tasks/:id (Toggle completed: true)");

    // 2.7 PUT /tasks/:id - Update priority
    const prioRes = await fetch(`${BASE_URL}/tasks/${taskId3}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify({ priority: "High" }),
    });
    assert(prioRes.status === 200, "PUT /tasks/:id (Update task priority)");

    // 2.8 DELETE /tasks/:id
    const delRes = await fetch(`${BASE_URL}/tasks/${taskId3}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${tokenA}` },
    });
    assert(delRes.status === 200, "DELETE /tasks/:id (Remove task)");

    // ---------------------------------------------------------
    console.log("\n--- [3] MULTI-USER ISOLATION & PRIVACY ---");
    // ---------------------------------------------------------

    // 3.1 User B gets tasks -> Must NOT see User A's tasks
    const getResB = await fetch(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    const tasksB = await getResB.json().catch(() => []);
    assert(Array.isArray(tasksB) && tasksB.length === 0, "User B sees 0 tasks (Isolated from User A)");

    // 3.2 User B cannot edit User A's task (404)
    const crossEditRes = await fetch(`${BASE_URL}/tasks/${taskId1}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenB}`,
      },
      body: JSON.stringify({ text: "Unauthorized attempt" }),
    });
    assert(crossEditRes.status === 404, "User B cannot edit User A's task (404 Not Found / Unauthorized)");

    // 3.3 User B cannot delete User A's task (404)
    const crossDelRes = await fetch(`${BASE_URL}/tasks/${taskId1}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${tokenB}` },
    });
    assert(crossDelRes.status === 404, "User B cannot delete User A's task (404 Not Found / Unauthorized)");

    // ---------------------------------------------------------
    console.log("\n=================================================");
    console.log(`📊 FINAL RESULT: ${passedCount} / ${totalCount} PASSED (${Math.round((passedCount / totalCount) * 100)}%)`);
    console.log("=================================================\n");

    if (passedCount === totalCount) {
      console.log("🎉 ALL PRODUCTION API TESTS PASSED SUCCESSFULLY!");
    } else {
      console.error("⚠️ Some tests failed. Check the logs above.");
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Test execution failed with network/server error:", err.message);
    process.exit(1);
  }
}

runProductionTests();
