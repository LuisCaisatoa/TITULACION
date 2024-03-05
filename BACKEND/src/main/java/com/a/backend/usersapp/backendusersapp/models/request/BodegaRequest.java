package com.a.backend.usersapp.backendusersapp.models.request;

public class BodegaRequest {
	
	private Long idBodega;
	private String nombre;
	private String ubicacion;
	
	public Long getIdBodega() {
		return idBodega;
	}
	public void setIdBodega(Long idBodega) {
		this.idBodega = idBodega;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getUbicacion() {
		return ubicacion;
	}
	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}
}
