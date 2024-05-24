import express from "express";
import cors from "cors";
import { productRoute } from "./app/modules/product/product.route";

export const app = express();




/***************
 * parser
 ************ */
app.use(cors());
app.use(express.json());

// application route
app.use("/api", productRoute);
app.use("/api", productRoute);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

