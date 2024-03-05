package com.a.backend.usersapp.backendusersapp.mapper;

import com.a.backend.usersapp.backendusersapp.models.entities.User;

public class DtoMapperUser {
	
	private static DtoMapperUser mapper;
	
	private User user;
	
	public static DtoMapperUser getInstance() {
		mapper = new DtoMapperUser();
		return  mapper;
	}

	public DtoMapperUser setUser(User user) {
		this.user = user;
		return mapper;
	}
}
