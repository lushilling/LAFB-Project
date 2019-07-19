    
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
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value
    }

    multi("POST", "http://lackandjucyjenkins.uksouth.cloudapp.azure.com/server/addAccount", JSON.stringify(account)).then(val => {
        sessionStorage.setItem('prize', event.target.id)
        console.log(val);
        //location.href = 'prize.html';
    }
    ).catch(function(error) { console.log(error.message) });
}


const accountFunction = () => {

    document.location = "accounts.html";

}
