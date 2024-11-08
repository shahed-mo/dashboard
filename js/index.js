let title = document.querySelector('.title');
let price = document.querySelector('.num');
let taxes = document.querySelector('.taxes');
let ads = document.querySelector('.ads');
let dis = document.querySelector('.dis');
let total = document.querySelector('#total');
let count = document.querySelector('.count');
let category = document.querySelector('.cat');
let submit = document.querySelector('#submit');
let tbody = document.getElementById('tbody');

let mood = 'create';
let temp;

// Get total
function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +dis.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

// Initialize data
let dataPro = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];

// Create
submit.addEventListener('click', () => {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        dis: dis.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };
    if(title.value !=''
        &&price.value !=''
        &&category.value !=''
        && newPro.count<100
){
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[temp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }
    

    localStorage.setItem('product', JSON.stringify(dataPro));
   
    showData();
});

// Clear data
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    dis.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Display data
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].dis}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick='updateData(${i})' class="update">Update</button></td>
                <td><button onclick='deleteData(${i})' class="delete">Delete</button></td>
            </tr>`;
    }
    tbody.innerHTML = table;

    let deleteAll = document.querySelector('.deletall');
    if (dataPro.length > 0) {
        deleteAll.innerHTML = `<td><button onclick='deleteAll()'>Delete All (${dataPro.length})</button></td>`;
    } else {
        deleteAll.innerHTML = '';
    }
    getTotal();
}

// Show data on load
showData();

// Delete all data
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// Delete single item
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

// Update data
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    dis.value = dataPro[i].dis;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });

}

// search
let searchMood='title';

function getsearchMood(id){
    let search=document.getElementById('search')
    if(id=='searchTitle'){
        searchMood='title'
        
    }
    else{
        searchMood='category'
         
    }
    search.placeholder='Search BY '+searchMood
   search.focus();
   search.value='';
   showData();

    
}
function searchData(value){
    let table='';
    for(let i=0;i<dataPro.length;i++){

    if(searchMood=='title'){

           if(dataPro[i].title.includes(value.toLowerCase())){

            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].dis}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick='updateData(${i})' class="update">Update</button></td>
                <td><button onclick='deleteData(${i})' class="delete">Delete</button></td>
            </tr>`;
           }

        
    }

    else{


            if(dataPro[i].category.includes(value.toLowerCase())){
 
             table += `
             <tr>
                 <td>${i + 1}</td>
                 <td>${dataPro[i].title}</td>
                 <td>${dataPro[i].price}</td>
                 <td>${dataPro[i].taxes}</td>
                 <td>${dataPro[i].ads}</td>
                 <td>${dataPro[i].dis}</td>
                 <td>${dataPro[i].total}</td>
                 <td>${dataPro[i].category}</td>
                 <td><button onclick='updateData(${i})' class="update">Update</button></td>
                 <td><button onclick='deleteData(${i})' class="delete">Delete</button></td>
             </tr>`;
            }
 
         

    }}
    tbody.innerHTML = table;
}

//cleanData

