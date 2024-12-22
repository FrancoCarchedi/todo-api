const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    'string.min': "El campo 'username' debe tener al menos 3 caracteres.",
    'string.max': "El campo 'username' no puede exceder los 50 caracteres.",
    'any.required': "El campo 'username' es obligatorio.",
  }),
  email: Joi.string().email().required().messages({
    'string.email': "Debe proporcionar un correo electrónico válido.",
    'any.required': "El campo 'email' es obligatorio.",
  }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Z])/, 'mayúscula')
    .pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, 'carácter especial')
    .required()
    .messages({
    'string.min': "La contraseña debe tener al menos 6 caracteres.",
    'string.pattern.base': "La contraseña debe contener al menos una mayúscula y un carácter especial.",
    'any.required': "El campo 'password' es obligatorio.",
  }),
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).optional().messages({
    'string.min': "El campo 'username' debe tener al menos 3 caracteres.",
    'string.max': "El campo 'username' no puede exceder los 50 caracteres.",
  }),
  email: Joi.string().email().optional().messages({
    'string.email': "Debe proporcionar un correo electrónico válido.",
  }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Z])/, 'mayúscula')
    .pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, 'carácter especial')
    .optional()
    .messages({
    'string.min': "La contraseña debe tener al menos 6 caracteres.",
    'string.pattern.base': "La contraseña debe contener al menos una mayúscula y un carácter especial.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': "Debe proporcionar un correo electrónico válido.",
    'any.required': "El campo 'email' es obligatorio.",
  }),
  password: Joi.string().required().messages({
    'any.required': "El campo 'password' es obligatorio.",
  }),
});

const taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'completed').optional(),
  userId: Joi.string().required(),
});

module.exports = { createUserSchema, updateUserSchema, loginSchema, taskSchema };
