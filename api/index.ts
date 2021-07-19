import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";

const app = express();

// Use
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
	res.status(200).json({ message: "It works!" });
});

export default app;
