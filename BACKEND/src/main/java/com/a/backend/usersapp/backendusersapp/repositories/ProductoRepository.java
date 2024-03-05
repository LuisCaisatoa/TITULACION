package com.a.backend.usersapp.backendusersapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.a.backend.usersapp.backendusersapp.models.entities.Producto;

public interface ProductoRepository extends CrudRepository<Producto, Long> {

}
