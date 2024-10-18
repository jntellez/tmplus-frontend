# Transporte Motorizado Plus (TMPlus) - Frontend

Este es el frontend de la aplicación Transporte Motorizado Plus (TMPlus), desarrollada con React Native y Expo. Esta aplicación permite a los usuarios alquilar motos de forma sencilla y eficiente.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)

## Características

- Listado de motos disponibles para renta.
- Interfaz intuitiva para los usuarios.
- Conexión con la API de TMPlus para obtener información en tiempo real.

## Tecnologías Utilizadas

- **React Native**: Framework para construir aplicaciones móviles.
- **Expo**: Herramienta para desarrollar y desplegar aplicaciones React Native.
- **JavaScript**: Lenguaje de programación utilizado en el desarrollo.

## Instalación

1. **Clonar el Repositorio**

   ```bash
   git clone https://github.com/jntellez/tmplus-frontend.git
   cd tmplus-app
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   ```

## Ejecución de la Aplicación

Para ejecutar la aplicación, utiliza el siguiente comando:

```bash
npm start
```

Esto abrirá una nueva pestaña en tu navegador con el panel de control de Expo, donde podrás escanear el código QR con la aplicación Expo Go en tu dispositivo móvil para probar la aplicación en tiempo real.

## Estructura del Proyecto

```
tmplus-app
├── app
│   └── _layout.jsx
│   └── index.jsx
├── components
└── package.json
```

- **app/**: Contiene los archivos de enrutado y la estructura principal de la aplicación.
- **components/**: Contiene componentes reutilizables, como el componente `Home`.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agregada nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.
