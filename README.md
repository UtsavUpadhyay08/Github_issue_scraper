# GitHub Scraper

## Overview
GitHub Scraper is a JavaScript-based tool designed to scrape GitHub repositories and collect information about their issues. It automates the process of visiting GitHub topics, accessing top repositories within those topics, and extracting issue data into JSON files for further analysis.

## Features
- Scrapes GitHub repositories under specified topics.
- Collects issue data from top repositories.
- Organizes collected data into JSON files for each repository under each topic.

## Installation
To use GitHub Scraper, follow these steps:
1. Clone this repository to your local machine.
2. Ensure you have Node.js installed.
3. Install the required dependencies by running:

```bash
npm i
node main.js
```

## Usage
1. The scraper will generate a 'topics' folder in the base directory if it doesn't exist already. Inside this folder, it will create subfolders for each specified topic.
2. Within each topic folder, JSON/PDF files containing issue data for each repository will be stored.
