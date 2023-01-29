loadContacts();
let i = 0;
let contactId = 0;

const addContactBtn = document.getElementById("add-contact");
const delContactBtn = document.getElementById("del-contact");
const updateContactBtn = document.getElementById("update-contact");

addContactBtn.addEventListener("click", e => {
    addContact();
});

delContactBtn.addEventListener("click", e => {
    deleteContact();
});

updateContactBtn.addEventListener("click", e => {
    updateContact();
});


function addContact() {
    let url = urlBase + "/AddContact." + extension;
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let phoneNumber = document.getElementById("phone-number").value;
    let email = document.getElementById("email").value;

    let tmp = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
        email: email
    };

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(tmp)
    }).then(res => {
        if (res.ok) {
            loadContacts();
        } else {
            console.log("Contact could not be added");
        }
    }).catch(error => console.log("Network error"));

    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("phone-number").value = "";
    document.getElementById("email").value = "";

}

function loadContacts() {
    readCookie();
    let url = urlBase + "/LoadContacts." + extension;
    let tmp = { userId: userId };

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(tmp)
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            console.log("Contact(s) could not be loaded");
        }
    }).then(data => {
        for (i; i < Object.keys(data.results).length; i++) {
            displayNewContact(data.results[i].ID, data.results[i].firstName, data.results[i].lastName, data.results[i].phone, data.results[i].email);
        }
    }).catch(error => console.log("Network error"));
}

function deleteContact() {
    let url = urlBase + "/DeleteContact." + extension;
    let tmp = { ID: contactId };

    fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(tmp)
    }).then(res => {
        if (res.ok) {
            console.log("Contact deleted");
            document.querySelectorAll("[data-id]").forEach(e => {
                if (e.getAttribute("data-id") == contactId) {
                    e.remove();
                }
            });
        } else {
            console.log("Contact could not be deleted");
        }
    }).catch(error => console.log("Network error"));
}

function updateContact() {
    let firstName = document.getElementById("update-first-name").value;
    let lastName = document.getElementById("update-last-name").value;
    let phoneNumber = document.getElementById("update-phone-number").value;
    let email = document.getElementById("update-email").value;

    let url = urlBase + "/UpdateContact." + extension;

    let tmp = {
        ID: contactId,
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
        email: email
    };

    fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(tmp)
    }).then(res => {
        if (res.ok) {
            document.getElementById("update-first-name").value = "";
            document.getElementById("update-last-name").value = "";
            document.getElementById("update-phone-number").value = "";
            document.getElementById("update-email").value = "";
        
            window.location.reload();
        } else {
            console.log("Contact could not be updated");
        }
    }).catch(error => console.log("Network error"));
}

function displayNewContact(ID, firstName, lastName, phoneNumber, email) {
    let div = document.createElement("div");
    div.classList.add("col");
    let contactCards = document.getElementsByClassName("row")[0];
    div.innerHTML = `
        <div class="card text-bg-light mb-3 contact-card" data-id="${ID}" data-bs-toggle="modal" data-bs-target="#updateContactBackdrop">
            <div class="card-header">${firstName} ${lastName}</div>
            <div class="card-body">
                <h5 class="card-title">Email: ${email} </h5>
                <h5 class="card-title">Phone Number: ${phoneNumber} </h5>
                <p class="card-text"></p>
            </div>
        </div>
    `
    contactCards.append(div);

    div.firstElementChild.addEventListener("click", e => {
        contactId = e.currentTarget.getAttribute("data-id");
    }, true);
}

