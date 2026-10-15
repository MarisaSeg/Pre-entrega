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
    if (resource === "products") {
      if (id) {
        // Check if an ID is provided

        console.log(`Fetching product with ID: ${id}`);
        getProductById(id);
      } else {
        console.log("Fetching all products...");
        getAllProducts();
      }
    } else {
      console.log(
        "Invalid route. Please use 'products' to fetch all products or 'products/{id}' to fetch a specific product.",
      );
    }
    break;
  case "POST":
    // Check if the route is 'product' and if product data is provided
    if (resource === "product" || resource === "products") {
      if (args.length > 0) {
        try {
          const productData = JSON.parse(args[0]);
          console.log("Creating product with data:", productData);
          createProduct(productData);
        } catch (error) {
          console.error("Invalid product data. Please provide valid JSON.");
        }
      } else {
        console.log(
          "Please provide product data in JSON format to create a new product.",
        );
      }
    } else {
      console.log(
        "Invalid route. Please use 'product' or 'products' to create a new product.",
      );
    }
    break;
  case "DELETE":
    if ((resource === "products" || resource === "product") && id) {
      if (!id) {
        console.log(
          "Please provide a product ID to delete a product. Usage: DELETE products {id}",
        );
        break;
      } else {
        console.log(`Deleting product with ID: ${id}`);
        deleteProduct(id);
      }
    } else {
      console.log(
        "Invalid route or missing product ID. Please use 'products {id}' to delete a product.",
      );
    }
    break;
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
    const response = await fetch(`${API_URL}/products/add`, {
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
/* Función para actualizar un producto por ID
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
}*/
// Función para eliminar un producto por ID
async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(`Response from delete request:`, result);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
  }
}
