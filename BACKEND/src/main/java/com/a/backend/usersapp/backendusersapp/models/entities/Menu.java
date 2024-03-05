package com.a.backend.usersapp.backendusersapp.models.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "menu")
public class Menu {
	
	@Id
	private Integer idMenu;

	@Column(name = "icono", length = 20)
	private String icono;

	@Column(name = "nombre", length = 20)
	private String nombre;

	@Column(name = "url", length = 50)
	private String url;

	
	 @ManyToMany
	 @JoinTable(name = "menu_roles", joinColumns = @JoinColumn(name="id_menu"), inverseJoinColumns = @JoinColumn(name="role_id"))
	 private List<Role> roles;

	public Integer getIdMenu() {
		return idMenu;
	}

	public void setIdMenu(Integer idMenu) {
		this.idMenu = idMenu;
	}

	public String getIcono() {
		return icono;
	}

	public void setIcono(String icono) {
		this.icono = icono;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

}
