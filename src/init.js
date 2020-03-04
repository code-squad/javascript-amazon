import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const handleListening = () => console.log(`Listening on http://localhost:${PORT}...`);

app.listen(PORT, handleListening);
