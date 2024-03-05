package com.a.backend.usersapp.backendusersapp.models.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "prestamos")
public class Prestamo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idPrestamo;
	
	@ManyToOne
	@JoinColumn(name = "idProducto")
	private Producto producto;
	
	@ManyToOne
	@JoinColumn(name = "idAsignado")
	private Asignado asignado;
	
	@Column(name = "fechaDesde", nullable = false)
	private LocalDateTime fechaDesde;
	
	@Column(name = "fechaHasta", nullable = false)
	private LocalDateTime fechaHasta;

	@Column(name = "cantidad")
	private Integer cantidad;
	
	@Column(name = "estado")
	private String estado;
	
	@Column(name = "observacion")
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
