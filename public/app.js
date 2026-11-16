const responseOutput = document.querySelector("#response-output");
const responseStatus = document.querySelector("#response-status");

const routes = {
  courses: { url: "/api/courses", method: "GET" },
  status: { url: "/api/status", method: "GET" },
  headers: { url: "/api/headers", method: "GET" },
  subscribe: { url: "/api/subscribe", method: "POST" },
  admin: { url: "/api/admin", method: "GET" },
  stats: { url: "/api/stats", method: "GET" },
  missing: { url: "/api/does-not-exist", method: "GET" }
};

async function callRoute(routeKey) {
  const route = routes[routeKey];

  responseStatus.textContent = "Loading...";
  responseOutput.textContent = "Waiting for the server...";

  try {
    const response = await fetch(route.url, {
      method: route.method,
      headers: {
        Accept: "application/json"
      }
    });

    const contentType = response.headers.get("content-type") || "";
    let body;

    if (contentType.includes("application/json")) {
      body = await response.json();
    } else {
      body = await response.text();
    }

    responseStatus.textContent = `HTTP ${response.status} ${response.statusText}`;
    responseOutput.textContent =
      typeof body === "string" ? body : JSON.stringify(body, null, 2);
  } catch (error) {
    responseStatus.textContent = "Request failed";
    responseOutput.textContent =
      `Could not contact the server. ${error.message}`;
  }
}

document.querySelectorAll("button[data-route]").forEach((button) => {
  button.addEventListener("click", () => {
    callRoute(button.dataset.route);
  });
});
