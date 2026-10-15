const API_URL = "https://dummyjson.com"; // api base URL
// Aquí se extraen los argumentos de la línea de comandos
const [, , method, route, ...args] = process.argv;
// Se verifica que se haya proporcionado un método y una ruta
if (!method || !route) {
  console.error(
    "Please provide a method (GET, POST, PUT, DELETE) and a route (e.g., products or products/1).",
  );
  process.exit(1);
}
// Separa el recurso y el ID si está presente
const [resource, id] = route.split("/");
// Construye la URL de la solicitud
const url = id ? `${API_URL}/${resource}/${id}` : `${API_URL}/${resource}`;
// Realiza la solicitud HTTP según el método especificado
const request = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
// Se maneja la solicitud según el método especificado
switch (method) {
  case "GET":
    if (route === "products") {
      console.log("Fetching all products...");
      getAllProducts();
    } else if (route === "product") {
      if (args.length > 0) {
        // Check if an ID is provided
        const id = args[0];
        console.log(`Fetching product with ID: ${id}`);
        getProductById(id);
      } else {
        console.log(
          "Please provide a valid product ID to fetch a specific product.",
        );
      }
    } else {
      console.log("Invalid route. Please use 'products' or 'product'.");
    }
    break;
  case "POST":
    // Check if the route is 'product' and if product data is provided
    if (route === "product" && args.length > 0) {
      // Parse the product data from the command line argument
      const productData = JSON.parse(args[0]);

      createProduct(productData);
    } else {
      console.log(
        "Please provide product data in JSON format to create a new product.",
      );
    }
    break;
  case "PUT":
    if (route === "product" && args.length > 1) {
      const id = args[0];
      const productData = JSON.parse(args[1]);
      updateProduct(id, productData);
    }
    break;
  case "DELETE":
    if (route === "product" && args.length > 0) {
      const id = args[0];
      deleteProduct(id);
    }
    break;
  default:
    console.log(
      "Invalid method or route. Please use GET, POST, PUT, or DELETE with the appropriate route.",
    );
}
// Funciones para realizar las operaciones CRUD
// Función para obtener todos los productos

async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();
    console.log("All products:", products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
// Función para obtener un producto por ID
async function getProductById(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    const product = await response.json();
    console.log(product);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
  }
}
// Funciones para crear productos
async function createProduct(productData) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const newProduct = await response.json();
    console.log("Product created:", newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
  }
}
// Función para actualizar un producto por ID
async function updateProduct(id, productData) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const updatedProduct = await response.json();
    console.log("Product updated:", updatedProduct);
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
  }
}
// Función para eliminar un producto por ID
async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log("Product deleted:", result);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
  }
}
