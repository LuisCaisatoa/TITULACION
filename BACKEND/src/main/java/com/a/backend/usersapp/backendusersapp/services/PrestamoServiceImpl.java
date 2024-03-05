package com.a.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a.backend.usersapp.backendusersapp.models.entities.Asignado;
import com.a.backend.usersapp.backendusersapp.models.entities.Prestamo;
import com.a.backend.usersapp.backendusersapp.models.entities.Producto;
import com.a.backend.usersapp.backendusersapp.models.request.PrestamoRequest;
import com.a.backend.usersapp.backendusersapp.repositories.PrestamoRepository;
import com.a.backend.usersapp.backendusersapp.repositories.ProductoRepository;

@Service
public class PrestamoServiceImpl implements PrestamoService{

	
	@Autowired
	private PrestamoRepository repository;
	@Autowired
	private ProductoRepository _productoRepository;
	
	@Override
	public List<Prestamo> findAll() {
		return (List<Prestamo>) repository.findAll();
	}

	@Override
	public Optional<Prestamo> findById(Long id) {
		return repository.findById(id);
	}
	
	@Override
	public Optional<Producto> findByIdProducto(Long id) {
		return _productoRepository.findById(id);
	}

	@Override
	public Prestamo save(Prestamo prestamo) {
	    if (prestamo.getIdPrestamo() == null) {
	        // Verificar si ya existe un préstamo con el mismo asignado y producto
	        Optional<Prestamo> existingPrestamo = repository.findByAsignadoAndProducto(prestamo.getAsignado(), prestamo.getProducto());

	        if (existingPrestamo.isPresent()) {
	            // Ya existe un préstamo con el mismo asignado y producto, puedes manejar esto según tus necesidades
	            // Por ejemplo, lanzar una excepción, imprimir un mensaje, o realizar alguna otra acción
	            throw new RuntimeException("Ya existe un préstamo con el mismo asignado y producto. Si desea puede editar el mismo producto asigando");
	        }

	        // Resto de la lógica para actualizar el producto
	        Producto producto = prestamo.getProducto();
	        Optional<Producto> optionalProducto = this.findByIdProducto(producto.getIdProducto());
	        optionalProducto.ifPresent(dbProducto -> {
	            int stockActualizado = dbProducto.getStock() - prestamo.getCantidad();
	            dbProducto.setStock(stockActualizado);
	            _productoRepository.save(dbProducto);
	        });
	    }

	    // Guardar el préstamo en la tabla de préstamos
	    return repository.save(prestamo);
	}



	
	@Override
	public Optional<Prestamo> update(PrestamoRequest prestamo, Long id) {
	    Optional<Prestamo> optionalPrestamo = this.findById(id);

	    if (optionalPrestamo.isPresent()) {
	        Prestamo prestamoDb = optionalPrestamo.get();
	        System.out.println("Estado" + " " + prestamoDb.getEstado());

	        // Obtén la cantidad anterior antes de actualizar
	        int cantidadAnterior = prestamoDb.getCantidad();
	        int cantidadNueva = prestamo.getCantidad();
	        System.out.println("cantidad anterior" + " " + cantidadAnterior);
	        System.out.println("cantidad nueva" + " " + cantidadNueva);
	        int diferenciaCantidad = 0;
	        int stockActualizado = 0;
	        Producto producto = prestamoDb.getProducto();
	        
	        if ("EN PRESTAMO".equals(prestamo.getEstado())) {
	        	// Actualiza el stock del producto independientemente de si la cantidad cambia o no
		        if (cantidadAnterior > cantidadNueva) {
		            // Cantidad anterior mayor
		            diferenciaCantidad = cantidadAnterior - cantidadNueva;
		            System.out.println("cantidad anterior mayor" + " " + diferenciaCantidad);
		            if(diferenciaCantidad == 0) 
		            {
		            	stockActualizado = diferenciaCantidad;
		            }else {
		            	System.out.println("stock" + " " + producto.getStock());
		            	stockActualizado = producto.getStock() + diferenciaCantidad;
		            	if(stockActualizado < 0) {
		            		stockActualizado = diferenciaCantidad + producto.getStock();
		            	}
		            }
		            
		        } else {
		            // Cantidad nueva mayor o igual
		            diferenciaCantidad = cantidadNueva - cantidadAnterior;
		            System.out.println("cantidad nueva mayor" + " " + diferenciaCantidad);
		            
		            if(diferenciaCantidad == 0) 
		            {
		            	stockActualizado = diferenciaCantidad;
		            }else {
		            	System.out.println("stock" + " " + producto.getStock());
		            	stockActualizado = producto.getStock() - diferenciaCantidad;
		            	if(stockActualizado < 0) {
		            		stockActualizado = diferenciaCantidad - producto.getStock();
		            	}
		            }
		            
		        }
	        }
	        

	        if ("DEVUELTO".equals(prestamo.getEstado())) {
	        	// Actualiza el stock del producto independientemente de si la cantidad cambia o no
		        if (cantidadAnterior > cantidadNueva) {
		        	
		        			        	
		        	System.out.println("EN DEVOLUCION");
		        	System.out.println("stock" + " "+ producto.getStock());
		        	System.out.println("cantidad anterior" + " "+ cantidadAnterior);
		        	System.out.println("cantidad nueva" + " "+ cantidadNueva);
		        	if(diferenciaCantidad == 0) 
		            {
		            	stockActualizado = diferenciaCantidad;
		            } 
		        	
		        	if(stockActualizado >= 0) {
		        		stockActualizado = producto.getStock() + cantidadNueva;
			            System.out.println("Stock actualizado en devuelto" + " "+ stockActualizado);
		        	}
		            
		            if(stockActualizado < 0) {
		            	stockActualizado = cantidadNueva + producto.getStock();
		            }
     
		        } else {
		        	
		        	System.out.println("EN DEVOLUCION ELSE");
		        	System.out.println("stock" + " "+ producto.getStock());
		        	System.out.println("cantidad anterior" + " "+ cantidadAnterior);
		        	System.out.println("cantidad nueva" + " "+ cantidadNueva);
		        	if(diferenciaCantidad == 0) 
		            {
		            	stockActualizado = diferenciaCantidad;
		            } 
		        	if(stockActualizado >= 0) {
		        		stockActualizado = producto.getStock() + cantidadNueva;
			            System.out.println("Stock actualizado en devuelto" + " "+ stockActualizado);
		        	}
		            
		            if(stockActualizado < 0) {
		            	stockActualizado = cantidadNueva + producto.getStock();
		            	System.out.println("Stock actualizado en devuelto" + " "+ stockActualizado);
		            }
		        }
	        }

	        System.out.println("stockActualizado" + " " + stockActualizado);

	        // Verifica si el stock actualizado es mayor o igual a cero antes de realizar la actualización
	        if (stockActualizado >= 0) {
	            producto.setStock(stockActualizado);

	            // Actualiza el resto de los campos
	            prestamoDb.setAsignado(prestamo.getAsignado());
	            prestamoDb.setProducto(prestamo.getProducto());
	            prestamoDb.setFechaDesde(prestamo.getFechaDesde());
	            prestamoDb.setFechaHasta(prestamo.getFechaHasta());
	            prestamoDb.setCantidad(cantidadNueva);
	            prestamoDb.setEstado(prestamo.getEstado());
	            prestamoDb.setObservacion(prestamo.getObservacion());

	            // Guarda el producto actualizado
	            _productoRepository.save(producto);

	            // Guarda el préstamo actualizado
	            return Optional.ofNullable(this.save(prestamoDb));
	        } else {
	            // Puedes manejar el caso donde el stock no puede ser negativo según tus necesidades
	            // Por ejemplo, lanzar una excepción o devolver un Optional vacío
	            return Optional.empty();
	        }
	    } else {
	        // Manejar el caso donde no se encuentra el préstamo con el ID proporcionado
	        return Optional.empty();
	    }
	}



	@Override
	public void remove(Long id) {
		repository.deleteById(id);
	}

	@Override
	public Optional<Prestamo> findByAsignadoAndProducto(Asignado asignado, Producto producto) {
		return repository.findByAsignadoAndProducto(asignado, producto);
	}

	@Override
	public Prestamo consultarAsignadoProducto(Long idAsignado, Long idProducto) {
		return repository.consultarAsignadoProducto(idAsignado, idProducto);
	}

	

	

}
