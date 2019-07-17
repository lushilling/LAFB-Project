package com.qa.utility;

import org.springframework.stereotype.Component;

import com.google.gson.Gson;

@Component
public class JSONImpl {
	

	private Gson gson;

	public JSONImpl() {
		this.gson = new Gson();
	}

	public String getJSONForObject(Object obj) {
		
		return gson.toJson(obj);
	}

	public <T> T getObjectForJSON(String jsonString, Class<T> clazz) {
		return gson.fromJson(jsonString, clazz);
	}

}

