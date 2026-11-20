
"use strict";

/* =================================
   ХОРОНАВИГАТОР – ОСНОВЕН СКРИПТ
================================= */

const regions = [
    {
        id: "shopska",
        name: "Шопска област",
        description: "Шопската фолклорна област се отличава с темпераментни танци, характерно двугласно пеене и богата музикална традиция.",
        dances: [
            "Шопско хоро",
            "Граовско хоро",
            "Бистришка копаница",
            "Копаница"
        ],
        music: "Характерни са двугласното пеене, специфичните ритми и живото инструментално изпълнение."
    },
    {
        id: "severnyashka",
        name: "Северняшка област",
        description: "Северняшката област е известна с разнообразните си танцови форми, живите ритми и богатото песенно наследство.",
        dances: [
            "Дунавско хоро",
            "Право северняшко хоро",
            "Еленино хоро",
            "Дайчово хоро"
        ],
        music: "Срещат се разнообразни инструментални и вокални традиции."
    },
    {
        id: "dobrudzhanska",
        name: "Добруджанска област",
        description: "Добруджанският фолклор е свързан с широките равнини, трудовия живот и характерната танцова стъпка.",
        dances: [
            "Добруджанска ръка",
            "Сборенка",
            "Ръка"
        ],
        music: "Характерни са песните с местен стил и звученето на гайда, кавал и други народни инструменти."
    },
    {
        id: "trakijska",
        name: "Тракийска област",
        description: "Тракия притежава богато музикално наследство, мелодични песни и темпераментни танци.",
        dances: [
            "Тракийска ръченица",
            "Право тракийско хоро",
            "Копаница"
        ],
        music: "Гайда, кавал, гъдулка и тъпан са сред традиционните инструменти."
    },
    {
        id: "rodopska",
        name: "Родопска област",
        description: "Родопският фолклор е разпознаваем с протяжните си песни, специфичните мелодии и каба гайдата.",
        dances: [
            "Родопско право хоро",
            "Чамчето",
            "Местни родопски хора"
        ],
        music: "Кабагайда, кавал и характерната родопска песенност."
    },
    {
        id: "strandzhanska",
        name: "Странджанска област",
        description: "Странджанският фолклор пази древни обредни традиции и характерна песенна и танцова култура.",
        dances: [
            "Странджанско хоро",
            "Местни странджански хора"
        ],
        music: "Гайда, кавал и обредни песни."
    }
];


/* =================================
   ПОМОЩНИ ФУНКЦИИ
================================= */

function getElement(id) {
    return document.getElementById(id);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}


/* =================================
   ФОЛКЛОРНИ ОБЛАСТИ
================================= */

const regionGrid = getElement("regionGrid");
const mapInfo = getElement("mapInfo");

function showRegion(id) {
    const region = regions.find(item => item.id === id);

    if (!region) return;

    document.querySelectorAll(".map-region").forEach(path => {
        path.classList.toggle(
            "active",
            path.dataset.region === id
        );
    });

    if (mapInfo) {
        mapInfo.innerHTML = `
            <span class="eyebrow">Фолклорна област</span>
            <h3>${escapeHTML(region.name)}</h3>
            <p>${escapeHTML(region.description)}</p>

            <br>

            <strong>Танци:</strong>
            <p>${region.dances.map(escapeHTML).join(", ")}.</p>

            <br>

            <strong>Музика:</strong>
            <p>${escapeHTML(region.music)}</p>
        `;
    }
}

function createRegionCards() {
    if (!regionGrid) return;

    regionGrid.innerHTML = "";

    regions.forEach((region, index) => {
        const card = document.createElement("article");

        card.className = "region-card";
        card.innerHTML = `
            <span class="region-number">
                ОБЛАСТ 0${index + 1}
            </span>

            <h3>${escapeHTML(region.name)}</h3>

            <p>${escapeHTML(region.description)}</p>

            <span class="more">
                Разгледай областта →
            </span>
        `;

        card.addEventListener("click", () => {
            showRegion(region.id);

            const map = getElement("map");

            if (map) {
                map.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

        regionGrid.appendChild(card);
    });
}


/* =================================
   ИНТЕРАКТИВНА КАРТА
================================= */

function initializeMap() {
    document.querySelectorAll(".map-region").forEach(path => {
        path.addEventListener("click", () => {
            showRegion(path.dataset.region);
        });
    });
}


/* =================================
   МОБИЛНО МЕНЮ
================================= */

function initializeMenu() {
    const menuToggle = getElement("menuToggle");
    const navigation = getElement("navigation");

    if (!menuToggle || !navigation) return;

    menuToggle.addEventListener("click", () => {
        navigation.classList.toggle("open");
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
        });
    });
}


/* =================================
   ФОЛКЛОРНА БИБЛИОТЕКА
================================= */

const searchableContent = [
    ...regions.map(region => ({
        title: region.name,
        text: `${region.description} Танци: ${region.dances.join(", ")}. Музика: ${region.music}`
    })),

    {
        title: "Дайчово хоро",
        text: "Характерно хоро за Северняшката фолклорна област."
    },
    {
        title: "Право хоро",
        text: "Популярна българска танцова форма с различни регионални разновидности."
    },
    {
        title: "Ръченица",
        text: "Български танц и музикално-ритмична форма в неравноделен размер."
    },
    {
        title: "Бистришка копаница",
        text: "Танцова форма, свързана с шопската танцова традиция."
    },
    {
        title: "Нестинарство",
        text: "Обредна традиция, свързана със светите Константин и Елена."
    },
    {
        title: "Лазаруване",
        text: "Пролетен момински обичай с песни и благословии."
    },
    {
        title: "Кукерски игри",
        text: "Маскарадни обичаи за здраве, плодородие и благополучие."
    },
    {
        title: "Еньовден",
        text: "Празник с билки, венци и народни вярвания."
    }
];

function initializeSearch() {
    const searchInput = getElement("searchInput");
    const searchResults = getElement("searchResults");

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener("input", () => {
        const query = searchInput.value
            .trim()
            .toLocaleLowerCase("bg");

        if (!query) {
            searchResults.innerHTML =
                "<p>Започни да пишеш, за да откриеш информация.</p>";
            return;
        }

        const results = searchableContent.filter(item => {
            const content =
                `${item.title} ${item.text}`.toLocaleLowerCase("bg");

            return content.includes(query);
        });

        if (results.length === 0) {
            searchResults.innerHTML =
                "<p>Няма намерени резултати. Опитай с друга дума.</p>";
            return;
        }

        searchResults.innerHTML = results.map(item => `
            <article class="search-result">
                <h3>${escapeHTML(item.title)}</h3>
                <p>${escapeHTML(item.text)}</p>
            </article>
        `).join("");
    });
}


/* =================================
   СТАРТИРАНЕ НА САЙТА
================================= */

function initializeHoroNavigator() {
    createRegionCards();
    initializeMap();
    initializeMenu();
    initializeSearch();
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeHoroNavigator
    );
} else {
    initializeHoroNavigator();
}


/* =================================
   SERVICE WORKER
================================= */

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./service-worker.js")
            .catch(error => {
                console.error(
                    "Грешка при Service Worker:",
                    error
                );
            });
    });
}
