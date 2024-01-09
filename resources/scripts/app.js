const headeApp = document.getElementById(`header-app`);
const mainApp = document.getElementById(`main-app`);
const footerApp = document.getElementById(`footer-app`);
const loader = document.querySelector(`.loader-wrapper`);
const metaDescription = document.querySelector('meta[name="description"]');

let youtubeVideoID;
let language = '';
let businessesCardList;
let categoryCheckbox = "";
let productCheckbox = "";
let username = 'linkedivo';
let searchFilter = "";
let page = '';
let indexCategoriesFilterdList = "";
let titleOfDropdowns;
///////////////////////////////////////////////////////////////// Routing

async function renderPage(pathname) {
    // console.log(pathname)
    switch (pathname) {
        case "/":
            page = "/";
            indexPageMaker();
            toTopNavigator();

            // console.log('check1');
            break;
        case "/explorer":
            page = "/explorer";
            explorerPageMaker();
            toTopNavigator();

            // console.log('check2');
            break;
        // Add more cases for other paths
        default:
            // console.log('check3');
            await businessUsernamesChecker(pathname);
        // app.innerHTML = "<h1>404 - Not Found</h1>";
    }
}

function navigate() {
    const pathname = window.location.pathname.toLowerCase();
    // history.pushState(null, null, `/${element.dataset.username}`);
    renderPage(pathname);
}
// Listen to changes in the URL
window.addEventListener("popstate", navigate);
navigate();





//////////////////////////////////////
// page loader
window.onload = function () {
    loader.style.display = "none";
};



/////////////////////////////////////////////////////////// main page Maker
function indexPageMaker() {
    indexCategoriesFilterdList = "";
    // main page - header area
    headeApp.classList.remove('theme-reverse');
    headeApp.classList.add('theme');
    headeApp.innerHTML = `   <nav class="main-header-nav">
            <div class="join-businesses">
            
                       <a href="https://forms.gle/ncpQ5USeTEgTYA6g8" target="_blank" >   <h2 data-lang="joinAsProducer"> Join as Producer </h2>
                       </a>

            </div>

            <div class="nav-tools theme-text">
                <!-- languages -->
                        <div class="language-wrapper">
                            <span class="theme-reverse language-button-container">
                                <span class="language-button theme" data-lang="language">EN</span>
                            </span>
                            <div class="languages theme-reverse box-shadow ">
                             <span data-lang="english" class="lang-item">English</span>
                                <span data-lang="persian" class="lang-item">Persian</span>
                                <span data-lang="arabic" class="lang-item">Arabic</span>
                            </div>
                        </div>
                <!--
                    <div class="language-wrapper">
                        <i class="fa fa-globe language-button"></i>
                        <div class="languages">
                            <span data-lang="persian" class="lang-item">Persian</span>
                            <span data-lang="english" class="lang-item">English</span>
                            <span data-lang="arabic" class="lang-item">Arabic</span>
                        </div>
                    </div>
                -->
                <i class="fa fa-moon  dark-button-theme"></i>
                <i class="fa fa-sun  light-button-theme"></i>
            </div>
        </nav>`;

    // main page - main area
    mainApp.classList.add(`theme`);
    mainApp.innerHTML = `
        <div class="main-main-wrapper">
            <div class="logo-wrapper">
                <img src="resources/images/gcctrade-logo-dark.svg" class="main-logo" alt="GCC Trade Logo">
            </div>
            <form action="" class="search-bar">
                <i class="fa fa-angle-down theme-text category-dropdown"></i>
                <i class="fa fa-angle-up theme-text category-dropup"></i>
                <input type="text" class="theme-text" placeholder="Search product..." data-lang="searchPlaceHolder">
                <button type="submit" class="button">
                    <i class="fa fa-search search-console-search-icon theme-text"></i>
                </button>
                <div class="categories-wrapper  box-shadow ">
                     <div class="dropdown-content  "></div>
                </div>
          
            </form>
             <div class="button-wrapper">
                <div class="button-transparent theme-text about-button" data-lang="aboutGccButton">About GCCTrade</div>
                <div class="button-transparent theme-text explorer-button" data-lang="exploreButton">Explore More</div>
            </div>
            <h1 data-lang="slogan">GCC Trade, Your Path to Arab Markets</h1>
        

          <div class="country-flags-wrapper">
            <div class="country-flag-card " data-name="oman">
                <img src="resources/images/Flag_of_Oman.png" alt="Oman">
            </div>

            <div class="country-flag-card" data-name="saudiArabia">
                <img src="resources/images/Flag_of_Saudi_Arabia.png" alt="Saudi Arabia">
            </div>

            <div class="country-flag-card" data-name="unitedArabEmirates">
                <img src="resources/images/Flag_of_the_United_Arab_Emirates.png" alt="United Arab Emirates">
            </div>

            <div class="country-flag-card" data-name="qatar">
                <img src="resources/images/Flag_of_Qatar.png" alt="Qatar">
            </div>

            <div class="country-flag-card" data-name="kuwait">
                <img src="resources/images/Flag_of_Kuwait.png" alt="Kuwait">
            </div>

            <div class="country-flag-card" data-name="bahrain">
                <img src="resources/images/Flag_of_Bahrain.png" alt="Bahrain">
            </div>
        
           </div>

            </div>
`;

    //main page search console
    const buttonDropdown = document.querySelector(`.category-dropdown`);
    const buttonDropup = document.querySelector(`.category-dropup`);
    const categoryWrapper = document.querySelector(`.categories-wrapper`);



    const homeFormSubmit = document.querySelector(`.search-bar`);
    const homeExploreButton = document.querySelector(`.search-bar button`);
    const searchFieldHome = document.querySelector(`.search-bar input`)

    homeExploreButton.addEventListener('click', function (e) {
        e.preventDefault();
        searchFilter = searchFieldHome.value.trim().toLowerCase();
        // console.log(categoryCheckbox)
        if (searchFilter || categoryCheckbox.length !== 0) {
            // console.log(searchFilter);
            history.pushState(null, null, `/explorer`);
            renderPage(`/explorer`);
        } else {
            notification('Enter Something')
        }

    })

    homeFormSubmit.addEventListener('submit', function (e) {
        e.preventDefault();
        searchFilter = searchFieldHome.value.trim().toLowerCase();

        // console.log(searchFieldHome.value);
        if (searchFilter || categoryCheckbox.length !== 0) {
            // console.log(searchFilter);
            history.pushState(null, null, `/explorer`);
            renderPage(`/explorer`);
        } else {
            notification('Enter Something')
        }
    })
    searchFieldHome.focus();



    // flag event click
    const flags = document.querySelectorAll(`.country-flag-card`);
    flags.forEach(elem => {
        elem.addEventListener('click', function (element) {
            // console.log();
            countryInfo(element.target.dataset.name);
        })
    })
    // function country flag info popup maker
    // function countryInfo(name) {

    //     const language = localStorage.getItem('language');
    //     const url = `resources/information/general/countries/${language}.json`;

    async function countryInfo(name) {
        const language = localStorage.getItem('language');
        const url = `resources/information/general/countries/${language}.json`;

        try {
            const response = await fetch(url);
            const countryData = await response.json();

            // Use countryData to access information for the specific country (e.g., "name")
            const countryInfo = countryData.countries[name];
            console.log(countryInfo)
            // Create the countryPopupWrapper and populate it with the fetched data
            const countryPopupWrapper = document.createElement('div');
            countryPopupWrapper.classList.add("country-info-wrapper", "box-shadow");
            // Populate countryPopupWrapper using countryInfo

            countryPopupWrapper.innerHTML = `
            <div class="country-info-close">
                <h3 data-lang="countryName">${countryInfo.name}</h3>

                <i class="fa fa-times"></i>
            </div>
            <div class="country-info">

                <div class="country-info-table">
                    <!-- single tabel info -->
                    <div class="country-info-card">
                        <span class="info-title" data-lang="countryCapitalTitle">${countryInfo.capital.title}</span>
                        <span class="info-details" data-lang="countryCapitalInfo">${countryInfo.capital.name}</span>
                    </div>
                    <!-- single tabel info -->
                    <div class="country-info-card">
                        <span class="info-title" data-lang="countryAreaTitle">${countryInfo.area.title}</span>
                        <span class="info-details" data-lang="countryAreaInfo">${countryInfo.area.total}</span>
                    </div>
                    <!-- single tabel info -->
                    <div class="country-info-card">
                        <span class="info-title" data-lang="countryPopulationTitle">${countryInfo.population.title}</span>
                        <span class="info-details" data-lang="countryPopulationInfo">
                            Total: ${countryInfo.population.total}
                            <br> Density: ${countryInfo.population.density}
                        </span>
                    </div>
                    <!-- single tabel info -->
                    <div class="country-info-card">
                        <span class="info-title" data-lang="countryGdpPppTitle">${countryInfo.gdpPpp.title}</span>
                        <span class="info-details" data-lang="countryGdpPppInfo">
                            Total: ${countryInfo.gdpPpp.total}
                            <br> PerCapita: ${countryInfo.gdpPpp.perCapita}
                        </span>
                    </div>
                    <!-- single tabel info -->
                    <div class="country-info-card">
                        <span class="info-title" data-lang="countryGdpNominalTitle">${countryInfo.gdpNominal.title}</span>
                        <span class="info-details" data-lang="countryGdpNominalInfo">
                            Total: ${countryInfo.gdpNominal.total}
                            <br> PerCapita: ${countryInfo.gdpNominal.perCapita}
                        </span>
                    </div>

                    <!-- single tabel info -->
                    <div class="country-info-card">
                        <span class="info-title" data-lang="countryHdiTitle">${countryInfo.hdi.title}</span>
                        <span class="info-details" data-lang="countryHdiInfo">${countryInfo.hdi.total}</span>
                    </div>
                    <!-- single tabel info -->
                    <div class="country-info-card">
                        <span class="info-title" data-lang="countryCurrencyTitle">${countryInfo.currency.title}</span>
                        <span class="info-details" data-lang="countryCurrencyInfo">${countryInfo.currency.total}</span>
                    </div>
                    <!-- single tabel info -->
                    <div class="country-info-card">
                        <span class="info-title" data-lang="countryCurrencyTitle">${countryInfo.timeZone.title}</span>
                        <span class="info-details" data-lang="countryCurrencyInfo">${countryInfo.timeZone.total}</span>
                    </div>

                </div>
                <div class="country-map">
                    <img src="resources/images/map-${name}.png" alt="map of ${countryInfo.name}">
                </div>
            </div>
        `
            document.body.appendChild(countryPopupWrapper);

            // Event listeners for closing the popup
            const closeIcon = countryPopupWrapper.querySelector('.fa-times');
            const closePopup = () => {
                countryPopupWrapper.remove();
            };

            closeIcon.addEventListener('click', (event) => {
                event.stopPropagation();
                closePopup();
            });

            document.addEventListener('mousedown', (event) => {
                setTimeout(() => {
                    const isClickInsidePopup = countryPopupWrapper.contains(event.target);
                    if (!isClickInsidePopup) {
                        closePopup();
                    }
                }, 0);
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    closePopup();
                }
            });
        } catch (error) {
            console.error('Error fetching country information', error);
        }
    }






    // const countryPopupWrapper = document.createElement('div');
    // countryPopupWrapper.classList.add("country-info-wrapper", "box-shadow");
    // countryPopupWrapper.innerHTML = `
    //     <div class="country-info-close">
    //         <h3 data-lang="countryName">${name}</h3>

    //         <i class="fa fa-times"></i>
    //     </div>
    //     <div class="country-info">

    //         <div class="country-info-table">
    //             <!-- single tabel info -->
    //             <div class="country-info-card">
    //                 <span class="info-title" data-lang="countryCapitalTitle">Capital</span>
    //                 <span class="info-details" data-lang="countryCapitalInfo">Muscat</span>
    //             </div>
    //             <!-- single tabel info -->
    //             <div class="country-info-card">
    //                 <span class="info-title" data-lang="countryAreaTitle">Area</span>
    //                 <span class="info-details" data-lang="countryAreaInfo">309,500 km2 (119,500 sq mi)</span>
    //             </div>
    //             <!-- single tabel info -->
    //             <div class="country-info-card">
    //                 <span class="info-title" data-lang="countryPopulationTitle">Population</span>
    //                 <span class="info-details" data-lang="countryPopulationInfo">
    //                     Total: 2021 estimate: 4,520,471 (125th)
    //                     <br> Density: 15/km2 (38.8/sq mi) (177th)
    //                 </span>
    //             </div>
    //             <!-- single tabel info -->
    //             <div class="country-info-card">
    //                 <span class="info-title" data-lang="countryGdpPppTitle">GDP (PPP)</span>
    //                 <span class="info-details" data-lang="countryGdpPppInfo">
    //                     Total: 2023 estimate: $200.295 billion (78th)
    //                     <br> PerCapita: $39,336 (71st)
    //                 </span>
    //             </div>
    //             <!-- single tabel info -->
    //             <div class="country-info-card">
    //                 <span class="info-title" data-lang="countryGdpNominalTitle">GDP (Nominal)</span>
    //                 <span class="info-details" data-lang="countryGdpNominalInfo">
    //                     Total:2023 estimate: $108.282 billion (66th)
    //                     <br> PerCapita: $21,265 (55th)
    //                 </span>
    //             </div>

    //             <!-- single tabel info -->
    //             <div class="country-info-card">
    //                 <span class="info-title" data-lang="countryHdiTitle">HDI</span>
    //                 <span class="info-details" data-lang="countryHdiInfo">0.816 very high (54th)</span>
    //             </div>
    //             <!-- single tabel info -->
    //             <div class="country-info-card">
    //                 <span class="info-title" data-lang="countryCurrencyTitle">Currency</span>
    //                 <span class="info-details" data-lang="countryCurrencyInfo">Omani rial (OMR)</span>
    //             </div>
    //             <!-- single tabel info -->
    //             <div class="country-info-card">
    //                 <span class="info-title" data-lang="countryCurrencyTitle">Time Zone</span>
    //                 <span class="info-details" data-lang="countryCurrencyInfo">UTC+4 (GST)</span>
    //             </div>

    //         </div>
    //         <div class="country-map">
    //             <img src="resources/images/map-oman.png" alt="map of Oman">
    //         </div>
    //     </div>
    // `
    // document.body.appendChild(countryPopupWrapper);

    // //close icon and its event
    // const closeIcon = countryPopupWrapper.querySelector('.fa-times');
    // const closePopup = () => {
    //     countryPopupWrapper.remove(); // Remove the popup from the DOM
    // };

    // closeIcon.addEventListener('click', (event) => {
    //     event.stopPropagation();
    //     closePopup();
    // });

    // // Event listener to close the popup when clicking outside of it
    // document.addEventListener('mousedown', (event) => {
    //     setTimeout(() => {
    //         const isClickInsidePopup = countryPopupWrapper.contains(event.target);
    //         if (!isClickInsidePopup) {
    //             closePopup();
    //         }
    //     }, 0);
    // });

    // // Event listener to close the popup on "Escape" key press
    // document.addEventListener('keydown', (event) => {
    //     if (event.key === 'Escape') {
    //         closePopup();
    //     }
    // });

    // console.log(countryPopupWrapper);

    // }

    // Function to show the category wrapper and toggle buttons
    function showCategoryWrapper() {
        const categoryDropdown = document.querySelector('.main-main-wrapper .dropdown-content');

        if (categoryWrapper) {
            categoryWrapper.style.display = 'flex';
            categoryDropdown.style.display = 'flex';
        }
        if (buttonDropdown) {
            buttonDropdown.style.display = 'none';
            categoryDropdown.style.display = 'none';
        }
        if (buttonDropup) {
            buttonDropup.style.display = 'flex';
            categoryDropdown.style.display = 'flex';
        }
    }

    // Function to hide the category wrapper and toggle buttons
    function hideCategoryWrapper() {
        if (categoryWrapper) {
            categoryWrapper.style.display = 'none';
        }
        if (buttonDropdown) {
            buttonDropdown.style.display = 'flex';
        }
        if (buttonDropup) {
            buttonDropup.style.display = 'none';
        }
    }

    // Event listener for dropdown button click
    if (buttonDropdown) {
        buttonDropdown.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevents the click event from bubbling to the document
            showCategoryWrapper();
        });
    }


    // Event listener for dropup button click
    if (buttonDropup) {
        buttonDropup.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevents the click event from bubbling to the document
            hideCategoryWrapper();
        });
    }


    // Event listener for clicks on the document
    document.addEventListener('click', function () {
        hideCategoryWrapper();
    });

    // Prevent category wrapper from hiding when clicking inside it
    if (categoryWrapper) {
        categoryWrapper.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevents the click event from bubbling to the document
        });
    }


    //function -  dropdown maker use in filter of Index page
    function dropDownMakerIndex() {

        categoryCheckbox = "";
        indexCategoriesFilterdList = "";
        language = localStorage.getItem('language');
        const jsonFile = `resources/information/general/categories/${language}.json`;
        fetch(jsonFile)
            .then(response => response.json())
            .then(data => {

                // category dropdown
                const categories = data.categories; // Assuming the JSON structure has a 'categories' array
                const categoryDropdown = document.querySelector('.main-main-wrapper .dropdown-content');
                categoryDropdown.innerHTML = ''; // Clear previous content if needed
                categories.forEach(category => {
                    categoryDropdown.innerHTML += `
                    <label for="category-${category.slug}">
                    <span>${category.title}</span>
                    <input type="checkbox" name="category-${category.slug}" id="category-${category.slug}" value="${category.id}" data-type="category">
                    </label>
                `;

                });

                // Get all category checkboxes
                const categoryCheckboxes = document.querySelectorAll('input[data-type="category"]');
                // Add change event listener to each category checkbox
                categoryCheckboxes.forEach(checkbox => {
                    categoryCheckbox = Array.from(document.querySelectorAll('input[data-type="category"]'))
                        .map(checkbox => checkbox.value);

                    checkbox.addEventListener('change', function () {
                        const selectedCategories = Array.from(document.querySelectorAll('input[data-type="category"]:checked'))
                            .map(checkbox => checkbox.value);
                        if (selectedCategories.length === 0) {
                            // categoryCheckbox = Array.from(document.querySelectorAll('input[data-type="category"]'))
                            //     .map(checkbox => checkbox.value);
                            categoryCheckbox = [];
                            // console.log(categoryCheckbox);
                        } else {
                            categoryCheckbox = selectedCategories;
                            console.log(categoryCheckbox);
                            history.pushState(null, null, `/explorer`);
                            renderPage(`/explorer`);

                        }
                        // console.log(categoryCheckbox)
                        indexCategoriesFilterdList = categoryCheckbox;
                    });
                });

            })
            .catch(error => console.error('Error fetching JSON:', error));

    }



    // go to explorer page button add event listener
    const explorerButton = document.querySelector(`.explorer-button`);
    explorerButton.addEventListener(`click`, () => {
        history.pushState(null, null, `/explorer`);
        renderPage(`/explorer`);
    })

    // go to about page button add event listener
    const aboutButton = document.querySelector(`.about-button`);
    aboutButton.addEventListener(`click`, () => {
        notification('Will Available soon')
    })


    dropDownMakerIndex();
    appInit();
}

/////////////////////////////////////////////////////////// explorer page maker

function explorerPageMaker() {
    // explorer page - header area
    headeApp.classList.add('theme-reverse');
    headeApp.classList.remove('theme');
    headeApp.innerHTML = `
    <nav class="main-header-nav  explorer-header-nav ">
        <div class="nav-logo">
            <img src="resources/images/gcctrade-logo-light.svg" alt="GCC Trade Logo" class="nav-logo-img" />
        </div>

        <div class="nav-tools theme-text-reverse">
                        <!--  <div class="button-transparent theme-text-reverse" data-lang="joinAsProducer">Join As Producer</div> -->
        <a href="https://forms.gle/ncpQ5USeTEgTYA6g8" target="_blank" class="button-transparent theme-text-reverse" data-lang="joinAsProducer">Join As Producer</a>

              <!-- languages -->
                        <div class="language-wrapper">
                            <span class="theme-reverse language-button-container">
                                <span class="language-button theme" data-lang="language">EN</span>
                            </span>
                            <div class="languages theme-reverse box-shadow ">
                                <span data-lang="english" class="lang-item">English</span>
                                <span data-lang="persian" class="lang-item">Persian</span>
                                <span data-lang="arabic" class="lang-item">Arabic</span>
                            </div>
                        </div>
                <!--
                    <div class="language-wrapper">
                        <i class="fa fa-globe language-button"></i>
                        <div class="languages">
                            <span data-lang="persian" class="lang-item">Persian</span>
                            <span data-lang="english" class="lang-item">English</span>
                            <span data-lang="arabic" class="lang-item">Arabic</span>
                        </div>
                    </div>
                -->
            <i class="fa fa-moon  dark-button-theme"></i>
            <i class="fa fa-sun  light-button-theme"></i>
        </div>
    </nav>
`;



    // explorer page - main area
    mainApp.classList.add(`theme`);
    mainApp.innerHTML = `
      <div class="explorer-main-business theme-text">

            <div class="explorer-heading">
                <h2 data-lang="explorerPageTitle">Product Explorer</h2>

                <div class="explorer-search-field">

                    <div class="explorer-filter">

                        <div class="filter-categories box-shadow filter-card">
                            <div class="filter-selector">
                                <span data-type="categories" data-lang="categories">All Categories</span>
                                <i class="fa fa-angle-down"></i>
                                <i class="fa fa-angle-up"></i>
                            </div>
                            <div class="dropdown-content box-shadow"></div>
                        </div>

                        <div class="filter-products box-shadow filter-card">
                            <div class="filter-selector">
                                <span data-type="products" data-lang="products">All Products</span>
                                <i class="fa fa-angle-down"></i>
                                <i class="fa fa-angle-up"></i>
                            </div>
                            <div class="dropdown-content box-shadow"></div>
                        </div>
                    </div>

                    <input class="search-box-explorer box-shadow" type="text" data-lang="searchPlaceHolder"
                        placeholder="Search product..." />
                </div>
            </div>

            <div class="business-lists"></div>
        </div>
        `;

    // Get all filter-selector elements
    const filterSelectors = document.querySelectorAll('.filter-selector');

    // Add click event listener to each filter-selector
    filterSelectors.forEach(selector => {
        const angleDownIcon = selector.querySelector('.fa-angle-down');
        const angleUpIcon = selector.querySelector('.fa-angle-up');
        const dropdown = selector.nextElementSibling; // Get the dropdown content

        selector.addEventListener('click', function (event) {
            event.stopPropagation(); // Stop the click event from propagating

            const otherDropdowns = document.querySelectorAll('.dropdown-content');
            otherDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.style.display === 'flex') {
                    otherDropdown.style.display = 'none';
                    const otherAngleDown = otherDropdown.previousElementSibling.querySelector('.fa-angle-down');
                    const otherAngleUp = otherDropdown.previousElementSibling.querySelector('.fa-angle-up');
                    otherAngleDown.style.display = 'inline-block'; // Show fa-angle-down
                    otherAngleUp.style.display = 'none'; // Hide fa-angle-up
                }
            });

            if (dropdown.style.display === 'flex') {
                dropdown.style.display = 'none';
                angleDownIcon.style.display = 'inline-block'; // Show fa-angle-down
                angleUpIcon.style.display = 'none'; // Hide fa-angle-up
            } else {
                dropdown.style.display = 'flex';
                angleDownIcon.style.display = 'none'; // Hide fa-angle-down
                angleUpIcon.style.display = 'inline-block'; // Show fa-angle-up
            }
        });
    });



    // nav logo event listener
    const navLogoWrapper = document.querySelector(`.nav-logo`);
    navLogoWrapper.addEventListener('click', () => {
        history.pushState(null, null, `/`);
        renderPage('/');
    });

    dropDownMaker();
    dropdownCloser();
    appInit();
}

//function -  dropdown maker use in filter of explorer page
function dropDownMaker() {
    language = localStorage.getItem('language');
    const jsonFile = `resources/information/general/categories/${language}.json`;
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            // category dropdown
            const categories = data.categories; // Assuming the JSON structure has a 'categories' array
            const categoryDropdown = document.querySelector('.filter-categories .dropdown-content');
            if (categoryDropdown) {
                categoryDropdown.innerHTML = ''; // Clear previous content if needed
                categories.forEach(category => {
                    categoryDropdown.innerHTML += `
                    <label for="category-${category.slug}">
                    <span>${category.title}</span>
                    <input type="checkbox" name="category-${category.slug}" id="category-${category.slug}" value="${category.id}" data-type="category">
                    </label>
                `;
                });

            }

            // product dropdown
            const productsDropdown = document.querySelector('.filter-products .dropdown-content');
            productsDropdown.innerHTML = ''; // Clear previous content if needed
            categories.forEach(category => {
                category.subcategories.forEach(subcategory => {
                    productsDropdown.innerHTML += `
            <label for="product-${subcategory.slug}">
                <span>${subcategory.title}</span>
                <input type="checkbox" name="product-${subcategory.slug}" id="product-${subcategory.slug}" 
                    value="${subcategory.id}" data-type="product" data-category="${category.id}">
            </label>
                        `;

                    // Get all category checkboxes
                    const categoryCheckboxes = document.querySelectorAll('input[data-type="category"]');
                    let productCheckboxes = document.querySelectorAll('input[data-type="product"]');
                    // Add change event listener to each category checkbox
                    categoryCheckboxes.forEach(checkbox => {
                        categoryCheckbox = Array.from(document.querySelectorAll('input[data-type="category"]'))
                            .map(checkbox => checkbox.value);

                        checkbox.addEventListener('change', function () {
                            const selectedCategories = Array.from(document.querySelectorAll('input[data-type="category"]:checked'))
                                .map(checkbox => checkbox.value);
                            if (selectedCategories.length === 0) {
                                categoryCheckbox = Array.from(document.querySelectorAll('input[data-type="category"]'))
                                    .map(checkbox => checkbox.value);
                            } else {
                                categoryCheckbox = selectedCategories;

                            }
                            productCheckboxes.forEach(product => {
                                const productCategory = product.getAttribute('data-category');
                                const showProduct = selectedCategories.length === 0 || selectedCategories.includes(productCategory) || selectedCategories.includes('all');
                                product.parentNode.style.display = showProduct ? 'flex' : 'none';
                            });
                            // update title
                            if (selectedCategories.length === 0) {
                                filterCategoryTitleUpdater(true);
                            } else {
                                filterCategoryTitleUpdater(false);
                            }
                            businessAdder(categoryCheckbox, productCheckbox, data);
                        });
                    });

                    // Add change event listener to each product checkbox
                    productCheckboxes.forEach(checkbox => {
                        productCheckbox = Array.from(document.querySelectorAll('input[data-type="product"]'))
                            .map(checkbox => checkbox.value);

                        checkbox.addEventListener('change', function () {
                            const selectedProducts = Array.from(document.querySelectorAll('input[data-type="product"]:checked'))
                                .map(checkbox => checkbox.value);
                            productCheckbox = selectedProducts;

                            // update title
                            if (selectedProducts.length === 0) {
                                filterProductTitleUpdater(true);
                            } else {
                                filterProductTitleUpdater(false);
                            }
                            businessAdder(categoryCheckbox, productCheckbox, data);
                            // console.log('check')

                        });
                    });
                });
            });


            // get gategory filtered from index page and do it function
            if (indexCategoriesFilterdList.length === 0) {
                filterCategoryTitleUpdater(true);
                businessAdder(categoryCheckbox, productCheckbox, data);
            } else {
                let productCheckboxes = document.querySelectorAll('input[data-type="product"]');
                const categoryCheckboxes = document.querySelectorAll('input[data-type="category"]');
                categoryCheckboxes.forEach(elem => {
                    indexCategoriesFilterdList.forEach(element => {
                        if (elem.value === element) {
                            elem.checked = true;
                        }
                    })

                })
                const selectedCategories = Array.from(document.querySelectorAll('input[data-type="category"]:checked'))
                    .map(checkbox => checkbox.value);
                if (selectedCategories.length === 0) {
                    categoryCheckbox = Array.from(document.querySelectorAll('input[data-type="category"]'))
                        .map(checkbox => checkbox.value);
                } else {
                    categoryCheckbox = selectedCategories;

                }
                productCheckboxes.forEach(product => {
                    const productCategory = product.getAttribute('data-category');
                    const showProduct = selectedCategories.length === 0 || selectedCategories.includes(productCategory) || selectedCategories.includes('all');
                    product.parentNode.style.display = showProduct ? 'flex' : 'none';
                });
                // update title
                filterCategoryTitleUpdater(false);
                businessAdder(categoryCheckbox, productCheckbox, data);
            }

        })
        .catch(error => console.error('Error fetching JSON:', error));

}

// function add business to explorer page
function businessAdder(category, product, categoryList) {
    language = localStorage.getItem('language');
    fetch(`resources/information/businesses/explorer/businessesInfo/${language}.json`)
        .then(response => response.json())
        .then(data => {
            // Process the data and create business cards
            // businessesCardList = data;
            businessFilterCard(data);
            // console.log(data)
            // console.log(businessesCardList.id1001.categories)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });


    //filter businesses base on drop down check boxes selected
    function businessFilterCard(data) {
        /////////////////////////  base on categories
        const businessListItems = { ...data }; // Copy 'data' to 'businessListItems'
        const selectedCategories = category.map(Number);
        // console.log(selectedCategories)
        if (selectedCategories.length === 0) {
            createBusinessCards(businessListItems); // Show all items when no categories are selected
            return;
        }

        for (const key in businessListItems) {
            const hasMatchingCategory = businessListItems[key].categories.some(elem => selectedCategories.includes(elem));
            if (!hasMatchingCategory) {
                delete businessListItems[key];
            }
        }
        ///////////////////////// base on product
        const selectedProducts = product.map(Number);

        if (selectedProducts.length === 0) {
            createBusinessCards(businessListItems); // Show all items when no categories are selected
            return;
        }
        for (const key in businessListItems) {
            const hasMatchingProducts = businessListItems[key].products.some(elem => selectedProducts.includes(elem));
            if (!hasMatchingProducts) {
                delete businessListItems[key];
            }
        }

        // console.log(businessListItems); // Optional: Check filtered items
        createBusinessCards(businessListItems); // Assuming 'createBusinessCards' is a function to render business cards
    }

    function createBusinessCards(data) {

        const businessList = document.querySelector('.business-lists');
        // Loop through each business in the data and create cards
        businessList.innerHTML = "";
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const business = data[key];

                // Create the HTML structure for each business card
                const businessCard = document.createElement('div');
                businessCard.classList.add('explorer-business-card', 'box-shadow');
                businessCard.setAttribute('data-name', business.userName);
                businessCard.setAttribute('data-country', business.country);
                businessCard.setAttribute('data-city', business.city);
                businessCard.setAttribute('data-province', business.province);
                businessCard.setAttribute('data-categories', JSON.stringify(business.categories));
                businessCard.setAttribute('data-products', JSON.stringify(business.products));
                businessCard.setAttribute('data-username', business.userName);

                businessCard.innerHTML = `
                    <div class="explorer-card-container">
                    <div class="explorer-profile">
                        <div class="explorer-logo">
                        <img src="${business.logo}" alt="${business.name} logo" />
                        </div>
                        <div class="explorer-title">
                        <h3>${business.name}</h3>
                        <h4>${business.title}</h4>
                        </div>
                    </div>
                    <p>${business.metaDescription}</p>
                    <div class="explorer-country"><div>${business.country} | ${business.city}</div></div>
                    </div>
                    <div class="explorer-button">
                    <button class="theme-reverse">Explore More</button>
                    </div>
                `;

                businessList.appendChild(businessCard);

            }
        }
        searchConsole(categoryList);
        businessExploreButtons();
    }

}

// function search console 
function searchConsole(categoryList) {
    const searchExplorer = document.querySelector('.search-box-explorer');
    searchExplorer.setAttribute("value", searchFilter);
    searchFilterFunction(searchFilter);
    function getTextSearchConsole() {
        searchExplorer.addEventListener('keyup', (e) => {
            let searchText = e.target.value.trim().toLowerCase();
            searchFilterFunction(searchText);
        });
    }

    function searchFilterFunction(text) {
        const allBusinesses = document.querySelectorAll('.explorer-business-card');
        Array.from(allBusinesses).forEach(business => {
            // console.log(business.dataset.products)
            const products = JSON.parse(business.dataset.products);
            const categories = JSON.parse(business.dataset.categories);
            let shouldDisplay = false;

            products.forEach(productId => {
                categoryList.categories.forEach(category => {
                    category.subcategories.forEach(subcategory => {
                        if (subcategory.id === productId && subcategory.title.trim().toLowerCase().includes(text)) {
                            shouldDisplay = true;
                        }
                    });
                });
            });

            categories.forEach(categoryId => {
                categoryList.categories.forEach(category => {
                    if (category.id === categoryId && category.title.trim().toLowerCase().includes(text)) {
                        shouldDisplay = true;
                    }
                });
            });

            if (shouldDisplay) {
                business.style.display = 'flex';
            } else {
                business.style.display = 'none';
            }
        });
    }
    getTextSearchConsole();
}

function dropdownCloser() {
    document.addEventListener('click', function (event) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.style.display = 'none';
                const previousSibling = dropdown.previousElementSibling;

                // Check if previousSibling exists and contains the icons
                if (previousSibling && previousSibling.querySelector('.fa-angle-down') && previousSibling.querySelector('.fa-angle-up')) {
                    const angleDownIcon = previousSibling.querySelector('.fa-angle-down');
                    const angleUpIcon = previousSibling.querySelector('.fa-angle-up');

                    angleDownIcon.style.display = 'inline-block'; // Show fa-angle-down
                    angleUpIcon.style.display = 'none'; // Hide fa-angle-up
                }
            }
        });
    });
}

// function business explore event click
function businessExploreButtons() {
    // business explore more click event listener
    const businessExploreButton = document.querySelectorAll(".explorer-business-card");
    businessExploreButton.forEach(elem => {
        // console.log(elem);
        elem.addEventListener('click', function (event) {
            const parentElement = event.target.closest('.explorer-business-card');
            if (parentElement) {
                username = parentElement.dataset.username;
                // console.log(username)
                history.pushState(null, null, `/${username}`);
                renderPage(`/${username}`);
            }
        })
    })
}


// filter title Updater
function filterCategoryTitleUpdater(state) {
    if (titleOfDropdowns) {
        const categoryTitle = document.querySelector(`.explorer-filter .filter-categories .filter-selector span`)
        if (state === true) {
            categoryTitle.dataset.lang = titleOfDropdowns.allCategory;
            categoryTitle.innerText = categoryTitle.dataset.lang;
        }
        else {
            categoryTitle.dataset.lang = titleOfDropdowns.selected;
            categoryTitle.innerText = categoryTitle.dataset.lang;
        }
    }
}

function filterProductTitleUpdater(state) {
    if (titleOfDropdowns) {
        // console.log(titleOfDropdowns)
        const productTitle = document.querySelector(`.explorer-filter .filter-products .filter-selector span`)
        if (state === true) {
            productTitle.dataset.lang = titleOfDropdowns.allProduct;
            productTitle.innerText = productTitle.dataset.lang;
        }
        else {
            productTitle.dataset.lang = titleOfDropdowns.selected;
            productTitle.innerText = productTitle.dataset.lang;
        }
    }
}


///////////////////////////////////////////////////////////// business page maker

function businessPageMaker() {
    const language = localStorage.getItem('language');
    fetchBusinessInformation(username, language);

    // get information from API
    function fetchBusinessInformation(username, language) {
        const url = `resources/information/businesses/businessesList/${username}/information/${language}.json`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                businesBuilder(data);
            })
            .catch(error => console.error('Error fetching business information:', error));
    }


    function businesBuilder(data) {
        businessInfo = data;
        youtubeVideoID = businessInfo.overview.videoID;
        // Businesses page - header area
        headeApp.classList.add('theme-reverse');
        headeApp.classList.remove('theme');
        headeApp.innerHTML = `
    <nav class="main-header-nav  explorer-header-nav ">
        <div class="nav-logo">
            <img src="resources/images/gcctrade-logo-light.svg" alt="GCC Trade Logo" class="nav-logo-img" />
        </div>

        <div class="nav-tools theme-text-reverse">
                    <!--  <div class="button-transparent theme-text-reverse" data-lang="joinAsProducer">Join As Producer</div> -->
        <a href="https://forms.gle/ncpQ5USeTEgTYA6g8" target="_blank" class="button-transparent theme-text-reverse" data-lang="joinAsProducer">Join As Producer</a>
           <i class="fa fa-search business-search-icon theme-text-inverse"></i>
             <!-- languages -->
                        <div class="language-wrapper">
                            <span class="theme-reverse language-button-container">
                                <span class="language-button theme" data-lang="language">EN</span>
                            </span>
                            <div class="languages theme-reverse box-shadow ">
                                <span data-lang="english" class="lang-item">English</span>
                                <span data-lang="persian" class="lang-item">Persian</span>
                                <span data-lang="arabic" class="lang-item">Arabic</span>
                            </div>
                        </div>
                <!--
                    <div class="language-wrapper">
                        <i class="fa fa-globe language-button"></i>
                        <div class="languages">
                            <span data-lang="persian" class="lang-item">Persian</span>
                            <span data-lang="english" class="lang-item">English</span>
                            <span data-lang="arabic" class="lang-item">Arabic</span>
                        </div>
                    </div>
                -->
            <i class="fa fa-moon  dark-button-theme"></i>
            <i class="fa fa-sun  light-button-theme"></i>
        </div>
    </nav>
            `;


        // business page - main area
        mainApp.classList.add(`theme`);
        mainApp.innerHTML = `   <div class="business-wrapper">
            <!-- header -->
            <div class="header-content">
                <figure class="header-profile">
                    <img class="header-profile-logo"
                        src="resources/information/businesses/businessesList/linkedivo/images/linkedivo-logo.png"
                        alt="linkedivo" />
                    <figcaption>
                        <h1 class="business-name">Linkedivo</h1>
                        <h2 class="business-field">Where Connection Happen</h2>
                    </figcaption>
                </figure>

                <div class="header-contact">
                    <div class="contact-item">
                        <i class="fa fa-map-marker-alt"></i>
                        <p class="header-info-location">Canada | Toronto</p>
                    </div>
                    <div class="contact-item">
                        <i class="fa fa-globe"></i>
                        <a class="header-info-website" href="https://linkedivo.com">www.linkedivo.com</a>
                    </div>
                    <div class="contact-item">
                        <i class="fa fa-phone"></i>
                        <a class="header-info-phone" href="tel:+12137720805">+1 213 772 0805</a>
                    </div>
                    <div class="contact-item">
                        <i class="fa fa-envelope"></i>
                        <a class="header-info-email" href="mailto:info@linkedivo.com">info@linkedivo.com</a>
                    </div>
                </div>
                <div class="header-tools">
                    <div class="header-qr-code">
                        <img class="header-qr-code-img"
                            src="resources/information/businesses/businessesList/linkedivo/images/linkedivo-qr-code.svg"
                            alt="linkedivo qr code" />
                    </div>
                    <div class="header-quick-access">
                        <i class="fa fa-bookmark"></i>
                        <!-- <i class="fa-regular fa-bookmark"></i> -->
                        <i class="fa fa-share-alt"></i>
                        <i class="fa fa-user-plus"></i>
                    </div>
                </div>
            </div>

            <!-- business nav -->
            <nav class="business-nav">
                <ul>
                    <li class="nav-overview header-nav-selected" >
                        <a data-lang="overview" href="#">Overview</a>
                    </li>
                    <li class="nav-services" >
                        <a  data-lang="product" href="#">Products</a>
                    </li>
                    <li class="nav-contact" >
                        <a data-lang="contact" href="#">Contact</a>
                    </li>
                    <li class="nav-gallery" >
                        <a href="#" data-lang="gallery" >Gallery</a>
                    </li>
                    <li class="nav-more-info" >
                        <a data-lang="moreInfo" href="#">Catalog</a>
                    </li>
                </ul>
            </nav>

            <!-- main content -->
            <div class="main-contents">
                <!-- overview -->
                <div class="main-overview">
                </div>

                <!-- services -->
                <div class="main-services"></div>

                <!-- contacts -->
                <div class="main-contacts">
                    <div class="contact-info box-shadow">
                        <div class="contact-info-details">
                            <h3 class="office-title">Main Office</h3>
                        </div>

                        <div class="contact-info-map">
                            <iframe src="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>

                <!-- Gallery -->
                <div class="main-gallery"></div>

                <!-- More Info -->
                <div class="main-more-info"></div>
            </div>
        </div>
        `;


        const headerProfileLogo = document.querySelector(`.header-profile-logo`);
        const businessName = document.querySelector(`.business-name`);
        const businessField = document.querySelector(`.business-field`);

        const headerInfoLocation = document.querySelector(`.header-info-location`);
        const headerInfoWebsite = document.querySelector(`.header-info-website`);
        const headerInfoPhone = document.querySelector(`.header-info-phone`);
        const headerInfoEmail = document.querySelector(`.header-info-email`);

        const headerQrCode = document.querySelector(`.header-qr-code-img`);

        const overview = document.querySelector(`.main-overview`);
        const services = document.querySelector(`.main-services`);
        const contacts = document.querySelector(`.contact-info-details`);
        const mapIframe = document.querySelector(`.contact-info-map iframe`);
        const gallery = document.querySelector(`.main-gallery`);
        const moreInfo = document.querySelector(`.main-more-info`);

        const addToContact = document.querySelector(`.fa-user-plus`);



        metaDescription.setAttribute("content", businessInfo.info.metaDescription);
        document.title = `${businessInfo.info.name} | ${businessInfo.info.slogan}`;

        businessName.innerHTML = businessInfo.info.name;
        headerProfileLogo.setAttribute(
            "src",
            `resources/information/businesses/businessesList/${username}/images/${username}-logo.png`
        );
        headerProfileLogo.setAttribute("alt", `${businessInfo.info.name} logo`);
        businessField.innerHTML = businessInfo.info.slogan; // need to change

        headerInfoLocation.innerHTML = `${businessInfo.info.country} | ${businessInfo.info.city}`;

        headerInfoWebsite.setAttribute("href", businessInfo.info.url);
        headerInfoWebsite.innerHTML = `www.${businessInfo.info.url.split("//")[1]}`;

        headerInfoEmail.setAttribute("href", `mailto:${businessInfo.info.email}`);
        headerInfoEmail.innerHTML = businessInfo.info.email;

        headerInfoPhone.setAttribute("href", `tel:${businessInfo.info.phone}`);
        headerInfoPhone.innerHTML = businessInfo.info.phone;

        headerQrCode.setAttribute(
            "src",
            `resources/information/businesses/businessesList/${username}/images/${username}-qr-code.svg`
        );

        headerQrCode.setAttribute("alt", `${businessInfo.info.name} QR code`);


        addToContactFunc(addToContact, businessInfo.info.name, businessInfo.info.email, `https://linkedivo.com/${businessInfo.info.userName}`, businessInfo.info.phone);

        const modalShareLink = document.querySelector(`.fa-share-alt`);
        modalShareLink.addEventListener('click', function () {
            modalShareInfoHandler(`https://gcctrade.net/${username}`);
        });

        const bookmark = document.querySelector(`.fa-bookmark`);
        bookmark.addEventListener('click', function () {
            notification('This option will be available in next version');
        })



        // header business navigation bar
        // overview
        // summary
        if (businessInfo.overview.summary) {
            overview.innerHTML += `
            <div class="overview-card details-card overview-summary box-shadow">
                <div>
                    <h2 class="summary-title">Executive Summary</h2>
                    <p class="summary-description">
                    ${businessInfo.overview.summary}
                    </p>
                </div>
                    <div class="video-container">
                        <img src="${businessInfo.overview.videoCover}" alt="Video Thumbnail" data-videoID="${businessInfo.overview.videoID}" class="video-thumbnail">
                        <i class="fa fa-play"></i>
                    </div>
            </div>`;
        }

        // mission
        if (businessInfo.overview.mission) {
            overview.innerHTML += `
            <div class="overview-card details-card box-shadow">
            <h2 class="mission-title">Mission</h2>
            <p class="mission-description">
            ${businessInfo.overview.mission}
            </p>
            </div>`;
        }
        // vision
        if (businessInfo.overview.vision) {
            overview.innerHTML += `
            <div class="overview-card details-card box-shadow">
            <h2 class="vision-title">Vision</h2>
            <p class="vision-description">
            ${businessInfo.overview.vision}
            </p>
            </div>`;
        }
        // values
        if (businessInfo.overview.values) {
            overview.innerHTML += `
            <div class="overview-card details-card box-shadow">
            <h2 class="values-title">Values</h2>
            <p class="values-description">
            ${businessInfo.overview.values}
            </p>
            </div>`;
        }

        // services
        Object.keys(businessInfo.services).forEach((key) => {
            services.innerHTML += `<div class="service-card box-shadow">
            <div class="service-img">
                <img src='resources/information/businesses/businessesList/${username}/images/${key}.svg' alt="${username}-${businessInfo.services[key].title}" />
            </div>
            <div class="service-info">
                <h3>${businessInfo.services[key].title}</h3>
                <p>
                    ${businessInfo.services[key].description};
                </p>
            </div>
           
        </div>`;
        });

        //contacts
        //address
        if (businessInfo.contacts.address) {
            contacts.innerHTML += `
          <div class="contacts-address info-details-card">
                <i class="fa fa-map-marker-alt"></i>
                <p>${businessInfo.contacts.address}</p>
              </div>`;
        }
        // phone
        if (businessInfo.contacts.phone) {
            contacts.innerHTML += `
            <div class="contacts-phone info-details-card">
        <i class="fa fa-phone"></i>
        <a href="tel:${businessInfo.contacts.phone}">${businessInfo.contacts.phone}</a>
    </div>`;
        }
        // website
        if (businessInfo.contacts.website) {
            contacts.innerHTML += `
              <div class="contacts-phone info-details-card">
                <i class="fa fa-globe"></i>
                <a href="${businessInfo.contacts.website}">www.${businessInfo.contacts.website.split("//")[1]
                }</a>
              </div>`;
        }
        // email
        if (businessInfo.contacts.email) {
            contacts.innerHTML += `
              <div class="contacts-email info-details-card">
                <i class="fa fa-envelope"></i>
                <a href="mailto:${businessInfo.contacts.email}">${businessInfo.contacts.email}</a>
              </div>`;
        }
        //Social Media
        if (businessInfo.contacts.socialMedia) {
            contacts.innerHTML += `<div class="contacts-social-media info-details-card"></div>`;
        }
        const socialMedia = document.querySelector(`.contacts-social-media`);

        //instagram
        if (businessInfo.contacts.socialMedia.instagram) {
            socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.instagram}">
                  <i class="fab fa-instagram"></i>
                </a>`;
        }
        //facebook
        if (businessInfo.contacts.socialMedia.facebook) {
            socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.facebook}">
                  <i class="fab fa-facebook"></i>
                </a>`;
        }
        //linkedin
        if (businessInfo.contacts.socialMedia.linkedin) {
            socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.linkedin}">
                  <i class="fab fa-linkedin"></i>
                </a>`;
        }
        //whatsapp
        if (businessInfo.contacts.socialMedia.whatsapp) {
            socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.whatsapp}">
                  <i class="fab fa-whatsapp"></i>
                </a>`;
        }
        //telegram
        if (businessInfo.contacts.socialMedia.telegram) {
            socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.telegram}">
                  <i class="fab fa-telegram"></i>
                </a>`;
        }
        //youtube
        if (businessInfo.contacts.socialMedia.youtube) {
            socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.youtube}">
                  <i class="fab fa-youtube"></i>
                </a>`;
        }
        //twitter
        if (businessInfo.contacts.socialMedia.twitter) {
            socialMedia.innerHTML += `
              <a href="${businessInfo.contacts.socialMedia.twitter}">
                  <i class="fab fa-twitter"></i>
                </a>`;
        }
        // google map
        if (businessInfo.contacts.googleMap) {
            mapIframe.setAttribute(`src`, businessInfo.contacts.googleMap);
        }

        // gallery
        Object.keys(businessInfo.gallery).forEach((key) => {
            gallery.innerHTML += `        
            <div class="gallery-card box-shadow">

                <div class="gallery-img">
                        <img src='resources/information/businesses/businessesList/${username}/images/${key}.svg' alt="${username}-${businessInfo.gallery[key].title}" /> 
                    </div>   
                <div class="gallery-info">
                    <h3>${businessInfo.gallery[key].title}</h3>
                    <p>
                    ${businessInfo.gallery[key].description}
                    </p>
                    </div>
            </div>`;
        });

        //more info
        Object.keys(businessInfo.moreInfo).forEach((key) => {
            moreInfo.innerHTML += `   
         <div class="more-info-card">
            <a href="${businessInfo.moreInfo[key].link}"
            >- ${businessInfo.moreInfo[key].title}</a>
        </div>`;
        });


        // header nav business maker
        function businessNavMaker() {
            // variables
            const navOverview = document.querySelector(`.nav-overview`);
            const navServices = document.querySelector(`.nav-services`);
            const navContact = document.querySelector(`.nav-contact`);
            const navGallery = document.querySelector(`.nav-gallery`);
            const navMoreInfo = document.querySelector(`.nav-more-info`);

            const mainOverview = document.querySelector(`.main-overview`);
            const mainServices = document.querySelector(`.main-services`);
            const mainContact = document.querySelector(`.main-contacts`);
            const mainGallery = document.querySelector(`.main-gallery`);
            const mainMoreInfo = document.querySelector(`.main-more-info`);

            // header nav menu selection

            mainOverview.style.display = `block`;
            mainServices.style.display = `none`;
            mainContact.style.display = `none`;
            mainGallery.style.display = `none`;
            mainMoreInfo.style.display = `none`;

            navOverview.classList.add(`header-nav-selected`);
            navServices.classList.remove(`header-nav-selected`);
            navContact.classList.remove(`header-nav-selected`);
            navGallery.classList.remove(`header-nav-selected`);
            navMoreInfo.classList.remove(`header-nav-selected`);

            navOverview.addEventListener("click", (event) => {
                event.preventDefault();
                mainOverview.style.display = `block`;
                mainServices.style.display = `none`;
                mainContact.style.display = `none`;
                mainGallery.style.display = `none`;
                mainMoreInfo.style.display = `none`;

                navOverview.classList.add(`header-nav-selected`);
                navServices.classList.remove(`header-nav-selected`);
                navContact.classList.remove(`header-nav-selected`);
                navGallery.classList.remove(`header-nav-selected`);
                navMoreInfo.classList.remove(`header-nav-selected`);
            });

            navServices.addEventListener("click", (event) => {
                event.preventDefault();
                mainOverview.style.display = `none`;
                mainServices.style.display = `grid`;
                mainContact.style.display = `none`;
                mainGallery.style.display = `none`;
                mainMoreInfo.style.display = `none`;

                navOverview.classList.remove(`header-nav-selected`);
                navServices.classList.add(`header-nav-selected`);
                navContact.classList.remove(`header-nav-selected`);
                navGallery.classList.remove(`header-nav-selected`);
                navMoreInfo.classList.remove(`header-nav-selected`);
            });

            navContact.addEventListener("click", (event) => {
                event.preventDefault();
                mainOverview.style.display = `none`;
                mainServices.style.display = `none`;
                mainContact.style.display = `block`;
                mainGallery.style.display = `none`;
                mainMoreInfo.style.display = `none`;

                navOverview.classList.remove(`header-nav-selected`);
                navServices.classList.remove(`header-nav-selected`);
                navContact.classList.add(`header-nav-selected`);
                navGallery.classList.remove(`header-nav-selected`);
                navMoreInfo.classList.remove(`header-nav-selected`);
            });

            navGallery.addEventListener("click", (event) => {
                event.preventDefault();
                mainOverview.style.display = `none`;
                mainServices.style.display = `none`;
                mainContact.style.display = `none`;
                mainGallery.style.display = `grid`;
                mainMoreInfo.style.display = `none`;

                navOverview.classList.remove(`header-nav-selected`);
                navServices.classList.remove(`header-nav-selected`);
                navContact.classList.remove(`header-nav-selected`);
                navGallery.classList.add(`header-nav-selected`);
                navMoreInfo.classList.remove(`header-nav-selected`);
            });

            navMoreInfo.addEventListener("click", (event) => {
                event.preventDefault();
                mainOverview.style.display = `none`;
                mainServices.style.display = `none`;
                mainContact.style.display = `none`;
                mainGallery.style.display = `none`;
                mainMoreInfo.style.display = `block`;

                navOverview.classList.remove(`header-nav-selected`);
                navServices.classList.remove(`header-nav-selected`);
                navContact.classList.remove(`header-nav-selected`);
                navGallery.classList.remove(`header-nav-selected`);
                navMoreInfo.classList.add(`header-nav-selected`);
            });
        }

        // nav logo event listener
        const navLogoWrapper = document.querySelector(`.nav-logo`);
        navLogoWrapper.addEventListener('click', () => {
            history.pushState(null, null, `/`);
            renderPage('/');
        });


        // explorer button click event
        const explorerButtonNav = document.querySelector(`.business-search-icon`);
        explorerButtonNav.addEventListener('click', function () {
            history.pushState(null, null, `/explorer`);
            renderPage(`/explorer`);

        })


        //initialize
        businessNavMaker();
        appInit();
        youtubeVideoLoader(youtubeVideoID);
    }
}
// youtube video loader
function youtubeVideoLoader(vID) {
    const videoThumbnail = document.querySelector('.video-container');
    // console.log(videoThumbnail)
    videoThumbnail.addEventListener('click', function () {
        videoThumbnail.innerHTML = `
            <iframe
                width="100%"
                height="350px"
                src="${vID}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowfullscreen>
            </iframe>
        `;
    });
}





///////////////////////////////////////////////////////////// footer for all page
function footerMaker() {
    footerApp.innerHTML = `
   <p data-lang="copyRights">All Right Reserved for GCC Trade</p>
        <div class="terms">
            <ul>
                <li>
                    <a href="" data-lang="termsCondistions">Terms and Conditions</a>
                </li>
                <li>
                    <a href="" data-lang="privacyPolicies">Privacy Policies</a>
                </li>
            </ul>
        </div>
`;
}
footerMaker();
//////////////////////////////////////////////////////////////////////// theme.js
function themeJS() {

    const darkThemeButton = document.querySelector(`.dark-button-theme`);
    const lightThemeButton = document.querySelector(`.light-button-theme`);
    const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`).matches;
    const mainLogo = document.querySelector(`.main-logo`);
    const navLogo = document.querySelector(`.nav-logo-img`);


    // start theme initialize
    themeInitializer();

    // theme setter function
    function themeSetter(theme) {
        if (theme === `dark`) {
            darkThemeSetter();
        }
        else {
            lightThemeSetter();
        }
    }

    // check user theme prefrences and local storage theme
    function themeInitializer() {
        let selectedTheme = localStorage.getItem('theme');
        if (!selectedTheme) {
            if (prefersDark) {
                themeSetter('dark');
                localStorage.setItem('theme', 'dark');

            } else {
                themeSetter('light');
                localStorage.setItem('theme', 'light');
            }

        } else {
            themeSetter(localStorage.getItem('theme'));
        }
    }

    // change to dark theme
    darkThemeButton.addEventListener('click', () => {
        localStorage.setItem('theme', 'dark');
        darkThemeSetter();
    })

    // change to light theme
    lightThemeButton.addEventListener('click', () => {
        localStorage.setItem('theme', 'light');
        lightThemeSetter();
    })

    // dark theme setter function
    function darkThemeSetter() {

        const allTagsTheme = document.querySelectorAll(`.theme`);
        allTagsTheme.forEach(element => {
            element.classList.remove(`light-theme`);
            element.classList.add(`dark-theme`);
        });

        const allTagsThemeReverse = document.querySelectorAll(`.theme-reverse`);
        allTagsThemeReverse.forEach(element => {
            element.classList.remove(`dark-theme`);
            element.classList.add(`light-theme`);
        });



        const allTagsText = document.querySelectorAll(`.theme-text`);
        allTagsText.forEach(element => {
            element.classList.remove(`light-theme-text`);
            element.classList.add(`dark-theme-text`);
        });

        const allTagsTextReversed = document.querySelectorAll(`.theme-text-reverse`);
        allTagsTextReversed.forEach(element => {
            element.classList.remove(`dark-theme-text`);
            element.classList.add(`light-theme-text`);
        });

        if (mainLogo) {
            mainLogo.setAttribute(`src`, `resources/images/gcctrade-logo-light.svg`);
        }
        if (navLogo) {
            navLogo.setAttribute(`src`, `resources/images/gcctrade-logo-dark.svg`);
        }
        darkThemeButton.style.display = `none`;
        lightThemeButton.style.display = `flex`;
    }

    // light theme setter function
    function lightThemeSetter() {
        const allTagsTheme = document.querySelectorAll(`.theme`);
        allTagsTheme.forEach(element => {
            element.classList.remove(`dark-theme`);
            element.classList.add(`light-theme`);
        });

        const allTagsThemeReverse = document.querySelectorAll(`.theme-reverse`);
        allTagsThemeReverse.forEach(element => {
            element.classList.remove(`light-theme`);
            element.classList.add(`dark-theme`);
        });


        const allTagsText = document.querySelectorAll(`.theme-text`);
        allTagsText.forEach(element => {
            element.classList.remove(`dark-theme-text`);
            element.classList.add(`light-theme-text`);
        });

        const allTagsTextReversed = document.querySelectorAll(`.theme-text-reverse`);
        allTagsTextReversed.forEach(element => {
            element.classList.remove(`light-theme-text`);
            element.classList.add(`dark-theme-text`);
        });

        if (mainLogo) {
            mainLogo.setAttribute(`src`, `resources/images/gcctrade-logo-dark.svg`);
        }
        if (navLogo) {
            navLogo.setAttribute(`src`, `resources/images/gcctrade-logo-light.svg`);
        }
        darkThemeButton.style.display = `flex`;
        lightThemeButton.style.display = `none`;
    }
}

// themeJS();



///////////////////////////////////////////////////////////////////// language.js
// function languageJS() {

//     const languageButton = document.querySelector(`.language-button`);
//     const languageWrapper = document.querySelector(`.languages`);

//     // check and save prefered language on local storage
//     language = localStorage.getItem("language");
//     if (!language) {
//         localStorage.setItem("language", "english");
//         languageInitializer(language);
//     } else {
//         languageInitializer(language);
//     }



//     // Function to show the language list
//     function showLanguageList() {
//         languageWrapper.style.display = 'flex';
//     }

//     // Function to hide the language list
//     function hideLanguageList() {
//         languageWrapper.style.display = 'none';
//     }

//     // Event listener for the button click
//     languageButton.addEventListener('click', function (event) {
//         event.stopPropagation(); // Prevents the click event from bubbling to the document
//         if (languageWrapper.style.display === 'none' || languageWrapper.style.display === '') {
//             showLanguageList();
//         } else {
//             hideLanguageList();
//         }
//     });

//     // Event listener for clicks on the document
//     document.addEventListener('click', function () {
//         hideLanguageList();
//     });

//     // Prevent language list from hiding when clicking inside the languageWrapper
//     languageWrapper.addEventListener('click', function (event) {
//         event.stopPropagation(); // Prevents the click event from bubbling to the document
//     });


//     // Event listeners for each language
//     const languages = document.querySelectorAll(`.lang-item`);
//     languages.forEach(lang => {
//         lang.addEventListener('click', function () {
//             language = this.getAttribute('data-lang');
//             // console.log('Selected language:', language);
//             localStorage.setItem("language", language);
//             languageInitializer(language);
//             hideLanguageList();

//             // Revoke page maker
//             if (page === `/`) {
//                 indexPageMaker();
//             } else if (page === '/explorer') {
//                 // dropDownMaker();
//                 explorerPageMaker();
//                 dropdownCloser();
//             } else {
//                 history.pushState(null, null, `/${username}`);
//                 renderPage(`/${username}`)
//             }

//         });
//     });


//     // language initilaezer and Updater
//     function languageInitializer(language) {
//         fetch(`resources/information/general/languages/${language}.json`)
//             .then(response => response.json())
//             .then(data => {
//                 const elements = document.querySelectorAll(`[data-lang]`);
//                 elements.forEach(element => {
//                     const key = element.getAttribute('data-lang');
//                     if (data[language] && data[language][key]) {
//                         if (element.tagName.toLowerCase() === 'input' && element.getAttribute('type') === 'text') {
//                             // Check if it's an input element with type="text" and set placeholder
//                             element.setAttribute('placeholder', data[language][key]);
//                         } else {
//                             // For other elements, set text content
//                             element.textContent = data[language][key];
//                         }
//                     }
//                 });

//                 // Change font and direction based on the language
//                 const body = document.querySelector('body');
//                 if (language === 'english') {
//                     body.style.fontFamily = 'Poppins, sans-serif';
//                     body.style.direction = 'ltr';
//                 } else {
//                     body.style.fontFamily = 'Vazirmatn, sans-serif';
//                     body.style.direction = 'rtl';
//                 }


//                 titleOfDropdowns = {
//                     'allCategory': data[language].categories,
//                     'allProduct': data[language].products,
//                     'selected': data[language].selected,
//                 };
//                 // console.log(titleOfDropdowns);


//             })
//             .catch(error => {
//                 console.error('Error fetching language file:', error);
//             });

//         // set font of input tag
//         const inputs = document.querySelectorAll('input');
//         inputs.forEach(input => {
//             input.style.fontFamily = language === 'english' ? 'Poppins, sans-serif' : 'Vazirmatn, sans-serif';
//         });
//     }
// }


function languageJS() {

    const languageButton = document.querySelector(`.language-button`);
    const languageWrapper = document.querySelector(`.languages`);

    // check and save prefered language on local storage
    language = localStorage.getItem("language");
    if (!language) {
        localStorage.setItem("language", "english");
        languageInitializer(language);
    } else {
        languageInitializer(language);
    }

    // Function to show the language list
    function showLanguageList() {
        languageWrapper.style.display = 'flex';
    }

    // Function to hide the language list
    function hideLanguageList() {
        languageWrapper.style.display = 'none';
    }

    // Event listener for the button click
    languageButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click event from bubbling to the document
        if (languageWrapper.style.display === 'none' || languageWrapper.style.display === '') {
            showLanguageList();
        } else {
            hideLanguageList();
        }
    });

    // Event listener for clicks on the document
    document.addEventListener('click', function () {
        hideLanguageList();
    });

    // Prevent language list from hiding when clicking inside the languageWrapper
    languageWrapper.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevents the click event from bubbling to the document
    });


    // Event listeners for each language
    const languages = document.querySelectorAll(`.lang-item`);
    languages.forEach(lang => {
        lang.addEventListener('click', function () {
            language = this.getAttribute('data-lang');
            // console.log('Selected language:', language);
            localStorage.setItem("language", language);
            languageInitializer(language);
            hideLanguageList();

            // // Revoke page maker
            // if (page === `/`) {
            //     indexPageMaker();
            // } else if (page === '/explorer') {
            //     // dropDownMaker();
            //     explorerPageMaker();
            //     dropdownCloser();
            // } else {
            //     history.pushState(null, null, `/${username}`);
            //     renderPage(`/${username}`)
            // }

        });
    });


    // language initilaezer and Updater
    function languageInitializer(language) {
        fetch(`resources/information/general/languages/${language}.json`)
            .then(response => response.json())
            .then(data => {
                const elements = document.querySelectorAll(`[data-lang]`);
                elements.forEach(element => {
                    const key = element.getAttribute('data-lang');
                    if (data[language] && data[language][key]) {
                        if (element.tagName.toLowerCase() === 'input' && element.getAttribute('type') === 'text') {
                            // Check if it's an input element with type="text" and set placeholder
                            element.setAttribute('placeholder', data[language][key]);
                        } else {
                            // For other elements, set text content
                            element.textContent = data[language][key];
                        }
                    }
                });

                // Change font and direction based on the language
                const body = document.querySelector('body');
                if (language === 'english') {
                    body.style.fontFamily = 'Poppins, sans-serif';
                    body.style.direction = 'ltr';
                } else {
                    body.style.fontFamily = 'Vazirmatn, sans-serif';
                    body.style.direction = 'rtl';
                }

                titleOfDropdowns = {
                    'allCategory': data[language].categories,
                    'allProduct': data[language].products,
                    'selected': data[language].selected,
                };
                console.log(titleOfDropdowns);


            })
            .catch(error => {
                console.error('Error fetching language file:', error);
            });

        // set font of input tag
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.fontFamily = language === 'english' ? 'Poppins, sans-serif' : 'Vazirmatn, sans-serif';
        });
    }
}



//////////////////////////////////////////////////////////////////// notification
const notif = document.querySelector('.notifications')
function notification(message) {
    notif.innerHTML = message;
    notif.style.display = 'flex';
    setInterval(() => {
        notif.style.display = 'none'
    }, 2000);
}

/////////////////////////////////////////////////////// modal share info function 

// Get the modal and the buttons
function modalShareInfoHandler(link) {

    const modal = document.getElementById('myModal');
    const modalContent = document.querySelector('.modal-content input');
    const closeBtn = document.getElementsByClassName('close')[0];
    const copyBtn = document.getElementById('copyBtn');
    const copyLinkInput = document.getElementById('copyLinkInput');


    modal.style.display = 'flex';
    modalContent.value = link;

    // Close the modal when the '×' button is clicked
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    // Close the modal if clicked outside of it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };


    // Copy link to clipboard when the 'Copy Link' button is clicked
    copyBtn.onclick = function () {
        copyLinkInput.select();
        document.execCommand('copy');
        modal.style.display = 'none';
        notification("Link copied!");
    };


}


///////////////////////////////////// add to contact vCard function - vCard Maker
function addToContactFunc(addToContact, vName, vEmail, vWebsite, vPhone) {
    addToContact.addEventListener('click', () => {

        const sanitizedName = vName.replace(/[<>:"/\\|?*]/g, '');
        const filename = sanitizedName.substring(0, 255);

        const contact = {
            name: filename,
            email: vEmail,
            phoneNumber: vPhone,
            website: vWebsite
        };

        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
EMAIL:${contact.email}
TEL:${contact.phoneNumber}
URL:${contact.website}
END:VCARD`;


        const blob = new Blob([vCard], { type: 'text/vcard' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename + '.vcf';
        ;
        link.click();
    });
}



///////////////////////////////// business username validity checker
async function businessUsernamesChecker(urlName) {
    let data;
    let isValid;
    try {
        const response = await fetch(
            `resources/information/businesses/explorer/usernames/businessUsernames.json`
        );
        if (response) {
            data = await response.json();
            username = urlName.split(`/`)[1];
            page = username;
            isValid = data.usernames.includes(username);
            if (isValid) {
                language = localStorage.getItem('language')
                businessPageMaker();
                toTopNavigator();
            } else {
                app.innerHTML = "<h5>Page Not Found   |   Error 404   |   Code-012</h5>";
                console.log("code for 404 is here");
            }
        } else {
            console.log("Error - Code:1512");
        }
    } catch (error) {
        // You can handle errors or return a default value here if needed
        return error;
    }
}


///////////////////////////////// Function navigate to top
function toTopNavigator() {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


/////////////////////////////////////////////////////////// app init
function appInit() {
    themeJS();
    languageJS();
}






