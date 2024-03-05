package com.a.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.a.backend.usersapp.backendusersapp.models.entities.Bodega;
import com.a.backend.usersapp.backendusersapp.models.request.BodegaRequest;

public interface BodegaService {
	
	List<Bodega> findAll();

    Optional<Bodega> findById(Long id);

    Bodega save(Bodega bodega);
    Optional<Bodega> update(BodegaRequest bodega, Long id);

    void remove(Long id);

}
