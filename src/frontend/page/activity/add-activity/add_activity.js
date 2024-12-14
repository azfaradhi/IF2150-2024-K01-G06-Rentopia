async function initAddActivity() {
    const addButtonAct = document.getElementById("btn-add-act");
    const cancelButtonAct = document.getElementById("btn-cancel-act");
    const calculatePrice = document.getElementById("btn-calculate");


    if (calculatePrice){
        calculatePrice.addEventListener('click', async () => {
            const idUser = document.getElementById("input-cust-id").value;
            const idCar = document.getElementById("input-car-id").value;
            const startDate = document.getElementById("start-date").value;
            const endDate = document.getElementById("end-date").value;
            let valid = true;
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            if (!idCar || !startDate || !endDate){
                valid = false;
                alert("Please fill id car and date");
            }
            else if (endDateObj - startDateObj <= 0){
                valid = false;
                alert("Please input valid date!")
            }
            if (valid){

                const apiUrlIDUser = `http://localhost:5000/api/customer/${idUser}`;
                const responseIDCustomer = await fetch(apiUrlIDUser);
                if (!responseIDCustomer.ok){
                    throw new Error(`Error fetching activity: ${response.statusText}`);
                }
                const dataOneCustomerID = await responseIDCustomer.json();
                if (dataOneCustomerID.name_cust === null){
                    alert("User not found!");
                    return;
                }
                if (dataOneCustomerID.status_cust === "active"){
                    alert("Customer is renting");
                    return;
                }

                const apiUrlIDCar = `http://localhost:5000/api/car/show/${idCar}`;
                const responseIDCar = await fetch(apiUrlIDCar);
                if (!responseIDCar.ok){
                    throw new Error(`Error fetching activity: ${response.statusText}`);
                }
                const dataOneCarID = await responseIDCar.json();
                if (dataOneCarID.price_car === null){
                    alert("Car not found!");
                    return;
                }
                if (dataOneCarID.status_car === "reserved"){
                    alert("Car is being rented");
                    return;
                }

                const dateRange = []
                const priceCar = dataOneCarID.price_car;
                const differenceDate = endDateObj - startDateObj;
                const millisecondsInADay = 1000 * 60 * 60 * 24;
                const dayDifference = differenceDate / millisecondsInADay;
                const totalPrice = priceCar * dayDifference;
                const showPrice = document.getElementById("price-value");
                showPrice.innerHTML = `${totalPrice}`;
            }

            
        })
    }
    if (addButtonAct){
        console.log("A");
        addButtonAct.addEventListener('click', async () => {
            const idUser = document.getElementById("input-cust-id").value;
            const idCar = document.getElementById("input-car-id").value;
            const startDate = document.getElementById("start-date").value;
            const endDate = document.getElementById("end-date").value;
            let valid = true;
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);

            if (!idCar || !startDate || !endDate){
                valid = false;
                alert("Please fill id car and date");
            }
            else if (endDateObj - startDateObj <= 0){
                valid = false;
                alert("Please input valid date!")
            }
            if (valid){

                const apiUrlIDUser = `http://localhost:5000/api/customer/${idUser}`;
                const responseIDCustomer = await fetch(apiUrlIDUser);
                if (!responseIDCustomer.ok){
                    throw new Error(`Error fetching activity: ${response.statusText}`);
                }
                const dataOneCustomerID = await responseIDCustomer.json();
                if (dataOneCustomerID.name_cust === null){
                    alert("User not found!");
                    return;
                }
                if (dataOneCustomerID.status_cust === "active"){
                    alert("Customer is renting");
                    return;
                }

                const apiUrlIDCar = `http://localhost:5000/api/car/show/${idCar}`;
                const responseIDCar = await fetch(apiUrlIDCar);
                if (!responseIDCar.ok){
                    throw new Error(`Error fetching activity: ${response.statusText}`);
                }
                const dataOneCarID = await responseIDCar.json();
                if (dataOneCarID.price_car === null){
                    alert("Car not found!");
                    return;
                }
                if (dataOneCarID.status_car === "reserved"){
                    alert("Car is being rented");
                    return;
                }

                const priceCar = dataOneCarID.price_car;
                const differenceDate = endDateObj - startDateObj;
                const millisecondsInADay = 1000 * 60 * 60 * 24;
                const dayDifference = differenceDate / millisecondsInADay;
                const totalPrice = priceCar * dayDifference;
                const activitiesData = {
                    id_cust : idUser,
                    id_car : idCar,
                    date_range :[startDate,endDate],
                    total_price: totalPrice,
                    status_car : "reserved",
                    status_cust : "active",
                    status_activity : "in-progress",
                };
                console.log(activitiesData);
                try {
                    const responseAddAct = await fetch('http://localhost:5000/api/activity/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(activitiesData),
                    });
                    console.log("masuk dong");
                    if (!responseAddAct.ok){
                        throw new Error(`Failed to create activity: ${responseAddAct.statusText}`);
                    }
                    const resultAdd = await responseAddAct.json();
                    document.getElementById("input-cust-id").value = "";
                    document.getElementById("input-car-id").value = "";
                    document.getElementById("start-date").value ="";
                    document.getElementById("end-date").value ="";   
                    alert("Success adding activity!");
                    window.location.hash = "/";

                }
                catch (error){
                    console.error("Error: ", error);    
                }
                    
                
            }

            
        })
    }
    if (cancelButtonAct){
        cancelButtonAct.addEventListener('click', () =>{
            console.log("Cancel button");
            window.location.hash = "/car";
        })
    }

}