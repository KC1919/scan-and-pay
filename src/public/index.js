(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/tables/5', {
            method: 'GET',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const jsonResp = await response.json();

        console.log(jsonResp);

        let image = new Image();
        image.src = jsonResp.qrcode;
        document.body.appendChild(image);
    } catch (error) {
        alert('Failed to render QR code');
    }
})()