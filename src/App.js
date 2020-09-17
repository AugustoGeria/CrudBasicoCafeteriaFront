import React, { useState, useEffect } from "react";
import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./components/principal/Inicio";
import ListaProductos from "./components/productos/ListaProductos";
import AgregarProducto from "./components/productos/AgregarProducto";
import EditarProducto from "./components/productos/EditarProducto";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import PaginaError404 from "./components/Error404/PaginaError404";

function App() {
  const [productosAPI, setProductosAPI] = useState([]);
  const [recargarProductos, setRecargarProductos] = useState(true);

  useEffect(() => {
    if (recargarProductos) {
      consultarAPI();
      setRecargarProductos(false);
    }
  }, [recargarProductos]);
  const consultarAPI = async () => {
    //operacion GET obtengo los datos
    try {
      const respuesta = await fetch("http://localhost:4000/api/cafeteria");
      const resultado = await respuesta.json();
      console.log(resultado);
      setProductosAPI(resultado);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <Route exact path="/productos">
          <ListaProductos
            productosAPI={productosAPI}
            setRecargarProductos={setRecargarProductos}
          ></ListaProductos>
        </Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto
            setRecargarProductos={setRecargarProductos}
          ></AgregarProducto>
        </Route>
        <Route
          exact
          path="/productos/editar/:id"
          render={(props) => {
            //quiero tomar el id de url
            const idProducto = props.match.params.id;
            console.log("parametro de la url: " + idProducto);
            //filtrar arreglo y buscar producto
            const productoEncontrado = productosAPI.find(
              (producto) => producto._id === idProducto
            );
            console.log(productoEncontrado);
            return (
              <EditarProducto
                productoEncontrado={productoEncontrado} setRecargarProductos={setRecargarProductos}
              ></EditarProducto>
            );
          }}
        ></Route>
        <Route exact path ="*">
          <PaginaError404></PaginaError404>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
