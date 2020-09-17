import React, {useState,useRef} from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from "sweetalert2";
import { withRouter} from 'react-router-dom'


const EditarProducto = (props) => {
    //genero los ref
    const nombreProductoRef = useRef("");
    const precioProducto = useRef("");
    
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState(false);

    const leerCategoria = (e) => {
        setCategoria(e.target.value);
      };
      
      const handleSubmit = async (e) => {
          e.preventDefault();
          //revisar si cambio la categoria
          let _categoria = categoria === "" ? props.productoEncontrado.categoria : categoria;
          
          console.log(_categoria);
          console.log(nombreProductoRef.current.value)
          console.log(precioProducto.current.value)
          //validar los datos
          if(nombreProductoRef.current.value.trim()=== "" || precioProducto.current.value.trim() === "" || _categoria ==="" ){
          setError(true);
          return ;
        }
         setError(false);
          //obtener los nuevos datos del formulario y enviar modificacion
          const datosEditados = {
            nombreProducto : nombreProductoRef.current.value,
            precioProducto : precioProducto.current.value,
            categoria : _categoria

          }
      
          try {
            //enviar el request
            const consulta = await fetch(`http://localhost:4000/api/cafeteria/${props.productoEncontrado._id}`,
            
            {
              method : "PUT",

              headers : {
                "Content-Type": "application/json"
              },

              body : JSON.stringify(datosEditados)
            }
            
            );
            console.log(consulta);
            if(consulta.status ===200){
              Swal.fire(
                'Producto modificado',
                'El producto se modifico correctamente',
                'success'
              )
            }
            props.setRecargarProductos(true);
            props.history.push("/productos");
          } catch (err) {
            console.log(err);
          }
       
       
        }


    return (
        <Container className="d-flex justify-content-center">
        <Form className="w-75" onSubmit ={handleSubmit}>
          <h1 className="text-center my-3">Editar Producto</h1>
          {error ? (
          <Alert variant={"danger"}>
            Todos los campos deben ser completados
          </Alert>
        ) : null}
          <Form.Group controlId="nombreProducto">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              name="producto"
              placeholder ="ej : Cafe con leche"
              ref={nombreProductoRef}
              defaultValue = {props.productoEncontrado.nombreProducto}
            />
          </Form.Group>
  ​
          <Form.Group controlId="precioProducto">
            <Form.Label>Precio*</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              placeholder = "50"
              ref = {precioProducto}
              defaultValue = {props.productoEncontrado.precioProducto}

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
              defaultChecked ={props.productoEncontrado.categoria === "bebida-caliente"}
            />
            <Form.Check
              inline
              type="radio"
              label="Salada"
              value="salado"
              name="categoria"
              onChange={leerCategoria}
              defaultChecked ={props.productoEncontrado.categoria === "salado"}
            />
            <Form.Check
              inline
              type="radio"
              label="Dulce"
              value="dulce"
              name="categoria"
              onChange={leerCategoria}
              defaultChecked ={props.productoEncontrado.categoria === "dulce"}
            />
            <Form.Check
              inline
              type="radio"
              label="Bebida-fria"
              value="bebida-fria"
              name="categoria"
              onChange={leerCategoria}
              defaultChecked ={props.productoEncontrado.categoria === "bebida-fria"}
            />
          </div>
  ​
          <Button className="w-100 text-center" variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Container>
    );
};

export default withRouter(EditarProducto);