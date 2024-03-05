package com.a.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.a.backend.usersapp.backendusersapp.models.entities.Asignado;
import com.a.backend.usersapp.backendusersapp.models.request.AsignadoRequest;

public interface AsignadoService {
	
	List<Asignado> findAll();

    Optional<Asignado> findById(Long id);

    Asignado save(Asignado asignado);
    Optional<Asignado> update(AsignadoRequest asignado, Long id);

    void remove(Long id);

}
