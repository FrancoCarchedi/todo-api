const express = require('express');
const cors = require("cors");
const app = express();

const sequelize = require('./config/database');
const defineRelationships = require('./config/relations');
const User = require('./models/user');
const Task = require('./models/task');

const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 3000;
const models = { User, Task };
defineRelationships(models);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

sequelize
  .sync()
  .then(() => {
    console.log('Base de datos sincronizada con relaciones definidas');

    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });

  })
  .catch((error) => console.error('Error al sincronizar la base de datos:', error));

