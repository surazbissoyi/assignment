// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://surazbissoyi:surazbissoyi@cluster0.k4xgn8r.mongodb.net/studentdb?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define Schemas
const academicSchema = new mongoose.Schema({
  student_id: String,
  name: String,
  subject: String,
  grade: String,
  other_academic_info: String
});

const coCurricularSchema = new mongoose.Schema({
  student_id: String,
  name: String,
  activity_type: String,
  duration: String,
  achievements: String
});

// Define Models
const AcademicRecord = mongoose.model('AcademicRecord', academicSchema);
const CoCurricularActivity = mongoose.model('CoCurricularActivity', coCurricularSchema);

// Routes for Academic Records
app.get('/api/academic_records', async (req, res) => {
  try {
    const records = await AcademicRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/academic_records', async (req, res) => {
  const newRecord = new AcademicRecord(req.body);
  try {
    const savedRecord = await newRecord.save();
    res.json(savedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/academic_records/:id', async (req, res) => {
  try {
    const updatedRecord = await AcademicRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/academic_records/:id', async (req, res) => {
  try {
    await AcademicRecord.findByIdAndDelete(req.params.id);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Routes for Co-Curricular Activities
app.get('/api/co_curricular_activities', async (req, res) => {
  try {
    const activities = await CoCurricularActivity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/co_curricular_activities', async (req, res) => {
  const newActivity = new CoCurricularActivity(req.body);
  try {
    const savedActivity = await newActivity.save();
    res.json(savedActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/co_curricular_activities/:id', async (req, res) => {
  try {
    const updatedActivity = await CoCurricularActivity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/co_curricular_activities/:id', async (req, res) => {
  try {
    await CoCurricularActivity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
