// Pokemon Detail Page JavaScript
const API_BASE_URL = 'https://pokeapi.co/api/v2';
let currentPokemon = null;
let favorites = JSON.parse(localStorage.getItem('pokemonFavorites')) || [];

// DOM elements
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const pokemonDetail = document.getElementById('pokemon-detail');
const favoriteBtn = document.getElementById('favorite-btn');

// Pokemon info elements
const pokemonId = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const pokemonTypes = document.getElementById('pokemon-types');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonWeight = document.getElementById('pokemon-weight');
const pokemonExperience = document.getElementById('pokemon-experience');
const pokemonAbilities = document.getElementById('pokemon-abilities');
const pokemonDescription = document.getElementById('pokemon-description');
const pokemonQuote = document.getElementById('pokemon-quote');

// Tab elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

// Stats elements
const statsChart = document.getElementById('stats-chart');

// Evolution elements
const evolutionChain = document.getElementById('evolution-chain');

// Moves elements
const movesList = document.getElementById('moves-list');
const moveMethodFilter = document.getElementById('move-method-filter');

// Image gallery elements
const normalSpriteBtn = document.getElementById('normal-sprite');
const shinySpriteBtn = document.getElementById('shiny-sprite');

// Initialize the page
document.addEventListener('DOMContentLoaded', initializePage);

async function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonIdParam = urlParams.get('id');
    
    if (!pokemonIdParam) {
        showError('No Pokémon ID provided');
        return;
    }
    
    try {
        showLoading();
        await loadPokemonDetail(pokemonIdParam);
        setupEventListeners();
        hideLoading();
        showPokemonDetail();
    } catch (err) {
        console.error('Failed to load Pokemon details:', err);
        showError('Failed to load Pokémon details. Please try again.');
    }
}

async function loadPokemonDetail(id) {
    try {
        // Load main Pokemon data
        const pokemonResponse = await fetch(`${API_BASE_URL}/pokemon/${id}`);
        if (!pokemonResponse.ok) throw new Error('Pokemon not found');
        
        const pokemon = await pokemonResponse.json();
        
        // Load species data
        const speciesResponse = await fetch(pokemon.species.url);
        const speciesData = await speciesResponse.json();
        
        // Load evolution chain
        let evolutionData = null;
        if (speciesData.evolution_chain) {
            const evolutionResponse = await fetch(speciesData.evolution_chain.url);
            evolutionData = await evolutionResponse.json();
        }
        
        currentPokemon = {
            ...pokemon,
            species: speciesData,
            evolutionChain: evolutionData
        };
        
        renderPokemonDetail();
        
    } catch (err) {
        throw new Error('Failed to load Pokemon data');
    }
}

function renderPokemonDetail() {
    const pokemon = currentPokemon;
    
    // Basic info
    pokemonId.textContent = pokemon.id.toString().padStart(3, '0');
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    // Types
    pokemonTypes.innerHTML = pokemon.types.map(type => 
        `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
    ).join('');
    
    // Image
    pokemonImage.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    
    // Basic stats
    pokemonHeight.textContent = `${(pokemon.height / 10).toFixed(1)} m`;
    pokemonWeight.textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;
    pokemonExperience.textContent = pokemon.base_experience || 'Unknown';
    
    // Abilities
    renderAbilities();
    
    // Description
    renderDescription();
    
    // Quote
    renderQuote();
    
    // Favorite button
    updateFavoriteButton();
    
    // Stats
    renderStats();
    
    // Evolution
    renderEvolution();
    
    // Moves
    renderMoves();
}

function renderAbilities() {
    pokemonAbilities.innerHTML = currentPokemon.abilities.map(ability => `
        <div class="ability-item">
            <span class="ability-name">${ability.ability.name.replace('-', ' ')}</span>
            ${ability.is_hidden ? '<span class="ability-hidden">Hidden</span>' : ''}
        </div>
    `).join('');
}

function renderDescription() {
    const englishEntry = currentPokemon.species.flavor_text_entries.find(
        entry => entry.language.name === 'en'
    );
    
    if (englishEntry) {
        pokemonDescription.textContent = englishEntry.flavor_text.replace(/\f/g, ' ');
    } else {
        pokemonDescription.textContent = 'No description available.';
    }
}

function renderQuote() {
    // Generate a simple quote based on Pokemon characteristics
    const quotes = {
        fire: "The flames that dance within me burn with the passion of a thousand suns!",
        water: "Like the flowing river, I adapt and overcome all obstacles in my path.",
        grass: "From the earth I draw my strength, and to nature I return my energy.",
        electric: "Feel the electric energy coursing through my being - it's electrifying!",
        psychic: "The power of the mind knows no bounds, and neither do I.",
        ice: "Cool as ice, sharp as winter's bite - that's my way.",
        dragon: "I am the embodiment of ancient power and mystical strength.",
        dark: "In the shadows I find my strength, in the darkness I find my light.",
        fighting: "Every battle makes me stronger, every challenge makes me grow.",
        poison: "Beauty can be deadly, and I am living proof of that truth.",
        ground: "Solid as the earth beneath your feet, reliable as the ground you stand on.",
        flying: "The sky is not the limit - it's my playground.",
        bug: "Small but mighty, I prove that size doesn't determine strength.",
        rock: "Like stone, I endure; like mountains, I stand tall and proud.",
        ghost: "Between worlds I wander, bringing mystery wherever I go.",
        steel: "Forged in determination, tempered by experience, unbreakable in spirit.",
        fairy: "Magic flows through me like starlight, bringing wonder to the world."
    };
    
    const primaryType = currentPokemon.types[0].type.name;
    const quote = quotes[primaryType] || "Every step of my journey has led me to become who I am today.";
    
    pokemonQuote.textContent = quote;
}

function renderStats() {
    const stats = currentPokemon.stats;
    const maxStat = Math.max(...stats.map(stat => stat.base_stat));
    
    statsChart.innerHTML = stats.map(stat => {
        const percentage = (stat.base_stat / maxStat) * 100;
        const statName = stat.stat.name.replace('-', ' ');
        
        return `
            <div class="stat-row">
                <div class="stat-row-name">${statName}</div>
                <div class="stat-row-value">${stat.base_stat}</div>
                <div class="stat-row-bar">
                    <div class="stat-row-fill" style="width: ${percentage}%; background: ${getStatColor(stat.base_stat)}"></div>
                </div>
            </div>
        `;
    }).join('');
}

function getStatColor(value) {
    if (value >= 100) return '#4caf50';
    if (value >= 80) return '#8bc34a';
    if (value >= 60) return '#ffc107';
    if (value >= 40) return '#ff9800';
    return '#f44336';
}

function renderEvolution() {
    if (!currentPokemon.evolutionChain) {
        evolutionChain.innerHTML = '<p>Evolution data not available.</p>';
        return;
    }
    
    const chain = currentPokemon.evolutionChain.chain;
    const evolutionStages = [];
    
    // Parse evolution chain
    let current = chain;
    while (current) {
        const pokemonId = current.species.url.split('/').slice(-2, -1)[0];
        evolutionStages.push({
            name: current.species.name,
            id: pokemonId,
            minLevel: current.evolution_details[0]?.min_level || null,
            trigger: current.evolution_details[0]?.trigger?.name || null
        });
        
        current = current.evolves_to[0];
    }
    
    evolutionChain.innerHTML = evolutionStages.map((stage, index) => {
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stage.id}.png`;
        
        return `
            ${index > 0 ? '<div class="evolution-arrow">→</div>' : ''}
            <div class="evolution-stage" onclick="goToPokemon(${stage.id})">
                <img src="${imageUrl}" alt="${stage.name}" loading="lazy">
                <div class="evolution-stage-name">${stage.name}</div>
                ${stage.minLevel ? `<div class="evolution-stage-level">Level ${stage.minLevel}</div>` : ''}
            </div>
        `;
    }).join('');
}

function renderMoves() {
    const moves = currentPokemon.moves;
    let filteredMoves = moves;
    
    // Apply filter if selected
    const filterValue = moveMethodFilter.value;
    if (filterValue) {
        filteredMoves = moves.filter(move => 
            move.version_group_details.some(detail => 
                detail.move_learn_method.name === filterValue
            )
        );
    }
    
    // Sort moves by level learned
    filteredMoves.sort((a, b) => {
        const aLevel = a.version_group_details[0]?.level_learned_at || 999;
        const bLevel = b.version_group_details[0]?.level_learned_at || 999;
        return aLevel - bLevel;
    });
    
    movesList.innerHTML = filteredMoves.slice(0, 50).map(move => {
        const detail = move.version_group_details[0];
        const level = detail?.level_learned_at || '--';
        const method = detail?.move_learn_method.name.replace('-', ' ') || 'Unknown';
        
        return `
            <div class="move-item">
                <div class="move-name">${move.move.name.replace('-', ' ')}</div>
                <div class="move-detail">Level ${level}</div>
                <div class="move-detail">${method}</div>
                <div class="move-detail">--</div>
                <div class="move-detail">--</div>
            </div>
        `;
    }).join('');
    
    if (filteredMoves.length > 50) {
        movesList.innerHTML += `<div class="move-item"><div class="move-name">... and ${filteredMoves.length - 50} more moves</div></div>`;
    }
}

function setupEventListeners() {
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Favorite button
    favoriteBtn.addEventListener('click', toggleFavorite);
    
    // Image gallery
    normalSpriteBtn.addEventListener('click', () => showSprite('normal'));
    shinySpriteBtn.addEventListener('click', () => showSprite('shiny'));
    
    // Move filter
    moveMethodFilter.addEventListener('change', renderMoves);
}

function switchTab(tabName) {
    // Remove active from all tabs and panels
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Add active to selected tab and panel
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function showSprite(type) {
    const sprites = currentPokemon.sprites;
    let imageUrl;
    
    if (type === 'shiny') {
        imageUrl = sprites.other['official-artwork'].front_shiny || 
                  sprites.front_shiny || 
                  sprites.other['official-artwork'].front_default;
        shinySpriteBtn.classList.add('active');
        normalSpriteBtn.classList.remove('active');
    } else {
        imageUrl = sprites.other['official-artwork'].front_default || sprites.front_default;
        normalSpriteBtn.classList.add('active');
        shinySpriteBtn.classList.remove('active');
    }
    
    pokemonImage.src = imageUrl;
}

function toggleFavorite() {
    const pokemonIdNum = currentPokemon.id;
    const index = favorites.indexOf(pokemonIdNum);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(pokemonIdNum);
    }
    
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
    updateFavoriteButton();
}

function updateFavoriteButton() {
    const isFavorite = favorites.includes(currentPokemon.id);
    const icon = favoriteBtn.querySelector('i');
    const text = favoriteBtn.querySelector('span');
    
    if (isFavorite) {
        favoriteBtn.classList.add('active');
        icon.className = 'fas fa-heart';
        text.textContent = 'Remove from Favorites';
    } else {
        favoriteBtn.classList.remove('active');
        icon.className = 'far fa-heart';
        text.textContent = 'Add to Favorites';
    }
}

function goToPokemon(pokemonId) {
    window.location.href = `pokemon-detail.html?id=${pokemonId}`;
}

// Utility functions
function showLoading() {
    loading.style.display = 'block';
    error.style.display = 'none';
    pokemonDetail.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError(message) {
    error.style.display = 'block';
    document.getElementById('error-message').textContent = message;
    loading.style.display = 'none';
    pokemonDetail.style.display = 'none';
}

function showPokemonDetail() {
    pokemonDetail.style.display = 'block';
}
