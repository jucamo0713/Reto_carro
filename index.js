const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//Routes
app.use('/',(req, res)=>{
  res.sendFile(path.join(__dirname,'routes/home.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});