import express from "express";
import cors from "cors";

export const app = express();




/***************
 * parser
 ************ */
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!')
})

