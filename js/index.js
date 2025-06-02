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


