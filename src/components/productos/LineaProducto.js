import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
const LineaProducto = (props) => {
   
  const eliminarProducto = (id) => {
    console.log(id);
    Swal.fire({
      title: 'Estas seguro de eliminar el producto?',
      text: "No puedes recuperar un producto eliminado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then(async(result) => {
      if (result.value) {
       //aqui elimino el producto
        try{
          const resultado = await fetch(`http://localhost:4000/api/cafeteria/${id}`,{
            method : "DELETE",
            headers:{
              "Content-Type" : "application/json"
            }
          }
          );
          console.log(resultado);
          if(resultado.status===200){
            Swal.fire(
              'Producto Eliminado',
              'Su producto se elimino correctamente.',
              'success'
            )

          }

        }catch(error){
          console.log(error);
        }
       
       
        //recargar lista de productos
        props.setRecargarProductos(true);

      }
    })
  }
  
  return (
       
  <ListGroup.Item>
      <p>{props.product.nombreProducto}</p> <span>$ {props.product.precioProducto} </span>
       <Link className="btn btn-success" to={`/productos/editar/${props.product._id}`}>
       Editar
       <FontAwesomeIcon icon={faEdit} />
       </Link>
       <Button variant="danger" onClick={() => eliminarProducto(props.product._id)}>
         Eliminar
         <FontAwesomeIcon icon={faTrash} />
         </Button>
  </ListGroup.Item>
  
    );
};

export default LineaProducto;