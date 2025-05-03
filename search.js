const dataList = document.getElementById('dataList');
const searchBox = document.getElementById('searchBox');
const clearButton = document.getElementById('clearButton');

function renderList(filter) {
    dataList.innerHTML = '';
    let filteredData = [];

    if (filter.length >= 3) {
        filteredData = data.filter(item => 
            item.name.toLowerCase().includes(filter.toLowerCase())
        );
    } else {
        filteredData = data.filter(item => 
            item.name.toLowerCase().split(' ').some(word => word.toLowerCase() === filter.toLowerCase())
        );
    }

    if (filteredData.length > 0) {
        dataList.innerHTML = filteredData.map(item => 
            `<div><a href="${item.url}" target="_blank">${item.name}</a></div>`
        ).join('');
    } else {
        dataList.innerHTML = '';
    }
}

searchBox.addEventListener('input', function() {
    renderList(searchBox.value);
});

searchBox.addEventListener('focus', function() {
    clearButton.classList.add('show');
});

searchBox.addEventListener('blur', function() {
    if (searchBox.value.length === 0) {
        clearButton.classList.remove('show');
    }
});

searchBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchBox.blur(); // Remove focus and thus hide keyboard on mobile
    }
});

clearButton.addEventListener('click', function() {
    searchBox.value = '';
    renderList('');
    clearButton.classList.remove('show');
    searchBox.blur(); // Hide keyboard on mobile when clear button clicked
});
