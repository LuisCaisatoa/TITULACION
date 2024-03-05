package com.a.backend.usersapp.backendusersapp.models.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/*@Entity*/
/*@Table(name = "producto_bodega")*/
/*@IdClass(ProductoBodegaPK.class)*/
/*public class ProductoBodega {

	@Id
	private Producto producto;

	@Id
	private Bodega bodega;

	@Column(length = 100)
	private String tipoInventario;

	@Column(name = "stock")
	private Integer stock;

	@Column(name = "stockMinimo")
	private Integer stockMinimo;

	@Column(name = "personaAsignada")
	private String personaAsignada;

	@Column(name = "usuario")
	private String usuario;

	@Column(name = "fechaDesde", nullable = false)
	private LocalDateTime fechaDesde;

	@Column(name = "fechaHasta", nullable = false)
	private LocalDateTime fechaHasta;

	@Column(name = "estado")
	private String estado;

	@Column(name = "observacion")
	private String observacion;

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public Bodega getBodega() {
		return bodega;
	}

	public void setBodega(Bodega bodega) {
		this.bodega = bodega;
	}

	public String getTipoInventario() {
		return tipoInventario;
	}

	public void setTipoInventario(String tipoInventario) {
		this.tipoInventario = tipoInventario;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}

	public Integer getStockMinimo() {
		return stockMinimo;
	}

	public void setStockMinimo(Integer stockMinimo) {
		this.stockMinimo = stockMinimo;
	}

	public String getPersonaAsignada() {
		return personaAsignada;
	}

	public void setPersonaAsignada(String personaAsignada) {
		this.personaAsignada = personaAsignada;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
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

}*/
