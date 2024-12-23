# Sistema de Gestión de Tareas

Desarrollo de API Back End, para proyecto de tipo challenge, de usuarios y tareas.

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Características](#características)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Lista de endpoints disponibles](#lista-de-endpoints-disponibles)

---

## Descripción General

- **Estado del Proyecto**: Completo
- **Objetivo principal**: Desarrollar una API Rest que brinde los servicios necesarios para la aplicación de Front End.

## Tecnologías Utilizadas

- **Backend y base de datos**:

  - Node.js (versión 20.12.2)
  - Express
  - Postgres

## Características

- Autenticación de usuarios con JWT
- Validación de datos de entrada y errores
- Servicio de Usuarios y Tareas

## Instalación y Configuración

### Requisitos Previos

- Node.js (versión 20.12.2 o superior)
- npm

### Pasos de Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/FrancoCarchedi/todo-api
   ```

2. Navegar al directorio del proyecto:

   ```bash
   cd todo-api
   ```

3. Instalar dependencias:

   ```bash
   npm install
   ```

4. Crear archivo .env tomando como ejemplo el arcivo .env.example y modificar la información de cada variable.

5. Ejecutar la aplicación Docker, y luego el siguiente comando:

    ```docker
    docker-compose up -D
    ```


6. Iniciar el servidor de desarrollo:

   ```bash
   npm run start
   ```

## Estructura del Proyecto

```plaintext
todo-api/
├── config/                         # Configuraciones globales de la aplicación
│   ├── database.js                 # Configuración de la base de datos
│   ├── relations.js                # Configuración de relaciones entre modelos
├── controllers/                    # Controladores que manejan la lógica de las rutas
│   ├── taskController.js           # Controlador de tareas
│   ├── userController.js           # Controlador de usuarios
├── dtos/                           # Objetos de transferencia de datos (DTO)
│   ├── GetUserDto.js               # DTO para obtener usuarios
├── middlewares/                    # Middlewares para validaciones y autenticación
│   ├── authMiddleware.js           # Middleware para validar autenticación
│   ├── validationMiddleware.js     # Middleware para validaciones de datos
├── models/                         # Definición de los modelos de datos
│   ├── task.js                     # Modelo de tareas
│   ├── user.js                     # Modelo de usuarios
├── routes/                         # Definición de las rutas de la API
│   ├── taskRoutes.js               # Rutas relacionadas con tareas
│   ├── userRoutes.js               # Rutas relacionadas con usuarios
├── services/                       # Lógica de negocio y conexión con modelos
│   ├── taskService.js              # Servicio de tareas
│   ├── userService.js              # Servicio de usuarios
├── utils/                          # Utilidades y funciones compartidas
│   ├── auth.js                     # Funciones para manejo de autenticación
│   ├── validationSchemas.js        # Esquemas de validación
├── .env.example                    # Ejemplo del archivo de configuración de entorno
├── .gitignore                      # Archivos y directorios ignorados por Git
├── app.js                          # Punto de entrada de la aplicación
├── docker-compose.yaml             # Configuración para levantar servicios con Docker
├── Dockerfile                      # Instrucciones para construir la imagen de Docker
├── package.json                    # Información del proyecto y dependencias
├── package-lock.json               # Registro de dependencias instaladas
└── README.md                       # Documentación del proyecto
```

## Lista de endpoints disponibles

### Autenticación

### `POST /users/login`
- **Descripción**: Inicia sesión de usuario con credenciales.
- **Parámetros**: 
  - `email` (string): Correo electrónico del usuario.
  - `password` (string): Contraseña del usuario.

### Usuarios

### `GET /users`
- **Descripción**: Obtiene una lista de todos los usuarios.
- **Respuesta**:
  - 200 OK: `[{ "id": 1, "username": "francocarchedi", "email": "franconcarchedi@example.com" }]`
- **Autenticación**: Requiere autenticación

### `GET /users/:id`
- **Descripción**: Obtiene un usuario por ID.
- **Respuesta**:
  - 200 OK: `{ "id": 1, "username": "francocarchedi", "email": "franconcarchedi@example.com" }`
- **Autenticación**: Requiere autenticación

### `POST /users`
- **Descripción**: Crea un nuevo usuario.
- **Parámetros**: 
  - `username` (string): Nombre del usuario.
  - `email` (string): Correo electrónico del usuario.
  - `password` (string): Contraseña.
- **Autenticación**: Requiere autenticación.

### `PATCH /users/:id`
- **Descripción**: Actualiza información del usuario.
- **Parámetros**: 
  - `username` (string): Nombre del usuario.
  - `email` (string): Correo electrónico del usuario.
  - `password` (string): Contraseña.
- **Autenticación**: Requiere autenticación.

### `DELETE /users/:id`
- **Descripción**: Elimina el usuario.
- **Parámetros**: Ninguno
- **Autenticación**: Requiere autenticación.

### Tareas

### `GET /tasks`
- **Descripción**: Obtiene una lista de tareas.
- **Respuesta**:
  - 200 OK: `[{ "id": 1, "name": "Mi primera tarea", "description": "Descripción de la tarea", "endsDate": "2024-12-23T03:00:00.000Z", "status": "pending", "userId": "02abd775-20d4-461c-8db8-c5fbbc3eb50f", "createdAt": "2024-12-23T03:00:00.000Z", "updatedAt": "2024-12-23T03:00:00.000Z" }]`
- **Autenticación**: Requiere autenticación.

### `GET /tasks/:id`
- **Descripción**: Obtiene una tarea por su ID.
- **Respuesta**:
  - 200 OK: `{ "id": 1, "name": "Mi primera tarea", "description": "Descripción de la tarea", "endsDate": "2024-12-23T03:00:00.000Z", "status": "pending", "userId": "02abd775-20d4-461c-8db8-c5fbbc3eb50f", "createdAt": "2024-12-23T03:00:00.000Z", "updatedAt": "2024-12-23T03:00:00.000Z" }`
- **Autenticación**: Requiere autenticación.

### `GET /tasks/user/:id`
- **Descripción**: Obtiene la lista de tareas del usuario.
- **Respuesta**:
  - 200 OK: `[{ "id": 1, "name": "Mi primera tarea", "description": "Descripción de la tarea", "endsDate": "2024-12-23T03:00:00.000Z", "status": "pending", "userId": "02abd775-20d4-461c-8db8-c5fbbc3eb50f", "createdAt": "2024-12-23T03:00:00.000Z", "updatedAt": "2024-12-23T03:00:00.000Z" }]`
- **Autenticación**: Requiere autenticación.

### `POST /tasks`
- **Descripción**: Crea una nueva tarea.
- **Parámetros**:
  - `name` (string): Título de la tarea.
- **Autenticación**: Requiere autenticación

### `PATCH /tasks/:id`
- **Descripción**: Actualiza la información de una tarea.
- **Parámetros**:
  - `name` (string): Título de la tarea.
  - `description` (string): Descripción de la tarea.
  - `status` (string): Estado de la tarea ('pending' o 'completed').
  - `endsDate` (string): Fecha de vencimiento de la tarea (dd/mm/yyyy).
- **Autenticación**: Requiere autenticación

### `DELETE /tasks/:id`
- **Descripción**: Elimina una tarea.
- **Parámetros**: Ninguno
- **Autenticación**: Requiere autenticación