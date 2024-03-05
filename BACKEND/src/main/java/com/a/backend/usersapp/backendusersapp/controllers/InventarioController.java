package com.a.backend.usersapp.backendusersapp.controllers;

import com.a.backend.usersapp.backendusersapp.dto.InventarioInputDTO;
import com.a.backend.usersapp.backendusersapp.models.entities.Producto;
/*import com.a.backend.usersapp.backendusersapp.models.entities.ProductoBodega;
import com.a.backend.usersapp.backendusersapp.services.ProductoBodegaService;*/
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
/*
@RestController
@RequestMapping("api/inventarios")
@CrossOrigin(originPatterns = "*")
public class InventarioController {

	@Autowired
	private ProductoBodegaService service;

	@GetMapping
	public ResponseEntity<List<ProductoBodega>> list() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping("/{idBodega}")
	public ResponseEntity<List<ProductoBodega>> getByIdBodega(@PathVariable Long idBodega) {
		return ResponseEntity.ok(service.findByIdBodega(idBodega));

	}

	@PostMapping("/bodega/{idBodega}/producto/{idProducto}")
	public ResponseEntity<ProductoBodega> save(@PathVariable Long idBodega, @PathVariable Long idProducto,
			@Valid @RequestBody InventarioInputDTO productoBodega) {
		return new ResponseEntity<>(service.save(productoBodega, idBodega, idProducto), HttpStatus.CREATED);
	}

	@GetMapping("/entrega-recepcion/{idBodega}/{idProducto}")
	public ResponseEntity<byte[]> generatePdf(@PathVariable Long idBodega, @PathVariable Long idProducto) {
		byte[] pdfBytes = generatePdfReport(idBodega, idProducto);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("inline", "acta_entrega_recepcion.pdf");

		return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
	}

	private byte[] generatePdfReport(Long idBodega, Long idProducto) {
		try {
			Document document = new Document();
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			PdfWriter.getInstance(document, baos);

			document.open();

			// Obtener el nombre de usuario del contexto de seguridad
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String username = authentication.getName();

			// Realizar la consulta con los parámetros proporcionados
			// Asume que tienes un servicio (bodegaProductoService) para gestionar la lógica
			// de negocio
			ProductoBodega bodegaProducto = service.consultarBodegaProducto(idBodega, idProducto);

			// Título del informe centrado, en negrita y mayúsculas
			Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, BaseColor.BLACK);
			titleFont.setStyle(Font.BOLD);
			Paragraph title = new Paragraph("ENTREGA ACTA RECEPCIÓN", titleFont);
			title.setAlignment(Element.ALIGN_CENTER);
			document.add(title);

			// Información del usuario
			document.add(new Paragraph("Usuario: " + username));

			// Agregar detalles de la consulta al PDF con una tabla
			document.add(new Paragraph("Detalles de la consulta:"));

			PdfPTable table = new PdfPTable(5); // 4 columnas en la tabla
			table.setWidthPercentage(100);

			// Añadir celdas a la tabla con los detalles
			table.addCell(createCell("Tipo Inventario:", bodegaProducto.getTipoInventario()));
			table.addCell(createCell("Rastrillo:", bodegaProducto.getBodega().getNombre()));
			table.addCell(createCell("Producto:", bodegaProducto.getProducto().getNombre()));
			table.addCell(createCell("Cantidad:", String.valueOf(bodegaProducto.getStock())));
			table.addCell(createCell("Persona asignada:", bodegaProducto.getPersonaAsignada()));

			// Agrega más filas según la estructura de tu entidad BodegaProducto

			document.add(table);

			// Puedes agregar más contenido dinámico según tus necesidades

			document.close();

			return baos.toByteArray();
		} catch (DocumentException e) {
			// Manejo de excepciones
			e.printStackTrace();
			return new byte[0];
		}
	}

	private PdfPCell createCell(String label, String value) {
		Font labelFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, BaseColor.BLACK);
		Font valueFont = FontFactory.getFont(FontFactory.HELVETICA, 10, BaseColor.BLACK);

		PdfPCell cell = new PdfPCell();
		cell.setBorder(Rectangle.NO_BORDER);
		cell.setPadding(8);

		cell.addElement(new Phrase(label, labelFont));
		cell.addElement(new Phrase(value, valueFont));

		return cell;
	}

}*/
