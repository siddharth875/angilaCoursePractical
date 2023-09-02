import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`)
    console.log(response.data.length);
    let data = response.data[Math.floor(Math.random()*response.data.length)]
    console.log(data);
    res.render('index.ejs',{data: data}); 
  } catch (error) {
    console.log(error.response.status)
    if (error.response.status===404 ) {
      res.render('index.ejs',{error: "No activities that match your criteria."})  
    } else {
      res.render('index.ejs',{error: error.message})
    } 
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
