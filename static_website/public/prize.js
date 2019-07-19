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

const userTerm = sessionStorage.getItem("prize");

multi("GET", "http://lackandjucyjenkins.uksouth.cloudapp.azure.com/server/getAllAccounts").then(val => {

        let data = JSON.parse(val);

        console.log(data);

        document.getElementById('prize').innerText = data.prize;

    })
    .catch(function(error) { console.log(error.message) });



