const setEventListeners = () =>{
    document.getElementById("btnAdd").addEventListener("click", (event) => {
        event.preventDefault(); // prevent default behavior
        registerEmployee();
    });
}

const registerEmployee = () =>{
    document.getElementById("blankModalTitle").innerText = "New employee";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";

    var employeeForm = `
    <div class="row">
        <div class="col">
            <label for="emp_fName" class="form-label mt-2">First name:</label>
            <input type="text" id="emp_fName" class="form-control form-control-sm" autocomplete="off">
            <span class="text-danger" id="val_fname"></span>
        </div>
        <div class="col">
            <label for="emp_lName" class="form-label mt-2">Last name:</label>
            <input type="text" id="emp_lName" class="form-control form-control-sm" autocomplete="off">
            <span class="text-danger" id="val_lname"></span>
        </div>
    </div>

    <label for="emp_image" class="form-label mt-2">Profile image:</label>
    <input type="file" id="emp_image" class="form-control form-control-sm">

    <div class="row">
    <div class="col">
        <label for="emp_uname" class="form-label mt-2">Username:</label>
        <input type="text" id="emp_uname" class="form-control form-control-sm" autocomplete="off">
        <span class="text-danger" id="val_uname"></span>
        </div>
    </div>

    <div class="row">
    <div class="col">
        <label for="emp_pword" class="form-label mt-2">Password:</label>
        <input type="password" id="emp_pword" class="form-control form-control-sm">
        <span class="text-danger" id="val_pword"></span>
        </div>
    </div>

    <div class="row">
    <div class="col">
    <label for="confirm_pass" class="form-label mt-2">Confirm password:</label>
    <input type="password" id="confirm_pass" class="form-control form-control-sm">
    <span class="text-danger" id="val_confirm_pword"></span>
    </div>
</div>

    `;
    document.getElementById("blankModalMainDiv").innerHTML = employeeForm;

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

    var valid = false;

    const emp_fName = document.getElementById('emp_fName').value;
    const emp_lName = document.getElementById('emp_lName').value;
    const emp_image = document.getElementById('emp_image').files[0];
    const emp_uname = document.getElementById('emp_uname').value;
    const emp_password = document.getElementById('emp_pword').value;
    const emp_cpassword = document.getElementById('confirm_pass').value;

    var fnameMsg = document.getElementById('val_fname');
    var lnameMsg = document.getElementById('val_lname');
    var unameMsg = document.getElementById('val_uname');
    var pwordMsg = document.getElementById('val_pword');
    var cpwordMsg = document.getElementById('val_confirm_pword');


    if (emp_fName === "") {
        fnameMsg.innerHTML = "&#42first name is required";
    } else {
        fnameMsg.innerHTML = "";
    }

    if (emp_lName === "") {
        lnameMsg.innerHTML = "&#42last name is required";
    } else {
        lnameMsg.innerHTML = "";
    }

    if (emp_uname === "") {
        unameMsg.innerHTML = "&#42username is required";
    } else {
        unameMsg.innerHTML = "";
    }

    if (emp_password === "") {
        pwordMsg.innerHTML = "&#42password is required";
    } else {
        pwordMsg.innerHTML = "";
    }

    if (emp_cpassword === "") {
        cpwordMsg.innerHTML = "&#42confirm password is required";
    } else {
        cpwordMsg.innerHTML = "";
    }

    // If both fields are valid, set valid to true
    if (emp_fName !== "" && emp_lName !== "" && emp_uname !== "" && emp_password !== "" && emp_cpassword !== "") {
        valid = true;
    }


    let uploadOk  = "";
    // Validate file type
    const allowedFormats = ["jpg", "jpeg", "png"];
    const imageFileType = emp_image.name.split('.').pop().toLowerCase();
    if (!allowedFormats.includes(imageFileType)) {
        uploadOk  += `<p>Invalid file type. Please upload a JPG, JPEG, or PNG image.</p>`;
    }

    // Validate file size
    const maxSize = 900000;
    if (emp_image.size > maxSize) {
        uploadOk  += `<p>File size exceeds the allowed limit. Please upload a smaller image.</p>`;
    }

    var valPassword = "";

        if (
            document.getElementById("emp_pword").value !==
            document.getElementById("confirm_pass").value ||
            document.getElementById("confirm_pass").value !==
            document.getElementById("emp_pword").value
        ) {
            valPassword = "Passwords do not match";
            showNotificationModal(valPassword);
        } else {
            valPassword = "Employee added successfully";
            showNotificationModal(valPassword);
        }
        

        

    if (uploadOk  === "" && valid) { 
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}_${emp_image.name}`;

        const url = 'http://localhost/capstone_project/api/employee.php';

        const formData = new FormData();
        formData.append('emp_fName', emp_fName);
        formData.append('emp_lName', emp_lName);
        formData.append('emp_image', emp_image, uniqueFileName);
        formData.append('emp_uname', emp_uname);
        formData.append('emp_password', emp_password);
        formData.append('operation', 'addEmployee');

        axios({
            url: url,
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            if (response.data.status === 1) {
                showNotificationModal("Employee added successfully");
            } else {
                showNotificationModal(response.data.message);
            }
        }).catch(error => {
            showNotificationModal(error);
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

    document.getElementById("responseModalMainDiv2").innerHTML = "";
    document.getElementById("responseModalMainDiv2").append(closeBtn);

    const responseNotifModal = new bootstrap.Modal(document.getElementById("responseModal"), {
        keyboard: true,
        backdrop: "static"
    });
    responseNotifModal.show();
    
}

    const getEmployee = () => {
        const formData = new FormData();
        formData.append("operation", "getEmployee");

        axios({
            url: "http://localhost/capstone_project/api/employee.php",
            method: "post",
            data: formData
        })
            .then(response => {
                if (response.data.length == 0) {
                    alert("There are no records retrieved.")
                } else {
                    displayRecords(response.data);
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    const displayRecords = (rsUsers) =>{
        const tableRecords = document.getElementById("table-records");
        
        var html = `
            <div class="table-responsive">
            <table class="table align-middle table-striped">
            <thead class="table-dark align-middle text-uppercase">
                <tr>
                <th scope="col">Profile</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">User Role</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
        <tbody>
        `;
        
        rsUsers.forEach(employee=>{
            html +=`
                <tr>
                    <td><img src="/api/${employee.emp_img}" alt="product icon"  width="100px"></td>
                    <td>${employee.emp_fname}</td>
                    <td>${employee.emp_lname}</td>
                    <td>${employee.usr_role}</td>
                    <td>
                        <button data-room-id="#" id="btnEdit" class="btn border-0 text-success p-1"><span class="bi bi-pencil"></span></button>
                        <button data-room-id="#" id="btnDelete" class="btn border-0 text-danger p-1"><span class="bi bi-trash3"></span></button>
                    </td>
                </tr>
            `;
        });
        html += `</tbody></table></div>`;
        
        tableRecords.innerHTML = html;
        
        tableRecords.querySelectorAll('.btnEdit').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            openEditModal(userId);
        });
        });
        
        }
setEventListeners();
getEmployee();
