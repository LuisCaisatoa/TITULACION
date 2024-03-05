package com.a.backend.usersapp.backendusersapp.models.entities;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
/*
public class ProductoBodegaPK {

	@ManyToOne
	@JoinColumn(name = "idProducto", nullable = false)
	private Producto producto;

	@ManyToOne
	@JoinColumn(name = "idBodega", nullable = false)
	private Bodega bodega;

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

	@Override
	public int hashCode() {
		return Objects.hash(bodega, producto);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProductoBodegaPK other = (ProductoBodegaPK) obj;
		return Objects.equals(bodega, other.bodega) && Objects.equals(producto, other.producto);
	}
}*/
