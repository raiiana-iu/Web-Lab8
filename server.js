import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, "public");
const courses = [
  { id: 1, title: "Web Programming", credits: 5 },
  { id: 2, title: "Database Management Systems", credits: 6 },
  { id: 3, title: "Operating Systems", credits: 5 },
  { id: 4, title: "Software Engineering", credits: 4 }
];
app.get("/hello", (req, res) => {
  res.type("text").send("Hello from Ali's Assignment 8 server!");
});
app.get("/robots.txt", (req, res) => {
  res.type("text").send("User-agent: *\nDisallow:");
});
app.get("/old-page", (req, res) => {
  res.redirect("/hello");
});
app.get("/api/courses", (req, res) => {
  res.json(courses);
});
app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime())
  });
});
app.get("/api/headers", (req, res) => {
  res.json({
    userAgent: req.get("User-Agent")||null,
    accept: req.get("Accept")||null
  });
});

app.post("/api/subscribe", (req, res) => {
  res.status(201).json({ subscribed: true });
});
app.get("/api/admin", (req, res) => {
  res.status(403).json({ error: "Forbidden" });
});

let requestsServed=0;
function requestLogger(req, res, next) {
  const timestamp=new Date().toISOString();
  console.log(`${timestamp} ${req.method} ${req.originalUrl}`);
  next();
}

function requestCounter(req, res, next) {
  requestsServed+=1;
  next();
}
app.use(requestLogger);
app.use(requestCounter);

app.get("/api/stats", (req, res) => {
  res.json({ requestsServed });
});

app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({ error: "Not found" });
  } else {
    res.status(404).type("text").send("404 - Page not found");
  }
});
app.use(express.static(publicDirectory));