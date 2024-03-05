package com.a.backend.usersapp.backendusersapp.models.request;

public class AsignadoRequest {
	private Long idAsignado;
	private String cedula;
	private String nombres;
	private String apellidos;
	private String telefono;
	private String cargo;
	public Long getIdAsignado() {
		return idAsignado;
	}
	public void setIdAsignado(Long idAsignado) {
		this.idAsignado = idAsignado;
	}
	public String getCedula() {
		return cedula;
	}
	public void setCedula(String cedula) {
		this.cedula = cedula;
	}
	public String getNombres() {
		return nombres;
	}
	public void setNombres(String nombres) {
		this.nombres = nombres;
	}
	public String getApellidos() {
		return apellidos;
	}
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public String getCargo() {
		return cargo;
	}
	public void setCargo(String cargo) {
		this.cargo = cargo;
	}
}
