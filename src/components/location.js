export default function getLocation() {
    const defaultLocation = [
        {//Santo André
            latitude: -23.6533509,
            longitude: -46.5279039
        },
        { //São Bernardo do Campo
            latitude: -23.7080345,
            longitude: -46.5506747
        },{ //São Caetano do Sul
            latitude: -23.6195923,
            longitude: -46.5688323
        },{ //Diadema
            latitude: -23.681347,
            longitude: -46.62052
        },{//Mauá 
            latitude: -23.6669527,
            longitude: -46.4616922
        },{ //Ribeirão Pires
            latitude: -23.7129388,
            longitude: -46.4150871
        },{ //Rio Grande da Serra
            latitude: -23.743724,
            longitude: -46.397084
        },{//São Paulo 
            latitude: -23.5506507,
            longitude: -46.6333824
        },{//Paranapiacaba
            latitude: -23.7778474,
            longitude: -46.3012913
        }
    ];
    
    
    return new Promise((resolve, reject) => {
        let timedOut = false;
        let timeoutTimer;
        const handleLocationSuccess = (position) => {
            clearTimeout(timeoutTimer);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Localização do usuário obtida com sucesso.");
            resolve({
                latitude: latitude,
                longitude: longitude,
                userAccepted: true
            });
        };
        const handleLocationError = (error) => {
            if (!timedOut) {
                clearTimeout(timeoutTimer);
                console.warn("Não foi possível obter a localização do usuário:", error.message);
                resolve({
                    latitude: defaultLocation[4].latitude,
                    longitude: defaultLocation[4].longitude,
                    userAccepted: false
                });
            }
        };
    
        try {
            window.navigator.geolocation.getCurrentPosition(
                handleLocationSuccess,
                handleLocationError);
                 timeoutTimer = setTimeout(() => {
                    timedOut = true;
                    console.warn("Tempo limite atingido ao tentar obter a localização do usuário.");
                    resolve({
                        latitude: defaultLocation[4].latitude,
                        longitude: defaultLocation[4].longitude,
                        userAccepted: false
                    });
                }, 10000); // Timeout de 10 segundos (ajuste conforme necessário)
        } catch (error) {
            console.error("Erro ao obter localização:", error.message);
            reject(error);
        }
        

    });
}

