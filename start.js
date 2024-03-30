let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", submit);

let fn = document.getElementById("fn");
let ln = document.getElementById("ln");
let genderRadio = document.querySelectorAll('input[name="gender"]');
let number = document.querySelector("#number");
let city = document.getElementById("city");



function submit(event) {
     let mainData = JSON.parse(localStorage.getItem("data")) || [];
     counter = mainData.length * Math.random() * 100;
     let isSelect = false;
     for (let i = 0; i < genderRadio.length; i++) {
          if (genderRadio[i].checked) {
               isSelect = true;
               break;
          }
     }

     if (fn.value === "" || ln.value === "" || !isSelect || number.value === "") {
          alert("Please enter valid details");
          event.preventDefault();
          return;
     }

     let formData = {
          id: counter,
          fn: fn.value,
          ln: ln.value,
          gender: document.querySelector('input[name="gender"]:checked').value,
          number: number.value,
          city: city.value , 
          edit :true,
          delete : true , 
          confirmBtn : true
     }
     mainData.push(formData); 
     localStorage.setItem("data", JSON.stringify(mainData));
     alert("Form data submitted successfully!");
}