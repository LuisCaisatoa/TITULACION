package com.a.backend.usersapp.backendusersapp.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "categorias")
public class Categoria implements Serializable{
 
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long idCategoria;

	    @Column(unique = true)
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
