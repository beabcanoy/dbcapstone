const setEventListeners = () => {
    document.getElementById("btnLogin").addEventListener("click", (event) => {
        event.preventDefault(); // prevent default behavior
        login();
    });
}

const login = () => {
    var valid = false; // Initialize as false
    var url = "http://localhost/capstone_project/api/addemployee.php";

    var username = document.getElementById('employeeUsername').value.trim();
    var password = document.getElementById('employeePassword').value.trim();
    var unameMsg = document.getElementById('uname');
    var pwordMsg = document.getElementById('pword');
    const msg = document.getElementById('error-message');

    // Perform validation
    if (username === "") {
        unameMsg.innerHTML = "&#42; Username is required";
    } else {
        unameMsg.innerHTML = "";
    }

    if (password === "") {
        pwordMsg.innerHTML = "&#42; Password is required";
    } else {
        pwordMsg.innerHTML = "";
    }

    // If both fields are valid, set valid to true
    if (username !== "" && password !== "") {
        valid = true;
    }

    if (valid) {
        // Continue with the login process
        const json = {
            username: username,
            password: password
        }

        const formData = new FormData();
        formData.append("json", JSON.stringify(json));
        formData.append("operation", "login");

        axios({
            url: url,
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(response => {
            if (response.data !== 0) {
                window.location = '/employee/dashboard.html';
            } else {
                // Display error message
                const userForm = `<p>Invalid username or password</p>`;
                document.getElementById("blankModalMainDiv").innerHTML = userForm;

                // Create and append the close button
                const closeBtn = document.createElement("button");
                closeBtn.innerText = "OK";
                closeBtn.classList.add("btn", "text-primary", "border-0", "w-25");
                closeBtn.setAttribute("data-bs-dismiss", "modal");
                document.getElementById("blankModalMainDiv2").innerHTML = "";
                document.getElementById("blankModalMainDiv2").append(closeBtn);

                // Show the modal
                const myModal = new bootstrap.Modal(document.getElementById('blankModal'), {
                    keyboard: true,
                    backdrop: "static"
                });
                myModal.show();

                // Reset input fields and messages after OK is clicked
                document.getElementById('employeeUsername').value = "";
                document.getElementById('employeePassword').value = "";
                unameMsg.innerHTML = "";
                pwordMsg.innerHTML = "";
            }
        }).catch(error => {
            console.error(error);
            // Display a more user-friendly error message
            alert("An error occurred during login. Please try again.");
        })
    }
}

setEventListeners();