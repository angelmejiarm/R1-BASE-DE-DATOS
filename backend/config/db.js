import mongoose from "mongoose"; // controlador 

// db.js
const mongoose = require('mongoose');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tesis', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB.');
});

// Modelo de Usuario
const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: { type: String, unique: true },
  contraseña: String,
  rol: String,
  genro: type,
});

const User = mongoose.model('User', userSchema);

// Modelo de Facultad
const facultadSchema = new mongoose.Schema({
  nombre: { type: String, unique: true },
});

const Facultad = mongoose.model('Facultad', facultadSchema);

// Modelo de Tesis
const tesisSchema = new mongoose.Schema({
  titulo: String,
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  facultad: { type: mongoose.Schema.Types.ObjectId, ref: 'Facultad' },
  resumen: String,
  archivo: String,
  estado: String,
  fecha_registro: { type: Date, default: Date.now },
});

const Tesis = mongoose.model('Tesis', tesisSchema);

// Modelo de Solicitud
const solicitudSchema = new mongoose.Schema({
  tesis: { type: mongoose.Schema.Types.ObjectId, ref: 'Tesis' },
  solicitante: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estado: String,
  fecha_solicitud: { type: Date, default: Date.now },
});

const Solicitud = mongoose.model('Solicitud', solicitudSchema);

module.exports = { User, Facultad, Tesis, Solicitud };
