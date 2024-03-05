package com.a.backend.usersapp.backendusersapp.models.request;

public class MedidaRequest {
	
	private Long idMedida;
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
