const setEventListeners = () =>{
    document.getElementById("btnAdd").addEventListener("click", ()=>{registerMaterial();});
}

const registerMaterial = () =>{

    document.getElementById("blankModalTitle").innerText = "Raw Material";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";

    const formData = new FormData();
    formData.append("operation","getRawCategories");

    axios({
        url: "http://localhost/capstone_project/api/raw_material.php",
        method: "post",
        data: formData
    })

    .then(response =>{
        if(response.data.length == 0){
            alert("There are no records retrieved.")
        } else {
            const raw_catergories = response.data;
            const categoriesOptions = raw_catergories.map(categories => 
                `<option value="${categories.raw_material_id}">${categories.raw_material_categories}</option>`
            ).join('');
        
    var rawMaterialForm = `

    <label for="raw_categories" class="form-label mt-2">Raw Material Categories:</label>
        <select class="form-select" id="raw_categories" aria-label="Default select example">
        ${categoriesOptions}
        </select>

    <label for="roll_num" class="form-label mt-2">Roll #:</label>
    <input type="number" id="roll_num" class="form-control form-control-sm" autocomplete="off">

    <label for="netweight_num" class="form-label mt-2">Raw Netweight:</label>
    <input type="number" id="netweight_num" class="form-control form-control-sm" autocomplete="off">

    `;
    document.getElementById("blankModalMainDiv").innerHTML = rawMaterialForm;

    const btnRegister = document.createElement("button");
    btnRegister.innerText = "Register";
    btnRegister.classList.add("btn", "btn-cust-citrus", "mt-3","w-100");
    btnRegister.onclick = ()=>{saveRegistration();};

    document.getElementById("blankModalMainDiv2").append(btnRegister);

    const table = document.createElement("table");
    table.classList.add("table", "table-bordered", "mt-3");

    const tableHeader = `
        <thead>
            <tr>
                <th scope="col">Roll #</th>
                <th scope="col">Raw Material Category</th>
                <th scope="col">Netweight</th>
                <th scope="col">Action</th>
                
            </tr>
        </thead>
    `;
    table.innerHTML = tableHeader;

    const tableBody = document.createElement("tbody");

    const tableRow = `
        <tr>
            <td></td>
            <td></td>
            <td></td>

            <td>
            <button data-room-id="#" id="btnDelete" class="btn border-0 text-danger p-1"><span class="bi bi-trash3"></span></button>
            </td>
        </tr>
    `;
    tableBody.innerHTML = tableRow;

    table.appendChild(tableBody);

    document.getElementById("blankModalMainDiv2").appendChild(table);

    const myModal = new bootstrap.Modal(document.getElementById('blankModal'), {
        keyboard: true,
        backdrop: "static"
    });
    myModal.show();

        }
    })

    .catch(error =>{
        alert(error);
    })
}

const saveRegistration = () => {
    // Client-side validation
    const raw_material_id = document.getElementById('raw_categories').value;
    const raw_roll = document.getElementById('roll_num').value;
    const raw_netweight = document.getElementById('netweight_num').value;
    const raw_manufactured_date = new Date().toISOString().split('T')[0];
    
    const admin_id = sessionStorage.getItem("admin_id");
    const emp_id = sessionStorage.getItem("emp_id");

    const url = 'http://localhost/capstone_project/api/raw_material.php';
    const formData = new FormData();
    formData.append('raw_material_id', raw_material_id);
    formData.append('raw_roll', raw_roll);
    formData.append('raw_netweight', raw_netweight);
    formData.append('raw_manufactured_date', raw_manufactured_date);
    formData.append('admin_id', admin_id);
    formData.append('emp_id', emp_id);
    formData.append('operation', 'addRawMaterial');

    axios({
        url: url,
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then(response => {
        var responseMsg = "";
        if (response.data === 0) {
            responseMsg = "<p>Raw Material registration failed!</p>";
            getRecords();
        } else {
            responseMsg = "<p>Raw Material registration successful!</p>";
            getRecords();
        }
        showNotificationModal(responseMsg);
    }).catch(error => {
        alert(error);
    });

    const myModal = bootstrap.Modal.getInstance(document.getElementById('blankModal'));
    myModal.hide();
}


const showNotificationModal = (message) =>{
    document.getElementById("responseModalMainDiv").innerHTML = message;

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "OK";
    closeBtn.classList.add("btn", "text-primary", "border-0", "w-25");
    closeBtn.setAttribute("data-bs-dismiss", "modal");

    document.getElementById("responseModalMainDiv2").innerHTML = ""; // Clear previous content
    document.getElementById("responseModalMainDiv2").append(closeBtn);

    const responseNotifModal = new bootstrap.Modal(document.getElementById("responseModal"), {
        keyboard: true,
        backdrop: "static"
    });
    responseNotifModal.show();
    
}

const getRecords =()=>{
    const formData = new FormData();
    formData.append("operation","getRecords");

    axios({
        url: "http://localhost/capstone_project/api/raw_material.php",
        method: "post",
        data: formData
    })

    .then(response =>{
        if(response.data.length === 0){
            console.log(response.data);
            alert("There are no records retrieved.")
        } else {
            displayRecords(response.data);
        }
    })
    .catch(error =>{
        alert(error);
    })
}

const onLoad = () => {
    document.getElementById("ngalan").innerText = sessionStorage.getItem("fullname");
    //document.getElementById("userId").innerText = sessionStorage.getItem("studId");
    displayRecords();
  }

const displayRecords = (rsRawMats) =>{
    const tableRecords = document.getElementById("table-records");

    var dataTable = `
    <div class="table-responsive">
    <table class="table align-middle table-striped">
        <thead class="table-dark align-middle text-uppercase">
            <tr>
            <th scope="col">Roll #</th>
            <th scope="col">Raw Material</th>
            <th scope="col">Netweight</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
    <tbody>
    `;

    rsRawMats.forEach(rawmats=>{
        dataTable +=`
            <tr>
                <td>${rawmats.raw_roll}</td>
                <td>${rawmats.raw_material_id}</td>
                <td>${rawmats.raw_netweight}</td>
                <td>
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