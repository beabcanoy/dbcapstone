const setEventListeners = () =>{
    document.getElementById("btnAddFormula").addEventListener("click", ()=>{registerFormulas();});
}

const registerFormulas = () =>{
    document.getElementById("blankModalTitle").innerText = "Formula";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";

    var formulaForm = `
    <p>Instructions:</p>
    <ol class="list-group list-group-numbered">
        <li class="list-group-item">Enter the formula name</li>
        <li class="list-group-item">The formula of the product</li>
    </ol>

        <label for="formula_example" class="form-label mt-2">Example:</label>
        <p class="text-success fst-italic">Colored (Formula name)</p>
        <p class="text-success fst-italic">Actual Thickness * Density of metal * Width of raw material * Length * Pieces</p>

        <label for="formula_name" class="form-label mt-5">Formula name:</label>
        <input type="text" id="formula_name" class="form-control form-control-sm" autocomplete="off">

        <label for="formula_expression" class="form-label mt-2">Formula:</label>
        <input type="text" id="formula_expression" class="form-control form-control-sm" autocomplete="off">

    `;
    document.getElementById("blankModalMainDiv").innerHTML = formulaForm;

    const btnRegister = document.createElement("button");
    btnRegister.innerText = "Register";
    btnRegister.classList.add("btn", "btn-cust-citrus", "mt-3", "w-100");
    btnRegister.onclick = ()=>{saveRegistration();};

    document.getElementById("blankModalMainDiv2").append(btnRegister);

    const myModal = new bootstrap.Modal(document.getElementById('blankModal'), {
        keyboard: true,
        backdrop: "static"
    });
    myModal.show();
}


const saveRegistration = () =>{
    //get the elements value
    const url = 'http://localhost/capstone_project/api/formula.php';

    const json = {
        formulaName:document.getElementById("formula_name").value,
        formulaExpression:document.getElementById("formula_expression").value,
    }
    //prepare data
    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "addFormula");

    //use axios to send data to api
    axios({
        url:url,
        method:'post',
        data:formData
    }).then(response => {
        document.getElementById("alertModalMainDiv").innerText = "";
        document.getElementById("alertModalMainDiv2").innerText = "";
    
        const closeBtn = document.createElement("button");
        closeBtn.innerText = "OK";
        closeBtn.classList.add("btn", "text-primary", "border-0", "w-25");
        closeBtn.setAttribute("data-bs-dismiss", "modal");
    
        document.getElementById("alertModalMainDiv2").append(closeBtn);
    
        const myAlertModal = new bootstrap.Modal(document.getElementById('alertModal'), {
            keyboard: true,
            backdrop: "static"
        });

        setTimeout(() => {
            myAlertModal.show();
        }, 500);
    
        let alerts;
        if (response.data === 0) {
            alerts = `<p>Formula registration failed!</p>`;
        } else {
            alerts = `<p>Formula registration successful!</p>`;
        }
        document.getElementById("alertModalMainDiv").innerHTML = alerts;

        
    }).catch(error => {
        alert(error);
    });
    const myModal = bootstrap.Modal.getInstance(document.getElementById('blankModal'));
    myModal.hide();
}

const getRecords =()=>{
    const formData = new FormData();
    formData.append("operation","getFormulas");

    axios({
        url: "http://localhost/capstone_project/api/formula.php",
        method: "post",
        data: formData
    })

    .then(response =>{
        if(response.data.length === 0){
            alert("There are no records retrieved.")
        } else {
            displayRecords(response.data);
        }
    })
    .catch(error =>{
        alert(error);
    })
}

const displayRecords = (rsFormulas) =>{
    const tableRecords = document.getElementById("table-records");

    var dataTable = `
    <div class="table-responsive">
    <table class="table align-middle table-striped">
        <thead class="table-dark align-middle text-uppercase">
            <tr>
            <th scope="col">Formula name</th>
            <th scope="col">Expression</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
    <tbody>
    `;

    rsFormulas.forEach(formula=>{
        dataTable +=`
            <tr>
                <td class="w-25">${formula.formula_name}</td>
                <td class="w-50">${formula.Expression}</td>
                <td class="w-25">
                <button data-room-id="#" id="btnEdit" class="btn border-0 text-success p-1"><span class="bi bi-pencil"></span></button>
                <button data-room-id="#" id="btnDelete" class="btn border-0 text-danger p-1"><span class="bi bi-trash3"></span></button>
                </td>
            </tr>
        `;

    });

    dataTable += `</tbody></table></div>`;
    tableRecords.innerHTML = dataTable;

}

setEventListeners();
getRecords();