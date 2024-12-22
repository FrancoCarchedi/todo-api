const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/auth');



const getAllUsers = async () => {
  return await User.findAll();
}

const getUserById = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return user;
}

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Credenciales incorrectas');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales incorrectas');
  }

  // Generar token JWT
  const token = generateToken(user);

  return token;
};

const createUser = async (userData) => {
  const { password, ...rest } = userData;

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      ...rest,
      password: hashedPassword,
    });
  
    return newUser;
  } catch (error) {
    throw new Error(error.errors[0].message)
  }
};

const updateUser = async (userId, updateData) => {
  const user = await getUserById(userId);
  const fieldsToUpdate = {};

  const updatableFields = ['email', 'username', 'password'];
  for (const field of updatableFields) {
    if (updateData[field] !== undefined) {
      fieldsToUpdate[field] = updateData[field];
    }
  }

  if (fieldsToUpdate.password) {
    fieldsToUpdate.password = await bcrypt.hash(fieldsToUpdate.password, 10);
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    throw new Error('No se enviaron campos válidos para actualizar');
  }

  await user.update(fieldsToUpdate);
  return user;
};

const deleteUser = async (userId) => {
  const user = await getUserById(userId);
  await user.destroy();
  return { message: 'Usuario eliminado con éxito' };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};