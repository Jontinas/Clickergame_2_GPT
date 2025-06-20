
let coins = 0;
let clickPower = 1;
let upgrades = {
    clickBoost: { level: 0, max: 100, cost: 50, increment: 1 },
    autoClick: { level: 0, max: 50, cost: 200, cps: 1 }
};

let achievements = [];
let prestigePoints = 0;

function handleClick() {
    coins += clickPower;
    updateUI();
    saveProgress();
    checkAchievements();
}

function buyUpgrade(type) {
    const upg = upgrades[type];
    if (coins >= upg.cost && upg.level < upg.max) {
        coins -= upg.cost;
        upg.level++;
        upg.cost = Math.floor(upg.cost * 1.5);
        if (type === 'clickBoost') clickPower += upg.increment;
        updateUI();
        saveProgress();
    }
}

function startAutoClicker() {
    setInterval(() => {
        if (upgrades.autoClick.level > 0) {
            coins += upgrades.autoClick.level * upgrades.autoClick.cps;
            updateUI();
            saveProgress();
            checkAchievements();
        }
    }, 1000);
}

function updateUI() {
    document.getElementById("coins").innerText = coins;
    document.getElementById("clickBoostInfo").innerText =
        "Nível: " + upgrades.clickBoost.level + " | Custo: " + upgrades.clickBoost.cost;
    document.getElementById("autoClickInfo").innerText =
        "Nível: " + upgrades.autoClick.level + " | Custo: " + upgrades.autoClick.cost;
}

function checkAchievements() {
    if (!achievements.includes("click_100") && coins >= 100) {
        achievements.push("click_100");
        alert("Conquista desbloqueada: 100 Moedas!");
    }
    if (!achievements.includes("upgrade_5") && upgrades.clickBoost.level >= 5) {
        achievements.push("upgrade_5");
        alert("Conquista desbloqueada: Clique Poderoso!");
    }
}

function resetPrestige() {
    if (coins >= 10000) {
        prestigePoints += 1;
        coins = 0;
        clickPower = 1 + prestigePoints * 2;
        upgrades.clickBoost.level = 0;
        upgrades.clickBoost.cost = 50;
        upgrades.autoClick.level = 0;
        upgrades.autoClick.cost = 200;
        saveProgress();
        updateUI();
        alert("Reset realizado! +1 ponto de prestígio!");
    }
}

function saveProgress() {
    const data = {
        coins, clickPower, upgrades, achievements, prestigePoints
    };
    localStorage.setItem("jontinasSave", JSON.stringify(data));
}

function loadProgress() {
    const save = localStorage.getItem("jontinasSave");
    if (save) {
        const data = JSON.parse(save);
        coins = data.coins;
        clickPower = data.clickPower;
        upgrades = data.upgrades;
        achievements = data.achievements || [];
        prestigePoints = data.prestigePoints || 0;
        updateUI();
    }
}

function startGame() {
    document.getElementById("introPopup").classList.add("hidden");
    document.getElementById("mainDashboard").classList.remove("hidden");
    loadProgress();
    updateUI();
    startAutoClicker();
}

function switchTab(tabName) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(tabName + "Tab").classList.add("active");
}

window.onload = () => {
    document.getElementById("bgMusic").volume = 0.4;
};
