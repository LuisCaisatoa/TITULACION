package com.a.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.a.backend.usersapp.backendusersapp.models.entities.Medida;
import com.a.backend.usersapp.backendusersapp.models.request.MedidaRequest;

public interface MedidaService {
	
	List<Medida> findAll();

    Optional<Medida> findById(Long id);

    Medida save(Medida medida);
    Optional<Medida> update(MedidaRequest medida, Long id);

    void remove(Long id);

}
