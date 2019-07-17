package com.qa.business;

import java.util.List;
import java.util.Optional;

import com.qa.persistence.domain.Account;

public interface IAccountService {

	String getAllAccounts();

	String addAccount(String accountData);

}
