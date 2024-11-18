require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/db'); 
const complaintRoutes = require('./routes/v1/complaintRoutes');
const authRoutes = require('./routes/v1/authRoutes');
const officeRoutes = require('./routes/v1/officeRoutes');
const userRoutes = require('./routes/v1/userRoutes');
// middlewares
const validateContentType = require('./middlewares/validateContentType');


const app = express();
const port =3000;
//Permite que la API acepte solicitudes de otros orígenes 
//(uso común en aplicaciones web frontend y backend).
app.use(cors());
//Permite que la aplicación analice solicitudes con cuerpo en formato JSON.
app.use(bodyParser.json()); 
app.use(validateContentType);

//Maneja las rutas relacionadas con usuarios, reclamos, autorización...
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/complaints', complaintRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/office', officeRoutes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
