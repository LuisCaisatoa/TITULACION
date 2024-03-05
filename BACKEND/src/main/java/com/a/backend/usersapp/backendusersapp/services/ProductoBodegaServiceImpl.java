package com.a.backend.usersapp.backendusersapp.services;

import com.a.backend.usersapp.backendusersapp.dto.InventarioInputDTO;
import com.a.backend.usersapp.backendusersapp.exceptions.ResourceNotFoundException;
import com.a.backend.usersapp.backendusersapp.models.entities.Bodega;
import com.a.backend.usersapp.backendusersapp.models.entities.Producto;

/*import com.a.backend.usersapp.backendusersapp.models.entities.ProductoBodega;
import com.a.backend.usersapp.backendusersapp.models.entities.ProductoBodegaPK;
import com.a.backend.usersapp.backendusersapp.repositories.BodegaRepository;
import com.a.backend.usersapp.backendusersapp.repositories.ProductoBodegaRepository;
import com.a.backend.usersapp.backendusersapp.repositories.ProductoRepository;*/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
/*
@Service
public class ProductoBodegaServiceImpl implements ProductoBodegaService {
	@Autowired
	private ProductoBodegaRepository pbrepository;

	@Autowired
	private BodegaRepository bodegaRepository;

	@Autowired
	private ProductoRepository productoRepository;

	@Transactional(readOnly = true)
	@Override
	public List<ProductoBodega> findByIdBodega(Long idBodega) {
		Bodega bodega = bodegaRepository.findById(idBodega)
				.orElseThrow(() -> new ResourceNotFoundException("Bodega", "id", idBodega.toString()));
		return pbrepository.finByIdBodega(idBodega);
	}

	@Transactional
	@Override
	public ProductoBodega save(InventarioInputDTO inventario, Long idBodega, Long idProducto) {
		Bodega bodega = bodegaRepository.findById(idBodega)
				.orElseThrow(() -> new ResourceNotFoundException("Bodega", "id", idBodega.toString()));
		Producto producto = productoRepository.findById(idProducto)
				.orElseThrow(() -> new ResourceNotFoundException("Producto", "id", idProducto.toString()));
		ProductoBodegaPK pk = new ProductoBodegaPK();
		pk.setBodega(bodega);
		pk.setProducto(producto);
		ProductoBodega pbEdit = new ProductoBodega();
		// verificar si existe producto en bodega
		Optional<ProductoBodega> dbProdBodega = pbrepository.findById(pk);
		// si -> actualizar stock según tipo de entrada
		if (dbProdBodega.isPresent()) {
			pbEdit = dbProdBodega.get();

			if (Objects.equals(inventario.tipoInventario(), "Entrada")) {
				if (pbEdit.getStock() >= inventario.stockMinimo()) {
					pbEdit.setTipoInventario("Entrada");
					int resultado = pbEdit.getStock() + inventario.stock();
					pbEdit.setStock(resultado);
				} else {
					pbEdit.setStock(pbEdit.getStock());
				}
			}

			if (Objects.equals(inventario.tipoInventario(), "Salida")) {
				pbEdit.setTipoInventario("Salida");
				int resultado = pbEdit.getStock() - inventario.stock();
				if (resultado >= inventario.stockMinimo()) {
					pbEdit.setStock(resultado);
				} else {
					pbEdit.setTipoInventario("Entrada");
					pbEdit.setStock(pbEdit.getStock());
				}
			}

		} else {
			// no-> crear nuevo registro
			pbEdit.setBodega(bodega);
			pbEdit.setProducto(producto);
			pbEdit.setPersonaAsignada(inventario.personaAsignada());
			pbEdit.setStock(inventario.stock());
			pbEdit.setEstado(inventario.estado());
			pbEdit.setFechaDesde(inventario.fechaDesde());
			pbEdit.setFechaHasta(inventario.fechaHasta());
			pbEdit.setObservacion(inventario.observacion());

		}
		pbEdit.setTipoInventario(inventario.tipoInventario());
		pbEdit.setStockMinimo(inventario.stockMinimo());
		pbEdit.setPersonaAsignada(inventario.personaAsignada());
		pbEdit.setEstado(inventario.estado());
		pbEdit.setUsuario(inventario.usuario());
		pbEdit.setFechaDesde(inventario.fechaDesde());
		pbEdit.setFechaHasta(inventario.fechaHasta());
		pbEdit.setObservacion(inventario.observacion());
		return pbrepository.save(pbEdit);
	}

	@Override
	public List<ProductoBodega> findAll() {
		return (List<ProductoBodega>) pbrepository.findAll();
	}

	@Override
	public ProductoBodega consultarBodegaProducto(Long idBodega, Long idProducto) {
		return pbrepository.consultarBodegaProducto(idBodega, idProducto);
	}
}*/
