import { expect, test } from "bun:test";
import { spawn } from "node:child_process";

test("server responds to root GET", async () => {
  const server = spawn("bun", ["run", "dev"]);

  let stdout = "";
  server.stdout.on("data", (data) => {
    stdout += data;
  });

  // Wait for the server to start
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (stdout.includes("http://localhost:8080/")) {
        clearInterval(interval);
        resolve(null);
      }
    }, 100);
  });

  const res = await fetch("http://localhost:8080/");
  expect(res.status).toBe(200);

  server.kill();
}, 15000);
