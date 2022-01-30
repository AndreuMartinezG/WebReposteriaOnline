
const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment()
let carrito = {};

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
cards.addEventListener('click', e => {
    addCarrito(e);
});

const addCarrito = e => {
    //console.log(e.target);
    //console.log(e.target.classList.contains('btn-success'));
    if (e.target.classList.contains('btn-success')) {

        //console.log(e.target.parentElement)
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
};

const setCarrito = objeto => {
    //console.log(objeto)

    //Añadir Producto al carrito
    const producto = {
        id: objeto.querySelector('.btn-success').dataset.id,
        title: objeto.querySelector('h4').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    // Añadir cantidad de producctos seleccionados si ya existe
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto };
    pintarCarrito()

}

const pintarCarrito = () => {
    //console.log(carrito)

    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio;
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)


    pintarFooter()
}

//Pintar Carrito

const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }
    
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)
    //console.log(nPrecio);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}
