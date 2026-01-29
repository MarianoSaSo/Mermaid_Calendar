# Mermaid Calendar AI 🧜‍♀️📅

Este proyecto es una interfaz de calendario inteligente diseñada para integrarse con **Mermaid Knowledge AI**. Permite gestionar tu agenda de forma visual y a través de un asistente de IA impulsado por n8n.

## ✨ Características

- **Look & Feel Premium**: Basado en el sistema de diseño Shadcn/UI y Radix UI, clonando la estética de la plataforma principal de Mermaid.
- **Asistente AI**: Chat integrado que permite consultar, añadir y modificar eventos de tu calendario usando lenguaje natural.
- **Sincronización con n8n**: Backend flexible que procesa las peticiones de calendario.
- **Modo Claro/Oscuro**: Totalmente adaptado a las preferencias del usuario.
- **Diseño Responsivo**: Sidebar colapsable y layout optimizado para diferentes tamaños de pantalla.

## 🚀 Instalación Local

1. **Clonar el repositorio**:
   ```bash
   git clone [URL-DEL-REPOSITORIO]
   cd Mermaid_Calendar
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar el Webhook**:
   - El archivo `src/components/Chat.jsx` utiliza un proxy para comunicarse con n8n.
   - Asegúrate de tener tu servidor n8n ejecutándose en `http://localhost:5678` o actualiza el archivo `vite.config.js` con tu URL.

4. **Iniciar en desarrollo**:
   ```bash
   npm run dev
   ```

## 🛠️ Tecnologías Usadas

- **React 18** + **Vite**
- **Tailwind CSS** (v3)
- **Lucide React** (Iconos)
- **Framer Motion** (Animaciones)
- **React Big Calendar** (Core del calendario)
- **Radix UI** (Componentes de interfaz)

## 📁 Estructura del Proyecto

- `src/components/`: Contiene los componentes de UI y lógica como el Chat y el Calendario.
- `src/contexts/`: Gestión de estado global (Autenticación y Temas).
- `src/lib/`: Funciones de utilidad y configuración de menús.
- `public/`: Archivos estáticos como logos y videos.

---
Desarrollado para el ecosistema **Mermaid AI**.
