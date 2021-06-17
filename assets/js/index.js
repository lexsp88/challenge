  const db = firebase.firestore();
  const ksForm =  document.querySelector('#kodemiaStoreForm');
  const tProd = document.querySelector('#tablaProducto');
  let statusEditar = false;
  const agregarProducto = (nombre, clave, precio, departamento, descripcion, imagen) => 
  db.collection('productos').doc().set({
    nombre,
    clave,
    precio,
    departamento,
    descripcion,
    imagen,

  });

  const obtenerProducto = () => db.collection('productos').get();
  
  const enObtenerProducto = (callback) => db.collection("productos").onSnapshot(callback);

  const borrarProducto = id => db.collection('productos').doc(id).delete();

  const editarProducto = id => db.collection('productos').doc(id).get()

  window.addEventListener('DOMContentLoaded', async (e) => {
    enObtenerProducto((querySnapshot) => {
      tProd.innerHTML = '';
      
      querySnapshot.forEach(doc => {
        const producto = doc.data();
        producto.id = doc.id;
        //console.log(producto);
  
        tProd.innerHTML += `<tr>
        <th>${producto.nombre}</th>
        <td>${producto.clave}</td>
        <td>${producto.precio}</td>
        <td>${producto.departamento}</td>
        <td class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary w-45 btnEditar" data-id="${producto.id}">Editar</button>
            <button type="submit" class="btn btn-outline-danger w-45 btnBorrar" data-id="${producto.id}">Borrar</button>
        </td>
        </tr>`;
        const btnBorrar = document.querySelectorAll('.btnBorrar');
        btnBorrar.forEach( btn =>{
          btn.addEventListener('click', async (e) => {
            //console.log(e.target.dataset.id);
            await borrarProducto(e.target.dataset.id);
          });
      });

      const btnEditar = document.querySelectorAll('.btnEditar');
      btnEditar.forEach( btn =>{
        btn.addEventListener('click', async (e) => {
          //console.log(e.target.dataset.id);
          const prod = await editarProducto(e.target.dataset.id);
          const product = prod.data();
          console.log(product);
          localStorage.setItem('nombreProducto', product.nombre);
          localStorage.setItem('claveProducto', product.clave);
          localStorage.setItem('precioProducto', product.precio);
          localStorage.setItem('departamentoProducto', product.departamento);
          localStorage.setItem('descripcionProducto', product.descripcion);
          localStorage.setItem('imagenProducto', product.imagen);
          localStorage.setItem('idProducto', e.target.dataset.id);
          
          location.href ="agregarProducto.html";
          //const nombre = localStorage.getItem('nombre');
          //console.log(nombre)
          //ksForm['nombreProducto'].value = nombre;
          //console.log(product);
        });
      });

    });
  });
});

  ksForm.addEventListener('submit', async(e) => {
    e.preventDefault();


    const nombre = ksForm['nombreProducto'].value;
    const clave = ksForm['claveProducto'].value;
    const precio = ksForm['precioProducto'].value;
    const departamento = ksForm['departamentoProducto'].value;
    const descripcion = ksForm['descripcionProducto'].value;

    if(!statusEditar){
      await agregarProducto(nombre, clave, precio, departamento, descripcion);
    }
    ksForm.reset();
    location.href ="productos.html";
  });