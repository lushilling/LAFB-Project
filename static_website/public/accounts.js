const multi = (method, url, body) => {

    return new Promise(

        function (res, rej) {

            const req = new XMLHttpRequest();

            req.onload = () => {

                if (req.status === 200) {
                    res(req.response);
                } else {
                    const reason = new Error('Rejected');
                    rej(reason);
                }

            }

            req.open(method, url)

            req.send(body);

        }
    );


}

const getAll = () =>{
    const container = document.getElementById('accountTable');

    if (container.rows.length > 1) {

        let tableSize = container.rows.length;
        for (i = tableSize; i > 1; i--) {
            container.deleteRow(i - 1);
        }

}

multi("GET", "http://lackandjucy.ukwest.cloudapp.azure.com:8080/getAllAccounts").then(val => {

    let data = JSON.parse(val);

    for (let account of data) {

        let aRow = document.createElement('tr');
        container.appendChild(aRow);

        let fName = document.createElement('td');
        fName.innerHTML = account.firstName;


        let lName = document.createElement('td');
        lName.innerHTML = account.lastName;

        let accountNumber = document.createElement('td');
        accountNumber.innerHTML = account.accountnumber;

        let prize = document.createElement('td');
        prize.innerHTML = account.prize;

        aRow.appendChild(fName);
        aRow.appendChild(lName);
        aRow.appendChild(accountNumber);
        aRow.appendChild(prize);
       

    }

})
    .catch(function (error) { console.log(error.message) });
}

getAll();
