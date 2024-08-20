# Baby Tracker App 👶

[![React](https://img.shields.io/badge/React-17.0.2-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-2.5.1-brightgreen)](https://vitejs.dev/)
[![Redux](https://img.shields.io/badge/Redux-4.1.1-purple)](https://redux.js.org/)
[![React Router](https://img.shields.io/badge/React%20Router-5.2.1-orange)](https://reactrouter.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-blueviolet)](https://getbootstrap.com/)
[![React-Bootstrap](https://img.shields.io/badge/React%20Bootstrap-2.0.0--beta.6-blue)](https://react-bootstrap.github.io/)
[![Axios](https://img.shields.io/badge/Axios-0.24.0-yellow)](https://axios-http.com/)
[![React ApexChart](https://img.shields.io/badge/React%20ApexChart-1.3.9-red)](https://apexcharts.com/)
[![fns](https://img.shields.io/badge/fns-2.23.0-green)](https://date-fns.org/)
[![Spinner](https://img.shields.io/badge/Spinner-4.0.0-yellowgreen)](https://www.npmjs.com/package/react-loader-spinner)
[![Modal](https://img.shields.io/badge/Modal-3.14.3-lightgrey)](https://www.npmjs.com/package/react-modal)
[![Datepicker](https://img.shields.io/badge/Datepicker-4.2.0-lightgrey)](https://www.npmjs.com/package/react-datepicker)

Esta es una aplicación de seguimiento de bebés desarrollada con React, Vite, Redux, React Router y Bootstrap. La aplicación permite a los usuarios registrar eventos que el bebé completa durante el día, actualizar estadísticas y métricas en tiempo real, y proporcionar varias funcionalidades incluyendo el registro de usuarios, inicio de sesión, cierre de sesión, gestión de eventos y análisis estadístico.

## Tecnologías Utilizadas

- **React**: Librería de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida y moderna para aplicaciones web.
- **Redux**: Biblioteca para la gestión del estado global de la aplicación.
- **React Router**: Librería para la gestión de rutas en una aplicación React.
- **Bootstrap**: Framework de CSS para diseño y estilos.
- **React-Bootstrap**: Biblioteca de componentes de Bootstrap para React.
- **Axios**: Cliente HTTP para realizar solicitudes a la API.
- **React ApexChart**: Biblioteca de gráficos interactivos para React basada en ApexCharts. Permite crear visualizaciones de datos personalizadas y dinámicas en aplicaciones React.
- **fns**: Biblioteca ligera y moderna para manipulación de fechas
- **Spinner**: Componente de React utilizado para mostrar un indicador de carga o progreso.
- **Modal**: Componente de React utilizado para mostrar contenido emergente o modal en la interfaz de usuario.
- **Datepicker**: Componente de React utilizado para seleccionar fechas en un calendario.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd baby-tracker
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Instala Bootstrap React-Bootstrap React-icons:
   ```bash
   npm install --save-dev react-icons bootstrap react-bootstrap
   ```
5. Instala ApexCharts:
   ```bash
   npm install --save-dev react-apexcharts apexcharts
   ```
6. Instala fns:
   ```bash
   npm install --save-dev date-fns
   ```
7. Instala Spinner:
   ```bash
   npm install --save-dev react-loader-spinner
   ```
8. Instala Modal:
   ```bash
   npm install --save-dev react-modal
   ```
9. Instala Datepicker:
   ```bash
   npm install --save-dev react-datepicker
   ```
10. Instala Axios:
    ```bash
    npm install --save-dev axios
    ```
11. Instala Redux:
    ```bash
    npm install --save-dev redux react-redux
    ```
12. Instala Redux Toolkit:
    ```bash
    npm install --save-dev @reduxjs/toolkit
    ```
13. Instala React Router:
    ```bash
    npm install --save-dev react-router-dom
    ```

### Configuración

1. Asegúrate de incluir Bootstrap en tu proyecto. Añade el siguiente import en tu archivo principal (por ejemplo, index.jsx o main.jsx):

   ```javascript
   import 'bootstrap/dist/css/bootstrap.min.css';
   ```

2. Para utilizar React-Bootstrap, importa los componentes necesarios desde la biblioteca en tus componentes React.

### Ejecución del Proyecto

1. Para iniciar el servidor de desarrollo, ejecuta:

   ```bash
   npm run dev
   ```

2. Luego, abre tu navegador y navega a http://localhost:3000 para ver la aplicación en acción.

Scripts

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run preview`: Previsualiza la aplicación construida.

Estructura del Proyecto

- `src/`: Contiene el código fuente de la aplicación.
- `components/`: Componentes reutilizables de React.
- `slices/`: Cortes de Redux para el manejo del estado.
- `pages/`: Páginas principales de la aplicación.
- `public/`: Archivos estáticos como imágenes y el archivo index.html.

Contribuciones
Para contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añade nueva característica'`).
4. Empuja los cambios a tu fork (`git push origin feature/nueva-caracteristica`).
5. Crea una Pull Request.

### Deploy en GitHub Pages (Opcional)

1. Instala la herramienta gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Añade la URL de tu página en el archivo `package.json`:
   ```json
   "homepage": "https://USERNAME.github.io/REPO_NAME"
   ```
3. Añade los siguientes scripts en el archivo `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist",
   ```
4. Ejecuta el script de deploy:
   ```bash
   npm run deploy
   ```
5. Asegúrate de habilitar GitHub Pages en la configuración de tu repositorio vite.config.js
   ```json
   base: '/baby-tracker/'
   ```
6. Abre la URL de tu página en el navegador.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

Este `README.md` proporciona una visión general completa del proyecto, instrucciones de instalación y configuración, y detalles sobre cómo contribuir. Asegúrate de reemplazar `<URL_DEL_REPOSITORIO>` y `nombre-del-proyecto` con la URL real del repositorio y el nombre de tu proyecto, respectivamente.```markdown
