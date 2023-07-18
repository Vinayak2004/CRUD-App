function validateForm() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
  
    if (name == "") {
      alert("Name is required");
      return false;
    }
  
    if (age == "") {
      alert("Age is required");
      return false;
    } else if (age < 1) {
      alert("Age must be greater than 0");
      return false;
    }
  
    if (address == "") {
      alert("Address is required");
      return false;
    }
  
    if (email == "") {
      alert("Email is required");
      return false;
    } else if (!email.includes("@")) {
      alert("Invalid email address");
      return false;
    }
    return true;
  }
  
  let originalData = []; // Variable to store the original data
  let currentPage = 1;
  const recordsPerPage = 5;
  
  function showData() {
    let list;
    if (localStorage.getItem("list") === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem("list"));
      originalData = list.slice(); // Store the original data
    }
  
    // Get the filter values
    let filterName = document.getElementById("filterName").value.toLowerCase();
    let filterAge = document.getElementById("filterAge").value.toLowerCase();
    let filterAddress = document.getElementById("filterAddress").value.toLowerCase();
  
    // Filter the data based on the filter values
    let filteredData = originalData.filter(function (item) {
      return (
        item.name.toLowerCase().includes(filterName) &&
        item.age.toString().toLowerCase().includes(filterAge) &&
        item.address.toLowerCase().includes(filterAddress)
      );
    });
  
    // Sort the data based on the selected sorting option
    let sortOption = document.getElementById("sortOption").value;
    switch (sortOption) {
      case "nameAsc":
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        filteredData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "ageAsc":
        filteredData.sort((a, b) => a.age - b.age);
        break;
      case "ageDesc":
        filteredData.sort((a, b) => b.age - a.age);
        break;
      case "addressAsc":
        filteredData.sort((a, b) => a.address.localeCompare(b.address));
        break;
      case "addressDesc":
        filteredData.sort((a, b) => b.address.localeCompare(a.address));
        break;
    }
  
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
  
    let html = "";
    paginatedData.forEach(function (element, index) {
      html += "<tr>";
      html += "<td>" + element.name + "</td>";
      html += "<td>" + element.age + "</td>";
      html += "<td>" + element.address + "</td>";
      html += "<td>" + element.email + "</td>";
      html +=
        '<td><button onclick="deleteData(' +
        index +
        ')" class="btn btn-danger">Delete</button>    <button onclick="updateData(' +
        index +
        ')" class="btn btn-warning m-2">Edit</button></td>';
      html += "</tr>";
    });
  
    document.querySelector("#crudTable tbody").innerHTML = html;
  
    updatePagination(Math.ceil(filteredData.length / recordsPerPage));
  }
  
  function updatePagination(totalPages) {
    let paginationHtml = "";
  
    for (let i = 1; i <= totalPages; i++) {
      paginationHtml += `<li class="page-item ${
        i === currentPage ? "active" : ""
      }">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>`;
    }
  
    document.querySelector("#pagination").innerHTML = paginationHtml;
  }
  
  function changePage(pageNumber) {
    currentPage = pageNumber;
    showData();
  }
  
  document.onload = showData();
  
  function AddData() {
    if (validateForm() == true) {
      let name = document.getElementById("name").value;
      let age = document.getElementById("age").value;
      let address = document.getElementById("address").value;
      let email = document.getElementById("email").value;
  
      let list;
      if (localStorage.getItem("list") == null) {
        list = [];
      } else {
        list = JSON.parse(localStorage.getItem("list"));
      }
      list.push({
        name: name,
        age: age,
        address: address,
        email: email,
      });
      localStorage.setItem("list", JSON.stringify(list));
      showData();
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("address").value = "";
      document.getElementById("email").value = "";
    }
  }
  
  function deleteData(index) {
    let list;
    if (localStorage.getItem("list") == null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem("list"));
    }
  
    // Display a confirmation dialog before deleting the data
    let confirmDelete = confirm("Are you sure you want to delete this data?");
  
    if (confirmDelete) {
      list.splice(index, 1);
      localStorage.setItem("list", JSON.stringify(list));
      showData();
    }
  }
  
  function updateData(index) {
    console.log("edit clicked");
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";
  
    let list;
    if (localStorage.getItem("list") == null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem("list"));
    }
  
    document.getElementById("name").value = list[index].name;
    document.getElementById("age").value = list[index].age;
    document.getElementById("address").value = list[index].address;
    document.getElementById("email").value = list[index].email;
  
    document.querySelector("#update").onclick = function () {
      if (validateForm() == true) {
        list[index].name = document.getElementById("name").value;
        list[index].age = document.getElementById("age").value;
        list[index].address = document.getElementById("address").value;
        list[index].email = document.getElementById("email").value;
  
        localStorage.setItem("list", JSON.stringify(list));
        showData();
  
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
  
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
      }
    };
  }
  
  document.getElementById("filterName").addEventListener("input", function () {
    currentPage = 1;
    showData();
  });
  
  document.getElementById("filterAge").addEventListener("input", function () {
    currentPage = 1;
    showData();
  });
  
  document.getElementById("filterAddress").addEventListener("input", function () {
    currentPage = 1;
    showData();
  });
  
  document.getElementById("sortOption").addEventListener("change", function () {
    currentPage = 1;
    showData();
  });
  