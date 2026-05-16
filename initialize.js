"use strict";

var gameloop;
var fineGrainLoop;
var savePreLoad;

const initSteps = [
    {
        function: function() {
            // 直接获取存档字符串
            const saveStr = localStorage.getItem("save");
            savePreLoad = saveStr || "";
        }
    },
    {
        function: function() {
            // 安全地显示存档字符串
            const element = d.element("loadScreenExport");
            if (element) {
                element.innerText = savePreLoad;
            }
        }
    },
    {
        function: function() {
            if (debugActive) {
                for (let id of Object.keys(research)) {
                    validateResearch(id);
                }
                for (let stat of Object.keys(miscStats).filter(x => miscStats[x].type === "breakdown")) {
                    for (let i = 0; i < miscStats[stat].modifiers.length; i++) {
                        if (typeof miscStats[stat].modifiers[i].show !== "function") {
                            console.error("miscStats." + stat + ".modifiers[" + i + "].show 未定义");
                        }
                    }
                }
            }
        }
    },
    {
        function: function() {
            try {
                const saveStr = localStorage.getItem("save");
                if (saveStr) {
                    load(saveStr);
                } else {
                    newGame();
                }
            } catch (e) {
                console.error("加载存档失败:", e);
                newGame();
            }
        }
    },
    {
        function: function() {
            HTMLGenerator();
        }
    },
    {
        function: function() {
            const versionText = version.current + (betaActive ? (" " + version.percentage()) : "");
            d.innerHTML("span_currentVersion", versionText);
            document.title = "奇异物质维度 " + version.current + " 作者：alemaninc，汉化：qwqe198（qq2960729702）";
        }
    },
    {
        function: function() {
            updateYellowLightCache();
        },
        onImport: true
    },
    {
        function: function() {
            for (let i = 0; i < 2; i++) {
                if (study13 && study13.updateRewardLevels) {
                    study13.updateRewardLevels();
                }
            }
        },
        onImport: true
    },
    {
        function: function() {
            for (let tier of Object.keys(achievementList)) {
                if (achievement.perAchievementReward[tier]) {
                    achievement.perAchievementReward[tier].currentVal = achievement.perAchievementReward[tier].calc(achievement.ownedInTier(tier));
                }
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (debugActive) {
                for (let stat of Object.keys(miscStats).filter(x => miscStats[x].type === "breakdown")) {
                    for (let i = 0; i < miscStats[stat].modifiers.length; i++) {
                        if (miscStats[stat].modifiers[i]) {
                            console.error("stat." + stat + " 修正项 " + i + " 没有 <samp>show</samp> 属性");
                        }
                    }
                }
            }
        }
    },
    {
        function: function() {
            for (let i of Object.keys(miscStats)) {
                if (typeof statGeneration === "function") {
                    statGeneration(i);
                }
            }
        }
    },
    {
        function: function() {
            if (statGenerations) {
                statOrder = Object.keys(statGenerations).sort((a, b) => statGenerations[a] - statGenerations[b]);
            }
        }
    },
    {
        function: function() {
            if (typeof updateStats === "function") {
                updateStats();
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (typeof updateMasteryLayout === "function") {
                updateMasteryLayout();
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (typeof updateStarLayout === "function") {
                updateStarLayout();
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (typeof updateAchievementsTab === "function") {
                updateAchievementsTab();
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (typeof updateSecretAchievementsTab === "function") {
                updateSecretAchievementsTab();
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (largeNumberVisualizationNumbers) {
                for (let i of largeNumberVisualizationNumbers) {
                    i.value = N(i.value);
                }
                largeNumberVisualizationNumbers.sort((a, b) => a.value - b.value);
            }
        }
    },
    {
        function: function() {
            if ((new Date().getUTCMonth() === 3) && (new Date().getUTCDate() === 1)) {
                g.colortheme = "Light";
            }
            if (typeof theme === "function") {
                theme();
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (typeof updateResearchTree === "function") {
                updateResearchTree();
            }
        },
        onImport: true
    },
    {
        function: function() {
            for (let i of Object.keys(research)) {
                if (typeof resizeResearch === "function") {
                    resizeResearch(i);
                }
            }
        }
    },
    {
        function: function() {
            if (typeof generateResearchCanvas === "function") {
                generateResearchCanvas();
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (study13 && study13.renderTree) {
                study13.renderTree();
            }
        }
    },
    {
        function: function() {
            if (study13 && study13.allBindings) {
                for (let i of study13.allBindings) {
                    if (study13.resizeBinding) {
                        study13.resizeBinding(i);
                    }
                }
            }
        }
    },
    {
        function: function() {
            if (study13 && study13.updateBindingTree) {
                study13.updateBindingTree();
            }
        },
        onImport: true
    },
    {
        function: function() {
            for (let i = 0; i < 12; i++) {
                const axisElement = d.element("axisAutobuyerMax" + axisCodes[i]);
                const darkAxisElement = d.element("darkAxisAutobuyerMax" + axisCodes[i]);
                
                if (axisElement && g.axisAutobuyerCaps) {
                    axisElement.value = g.axisAutobuyerCaps[i] || 0;
                }
                if (darkAxisElement && g.darkAxisAutobuyerCaps) {
                    darkAxisElement.value = g.darkAxisAutobuyerCaps[i] || 0;
                }
            }
        },
        onImport: true
    },
    {
        function: function() {
            const element = d.element("darkAxisAutobuyerMaxStars");
            if (element && g.darkAxisAutobuyerCaps) {
                element.value = g.darkAxisAutobuyerCaps[12] || 0;
            }
        },
        onImport: true
    },
    {
        function: function() {
            for (let i = 0; i < 5; i++) {
                const element = d.element("stardustUpgradeAutobuyerMax" + (i + 1));
                if (element && g.stardustUpgradeAutobuyerCaps) {
                    element.value = g.stardustUpgradeAutobuyerCaps[i] || 0;
                }
            }
        },
        onImport: true
    },
    {
        function: function() {
            const element = d.element("starAutobuyerMax");
            if (element && g.starAutobuyerCap !== undefined) {
                element.value = g.starAutobuyerCap;
            }
        },
        onImport: true
    },
    {
        function: function() {
            const element = d.element("wormholeAutomatorValue");
            if (element && g.wormholeAutomatorValue !== undefined) {
                element.value = g.wormholeAutomatorValue;
            }
        },
        onImport: true
    },
    {
        function: function() {
            const element = d.element("stardustAutomatorValue");
            if (element && g.stardustAutomatorValue !== undefined) {
                element.value = g.stardustAutomatorValue;
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (typeof addSecretAchievement === "function") {
                addSecretAchievement(2);
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (typeof statBreakdownCategories === "function") {
                statBreakdownCategories();
            }
        }
    },
    {
        function: function() {
            for (let i of Object.keys(subtabProperties)) {
                for (let j of Object.keys(subtabProperties[i])) {
                    if (subtabProperties[i][j].visible === undefined) {
                        subtabProperties[i][j].visible = () => true;
                    }
                    if (subtabProperties[i][j].glow === undefined) {
                        subtabProperties[i][j].glow = () => false;
                    }
                }
            }
        }
    },
    {
        function: function() {
            for (let i = 0; i < newsList.length; i++) {
                try {
                    if (typeof newsList[i].text !== "string") {
                        console.error("新闻条目 #" + i + " 未定义");
                    }
                } catch (err) {
                    console.error("新闻条目 #" + i + " 未定义");
                }
            }
        }
    },
    {
        function: function() {
            d.display("foo", "none");
        }
    },
    {
        function: function() {
            if (typeof openTab === "function" && g.activeTab) {
                openTab(g.activeTab);
            }
            if (g.activeSubtabs) {
                for (let i of Object.keys(g.activeSubtabs)) {
                    if (typeof openSubTab === "function") {
                        openSubTab(i, g.activeSubtabs[i]);
                    }
                }
            }
        },
        onImport: true
    },
    {
        function: function() {
            if (typeof openTopLevelDiv === "function") {
                openTopLevelDiv("game");
            }
            for (let i = 0; i < newsList.length; i++) {
                d.innerHTML("newsline", newsList[i].text);
                if (typeof viewportWidth === "function" && d.element("newsline")) {
                    newsList[i].frequency = 1 / (viewportWidth() + d.element("newsline").offsetWidth);
                }
            }
            if (typeof openTopLevelDiv === "function") {
                openTopLevelDiv("loadScreen");
            }
        }
    },
    {
        function: function() {
            if (typeof updateHTML === "function") {
                updateHTML();
            }
            if (typeof fineGrainTick === "function") {
                fineGrainTick();
            }
            if (!gameHalted) {
                if (typeof auto_tick === "function") {
                    gameloop = window.setInterval(auto_tick, 50);
                }
                if (typeof fineGrainTick === "function") {
                    fineGrainLoop = window.setInterval(fineGrainTick, 10);
                }
            }
        }
    },
    {
        function: function() {
            const discordElement = d.element("span_footerDiscord");
            if (discordElement && discordInvite) {
                discordElement.href = discordInvite;
            }
        }
    },
    {
        function: function() {
            if (typeof nextNewsItem === "function") {
                nextNewsItem();
            }
            if (typeof openTopLevelDiv === "function") {
                openTopLevelDiv("game");
            }
            window.onerror = (e, s, l, c, o) => {
                console.error(e + " 位于 " + (s ? s.substring(debugActive ? 149 : 53) : s) + " " + l + ":" + c + "<br>" + o);
            };
            initComplete = true;
        }
    },
    {
        function: function() {
            if (g.research && g.research.r8_8 && typeof unlockFeature === "function") {
                unlockFeature("Light");
            }
            if (g.research && g.research.r12_8 && typeof unlockFeature === "function") {
                unlockFeature("Galaxies");
            }
        },
        onImport: true
    }
];

var loadProgress = 0;
var initTick = Date.now();

function initp() {
    d.innerHTML("span_loadPercentage", (loadProgress / initSteps.length * 100).toFixed(1));
    
    const loadProgressElement = d.element("loadprogress");
    if (loadProgressElement) {
        loadProgressElement.style.background = "linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0) " + 
            (loadProgress / initSteps.length * 100) + 
            "%,rgba(102,102,102,0.9) " + 
            (loadProgress / initSteps.length * 100) + 
            "%,rgba(102,102,102,0.9)),rgba(0,255,0,1)";
    }
}

// 改进的初始化执行函数
function startInitialization() {
    // 等待DOM完全加载
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", executeInitSteps);
    } else {
        executeInitSteps();
    }
}

function executeInitSteps() {
    function executeStep(index) {
        if (index >= initSteps.length) {
            return;
        }
        
        try {
            const step = initSteps[index];
            if (typeof step.function === "function") {
                step.function();
            }
            
            loadProgress++;
            initp();
            
            // 使用setTimeout避免阻塞主线程
            setTimeout(() => {
                executeStep(index + 1);
            }, 0);
        } catch (error) {
            console.error("初始化步骤 " + index + " 失败:", error);
            loadProgress++;
            initp();
            setTimeout(() => {
                executeStep(index + 1);
            }, 0);
        }
    }
    
    // 开始执行初始化步骤
    executeStep(0);
}

// 启动初始化
startInitialization();