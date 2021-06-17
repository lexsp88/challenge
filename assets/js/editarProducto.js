const actualizarTarea= ( id, actualizadaTarea ) => db.collection('productos').doc(id).update(actualizadaTarea);

window.addEventListener('DOMContentLoaded', async (e) => {
    if(localStorage.getItem('nombreProducto')) {
        let statusEditar = true;
        const nombre        = localStorage.getItem('nombreProducto');
        const clave         = localStorage.getItem('claveProducto');
        const precio        = localStorage.getItem('precioProducto');
        const departamento  = localStorage.getItem('departamentoProducto');
        const descripcion   = localStorage.getItem('descripcionProducto');
        const imagen        = localStorage.getItem('imagenProducto');
        const id            = localStorage.getItem('idProducto');
        ksForm['nombreProducto'].value      = nombre;
        ksForm['claveProducto'].value       = clave;
        ksForm['precioProducto'].value      = precio;
        ksForm['departamentoProducto'].value= departamento;
        ksForm['descripcionProducto'].value = descripcion;

        if(statusEditar){
            ksForm['btn-ks-form'].innerText     = 'Actualizar';
        }

        ksForm.addEventListener('submit', async(e) => {
            e.preventDefault();
            const nombre = ksForm['nombreProducto'].value;
            const clave = ksForm['claveProducto'].value;
            const precio = ksForm['precioProducto'].value;
            const departamento = ksForm['departamentoProducto'].value;
            const descripcion = ksForm['descripcionProducto'].value;
            
              await actualizarTarea( id, { nombre, clave, precio, departamento, descripcion, imagen });
            
            ksForm.reset();
            localStorage.clear();
            location.href ="productos.html";
          });


      } else {
        
      }
});