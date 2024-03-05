package com.a.backend.usersapp.backendusersapp.controllers;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a.backend.usersapp.backendusersapp.models.entities.Prestamo;
import com.a.backend.usersapp.backendusersapp.models.request.PrestamoRequest;
import com.a.backend.usersapp.backendusersapp.services.PrestamoService;
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

@RestController
@RequestMapping("api/prestamos")
@CrossOrigin(origins = "*")
public class PrestamoController {
	
	@Autowired
	private PrestamoService service;
	
	@GetMapping
    public List<Prestamo> list() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Optional<Prestamo> prestamoOptional = service.findById(id);

        if (prestamoOptional.isPresent()) {
            return ResponseEntity.ok(prestamoOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    
    
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Prestamo prestamo, BindingResult result) {
        if(result.hasErrors()){
            return validation(result);
        }    
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(prestamo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody PrestamoRequest prestamo, BindingResult result, @PathVariable Long id) {
        if(result.hasErrors()){
            return validation(result);
        }
        Optional<Prestamo> o = service.update(prestamo, id);
        
        if (o.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(o.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        Optional<Prestamo> o = service.findById(id);

        if (o.isPresent()) {
            service.remove(id);
            return ResponseEntity.noContent().build(); // 204
        }
        return ResponseEntity.notFound().build();
    }
    
        
    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();

        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
    
    
    
    @GetMapping("/entrega-recepcion/{idAsignado}/{idProducto}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable Long idAsignado, @PathVariable Long idProducto) {
        try {
            byte[] pdfBytes = generatePdfReport(idAsignado, idProducto);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "acta_entrega_recepcion.pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new byte[0]);
        }
    }

    private byte[] generatePdfReport(Long idAsignado, Long idProducto) {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            // Carga la imagen desde un archivo (ajusta la ruta según tu proyecto)
            ClassPathResource resource = new ClassPathResource("static/images/escudo.jpg");
            String imagePath = resource.getFile().getAbsolutePath();
            PDImageXObject pdImage = PDImageXObject.createFromFile(imagePath, document);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                // Dibujar imagen
            	float imageWidth = 100f;  // Ajusta según tus necesidades
            	float imageHeight = 100f;  // Ajusta según tus necesidades
                float pageWidth = page.getMediaBox().getWidth();
                float imageX = (pageWidth - imageWidth) / 2;
                float imageY = page.getMediaBox().getHeight() - imageHeight - 20;
                contentStream.drawImage(pdImage, imageX, imageY, imageWidth, imageHeight);

                // Iniciar texto después de dibujar la imagen
                contentStream.beginText();
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 14);

                // Ubica el texto "ENTREGA ACTA RECEPCIÓN" en el centro
                float textWidth = PDType1Font.HELVETICA_BOLD.getStringWidth("ENTREGA ACTA RECEPCIÓN") / 1000f * 14;
                float centerX = (pageWidth - textWidth) / 2;
                float textY = 600;  // Ajusta según tus necesidades
                contentStream.newLineAtOffset(centerX, textY);
                contentStream.showText("ENTREGA ACTA RECEPCIÓN");
                contentStream.newLineAtOffset(0, -20);

                // Información del usuario a la izquierda
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                String username = authentication.getName();
                contentStream.showText("Usuario: " + username);
                contentStream.newLineAtOffset(0, -20);

                Prestamo prestamoProducto = service.consultarAsignadoProducto(idAsignado, idProducto);

                // Fecha Desde a la izquierda
                contentStream.newLineAtOffset(-centerX, -20);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                String formattedFechaDesde = prestamoProducto.getFechaDesde().format(formatter);
                contentStream.showText("Fecha Desde: " + formattedFechaDesde);
                contentStream.newLineAtOffset(0, -10);

                // Estado a la derecha
                float estadoTextWidth = PDType1Font.HELVETICA_BOLD.getStringWidth("Estado: " + prestamoProducto.getEstado()) / 1000f * 14;
                contentStream.newLineAtOffset(pageWidth - estadoTextWidth, 12);
                contentStream.showText("Estado: " + prestamoProducto.getEstado());

                // Fecha Hasta debajo de la Fecha Desde y a la izquierda
                contentStream.newLineAtOffset(-centerX, -2);
                DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                String formattedFechaHasta = prestamoProducto.getFechaHasta().format(formatter2);
                contentStream.showText("Fecha Hasta: " + formattedFechaHasta);
                contentStream.newLineAtOffset(0, 10);

                // Codigo producto
                float codigoTextWidth = PDType1Font.HELVETICA_BOLD.getStringWidth("Codigo: " + prestamoProducto.getProducto().getCodigo()) / 1000f * 14;
                contentStream.newLineAtOffset(-centerX, -40);
                contentStream.showText("Codigo: " + prestamoProducto.getProducto().getCodigo());
                contentStream.newLineAtOffset(0, -20);

                // Nombre producto
                contentStream.showText("Producto: " + prestamoProducto.getProducto().getNombre());
                contentStream.newLineAtOffset(0, -10);

                // Interlineado a la derecha con Producto
                float interlineadoTextWidth = PDType1Font.HELVETICA_BOLD.getStringWidth("Asignado a: " + prestamoProducto.getAsignado().getNombres() + " " + prestamoProducto.getAsignado().getApellidos()) / 1000f * 14;
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Asignado a: " + prestamoProducto.getAsignado().getNombres() + " " + prestamoProducto.getAsignado().getApellidos());
                
             // Cantidad producto
                float cantidadTextWidth = PDType1Font.HELVETICA_BOLD.getStringWidth("Cantidad: " + prestamoProducto.getCantidad()) / 1000f * 14;
                contentStream.newLineAtOffset(0, -20);
                contentStream.showText("Cantidad: " + prestamoProducto.getCantidad());
                
                contentStream.endText();
                
                //
                float firmaRastrilleroX = 100;  // Ajusta según tus necesidades para posicionar más a la izquierda
                float firmaRastrilleroY = page.getMediaBox().getHeight() - 600;  // Ajusta según tus necesidades para posicionar más arriba

                contentStream.beginText();
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 14);
                contentStream.newLineAtOffset(firmaRastrilleroX, firmaRastrilleroY);
                contentStream.showText("Firma Rastrillero");
                contentStream.endText();

                // Interlineado entre firmas
                float interlineadoY = firmaRastrilleroY - 40;  // Ajusta según tus necesidades para el interlineado

                // Firma Custodio más a la derecha y abajo
                float firmaCustodioX = firmaRastrilleroX + PDType1Font.HELVETICA_BOLD.getStringWidth("Firma Rastrillero") / 1000f * 14 + 200;  // Ajusta según tus necesidades para separar los textos y posicionar más a la derecha
                float firmaCustodioY = firmaRastrilleroY;  // Alinea con la posición Y de Firma Rastrillero

                contentStream.beginText();
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 14);
                contentStream.newLineAtOffset(firmaCustodioX, firmaCustodioY);
                contentStream.showText("Firma Custodio");
                contentStream.endText();
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            return new byte[0];
        }
    }



}
