
const regions = [
    {
        
{
    id: "shopska",
    name: "Шопска област",
    description: "Известна с характерните си двугласни песни, енергични хора и богата танцова традиция.",
    dances: "Шопско хоро, Граовско хоро, Бистришка копаница.",
    music: "Характерни са двугласното пеене, специфичните ритми и живото инструментално изпълнение."
},

    },
    {
        
{
    id: "severnyashka",
    name: "Северняшка област",
    description: "Област с разнообразни танцови форми, живи ритми и богато песенно наследство.",
    dances: "Дунавско хоро, Право северняшко хоро, Еленино хоро, Дайчово хоро.",
    music: "Срещат се разнообразни инструментални и вокални традиции."
},

    },
    {
        id: "dobrudzhanska",
        name: "Добруджанска област",
        description: "Известна с характерната си песенна традиция и танци, свързани с трудовия и празничния живот.",
        dances: "Добруджанска ръка, Сборенка, Ръка.",
        music: "Гайда, кавал и характерни добруджански песенни форми."
    },
    {
        id: "trakijska",
        name: "Тракийска област",
        description: "Богато музикално наследство, мелодични песни и темпераментни танци.",
        dances: "Тракийска ръченица, Право тракийско хоро, Копаница.",
        music: "Гайда, кавал, гъдулка и тъпан са сред традиционните инструменти."
    },
    {
        id: "rodopska",
        name: "Родопска област",
        description: "Разпознаваема с протяжните си песни и характерните си инструментални традиции.",
        dances: "Родопско право хоро, Чамчето и местни танцови разновидности.",
        music: "Кабагайда, кавал и характерната родопска песенност."
    },
    {
        id: "strandzhanska",
        name: "Странджанска област",
        description: "Област с древни обредни традиции и характерна песенна и танцова култура.",
        dances: "Странджанско хоро и местни танцови разновидности.",
        music: "Гайда, кавал и обредни песни."
    }
];

const regionGrid = document.getElementById("regionGrid");
const mapInfo = document.getElementById("mapInfo");

function showRegion(id) {
    const region = regions.find(item => item.id === id);
    if (!region) return;

    document.querySelectorAll(".map-region").forEach(path => {
        path.classList.toggle("active", path.dataset.region === id);
    });

    mapInfo.innerHTML = `
        <span class="eyebrow">Фолклорна област</span>
        <h3>${region.name}</h3>
        <p>${region.description}</p>
        <br>
        <strong>Танци:</strong>
        <p>${region.dances}</p>
        <br>
        <strong>Музика:</strong>
        <p>${region.music}</p>
    `;

    mapInfo.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

regions.forEach((region, index) => {
    const card = document.createElement("article");
    card.className = "region-card";
    card.innerHTML = `
        <span class="region-number">ОБЛАСТ 0${index + 1}</span>
        <h3>${region.name}</h3>
        <p>${region.description}</p>
        <span class="more">Разгледай областта →</span>
    `;

    card.addEventListener("click", () => {
        showRegion(region.id);
        document.getElementById("map").scrollIntoView({ behavior: "smooth" });
    });

    regionGrid.appendChild(card);
});

document.querySelectorAll(".map-region").forEach(path => {
    path.addEventListener("click", () => showRegion(path.dataset.region));
});

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navigation.classList.remove("open"));
});

const searchableContent = [
    ...regions.map(region => ({
        title: region.name,
        text: `${region.description} Танци: ${region.dances} Музика: ${region.music}`
    })),
    {
        title: "Нестинарство",
        text: "Обредна традиция, свързана със светите Константин и Елена и танцуване върху жарава."
    },
    {
        title: "Лазаруване",
        text: "Пролетен момински обичай с песни, благословии и обикаляне на домовете."
    },
    {
        title: "Кукерски игри",
        text: "Маскарадни обичаи за здраве, плодородие и благополучие."
    },
    {
        title: "Еньовден",
        text: "Празник с билки, венци и народни вярвания."
    },
    {
        title: "Право хоро",
        text: "Популярна танцова форма с различни регионални разновидности."
    },
    {
        title: "Ръченица",
        text: "Български танц и музикално-ритмична форма в неравноделен размер."
    }
];

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLocaleLowerCase("bg");

    if (!query) {
        searchResults.innerHTML = "<p>Започни да пишеш, за да откриеш информация.</p>";
        return;
    }

    const results = searchableContent.filter(item =>
        `${item.title} ${item.text}`.toLocaleLowerCase("bg").includes(query)
    );

    if (!results.length) {
        searchResults.innerHTML = "<p>Няма намерени резултати. Опитай с друга дума.</p>";
        return;
    }

    searchResults.innerHTML = results.map(item => `
        <article class="search-result">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        </article>
    `).join("");
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .catch(error => console.error("Service Worker:", error));
    });
}
