<div align="center">

# 🌟 PokéDex - Explore the World of Pokémon 🌟

<img src="assets/pokeball.svg" alt="PokéDex" width="150" height="150"/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PokéAPI](https://img.shields.io/badge/PokéAPI-EF5350?style=for-the-badge&logo=pokemon&logoColor=white)](https://pokeapi.co/)

</div>

<p align="center">A modern, interactive web application that allows users to explore and discover information about Pokémon. Built with vanilla JavaScript, HTML, and CSS, this PokéDex provides a comprehensive and user-friendly interface for Pokémon enthusiasts.</p>

<div align="center">

```

██████╗  ██████╗ ██╗  ██╗███████╗██████╗ ███████╗██╗  ██╗
██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝██╔══ ██╗██╔════╝██║ ██╔╝
██████╔╝██║   ██║█████╔╝ █████╗  ██████╔╝█████╗  █████╔╝ 
██╔═══╝ ██║   ██║██╔═██╗ ██╔══╝  ██╔══ ██╗██╔══╝  ██╔═██╗ 
██║     ╚██████╔╝██║  ██╗███████╗███████ ███████╗██║  ██╗
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

```

</div>

## ✨ Features

<table>
  <tr>
    <td width="50%">
      <h3>🏠 Home Page</h3>
      <ul>
        <li>🔍 <b>Search Functionality</b>: Search Pokémon by name, type, ability, or ID</li>
        <li>🔢 <b>Advanced Filtering</b>: Filter Pokémon by type and generation</li>
        <li>📱 <b>Responsive Layout</b>: Grid and list view options for different browsing preferences</li>
        <li>📊 <b>Statistics Dashboard</b>: View total Pokémon count, types, and favorites</li>
        <li>❤️ <b>Favorites System</b>: Save your favorite Pokémon for quick access</li>
        <li>⏬ <b>Load More</b>: Dynamically load more Pokémon as you scroll</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📋 Detail Page</h3>
      <ul>
        <li>📝 <b>Comprehensive Information</b>: View detailed stats, abilities, and descriptions</li>
        <li>⛓️ <b>Evolution Chain</b>: Visualize the evolution path of each Pokémon</li>
        <li>⚔️ <b>Move List</b>: Browse all moves a Pokémon can learn</li>
        <li>🖼️ <b>Image Gallery</b>: Toggle between normal and shiny sprites</li>
        <li>📑 <b>Tabbed Interface</b>: Easily navigate between different information sections</li>
      </ul>
    </td>
  </tr>
</table>

### 🎨 Visual Design

<div align="center">

| 🌊 **Smooth Animations** | 🎭 **Type-Based Styling** | 📱 **Responsive Design** | 🖌️ **Modern UI** |
|:------------------------:|:-------------------------:|:------------------------:|:------------------:|
| Engaging visual effects and transitions | Colors and themes based on Pokémon types | Works on desktop, tablet, and mobile | Clean, intuitive interface with attention to detail |

</div>

## 🛠️ Technologies Used

<div align="center">

| Technology | Description |
|:----------:|:-----------:|
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" width="40" height="40"><br>**HTML5** | Semantic markup for structure |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="40" height="40"><br>**CSS3** | Advanced styling with flexbox, grid, and custom animations |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="40" height="40"><br>**JavaScript** | Vanilla JS for dynamic content and API integration |
| <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" width="40" height="40"><br>**PokéAPI** | External API for comprehensive Pokémon data |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/chrome/chrome-original.svg" width="40" height="40"><br>**LocalStorage** | Client-side storage for user preferences and favorites |
| <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/brands/font-awesome.svg" width="40" height="40"><br>**Font Awesome** | Icon library for enhanced UI elements |

</div>

## 📁 Project Structure

<div align="center">

```
  _____           _           _      _____ _                   _                  
 |  __ \         (_)         | |    / ____| |                 | |                 
 | |__) | __ ___  _  ___  ___| |_  | (___ | |_ _ __ _   _  ___| |_ _   _ _ __ ___ 
 |  ___/ '__/ _ \| |/ _ \/ __| __|  \___ \| __| '__| | | |/ __| __| | | | '__/ _ \
 | |   | | | (_) | |  __/ (__| |_   ____) | |_| |  | |_| | (__| |_| |_| | | |  __/
 |_|   |_|  \___/| |\___|\___|\__| |_____/ \__|_|   \__,_|\___|\__|\__,_|_|  \___|
               _/ |                                                               
              |__/                                                                
```

| File | Description |
|:----:|:-----------:|
| **index.html** | Main entry point with the home page structure and Pokemon grid display |
| **pokemon-detail.html** | Detailed view page for individual Pokemon with tabs for stats, moves, etc. |
| **script.js** | Core JavaScript for the home page with API calls, search, filtering, and card rendering |
| **pokemon-detail.js** | JavaScript for the detail page with Pokemon-specific data loading and visualization |
| **style.css** | Main stylesheet with responsive design, card layouts, and UI components |
| **animations.css** | Dedicated stylesheet for animations, transitions, and visual effects |
| **assets/** | Directory containing SVG icons and loading animations |

</div>

### 🔍 File Functionality
ts
<div align="center">

```
  _______ _        _____                 _   _                 _ _ _         
 |__   __| |      |  __ \               | | (_)               | (_) |        
    | |  | |__    | |__) |_ _ _ __   ___| |_ _  ___  _ __   __| |_| |_ _   _ 
    | |  | '_ \   |  ___/ _` | '_ \ / __| __| |/ _ \| '_ \ / _` | | __| | | |
    | |  | | | |  | |  | (_| | | | | (__| |_| | (_) | | | | (_| | | |_| |_| |
    |_|  |_| |_|  |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|\__,_|_|\__|\__, |
                                                                         __/ |
                                                                        |___/ 
```

</div>

<table>
  <tr>
    <th align="center">📄 File</th>
    <th align="center">🔧 Functionality</th>
  </tr>
  <tr>
    <td align="center"><b>index.html</b></td>
    <td>
      <ul>
        <li>🏠 Main entry point with home page structure</li>
        <li>🔍 Search bar and filter components</li>
        <li>📱 Responsive Pokemon grid display</li>
        <li>👨‍💻 Developer information section</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td align="center"><b>script.js</b></td>
    <td>
      <ul>
        <li>🔌 API calls to fetch Pokemon data</li>
        <li>🔍 Search and filtering logic</li>
        <li>🎨 Pokemon card rendering</li>
        <li>📄 Pagination with "Load More" functionality</li>
        <li>❤️ Favorites management with localStorage</li>
        <li>🔄 View toggling between grid and list views</li>
        <li>⚠️ Error handling and loading states</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td align="center"><b>pokemon-detail.html</b></td>
    <td>
      <ul>
        <li>📋 Structure for detailed Pokemon view</li>
        <li>📑 Tabbed interface for different information sections</li>
        <li>🖼️ Image gallery with sprite toggles</li>
        <li>🔙 Navigation back to main PokéDex</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td align="center"><b>pokemon-detail.js</b></td>
    <td>
      <ul>
        <li>📊 Fetching specific Pokemon data (stats, moves, evolution)</li>
        <li>📑 Tab navigation between information sections</li>
        <li>⛓️ Rendering evolution chains as visual diagrams</li>
        <li>⚔️ Displaying move lists with filtering options</li>
        <li>✨ Toggling between normal and shiny sprites</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td align="center"><b>style.css</b></td>
    <td>
      <ul>
        <li>📱 Responsive grid and flexbox layouts</li>
        <li>🎨 Type-based color theming</li>
        <li>🃏 Card designs and UI components</li>
        <li>📐 Media queries for different screen sizes</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td align="center"><b>animations.css</b></td>
    <td>
      <ul>
        <li>✨ Card hover animations</li>
        <li>🔄 Loading spinners and transitions</li>
        <li>📊 Stat bar animations</li>
        <li>❤️ Favorite button effects</li>
      </ul>
    </td>
  </tr>
</table>

## 🚀 Getting Started

<div align="center">

```
   _____      _     ____  _             _           _ 
  / ____|    | |   / ___|| |           | |         | |
 | |  __  ___| |_ | |___ | |_ __ _ _ __| |_ ___  __| |
 | | |_ |/ _ \ __| \___ \| __/ _` | '__| __/ _ \/ _` |
 | |__| |  __/ |_  ____) | || (_| | |  | ||  __/ (_| |
  \_____|\___|\___|_____/ \__\__,_|_|   \__\___|\__,_|
                                                      
```

```bash
# Clone this repository
$ git clone https://github.com/ChristopherJoshy/pokedex.git

# Go into the repository
$ cd pokedex

# Open index.html in your browser
$ open index.html   # macOS
$ start index.html  # Windows
```

</div>

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzM0OTI5ZDQ3MzBmMzZiMDFkMzQ5ZWI0ZDM1M2NkZjFjYTRlMzg0ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/vsyKKf1t22nmw/giphy.gif" width="300">
</p>

<div align="center">

### 💯 No build tools or dependencies required - just pure HTML, CSS, and JavaScript! 💯

</div>
explain 
## 🔌 API Integration

<div align="center">
  <a href="https://pokeapi.co/" target="_blank">
    <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokéAPI" width="300">
  </a>
</div>

<p align="center">This project uses the <a href="https://pokeapi.co/">PokéAPI</a> to fetch comprehensive Pokémon data.</p>

<div align="center">

| Data Type | Description |
|:---------:|:-----------:|
| 📊 **Basic Information** | Name, ID, types, and other fundamental data |
| 💪 **Statistics & Abilities** | Base stats, abilities, and characteristics |
| 🔄 **Evolution Chains** | Complete evolution paths and requirements |
| ⚔️ **Move Sets** | All moves and learning methods |
| 📚 **Species Information** | Descriptions, habitats, and other species data |

</div>

### 🔄 How API Calls Work

<div align="center">

```
   ___    ____  ____    ______      ____  
  / _ \  / ___||  _ \  / /  _ \    / ___| 
 | | | || |    | |_) |/ /| | | |   \___ \ 
 | |_| || |___ |  __/< < | |_| |___ ___) |
  \__\_\ \____||_|   \_\_\____/(___|____/ 
                                          
```

</div>

```javascript
// Example API call from script.js
async function loadPokemon() {
    try {
        showLoading();  // Show loading spinner
        
        // Construct URL with pagination parameters
        let url = `${API_BASE_URL}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${currentOffset}`;
        
        // Fetch data from API
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch Pokemon');
        
        // Parse JSON response
        const data = await response.json();
        
        // Load detailed data for each Pokemon in parallel
        const pokemonPromises = data.results.map(pokemon => loadPokemonDetails(pokemon.url));
        const pokemonDetails = await Promise.all(pokemonPromises);
        
        // Process the data...
    } catch (err) {
        console.error('Error loading Pokemon:', err);
        showError('Failed to load Pokémon data.');  // Show user-friendly error
    }
}
```

<div align="center">

| Step | Description |
|:----:|:------------|
| 🔄 **Initial Data Loading** | Fetch basic Pokemon list with pagination parameters |
| 🔍 **Detailed Data Loading** | For each Pokemon in the list, fetch detailed information in parallel |
| 📚 **Species & Evolution Data** | Load additional species and evolution chain data from related endpoints |
| 💾 **Caching** | Store frequently accessed data in memory and favorites in localStorage |
| ⚠️ **Error Handling** | Comprehensive error handling with user-friendly messages and fallbacks |

</div>

The application uses modern JavaScript's `fetch` API with `async/await` pattern to make asynchronous API calls efficiently. This approach allows for clean, readable code while handling multiple API requests in parallel.

## 👨‍💻 Developer Information

<div align="center">

```
  _____                 _                       
 |  __ \               | |                      
 | |  | | _____   _____| | ___  _ __   ___ _ __ 
 | |  | |/ _ \ \ / / _ \ |/ _ \| '_ \ / _ \ '__|
 | |__| |  __/\ V /  __/ | (_) | |_) |  __/ |   
 |_____/ \___| \_/ \___|_|\___/| .__/ \___|_|   
                               | |              
                               |_|              
```

  <img src="https://github.com/ChristopherJoshy.png" alt="Christopher Joshy" width="150" style="border-radius:50%;">
  <h3>Created by Christopher Joshy</h3>
  <p><i>Web Developer & Computer Science Student at St. Joseph's College of Engineering</i></p>
  <p>Passionate about clean code, intuitive design, and interactive experiences.</p>

  <div>
    <a href="https://github.com/ChristopherJoshy" target="_blank">
      <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
    </a>
    <a href="https://linkedin.com/in/christopherjoshy" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
    </a>
    <a href="mailto:christopherjoshy@example.com">
      <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
    </a>
  </div>
</div>

## 📜 License

<div align="center">

```
  _      _                          
 | |    (_)                         
 | |     _  ___ ___ _ __  ___  ___ 
 | |    | |/ __/ _ \ '_ \/ __|/ _ \
 | |____| | (_|  __/ | | \__ \  __/
 |______|_|\___\___|_| |_|___/\___|
                                   
```

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

This project is open source and available under the MIT License.

```
Copyright (c) 2024 Christopher Joshy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files.
```

<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" width="50">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" width="50">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" width="50">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" width="50">
</div>

<div style="margin-top: 20px;">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png" width="70">
</div>

</div>