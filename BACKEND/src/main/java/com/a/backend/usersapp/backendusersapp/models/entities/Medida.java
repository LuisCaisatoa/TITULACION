package com.a.backend.usersapp.backendusersapp.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "medidas")
public class Medida implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMedida;

    @Column(unique = true)
    private String nombre;

	public Long getIdMedida() {
		return idMedida;
	}

	public void setIdMedida(Long idMedida) {
		this.idMedida = idMedida;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
}
