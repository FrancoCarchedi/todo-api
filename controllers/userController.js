const GetUserDTO = require('../dtos/GetUserDto');
const userService = require('../services/userService');

const getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    const usersDto = users.map(u => {
      return new GetUserDTO(
        u.id,
        u.username,
        u.email
      )
    })
    res.status(200).json(usersDto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {  
    const user = await userService.getUserById(id);
    const userDto = new GetUserDTO(
      user.id,
      user.username,
      user.email
    )
    res.status(200).json(userDto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const userData = req.body;

  try {
    const newUser = await userService.createUser(userData);
    const userDto = new GetUserDTO(
      newUser.id,
      newUser.username,
      newUser.email,
    )
    res.status(201).json(userDto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedUser = await userService.updateUser(id, updateData);
    const userDto = new GetUserDTO(
      updatedUser.id,
      updatedUser.username,
      updatedUser.email,
    );

    res.status(200).json({
      message: "Se ha actualizado correctamente el usuario",
      user: userDto
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Los campos 'email' y 'password' son obligatorios." });
    }

    const token = await userService.loginUser(email, password);

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  login
};
