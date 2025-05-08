# Fulbo ⚽

**Fulbo** es una aplicación web para seguir resultados deportivos en vivo, empezando por fútbol, con la pasión y el alma del potrero argentino. Inspirada en sitios como Promiedos, Fulbo ofrece marcadores, tablas de posiciones y calendarios actualizados, con una interfaz simple y responsive. El objetivo es crear una experiencia rápida y cercana para los hinchas, con planes de escalar a otros deportes y convertirse en una app móvil en el futuro.

Este repositorio es un **monorepo** que contiene el backend (Node.js/Express) y el frontend (React), diseñado para el MVP de Fulbo. Usamos APIs como Sportmonks para datos en vivo y planeamos integrar múltiples proveedores (ej. API-Football) para mayor flexibilidad.

## 🎯 Objetivo del MVP
Crear una app web funcional que muestre:
- Resultados en vivo de partidos de fútbol (goles, tarjetas, etc.).
- Tablas de posiciones de ligas principales (ej. Premier League, La Liga).
- Calendario de partidos (próximos y pasados).
- Interfaz responsive y actualizaciones en tiempo real.
- Backend modular para soportar múltiples APIs de datos.

## 📂 Estructura del proyecto
```
fulbo/
├── backend/                # Código del backend (Node.js/Express)
│   ├── src/               # Lógica principal (rutas, controladores, adaptadores)
│   ├── package.json       # Dependencias del backend
│   ├── .env               # Variables de entorno (ej. claves de API)
│   └── ...
├── frontend/               # Código del frontend (React)
│   ├── src/               # Componentes, páginas, hooks
│   ├── public/            # Recursos estáticos
│   ├── package.json       # Dependencias del frontend
│   └── ...
├── README.md              # Documentación del proyecto
├── .gitignore             # Archivos ignorados (node_modules, .env)
└── .github/               # Configuración de CI/CD (futuro)
```

## 🚀 Pasos del MVP
### Semana 1: Investigación y setup
- [ ] Registrarse en **Sportmonks** (plan gratuito) y obtener una clave de API.
- [ ] Probar endpoints básicos de Sportmonks (ej. `/matches`) para entender los datos.
- [ ] Configurar el entorno local:
  - Instalar Node.js y npm.
  - Crear la estructura del monorepo (`/backend`, `/frontend`).
  - Inicializar proyectos: `npm init` en `/backend`, `npx create-vite@latest` en `/frontend` (React).
- [ ] Configurar GitHub:
  - Subir el monorepo a GitHub.
  - Agregar `.gitignore` para `node_modules`, `.env`, etc.
- [ ] Diseñar un mockup simple (en Figma o papel) con:
  - Homepage (lista de partidos en vivo).
  - Página de liga (tabla de posiciones).
  - Página de partido (detalles en vivo).

### Semana 2-3: Backend básico
- [ ] Crear un servidor **Express** en `/backend`:
  - Endpoint `/api/matches` que consuma Sportmonks y devuelva resultados.
  - Estructura modular: rutas, controladores, adaptador para Sportmonks.
- [ ] Implementar un caché simple con `node-cache` para reducir llamadas a la API.
- [ ] Normalizar datos de Sportmonks (ej. formato unificado para goles, equipos).
- [ ] Agregar variables de entorno (`.env`) para la clave de API y puerto.
- [ ] Desplegar el backend en **Fly.io** (plan gratuito):
  - Configurar Fly.io CLI y conectar con GitHub.
  - Crear un `fly.toml` en `/backend` para el despliegue.

### Semana 4-5: Frontend básico
- [ ] Configurar una app **React** con **Vite** en `/frontend`:
  - Usar **React Router** para páginas (`/`, `/league/:id`, `/match/:id`).
  - Instalar **Tailwind CSS** para un diseño responsive rápido.
- [ ] Crear componentes reutilizables:
  - `MatchCard`: Muestra un partido (equipos, marcador, tiempo).
  - `LeagueTable`: Tabla de posiciones.
  - `LiveScoreTicker`: Barra de resultados en vivo.
- [ ] Conectar el frontend al backend con **Axios**:
  - Consumir `/api/matches` para mostrar partidos.
- [ ] Desplegar el frontend en **Vercel** (plan gratuito):
  - Conectar `/frontend` a Vercel vía GitHub.
  - Configurar un dominio gratuito (ej. fulbo.vercel.app).

### Semana 6: Actualizaciones en tiempo real
- [ ] Implementar **Socket.io** en el backend para enviar actualizaciones en vivo (ej. goles).
- [ ] Agregar **Socket.io-client** en el frontend para recibir eventos en tiempo real.
- [ ] Crear un componente `LiveScoreTicker` que se actualice automáticamente.
- [ ] Probar con un partido en vivo usando Sportmonks (plan gratuito).

### Semana 7-8: Pulido y pruebas
- [ ] Optimizar la UX:
  - Agregar filtros (por liga, fecha).
  - Mejorar la responsividad en móviles.
- [ ] Implementar **Google Analytics** (gratis) para rastrear visitas.
- [ ] Configurar **Sentry** (gratis hasta un límite) para monitorear errores.
- [ ] Invitar a amigos a probar la app y recoger feedback.
- [ ] Documentar la API interna con **Swagger** o **Postman**.

## 🛠️ Tecnologías
- **Backend**: Node.js, Express, Socket.io, node-cache.
- **Frontend**: React, Vite, Tailwind CSS, Axios, Socket.io-client.
- **APIs**: Sportmonks (MVP), API-Football (futuro).
- **Hosting**: Fly.io (backend), Vercel (frontend).
- **Otros**: Google Analytics, Sentry, MongoDB Atlas (opcional para DB).

## 📋 Requisitos para contribuir
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/fulbo.git
   ```
2. Instalar dependencias:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Configurar variables de entorno:
   - Crear `/backend/.env` con:
     ```
     SPORTMONKS_API_KEY=tu-clave
     PORT=3000
     ```
   - Crear `/frontend/.env` con:
     ```
     VITE_API_URL=http://localhost:3000/api
     ```
4. Correr localmente:
   - Backend: `cd backend && npm start`
   - Frontend: `cd frontend && npm run dev`

## 🌟 Próximos pasos (post-MVP)
- Integrar **API-Football** como segundo proveedor de datos.
- Agregar soporte para otros deportes (ej. básquet, tenis).
- Convertir la app en una **PWA** (Progressive Web App).
- Desarrollar una app móvil con **React Native**.
- Implementar autenticación (JWT) para perfiles de usuario.
- Monetizar con anuncios (Google AdSense) o afiliados de apuestas.

## 🤝 Contribuir
¡Sumate al potrero! Si querés colaborar:
- Crea un issue para sugerir mejoras.
- Forkea el repo, crea una rama (`feature/nueva-funcion`) y envía un PR.
- Contactame en X: @FulboApp (próximamente).

## 📬 Feedback
Probá Fulbo y contanos qué te parece:
- En X: Mencioná @FulboApp.
- Por mail: fulboapp@gmail.com (próximamente).

¡Vamos Fulbo, que la pelota no para! ⚽