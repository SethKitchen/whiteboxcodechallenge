function SortComboChanged(box) {
    redirectPage();
}

function Search() {
    redirectPage();
}


const node = document.getElementsByClassName("searchbar")[0];

node.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        Search();
    }
});

function GetSearchQuery() {
    return document.getElementsByClassName('searchbar')[0].value;
}

function GetLowToHighValue() {
    var str = document.getElementsByClassName('selection-2')[0].value;
    if (str == 'Price: low to high') {
        return 1;
    }
    else {
        return null;
    }
}

function filterClicked() {
    var lowToHigh = GetLowToHighValue();
    var highToLow = GetHighToLowValue();
    var minPrice = document.getElementById('value-lower').innerText;
    var maxPrice = document.getElementById('value-upper').innerText;
    var searchQuery = GetSearchQuery();

    var redirectPage = '/GetMany?';
    if (lowToHigh) {
        redirectPage += 'price_low_to_high=1&';
    }
    if (highToLow) {
        redirectPage += 'price_high_to_low=1&';
    }
    if (minPrice) {
        redirectPage += 'price_min=' + minPrice + '&';
    }
    if (maxPrice) {
        redirectPage += 'price_max=' + maxPrice + '&';
    }
    if (searchQuery) {
        redirectPage += 'search_query=' + searchQuery + '&';
    }
    window.location = redirectPage;
}

function sliderChanged(slider) {
    var slideVal = slider.value;
    if (slideVal < 20) {
        document.getElementById('value-lower').innerText = 0;
        document.getElementById('value-upper').innerText = 50;
    }
    else if (slideVal < 40) {
        document.getElementById('value-lower').innerText = 50;
        document.getElementById('value-upper').innerText = 100;
    }
    else if (slideVal < 60) {
        document.getElementById('value-lower').innerText = 100;
        document.getElementById('value-upper').innerText = 150;
    }
    else if (slideVal < 80) {
        document.getElementById('value-lower').innerText = 150;
        document.getElementById('value-upper').innerText = 200;
    }
    else if (slideVal < 100) {
        document.getElementById('value-lower').innerText = 200;
        document.getElementById('value-upper').innerText = Infinity;
    }
}

function GetHighToLowValue() {
    var str = document.getElementsByClassName('selection-2')[0].value;
    if (str == 'Price: high to low') {
        return 1;
    }
    else {
        return null;
    }
}


function GetPriceMin() {
    var str = document.getElementsByClassName('selection-2')[1].value;
    if (str == '$0.00 - $50.00') {
        return 0;
    }
    else if (str == '$50.00 - $100.00') {
        return 50;
    }
    else if (str == '$100.00 - $150.00') {
        return 100;
    }
    else if (str == '$150.00 - $200.00') {
        return 150;
    }
    else if (str == '$200.00+') {
        return 200;
    }
    else {
        return null;
    }
}

function GetPriceMax() {
    var str = document.getElementsByClassName('selection-2')[1].value;
    if (str == '$0.00 - $50.00') {
        return 50;
    }
    else if (str == '$50.00 - $100.00') {
        return 100;
    }
    else if (str == '$100.00 - $150.00') {
        return 150;
    }
    else if (str == '$150.00 - $200.00') {
        return 200;
    }
    else if (str == '$200.00+') {
        return Infinity;
    }
    else {
        return null;
    }
}

function PriceComboChanged(box) {
    redirectPage();
}

function redirectPage() {
    var lowToHigh = GetLowToHighValue();
    var highToLow = GetHighToLowValue();
    var minPrice = GetPriceMin();
    var maxPrice = GetPriceMax();
    var searchQuery = GetSearchQuery();

    var redirectPage = '/GetMany?';
    if (lowToHigh) {
        redirectPage += 'price_low_to_high=1&';
    }
    if (highToLow) {
        redirectPage += 'price_high_to_low=1&';
    }
    if (minPrice) {
        redirectPage += 'price_min=' + minPrice+'&';
    }
    if (maxPrice) {
        redirectPage += 'price_max=' + maxPrice+'&';
    }
    if (searchQuery) {
        redirectPage += 'search_query=' + searchQuery + '&';
    }

    window.location = redirectPage;
}