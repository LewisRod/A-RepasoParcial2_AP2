# Frontend — Secuencia definitiva del proyecto
---

# PASO 1 — Crear el proyecto Expo

Desde la carpeta donde se guardarán los proyectos:

```bash
npx create-expo-app@latest frontend
```

Entrar al proyecto:

```bash
cd frontend
```

Iniciar Expo para comprobar que funciona:

```bash
npx expo start
```
----------------------------------------------------------------

# PASO 2 — Instalar dependencias

Instalar Axios:

```bash
npm install axios
```

Instalar AsyncStorage para guardar el token:

```bash
npx expo install @react-native-async-storage/async-storage
```

Instalar Expo Router:

```bash
npx expo install expo-router
```

Instalar notificaciones locales:

```bash
npx expo install expo-notifications
```

-----------------------------------------------------------------------------------------

# PASO 3 — Configurar Expo Router

Revisar `package.json` y confirmar que el proyecto tenga configurado Expo Router como punto de entrada:

```json
{
  "main": "expo-router/entry"
}
```

```text
src/
└── app/
    └── _layout.jsx
      /index.jsx
```

-------------------------------------------------------------------------------------------

# PASO 4 — Configurar la URL de la API

Crear un archivo `.env` en la raíz del frontend:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000
```
---------------------------------------------------------------------------------

# PASO 5 — Crear la estructura del frontend

Estructura base:

```text
frontend/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login.jsx
│   │   │   └── register.jsx
│   │   │
│   │   ├── viviendas/
│   │   │   ├── index.jsx
│   │   │   ├── crear.jsx
│   │   │   ├── editar.jsx
│   │   │   └── detalle.jsx
│   │   │
│   │   ├── alquileres/
│   │   │   ├── index.jsx
│   │   │   └── misAlquileres.jsx
│   │   │
│   │   ├── _layout.jsx
│   │   └── index.jsx
│   │
│   └── servicios/
│       ├── api.js
│       ├── authServices.js
│       ├── authStorage.js
│       ├── notificacionesServices.js
│       ├── viviendas/
│       │   └── viviendasServices.js
│       └── alquileres/
│           └── alquileresServices.js
│
├── .env
├── .gitignore
├── app.json
├── package.json
└── package-lock.json
```

La estructura se puede adaptar al ejercicio, pero se deben mantener separadas las pantallas (`app`) y las peticiones/servicios (`servicios`).

-----------------------------------------------------------------------------------------------

# PASO 6 — Crear `api.js`


```javascript
import axios from "axios"

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
})

export default api
```

Los demás servicios importarán esta instancia:

```javascript
import api from "./api.js"
```


--------------------------------------------------------------------------------------

# PASO 7 — Crear `authStorage.js`


Funciones que tendrá:

```text
guardarToken(token)
obtenerToken()
eliminarToken()
```

Ejemplo de importación:

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage"
```
-------------------------------------------------------------------------------------


# PASO 8 — Crear `authServices.js`

Responsabilidad: agrupar las peticiones de autenticación.

Funciones:

```text
registrarUsuario(datos)
iniciarSesion(datos)
```

Ejemplo de referencia:

```javascript
import api from "./api.js"

export const registrarUsuario = async (datos) => {
    const respuesta = await api.post("/auth/register", datos)
    return respuesta.data
}

export const iniciarSesion = async (datos) => {
    const respuesta = await api.post("/auth/login", datos)
    return respuesta.data
}
```

Los nombres de las rutas (`/auth/register` y `/auth/login`) son ejemplos: utilizar las rutas reales definidas en el backend.

--------------------------------------------------------------------------------------


# PASO 9 — Crear las pantallas de autenticación

Crear:

```text
src/app/auth/
├── login.jsx
└── register.jsx
```

------------------------------------------------------------------------------------


# PASO 10 — Configurar el token en las peticiones protegidas

Las rutas protegidas del backend esperan:

```text
Authorization: Bearer TOKEN
```

Para enviar el token, obtenerlo con `obtenerToken()` y agregarlo en la petición:

```javascript
const token = await obtenerToken()

const respuesta = await api.get("/viviendas", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
```

---------------------------------------------------------------------------------------



# PASO 11 — Crear `viviendasServices.js`

Este archivo contiene las peticiones HTTP relacionadas con viviendas.

Funciones esperadas:

```text
listarViviendas()
buscarVivienda(id)
listarViviendasDisponibles()
crearVivienda(datos)
actualizarVivienda(id, datos)
eliminarVivienda(id)
```

Operaciones HTTP:

| Operación | Método | Ruta de ejemplo |
|---|---|---|
| Listar | GET | `/viviendas` |
| Buscar por ID | GET | `/viviendas/:id` |
| Disponibles | GET | `/viviendas/disponibles` |
| Crear | POST | `/viviendas` |
| Actualizar | PUT | `/viviendas/:id` |
| Eliminar | DELETE | `/viviendas/:id` |

Las rutas son una referencia. Confirmar el prefijo y las rutas exactas en `vivienda.routes.js` del backend.

Las funciones deben llamar a Axios y devolver `respuesta.data`.

---------------------------------------------------------------------------------------

# PASO 12 — Listar viviendas en React Native

Conceptos que se utilizarán:

- `useState`
- `useEffect`
- `FlatList`
- `View`
- `Text`
- `Pressable`

Estados básicos:

```javascript
const [viviendas, setViviendas] = useState([])
const [cargando, setCargando] = useState(false)
```

Flujo:

```text
Abrir pantalla
    ↓
useEffect
    ↓
Llamar listarViviendas()
    ↓
Recibir datos
    ↓
setViviendas(datos)
    ↓
Mostrar con FlatList
```

Cada vivienda puede mostrar:

- Título
- Dirección
- Precio mensual
- Habitaciones
- Disponibilidad

---------------------------------------------------------------------------------------



# PASO 13 — Crear viviendas


Campos:

- Título
- Descripción
- Dirección
- Precio mensual
- Habitaciones

Estados básicos:

```javascript
const [titulo, setTitulo] = useState("")
const [descripcion, setDescripcion] = useState("")
const [direccion, setDireccion] = useState("")
const [precioMensual, setPrecioMensual] = useState("")
const [habitaciones, setHabitaciones] = useState("")
```

Flujo:

```text
Escribir datos
    ↓
Presionar Crear
    ↓
Construir objeto datos
    ↓
Llamar crearVivienda(datos)
    ↓
Volver a la lista
    ↓
Recargar viviendas
```

---------------------------------------------------------------------------------------



# PASO 14 — Editar y eliminar viviendas

## Editar

Ruta:

```text
src/app/viviendas/editar.jsx
```

Flujo:

```text
Seleccionar vivienda
    ↓
Cargar sus datos en los inputs
    ↓
Modificar campos
    ↓
Presionar Guardar
    ↓
Llamar actualizarVivienda(id, datos)
    ↓
Volver a la lista
```

## Eliminar

Desde la lista o el detalle:

```text
Presionar Eliminar
    ↓
Llamar eliminarVivienda(id)
    ↓
Recargar lista
```

Mantener el flujo sencillo. No agregar confirmaciones o alertas para cada acción si no son necesarias para el ejercicio.

------------------------------------------------------------------------------------------


# PASO 15 — Crear `alquileresServices.js`

Ruta:

```text
src/servicios/alquileres/alquileresServices.js
```

Funciones esperadas:

```text
solicitarAlquiler(datos)
listarAlquileres()
misAlquileres()
cambiarEstadoAlquiler(id, estado)
```

Operaciones de referencia:

| Operación | Método | Ruta de ejemplo |
|---|---|---|
| Solicitar alquiler | POST | `/alquileres` |
| Listar todos | GET | `/alquileres` |
| Mis alquileres | GET | `/alquileres/mis-alquileres` |
| Cambiar estado | PUT | `/alquileres/:id/estado` |

**Importante:** ajustar estas rutas a las rutas reales del backend. El frontend no debe inventar endpoints.

---

# PASO 16 — Crear las pantallas de alquileres

Crear:

```text
src/app/alquileres/
├── index.jsx
└── misAlquileres.jsx
```

## Solicitar alquiler

Desde el detalle de una vivienda:

- Seleccionar fecha de inicio.
- Seleccionar fecha de finalización.
- Enviar `viviendaId`, `fechaInicio` y `fechaFin`.
- Llamar `solicitarAlquiler(datos)`.

## Mis alquileres

- Llamar `misAlquileres()`.
- Guardar los resultados en `useState`.
- Mostrar los alquileres con `FlatList`.
- Mostrar vivienda, fechas y estado.

## Administración

Si el usuario es ADMIN, puede consultar todos los alquileres y cambiar su estado.

Si es CLIENTE, puede consultar sus propios alquileres.

Los permisos se validan en el backend. Ocultar botones en el frontend mejora la experiencia, pero no sustituye la autorización del servidor.

------------------------------------------------------------------------------------------



# PASO 17 — Crear `notificacionesServices.js`

Ruta:

```text
src/servicios/notificacionesServices.js
```

Utilizar:

```javascript
import * as Notifications from "expo-notifications"
```

Funciones que tendrá:

```text
solicitarPermisos()
configurarNotificaciones()
mostrarNotificacion(titulo, mensaje)
programarNotificacion(titulo, mensaje, fecha)
cancelarNotificacion(id)
```

Responsabilidades:

- Solicitar permisos al dispositivo.
- Configurar cómo se muestran las notificaciones.
- Mostrar una notificación local.
- Programar un recordatorio para una fecha futura.
- Cancelar una notificación programada cuando sea necesario.

## Notificaciones del sistema de alquileres

Ejemplos:

1. Notificar al cliente cuando se registre una solicitud de alquiler.
2. Programar un recordatorio para la fecha de inicio.
3. Programar un recordatorio para la fecha de finalización.

**Importante:** una notificación local es programada por la aplicación en el dispositivo. No significa que el backend haya enviado una notificación.

Para este ejercicio no implementaremos push notifications, servidores de notificaciones ni servicios externos.

Probar las notificaciones en un dispositivo compatible. Algunas funciones y comportamientos pueden variar entre Expo Go, emuladores y builds de desarrollo.

---

# PASO 18 — Configurar navegación

Archivo:

```text
src/app/_layout.jsx
```

Utilizar Expo Router para organizar la navegación entre:

```text
index
auth/login
auth/register
viviendas
viviendas/crear
viviendas/editar
viviendas/detalle
alquileres
alquileres/misAlquileres
```

La pantalla inicial:

```text
src/app/index.jsx
```

Puede consultar si existe un token:

```text
Abrir aplicación
    ↓
Consultar token
    ↓
¿Existe token?
   / \
 Sí   No
 ↓     ↓
Inicio Login
```

No implementar navegación compleja ni sistemas de roles avanzados en el cliente. Mantener una navegación sencilla.

---

# PASO 19 — Probar el frontend completo

Probar en este orden:

## Autenticación

- [ ] Registrar usuario.
- [ ] Iniciar sesión.
- [ ] Recibir token.
- [ ] Guardar token.
- [ ] Recuperar token.
- [ ] Cerrar sesión y eliminar token.

## Viviendas

- [ ] Listar viviendas.
- [ ] Buscar una vivienda.
- [ ] Listar disponibles.
- [ ] Crear vivienda como propietario.
- [ ] Editar vivienda.
- [ ] Eliminar vivienda.

## Alquileres

- [ ] Solicitar alquiler.
- [ ] Consultar mis alquileres.
- [ ] Consultar todos como ADMIN.
- [ ] Cambiar estado como ADMIN.
- [ ] Mostrar estado del alquiler.

## Notificaciones

- [ ] Solicitar permisos.
- [ ] Mostrar notificación local.
- [ ] Programar recordatorio.
- [ ] Cancelar notificación.

## Integración

- [ ] Axios apunta a la API correcta.
- [ ] Las rutas coinciden con Express.
- [ ] Las peticiones protegidas envían JWT.
- [ ] El backend recibe correctamente los datos.
- [ ] Las operaciones se reflejan en PostgreSQL.

---

# REGLAS PARA EVITAR COMPLICACIONES

## Regla 1 — Un archivo a la vez

No crear todo el frontend de golpe.

Seguir este ciclo:

```text
Crear archivo
    ↓
Escribir código
    ↓
Revisar
    ↓
Probar
    ↓
Continuar
```

## Regla 2 — JavaScript, no TypeScript

Utilizar:

```text
.jsx
.js
```

No utilizar `.tsx` ni `.ts` en estos ejercicios.

## Regla 3 — Separar pantallas y servicios

Las pantallas muestran información y gestionan estados.

Los servicios realizan las peticiones HTTP.

```text
Pantalla
   ↓
Servicio
   ↓
Axios
   ↓
Express API
```

No colocar todas las peticiones Axios directamente dentro de las pantallas.

## Regla 4 — No conectar React Native directamente a PostgreSQL

Arquitectura obligatoria:

```text
React Native
     ↓
   Axios
     ↓
 Express API
     ↓
 Controllers
     ↓
   Prisma
     ↓
 PostgreSQL
```

## Regla 5 — Manejo de errores básico

Para estos ejercicios:

- Utilizar un `try/catch` sencillo en las operaciones que lo necesiten.
- Mostrar un mensaje sencillo si una petición falla.
- Utilizar un estado de carga cuando sea útil.
- No crear sistemas globales de errores.
- No agregar interceptores, servicios de logging ni capas adicionales sin necesidad.
- No llenar cada pantalla de `Alert.alert()`.

La prioridad es comprender el flujo del CRUD y la comunicación con la API.

## Regla 6 — Mantener los nombres consistentes

Utilizar nombres claros:

```text
listarViviendas()
crearVivienda()
actualizarVivienda()
eliminarVivienda()
```

Los nombres de servicios deben corresponder con las operaciones del backend.

## Regla 7 — No duplicar la URL de la API

La URL se configura una sola vez en `api.js`, mediante la variable de entorno.

## Regla 8 — El token se guarda en AsyncStorage

No guardar contraseñas. Guardar solamente el JWT necesario para las peticiones protegidas.

## Regla 9 — Los permisos se comprueban en el backend

El frontend puede ocultar acciones que no correspondan al rol, pero Express debe validar siempre los permisos.

## Regla 10 — No avanzar si la conexión no funciona

Antes de crear todas las pantallas, comprobar:

```text
React Native
    ↓
Axios
    ↓
Express
    ↓
Respuesta JSON
```

Si esta comunicación funciona, continuar con los servicios y pantallas.

---

# ESTRUCTURA FINAL ESPERADA

```text
frontend/
│
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login.jsx
│   │   │   └── register.jsx
│   │   │
│   │   ├── viviendas/
│   │   │   ├── index.jsx
│   │   │   ├── crear.jsx
│   │   │   ├── editar.jsx
│   │   │   └── detalle.jsx
│   │   │
│   │   ├── alquileres/
│   │   │   ├── index.jsx
│   │   │   └── misAlquileres.jsx
│   │   │
│   │   ├── _layout.jsx
│   │   └── index.jsx
│   │
│   └── servicios/
│       ├── api.js
│       ├── authServices.js
│       ├── authStorage.js
│       ├── notificacionesServices.js
│       │
│       ├── viviendas/
│       │   └── viviendasServices.js
│       │
│       └── alquileres/
│           └── alquileresServices.js
│
├── .env
├── .gitignore
├── app.json
├── package.json
└── package-lock.json
```

---

# CHECKLIST FINAL

## Expo y configuración

- [ ] Proyecto Expo creado.
- [ ] Expo inicia correctamente.
- [ ] JavaScript / JSX configurado.
- [ ] Expo Router configurado.
- [ ] Dependencias instaladas.
- [ ] `.env` configurado.
- [ ] URL de la API comprobada desde el dispositivo o emulador.

## Servicios base

- [ ] `api.js` creado.
- [ ] Axios configurado.
- [ ] `authStorage.js` creado.
- [ ] AsyncStorage configurado.
- [ ] `authServices.js` creado.
- [ ] Registro conectado.
- [ ] Login conectado.
- [ ] JWT guardado y recuperado.

## Viviendas

- [ ] `viviendasServices.js` creado.
- [ ] Listar viviendas.
- [ ] Buscar vivienda.
- [ ] Listar disponibles.
- [ ] Crear vivienda.
- [ ] Actualizar vivienda.
- [ ] Eliminar vivienda.
- [ ] `FlatList` implementado.
- [ ] Formularios conectados.

## Alquileres

- [ ] `alquileresServices.js` creado.
- [ ] Solicitar alquiler.
- [ ] Consultar mis alquileres.
- [ ] Consultar todos los alquileres como ADMIN.
- [ ] Cambiar estado del alquiler.
- [ ] Mostrar fechas y estado.

## Notificaciones

- [ ] `expo-notifications` instalado.
- [ ] `notificacionesServices.js` creado.
- [ ] Permisos solicitados.
- [ ] Notificación local mostrada.
- [ ] Recordatorio programado.
- [ ] Notificación cancelada.

## Navegación

- [ ] `_layout.jsx` configurado.
- [ ] `index.jsx` configurado.
- [ ] Login y registro conectados.
- [ ] Navegación a viviendas.
- [ ] Navegación a alquileres.
- [ ] Cierre de sesión implementado.

## Pruebas finales

- [ ] Login funciona.
- [ ] Token funciona.
- [ ] CRUD de viviendas funciona.
- [ ] Solicitudes de alquiler funcionan.
- [ ] Roles respetados por el backend.
- [ ] Notificaciones locales funcionan.
- [ ] React Native se comunica correctamente con Express.

---

**FIN — FRONTEND: SECUENCIA DEFINITIVA DEL PROYECTO**

> Metodología: simple, incremental y práctica. Un archivo a la vez. Sin complicar la arquitectura ni agregar funcionalidades innecesarias.
