    
const multi = (method, url, body) => {

    return new Promise(

        function(res, rej) {

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

            console.log(body);
            req.send(body);

        }
    );

}

const prizeFunction = () => {
    const account={
        fname: document.getElementById("fistName").value,
        lname: document.getElementById("lastName").value
    }

    multi("POST", "http://lackandjucy.ukwest.cloudapp.azure.com:8080/addAccount", JSON.stringify(account)).then(val => {
        const testContainer = document.getElementById('result');
        testContainer.innerHTML = JSON.stringify(val);
    }
    ).catch(function(error) { console.log(error.message) });

    sessionStorage.setItem('accountPrize', event.target.id)
    location.href = prize.html
}


const accountFunction = () => {

    document.location = "accounts.html";

}
