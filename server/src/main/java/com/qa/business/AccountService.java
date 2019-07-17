package com.qa.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.qa.persistence.domain.Account;
import com.qa.utility.JSONImpl;

@Service
public class AccountService implements IAccountService {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	public JSONImpl json;

	@Value("${url.getAll}")
	private String getAllURL;

	@Value("${url.textGen}")
	private String textGeneratorURL;

	@Value("${url.numGen}")
	private String numGeneratorURL;

	@Value("${url.prize}")
	private String prizeGenURL;

	@Override
	public String getAllAccounts() {
		return restTemplate.getForObject(getAllURL, String.class);
	}

	public String addAccount(String accountData) {

		Account account = json.getObjectForJSON(accountData, Account.class);

		//Text Gen to get the text part of Account Number
		String generatedAccountText = restTemplate.getForObject(textGeneratorURL, String.class);

		//Num Gen to get the numeric part of Account Number
		String generatedAccountNum = restTemplate.getForObject(numGeneratorURL, String.class);

		account.setAccountnumber(generatedAccountText + generatedAccountNum);
		
		//The Prize Gen is then posted the incomplete account
		return restTemplate.postForObject(prizeGenURL, account, String.class);
	}

}
