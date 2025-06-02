function search() {
  const query = document.getElementById('searchInput').value;
  const tagTexts = tags.map(tag => tag.toLowerCase()).join(', ');
  console.log('click!');
  console.log(query, tagTexts);
  console.log(this.selectedFilter);
  window.location.href = "../html/search.html?query="+ query +'&'+'filter='+ this.selectedFilter + '&tags=' + tagTexts;

  // alert(`Searching for: "${query}"\nFilter: ${filter || 'None'}\nTags: ${tagTexts || 'None'}`);
}

// Tags logic
const tagInput = document.getElementById('tagInput');
const tagInputWrapper = document.getElementById('tagInputWrapper');
let tags = [];
let searchParamss = new URLSearchParams(window.location.search);
tags = searchParamss.get('tags').split(', ');
if (tags[0] == ''){
  tags = [];
}
renderTags();

tagInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && tagInput.value.trim()) {
    e.preventDefault();
    const newTag = tagInput.value.trim();
    if (!tags.includes(newTag.toLowerCase())) {
      tags.push(newTag);
      renderTags();
    }
    tagInput.value = '';
  }
});

const tagSuggestionsEl = document.getElementById('tagSuggestions');
const availableTags = ["vegan", "spicy", "dessert", "gluten-free", "low-carb", "italian", "japanese", "indian", "healthy"];

tagInput.addEventListener('input', function () {
  const input = tagInput.value.toLowerCase();
  tagSuggestionsEl.innerHTML = '';

  if (input) {
    const matches = availableTags.filter(tag =>
      tag.includes(input) && !tags.includes(tag)
    ).slice(0, 5);

    matches.forEach(match => {
      const li = document.createElement('li');
      li.textContent = match;
      li.addEventListener('click', () => {
        tags.push(match);
        tagInput.value = '';
        tagSuggestionsEl.innerHTML = '';
        renderTags();
      });
      tagSuggestionsEl.appendChild(li);
    });
  }
});

// Hide suggestions on outside click
document.addEventListener('click', (e) => {
  if (!tagInputWrapper.contains(e.target)) {
    tagSuggestionsEl.innerHTML = '';
  }
});

function renderTags() {
  // Clear previous content
  tagInputWrapper.innerHTML = '';
;
  tags.forEach(tag => {

    const tagEl = document.createElement('div');
    tagEl.className = 'tag';
    tagEl.innerHTML = `${tag} <span class="remove-tag">&times;</span>`;
    tagInputWrapper.appendChild(tagEl);

    tagEl.querySelector('.remove-tag').addEventListener('click', () => {
      tags = tags.filter(t => t !== tag.toLowerCase());
      renderTags();
    });
  });

  // Create input container with suggestions list
  const tagContainer = document.createElement('div');
  tagContainer.className = 'tag-container';

  const input = document.createElement('input');
  input.id = 'tagInput';
  input.type = 'text';
  input.placeholder = 'Add tags (press Enter)...';
  input.autocomplete = 'off';

  const suggestionList = document.createElement('ul');
  suggestionList.id = 'tagSuggestions';
  suggestionList.className = 'tag-suggestions';

  tagContainer.appendChild(input);
  tagContainer.appendChild(suggestionList);
  tagInputWrapper.appendChild(tagContainer);

  // Add event listeners
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      e.preventDefault();
      const newTag = input.value.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        tags.push(newTag);
        renderTags();
      }
    }
  });

  input.addEventListener('input', () => {
    const inputText = input.value.toLowerCase();
    suggestionList.innerHTML = '';

    if (inputText) {
      const matches = availableTags.filter(tag =>
        tag.includes(inputText) && !tags.includes(tag)
      ).slice(0, 5);

      matches.forEach(match => {
        const li = document.createElement('li');
        li.textContent = match;
        li.addEventListener('click', () => {
          tags.push(match);
          renderTags();
        });
        suggestionList.appendChild(li);
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!tagContainer.contains(e.target)) {
      suggestionList.innerHTML = '';
    }
  });

  input.focus();
}



const filterBtn = document.getElementById('filterToggle');
const filterMenu = document.getElementById('filterMenu');

filterBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent click from bubbling
  filterMenu.classList.toggle('hidden');
});

// Close filter menu if clicking outside
document.addEventListener('click', (e) => {
  if (!filterMenu.classList.contains('hidden')) {
    filterMenu.classList.add('hidden');
  }
});

// Handle filter selection
function setFilter(selectedOption) {
  const allItems = document.querySelectorAll('#filterMenu li');

  // Remove 'selected' class from all
  allItems.forEach(item => item.classList.remove('selected'));

  // Add 'selected' class to the clicked item
  const selectedItem = document.querySelector(`#filterMenu li[data-filter="${selectedOption}"]`);
  if (selectedItem) {
    selectedItem.classList.add('selected');
  }

  // Hide the menu
  filterMenu.classList.add('hidden');

  // You can store the selected filter or apply logic here
  // currentFilter = selectedOption;
  // applyFilter(selectedOption);
}

document.querySelectorAll('#filterMenu li').forEach(li => {
  li.addEventListener('click', () => {
    const selected = li.getAttribute('data-filter');
    this.selectedFilter = selected;
    setFilter(selected);
  });
});

let selectedFilter = '';
var foodData = [
  {"name": "Margherita Pizza", 'img':'pizza.png', "price": "42.000", "tags": ["Italian", "Vegetarian"] , "rating":"4.8 " , "distance":"1.1", "description":"A classic Italian pizza topped with fresh mozzarella, tomatoes, and basil.", "location":"Napoli Bistro"},
  {"name": "Salmon Sushi", 'img':'salmonsushi.png', "price": "80.000", "tags": ["Japanese", "Seafood"] , "rating":"4.8 " , "distance":"2.4", "description":"Delicate slices of buttery salmon over seasoned rice with a hint of wasabi.", "location":"Tokyo Bites"},
  {"name": "Double Cheeseburger", 'img':'burger.png', "price": "35.000", "tags": ["American", "Beef"] , "rating":"4.6" , "distance":"0.9", "description":"A juicy double patty burger stacked with cheddar, pickles, and house sauce.", "location":"Grill King"},
  {"name": "Spicy Ramen Bowl", 'img':'ramen.png', "price": "45.000", "tags": ["Japanese", "Noodles"] , "rating":"4.5" , "distance":"0.9", "description":"", "location":"Tokyo Ramen House"},
  {"name": "Chicken Tikka Masala", 'img':'masala.png', "price": "58.000", "tags": ["Indian", "Spicy"] , "rating":"4.7" , "distance":"1.3", "description":"", "location":"Bombay Bistro"},
  {"name": "Vegan Buddha Bowl", 'img':'veganbowl.jpg', "price": "92.000", "tags": ["Vegan", "Healthy"] , "rating":"4.3" , "distance":"2.5", "description":"", "location":"Green Kitchen"},
  {"name": "Garlic Butter Shrimp Pasta", 'img':'shrimppasta.jpg', "price": "66.000", "tags": ["Seafood", "Italian"] , "rating":"4.8" , "distance":"3.0", "description":"", "location":"Pasta Haven"},
  {"name": "Belgian Chocolate Lava Cake", 'img':'choco lava cake.png', "price": "30.000", "tags": ["Dessert", "Chocolate"] , "rating":"4.9" , "distance":"0.5", "description":"", "location":"Sweet Cravings"},
  // {"name": "", 'img':'', "price": "", "tags": [] , "rating":"" , "distance":"", "description":"", "location":""},
]

function searchOnLoad(){
  const paramsString = window.location.search;
  console.log(paramsString);
  const searchParams = new URLSearchParams(paramsString);
  let query = searchParams.get('query');
  let filter = searchParams.get('filter');
  let queryTags = []
  if(searchParams.get('tags') != ''){
    queryTags = searchParams.get('tags').split(", ");
  }
  console.log(query, filter, queryTags);

  document.getElementById('searchInput').value = query;
  this.selectedFilter = filter;
  setFilter(filter);

  let filteredFoodData = foodData.filter((foodItem) => {
    if(!foodItem.name.toLowerCase().includes(query.toLowerCase())){
      return false;
    }
    return true;
  })

  filteredFoodData = filteredFoodData.filter((foodItem) => {
    let valid = true;
    if(queryTags.length > 0){
      queryTags.forEach(tag => {
        if(!foodItem.tags.map(word => word.toLowerCase()).includes(tag)){
          console.log(`${foodItem.tags} does not include ${tag}`)
          valid = false;
        }
      });
    }
    return valid;
  })

  switch(this.selectedFilter) {
    case 'distance':
      filteredFoodData.sort((a, b) => a.distance - b.distance);
      break;
    case 'popularity':
      filteredFoodData.sort((a, b) => a.rating - b.rating);
      break;
    case 'price':
      filteredFoodData.sort((a, b) => a.price - b.price);
      break;
    default:
      break;
      // code block
  }
  const foodDataInsert = document.querySelector("#foodDataInsert");
  filteredFoodData.forEach(foodItem => {
    let htmlTags = [];
    foodItem.tags.forEach(tag => {
      htmlTags.push(`<span class="tag">${tag}</span>`)
    })
    foodDataInsert.insertAdjacentHTML(
    'beforeend',
    `<div class="suggestion-box" >
      <a href="../html/review.html">
        <img src="../assets/${foodItem.img}" alt="${foodItem.name}">
      </a>
      <div class="suggestion-content">
        <h3>${foodItem.name}</h3>
        <p class="meta">💲Rp. ${foodItem.price} &nbsp; | &nbsp; ⭐ ${foodItem.rating} &nbsp; </p>
        <p class="meta">📏 ${foodItem.location} &nbsp; | &nbsp; 📍 ${foodItem.distance} km</p>
        <p class="description">${foodItem.description}</p>
        <div class="tags">
        ${htmlTags.join('\n')}
        </div>
      </div>
    </div>`
  )
  });
  
}

