package com.a.backend.usersapp.backendusersapp.services;


import com.a.backend.usersapp.backendusersapp.models.entities.Producto;
import com.a.backend.usersapp.backendusersapp.models.request.ProductoRequest;

import java.util.List;
import java.util.Optional;

public interface ProductoService {

    List<Producto> findAll();

    Optional<Producto> findById(Long id);

    Producto save(Producto producto);

    Producto update(ProductoRequest producto, Long id);

    void remove(Long id);

}
