# 🌍 CountriesApp

**CountriesApp** es una aplicación móvil desarrollada con **React Native**, **TypeScript** y **Expo Router**, que permite visualizar información de países y reproducir videos en formato **HLS**.

---

## 🚀 Tecnologías Utilizadas

- ⚛️ **React Native** con **Expo**
- 🏷 **TypeScript**
- 🔗 **Apollo Client** para consumir una API de **GraphQL**
- 🧭 **Expo Router** para el sistema de navegación basado en archivos
- 🎨 **React Native Paper** para la interfaz de usuario
- 🎥 **Expo AV** para reproducción de video HLS

---

## 📦 Instalación y Ejecución

### 🛠 Requisitos Previos

Asegúrate de tener instalado **Node.js**, **Git** y **Expo CLI**:

```sh
npm install -g expo-cli

📥 Clonar el Repositorio

git clone https://github.com/Vanina-Winnik/countries-react-native.git
cd CountriesApp

📌 Instalar Dependencias

npm install

▶️ Ejecutar la Aplicación

npx expo start

Luego escanea el código QR con Expo Go o usa un emulador.

📂 Estructura del Proyecto

countries-react-native/
 ├── countries-app/
 │   ├── .expo/                # Configuración de Expo
 │   ├── app/                  # Rutas de la app (Expo Router)
 │   │   ├── _layout.tsx       # Diseño base de navegación
 │   │   ├── [code].tsx        # Pantalla de detalle dinámico
 │   │   ├── index.tsx         # Pantalla principal (listado de países)
 │   ├── assets/               # Recursos estáticos (imágenes, etc.)
 │   ├── components/           # Componentes reutilizables
 │   │   ├── CountryCard.tsx   # Tarjeta para mostrar un país
 │   │   ├── CountryDetail.tsx # Vista detallada de un país
 │   │   ├── FilterDropdown.tsx # Filtros de búsqueda
 │   │   ├── VideoPlayer.tsx   # Reproductor de video HLS
 │   ├── graphql/              # Configuración y consultas GraphQL
 │   │   ├── client.ts         # Configuración de Apollo Client
 │   │   ├── queries.ts        # Consultas GraphQL
 │   ├── hooks/                # Hooks personalizados
 │   │   ├── useCountries.tsx  # Hook para obtener datos de países
 │   ├── node_modules/         # Dependencias
 │   ├── .gitignore            # Archivos ignorados en Git
 │   ├── app.json              # Configuración de Expo
 │   ├── package.json          # Dependencias y scripts del proyecto
 │   ├── package-lock.json     # Versión exacta de dependencias
 │   ├── tsconfig.json         # Configuración de TypeScript

🔗 APIs Utilizadas

🌍 Información de países: https://countries.trevorblades.com (GraphQL)
🎞 Endpoints usados en las demos de la librería hls.js: https://github.com/video-dev/hls.js/tree/master/demo

📜 Funcionalidades
✅ Listado de países con búsqueda y filtros (nombre, continente, moneda)
✅ Detalle de país (nombre, código, moneda, idiomas, etc.)
✅ Reproductor de video HLS con controles básicos (play, pausa, progreso)
✅ UI moderna con React Native Paper
✅ Navegación fluida y basada en archivos con Expo Router
✅ Consumo eficiente de API con Apollo Client

⚙️ Configuración de Apollo Client
Modifica graphql/client.ts si deseas cambiar la URL de la API:

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

export default client;
