# **CoraMed** 🚀  

🩺 Aplicación móvil desarrollada en **React Native** con **Expo**, que permite a los usuarios gestionar turnos médicos, ver su perfil, historial, obra social y cambiar idioma entre español e inglés.
---

## **Tabla de Contenidos** 📑  
1. [Requisitos](#requisitos-📋)  
2. [Instalación](#instalación-⚙️)  
3. [Configuración del Entorno](#configuración-del-entorno-🛠️)  
4. [Ejecución en Android Emulator](#ejecución-en-android-emulator-📱)  
5. [Funcionalidades](#funcionalidades)  
6. [Dependencias](#dependencias-📦)  
7. [Desarrolladores](#desarrolladores-🤝)  


---

## **Requisitos** 📋  
- [Node.js](https://nodejs.org/) (v16 o superior)  
- [npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/)  
- [Android Studio](https://developer.android.com/studio) (para el emulador Android sug)  
- [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (v11 o superior)  
- [React Native CLI](https://reactnative.dev/docs/environment-setup)  

---

## **Instalación** ⚙️  

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/franisola/CoraMed.git
   cd CoraMed

2. **Instalar depedencias** 
   ```bash
   npm install
      # o
   yarn install
3. **Configuración del Entorno 🛠️** 

         1. Configurar Android Studio y Emulador
         Abre Android Studio y ve a AVD Manager (Android Virtual Device).
         Crea un nuevo dispositivo virtual (recomendado: Pixel 6 con API 30+ o Medium Phone).
         Asegúrate de que el emulador funcione correctamente.

4. **Ejecución en Android Emulator 📱**
   ```bash
   npm start


Modo desarrollo   
Para iniciar la aplicacion: Presionar A en la terminal.  
Para recargar la app: Presiona R en la terminal.

5. ## 📱 Funcionalidades

- 🧑‍⚕️ Perfil del paciente
- 📅 Gestión de turnos
- 🧾 Historial médico
- 🏥 Visualización de obra social
- 🌐 Soporte multilenguaje (español / inglés)
- 🌙 Cambio de tema (claro/oscuro)
- 🔒 Navegación autenticada

---
6. **Dependencias**  
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)
- [Context API](https://reactjs.org/docs/context.html) (para manejo de temas)


7. **Desarrolladores**

Francisco Isola - https://github.com/franisola  
Oteiza Santiago - https://github.com/santiote  
Julian Aguero - https://github.com/JulianAgu  
Martin Ascariz - https://github.com/hipocl

- queremos saber porque cuando viene un error del back la screen vuelve para la screen principal del flujo
- esta bien que el flujo principal se de a partir del tab navigation, ademas queremos agregar el burger menu ahi 
y queremos saber si es lo mas optimo 
-como hacemos para el recupero de contraseña, porque nosotros enviamos un mail, que tiene un link con un token que autoriza el cambio
de contraseña. como hacemos para que ese link redirija a la app
