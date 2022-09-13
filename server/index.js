const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const e = require("express");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Hughe$db",
  database: "crud_contact"
})

//middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM contact_db";
  db.query(sqlGet, (error, result) => {
    res.send(result)
  })
})

app.post("/api/post", (req, res) => {
  //destructuring the name, email, and contact fields
  const {name, email, contact} = req.body;

  const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?,?,?)";
  db.query(sqlInsert, [name, email, contact], (error, result) => {
    if(error){
      console.log("error:" + error)
    }
  });
});


/* when user clicks "edit" we first need to display the data fields 
of the selected record before allowing them to update said fields */
app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;

  const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if(error){
      console.log(error);
    }
    res.send(result)
  })
})
//now here is where they actually update those records
// app.put("/api/update/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, email, contact } = req.body;
//   const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
//   db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
//     if(error){
//       console.log(`error: ${error}`)
//     }
//     res.send(result);
//   })
// })

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate = `UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ${id}`;
  db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
    if(error){
      console.log(`error: ${error}`)
    }
    res.send(result);
  })
})




app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;

  const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if(error){
      console.log("error:" + error)
    }
  });
});


app.get("/", (req, res) => {
  // const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('john doe', 'johndoe@gmail.com', 3609995555)";
  // db.query(sqlInsert, (err, result) =>{
  //   console.log("error", err);
  //   console.log("result", result);
  //   res.send("hello express");
  // })
})

app.listen(3000, () => {
  console.log('server is runnin on 3000');
})