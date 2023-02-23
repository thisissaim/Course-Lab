import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "test",
})

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.json("Hello this is backend")
})

app.get("/employees", (req, res) => {
    const q = "SELECT * FROM employees"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/employees", (req, res) => {
    const q = "INSERT INTO employees(`name`, `department`, `aadhar`, `mobile`, `address`) VALUES (?)";

    const values = [

        req.body.name,
        req.body.department,
        req.body.aadhar,
        req.body.mobile,
        req.body.address,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json("Employees have been created successfully");
    });
});

app.delete("/employees/:id", (req, res) => {
    const employeeId = req.params.id;
    const q = " DELETE FROM test.employees WHERE id = ? ";

    db.query(q, [employeeId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.put("/employees/:id", (req, res) => {
    const employeeId = req.params.id;
    const q = "UPDATE employees SET `name`= ?, `department`= ?, `aadhar`= ?, `mobile`= ?, `address` = ? WHERE id = ?";

    const values = [
        req.body.name,
        req.body.department,
        req.body.aadhar,
        req.body.mobile,
        req.body.address,
    ];

    db.query(q, [...values, employeeId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});
app.listen(8800, () => {
    console.log("Connected to backend!");
})