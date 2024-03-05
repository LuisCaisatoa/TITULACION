package com.a.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.a.backend.usersapp.backendusersapp.models.entities.Categoria;
import com.a.backend.usersapp.backendusersapp.models.request.CategoriaRequest;
import com.a.backend.usersapp.backendusersapp.repositories.CategoriaRepository;

@Service
public class CategoriaServiceImpl implements CategoriaService{
	
	@Autowired
	private CategoriaRepository repository;

	@Override
	@Transactional(readOnly = true)
	public List<Categoria> findAll() {
		return (List<Categoria>) repository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Categoria> findById(Long id) {
		return repository.findById(id);
	}

	@Override
	@Transactional
	public Categoria save(Categoria categoria) {	
		return repository.save(categoria);
	}

	@Override
	public Optional<Categoria> update(CategoriaRequest categoria, Long id) {
		Optional<Categoria> o = this.findById(id);
		Categoria categoryOptional = null;
        if (o.isPresent()) {
            Categoria categoryDb = o.orElseThrow();
            categoryDb.setNombre(categoria.getNombre());
            categoryOptional = this.save(categoryDb);
        }
        return Optional.ofNullable(categoryOptional);
	}

	@Override
	@Transactional
	public void remove(Long id) {
		repository.deleteById(id);
	}

}
