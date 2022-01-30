
// Registramos todas las cards(productos) de las paginas
const items = document.getElementById('items');
console.log(items)

// Esperamos que este el DOM completamente cargado
document.addEventListener('DOMContentLoaded', (event) => {
    fetchData();
    console.log("DOM Loaded");
});


// Detectamos el evento de click de los botones de Añadir al Carrito
items.addEventListener('click', e => {
    addCarrito(e)
});


// Captamos la informacion de db.json
const fetchData = async () => {
    try {
        const res = await fetch('/js/db.json');
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};


const addCarrito = e => {
    console.log(e.target)
}