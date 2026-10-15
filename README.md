# 🛠️ CLI Tool - DummyJSON API (Node.js)

Consola interactiva de línea de comandos (CLI) desarrollada en **Node.js** para consumir la API de **DummyJSON**. Permite realizar operaciones CRUD (obtener, crear y eliminar productos) directamente pasando argumentos desde la terminal.

---

## 🚀 Requisitos Previos

* **Node.js** (versión 18 o superior recomendada)
* **npm** (gestor de paquetes de Node)

---

## 📦 Instalación

1. ClONÁ o descargá este repositorio en tu máquina.
2. Abrí la terminal dentro de la carpeta del proyecto.
3. Ejecutá el siguiente comando para instalar las dependencias (si aplica):

```bash
npm install

⚙️ Uso de la Aplicación
Los comandos se ejecutan a través de npm run start pasando el método HTTP, el recurso/ID y opcionalmente los datos en formato JSON.

Nota: Si usás Windows o PowerShell, se recomienda usar -- después de npm run start para asegurar que los argumentos se transfieran correctamente a Node.js.

1️⃣ Obtener Productos (GET)
Obtener todos los productos:

Bash
npm run start -- GET products
Obtener un producto específico por ID:

Bash
npm run start -- GET products/5
2️⃣ Crear un Producto (POST)
Para crear un producto, pasá la ruta products y los datos en formato JSON como argumento entre comillas simples:

Bash
npm run start -- POST products '{"title": "Remera Nike", "price": 120}'
3️⃣ Eliminar un Producto (DELETE)
Podés eliminar un producto indicando su ID en la misma ruta o como parámetro adicional:

Bash
npm run start -- DELETE products/7
🛠️ Tecnologías Utilizadas
Node.js - Entorno de ejecución de JavaScript.

Fetch API - Manejo de peticiones HTTP asincrónicas.

Process.argv - Captura de argumentos recibidos desde la consola.

DummyJSON API - Backend mockeado para pruebas CRUD.

✒️ Autor : Segura Marisa
Proyecto desarrollado para la entrega de Node.js.


---
