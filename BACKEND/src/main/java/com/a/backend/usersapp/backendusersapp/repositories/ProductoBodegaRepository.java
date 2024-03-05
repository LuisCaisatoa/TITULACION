package com.a.backend.usersapp.backendusersapp.repositories;

/*import com.a.backend.usersapp.backendusersapp.models.entities.ProductoBodega;
import com.a.backend.usersapp.backendusersapp.models.entities.ProductoBodegaPK;*/
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
/*
public interface ProductoBodegaRepository extends CrudRepository<ProductoBodega, ProductoBodegaPK> {
    @Query("Select i from ProductoBodega i where i.bodega.id=:idBodega")
    List<ProductoBodega> finByIdBodega(Long idBodega);
    
    @Query("SELECT pb FROM ProductoBodega pb " +
    	       "JOIN FETCH pb.producto p " +
    	       "JOIN FETCH pb.bodega b " +
    	       "WHERE b.idBodega = :idBodega " +
    	       "AND p.idProducto = :idProducto")
     ProductoBodega consultarBodegaProducto(Long idBodega, Long idProducto);
}*/
