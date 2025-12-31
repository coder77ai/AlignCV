import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/health",(req, res) => {
    res.json({status: "AlignCV backend running"});
});

app.post("/analyze", (req, res) => {
    res.json({message:"Analyze endpoint placeholder"});
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});