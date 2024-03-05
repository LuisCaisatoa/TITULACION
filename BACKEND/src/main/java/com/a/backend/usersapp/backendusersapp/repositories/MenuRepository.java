package com.a.backend.usersapp.backendusersapp.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.a.backend.usersapp.backendusersapp.models.entities.Menu;

public interface MenuRepository extends CrudRepository<Menu, Long>{
	//@Query(value="select m.* from menu_roles mr inner join users_roles ur on ur.role_id = mr.role_id inner join menu m on m.id_menu = mr.id_menu inner join users u on u.id = ur.user_id where u.username = :username", nativeQuery = true)
	@Query(value="SELECT m.* FROM menu_roles mr INNER JOIN users_roles ur ON ur.role_id = mr.role_id INNER JOIN menu m ON m.id_menu = mr.id_menu INNER JOIN users u ON u.id = ur.user_id WHERE u.username = :username AND mr.role_id = :role_id", nativeQuery = true)
	ArrayList<Menu> listarMenuPorUsuario(@Param("username") String username, @Param("role_id") Long role_id);
}
