package com.qa.persistence.domain;

public class Account {

	private String accountnumber;

	private String firstName;
	private String lastName;

	private String prize;

	public Account() {

	}

	public Account(String accountnumber, String firstName, String lastName, String prize) {
		super();
		this.accountnumber = accountnumber;
		this.firstName = firstName;
		this.lastName = lastName;
		this.prize = prize;
	}

	public String getAccountnumber() {
		return accountnumber;
	}

	public void setAccountnumber(String accountNumber) {
		this.accountnumber = accountNumber;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPrize() {
		return prize;
	}

	public void setPrize(String prize) {

		this.prize = prize;
	};

}
