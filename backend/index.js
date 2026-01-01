import express, { application } from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";


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

// uploading space 
const upload = multer({dest:"uploads/"});

app.post("/parse-resume", upload.single("resume"), async(req, res) => {
    try {
        const file = req.file;
        let text = "";

        if(file.mimetype === "application/pdf"){
            const dataBuffer = fs.readFileSync(file.path);
            const pdfData = await import("pdf-parse");
            const parsed = await pdfData.setDefaultParseParameters(dataBuffer);
            text = parsed.text;
        }
        else if(file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.documnent")
            {
                const result = await mammoth.extractRawText({path:file.path});
                text = result.value;
            }
            res.json({resumeText: text});
    }
    catch(err){
        res.status(500).json({error:"Resume parsing failed"});
    }
});

fs.unlinkSync(file.path);