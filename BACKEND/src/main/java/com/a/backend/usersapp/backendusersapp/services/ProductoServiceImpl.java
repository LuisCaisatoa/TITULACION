package com.a.backend.usersapp.backendusersapp.services;

import com.a.backend.usersapp.backendusersapp.models.entities.Producto;
import com.a.backend.usersapp.backendusersapp.models.request.ProductoRequest;
import com.a.backend.usersapp.backendusersapp.repositories.ProductoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServiceImpl implements ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    @Transactional(readOnly = true)
    @Override
    public List<Producto> findAll() {
        return (List<Producto>) productoRepository.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Producto> findById(Long id) {
        return productoRepository.findById(id);
    }

    @Transactional
    @Override
    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    @Transactional
    @Override
    public Producto update(ProductoRequest producto, Long id) {
        Producto dbProducto = productoRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Producto no encontrado con id " + id.toString())
        );
        dbProducto.setCodigo(producto.getCodigo());
        dbProducto.setNombre(producto.getNombre());
        dbProducto.setCategoria(producto.getCategoria());
        dbProducto.setMedida(producto.getMedida());
        dbProducto.setStock(producto.getStock());
        dbProducto.setDisponible(producto.getDisponible());
        return productoRepository.save(dbProducto);
    }

    @Transactional
    @Override
    public void remove(Long id) {
        Producto dbProducto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id" + String.valueOf(id)));
        productoRepository.delete(dbProducto);

    }
}
