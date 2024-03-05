package com.a.backend.usersapp.backendusersapp.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipo_inventario")
public class TipoInventario implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idTipoInventario;
	
	@Column(length = 150, unique = true)
	private String nombre;

	public Long getIdTipoInventario() {
		return idTipoInventario;
	}

	public void setIdTipoInventario(Long idTipoInventario) {
		this.idTipoInventario = idTipoInventario;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	

}
