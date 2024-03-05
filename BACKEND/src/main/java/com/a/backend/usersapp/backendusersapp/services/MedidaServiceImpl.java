package com.a.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a.backend.usersapp.backendusersapp.models.entities.Medida;
import com.a.backend.usersapp.backendusersapp.models.request.MedidaRequest;
import com.a.backend.usersapp.backendusersapp.repositories.MedidaRepository;
@Service
public class MedidaServiceImpl implements MedidaService{
	
	@Autowired
	private MedidaRepository repository;

	@Override
	@Transactional(readOnly = true)
	public List<Medida> findAll() {
		return (List<Medida>) repository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Medida> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	@Transactional
	public Medida save(Medida medida) {
		return repository.save(medida);
	}

	@Override
	@Transactional
	public Optional<Medida> update(MedidaRequest medida, Long id) {
		Optional<Medida> o = this.findById(id);
		Medida medidaOptional = null;
        if (o.isPresent()) {
            Medida medidaDb = o.orElseThrow();
            medidaDb.setNombre(medida.getNombre());
            medidaOptional = this.save(medidaDb);
        }
        return Optional.ofNullable(medidaOptional);
	}

	@Override
	@Transactional
	public void remove(Long id) {
		repository.deleteById(id);
	}

}
