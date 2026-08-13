// Server Modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
// Routes
import indexRouter from "./routes/mcd/www/index.route.js";
import authRouter from "./routes/auth/auth.js";
import authTokenRouter from "./routes/auth/token.js";
import userRouter from "./routes/users/user.route.js";
import usersRouter from "./routes/users/users.route.js";

import * as path from "path";
import * as url from "url";
import dishRoute from "./routes/dishes/dish.route.js";
import dishesRouter from "./routes/dishes/dishes.route.js";
import messageRoute from "./routes/messages/message.route.js";
import messagesRouter from "./routes/messages/messages.route.js";
import orderRoute from "./routes/orders/order.route.js";
import ordersRouter from "./routes/orders/orders.route.js";
import ingredientsRouter from "./routes/ingredients/ingredients.route.js";
import ingredientRoute from "./routes/ingredients/ingredient.route.js";
import employeesRouter from "./routes/employees/employees.route.js";
import employeeRoute from "./routes/employees/employee.route.js";
import categoriesRouter from "./routes/categories/categories.route.js";
import categoryRouter from "./routes/categories/category.route.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);

const server = {};
const expressServer = express();

expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));
expressServer.use(cors());
expressServer.use(cookieParser());

// Serve static files from the public directory and application assets.
// Serve documentation and raw materials under a dedicated path to avoid
// colliding with the main public asset namespace. Keep `public` mounted
// at root for static site assets used by the frontend.
expressServer.use(
  "/mcd-docs",
  express.static(path.join(__dirname, "..", "mcd-docs")),
);
expressServer.use(express.static("public"));

/*

  Routes

*/

// Index Client Frontend Routes
expressServer.use(indexRouter);

// Backend API Routes
expressServer.use(authRouter);
expressServer.use(authTokenRouter);

// Backend API Users Routes
expressServer.use(usersRouter);
expressServer.use(userRouter);

// Dishes Management
expressServer.use(dishRoute);
expressServer.use(dishesRouter);

// Messeages Route
expressServer.use(messageRoute);
expressServer.use(messagesRouter);

// Orders
expressServer.use(orderRoute);
expressServer.use(ordersRouter);

// Ingredients
expressServer.use(ingredientsRouter);
expressServer.use(ingredientRoute);

// Employees
expressServer.use(employeesRouter);
expressServer.use(employeeRoute);

// Ingredients
expressServer.use(categoriesRouter);
expressServer.use(categoryRouter);

// POC
const pocRoot = path.join(__dirname, "../sites", "poc");
expressServer.use("/poc", express.static(pocRoot));
expressServer.get(["/poc", "/poc/*"], (req, res) => {
  res.sendFile(path.join(pocRoot, "index.html"));
});

// Preview
const previewRoot = path.join(__dirname, "../sites", "preview");
expressServer.use("/preview", express.static(previewRoot));
expressServer.get(["/preview", "/preview/*"], (req, res) => {
  res.sendFile(path.join(previewRoot, "index.html"));
});

// WWW
const wwwSource = path.join(__dirname, "../sites", "www");
const wwwDist = path.join(wwwSource, "dist");
const wwwRoot = fs.existsSync(wwwDist) ? wwwDist : wwwSource;
expressServer.use(express.static(wwwRoot));
expressServer.use("/www", express.static(wwwRoot));
expressServer.get(["/www", "/www/*", "/", "/index.html", "/*"], (req, res) => {
  res.sendFile(path.join(wwwRoot, "index.html"));
});

// Vanilla
const vanillaRoot = path.join(__dirname, "../sites", "vanilla");
expressServer.use("/vanilla", express.static(vanillaRoot));
expressServer.get(["/vanilla", "/vanilla/*"], (req, res) => {
  res.sendFile(path.join(vanillaRoot, "index.html"));
});

/*

  Run Server

*/
server.run = () => {
  const defaultPort = 3042;
  const startingPort = parseInt(process.env.SERVER_PORT, 10) || defaultPort;
  const rawHost = process.env.SERVER_HOST || "";

  let host = "0.0.0.0";
  if (rawHost) {
    try {
      host = new URL(rawHost).hostname || host;
    } catch (error) {
      if (!rawHost.includes("://")) {
        host = rawHost;
      }
    }
  }

  const startServer = (port) => {
    const listener = expressServer.listen(port, host, () => {
      const displayHost = host === "0.0.0.0" ? "localhost" : host;
      console.log("\n\n---------------------");
      console.log(
        "Server Started",
        process.env.NODE_ENV || "development",
        displayHost,
        port,
      );
      console.log(`Running : http://${displayHost}:${port}`);
      console.log("\n\n---------------------");
    });

    listener.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        const nextPort = port + 1;
        console.warn(`Port ${port} is already in use, trying ${nextPort}...`);
        startServer(nextPort);
      } else {
        console.error("Server failed to start:", err);
        process.exit(1);
      }
    });
  };

  startServer(startingPort);
};

export default server;
