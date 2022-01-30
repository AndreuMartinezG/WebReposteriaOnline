
const items = document.getElementById('items');
let carrio = {};

// Esperamos que este el DOM completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    console.log("DOM Loaded");
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

// Detectamos el evento de click de los botones de Añadir al Carrito
items.addEventListener('click', e => {
    addCarrito(e);
});

const addCarrito = e => {
    //console.log(e.target);
    //console.log(e.target.classList.contains('btn-success'));
    if (e.target.classList.contains('btn-success')){
        
        //console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    //console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-success').dataset.id,
        title: objeto.querySelector('h4').textContent,
        precio: objeto.querySelector('p').textContent
    }
    console.log(producto)
}

