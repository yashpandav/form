let data = JSON.parse(localStorage.getItem("data")) || [];
let tb = document.getElementById("final-container");

function add() {    
     localStorage.setItem("data", JSON.stringify(data));
     let dataw = JSON.parse(localStorage.getItem("data")) || [];
     let tbody = document.querySelector(".t-body");
     let insert = "";

     dataw.forEach(element => {
          let editBtnEnabled = element.edit === false ? 'disabled' : '';
          let delBtnEnabled = element.delete === false ? 'disabled' : '';
          let confirm = element.confirmBtn === true ? `confirmData(${element.id})` : `confirmed(${element.id})`;

          insert += `<tr">
               <td>${element.fn}</td>
               <td>${element.ln}</td>
               <td>${element.gender}</td>
               <td>${element.number}</td>
               <td>${element.city}</td> 
               <td><button type="button" id="editBtn" class="btn bg-info text-white" ${editBtnEnabled} onclick="{edit(${element.id})}">Edit</button></td>
               <td><button type="button" id="deleteBtn" class="btn bg-danger text-white"  ${delBtnEnabled} onclick="{remove(${element.id})}">Delete</button></td>
               <td><button type="button" id="${element.id}" class="btn bg-success text-white" onclick="${confirm}">Confirm</button></td>
          </tr>`;
     });
     tbody.innerHTML = insert;
}

function edit(id) {
     tb.style.display = 'none';
     let currentData = data.find(elements => elements.id === id);
     let form = document.getElementById("editform");
     form.style.display = "";
     
     let fn = document.getElementById("fn");
     fn.value = currentData.fn;

     let ln = document.getElementById("ln");
     ln.value = currentData.ln;

     let genderRadio = document.querySelectorAll('input[name="gender"]');
     if (currentData.gender == "Male") genderRadio[0].checked = true;
     else if (currentData.gender == "Female") genderRadio[1].checked = true;
     else genderRadio[2].checked = true;

     let number = document.querySelector("#number");
     number.value = currentData.number;

     let city = document.getElementById("city");
     city.value = currentData.city;

     let submitBtn = document.getElementById("submit");
     submitBtn.addEventListener("click", () => {
          let idEdit = currentData.id;
          let firstName = fn.value;
          let lastName = ln.value;
          let genderEdi = document.querySelector('input[name="gender"]:checked').value;
          let ct = city.value;
          let nmber = number.value;

          let newObj = {
               id: idEdit,
               fn: firstName,
               ln: lastName,
               gender: genderEdi,
               number: nmber,
               city: ct, 
               edit : true,
               delete : true , 
               confirmBtn : true
          }

          let index = data.findIndex(ele => ele.id === idEdit);
          data[index] = newObj;
          add();
          form.style.display = "none";
          tb.style.display = '';
     });

     let cancelBtn = document.getElementById("cancel");
     cancelBtn.addEventListener("click",() => {
          form.style.display = "none";
          tb.style.display = '';
     });
}

function remove(id){
     let c = confirm("Are you sure you want to Delete this data ?");
     if(c){
          data = data.filter(ele => ele.id !== id);
          add();   
     } 
}

function confirmData(id){
     let c = confirm("Are you sure you want to confirm this data ?");
     if(c){
          let idx = data.findIndex(ele => ele.id === id);

          data[idx].edit = false;
          data[idx].delete = false;
          data[idx].confirmBtn = false;
          
          localStorage.setItem("data", JSON.stringify(data));

          add();
     }    
}

function confirmed(id) {
     alert("The data has already been confirmed");
}
