const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();



const mongoURI = 'mongodb+srv://nrgajjar30:1234@cluster0.t2dkr.mongodb.net/new'; // Replace 'mydatabase' with your actual database name

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

const studentSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number },
    email: { type: String}
});
const Student = mongoose.model('Student', studentSchema);

app.post('/students', (req, res) => {
    const newStudent = new Student(req.body);

    newStudent.save()
        .then(student => {
            res.status(201).json({ message: 'Student added successfully!', student });
        })
        .catch(err => {
            res.status(400).json({ error: 'Failed to add student', details: err.message });
        });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});