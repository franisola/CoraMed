  # **CoraMed** 🩺

> Aplicación móvil desarrollada con **React Native** y **Expo** para la gestión integral de turnos médicos. Permite a los usuarios reservar y gestionar citas, consultar su historial clínico, administrar sus datos personales y cobertura médica, así como personalizar su experiencia dentro de la app. Pensada para brindar una experiencia simple, rápida e intuitiva para pacientes.

[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.16-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)

---

## **Tabla de Contenidos** 📑  
1. [Características](#características-✨)
2. [Requisitos](#requisitos-📋)  
3. [Instalación](#instalación-⚙️)  
4. [Configuración del Entorno](#configuración-del-entorno-🛠️)  
5. [Ejecución](#ejecución-🚀)  
6. [Scripts Disponibles](#scripts-disponibles-⚡)
7. [Funcionalidades](#funcionalidades-📱)  
8. [Arquitectura](#arquitectura-🏗️)
9. [Testing](#testing-🧪)
10. [Dependencias](#dependencias-📦)  
11. [Desarrolladores](#desarrolladores-🤝)  

---

## **Características** ✨

- 🔐 **Autenticación segura** con gestión de sesiones
- 👤 **Perfil completo** del paciente con datos médicos
- 📅 **Gestión avanzada de turnos** con calendario interactivo
- 📋 **Historial médico** detallado y accesible
- 🏥 **Integración con obras sociales** 
- 🌐 **Soporte multiidioma** (Español/Inglés)
- 🌙 **Temas personalizables** (Claro/Oscuro)
- 📱 **Diseño responsivo** optimizado para móviles
- 🔄 **Sincronización offline** con Redux Persist
- 🔔 **Notificaciones push** para recordatorios

---

## **Requisitos** 📋  

### Requisitos del Sistema
- **Node.js** >= 16.0.0
- **npm** >= 7.0.0 o **Yarn** >= 1.22.0
- **Java Development Kit (JDK)** >= 11
- **Android Studio** (para desarrollo Android)
- **Xcode** (para desarrollo iOS - solo macOS)

### Herramientas Recomendadas
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [VS Code](https://code.visualstudio.com/) con extensiones React Native

---

## **Instalación** ⚙️  

### 1. Clonar el repositorio
```bash
git clone https://github.com/franisola/CoraMed.git
cd CoraMed
```

### 2. Instalar dependencias
```bash
npm install
# o usando Yarn
yarn install
```

### 3. Configurar variables de entorno
```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
# Editar .env con tus configuraciones
```

---

## **Configuración del Entorno** 🛠️  

### Android Studio Setup
1. Instalar [Android Studio](https://developer.android.com/studio)
2. Abrir **AVD Manager** (Android Virtual Device)
3. Crear un dispositivo virtual:
   - **Recomendado**: Pixel 6 con API 30+
   - **Alternativa**: Medium Phone con API 33
4. Verificar que el emulador funcione correctamente

### iOS Setup (solo macOS)
1. Instalar Xcode desde App Store
2. Instalar herramientas de línea de comandos:
   ```bash
   xcode-select --install
   ```
3. Instalar simulador iOS

---

## **Ejecución** 🚀

### Modo Desarrollo
```bash
# Iniciar el servidor de desarrollo
npm start

# Para Android
npm run android

# Para iOS
npm run ios

# Para Web
npm run web
```

### Controles durante el desarrollo
- **Presionar `a`** → Abrir en Android
- **Presionar `i`** → Abrir en iOS  
- **Presionar `w`** → Abrir en Web
- **Presionar `r`** → Recargar la aplicación
- **Presionar `m`** → Alternar menú

---

## **Scripts Disponibles** ⚡

```bash
npm start          # Iniciar servidor de desarrollo
npm run android    # Ejecutar en Android
npm run ios        # Ejecutar en iOS
npm run web        # Ejecutar en navegador
npm run lint       # Ejecutar linter
npm test           # Ejecutar tests
npm run test:watch # Ejecutar tests en modo watch
npm run test:coverage # Generar reporte de cobertura
```

---

## **Funcionalidades** 📱

### 🧑‍⚕️ Gestión de Pacientes
- Perfil completo con datos personales y médicos
- Historial clínico detallado
- Gestión de contactos de emergencia

### 📅 Sistema de Turnos
- Calendario interactivo con disponibilidad
- Reserva y cancelación de turnos
- Notificaciones automáticas de recordatorios
- Historial de citas médicas

### 🏥 Integración Médica
- Visualización de obra social activa
- Conexión con sistemas hospitalarios


### 🌐 Experiencia de Usuario
- Interfaz intuitiva y accesible
- Soporte completo para español e inglés
- Temas claro y oscuro
- Navegación fluida y responsiva

---

## **Arquitectura** 🏗️

```
src/
├── components/          # Componentes reutilizables
├── screens/            # Pantallas de la aplicación
├── navigation/         # Configuración de navegación
├── services/          # Servicios de API y lógica de negocio
├── store/             # Redux store y slices
├── utils/             # Utilidades y helpers
├── types/             # Definiciones de TypeScript
├── hooks/             # Custom hooks
├── constants/         # Constantes globales
└── locales/           # Archivos de traducción
```

### Stack Tecnológico
- **Frontend**: React Native + Expo
- **Estado Global**: Redux Toolkit + Redux Persist
- **Navegación**: React Navigation v7
- **Formularios**: React Hook Form + Zod
- **Estilado**: NativeWind (Tailwind CSS)
- **Internacionalización**: i18next + react-i18next
- **Testing**: Jest + React Native Testing Library

---

## **Testing** 🧪

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

### Estructura de Tests
- **Unit Tests**: Componentes individuales
- **Integration Tests**: Flujos completos
- **Snapshot Tests**: Consistencia de UI

---

## **Dependencias** 📦  

### Dependencias Principales
- **React Native**: Framework multiplataforma
- **Expo**: Plataforma de desarrollo
- **TypeScript**: Tipado estático
- **React Navigation**: Sistema de navegación
- **Redux Toolkit**: Manejo de estado global
- **i18next**: Internacionalización
- **React Hook Form**: Gestión de formularios
- **Axios**: Cliente HTTP

### Dependencias de Desarrollo
- **ESLint + Prettier**: Linting y formateo
- **Jest**: Framework de testing
- **React Native Testing Library**: Utilidades de testing

---

## **Desarrolladores** 🤝

| Developer | GitHub |
|-----------|---------|
| Francisco Isola | [@franisola](https://github.com/franisola) 
| Santiago Oteiza | [@santiote](https://github.com/santiote) 
| Julian Aguero | [@JulianAgu](https://github.com/JulianAgu) 
| Martin Ascariz | [@hipocl](https://github.com/hipocl) 

---



