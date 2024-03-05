package com.a.backend.usersapp.backendusersapp.models.request;

public class CategoriaRequest {
	
	private Long idCategoria;
	
	private String nombre;

	public Long getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Long idCategoria) {
		this.idCategoria = idCategoria;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
}
