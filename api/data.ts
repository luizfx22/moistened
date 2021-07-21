import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import * as yup from "yup";

// Instância padrão do Express
const app = express();

// Schema para validação dos dados da API
const apiDataSchema = yup.object().shape({
	origin: yup
		.string()
		.required()
		.matches(
			/([A-F0-9]{2})-([A-F0-9]{2})-([A-F0-9]{2})-([A-F0-9]{2})-([A-F0-9]{2})-([A-F0-9]{2})/gim
		),
	data: yup.number().required(),
});

// Use
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.post("/api/data", (req, res) => {
	console.log(req.body);
	res.status(200).json({ message: "It works!" });
});

export default app;
