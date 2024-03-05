package com.a.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.a.backend.usersapp.backendusersapp.models.entities.Asignado;
import com.a.backend.usersapp.backendusersapp.models.entities.Prestamo;
import com.a.backend.usersapp.backendusersapp.models.entities.Producto;
import com.a.backend.usersapp.backendusersapp.models.request.PrestamoRequest;

public interface PrestamoService {
	
	List<Prestamo> findAll();
    Optional<Prestamo> findById(Long id);
    Optional<Producto> findByIdProducto(Long id);
    Optional<Prestamo> findByAsignadoAndProducto(Asignado asignado, Producto producto);
    Prestamo save(Prestamo prestamo);
    Optional<Prestamo> update(PrestamoRequest prestamo, Long id);
    Prestamo consultarAsignadoProducto(Long idAsignado, Long idProducto);
    void remove(Long id);

}
