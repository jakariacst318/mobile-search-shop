const LoadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data
    // console.log(phones)
    displayPhones(phones);
}

const displayPhones = phones => {
    // step 1 div name set kora 
    const phoneContainer = document.getElementById('phone-container')

    // search korle search fild new item show korbe and  old delete 
    phoneContainer.textContent = ' ';

    // show all button display container
    const showAllButtonContainer = document.getElementById("show-all-container")
    if (phones.length > 10) {
        showAllButtonContainer.classList.remove('hidden')
    }
    else {
        showAllButtonContainer.classList.add('hidden')
    }


    //  display only first 10 phone
    phones = phones.slice(0, 10)

    phones.forEach(phone => {
        console.log(phone)

        // step 2 create a div banano
        const phoneCard = document.createElement('div')
        phoneCard.classList = ` card w-96 p-8 bg-gray-200 shadow-xl `;
        //  step 3 innerHTML set kora
        phoneCard.innerHTML = ` 
        <figure><img src="${phone.image}"
                alt="phone" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name
            }</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
    ` ;

        //  step 4 appendChild 
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner( false);
}


// handel Search button 

const handleSearchButton = () => {
    toggleLoadingSpinner( true);
    // console.log('guta dice khuja dhor ')
    const searchFild = document.getElementById('search-field');
    const searchText = searchFild.value;
    console.log(searchText)
    LoadPhone(searchText)
}

const toggleLoadingSpinner = (isLoader) => {
    const loadingSpinner = document.getElementById("loading-spinner")
    if(isLoader){
        loadingSpinner.classList.remove("hidden")
    }
    else{
        loadingSpinner.classList.add("hidden")
    }
}



// LoadPhone()

