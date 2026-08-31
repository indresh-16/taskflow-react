export async function apiRequest(url, options = {}) {
    const token = localStorage.getItem("token");

    console.log("API URL:", url);
    console.log("API TOKEN:", token);

    const response = await fetch(url, {
        ...options,

        headers: {
            "Content-Type": "application/json",
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("API STATUS:", response.status);

    const data = await response.json();

    console.log("API DATA:", data);

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
    }

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}