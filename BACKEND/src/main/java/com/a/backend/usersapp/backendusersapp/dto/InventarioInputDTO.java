package com.a.backend.usersapp.backendusersapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;
import java.util.Date;

public record InventarioInputDTO(

		String tipoInventario, @Positive Integer stock, @Positive Integer stockMinimo, String personaAsignada,
		String estado, @NotBlank String usuario, @NotBlank LocalDateTime fechaDesde, @NotBlank LocalDateTime fechaHasta,
		String observacion

) {
}
