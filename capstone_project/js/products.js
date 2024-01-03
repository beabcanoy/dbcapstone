const setEventListeners = () =>{
    document.getElementById("btnAdd").addEventListener("click", ()=>{registerProducts();});
}

const registerProducts = () =>{

    document.getElementById("blankModalTitle").innerText = "Product";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";

    const formData = new FormData();
    formData.append("operation","getFormula");

    axios({
        url: "http://localhost/capstone_project/api/product.php",
        method: "post",
        data: formData
    })

    .then(response =>{
        if(response.data.length == 0){
            alert("There are no records retrieved.")
        } else {
            const prod_formula = response.data;
            const formulaOptions = prod_formula.map(formula => 
                `<option value="${formula.formula_id}">${formula.formula_name}</option>`
            ).join('');
        
    var productForm = `
    <label for="product_name" class="form-label mt-2">Product Name:</label>
    <input type="text" id="product_name" class="form-control form-control-sm" autocomplete="off">

    <label for="product_image" class="form-label mt-2">Image:</label>
    <input type="file" id="product_image" class="form-control form-control-sm" autocomplete="off">

    <div class="form-group">
    <label for="product_description" class="form-label mt-2">Product description:</label>
    <textarea class="form-control" id="product_description" rows="2"></textarea>
    </div>

    <label for="product_formula" class="form-label mt-2">Formula:</label>
        <select class="form-select" id="product_formula" aria-label="Default select example">
        ${formulaOptions}
        </select>
    `;
    document.getElementById("blankModalMainDiv").innerHTML = productForm;

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

const saveRegistration = () => {
    // Client-side validation
    const prodName = document.getElementById('product_name').value;
    const prodImage = document.getElementById('product_image').files[0];
    const prodDescription = document.getElementById('product_description').value;
    const prodFormula = document.getElementById('product_formula').value;

    let uploadOk  = "";
    // Validate file type
    const allowedFormats = ["jpg", "jpeg", "png"];
    const imageFileType = prodImage.name.split('.').pop().toLowerCase();
    if (!allowedFormats.includes(imageFileType)) {
        uploadOk  += `<p>Invalid file type. Please upload a JPG, JPEG, or PNG image.</p>`;
    }

    // Validate file size
    const maxSize = 900000;
    if (prodImage.size > maxSize) {
        uploadOk  += `<p>File size exceeds the allowed limit. Please upload a smaller image.</p>`;
    }

    if (uploadOk  === "") { 
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}_${prodImage.name}`;

        const url = 'http://localhost/capstone_project/api/product.php';

        const formData = new FormData();
        formData.append('prodName', prodName);
        formData.append('prodImage', prodImage, uniqueFileName);
        formData.append('prodDescription', prodDescription);
        formData.append('prodFormula', prodFormula);
        formData.append('operation', 'addProduct');

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
                responseMsg = "<p>Product registration failed!</p>";
            } else {
                responseMsg = "<p>Product registration successful!</p>";
            }
            showNotificationModal(responseMsg);

        }).catch(error => {
            alert(error);
        });

    } else {
        showNotificationModal(uploadOk);
    }

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
        url: "http://localhost/capstone_project/api/product.php",
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

const displayRecords = (rsProducts) =>{
    const tableRecords = document.getElementById("table-records");

    var dataTable = `
    <div class="table-responsive">
    <table class="table align-middle table-striped">
        <thead class="table-dark align-middle text-uppercase">
            <tr>
            <th scope="col">Product name</th>
            <th scope="col">Image</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
    <tbody>
    `;

    rsProducts.forEach(product=>{
        dataTable +=`
            <tr>
                <td>${product.product_name}</td>
                <td><img src="/api/${product.product_image}" alt="product icon"  width="100px"></td>
                <td class="w-50">${product.product_description}</td>
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