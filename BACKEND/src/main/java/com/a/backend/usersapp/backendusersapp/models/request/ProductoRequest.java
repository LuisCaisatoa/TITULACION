package com.a.backend.usersapp.backendusersapp.models.request;

import com.a.backend.usersapp.backendusersapp.models.entities.Categoria;
import com.a.backend.usersapp.backendusersapp.models.entities.Medida;

public class ProductoRequest {
	
	private Long idProducto;
	private String codigo;
	private String nombre;
	private Categoria categoria;
	private Medida medida;
	private Integer stock;
	private Boolean disponible;
	public Long getIdProducto() {
		return idProducto;
	}
	public void setIdProducto(Long idProducto) {
		this.idProducto = idProducto;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public Categoria getCategoria() {
		return categoria;
	}
	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}
	public Medida getMedida() {
		return medida;
	}
	public void setMedida(Medida medida) {
		this.medida = medida;
	}
	public Integer getStock() {
		return stock;
	}
	public void setStock(Integer stock) {
		this.stock = stock;
	}
	public Boolean getDisponible() {
		return disponible;
	}
	public void setDisponible(Boolean disponible) {
		this.disponible = disponible;
	}
}
