import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter} from 'react-router-dom' //sireve para redireccionar pagina

const AgregarProducto = (props) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);
  
  
  const leerCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validar los campos

    if (
      nombreProducto.trim() === "" ||
      precioProducto.trim() === "" ||
      categoria === ""
    ) {
      //mostrar cartel error
      setError(true);
      return;
    }
    //agregar producto nuevo
    setError(false);

    //peraparar datos para enviar

    //completo

    // const datos ={
    //   nombreProducto : nombreProducto,
    // precioProducto : precioProducto,
    // categoria : categoria
    // }

    //como coinciden los nombres de las propiedades con las variables
    const datos = {
      nombreProducto,
      precioProducto,
      categoria,
    };

    try {
      const cabecera = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      };
      const resultado = await fetch(
        "http://localhost:4000/api/cafeteria",
        cabecera
      );
      console.log(resultado);
      if (resultado.status===201){
        Swal.fire(
            'Producto creado',
            'El producto creado correctamente',
            'success'
          )
      }

      //recargar la api
      props.setRecargarProductos(true);

      //redireccionar al usuario a otra pagina ej prod
      props.history.push("/productos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Form className="w-75 mb-5" onSubmit={handleSubmit}>
        <h1 className="text-center my-5">Agregar Producto Nuevo</h1>
        {error ? (
          <Alert variant={"danger"}>
            Todos los campos deben ser completados
          </Alert>
        ) : null}

        <Form.Group controlId="nombreProducto">
          <Form.Label>Nombre Del Producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Medialunas"
            name="producto"
            onChange={(e) => setNombreProducto(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="precioProducto">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: $10"
            name="precio"
            onChange={(e) => setPrecioProducto(e.target.value)}
          />
        </Form.Group>
        <h3 className="text-center">Categoria</h3>
        <div className="text-center my-4">
          <Form.Check
            inline
            type="radio"
            label="Bebida caliente"
            value="bebida-caliente"
            name="categoria"
            onChange={leerCategoria}
          />
          <Form.Check
            inline
            type="radio"
            label="Bebida fria"
            value="bebida-fria"
            name="categoria"
            onChange={leerCategoria}
          />
          <Form.Check
            inline
            type="radio"
            label="Dulce"
            value="dulce"
            name="categoria"
            onChange={leerCategoria}
          />
          <Form.Check
            inline
            type="radio"
            label="Salado"
            value="salado"
            name="categoria"
            onChange={leerCategoria}
          />
        </div>
        <Button variant="primary" type="submit" className="w-100">
          Agregar
        </Button>
      </Form>
    </Container>
  );
};

export default withRouter(AgregarProducto);
