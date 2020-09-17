import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import LineaProducto from './LineaProducto';

const ListaProductos = (props) => {
    return (
       <section className="container my-5">
           <h1 className="text-center my-4">Lista de Productos</h1>
    <ListGroup>
        {
            props.productosAPI.map((product)=><LineaProducto key={product._id} product={product} setRecargarProductos = {props.setRecargarProductos}></LineaProducto> )
        }
    </ListGroup>
       </section>
    );
};

export default ListaProductos;