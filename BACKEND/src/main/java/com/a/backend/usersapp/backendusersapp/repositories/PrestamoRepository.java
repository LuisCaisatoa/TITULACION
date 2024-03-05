package com.a.backend.usersapp.backendusersapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.a.backend.usersapp.backendusersapp.models.entities.Asignado;
import com.a.backend.usersapp.backendusersapp.models.entities.Prestamo;
import com.a.backend.usersapp.backendusersapp.models.entities.Producto;
import com.a.backend.usersapp.backendusersapp.models.entities.User;

public interface PrestamoRepository extends CrudRepository<Prestamo, Long>{
	
	@Query("SELECT p FROM Prestamo p WHERE p.asignado = :asignado AND p.producto = :producto")
    Optional<Prestamo> findByAsignadoAndProducto(@Param("asignado") Asignado asignado, @Param("producto") Producto producto);
	
	@Query("SELECT pre FROM Prestamo pre " +
	           "JOIN pre.asignado a " +
	           "JOIN pre.producto p " +
	           "WHERE a.idAsignado = :idAsignado AND p.idProducto = :idProducto")

	Prestamo consultarAsignadoProducto(@Param("idAsignado") Long idAsignado, @Param("idProducto") Long idProducto);


}
