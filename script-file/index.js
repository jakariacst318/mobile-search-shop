const LoadPhone = async (searchText = 11, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data
    // console.log(phones)
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // step 1 div name set kora 
    const phoneContainer = document.getElementById('phone-container')

    // search korle search fild new item show korbe and  old delete 
    phoneContainer.textContent = ' ';

    // show all button display container
    const showAllButtonContainer = document.getElementById("show-all-container")
    if (phones.length > 10 && !isShowAll) {
        showAllButtonContainer.classList.remove('hidden')
    }
    else {
        showAllButtonContainer.classList.add('hidden')
    }
    // console.log('is show all phone mela', isShowAll)
    if(!isShowAll){
        phones = phones.slice(0, 10);
    }


    //  display only first 10 phone
    // phones = phones.slice(0, 10)

    phones.forEach(phone => {
        // console.log(phone)

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
                <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
    ` ;

        //  step 4 appendChild 
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner( false);
}



//  Show Details container

const handelShowDetails = async (id) => {
    // console.log("hdkghgkhfdgh" , id)
    // load single data 
    const res = await  fetch (` https://openapi.programming-hero.com/api/phone/${id} `);
    const  data = await res.json();
    const phone = data.data;
    
    showAllDetailsModal(phone);
}

const showAllDetailsModal = (phone) => {
    console.log(phone)
    const showDetailsPhoneName = document.getElementById('show-details-phone-name');
    showDetailsPhoneName.innerText = phone.name ;

    const showDetailsContainer = document.getElementById("show-details-container");
    showDetailsContainer.innerHTML =   `
    <img src="${phone.image}" alt="">
    <h3> <span class="text-xl font-semibold">brand:</span>   ${phone.brand}</h3>
    <h3><span class="text-xl font-semibold">storage :</span>  ${phone.mainFeatures.storage }</h3>
    <h3><span class="text-xl font-semibold">display size:</span>  ${phone.mainFeatures.displaySize }</h3>
    <h3><span class="text-xl font-semibold">chipSet:</span>  ${phone.mainFeatures.chipSet }</h3>
    <h3><span class="text-xl font-semibold">memory:</span>  ${phone.mainFeatures.memory }</h3>
    <h3><span class="text-xl font-semibold">slug:</span> ${phone.slug}</h3>
    <h3><span class="text-xl font-semibold">releaseDate:</span> ${phone.releaseDate }</h3>
    <h3><span class="text-xl font-semibold">GPS:</span> ${phone.others.GPS }</h3>
    `;


    show_details_modal.showModal()
}



// handel Search button 

const handleSearchButton = (isShowAll) => {
    toggleLoadingSpinner( true);
    // console.log('guta dice khuja dhor ')
    const searchFild = document.getElementById('search-field');
    const searchText = searchFild.value;
    // console.log(searchText)
    LoadPhone(searchText, isShowAll)
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

// handleShowAll button open
    const handleShowAll = () => {
        handleSearchButton(true)
    }




LoadPhone()

