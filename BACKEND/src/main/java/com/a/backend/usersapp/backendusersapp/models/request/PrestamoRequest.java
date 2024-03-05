package com.a.backend.usersapp.backendusersapp.models.request;

import java.time.LocalDateTime;

import com.a.backend.usersapp.backendusersapp.models.entities.Asignado;
import com.a.backend.usersapp.backendusersapp.models.entities.Producto;

import jakarta.persistence.Column;

public class PrestamoRequest {
	
	private Long idPrestamo;
	private Producto producto;
	private Asignado asignado;
	private LocalDateTime fechaDesde;
	private LocalDateTime fechaHasta;
	private Integer cantidad;
	private String estado;
	private String observacion;
	public Long getIdPrestamo() {
		return idPrestamo;
	}
	public void setIdPrestamo(Long idPrestamo) {
		this.idPrestamo = idPrestamo;
	}
	public Producto getProducto() {
		return producto;
	}
	public void setProducto(Producto producto) {
		this.producto = producto;
	}
	public Asignado getAsignado() {
		return asignado;
	}
	public void setAsignado(Asignado asignado) {
		this.asignado = asignado;
	}
	public LocalDateTime getFechaDesde() {
		return fechaDesde;
	}
	public void setFechaDesde(LocalDateTime fechaDesde) {
		this.fechaDesde = fechaDesde;
	}
	public LocalDateTime getFechaHasta() {
		return fechaHasta;
	}
	public void setFechaHasta(LocalDateTime fechaHasta) {
		this.fechaHasta = fechaHasta;
	}
	public Integer getCantidad() {
		return cantidad;
	}
	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getObservacion() {
		return observacion;
	}
	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}
}
