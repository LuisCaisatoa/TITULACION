package com.a.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a.backend.usersapp.backendusersapp.models.entities.Asignado;
import com.a.backend.usersapp.backendusersapp.models.request.AsignadoRequest;
import com.a.backend.usersapp.backendusersapp.repositories.AsignadoRepository;

@Service
public class AsignadoServiceImpl implements AsignadoService{

	
	@Autowired
	private AsignadoRepository repository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Asignado> findAll() {
		return (List<Asignado>) repository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Asignado> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public Asignado save(Asignado asignado) {
		return repository.save(asignado);
	}

	@Override
	public Optional<Asignado> update(AsignadoRequest asignado, Long id) {
		Optional<Asignado> o = this.findById(id);
		Asignado asignadoOptional = null;
        if (o.isPresent()) {
        	Asignado asignadosDb = o.orElseThrow();
        	asignadosDb.setCedula(asignado.getCedula());
        	asignadosDb.setNombres(asignado.getNombres());
        	asignadosDb.setApellidos(asignado.getApellidos());
        	asignadosDb.setTelefono(asignado.getTelefono());
        	asignadosDb.setCargo(asignado.getCargo());
        	asignadoOptional = this.save(asignadosDb);
        }
        return Optional.ofNullable(asignadoOptional);
	}

	@Override
	public void remove(Long id) {
		repository.deleteById(id);
	}

}
