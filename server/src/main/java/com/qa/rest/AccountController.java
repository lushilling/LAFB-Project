package com.qa.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.business.AccountService;
import com.qa.persistence.domain.Account;
import com.qa.utility.JSONImpl;

@RestController
@CrossOrigin
public class AccountController {

	@Autowired
	public AccountService service;


	@RequestMapping("/getAllAccounts")
	public String getAllAccounts() {

		return service.getAllAccounts();
	}

	@PostMapping("/addAccount")
	public String addAccount(@RequestBody String accountData) {

		return service.addAccount(accountData);
	}

}
