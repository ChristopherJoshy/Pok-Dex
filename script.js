// Global variables and constants
const API_BASE_URL = 'https://pokeapi.co/api/v2';
const ITEMS_PER_PAGE = 20;
let currentOffset = 0;
let currentSearch = '';
let currentTypeFilter = '';
let currentGenerationFilter = '';
let allPokemon = [];
let filteredPokemon = [];
let favorites = JSON.parse(localStorage.getItem('pokemonFavorites')) || [];

// DOM elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const typeFilter = document.getElementById('type-filter');
const generationFilter = document.getElementById('generation-filter');
const clearFiltersBtn = document.getElementById('clear-filters');
const pokemonGrid = document.getElementById('pokemon-grid');
const loadMoreBtn = document.getElementById('load-more');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const emptyState = document.getElementById('empty-state');
const resultsSection = document.getElementById('results-section');
const retryBtn = document.getElementById('retry-btn');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const resultsTitle = document.getElementById('results-title');

// Stats elements
const totalPokemonEl = document.getElementById('total-pokemon');
const typesCountEl = document.getElementById('types-count');
const favoritesCountEl = document.getElementById('favorites-count');

// Navigation elements
const homeLink = document.getElementById('home-link');
const favoritesLink = document.getElementById('favorites-link');

// Initialize the application
document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
    try {
        showLoading();
        await loadInitialData();
        setupEventListeners();
        await loadPokemon();
        updateStats();
        generateContributionGraph();
        setupSearchAutocomplete();
    } catch (err) {
        console.error('Failed to initialize app:', err);
        showError('Failed to initialize the application. Please refresh the page.');
    }
}

async function loadInitialData() {
    try {
        // Load Pokemon types for filter
        const typesResponse = await fetch(`${API_BASE_URL}/type`);
        const typesData = await typesResponse.json();
        populateTypeFilter(typesData.results);
        
        // Get total Pokemon count
        const pokemonResponse = await fetch(`${API_BASE_URL}/pokemon?limit=1`);
        const pokemonData = await pokemonResponse.json();
        totalPokemonEl.textContent = pokemonData.count;
        typesCountEl.textContent = typesData.results.length;
    } catch (err) {
        throw new Error('Failed to load initial data');
    }
}

function populateTypeFilter(types) {
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.name;
        option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
        typeFilter.appendChild(option);
    });
}

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Filters
    typeFilter.addEventListener('change', handleTypeFilter);
    generationFilter.addEventListener('change', handleGenerationFilter);
    clearFiltersBtn.addEventListener('click', clearFilters);

    // Load more
    loadMoreBtn.addEventListener('click', loadMorePokemon);

    // View toggle
    gridViewBtn.addEventListener('click', () => setView('grid'));
    listViewBtn.addEventListener('click', () => setView('list'));

    // Navigation
    homeLink.addEventListener('click', showAllPokemon);
    favoritesLink.addEventListener('click', showFavorites);

    // Retry
    retryBtn.addEventListener('click', () => {
        currentOffset = 0;
        loadPokemon();
    });
}

async function loadPokemon() {
    try {
        showLoading();
        
        let url = `${API_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${currentOffset}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch Pokemon');
        
        const data = await response.json();
        
        // Load detailed data for each Pokemon
        const pokemonPromises = data.results.map(pokemon => loadPokemonDetails(pokemon.url));
        const pokemonDetails = await Promise.all(pokemonPromises);
        
        if (currentOffset === 0) {
            allPokemon = pokemonDetails;
            pokemonGrid.innerHTML = '';
        } else {
            allPokemon.push(...pokemonDetails);
        }
        
        applyFilters();
        hideLoading();
        
        // Show load more button if there are more Pokemon
        if (data.next) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
        
    } catch (err) {
        console.error('Error loading Pokemon:', err);
        showError('Failed to load Pokémon data. Please check your internet connection and try again.');
    }
}

async function loadPokemonDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch Pokemon details');
        
        const pokemon = await response.json();
        
        // Load species data for additional info
        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();
        
        return {
            ...pokemon,
            species: speciesData
        };
    } catch (err) {
        console.error('Error loading Pokemon details:', err);
        return null;
    }
}

function renderPokemon(pokemonList) {
    if (pokemonList.length === 0) {
        showEmptyState();
        return;
    }

    hideEmptyState();
    hideError();
    showResults();

    const fragment = document.createDocumentFragment();
    
    pokemonList.forEach(pokemon => {
        if (!pokemon) return;
        
        const card = createPokemonCard(pokemon);
        fragment.appendChild(card);
    });
    
    pokemonGrid.appendChild(fragment);
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.onclick = () => goToPokemonDetail(pokemon.id);
    
    const isFavorite = favorites.includes(pokemon.id);
    
    card.innerHTML = `
        <div class="pokemon-card-header">
            <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
            <button class="favorite-toggle ${isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${pokemon.id})">
                <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
            </button>
        </div>
        <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
             alt="${pokemon.name}" class="pokemon-image" loading="lazy">
        <h3 class="pokemon-name">${pokemon.name}</h3>
        <div class="pokemon-types">
            ${pokemon.types.map(type => 
                `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
            ).join('')}
        </div>
        <div class="pokemon-stats">
            ${pokemon.stats.slice(0, 3).map(stat => `
                <div class="stat-preview">
                    <span class="stat-name">${stat.stat.name}</span>
                    <span class="stat-value">${stat.base_stat}</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${Math.min(stat.base_stat / 2, 100)}%"></div>
                </div>
            `).join('')}
        </div>
    `;
    
    return card;
}

function handleSearch() {
    currentSearch = searchInput.value.toLowerCase().trim();
    currentOffset = 0;
    applyFilters();
    updateResultsTitle();
}

function handleTypeFilter() {
    currentTypeFilter = typeFilter.value;
    applyFilters();
    updateResultsTitle();
}

function handleGenerationFilter() {
    currentGenerationFilter = generationFilter.value;
    applyFilters();
    updateResultsTitle();
}

function applyFilters() {
    filteredPokemon = allPokemon.filter(pokemon => {
        if (!pokemon) return false;
        
        // Enhanced search filter - search by name, ID, type, and abilities
        if (currentSearch) {
            const searchTerm = currentSearch.toLowerCase();
            const nameMatch = pokemon.name.toLowerCase().includes(searchTerm);
            const idMatch = pokemon.id.toString().includes(searchTerm);
            const typeMatch = pokemon.types.some(type => type.type.name.toLowerCase().includes(searchTerm));
            const abilityMatch = pokemon.abilities.some(ability => 
                ability.ability.name.toLowerCase().includes(searchTerm)
            );
            
            if (!nameMatch && !idMatch && !typeMatch && !abilityMatch) {
                return false;
            }
        }
        
        // Type filter
        if (currentTypeFilter && !pokemon.types.some(type => type.type.name === currentTypeFilter)) {
            return false;
        }
        
        // Generation filter
        if (currentGenerationFilter) {
            const genRanges = {
                '1': [1, 151],
                '2': [152, 251],
                '3': [252, 386],
                '4': [387, 493],
                '5': [494, 649],
                '6': [650, 721],
                '7': [722, 809],
                '8': [810, 905]
            };
            
            const range = genRanges[currentGenerationFilter];
            if (range && (pokemon.id < range[0] || pokemon.id > range[1])) {
                return false;
            }
        }
        
        return true;
    });
    
    // Sort results by relevance for search
    if (currentSearch) {
        filteredPokemon.sort((a, b) => {
            const searchTerm = currentSearch.toLowerCase();
            const aNameMatch = a.name.toLowerCase().startsWith(searchTerm);
            const bNameMatch = b.name.toLowerCase().startsWith(searchTerm);
            
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
            
            return a.id - b.id;
        });
    }
    
    pokemonGrid.innerHTML = '';
    renderPokemon(filteredPokemon);
}

function clearFilters() {
    searchInput.value = '';
    typeFilter.value = '';
    generationFilter.value = '';
    currentSearch = '';
    currentTypeFilter = '';
    currentGenerationFilter = '';
    
    applyFilters();
    updateResultsTitle();
}

function loadMorePokemon() {
    currentOffset += ITEMS_PER_PAGE;
    loadPokemon();
}

function toggleFavorite(pokemonId) {
    const index = favorites.indexOf(pokemonId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(pokemonId);
    }
    
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
    updateStats();
    
    // Update the favorite button
    const favoriteBtn = document.querySelector(`[onclick*="${pokemonId}"]`);
    if (favoriteBtn) {
        const icon = favoriteBtn.querySelector('i');
        if (favorites.includes(pokemonId)) {
            favoriteBtn.classList.add('active');
            icon.className = 'fas fa-heart';
        } else {
            favoriteBtn.classList.remove('active');
            icon.className = 'far fa-heart';
        }
    }
}

function showAllPokemon() {
    homeLink.classList.add('active');
    favoritesLink.classList.remove('active');
    
    clearFilters();
    resultsTitle.textContent = 'All Pokémon';
}

function showFavorites() {
    homeLink.classList.remove('active');
    favoritesLink.classList.add('active');
    
    const favoritePokemon = allPokemon.filter(pokemon => 
        pokemon && favorites.includes(pokemon.id)
    );
    
    pokemonGrid.innerHTML = '';
    renderPokemon(favoritePokemon);
    resultsTitle.textContent = `Favorite Pokémon (${favoritePokemon.length})`;
    loadMoreBtn.style.display = 'none';
}

function setView(viewType) {
    if (viewType === 'grid') {
        pokemonGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    } else {
        pokemonGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    }
}

function goToPokemonDetail(pokemonId) {
    window.location.href = `pokemon-detail.html?id=${pokemonId}`;
}

function updateResultsTitle() {
    let title = 'All Pokémon';
    
    if (currentSearch) {
        title = `Search: "${currentSearch}"`;
    } else if (currentTypeFilter) {
        title = `${currentTypeFilter.charAt(0).toUpperCase() + currentTypeFilter.slice(1)} Type`;
    } else if (currentGenerationFilter) {
        title = `Generation ${currentGenerationFilter}`;
    }
    
    resultsTitle.textContent = title;
}

function updateStats() {
    favoritesCountEl.textContent = favorites.length;
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showLoading() {
    loading.style.display = 'block';
    error.style.display = 'none';
    emptyState.style.display = 'none';
    resultsSection.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError(message) {
    error.style.display = 'block';
    document.getElementById('error-message').textContent = message;
    loading.style.display = 'none';
    resultsSection.style.display = 'none';
    emptyState.style.display = 'none';
}

function hideError() {
    error.style.display = 'none';
}

function showEmptyState() {
    emptyState.style.display = 'block';
    resultsSection.style.display = 'none';
}

function hideEmptyState() {
    emptyState.style.display = 'none';
}

function showResults() {
    resultsSection.style.display = 'block';
}

// GitHub contribution graph generator
function generateContributionGraph() {
    const contributionGrid = document.getElementById('contribution-grid');
    if (!contributionGrid) return;
    
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    // Generate 371 days (53 weeks × 7 days)
    for (let i = 0; i < 371; i++) {
        const day = document.createElement('div');
        day.className = 'contribution-day';
        
        // Add random contribution levels (simulating GitHub activity)
        const level = Math.floor(Math.random() * 5);
        if (level > 0) {
            day.classList.add(`level-${level}`);
        }
        
        contributionGrid.appendChild(day);
    }
}

// Enhanced search with autocomplete
function setupSearchAutocomplete() {
    const searchContainer = document.querySelector('.search-bar');
    const autocompleteList = document.createElement('div');
    autocompleteList.className = 'autocomplete-list';
    autocompleteList.style.display = 'none';
    searchContainer.appendChild(autocompleteList);
    
    let autocompleteData = [];
    
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase().trim();
        
        if (value.length < 2) {
            hideAutocomplete();
            return;
        }
        
        // Build autocomplete data from loaded Pokemon
        if (autocompleteData.length === 0 && allPokemon.length > 0) {
            autocompleteData = allPokemon.flatMap(pokemon => {
                if (!pokemon) return [];
                
                const suggestions = [
                    { text: pokemon.name, type: 'name', id: pokemon.id },
                    ...pokemon.types.map(type => ({ text: type.type.name, type: 'type' })),
                    ...pokemon.abilities.map(ability => ({ text: ability.ability.name, type: 'ability' }))
                ];
                
                return suggestions;
            }).filter((item, index, self) => 
                index === self.findIndex(t => t.text === item.text && t.type === item.type)
            );
        }
        
        const matches = autocompleteData
            .filter(item => item.text.toLowerCase().includes(value))
            .slice(0, 8);
        
        if (matches.length > 0) {
            showAutocomplete(matches, value);
        } else {
            hideAutocomplete();
        }
    });
    
    searchInput.addEventListener('blur', () => {
        setTimeout(hideAutocomplete, 200);
    });
    
    function showAutocomplete(matches, searchValue) {
        autocompleteList.innerHTML = '';
        autocompleteList.style.display = 'block';
        
        matches.forEach(match => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            
            const icon = getAutocompleteIcon(match.type);
            const highlightedText = highlightMatch(match.text, searchValue);
            
            item.innerHTML = `
                <i class="${icon}"></i>
                <span class="autocomplete-text">${highlightedText}</span>
                <span class="autocomplete-type">${match.type}</span>
            `;
            
            item.addEventListener('click', () => {
                searchInput.value = match.text;
                hideAutocomplete();
                handleSearch();
                if (match.type === 'name' && match.id) {
                    setTimeout(() => goToPokemonDetail(match.id), 100);
                }
            });
            
            autocompleteList.appendChild(item);
        });
    }
    
    function hideAutocomplete() {
        autocompleteList.style.display = 'none';
    }
    
    function getAutocompleteIcon(type) {
        switch (type) {
            case 'name': return 'fas fa-dragon';
            case 'type': return 'fas fa-tag';
            case 'ability': return 'fas fa-star';
            default: return 'fas fa-search';
        }
    }
    
    function highlightMatch(text, searchValue) {
        const regex = new RegExp(`(${searchValue})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }
}
