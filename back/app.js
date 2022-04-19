import express from "express";

app = express();
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => {
    console.log("listening on port 5000..");
});
