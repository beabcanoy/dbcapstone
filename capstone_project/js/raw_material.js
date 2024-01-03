const setEventListeners = () =>{
    document.getElementById("btnAdd").addEventListener("click", ()=>{registerMaterial();});
}

const addMaterial = (_button) => {
    var raw_categories = document.getElementById("raw_categories").value;
    var no_of_rolls = document.getElementById("roll_num").value; 
    var roll_netweight = document.getElementById("netweight_num").value;

    var table = document.getElementById("rm_list_table");
    var rowCount = table.rows.length;

    if (rowCount >= 5) {
        alert("You can only add up to five rolls.");
        return;
    }

    if (raw_categories && no_of_rolls && roll_netweight) {
        var newRow = document.createElement("tr");

        var raw_categories_cell = document.createElement("td");
        var selectedOption = document.getElementById("raw_categories").options[document.getElementById("raw_categories").selectedIndex];
        raw_categories_cell.textContent = selectedOption.text;

        raw_categories_cell.setAttribute("data-raw-material-id", document.getElementById("raw_categories").value);

        var no_of_rolls_cell = document.createElement("td");
        no_of_rolls_cell.textContent = no_of_rolls;

        var roll_netweight_cell = document.createElement("td");
        roll_netweight_cell.textContent = roll_netweight;

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.onclick = function () {
            deleteRow(newRow);
        };

        var deleteCell = document.createElement("td");
        deleteCell.appendChild(deleteButton);

        newRow.appendChild(raw_categories_cell);
        newRow.appendChild(no_of_rolls_cell);
        newRow.appendChild(roll_netweight_cell);
        newRow.appendChild(deleteCell);

        table.appendChild(newRow);

        document.getElementById("roll_num").value = "";
        document.getElementById("netweight_num").value = "";
    } else {
        alert("Error");
    }
};

function deleteRow(row) {
    var table = document.getElementById("rm_list_table");
table.deleteRow(row.rowIndex);
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
    <div class="row">
        <div class="col">
            <label for="roll_num" class="form-label mt-2">No. of rolls:</label>
            <input type="number" id="roll_num" class="form-control form-control-sm" autocomplete="off">
        </div>
        <div class="col">
            <label for="netweight_num" class="form-label mt-2">Roll netweight:</label>
            <input type="number" id="netweight_num" class="form-control form-control-sm" autocomplete="off">
        </div>
    </div>

        `;
    document.getElementById("blankModalMainDiv").innerHTML = rawMaterialForm;

    const btnAddMaterial = document.createElement("button");
    btnAddMaterial.innerText = "+ new roll";
    btnAddMaterial.classList.add("btn", "btn-primary", "mt-2", "btn-sm");
    btnAddMaterial.onclick = ()=>{addMaterial();};

    document.getElementById("blankModalMainDiv2").append(btnAddMaterial);

    const table = document.createElement("table");
    table.classList.add("table", "table-striped", "mt-3");
    table.id = "rm_list_table";

    const tableHeader = `
        <thead class = "table-dark align-middle" >
            <tr>
                <th scope="col">Raw Material Category</th>
                <th scope="col">No. of rolls</th>
                <th scope="col">Roll netweight</th>
                <th scope="col">Action</th>  
            </tr>
        </thead>
    `;
    table.innerHTML = tableHeader;

    const tableBody = document.createElement("tbody");

    table.appendChild(tableBody);

    document.getElementById("blankModalMainDiv2").appendChild(table);

    const btnRegister = document.createElement("button");
    btnRegister.innerText = "Register";
    btnRegister.classList.add("btn", "btn-cust-citrus", "mt-3","w-100");
    btnRegister.onclick = ()=>{saveRegistration();};

    document.getElementById("blankModalMainDiv2").append(btnRegister);

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

function saveRegistration() {
    var table = document.getElementById("rm_list_table");
    var rows = table.getElementsByTagName("tr");

    var headerTableArray = [];

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");

        if (cells.length >= 3) {
            var rawMaterialId = cells[0].getAttribute("data-raw-material-id");
            var noOfRollValue = cells[1].textContent;
            var netweightValue = cells[2].textContent;

            var headerItem = {
                detail_raw_material: rawMaterialId,
                detail_no_of: noOfRollValue,
                detail_netweight: netweightValue,
            };
            headerTableArray.push(headerItem);
        }
    }

    const manufacture_date = new Date().toISOString().split('T')[0];

    const json = {
    headerTable: headerTableArray,
    manufacture_date: manufacture_date,
    };

    const formData = new FormData();
    formData.append("operation", "add_roll_material");
    formData.append("json", JSON.stringify(json));

    axios({
    url: "http://localhost/capstone_project/api/raw_material.php",
    method: "post",
    data: formData,
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
            console.log(response.data);
            alerts = `<p>items registration failed!</p>`;
        } else {
            alerts = `<p>items registration successful!</p>`;
            getRecords();
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
    formData.append("operation","getRecords");

    axios({
        url: "http://localhost/capstone_project/api/raw_material.php",
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
                <td>${rawmats.roll_detail_no_of}</td>
                <td>${rawmats.raw_material_categories}</td>
                <td>${rawmats.roll_detail_netweight}</td>
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