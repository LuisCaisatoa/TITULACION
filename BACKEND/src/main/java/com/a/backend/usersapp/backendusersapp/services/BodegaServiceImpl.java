package com.a.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a.backend.usersapp.backendusersapp.models.entities.Bodega;
import com.a.backend.usersapp.backendusersapp.models.request.BodegaRequest;
import com.a.backend.usersapp.backendusersapp.repositories.BodegaRepository;

@Service
public class BodegaServiceImpl implements BodegaService{

	
	@Autowired
	private BodegaRepository repository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Bodega> findAll() {
		return (List<Bodega>) repository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Bodega> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	public Bodega save(Bodega bodega) {
		return repository.save(bodega);
	}

	@Override
	public Optional<Bodega> update(BodegaRequest bodega, Long id) {
		Optional<Bodega> o = this.findById(id);
		Bodega bodegaOptional = null;
        if (o.isPresent()) {
        	Bodega bodegaDb = o.orElseThrow();
        	bodegaDb.setNombre(bodega.getNombre());
        	bodegaDb.setUbicacion(bodega.getUbicacion());
        	bodegaOptional = this.save(bodegaDb);
        }
        return Optional.ofNullable(bodegaOptional);
	}

	@Override
	public void remove(Long id) {
		repository.deleteById(id);
	}

}
