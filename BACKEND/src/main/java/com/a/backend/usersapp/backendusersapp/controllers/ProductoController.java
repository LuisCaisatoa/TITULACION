package com.a.backend.usersapp.backendusersapp.controllers;

import com.a.backend.usersapp.backendusersapp.models.entities.Bodega;
import com.a.backend.usersapp.backendusersapp.models.entities.Producto;
import com.a.backend.usersapp.backendusersapp.models.request.ProductoRequest;
import com.a.backend.usersapp.backendusersapp.services.ProductoService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/productos")
@CrossOrigin(originPatterns = "*")
public class ProductoController {

    @Autowired
    private ProductoService productoService;


    @GetMapping
    public ResponseEntity<List<Producto>> list() {
        return ResponseEntity.ok(productoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> findById(@PathVariable Long id) {
        Optional<Producto> dbProducto = productoService.findById(id);
        return dbProducto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Producto producto, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }

        return new ResponseEntity<>(productoService.save(producto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody ProductoRequest producto, @PathVariable Long id, BindingResult result) {
        if (result.hasErrors()) {
            return validation(result);
        }
        return new ResponseEntity<>(productoService.update(producto, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id){
        productoService.remove(id);
        return ResponseEntity.noContent().build();
    }

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }

}
