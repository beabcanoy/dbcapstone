const setEventListeners = () =>{
    document.getElementById("btnAdd").addEventListener("click", ()=>{registerCategories();});
}

const registerCategories = () =>{
    document.getElementById("blankModalTitle").innerText = "Category";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";

    var categoriesForm = `
    <p>Instructions:</p>
    <ol class="list-group list-group-numbered">
        <li class="list-group-item">Raw material name</li>
        <li class="list-group-item">Thickness</li>
        <li class="list-group-item">Variation (Sizes & Colour)</li>
    </ol>

        <label for="category_example" class="form-label mt-2">Example:</label>
        <input type="text" id="category_example" value="Colored Coil 0.35MM White" class="form-control form-control-sm text-success fst-italic" readonly>

        <label for="raw_category" class="form-label mt-5">Category:</label>
        <input type="text" id="raw_category" class="form-control form-control-sm" autocomplete="off">

    `;
    document.getElementById("blankModalMainDiv").innerHTML = categoriesForm;

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
    const url = 'http://localhost/capstone_project/api/category.php';

    const json = {
        rawCategory:document.getElementById("raw_category").value,
    }
    //prepare data
    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "addCategory");

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
            alerts = `<p>Category registration failed!</p>`;
        } else {
            alerts = `<p>Category registration successful!</p>`;
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
    formData.append("operation","getCategories");

    axios({
        url: "http://localhost/capstone_project/api/category.php",
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

const displayRecords = (rsCategories) =>{
    const tableRecords = document.getElementById("table-records");

    var dataTable = `
    <div class="table-responsive">
    <table class="table align-middle table-striped">
        <thead class="table-dark align-middle text-uppercase">
            <tr>
            <th scope="col">Categories</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
    <tbody>
    `;

    rsCategories.forEach(category=>{
        dataTable +=`
            <tr>
                <td class="w-50">${category.raw_material_categories}</td>
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