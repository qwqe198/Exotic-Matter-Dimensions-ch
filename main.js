"use strict";

// 基础存档模板
const basesave = {
	playerName: "EMD" + String(ranint(0, 9999)).padStart(4, "0"),
	exoticmatter: c.d0,
	exoticmatterThisStardustReset: c.d0,
	exoticmatterThisWormholeReset: c.d0,
	exoticmatterThisSpacetimeReset: c.d0,
	totalexoticmatter: c.d0,

	XAxis: c.d0, YAxis: c.d0, ZAxis: c.d0, WAxis: c.d0,
	VAxis: c.d0, UAxis: c.d0, TAxis: c.d0, SAxis: c.d0,
	RAxis: c.d0, QAxis: c.d0, PAxis: c.d0, OAxis: c.d0,

	masteryPower: c.d0,
	baseMasteryPowerGain: c.d1,
	activeMasteries: [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

	masteryContainerStyle: "Legacy",
	masteryIdsShown: true,
	masteryBoostsShown: true,
	masteryActivityShown: true,
	masteryRowsReversed: false,

	timePlayed: 0,
	truetimePlayed: c.d0,

	featuresUnlocked: [],
	colortheme: "Default",
	footerDisplay: "All tabs",

	achOnProgressBar: "N", // "N" = 无，不能使用 undefined 或 null
	activeTab: "main",
	activeSubtabs: Object.fromEntries(Object.keys(subtabList).map(x => [x, subtabList[x][0]])),

	timeThisStardustReset: 0,
	truetimeThisStardustReset: c.d0,
	fastestStardustReset: c.d9e15,

	timeThisWormholeReset: 0,
	truetimeThisWormholeReset: c.d0,
	fastestWormholeReset: c.d9e15,

	timeThisSpacetimeReset: 0,
	truetimeThisSpacetimeReset: c.d0,
	fastestSpacetimeReset: c.d9e15,

	storySnippets: [],
	timeLeft: Date.now(),

	dilatedTime: 0,
	dilationPower: 1,
	dilationUpgrades: [null, 0, 0, 0, 0],
	dilationUpgradesUnlocked: 0,

	notation: "Mixed scientific",
	newsTickerActive: true,
	newsTickerSpeed: 80,
	newsTickerDilation: 0.125,

	zipPoints: 0,
	zipPointMulti: 1,
	version: 1,
	alwaysBeta: false,

	topResourcesShown: {
		exoticmatter: true,
		masteryPower: false,
		stardust: true,
		darkmatter: false,
		hr: true,
		antimatter: false
	},

	glowOptions: {
		buyAxis: true,
		emptyMasteryRow: true,
		overclock: false,
		buyStardustUpgrade: true,
		buyStar: true,
		assignStar: true,
		buyDarkAxis: true,
		gainDarkStar: true,
		study12: true,
		observe: true,
		buyPermanentResearch: true,
		noChromaGeneration: true,
		createGalaxy: false,
		buyLuckRune: true,
		buyLuckUpgrade: false,
		buyPrismaticUpgrade: true,
		buyRefundablePrismaticUpgrade: false,
		buyAntiAxis: true,
		buyWormholeUpgrade: true,
	},

	confirmations: {
		doubleClickToBuy: false,
		stardustReset: false,
		ironWillStardustReset: false,
		buyStardustUpgrade: false,
		wormholeReset: false,
		researchDoubleClick: false,
	},

	hotkeys: savefileHotkeyProperties(),
	EMDLevel: 1,
	EMDLevelDisplayInFooter: 1,

	achievement: Object.fromEntries(achievement.all.map(x => [x, false])),
	secretAchievement: Object.fromEntries(Object.keys(secretAchievementList).map(x => [x, false])),

	achievementIDShown: true,
	completedAchievementTiersShown: true,
	achievementTiersReversed: false,

	clickedInStudy1: false,

	StardustResets: 0,
	TotalStardustResets: 0,

	previousStardustRuns: {
		last10: [],
		wormhole: { fastest: previousPrestige.generate(1, 2, true), highest: previousPrestige.generate(1, 2, true) },
		spacetime: { fastest: previousPrestige.generate(1, 3, true), highest: previousPrestige.generate(1, 3, true) },
		eternity: { fastest: previousPrestige.generate(1, 4, true), highest: previousPrestige.generate(1, 4, true) }
	},

	previousWormholeRuns: {
		last10: [],
		spacetime: { fastest: previousPrestige.generate(2, 3, true), highest: previousPrestige.generate(2, 3, true), efficientest: previousPrestige.generate(2, 3, true) },
		eternity: { fastest: previousPrestige.generate(2, 4, true), highest: previousPrestige.generate(2, 4, true), efficientest: previousPrestige.generate(2, 4, true) }
	},

	stardust: c.d0,
	stardustThisWormholeReset: c.d0,
	stardustThisSpacetimeReset: c.d0,
	totalstardust: c.d0,

	autosaveIsOn: true,
	stardustUpgrades: [0, 0, 0, 0, 0],
	showingCappedStardustUpgrades: true,

	axisAutobuyerOn: false,
	axisAutobuyerUpgrades: 0,
	axisAutobuyerCaps: Array(12).fill("u"),

	stars: 0,
	star: Object.fromEntries(starList.map(x => [x, false])),
	starContainerStyle: "Legacy",
	starIdsShown: true,
	starActivityShown: true,

	darkmatter: c.d0,
	darkmatterThisWormholeReset: c.d0,
	darkmatterThisSpacetimeReset: c.d0,
	totaldarkmatter: c.d0,

	darkXAxis: c.d0, darkYAxis: c.d0, darkZAxis: c.d0, darkWAxis: c.d0,
	darkVAxis: c.d0, darkUAxis: c.d0, darkTAxis: c.d0, darkSAxis: c.d0,
	darkRAxis: c.d0, darkQAxis: c.d0, darkPAxis: c.d0, darkOAxis: c.d0,

	darkstars: c.d0,
	darkstarBulk: true,

	darkEnergy: c.d1,
	stelliferousEnergy: c.d1,
	gravitationalEnergy: c.d1,
	spatialEnergy: c.d1,
	neuralEnergy: c.d1,
	metaEnergy: c.d1,
	vacuumEnergy: c.d1,
	mentalEnergy: c.d1,
	dimensionalEnergy: c.d1,
	temporalEnergy: c.d1,

	hawkingradiation: c.d0,
	hawkingradiationThisSpacetimeReset: c.d0,
	totalhawkingradiation: c.d0,

	WormholeResets: 0,
	TotalWormholeResets: 0,

	ach505Progress: c.d0,
	shiningBrightTonight: true,
	ach519possible: true,
	ach524possible: true,
	ach525possible: true,
	ach526possible: true,

	darkAxisAutobuyerOn: false,
	darkAxisAutobuyerUpgrades: 0,
	darkAxisAutobuyerCaps: Array(13).fill("u"),

	stardustUpgradeAutobuyerOn: false,
	stardustUpgradeAutobuyerUpgrades: 0,
	stardustUpgradeAutobuyerCaps: Array(5).fill("u"),

	starAutobuyerOn: false,
	starAutobuyerUpgrades: 0,
	starAutobuyerCap: "u",

	starAllocatorOn: false,
	starAllocatorBuild: [],

	wormholeAutomatorOn: false,
	wormholeAutomatorMode: 0,
	wormholeAutomatorValue: "1",

	stardustAutomatorOn: false,
	stardustAutomatorMode: 0,
	stardustAutomatorValue: "1",

	research: Object.fromEntries(Object.keys(research).map(x => [x, false])),
	researchVisibility: [],
	researchRespec: false,
	buyMaxResearch: false,

	researchLoadouts: (function () {
		let out = []
		for (let i = 0; i < 9; i++) out.push({
			name: "配置方案 " + (i + 1),
			savedResearch: []
		})
		return out
	})(),

	totalDiscoveries: c.d0,
	spentDiscoveries: c.d0,
	observations: Array(4).fill(c.d0),
	knowledge: c.d0,

	activeStudy: 0,
	studyCompletions: [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

	studyContainerStyle: "Compact",
	studyContainerCompactSelected: undefined,
	completedStudiesShown: true,
	restoreResearchAfterStudy: false,

	chroma: Array(9).fill(c.d0),
	lumens: Array(9).fill(c.d0),
	activeChroma: null,
	showLightEffectsFrom0: false,
	haltChromaIfLacking: false,

	galaxies: 0,
	highestGalaxies: 0,
	highestGalaxiesSpacetime: 0,
	ach711Progress: 61,

	luckEssence: 0,
	luckShards: c.d0,
	totalLuckRunes: Object.fromEntries(luckRuneTypes.map(x => [x, c.d0])),
	spentLuckRunes: Object.fromEntries(luckRuneTypes.map(x => [x, c.d0])),
	luckUpgrades: Object.fromEntries(luckRuneTypes.map(x => [x, Object.fromEntries(luckUpgradeList[x].map(y => [y, c.d0]))])),

	luckShardSpendFactor: c.d0,
	luckRuneSpendFactor: c.d0,

	prismatic: c.d0,
	prismaticUpgrades: Object.fromEntries(prismaticUpgradeList.map(x => [x, c.d0])),
	prismaticSpendFactor: c.d0,

	study9: {
		xp: c.d0,
		fracxp: c.d0,
		start: 0,
		resets: 0
	},

	antimatter: c.d0,
	antimatterThisSpacetimeReset: c.d0,
	totalantimatter: c.d0,

	antiXAxis: c.d0, antiYAxis: c.d0, antiZAxis: c.d0, antiWAxis: c.d0,
	antiVAxis: c.d0, antiUAxis: c.d0, antiTAxis: c.d0, antiSAxis: c.d0,
	antiRAxis: c.d0, antiQAxis: c.d0, antiPAxis: c.d0, antiOAxis: c.d0,

	antimatterGalaxies: c.d0,
	antimatterGalaxyBulk: true,
	ach815RewardActive: true,

	study10Options: [],

	researchAutobuyerOn: false,
	researchAutobuyerUpgrades: 0,
	researchAutobuyerMode: 0,

	ach825possible: true,

	study12: {
		empowerments: c.d0,
		fortitude: c.d0
	},

	wormholeUpgrades: [null, ...Array(12).fill(0)],

	ach901Int: c.d0,
	bestTickspeedThisMatrix: c.d1,
	bestTickspeed: c.d1,

	ach907Progress: 0,
	ach908possible: true,
	ach920Completions: 0,

	baselessMilestones: Array(5).fill(1),

	study13Bindings: Object.fromEntries(study13.allBindings.map(x => [x, false])),
	study13ShowParentBindings: false,

	corruptionsUnlocked: 0,
};

var g = decimalStructuredClone(basesave);
const empowerableAxis = {
	normal: ["Y"],
	dark: ["W"],
	anti: ["V"]
};

const selections = {
	achievement: undefined,
	secretAchievement: undefined,
	mastery: undefined,
	masteryClick: undefined,
	star: undefined,
	starClick: undefined,
	research: undefined,
	study13Binding: undefined,
};

var timeSinceGameOpened = 0;
var totalAchievements = 0;
var totalSecretAchievements = 0;
var totalStars = 0;

var totalResearch = {
	temporary: 0,
	permanent: 0,
	overall: function () { return this.temporary + this.permanent }
};

var overclockSpeedupFactor = 1;
var secretAchievementPoints = 0;
var savecounter = 0;
var olddelta = Date.now();
var lastAutosaveTime = Date.now();

var axisAutobuyerProgress = 0;
var wormholeAnimationActive = false;
var wormholeAnimationStart = 0;
var darkAxisAutobuyerProgress = 0;
var stardustUpgradeAutobuyerProgress = 0;
var starAutobuyerProgress = 0;
var researchAutobuyerProgress = 0;
var deltatime = 0;
var lagAchievementTicks = 0;
var fpsAchievementTicks = 0;
var themeAchievementCount = 0;

function gameClick() {
	g.clickedInStudy1 = true;
}

// ===== 选项 & 显示 =====
function changePlayerName() {
	popup({
		text: "输入你的玩家名称：",
		input: g.playerName,
		buttons: [["确认", "if (popupInput().length>40) {notify('玩家名称最多 40 个字符')} else {g.playerName=popupInput()}"]]
	});
}

function availableThemes() {
	let out = ["Default", "Red", "Green", "Blue", "Cyan", "Magenta", "Yellow", "Light Gray", "Dark Gray", "Black", "Light"];
	if (g.secretAchievement[16]) out.push("Wormhole");
	return out;
}

function selectOption(variable, values, flavor = "mode", variableCallback = x => x) {
	popup({
		text: "很遗憾听到你不喜欢 " + variableCallback(g[variable]) + "。你想尝试哪种" + flavor + "？",
		buttons: values.map(x => [variableCallback(x), "g." + variable + "=" + ((typeof x === "string") ? ("'" + x + "'") : x)])
	});
}

function changeTheme() {
	popup({
		text: "很遗憾听到你不喜欢 " + g.colortheme + "。你想尝试哪种主题？",
		buttons: availableThemes().map(x => [x, "g.colortheme='" + x + "';theme()"])
	});
}

function theme() {
	let scheme = dictionary(g.colortheme, {
		"Default": ["color:#39f", "background:#190033"],
		"Red": ["color:#f00", "background:#300"],
		"Green": ["color:#0f0", "background:#030"],
		"Blue": ["color:#00f", "background:#003"],
		"Cyan": ["color:#0ff", "background:#033"],
		"Magenta": ["color:#f0f", "background:#303"],
		"Yellow": ["color:#ff0", "background:#330"],
		"Light Gray": ["color:#ccc", "background:#666"],
		"Dark Gray": ["color:#666", "background:#333"],
		"Black": ["color:#fff", "background:#000"],
		"Light": ["color:#000", "background:#fff"],
		"Wormhole": ["color:#39f", "background-image:repeating-radial-gradient(circle at " + (viewportWidth() / 2) + "px " + (viewportHeight() / 2) + "px, #190033, #330066 " + (viewportDiagonalLength / 20) + "px, #190033 " + (viewportDiagonalLength / 10) + "px); background-size:cover"]
	});
	document.body.style = scheme[0];
	d.element("background").style = scheme[1];
	themeAchievementCount++;
	addSecretAchievement(16);
}

function EMDLevel() {
	if (unlocked("Study XIII")) return 9;
	if (unlocked("Luck") || unlocked("Prismatic") || unlocked("Antimatter")) return 8;
	if (unlocked("Galaxies")) return 7;
	if (unlocked("Light")) return 6;
	if (unlocked("Hawking Radiation")) return 5;
	if (unlocked("Energy")) return 4;
	if (unlocked("Dark Matter")) return 3;
	if (unlocked("Stardust")) return 2;
	return 1;
}

function showEMDLevelTooltip() {
	popup({
		text: "你的 EMD 等级是你在游戏中进度深度的指标。它会在特定的主要进度里程碑处递增。<br><br>EMD 等级纯粹用于指示你的进度（例如 Discord 和存档库），对游戏玩法没有影响。",
		buttons: [["关闭", ""]]
	});
}

/*
用于计算 EMD 分数的权重因子（满分 1,000,000）：
(a) 总奇异物质和声望货币，近似权重如下：
     (i) 奇异物质 = 5
    (ii) 最近解锁的声望货币 = 若在本 EMD 等级解锁则为 5，否则 4，再否则 3
    (iii) 最近解锁的新物质 = 同上
    (iv) 矩阵货币 = 正常值的 1/2
    适当四舍五入。
    (250,000)
(b) 当前阶段的主要特性 (450,000)
(c) 当前阶段的其他特性，若无有意义内容则加到 (a) (150,000)
(d) 成就 (150,000)
EMD 分数永不减少。
*/
function EMDScore(showTooltip, valueArray, level = g.EMDLevel) {
	let factors;

	function giveScore(min, val, max, tariff, formula, taper) {
		let scaled = Decimal.div(
			Decimal.sub(formula(val), formula(min)),
			Decimal.sub(formula(max), formula(min))
		).toNumber();

		scaled = taper
			? ((scaled > 0.95)
				? (1 - 0.05 * Math.exp(19 - scaled * 20))
				: (scaled < 0.05)
					? (min.eq(c.d0) ? Math.max(scaled, 0) : (0.05 * Math.exp(scaled * 20 - 1)))
					: scaled)
			: Math.max(0, Math.min(1, scaled));

		return Math.round(tariff * scaled);
	}

	if (level === 1) {
		factors = [
			["总奇异物质", g.totalexoticmatter, x => giveScore(c.d0, x, N(1e22), 400000, n => n.div(c.e2).add(c.d1).log10(), true), 400000],
			["总轴数", stat.totalAxis, x => x.min(c.d60).toNumber() * 7500, 450000],
			["第 1 层成就", achievement.ownedInTier(1), x => x * 10000, 150000]
		];
	} else if (level === 2) {
		factors = [
			["总奇异物质", g.totalexoticmatter, x => giveScore(c.e25, x, N(1e150), 125000, n => n.add(c.d10).log10().log10(), true), 125000],
			["总星尘", g.totalstardust, x => giveScore(c.d0, x, c.e12, 575000, n => n.div(c.e2).add(c.d1).log10(), true), 575000],
			["星星", g.stars, x => (x >= 6) ? (150000 - 10000 * 0.4 ** (x - 6)) : (x * 25000), 150000],
			["第 2 层成就", achievement.ownedInTier(2), x => (x === 17) ? 150000 : (x === 16) ? 147500 : (x === 1) ? 2500 : (x === 0) ? 0 : ((x - 1) * 10000), 150000]
		];
	} else if (level === 3) {
		factors = [
			["总奇异物质", g.totalexoticmatter, x => giveScore(N(1e125), x, N("e1800"), 90000, n => n.add(c.d10).log10().log10(), true), 90000],
			["总星尘", g.totalstardust, x => giveScore(N(1e11), x, N(1e70), 70000, n => n.add(c.d10).log10().log10(), true), 70000],
			["总暗物质", g.totaldarkmatter, x => giveScore(c.d0, x, N(1e35), 450000, n => n.div(c.e3).add(c.d1).log10(), true), 450000],
			["暗星", g.darkstars, x => 90250 - (9.5 - x.min(c.d9).toNumber()) ** 2 * 1000, 90000],
			["星星", g.stars, x => x * 22500 - 127500, 150000],
			["第 3 层成就", achievement.ownedInTier(3), x => x * 12500, 150000]
		];
	} else if (level === 4) {
		factors = [
			["总奇异物质", g.totalexoticmatter, x => giveScore(N("e1500"), x, N("e3e5"), 100000, n => n.add(c.d10).log10().log10(), true), 100000],
			["总星尘", g.totalstardust, x => giveScore(N(1e55), x, N("e3000"), 80000, n => n.add(c.d10).log10().log10(), true), 80000],
			["总暗物质", g.totaldarkmatter, x => giveScore(N(1e25), x, N("e4000"), 70000, n => n.add(c.d10).log10().log10(), true), 70000],
			["解锁的能量类型", g.stardustUpgrades[4] - 1, x => (x - 1) * 60000, 300000],
			["星尘升级 1-4", g.stardustUpgrades.slice(0, 4).sum(), x => (x >= 19) ? (27000 * x - 498000) : (12500 * 2 ** (x - 18)), 150000],
			["星星", g.stars, x => x * 4000 - 47000, 90000],
			["暗星", g.darkstars, x => x.toNumber() * 1000, 60000],
			["第 4 层成就", achievement.ownedInTier(4), x => x * 12000 - 6000, 150000]
		];
	} else if (level === 5) {
		factors = [
			["总奇异物质", g.totalexoticmatter, x => giveScore(N("e2e5"), x, N("e8e7"), 75000, n => n.add(c.d10).log10().log10().sub(c.d5).max(c.d0).pow(c.d2), true), 75000],
			["总星尘", g.totalstardust, x => giveScore(N("e1500"), x, N("e5e4"), 50000, n => n.add(c.d10).log10().log10().sub(c.d3).max(c.d0).pow(c.d2), true), 50000],
			["总暗物质", g.totaldarkmatter, x => giveScore(N("e2500"), x, N("ee5"), 50000, n => n.add(c.d10).log10().log10().sub(c.d3).max(c.d0).pow(c.d2), true), 50000],
			["总霍金辐射", g.totalhawkingradiation, x => giveScore(c.d0, x, N(1e12), 75000, n => n.div(c.d10).add(c.d1).log10(), true), 75000],
			["知识", g.knowledge, x => giveScore(c.d0, x, N("1e500"), 337500, n => n.add(c.d10).log10().pow(c.d0_5), true), 337500],
			[unlocked("Studies") ? "研究完成次数" : "? ? ?", g.studyCompletions.slice(1).sum(), x => x * 10000, 75000],
			["第 5 层成就", achievement.ownedInTier(5), x => x * 11250, 337500]
		];
	} else if (level === 6) {
		factors = [
			["总奇异物质", g.totalexoticmatter, x => giveScore(N("e5e7"), x, N("e4e8"), 80000, n => n.add(c.d10).log10().log10(), true), 80000],
			["总星尘", g.totalstardust, x => giveScore(N("e4e4"), x, N("e2e5"), 50000, n => n.add(c.d10).log10().log10(), true), 50000],
			["总暗物质", g.totaldarkmatter, x => giveScore(N("e6e4"), x, N("e2.5e5"), 50000, n => n.add(c.d10).log10().log10(), true), 50000],
			["总霍金辐射", g.totalhawkingradiation, x => giveScore(c.e10, x, N(1e30), 70000, n => n.add(c.d10).log10().log10(), true), 70000],
			["总 RGB 光素", g.lumens.slice(0, 3).sumDecimals(), x => giveScore(c.d0, x, N(150), 450000, n => n, true), 450000],
			["知识", g.knowledge, x => giveScore(N("e450"), x, N("e5000"), 60000, n => n.add(c.d10).log10().log10(), true), 60000],
			["研究完成次数", g.studyCompletions.slice(1).sum(), x => 10000 * (x - 6), 90000],
			["第 6 层成就", achievement.ownedInTier(6), x => Math.max(x * 5000, (x - 1) * 10000), 150000]
		];
	} else if (level === 7) {
		factors = [
			["总奇异物质", g.totalexoticmatter, x => giveScore(N("e3e8"), x, N("e8e8"), 85000, n => n.add(c.d10).log10().log10(), true), 85000],
			["总星尘", g.totalstardust, x => giveScore(N("e1.5e5"), x, N("e3.5e5"), 55000, n => n.add(c.d10).log10().log10(), true), 55000],
			["总暗物质", g.totaldarkmatter, x => giveScore(N("e1.5e5"), x, N("e1.2e6"), 55000, n => n.add(c.d10).log10().log10(), true), 55000],
			["总霍金辐射", g.totalhawkingradiation, x => giveScore(N("e25"), x, N("e80"), 55000, n => n.add(c.d10).log10().log10(), true), 55000],
			["最高星系数", g.highestGalaxies, x => 50000 * (x - 1), 150000],
			["知识", g.knowledge, x => giveScore(N("e4000"), x, N("e2.5e4"), 100000, n => n.add(c.d10).log10().log10(), true), 100000],
			["研究完成次数", g.studyCompletions.slice(1).sum(), x => 12500 * (x - 12), 100000],
			["总光素", g.lumens.sumDecimals(), x => x.gt(c.d2e3) ? 250000 : x.gt(1600) ? (x.toNumber() * 125) : x.gt(1250) ? ((x.toNumber() - 200) * 1000 / 7) : x.gt(1000) ? ((x.toNumber() - 500) * 200) : x.gt(800) ? ((x.toNumber() - 600) * 250) : x.gt(640) ? ((x.toNumber() - 640) * 312.5) : 0, 250000],
			["第 7 层成就", achievement.ownedInTier(7), x => x * 8000 - 2000, 150000]
		];
	} else if (level === 8) {
		factors = [
			["总奇异物质", g.totalexoticmatter, x => giveScore(N("e7e8"), x, N("e3e10"), 85000, n => n.add(c.d10).log10().log10(), true), 85000],
			["总星尘", g.totalstardust, x => giveScore(N("e2.5e5"), x, N("e3e6"), 55000, n => n.add(c.d10).log10().log10(), true), 55000],
			["总暗物质", g.totaldarkmatter, x => giveScore(N("ee6"), x, N("e3e7"), 55000, n => n.add(c.d10).log10().log10(), true), 55000],
			["总霍金辐射", g.totalhawkingradiation, x => giveScore(N("e60"), x, N("e6000"), 55000, n => n.add(c.d10).log10().log10(), true), 55000],
			[g.research.r24_5 ? "三叶草符文" : "? ? ?（购买研究 24-5）", g.totalLuckRunes.trifolium, x => giveScore(c.d0, x, N(25000), 50000, n => n, true), 50000],
			[g.research.r24_3 ? "四叶草符文" : "? ? ?（购买研究 24-3）", g.totalLuckRunes.quatrefolium, x => giveScore(c.d0, x, N(2500), 50000, n => n, true), 50000],
			[g.research.r25_3 ? "五叶草符文" : "? ? ?（购买研究 25-3）", g.totalLuckRunes.cinquefolium, x => giveScore(c.d0, x, N(200), 50000, n => n, true), 50000],
			[unlocked("Prismatic") ? "不可退款棱镜升级" : "? ? ?（购买研究 20-8）", nonRefundablePrismaticUpgrades.map(x => g.prismaticUpgrades[x]).sumDecimals(), x => giveScore(c.d0, x, N(2400), 150000, n => n, true), 150000],
			[unlocked("Antimatter") ? "总反轴" : "? ? ?（完成研究 IX）", stat.totalAntiAxis, x => giveScore(c.d0, x, N(625), 150000, n => n, true), 150000],
			["知识", g.knowledge, x => giveScore(N("e1.75e4"), x, N("e1.5e6"), 37500, n => n.add(c.d10).log10().log10(), true), 37500],
			["研究完成次数", g.studyCompletions.slice(1).sum(), x => 1500 * (x - 21), 37500],
			["总光素", g.lumens.sumDecimals(), x => giveScore(N(1500), x, N(2e5), 37500, n => n.add(c.d1).log10(), true), 37500],
			["最高星系数", g.highestGalaxies, x => x * 6000 - 22500, 37500],
			["第 8 层成就", achievement.ownedInTier(8), x => x * 6000, 150000]
		];
	} else if (level === 9) {
		factors = [
			["总奇异物质", g.totalexoticmatter, x => giveScore(N("e2e10"), x, N("ee13"), 85000, n => n.add(c.d10).log10().log10(), true), 85000],
			["总星尘", g.totalstardust, x => giveScore(N("e2e6"), x, N("e4e7"), 55000, n => n.add(c.d10).log10().log10(), true), 55000],
			["总暗物质", g.totaldarkmatter, x => giveScore(N("e2e7"), x, N("ee9"), 55000, n => n.add(c.d10).log10().log10(), true), 55000],
			["总霍金辐射", g.totalhawkingradiation, x => giveScore(N("e4000"), x, N("ee5"), 55000, n => n.add(c.d10).log10().log10(), true), 55000],
			["研究 XIII 完成次数", g.studyCompletions[13], x => (x === 256) ? 450000 : (x >= 200) ? (900 * x + 195000) : (x >= 144) ? (900 * x + 170400) : (x >= 96) ? (1050 * x + 124200) : (x >= 56) ? (1260 * x + 79440) : (x >= 24) ? (1575 * x + 37200) : (2100 * x), 450000],
			["知识", g.knowledge, x => giveScore(N("ee6"), x, N("ee8"), 30000, n => n.add(c.d10).log10().log10(), true), 30000],
			["除 XIII 外的研究完成次数", g.studyCompletions.slice(1, 13).sum(), x => Math.max(x - 43.5, 0) ** 2 * 1500 - 375, 30000],
			["总光素", g.lumens.sumDecimals(), x => giveScore(N(1.5e5), x, N(1.5e6), 30000, n => n.add(c.d1).log10(), true), 30000],
			["五叶草符文", g.totalLuckRunes.cinquefolium, x => giveScore(N(150), x, N(750), 15000, n => n, true), 15000],
			[prismaticUpgradeName("prismaticSpeed"), g.prismaticUpgrades.prismaticSpeed, x => giveScore(N(675), x, N(4050), 15000, n => n, true), 15000],
			["反 X 轴", g.antiXAxis, x => giveScore(N(200), x, N(700), 15000, n => n, true), 15000],
			["不可重复虫洞升级", g.wormholeUpgrades.slice(1, 10).sum(), x => x * 1000, 9000],
			["可重复虫洞升级", g.wormholeUpgrades.slice(10, 13).sum(), x => x * 100, 6000],
			["第 9 层成就", achievement.ownedInTier(9), x => (x >= 9) ? (6000 * x - 48000) : [0, 10, 30, 70, 150, 350, 750, 1500, 3000][x], 150000]
		];
	}

	function scoreFactor(i) {
		return Math.max(0, Math.min(factors[i][3], Math.round(factors[i][2]((valueArray === undefined) ? factors[i][1] : valueArray[i]))));
	}

	if (showTooltip) popup({
		text: "你的 EMD 等级是整个游戏进度的数值指标。它会在主要的进度里程碑处递增。<br><br>EMD 等级仅用于无剧透的进度指示器（如存档库和 Discord），对游戏玩法没有影响。<br><br>你的 EMD 等级是 <b>" + level + "</b>。<hr>EMD 分数用于在存档库等情况下进一步细分每个 EMD 等级（存档按进度排序）。EMD 分数是你在当前 EMD 等级内进度的指标：满分为 1,000,000，解锁新等级后会重置。与 EMD 等级一样，它对游戏玩法没有影响。<br><br>你的 EMD 分数是：<br>" +
			"<table style=\"width:95%\">" +
			"<colgroup><col style=\"width:30%\"/><col style=\"width:25%\"/><col style=\"width:20%\"/><col style=\"width:20%\"/></colgroup>" +
			"<tbody style=\"width:100%\">" +
			"<tr><th style=\"text-align:left;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">因素</th>" +
			"<th style=\"text-align:center;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">因素数值</th>" +
			"<th style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">得分</th>" +
			"<th style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">最高得分</th></tr>" +
			factors.map((x, i) =>
				"<tr><td style=\"text-align:left;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">" + x[0] + "</td>" +
				"<td style=\"text-align:center;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">" + BEformat(x[1]) + "</td>" +
				"<td style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">" + BEformat(scoreFactor(i)) + "</td>" +
				"<td style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">" + BEformat(x[3]) + "</td></tr>"
			).join("") +
			"<tr><td style=\"text-align:left;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">总计</td>" +
			"<td style=\"text-align:center;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\"></td>" +
			"<td style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">" + BEformat(countTo(factors.length, true).map(x => scoreFactor(x)).sum()) + "</td>" +
			"<td style=\"text-align:right;border-style:solid;border-width:1px;border-color:rgba(0,255,0,0.5);\">1,000,000</td></tr>" +
			"</tbody></table><br><i>注意：EMD 分数是综合指标，不能准确用于关卡封锁用途。</i>",
		buttons: [["关闭", ""]]
	});

	return countTo(factors.length, true).map(x => scoreFactor(x)).sum();
}

// ===== 离线时间 / 扩张 =====
var timeState = 0; // 0 = 正常, 1 = 超频, 2 = 冻结, 3 = 均衡

const dilationUpgrades = [
	null,
	{
		tooltip: "将超频上限提升至 {e}×",
		cost: function (x = g.dilationUpgrades[1]) { return this.effect(x + 1) * 144 },
		cap: 22,
		effect: function (x = g.dilationUpgrades[1]) { return Decimal.decibel(x + 18).toNumber() },
		effectFormat: function (x = g.dilationUpgrades[1]) { return this.effect(x).toFixed(0) },
		tickspeedNeeded: c.d8
	},
	{
		tooltip: "超频软上限延后 {e}",
		cost: function (x = g.dilationUpgrades[2]) { return 1440 + 60 * Math.max(0, Math.max(x, x * 4 - 141) - 23) + Math.max(0, Math.max(x, x * 4 - 141) - 23) ** 2 * 1.25 },
		cap: 84,
		effect: function (x = g.dilationUpgrades[2]) { return Math.max(2 * x, 3 * x - 60) },
		effectFormat: function (x = g.dilationUpgrades[2]) { return this.effect(x).toFixed(0) },
		tickspeedNeeded: N(128),
	},
	{
		tooltip: "超频软上限减少 {e}%",
		cost: function (x = g.dilationUpgrades[3]) { return 64800 + 43200 * x },
		cap: 10,
		effect: function (x = g.dilationUpgrades[3]) { return x === 10 ? 0.1 : x === 0 ? 1 : Decimal.decibel(-x).toNumber() },
		effectFormat: function (x = g.dilationUpgrades[3]) { return N((1 - this.effect(x)) * 100).noLeadFormat(2) },
		tickspeedNeeded: N(32768)
	},
	{
		tooltip: "时间速度提升 {e}%",
		cost: function (x = g.dilationUpgrades[4]) { return 150 + 300 * x },
		cap: 24,
		effect: function (x = g.dilationUpgrades[4]) { return x === 24 ? c.d2 : x === 0 ? c.d1 : N(1 + Math.round(x * 4 + x ** 2 / 144) / 100) },
		effectFormat: function (x = g.dilationUpgrades[4]) { return this.effect(x).sub(c.d1).mul(c.e2).toFixed(0) },
		tickspeedNeeded: c.d2pow31
	}
];

function buyDilationUpgrade(x) {
	if ((g.dilationUpgrades[x] < dilationUpgrades[x].cap) && (g.dilatedTime > dilationUpgrades[x].cost())) {
		g.dilatedTime -= dilationUpgrades[x].cost();
		g.dilationUpgrades[x]++;
	}
	updateOverclockScrollbar();
}

function unlockDilationUpgrade() {
	g.dilationUpgradesUnlocked++;
	popup({
		text: "通过达到 " + BEformat(dilationUpgrades[g.dilationUpgradesUnlocked].tickspeedNeeded) + "× 时间速度，你解锁了一个新的扩张升级！请在“离线时间”子标签页中查看。",
		buttons: [["关闭", ""]]
	});
}

function overclockToSoftcap() {
	g.dilationPower = Math.log2(stat.overclockSoftcap);
	updateOverclockScrollbar();
}

function setTimeState(x) { timeState = (timeState === x) ? 0 : x }

function timeAlwaysEqualized() { return StudyE(3) || StudyE(9) || study13.bound(236) }

function updateOverclockScrollbar() {
	d.element('dilationSpeedupFactor').max = Math.ceil(Math.log2(dilationUpgrades[1].effect()) * 1000) / 1000;
	d.element('dilationSpeedupFactor').value = g.dilationPower;
}

function getRealOverclockSpeedup() {
	if (timeState === 2) {
		overclockSpeedupFactor = 0;
		g.dilatedTime += deltatime;
	} else if (timeState === 1) {
		let added = stat.baseOverclockSpeedup - 1;
		let cost = stat.overclockCost * deltatime;
		let affordable = Math.min(1, g.dilatedTime / cost);
		overclockSpeedupFactor = 1 + added * affordable;
		g.dilatedTime -= cost * affordable;
		if (Math.abs(g.dilatedTime) < 1e-12) { g.dilatedTime = 0 }
		if (affordable < 1) { timeState = 0 }
	} else {
		overclockSpeedupFactor = 1;
	}
}

function wormholeAmplificationMultiplier() {
	return Math.floor(Math.min(2 ** d.element("wormholeAmplification").value, 1 + g.dilatedTime / g.timeThisWormholeReset));
}

function wormholeAmplificationCost() {
	return g.timeThisWormholeReset * (wormholeAmplificationMultiplier() - 1);
}

// ===== 剧情 & 特性 =====
function unlockFeature(x) {
	if (!g.featuresUnlocked.includes(x)) {
		openStory(x);
		g.featuresUnlocked.push(x);
	}
}

function unlocked(x) {
	return g.featuresUnlocked.includes(x);
}

const storyEntries = (() => {
	function EMDLevelIncrement(x) {
		return (g.EMDLevel < x)
			? "<p style=\"font-weight:700;color:#00ff00;\">你的 EMD 等级已提升。</p>"
			: "";
	}

	return {
		"Stardust": {
			dt: 2700,
			text: function () {
				return "<p>宇宙因负质量而坍缩，产生了 " + BEformat(Decimal.add(g.stardust, stat.pendingstardust)) + " 个 <span class=\"_stardust\">星尘</span> 原子。这种强大的资源将使你的奇异物质比以前增长得更快 —— 然而，它的创造消耗了你所有的奇异物质。</p>" +
					"<p>由于放射性衰变，每次创造更多星尘时，你所有的星尘都会被摧毁。因此，每次你需要更多的奇异物质才能获得星尘。</p>" +
					"<p style=\"font-weight:700;\" class=\"blue\">注意：精通在所有重置中都会保留。已阅读的剧情条目可以在“选项 > 热键”中再次访问。</p>" +
					EMDLevelIncrement(2);
			}
		},
		"Dark Matter": {
			dt: 1800,
			text: function () {
				return "<p>你刚刚将 5000 亿颗星尘原子凝聚成一个<span class=\"_darkmatter\">具有正质量的粒子</span>。</p>" +
					"<p>乍一看它似乎毫无用处，但就像你那充斥着基本惰性奇异物质的庞大星系一样，它可能可以被塑造成轴。</p>" +
					EMDLevelIncrement(3);
			}
		},
		"Energy": {
			dt: 2400,
			text: function () {
				return "<p>好吧，你拥有一个充满了奇异物质的宇宙<sup>" + BEformat(g.totalexoticmatter.log10().div(c.d80).floor()) + "</sup>。但是，你意识到所有这些粒子几乎都没有<span class=\"_energy\">能量</span>！</p>" +
					"<p>你设法将星尘塑造成一种增殖反应堆，产生指数增长的暗能量 —— 不幸的是，在你所处的十六维空间中，必须充满极其大量的暗能量才能对你有任何帮助。</p>" +
					EMDLevelIncrement(4);
			}
		},
		"Black hole": {
			dt: 300,
			text: function () {
				return "<p>宇宙中大量的暗物质导致了黑洞的形成。</p>" +
					"<p>以它目前的大小，它对你没有用处……但如果往里面加点暗物质呢？你觉得忍不住想“为了<span class=\"_research\">科学</span>”试一试。</p>";
			}
		},
		"Hawking Radiation": {
			dt: 14400,
			text: function () {
				return "<p>也许你操之过急了。黑洞不断增大，直到吞噬了你宇宙中的所有粒子。</p>" +
					"<p>随着黑洞蒸发，它产生了一股 <span class=\"_wormhole\">霍金辐射</span> 波。</p>" +
					"<p>这是你开始以来第一次，你不知道为什么需要这种新资源。也许是时候进行一些 <span class=\"_research\">研究</span> 了？</p>" +
					EMDLevelIncrement(5);
			}
		},
		"Studies": {
			dt: 3600,
			text: function () {
				return "<p>你决定，对于即将到来的某个虫洞，你将创造一个宇宙 " +
					(visibleStudies().includes(1) ? "并且完全不干涉它" :
						visibleStudies().includes(2) ? "限制恒星形成" :
							"<span style=\"color:#ff0000\">error</span>") +
					"。理论上这是个有害的想法，但你觉得这样做会给你带来<span style=\"color:#cc0000\">启迪</span>。</p>";
			}
		},
		"Light": {
			dt: 5400,
			text: function () {
				return "<p>穿越了 " + BEformat(N(g.TotalWormholeResets)) + " 个宇宙后，很容易感觉自己已经“看遍了一切”。你花了一点时间去欣赏你存在中的简单事物，比如奇异物质的颜色……然后你意识到它似乎没有颜色。一切都沐浴在恒定的灰色光芒中！</p>" +
					"<p>肯定有办法在这个地方创造出" + gradientText("色彩", "-webkit-linear-gradient(0deg,#ff0000,#00ff00,#0000ff)") + "吧？</p>" +
					EMDLevelIncrement(6);
			}
		},
		"Galaxies": {
			dt: 7200,
			text: function () {
				return "<p>暗物质让你的星星变得不稳定，现在如果有超过 60 颗星星靠得太近，它们都会坍缩。</p>" +
					"<p>你需要练习处理更强、更小的 <span class=\"_galaxies\">星系</span> 才能成功。</p>" +
					EMDLevelIncrement(7);
			}
		},
		"Luck": {
			dt: 6300,
			text: function () {
				return "<p>起初，创造<span class=\"_exoticmatter\">空间</span>、形成<span class=\"_stars\">星星</span>和<span class=\"_research\">发现</span>宇宙是如此容易。</p>" +
					"<p>现在发生了什么？曾经足以创造 " + g.totalexoticmatter.mul(realAxisCostDivisor("X")).root(realAxisCostExponent("X")).div(c.d5).log(c.d6).floor().add(c.d1).format() + " 米 X 轴的奇异物质，现在只能提供 " + maxAffordableAxis("X").format() + "；新的观测很少出现，甚至根本不出现。一个拥有 61 颗星星的星系将永远不会形成，无论你等多久。</p>" +
					"<p>就好像一只<span class=\"blue\">看不见的蓝手</span>正在用“平衡性递减收益”挡你的路来烦你。但也许，如果<span class=\"_luck\">运气</span>不在你这边，你可以自己创造？</p>" +
					EMDLevelIncrement(8);
			}
		},
		"Prismatic": {
			dt: 7200,
			text: function () {
				function c(x) { return "<span class=\"" + x + "\">" + x + "</span>" };
				return "<p>奇异物质现在是" + c("green") + "的；霍金辐射是" + c("blue") + "的；星星是远处" + c("white") + "的斑点，周围环绕着" + c("cyan") + "的研究论文星云。在宇宙的尽头，是通往你已经发现的 " + numword(visibleStudies().length) + " 个研究维度的黑暗" + c("red") + "裂缝，这一切都衬着由纯粹成就本质制成的" + c("magenta") + "和" + c("yellow") + "背景。</p>" +
					"<p>这真是辣眼睛！看起来简直像出自一本涂色书……你决心将<span class=\"_prismatic\">颜色</span>混合在一起创造一个美丽的宇宙，尽管你看不出这有什么用。</p>" +
					EMDLevelIncrement(8);
			}
		},
		"Antimatter": {
			dt: 8100,
			text: function () {
				return "<p>宇宙完美平衡，奇异物质将一切推开，暗物质将一切维系在一起。</p>" +
					"<p>这种状态持续多久了？一年？十年？" + timeFormat(g.truetimePlayed) + "？</p>" +
					"<p>据你所知，你一直在十六维的虚空中漂流，创造空间并用星星和星系填充它……但这都是为了什么？有什么在注视着你吗？你是某个冷酷的天体实验的一部分吗？</p>" +
					"<p>那肯定不是真的……无论如何，你决心撕裂出路离开这个地方，不让任何东西阻挡你。也许用一种<span class=\"_antimatter\">新物质</span>打破平衡是个不错的开始？</p>" +
					EMDLevelIncrement(8);
			}
		},
		"Corruption": {
			dt: 2700,
			text: function () {
				let corrupt = corruption.unlocked("axis")
					? axisCodes.filter(x => corruption.list.axis.isCorrupted(x))[0]
					: corruption.unlocked("darkAxis")
						? ("暗 " + axisCodes.filter(x => corruption.list.darkAxis.isCorrupted(x))[0])
						: corruption.unlocked("antiAxis")
							? ("反 " + axisCodes.filter(x => corruption.list.antiAxis.isCorrupted(x))[0])
							: "<span style=\"color:#ff0000\">error</span>";
				return "<p>这是什么？某种墙？就好像 " + corrupt + " 轴正在积极抵抗扩张……</p>" +
					"<p>显然有什么东西在试图阻止你。</p>";
			}
		},
		"Study XIII": {
			dt: 23400,
			text: function () {
				return "<p>一个新的<span style=\"color:#cc0000\">研究</span>子宇宙闪烁着出现了，但这个看起来不一样……</p>" +
					"<p>之前所有的子宇宙都充满了要利用的绑定和知识，并由屏障命名和保护。然而，这一个似乎既没有名字也没有任何绑定，内部没有明显的范式可供挽救，通常必须用资源削弱才能进入的屏障似乎也破碎了。</p>" +
					"<p>就好像你偶然发现了一个空白的宇宙……是你自己创造出来的吗？也许你也可以创建自己的绑定和奖励……</p>" +
					EMDLevelIncrement(9);
			}
		},
		"": {
			dt: 900,
			text: function () { return "" }
		}
	};
})();

function openStory(x) {
	if (storyEntries[x] !== undefined) {
		timeState = 0;
		if (!g.storySnippets.includes(x)) g.storySnippets.push(x);
		popup({
			text: "<h1 id=\"storyTitle\">" + x + "</h1>" + storyEntries[x].text(),
			buttons: [["关闭", ""]]
		});
	}
}

function showPreviousStory() {
	popup({
		text: "你想再次查看哪个剧情条目？",
		buttons: g.storySnippets.map(x => [x, "openStory('" + x + "')"])
	});
}

// ===== 奇异物质 =====
const exoticmatterVariables = ["exoticmatter", "exoticmatterThisStardustReset", "exoticmatterThisWormholeReset", "exoticmatterThisSpacetimeReset", "totalexoticmatter"];

function incrementExoticMatter(x) {
	x = x.fix(c.d0);
	for (let i of exoticmatterVariables) o.add(i, x);
}

const axisEffectHTML = {
	X: "奇异物质获取乘以 {e}",
	darkX: "暗物质获取乘以 {e}",
	antiX: "反物质获取乘以 {e}",
	Y: "X 轴效果提升 +{e}×",
	YEmpowered: "强化 Y 轴在增加 X 轴效果的同时也将其相乘（仅在效果高于 1× 时适用）",
	darkY: "所有暗轴费用降低 {e}×",
	antiY: "幸运碎片、棱镜和反物质获取乘以 {e}",
	Z: "奇异物质获取乘以 {e}（基于奇异物质）",
	darkZ: "暗物质获取乘以 {e}（基于奇异物质）",
	antiZ: "反 X 轴效果乘以 {e}",
	W: "奇异物质获取乘以 {e}（随时间增加）",
	darkW: "精通力获取乘以 {e}",
	darkWEmpowered: "强化暗 W 轴以相同倍数提升色素获取和精通力获取",
	antiW: "所有反轴费用降低 {e}×（基于反物质）",
	V: "所有普通轴费用降低 {e}×",
	darkV: "普通 V 轴强度提升 {e}%",
	antiV: "暗 Y 轴强度提升 {e}%",
	antiVEmpowered: "强化反 V 轴以相同幅度提升反 T 轴和暗 Y 轴",
	U: "星尘获取乘以 {e}（基于未花费星尘）",
	darkU: "暗物质获取每拥有一个暗轴乘以 {e}<br><span class=\"small\">（当前：{e2}×）</span>",
	antiU: "反 Z 轴效果每拥有一个反轴乘以 {e}<br><span class=\"small\">（当前：{e2}×）</span>",
	T: "奇异物质获取乘以 {e}（基于总普通轴）",
	darkT: "暗物质获取乘以 {e}（基于本次星尘重置的时间）",
	antiT: "观测效果增加 {e}<br><span class=\"small\">（当前相当于 {e2}× 知识）</span>",
	S: "奇异物质获取提升至 {e} 次幂",
	darkS: "暗物质获取提升至 {e} 次幂",
	antiS: "反物质获取提升至 {e} 次幂",
	R: "所有普通轴费用提升至 {e} 次幂",
	darkR: "普通 R 轴费用提升至 {e} 次幂",
	antiR: "反 W 轴强度提升 {e}%",
	Q: "能量获取乘以 {e}",
	darkQ: "霍金辐射获取乘以 {e}（基于未花费霍金辐射）",
	antiQ: "所有反轴费用提升至 {e} 次幂",
	P: "Y 轴效果乘以 {e}",
	darkP: "所有暗轴费用提升至 {e} 次幂",
	antiP: "暗 P 轴费用提升至 {e} 次幂",
	O: "前 11 个普通轴的有效等级乘以 {e}",
	darkO: "前 11 个暗轴的有效等级乘以 {e}",
	antiO: "前 11 个反轴的有效等级乘以 {e}",
};

function realAxisCostDivisor(type) {
	let output = stat.axisCostDivisor;
	if (type === "X") { output = output.mul(stat.stardustBoost5.pow(g.XAxis)); }
	if (type === "Y" && g.achievement[312]) { output = output.mul(stat.stardustBoost5.pow(g.YAxis.mul(c.d0_04))); }
	if (study13.bound(25)) { output = output.layerf(x => Math.max(x - study13.bindingEff(25).toNumber(), -1)).max(c.minvalue); }
	return output;
}

function realAxisCostExponent(type) {
	let typeNum = axisCodes.indexOf(type);
	let output = stat.axisCostExponent;
	if (type === "S" && g.research.r3_5) { output = output.mul(researchEffect(3, 5)); }
	if (typeNum < 8) {
		let tier7res = ["r16_2", "r15_2", "r14_2", "r13_2", "r13_1", "r14_1", "r15_1", "r16_1"][axisCodes.indexOf(type)];
		if (g.research[tier7res]) output = output.mul(researchEffect(researchRow(tier7res), researchCol(tier7res)));
	}
	for (let i of researchGroupList.spatialsynergism.effectors[type]) { if (g.research[i]) { output = output.div(research[i].value()); } }
	if (type === "R") { output = output.mul(stat.darkRAxisEffect.pow(stat.realdarkRAxis)); }
	return output;
}

function realAxisScalePower(type) {
	let out = stat.axisScalingPower;
	if (type === "O") { out = out.mul(c.d2); }
	return out;
}

function realAxisSuperscalePower(type) {
	let out = stat.axisSuperscalingPower;
	if (type === "S") { out = out.mul(c.d5); }
	if (type === "R") { out = out.mul(c.d5); }
	if (type === "O") { out = out.mul(c.d9); }
	return out;
}

function axisCost(type, axis) {
	axis = (axis === undefined) ? g[type + "Axis"] : N(axis);
	let cost = null;

	axis = Decimal.semiexpScaling(axis, stat.axisSuperscalingStart, realAxisSuperscalePower(type));
	axis = Decimal.linearScaling(axis, stat.axisScalingStart, realAxisScalePower(type));

	if (type === "X") cost = c.d6.pow(axis).mul(c.d5);
	else if (type === "Y") cost = c.d1_5.pow(axis.simplex(2)).mul(c.e2);
	else if (type === "Z") cost = c.d10.pow(axis.pow(c.d1_379654224)).mul(c.e6);
	else if (type === "W") cost = c.d10.pow(axis.simplex(2)).mul(c.d5e7);
	else if (type === "V") cost = c.d10.pow(axis).mul(c.e20);
	else if (type === "U") cost = c.d10.pow(axis.pow(c.d1_5)).mul(c.e100);
	else if (type === "T") cost = axis.mul(c.d10).add(c.d180).pow10();
	else if (type === "S") cost = c.inf.pow(c.d1_25.pow(axis));
	else if (type === "R") cost = [N("e7.5e12"), c.d4div3, axis].decimalPowerTower();
	else if (type === "Q") cost = [N("e4e13"), c.d1_1, axis].decimalPowerTower();
	else if (type === "P") cost = [N("e1.3e14"), c.d1_03, axis].decimalPowerTower();
	else if (type === "O") cost = axis.add(c.d35).div(c.d30).layerplus(3);
	else functionError("axisCost", type);

	cost = corruption.value("axis", cost);
	cost = cost.pow(realAxisCostExponent(type));
	cost = cost.div(realAxisCostDivisor(type));
	return cost;
}

function maxAffordableAxis(type, em = g.exoticmatter) {
	if (axisCost(type).gte(em) && em.eq(g.exoticmatter)) return g[type + "Axis"];

	let effective_EM = corruption.invertValue("axis", em.mul(realAxisCostDivisor(type)).root(realAxisCostExponent(type)));
	let axis;

	if (type === "X") { axis = effective_EM.lte(c.d5) ? c.dm1 : effective_EM.div(c.d5).log(c.d6); }
	else if (type === "Y") { axis = effective_EM.lte(c.e2) ? c.dm1 : effective_EM.div(c.e2).log(c.d1_5).mul(c.d2).add(c.d0_25).pow(c.d0_5).sub(c.d0_5); }
	else if (type === "Z") { axis = effective_EM.lte(c.e6) ? c.dm1 : effective_EM.log10().sub(c.d6).pow(c.d0_7248191884897692); }
	else if (type === "W") { axis = effective_EM.lte(c.d5e7) ? c.dm1 : effective_EM.div(c.d5e7).log10().mul(c.d2).add(c.d0_25).pow(c.d0_5).sub(c.d0_5); }
	else if (type === "V") { axis = effective_EM.lte(c.e20) ? c.dm1 : effective_EM.log10().sub(c.d20); }
	else if (type === "U") { axis = effective_EM.lte(c.e100) ? c.dm1 : effective_EM.log10().sub(c.e2).pow(c.d2div3); }
	else if (type === "T") { axis = effective_EM.lte(c.e180) ? c.dm1 : effective_EM.log10().sub(c.d180).div(c.d10); }
	else if (type === "S") { axis = effective_EM.lte(c.inf) ? c.dm1 : effective_EM.log(c.d2).div(c.d1024).log(c.d1_25); }
	else if (type === "R") { axis = effective_EM.lte("e7.5e12") ? c.dm1 : effective_EM.log10().div(7.5e12).log(c.d4div3); }
	else if (type === "Q") { axis = effective_EM.lte("e4e13") ? c.dm1 : effective_EM.log10().div(4e13).log(c.d1_1); }
	else if (type === "P") { axis = effective_EM.lte("e1.3e14") ? c.dm1 : effective_EM.log10().div(1.3e14).log(c.d1_03); }
	else if (type === "O") { axis = effective_EM.lte(N(35 / 30).layerplus(3)) ? c.dm1 : effective_EM.layerplus(-3).mul(c.d30).sub(c.d35); }
	else functionError("maxAffordableAxis", arguments);

	axis = Decimal.linearSoftcap(axis, stat.axisScalingStart, realAxisScalePower(type));
	axis = Decimal.semilogSoftcap(axis, stat.axisSuperscalingStart, realAxisSuperscalePower(type));
	return axis.floor().add(c.d1);
}

function maxAxisForAchievement(type) {
	if (achievement.maxForLocks.axis[g.achOnProgressBar] !== undefined) {
		if (achievement.locking(g.achOnProgressBar)) {
			if (achievement.maxForLocks.axis[g.achOnProgressBar][type] !== undefined) {
				return achievement.maxForLocks.axis[g.achOnProgressBar][type];
			}
		}
	}
	return c.maxvalue;
}

function buyAxis(x, manual = false) {
	if (Decimal.eq(maxAxisForAchievement(x), g[x + "Axis"])) { if (manual) { achievement.lockPopup(); } return; }

	if ((g.exoticmatter.gte(axisCost(x))) && (stat.axisUnlocked > axisCodes.indexOf(x))) {
		o.sub("exoticmatter", axisCost(x));
		o.add(x + "Axis", c.d1);
		if (g.XAxis.gt(c.d0)) unlockFeature("Masteries");
	}

	if (g.SAxis.gt(c.d0)) g.ach525possible = false;
	if (axisCodes.map(x => g[x + "Axis"].eq(c.d0)).includes(false)) g.ach526possible = false;

	addAchievements("axisBuy");
}

function buyMaxAxis(caps, manual = false) {
	let total = axisCodes.map(x => g[x + "Axis"]).sumDecimals();
	let totalBefore = stat.totalNormalAxis;

	axis: for (let j = 0; j < stat.axisUnlocked; j++) {
		for (let i = 0; i < 4; i++) {
			if ((g.achOnProgressBar === (202 + i)) && (i === j)) { continue axis; }
		}

		let amount = caps[j] === "u"
			? maxAffordableAxis(axisCodes[j])
			: Decimal.min(maxAffordableAxis(axisCodes[j]), N(caps[j]).fix(c.d0, false));

		if (amount === "NA") continue;
		if (amount.lte(g[axisCodes[j] + "Axis"])) continue;

		amount = amount.min(maxAxisForAchievement(axisCodes[j]));
		if (axisCost(axisCodes[j], amount.sub(c.d1)).lt(g.exoticmatter))
			o.sub("exoticmatter", axisCost(axisCodes[j], amount.sub(c.d1)));

		g[axisCodes[j] + "Axis"] = amount;
	}

	g.exoticmatter = g.exoticmatter.max(c.d0);
	if (g.SAxis.gt(c.d0)) g.ach525possible = false;
	if (axisCodes.map(x => g[x + "Axis"].eq(c.d0)).includes(false)) g.ach526possible = false;

	if (axisCodes.map(x => g[x + "Axis"]).sumDecimals().sub(totalBefore).gte(c.d4800)) addAchievement(530);
	if (g.XAxis.gt(c.d0)) unlockFeature("Masteries");

	addAchievements("axisBuy");

	if (manual &&
		(achievement.maxForLocks.axis[g.achOnProgressBar] !== undefined) &&
		achievement.locking(g.achOnProgressBar) &&
		axisCodes.map(x => g[x + "Axis"]).sumDecimals().eq(total)) {
		achievement.lockPopup();
	}
}

var empoweredAxisBought = 0;
function buyEmpoweredAxis() {
	empoweredAxisBought++;
	for (let i = 18; i < 23; i++) addSecretAchievement(i);
}

// Masteries
const masteryData = {
	11: { icon: "<span class=\"_exoticmatter\">EM</span><sup>+</sup>" },
	12: { icon: "<span class=\"_exoticmatter\">A$</span><sup>-</sup>" },
	21: { icon: "<span class=\"_exoticmatter\">X</span><sup>+</sup>" },
	22: { icon: "<span class=\"_exoticmatter\">Y</span><sup>+</sup>" },
	31: { icon: "<span class=\"_exoticmatter\">Z</span><sup>+</sup>" },
	32: { icon: "<span class=\"_exoticmatter\">W</span><sup>+</sup>" },
	41: { icon: "<span class=\"_mastery\">M</span><span class=\"xscript\"><sup>+</sup><sub class=\"_mastery\">x1</sub></span>" },
	42: { icon: "<span class=\"_stardust\">S</span><sup>+</sup>", req: function () { return g.exoticmatterThisSpacetimeReset.gte(stat.stardustExoticMatterReq) || (g.StardustResets > 0) || (g.WormholeResets > 0) } },
	43: { icon: "<span class=\"_mastery\">M</span><span class=\"xscript\"><sup>+</sup><sub class=\"_mastery\">x2</sub></span>" },
	51: { icon: "<span class=\"_exoticmatter\">X</span><sup>+</sup>" },
	52: { icon: "<span class=\"_mastery\">M</span><span class=\"xscript\"><sup>+</sup><sub class=\"_mastery\">1x</sub></span>" },
	61: { icon: "<span class=\"_darkmatter\">X</span><sup>+</sup>" },
	62: { icon: "<span class=\"_darkmatter\">A</span><sup>-</sup>" },
	63: { icon: "<span class=\"_darkmatter\">DS$</span><sup>-</sup>" },
	71: { icon: "<span class=\"_energy\">E</span><sup>+</sup>" },
	72: { icon: "<span class=\"_energy\">E</span><sup>^</sup>" },
	81: { icon: "<span class=\"_exoticmatter\">X</span>→<span class=\"_mastery\">MP</span>" },
	82: { icon: "<span class=\"_exoticmatter\">EM</span>→<span class=\"_mastery\">MP</span>" },
	83: { icon: "<span class=\"_darkmatter\">DM</span>→<span class=\"_mastery\">MP</span>" },
	84: { icon: "<span class=\"_stardust\">S</span>→<span class=\"_mastery\">MP</span>" },
	85: { icon: "<span class=\"_mastery\">MP</span><sup>+</sup>" },
	91: { icon: "<span class=\"_time\">t</span>→<span class=\"_mastery\">M<sub>8x</sub></span>" },
	92: { icon: "<span class=\"_time\">t</span><sup>-1</sup>→<span class=\"_mastery\">M<sub>8x</sub></span>" },
	101: { icon: "<span class=\"_achievements\">A</span><span class=\"xscript\"><sup>+</sup><sub class=\"_achievements\">501</sub></span>", softcap: function () { return g.wormholeUpgrades[5] ? wormholeUpgrades[5].eff() : c.d75 } },
	102: { icon: "<span class=\"_wormhole\">HR</span><sup>+</sup>" },
	103: { icon: "<span class=\"_research\">K</span><sup>+</sup>" },
	104: { icon: "<span class=\"_stars\">C</span><sup>+</sup>", req: function () { return g.research.r10_11 } },
	105: { icon: "<span class=\"_stars\">" + icon.star("") + "$</span><sup>-</sup>", req: function () { return g.achievement[711] } },
	111: { icon: "<span class=\"_mastery\">M<sub>104</sub></span>→<span class=\"_prismatic\">P</span>", req: function () { return g.research.r23_6 } },
	112: { icon: "<span class=\"_mastery\">M</span><span class=\"xscript\"><sup>+</sup><sub class=\"_mastery\">104</sub></span>", req: function () { return g.research.r23_10 } }
};

const totalMasteryRows = Math.floor(Object.keys(masteryData).map(x => Number(x)).reduce((x, y) => Math.max(x, y)) / 10);

function fixMasteryArrays() {
	let masteryArrays = ["activeMasteries"];
	for (let i of masteryArrays) while (g[i].length <= totalMasteryRows) g[i].push(0);
}
fixMasteryArrays();

function MasteryE(x) {
	x = Number(x);
	if (masteryData[x].req !== undefined) { if (!masteryData[x].req()) return false; }
	let row = Math.floor(x / 10);
	if (g.activeMasteries[row] === 0) return false;
	if (StudyE(8)) return g.activeMasteries[row] === (x % 10);
	if (g.achievement[708] && (row === 10) && [101, 103].includes(x) && [1, 3].includes(g.activeMasteries[10])) return true;
	return (g.activeMasteries[row] === (x % 10)) || masteredRow(row);
}

function masteredRow(x) {
	if (x === 1) return g.stardustUpgrades[3] > 0;
	if (x <= 9) return g.star[[51, 52, 53, 54, 101, 102, 103, 104][x - 2]];
	if (x === 11) return g.prismaticUpgrades.masterSpark.gt(c.d0);
	return false;
}

function tryToggleMastery(x) {
	if (g.confirmations.doubleClickToBuy && (g.masteryContainerStyle === "Modern")) {
		if (selections.masteryClick === x) {
			toggleMastery(x, true);
		}
	} else {
		toggleMastery(x, true);
	}
	selections.masteryClick = x;
}

function toggleMastery(x, manual = false) {
	if (achievement.maxForLocks.mastery.includes(Number(g.achOnProgressBar)) && achievement.locking(g.achOnProgressBar)) {
		if (manual) { achievement.lockPopup(); }
		return;
	}
	let row = Math.floor(x / 10);
	if (!(x === g.activeMasteries[row])) {
		if ((g.activeMasteries[row] !== 0) && (!MasteryE(x))) masteryReset();
		g.activeMasteries[row] = x % 10;
	}
	g.ach524possible = g.ach524possible && achievement(524).active();
}

function unassignMasteryRow(row) {
	if (g.activeMasteries[row] !== 0) {
		g.activeMasteries[row] = 0;
		masteryReset();
	}
}

function masteryEffect(x) {
	if (x === 11) return g.masteryPower.add(c.d1).pow(masteryBoost(11).mul(c.d0_1));
	if (x === 12) return g.masteryPower.add(c.d1).pow(masteryBoost(12).mul(c.d0_15));
	if (x === 21) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).dilate(c.d0_6).pow(masteryBoost(21).mul(c.d0_0175)), c.e50, c.d0_2);
	if (x === 22) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).dilate(c.d0_6).pow(masteryBoost(22).mul(c.d0_035)), c.e100, c.d0_1);
	if ([31, 32].includes(x)) return g.masteryPower.add(c.d1).log10().pow(c.d0_5).mul(c.d0_75).mul(masteryBoost(x));
	if ([41, 43].includes(x)) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).log10().div(c.d15), c.d1, c.d2).mul(masteryBoost(x)).add(c.d1);
	if (x === 42) return g.masteryPower.add(c.e4).dilate(c.d0_5).div(c.e2).pow(masteryBoost(42));
	if (x === 51) return g.masteryPower.add(c.d1).log10().pow(c.d0_6).mul(c.d2_5).mul(masteryBoost(51));
	if (x === 52) {
		let out = g.masteryPower.add(c.d1).log10().pow(c.d0_4).mul(c.d2_5).mul(masteryBoost(52)).add(c.d1);
		if (g.research.r19_9) out = out.pow(researchEffect(19, 9));
		return out;
	}
	if (x === 61) return g.masteryPower.add(c.d10).log10().pow(c.d0_1).sub(c.d1).mul(masteryBoost(61)).add(c.d1);
	if (x === 62) return g.masteryPower.add(c.d10).log10().pow(masteryBoost(62).mul(-0.04));
	if (x === 63) return g.masteryPower.add1Log(c.d10).pow(c.d0_8).mul(masteryBoost(63));
	if (x === 71) return g.masteryPower.pow(c.d1_25).add(c.e10).log10().log10().pow(masteryBoost(71));
	if (x === 72) return Decimal.logarithmicSoftcap(g.masteryPower.pow(c.d1_25).add(c.e10).log10().log10().pow(c.d0_5).sub(c.d1), c.d1, c.d5).mul(masteryBoost(72)).add(c.d1);
	if ([81, 82, 83, 84].includes(x)) {
		let output = [g.masteryPower.add(c.d1).log10().pow(c.d0_5), [c.d0_03, c.d0_1, c.d0_2, c.d0_24][x - 81], masteryBoost(x)].productDecimals();
		if (x === 81) output = output.mul(g.XAxis.pow(c.d0_4));
		if (x === 82) output = output.mul(g.exoticmatter.add(c.d10).log10().log10());
		if (x === 83) output = output.mul(g.darkmatter.add(c.d10).log10().log10().pow(c.d0_75));
		if (x === 84) output = output.mul(g.stardust.add(c.d10).log10().log10().pow(c.d0_5));
		return Decimal.logarithmicSoftcap(output, c.e2, c.d1).pow10();
	}
	if (x === 85) return [g.masteryPower.add(c.d10).log10().log10(), masteryBoost(85), c.d0_2].productDecimals();
	if (x === 91) return g.masteryPower.add(c.d10).log10().log10().div(c.d10).mul(Decimal.mul(c.d0_3, g.truetimeThisStardustReset.add(c.d10).log10())).mul(masteryBoost(91)).add(c.d1);
	if (x === 92) return g.masteryPower.add(c.d10).log10().log10().div(c.d10).div(Decimal.mul(c.d0_3, g.truetimeThisStardustReset.add(c.d10).log10())).mul(masteryBoost(92)).add(c.d1);
	if (x === 101) return Decimal.logarithmicSoftcap(g.masteryPower.add(c.d1).log10().add(c.d1).pow(masteryBoost(101).div(c.d2)), masteryData[101].softcap(), c.d2);
	if (x === 102) return g.masteryPower.add(c.d1).dilate(c.d2div3).pow(masteryBoost(102).mul(c.d0_0175));
	if (x === 103) return g.masteryPower.add(c.d10).dilate(c.d0_2).sub(c.d9).pow(masteryBoost(103));
	if (x === 104) return masteryBoost(104).mul(g.masteryPower.gt(c.ee3) ? g.masteryPower.log10().sub(c.d500) : g.masteryPower.add(c.d1).log10().pow(c.d2).div(2000)).div(500).pow10();
	if (x === 105) return c.d1.sub(g.masteryPower.add(c.d1).log10().div(c.e2).add(c.d10).log10().pow(c.d0_5)).mul(masteryBoost(105)).pow10();
	if (x === 111) return masteryBoost(111).div(c.d32);
	if (x === 112) return g.masteryPower.add(c.d1).log10().div(c.e2).add(c.d1).pow(masteryBoost(112).div(c.d32));
	functionError("masteryEffect", arguments);
}

function masteryBoost(x) {
	x = Number(x);
	let row = Math.floor(x / 10);
	let b = stat.knowledgeEffect.div(c.e2).add(c.d1);
	let excessMasteryResearch = ownedResearchInGroup("mastery").length - g.studyCompletions[8];
	if (excessMasteryResearch > 0) b = b.mul(Math.max(0, 1 - excessMasteryResearch / 3));

	if ([11, 21, 31].includes(x) && MasteryE(41)) b = b.mul(masteryEffect(41));
	if ([12, 22, 32].includes(x) && MasteryE(43)) b = b.mul(masteryEffect(43));
	if (g.achievement[516] && (row >= 2) && (row <= 9)) if (g.star[[51, 52, 53, 54, 101, 102, 103, 104][row - 2]]) b = b.mul(c.d1_01);
	if (g.research.r6_11) {
		let row = Math.floor(x / 10);
		let owned = 0;
		for (let i = 1; i < 5; i++) if (g.star[row * 10 + i]) owned++;
		b = b.mul(researchEffect(6, 11).div(c.e2).mul(owned).add(c.d1));
	}
	if (study13.bound(196) && ((row % 2) === 1)) b = b.mul(study13.bindingEff(196));
	if (study13.bound(234)) b = b.mul(study13.bindingEff(234).pow(row));

	if (row === 1) {
		if (StudyE(11)) return c.d0;
		if (g.achievement[105]) b = b.mul(achievement(105).effect().div(c.e2).add(c.d1));
		if (MasteryE(52)) b = b.mul(masteryEffect(52));
		if ((x === 11) && g.research.r4_6) b = b.mul(researchEffect(4, 6));
		if ((x === 12) && g.research.r4_10) b = b.mul(researchEffect(4, 10));
		if (study13.bound(53)) b = b.mul(study13.bindingEff(53));
	}
	if (row === 2) {
		if (g.research.r5_13) b = b.mul(stat.spatialEnergyEffect.pow(researchEffect(5, 13)));
	}
	if (row === 3) {
		if (g.achievement[825]) b = b.mul(c.d3);
		if (study13.bound(44)) b = b.mul(study13.bindingEff(44));
	}
	if (row === 4) {
		if (g.achievement[201]) b = b.mul(achievement(201).effect().div(c.e2).add(c.d1));
		if (x === 42) {
			b = b.mul(studies[4].reward(2));
			if (study13.rewardLevels.masterNumber > 0) b = b.mul(2.3);
			if (study13.rewardLevels.masterNumber > 3) b = b.mul(1 + 0.013 * g.studyCompletions[13]);
		}
	}
	if (row === 6) {
		if (g.research.r20_7 && (x !== 62)) b = b.mul(researchEffect(20, 7));
		if ((x === 63) && (study13.rewardLevels.masterNumber > 1)) b = b.mul(1.3);
		if ((x === 63) && (study13.rewardLevels.masterNumber > 4)) b = b.mul(g.darkstars.mul(0.0013).add(c.d1));
	}
	if (row === 8) {
		for (let i of [91, 92]) { if (MasteryE(i)) b = b.mul(masteryEffect(i)); }
		if (x === 85) b = b.mul(studies[8].reward(2).mul(achievement.ownedInTier(8)).div(c.e2).add(c.d1));
		if (study13.bound(64)) b = b.mul(study13.bindingEff(64));
	}
	if (row === 10) {
		b = b.mul(stat.stardustBoost11);
		if (achievement.ownedInTier(5) >= 27) b = b.mul(wormholeMilestone27.eff().div(c.e2).add(c.d1));
		if (g.research.r20_9 && [102, 104].includes(x)) b = b.mul(researchEffect(20, 9));
		if (x === 101) {
			if (study13.bound(186)) b = b.mul(study13.bindingEff(186));
		}
		if (x === 103) {
			if (g.achievement[710]) b = b.mul(c.d9);
		}
		if (x === 104) {
			if (MasteryE(112)) b = b.mul(masteryEffect(112));
		}
		if (x === 105) {
			b = b.mul(achievement(711).effect());
			if (study13.rewardLevels.masterNumber > 2) b = b.mul(1 + 0.0013 * study13.rewards.masterNumber.l3Mult());
		}
	}
	if (row === 11) {
		b = b.mul(prismaticUpgrades.masterSpark.eff());
	}
	return b.fix(c.d0);
}

const percentableMasteries = [41, 43, 61, 72, 91, 92];

function masteryEffFormat(x, getPrec = false) {
	let precision = [101].includes(x) ? 4 : [52, 62, 85, 105].includes(x) ? 3 : 2;
	if (getPrec) return precision;
	let percentable = percentableMasteries.includes(x);
	let func = [].includes(x) ? "noLeadFormat" : "format";
	let eff = masteryEffect(x);
	if (percentable) {
		if (eff.gte(c.d10)) return eff[func](precision) + "×";
		return eff.sub(c.d1).mul(c.e2)[func](precision) + "%";
	}
	return eff[func](precision);
}

function masteryFormula(x) {
	if ([11, 12].includes(x)) return "(MP + 1)<sup>" + masteryBoost(x).mul(x === 12 ? c.d0_15 : c.d0_1).noLeadFormat(3) + "</sup>";
	if ([21, 22].includes(x)) {
		let out = "log(MP + 1)<sup>0.6</sup>" + formulaFormat.mult(masteryBoost(x).mul(x === 22 ? c.d0_035 : c.d0_0175));
		if (masteryEffect(x).gt(x === 22 ? c.e100 : c.e50)) out = "((" + out + " - " + (x === 22 ? "100" : "50") + ") × " + (x === 22 ? "0.23026" : "0.46052") + " + 1)<sup>" + (x === 22 ? "10" : "5") + "</sup>" + formulaFormat.mult(x === 22 ? c.e100 : c.e50);
		else out = "10<sup>" + out + "</sup>";
		return out;
	}
	if ([31, 32].includes(x)) return "log(MP + 1)<sup>0.5</sup>" + formulaFormat.mult(masteryBoost(x).mul(c.d0_75));
	if ([41, 43].includes(x)) return formulaFormat.logSoftcap("log(MP+1) ÷ 15", c.d1, c.d1, g.masteryPower.gte(c.e15)) + formulaFormat.mult(masteryBoost(x)) + " + 1";
	if (x === 42) return "10<sup>(log(MP + " + c.e4.format() + ")<sup>0.5</sup> - 2)" + formulaFormat.mult(masteryBoost(42)) + "</sup>";
	if ([51, 52].includes(x)) {
		let out = "log(MP+1)<sup>0." + (x === 52 ? "4" : "6") + "</sup>" + formulaFormat.mult(masteryBoost(x).mul(c.d2_5)) + (x === 52 ? " + 1" : "");
		if (x === 52 && g.research.r19_9) out = "(" + out + ")" + formulaFormat.exp(researchEffect(19, 9));
		return out;
	}
	if (x === 61) {
		if (masteryBoost(61).eq(c.d1) && masteryEffect(61).lte(c.d10)) return "log(MP + 10)<sup>0.1</sup>";
		return "(log(MP + 10)<sup>0.1</sup> - 1)" + formulaFormat.mult(masteryBoost(61)) + " + 1";
	}
	if (x === 62) return "log(MP + 10)" + formulaFormat.exp(masteryBoost(62).mul(-0.04));
	if (x === 63) return "log(MP+1)<sup>0.8</sup>" + formulaFormat.mult(masteryBoost(63));
	if (x === 71) return "log<sup>[2]</sup>(MP<sup>1.25</sup> + " + c.e10.format() + ")" + formulaFormat.exp(masteryBoost(71));
	if (x === 72) return formulaFormat.logSoftcap("log<sup>[2]</sup>(MP + " + c.e10.format() + ")<sup>0.5</sup> - 1", c.d1, c.d5, g.masteryPower.gt(c.ee4)) + formulaFormat.mult(masteryBoost(72)) + " + 1";
	if ([81, 82, 83, 84].includes(x)) {
		let out = "log(MP + 1)<sup>0.5</sup> × ";
		if (x === 81) out += "X<sup>0.4</sup>";
		if (x === 82) out += "log<sup>[2]</sup>(EM + 10)";
		if (x === 83) out += "log<sup>[2]</sup>(DM + 10)<sup>0.75</sup>";
		if (x === 84) out += "log<sup>[2]</sup>(S + 10)<sup>0.5</sup>";
		return "10<sup>" + formulaFormat.logSoftcap(out, c.e2, c.d1, masteryEffect(x).gt(c.e100)) + formulaFormat.mult(masteryBoost(x).mul([c.d0_03, c.d0_1, c.d0_2, c.d0_24][x - 81])) + "</sup>";
	}
	if (x === 85) return "log<sup>[2]</sup>(MP + 10)" + formulaFormat.mult(masteryBoost(85).mul(c.d0_2));
	if (x === 91) return "log<sup>[2]</sup>(MP + 10)" + formulaFormat.mult(masteryBoost(91).mul(c.d0_03)) + " × log(t + 10) + 1";
	if (x === 92) return "log<sup>[2]</sup>(MP + 10)" + formulaFormat.mult(masteryBoost(92).div(c.d3)) + " ÷ log(t + 10) + 1";
	if (x === 101) return formulaFormat.logSoftcap("log(MP + 10)" + formulaFormat.exp(masteryBoost(101).div(c.d2)), masteryData[101].softcap(), c.d2, Decimal.gte(masteryEffect(101), masteryData[101].softcap()));
	if (x === 102) return "10<sup>log(MP + 1)<sup>2 ÷ 3</sup>" + formulaFormat.mult(masteryBoost(102).mul(c.d0_0175)) + "</sup>";
	if (x === 103) return "(10<sup>log(MP + 10)<sup>0.2</sup></sup> - 9)" + formulaFormat.exp(masteryBoost(103));
	if (x === 104) return "10<sup>(" + (g.masteryPower.gt(c.ee3) ? "log(MP) - 500" : "log(MP + 1)<sup>2</sup> ÷ 2,000") + ")" + formulaFormat.mult(masteryBoost(104).div(c.d500)) + "</sup>";
	if (x === 105) return masteryBoost(105).pow10().noLeadFormat(3) + "<sup>1 - log(log(MP + 10) ÷ 100 + 10)<sup>0.5</sup></sup>";
	if (x === 111) return masteryBoost(111).div(c.d32).noLeadFormat(3);
	if (x === 112) return "(log(MP + 1) ÷ 100 + 1)<sup>" + masteryBoost(112).div(c.d32).noLeadFormat(3) + "</sup>";
	functionError("masteryFormula", arguments);
}

function masteryBaseText(x) {
	if (x === 11) return "奇异物质获取乘以 {}";
	if (x === 12) return "所有 " + (unlocked("Dark Matter") ? "普通轴" : "轴") + " 费用降低 {}×";
	if ([21, 22].includes(x)) return "将 " + ["X", "Y"][x - 21] + " 轴效果提升 {}";
	if (x === 31) return "获得 {} 个不增加费用的免费 Z 轴";
	if (x === 32) return "获得 {} 个不增加费用的免费 W 轴";
	if (x === 41) return "提升精通 11、21 和 31 的效果 {}";
	if (x === 42) return "星尘获取乘以 {}";
	if (x === 43) return "提升精通 12、22 和 32 的效果 {}";
	if (x === 51) return "获得 {} 个免费 X 轴";
	if (x === 52) return "将第一行精通的效果提升至 {} 次幂";
	if (x === 61) return "暗 X 轴强度提升 {}";
	if (x === 62) return "暗轴费用提升至 {} 次幂";
	if (x === 63) return "暗星费用减少 {}";
	if (x === 71) return "能量获取乘以 {}";
	if (x === 72) return "能量效果提升 {}";
	if ([81, 82, 83, 84].includes(x)) return "精通力获取乘以 {}（基于 " + ["X 轴", "奇异物质", "暗物质", "星尘"][x - 81] + "）";
	if (x === 85) return "基础精通力获取指数增加 {}<br><span class=\"small\">(当前为 " + stat.masteryTimer.pow(masteryEffect(85)).format(2) + "× 乘数)</span>";
	if ([91, 92].includes(x)) return "第 8 行精通效果提升 {}（在本次星尘重置中随时间 " + ["增", "减"][x - 91] + "）";
	if (x === 101) return "成就 " + achievement.label(501) + " 奖励提升至 {} 次幂" + (achievement(501).effectExp(false).eq(c.d1) ? "" : ("<br><span class=\"small\">(若未激活：" + achievement(501).effectExp(false).format(3) + ")</span>"));
	if (x === 102) return "霍金辐射获取乘以 {}";
	if (x === 103) return "知识获取乘以 {}";
	if (x === 104) return "色素获取乘以 {}";
	if (x === 105) return "星星费用提升至 {} 次幂";
	if (x === 111) return "精通 104 以 ^{} 的效果影响棱镜获取<br><span class=\"small\">(当前等价于 " + Decimal.pow(masteryEffect(104), masteryEffect(111)).format(2) + "× 棱镜)</span>";
	if (x === 112) return "精通 104 的效果提升至 {} 次幂";
	functionError("masteryBaseText", arguments);
}

function masteryText(x) {
	x = Number(x);
	return masteryBaseText(x).replace("{}", showFormulas ? ("<i>" + masteryFormula(x) + "</i>" + (percentableMasteries.includes(x) ? "×" : "")) : masteryEffFormat(x));
}

function masteryReset() {
	g.masteryPower = c.d0;
	g.baseMasteryPowerGain = c.d1;
}

function showMasteryInfo(x) {
	alignTooltip("masteryInfo", "button_mastery" + x + "Modern");
	d.innerHTML("masteryInfo", "<b>精通 " + x + "</b><br><div style=\"font-size:10px;white-space:break-spaces;\">(" + (MasteryE(x) ? "激" : "未激") + "活)" + (masteryBoost(x).eq(c.d1) ? "" : ("<br>(" + masteryBoost(x).mul(c.e2).noLeadFormat(3) + "% 强化)")) + "</div><hr style=\"color:inherit\">" + masteryText(x));
}

function updateMasteryLayout() {
	d.display("masteryContainerLegacy", g.masteryContainerStyle === "Legacy" ? "inline-block" : "none");
	d.display("masteryContainerModern", g.masteryContainerStyle === "Modern" ? "inline-block" : "none");
	for (let i of document.getElementsByClassName("masteryID" + g.masteryContainerStyle)) i.style.display = g.masteryIdsShown ? "inline-block" : "none";
	for (let i of document.getElementsByClassName("masteryBoost" + g.masteryContainerStyle)) i.style.display = g.masteryBoostsShown ? "inline-block" : "none";
	for (let i of document.getElementsByClassName("masteryActive" + g.masteryContainerStyle)) i.style.display = g.masteryActivityShown ? "inline-block" : "none";
}

function stardustExoticMatterReqText() {
	if (stat.stardustMultiplier.eq(c.d0) || stat.stardustExponent.eq(c.d0) || stat.stardustDilation.eq(c.d0)) return "(需要无限奇异物质)";
	if (stat.pendingstardust.lte(g.stardust) || g.exoticmatter.lt(stat.stardustExoticMatterReq)) return "(需要 " + BEformat(g.stardust.floor().add(c.d1).dilate(stat.stardustDilation.recip()).root(stat.stardustExponent).div(stat.stardustMultiplier).dilate(studies[4].reward(1).recip()).max(c.d10).mul(stat.stardustExoticMatterReq.div(c.d10))) + " 奇异物质)";
	else if (stat.pendingstardust.lt(c.e3)) return "(下一次在 " + BEformat(stat.pendingstardust.add(c.d1).floor().root(stat.stardustExponent).div(stat.stardustMultiplier).dilate(c.d2).mul(stat.stardustExoticMatterReq.div(c.d10))) + " 奇异物质)";
	return "";
}

// 星尘重置
const stardustVariables = ["stardust", "stardustThisWormholeReset", "stardustThisSpacetimeReset", "totalstardust"];

function incrementStardust(x) {
	x = x.fix(c.d0);
	for (let i of stardustVariables) o.add(i, x);
}

function attemptStardustReset(showPopups = false) {
	if ((achievement.maxForLocks.stardustReset[g.achOnProgressBar] ?? false) && achievement.locking(g.achOnProgressBar)) {
		if (showPopups) achievement.lockPopup();
	} else if (StudyE(12)) {
		if (showPopups) notify("研究 XII 中禁用星尘重置", "#990000", "#ffffff");
	} else if (stat.pendingstardust.gt(g.stardust)) {
		if ((g.confirmations.stardustReset || (g.confirmations.ironWillStardustReset && stat.ironWill)) && showPopups) {
			let willReset = [
				["奇异物质", true],
				[(unlocked("Dark Matter") ? "普通 " : "") + "轴" + ((g.stardustUpgrades[1] < 2) ? "" : ("（保留前 " + numword(g.stardustUpgrades[0]) + " 个轴的 " + N(stat.stardustUpgrade2AxisRetentionFactor * 100).noLeadFormat(3) + "%）")), true],
				["精通力", true],
				["精通计时器", true],
				[(g.studyCompletions[3] > 0) ? "前六种能量" : "能量", unlocked("Energy")]
			];
			popup({
				text: "确定要" + ((stat.ironWill && g.achievement[502]) ? "放弃你的钢铁意志运行" : "进行星尘重置") + "吗？<br><br>这将重置 " + willReset.filter(x => x[1]).map(x => x[0]).joinWithAnd() + "。",
				buttons: [["确认", "if (stat.pendingstardust.gt(g.stardust)) {stardustReset()} else {notify('奇异物质不足以进行星尘重置！','#ff9900','#ffffff')}"], ["取消", ""]]
			});
		} else {
			stardustReset(showPopups);
		}
	} else {
		if (showPopups) notify("你必须能够获得星尘才能重置！", "#ff6600", "#000000");
	}
}

function stardustReset(showPopups = false) {
	if (achievement.maxForLocks.stardustReset[g.achOnProgressBar] ?? false) { if (showPopups) { achievement.lockPopup(); } return; }
	if (StudyE(12)) { notify("研究 XII 中禁用星尘重置", "#990000", "#ffffff"); return; }

	let stardustGained = stat.pendingstardust.gt(g.stardust);
	if (stardustGained) g.StardustResets++;
	g.TotalStardustResets++;

	unlockFeature("Stardust");
	unlockFeature("Stars");

	if (stardustGained) {
		let f0 = previousPrestige.generate(1, 0, false);
		let f2 = previousPrestige.generate(1, 2, false);
		let f3 = previousPrestige.generate(1, 3, false);
		let f4 = previousPrestige.generate(1, 4, false);

		g.previousStardustRuns.last10 = [f0].concat(g.previousStardustRuns.last10).slice(0, 10);
		if (f2.time < g.previousStardustRuns.wormhole.fastest.time) g.previousStardustRuns.wormhole.fastest = f2;
		if (f3.time < g.previousStardustRuns.spacetime.fastest.time) g.previousStardustRuns.spacetime.fastest = f3;
		if (f4.time < g.previousStardustRuns.eternity.fastest.time) g.previousStardustRuns.eternity.fastest = f4;
		if (f2.gain.gt(g.previousStardustRuns.wormhole.highest.gain)) g.previousStardustRuns.wormhole.highest = f2;
		if (f3.gain.gt(g.previousStardustRuns.spacetime.highest.gain)) g.previousStardustRuns.spacetime.highest = f3;
		if (f4.gain.gt(g.previousStardustRuns.eternity.highest.gain)) g.previousStardustRuns.eternity.highest = f4;

		addAchievements("stardustReset");
		if (StudyE(7)) g.luckEssence += studies[7].luckEssenceGain();
		incrementStardust(stat.pendingstardust.floor().sub(g.stardust).max(c.d0));
		g.fastestStardustReset = Decimal.min(g.fastestStardustReset, g.timeThisStardustReset);
	}

	g.exoticmatter = c.d0;
	g.exoticmatterThisStardustReset = c.d0;
	for (let i = 0; i < 12; i++) {
		g[axisCodes[i] + "Axis"] = (g.stardustUpgrades[1] >= i + 2) ? (Decimal.mul(g[axisCodes[i] + "Axis"], stat.stardustUpgrade2AxisRetentionFactor).floor()) : c.d0;
	}
	g.masteryPower = c.d0;
	g.baseMasteryPowerGain = c.d1;
	g.timeThisStardustReset = 0;
	g.truetimeThisStardustReset = c.d0;
	for (let i of energyTypes.slice(0, 6)) {
		g[i + "Energy"] = StudyE(3) ? c.d1 : g[i + "Energy"].pow(studies[3].reward(2));
	}
	addAchievements("stardustReset");
}

// 星尘加成
function stardustBoostBoost(x) {
	let out = c.d1;
	if (x === 1) {
		if (StudyE(11)) return c.d0;
		if (g.achievement[507]) out = out.mul(achievement(507).effect().div(c.e2).add(c.d1));
	} else if (x === 4) {
		if (StudyE(11)) return c.d0;
		if (g.achievement[508]) out = out.mul(achievement(508).effect().div(c.e2).add(c.d1));
		if (g.research.r10_14) out = out.mul(researchEffect(10, 14));
	} else if (x === 7) {
		if (g.achievement[509]) out = out.mul(achievement(509).effect().div(c.e2).add(c.d1));
		if (g.research.r5_14) out = out.mul(Decimal.pow(stat.neuralEnergyEffect, researchEffect(5, 14)));
	}
	if ((x % 3) === 0) if (g.research.r13_11) out = out.mul(researchEffect(13, 11));
	return out;
}

const stardustBoostText = [
	null,
	"奇异物质获取乘以 {v}",
	"Y 轴强度提升 {v}{t}",
	"W 轴强度提升 {v}{t}",
	"星尘获取乘以 (精通力)<sup>{v}</sup><br><span class=\"small\">(当前总计：×{t})</span>",
	"X 轴基础价格比率除以 {v}<br><span class=\"small\">(总体：{t}× 更便宜)</span>",
	"暗 Z 轴强度提升 {v}{t}",
	"精通力获取乘以 {v}<sup>s<sup id=\"span_stardustBoost7FakeExp\"></sup></sup>，其中 s = " + unbreak("(本次星尘重置的秒数)") + "<br><span class=\"small\">(当前总计：×{t})</span>",
	"V 轴强度提升 {v}{t}",
	"暗星费用降低 {v}×",
	"Z 轴效果公式的指数增加 {v}",
	"第 10 行精通效果提升 {v}{t}",
	"霍金辐射获取公式的指数增加 {v}"
];

function formatStardustBoost(x) {
	let val = stat["stardustBoost" + x];
	if ([2, 3, 6, 8, 11].includes(x)) return (val.gte(c.d10) ? val : val.sub(c.d1).mul(c.e2)).noLeadFormat(2);
	return val[[7].includes(x) ? "formatFrom1" : "noLeadFormat"]([10, 12].includes(x) ? 4 : [4, 7, 9].includes(x) ? 3 : 2);
}

const showStardustBoostFormula = {
	1: function () { return "((1 + S ÷ 10)<sup>0.5</sup> × 10<sup>log(S + 1)<sup>1.5</sup> × 0.1</sup>)" + formulaFormat.exp(stardustBoostBoost(1)); },
	2: function () { return "(1 + log(S + 1) × 0.075)" + formulaFormat.exp(stardustBoostBoost(2)); },
	3: function () { return "(" + formulaFormat.linSoftcap("log(S ÷ " + c.e7.format() + " + 1)<sup>0.7</sup> ÷ 2", c.d10, c.d1, g.stardust.gt(1.6324e79)) + " + 1)" + formulaFormat.exp(stardustBoostBoost(3)); },
	4: function () { return "(log(S<sup>0.05</sup> + 10)<sup>1 ÷ 3</sup> - 1)" + formulaFormat.mult(stardustBoostBoost(4)); },
	5: function () { return "(" + formulaFormat.linSoftcap("10<sup>log(S × " + c.e24.format() + " + " + c.e64.format() + ")<sup>2 ÷ 3</sup> - 16</sup>", c.inf, c.d1, g.stardust.gt("7.56e5814")) + ")" + formulaFormat.exp(stardustBoostBoost(5)); },
	6: function () { return "log<sup>[2]</sup>(S<sup>0.15</sup> + " + c.e10.format() + ")" + formulaFormat.exp(stardustBoostBoost(6)); },
	7: function () { return "log(S + 10)" + formulaFormat.exp(stardustBoostBoost(7).div(c.e2)); },
	8: function () { return "log<sup>[2]</sup>(S + " + c.e100.format() + ")" + formulaFormat.exp(stardustBoostBoost(8).mul(c.d5)) + formulaFormat.mult(N(1 / 32).pow(stardustBoostBoost(8))); },
	9: function () { return "(log(S + " + c.e100.format() + ") ÷ 100)" + formulaFormat.exp(stardustBoostBoost(9).mul(c.d0_4)); },
	10: function () { return formulaFormat.convSoftcap("(log<sup>[2]</sup>(S + " + c.ee3.format() + ") - 3)" + formulaFormat.mult(stardustBoostBoost(10).div(c.d10)), c.d0_5, c.d1, stat.stardustBoost10.gt(c.d0_5)); },
	11: function () { return formulaFormat.convSoftcap("(log<sup>[2]</sup>(S + " + c.ee4.format() + ") - 4)" + formulaFormat.mult(stardustBoostBoost(11).div(c.d10)), c.d1_5, c.d2, stat.stardustBoost11.gt(c.d2_5)) + " + 1"; },
	12: function () { return formulaFormat.convSoftcap("(log<sup>[2]</sup>(S + " + c.ee5.format() + ") - 5)" + formulaFormat.mult(stardustBoostBoost(12)), c.d0, c.d1, true); }
};

function stardustBoost7Exp(x) {
	x = (x === undefined) ? g.truetimeThisStardustReset : N(x);
	return Decimal.logarithmicSoftcap(x.pow(c.d0_5), c.e3, c.d4, c.d1);
}

// 星尘升级
function buyStardustUpgrade(x, manual = false) {
	if (((achievement.maxForLocks.specificStardustUpgrades[g.achOnProgressBar]?.[x] ?? Infinity) === g.stardustUpgrades[x - 1]) && achievement.locking(g.achOnProgressBar)) { if (manual) { achievement.lockPopup(); } return; }
	if (((achievement.maxForLocks.totalStardustUpgrades[g.achOnProgressBar] ?? Infinity) === effectiveStardustUpgrades()) && achievement.locking(g.achOnProgressBar)) { if (manual) { achievement.lockPopup(); } return; }

	if (g.stardust.gte(stat["stardustUpgrade" + x + "Cost"]) && (g.stardustUpgrades[x - 1] < stat["stardustUpgrade" + x + "Cap"])) {
		if (stat["stardustUpgrade" + x + "Cost"].lt(c.inf.recip())) addAchievement(716);
		o.sub("stardust", stat["stardustUpgrade" + x + "Cost"]);
		g.stardustUpgrades[x - 1]++;
		updateStat("stardustUpgrade" + x + "Cost");
		if (g.stardustUpgrades[4] > 0) unlockFeature("Dark Matter");
		if (g.stardustUpgrades[4] > 1) unlockFeature("Energy");
	}
	addAchievements("stardustUpgrade");
}

const stardustUpgradeTooltip = [
	null,
	function (x = g.stardustUpgrades[0]) { return "解锁新轴"; },
	function (x = g.stardustUpgrades[1]) { return (x === 0) ? "解锁轴自动购买器" : ("星尘重置时保留 " + axisCodes[x - 1] + " 轴的 " + (stat.stardustUpgrade2AxisRetentionFactor * 100).toFixed(2) + "%"); },
	function (x = g.stardustUpgrades[2]) { return "解锁新星尘加成"; },
	function (x = g.stardustUpgrades[3]) { return (x === 0) ? "可同时激活前两行精通" : (x === 4) ? "解锁 2 行新精通" : "解锁一行新精通"; },
	function (x = g.stardustUpgrades[4]) { return (x === 0) ? "解锁暗物质" : ("解锁 " + toTitleCase(energyTypes[x - 1]) + " 能量"); }
];

const stardustUpgradeNames = [null, "维度", "保留", "加成", "精通", "进程"];

const baseStardustUpgradeCosts = [
	[c.d1_5e6, c.d4_5e10, c.e14, c.e20, c.ee10, N("e5e11"), N("e2e13"), N(betaActive ? "e7.5e13" : "e8e13")],
	[c.d50, c.e2, c.e4, c.e6, c.e8, c.e12, c.e16, c.e24, c.e100, N("ee11"), N("ee13"), N("ee15"), N("ee17")],
	[c.d3_3333e9, c.d1_5e16, c.e43, c.e75, c.e140, c.inf, c.ee4, c.ee5, c.ee6, N("6.66e6666666")],
	[c.d125, c.d2e7, c.d5e18, c.d1_5e61, c.e115],
	[c.d5e11, c.e60, c.e96, c.e175, c.d2_2222e222, c.e270, c.inf, c.ee5, c.e2e5, c.e5e5, c.e1_5e6]
];

function stardustUpgradeCost(x, y = g.stardustUpgrades[x - 1]) {
	if (y >= stat["stardustUpgrade" + x + "Cap"]) return c.maxvalue;
	let cost = baseStardustUpgradeCosts[x - 1][y];
	if (achievement.ownedInTier(5) >= 9) cost = cost.dilate(stat.wormholeMilestone9Effect);
	if (g.achievement[602] && (x === 3)) cost = cost.pow(c.d0_9);
	if (g.achievement[520] && (y === 0)) cost = cost.root(achievement(520).effect());
	if (g.achievement[612]) cost = cost.pow(achievement(612).effect() ** g.stars);
	for (let i of [103, 113]) if (study13.bound(i)) cost = cost.pow(study13.bindingEff(i));
	cost = [cost, stat.whiteLightEffect, study13.rewards.wildfire.eff()].decimalPowerTower();
	if (g.wormholeUpgrades[8] > 0) cost = [cost, wormholeUpgrades[8].eff(), stat.luckUpgLevel_quatrefolium_star].decimalPowerTower();
	if (g.achievement[519]) cost = cost.div(achievement(519).effect().pow(g.stars));
	if (g.achievement[915]) cost = cost.div(achievement(915).effect().pow(g.stardustUpgrades.sum()));
	return cost;
}

function effectiveStardustUpgrades() {
	return g.stardustUpgrades.map((x, i) => Math.max(x, [0, 1, 0, 5, 0][i])).sum();
}

// 自动化
const autobuyers = {
	axis: { baseInterval: 5, baseCost: c.e25, costGrowth: c.d1_05, resource: "exoticmatter", extRes: "奇异物质", unlockReq: function () { return g.stardustUpgrades[1] > 0; } },
	darkAxis: { baseInterval: 5, baseCost: c.e25, costGrowth: c.d1_05, resource: "darkmatter", extRes: "暗物质", unlockReq: function () { return achievement.ownedInTier(5) >= 1; } },
	stardustUpgrade: { baseInterval: 30, baseCost: c.e100, costGrowth: c.d1_1, resource: "stelliferousEnergy", extRes: "恒星际能量", unlockReq: function () { return achievement.ownedInTier(5) >= 3; } },
	star: { baseInterval: 15, baseCost: c.e25, costGrowth: c.d1_08, resource: "stardust", extRes: "星尘", unlockReq: function () { return achievement.ownedInTier(5) >= 4; } },
	research: { baseInterval: 60, baseCost: c.ee4, costGrowth: c.d1_03, resource: "masteryPower", extRes: "精通力", unlockReq: function () { return g.achievement[817]; } }
};

const autobuyerMeta = {
	cost: function (id, n = g[id + "AutobuyerUpgrades"]) {
		let lv = n, ss = this.softcap(id), base = autobuyers[id].baseCost;
		if (g.wormholeUpgrades[9]) base = base.div(c.d10);
		if (lv >= ss) lv += (lv - ss + 1) ** 2 * 0.08;
		return [base, autobuyers[id].costGrowth, N(lv)].decimalPowerTower();
	},
	maxInterval: function () { return g.wormholeUpgrades[9] ? 0.05 : 0.1; },
	interval: function (id, n = g[id + "AutobuyerUpgrades"]) { return Math.max(this.maxInterval(), autobuyers[id].baseInterval * 0.95 ** Math.min(n, this.softcap(id)) * 0.99 ** Math.max(n - this.softcap(id), 0)); },
	softcap: function (id) { return Math.ceil(Math.log(0.1 / autobuyers[id].baseInterval) / Math.log(0.95)); },
	cap: function (id) { return this.softcap(id) + Math.max(Math.ceil(Math.log(this.maxInterval() / (autobuyers[id].baseInterval * 0.95 ** this.softcap(id))) / Math.log(0.99)), 0); },
	totalLevels: function () { return Object.keys(autobuyers).map(x => g[x + "AutobuyerUpgrades"]).sum(); }
};

function upgradeAutobuyer(id) {
	while ((g[autobuyers[id].resource].gte(autobuyerMeta.cost(id))) && (g[id + "AutobuyerUpgrades"] < autobuyerMeta.cap(id))) {
		o.sub(autobuyers[id].resource, autobuyerMeta.cost(id));
		g[id + "AutobuyerUpgrades"]++;
	}
	addAchievements("autobuyerUpgrade");
}

const stardustAutomatorModes = ["星尘数量", "本次星尘重置的真实时间", "<i>X</i> 倍（当前星尘）", "（当前星尘）<sup><i>X</i></sup>", "<i>X</i> 倍（上次星尘）", "（上次星尘）<sup><i>X</i></sup>"];
const wormholeAutomatorModes = ["HR 数量", "本次虫洞的真实时间", "<i>X</i> 倍（当前 HR）", "（当前 HR）<sup><i>X</i></sup>", "<i>X</i> 倍（上次 HR）", "（上次 HR）<sup><i>X</i></sup>"];
const researchAutobuyerModes = ["所有免费研究"];

const inputStarAllocatorBuild = {
	selectRow: function () {
		popup({
			text: "选择行：",
			buttons: countTo(10).map(x => [x, "inputStarAllocatorBuild.order=[];inputStarAllocatorBuild.editRow(" + x + ")"]),
			buttonSize: 5
		});
	},
	order: [],
	editRow: function (row) {
		let tableStyle = "border-style:solid;border-color:#00ff00;border-collapse:collapse;border-width:1px;";
		popup({
			text: "<table style=\"vertical-align:bottom;\"><tr><td style=\"width:160px\">当前选择：</td>" + countTo(4, true).map(x => "<td style=\"width:50px\">" + (inputStarAllocatorBuild.order[x] ?? ((x === 0) ? "<i>无</i>" : "")) + "</td>").join("") + "</tr></table><br><br>" + ((inputStarAllocatorBuild.order.length === 4) ? "是否正确？" : ("选项如下：<br>" + tableGenerator([countTo(4).map(x => row * 10 + x), countTo(4).map(x => starText(row * 10 + x).replace("{x}", dynamicStars.includes(row * 10 + x) ? formatStarEffect(row * 10 + x) : null))], tableStyle, tableStyle, tableStyle + "width:25%;padding:8px;", false) + "<br><br>选择下一个或保存当前选择：")),
			buttons: [...countTo(4).map(x => 10 * row + x).filter(x => !inputStarAllocatorBuild.order.includes(x)).map(x => [x, "inputStarAllocatorBuild.order.push(" + x + ");inputStarAllocatorBuild.editRow(" + row + ")"]), ["保存", "inputStarAllocatorBuild.setRow(" + row + ")"], ["取消", ""]],
			buttonSize: 4
		});
	},
	setRow: function (row) {
		for (let i = 1; i < 5; i++) g.starAllocatorBuild.remove(row * 10 + i);
		for (let i of inputStarAllocatorBuild.order) g.starAllocatorBuild.push(i);
	}
};

inputStarAllocatorBuild.order = [];
inputStarAllocatorBuild.toggle = function (id) {
	if (inputStarAllocatorBuild.order.includes(id)) {
		inputStarAllocatorBuild.order.remove(id);
		d.element("button_inputStarAllocatorBuild_" + id).className = "";
	} else {
		inputStarAllocatorBuild.order.push(id);
		d.element("button_inputStarAllocatorBuild_" + id).className = "legacy ownedstarbutton" + Math.floor(id / 10);
	}
};

function importStarAllocatorBuild() {
	popup({
		text: "在此粘贴你的星星配置：",
		input: "",
		buttons: [["提交", "g.starAllocatorBuild=popupInput().split(',').map(x=>Number(x))"], ["取消", ""]]
	});
}

function exportStarAllocatorBuild() {
	popup({
		text: "这是你的星星分配器配置：",
		input: g.starAllocatorBuild.join(","),
		buttons: [["关闭", ""]]
	});
}

// 星星
function starScaleStart(gal = g.galaxies) {
	let out = g.achievement[703] ? achievement(703).effect() : c.d25;
	if (study13.bound(155)) out = out.sub(study13.bindingEff(155));
	return out;
}

function starScalePower(x = g.stars, gal = g.galaxies) {
	let out = c.d1.sub(studies[2].reward(1).div(c.e2));
	if (g.research.r7_8) out = out.mul(researchEffect(7, 8));
	if ((x > 40) && (gal >= galaxyEffects[4].req)) out = out.mul(galaxyEffects[4].penalty.value(gal).mul(x - 40).add(c.d1));
	if ((g.activeStudy === 10) && (studyPower(10) === 1)) out = out.mul(c.d2);
	return out;
}

function starCost(x = g.stars, gal = g.galaxies, cap = starCap()) {
	if (x >= cap) return c.maxvalue;
	x = N(x);

	let scaling_start = starScaleStart(gal);
	if (scaling_start.lte(c.d0)) return c.maxvalue;

	let effx = x;
	if (g.research.r8_14) effx = effx.sub(researchEffect(8, 14));
	if (study13.bound(256)) effx = effx.add(study13.bindingEff(256));
	if (effx.sign === -1) effx = c.d0;

	let formula_exponent = StudyE(2) ? [c.d3, c.d4, c.d5, c.d6][studyPower(2)] : c.d2;
	let scaling_power = starScalePower(x, gal).mul(c.d2_5);

	let cost = Decimal.pow(c.d2, Decimal.exponentialScaling(Decimal.superexpScaling(effx, scaling_start, scaling_power), c.d10, c.d0_5).pow(formula_exponent).add(c.d10)).pow(effx.gte(c.d10) ? c.d1_5 : c.d1);
	cost = cost.mul(galaxyEffects[3].penalty.value(gal).pow(x)).pow(galaxyEffects[1].penalty.value(gal));

	if (achievement.ownedInTier(5) >= 9) cost = cost.dilate(stat.wormholeMilestone9Effect);
	if (g.research.r6_2) cost = cost.root(stat.stelliferousEnergyEffect.pow(researchEffect(6, 2)));
	if (g.research.r7_11) cost = cost.pow(researchEffect(7, 11).pow(g.darkstars));
	if (g.research.r13_7) cost = cost.pow(researchEffect(13, 7));
	if (g.achievement[612]) cost = cost.pow(achievement(612).effect() ** g.stardustUpgrades.sum());
	cost = cost.pow(stat.whiteLightEffect);
	if (g.achievement[701]) cost = cost.pow(achievement(701).realEffect());
	if (MasteryE(105)) cost = cost.pow(masteryEffect(105));
	cost = cost.pow(luckUpgrades.quatrefolium.star.eff());
	if (g.achievement[811]) cost = [cost, c.d0_97, N(g.highestGalaxiesSpacetime - gal)].decimalPowerTower();
	cost = cost.pow(wormholeUpgrades[11].eff());
	if (study13.bound(24)) cost = [cost, study13.bindingEff(24), x].decimalPowerTower();
	if (study13.bound(304)) cost = cost.pow(study13.bindingEff(304));

	if (g.achievement[519]) cost = cost.div(achievement(519).effect().pow(g.stardustUpgrades.sum()));
	if (g.achievement[702]) cost = cost.div(achievement(702).effect().pow(x ** 2));

	return cost;
}

function buyStar(manual = false) {
	if (((achievement.maxForLocks.stars[g.achOnProgressBar] ?? Infinity) === g.stars) && achievement.locking(g.achOnProgressBar)) { if (manual) { achievement.lockPopup(); } return; }
	if (g.stardust.gte(starCost())) {
		o.sub("stardust", starCost());
		g.stars++;
		addAchievements("starBuy");
		if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false;
	}
}

function affordableStars(gal = g.galaxies) {
	for (let i = 59; i >= 0; i--) if (starCost(i, gal).lt(g.stardust)) return i + 1;
	return 0;
}

function tryBuyStarUpgrade(x) {
	if (g.confirmations.doubleClickToBuy && (g.starContainerStyle === "Modern")) {
		if (selections.starClick === x) {
			buyStarUpgrade(x, true);
		}
	} else {
		buyStarUpgrade(x, true);
	}
	selections.starClick = x;
}

function buyStarUpgrade(x, manual = false) {
	if (achievement.locking(302)) { if (maxStars(Math.floor(x / 10)) !== 4) { if (manual) { achievement.lockPopup(); } return; } }
	if (achievement.locking(519)) { if (manual) { achievement.lockPopup(); } return; }
	if (starList.includes(x) && (unspentStars() > 0) && availableStarRow(Math.floor(x / 10)) && (!g.star[x])) {
		g.star[x] = true;
		g.ach519possible = false;
		totalStars++;
	}
	if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false;
	addAchievement(412);
}

function respecStars(manual = false) {
	if (achievement.maxForLocks.stardustReset[g.achOnProgressBar] ?? false) { if (manual) { achievement.lockPopup(); } return; }
	if (StudyE(12)) { notify("研究 XII 中禁用星尘重置", "#990000", "#ffffff"); return; }
	stardustReset();
	for (let i of starList) g.star[i] = false;
	totalStars = 0;
}

function importStars() {
	popup({
		text: "在此导入你的星星配置：",
		input: "",
		buttons: [["确认", "let starBuild = popupInput().split(',');for (let i of starBuild) buyStarUpgrade(Number(i),true)"], ["关闭", ""]]
	});
}

function exportStars() {
	openExport(starList.filter(x => g.star[x]).join(","));
}

function maxFullStarRows() {
	for (let i = 1; i < 11; i++) if (maxStars(i) === 4) for (let j = 1; j < 5; j++) buyStarUpgrade(i * 10 + j, true);
}

const dynamicStars = [11, 12, 13, 14, 42, 61, 62, 63, 64, 71, 72, 73, 74, 91, 92, 93, 94];

const starBoosts = {
	1: function (x) {
		if (StudyE(11)) return c.d0;
		let out = c.d3;
		if (g.star[x + 20]) out = out.mul(c.d3);
		if (g.star[x + 80]) out = out.mul(starEffect(90));
		out = out.mul(achievement.perAchievementReward[2].currentVal);
		out = out.mul(galaxyEffects[1].boost.value());
		if (study13.bound(57)) out = out.mul(study13.bindingEff(57));
		return out;
	},
	7: {
		mult: function () {
			let out = c.d1;
			if (g.research.r6_10) out = out.mul(researchEffect(6, 10).div(c.e2).add(c.d1));
			if (study13.bound(46)) out = out.mul(study13.bindingEff(46));
			return out;
		},
		cap: function () {
			let out = c.e2;
			if (g.research.r11_11) out = out.add(researchEffect(11, 11).mul(g.galaxies));
			return out;
		}
	},
	9: function () {
		let out = studies[2].reward(2);
		if (study13.bound(66)) out = out.mul(study13.bindingEff(66));
		return out;
	}
};
function starEffect(x) {
	if ([11, 12, 13, 14].includes(x)) {
		let exp = starBoosts[1](x), mult;
		if (x === 11) mult = Decimal.sub(c.d1, g.exoticmatter.add(c.d1).mul(c.e10).log10().log10().pow(c.dm1));
		else if (x === 12) mult = g.exoticmatter.add(c.d1).mul(c.e10).log10().log10().pow(c.dm1);
		else if (x === 13) mult = Decimal.sub(c.d1, g.truetimeThisStardustReset.div(c.e3).add(c.d1).pow(c.dm1));
		else if (x === 14) mult = g.truetimeThisStardustReset.div(c.e3).add(c.d1).pow(c.dm1);
		return exp.mul(mult).pow10();
	}
	if (x === 20) {
		let out = (g.research.r34_3) ? researchEffect(34, 3) : c.d3;
		return out;
	}
	if (x === 60) return Decimal.convergentSoftcap(Decimal.logarithmicSoftcap(g.exoticmatter.add(c.d1).pow(c.d0_02).log10().pow(c.d0_7), c.e3, c.d0_5), c.d7e3, c.d8e3);
	if (x === 64) return Decimal.convergentSoftcap(g.exoticmatter.add(c.d10).log10().pow(c.d0_1), c.d1, c.d3);
	if ([71, 72, 73, 74].includes(x)) {
		let ef;
		if (x === 71) ef = g.masteryPower.pow(c.sqrt0_1).add(c.d10).log10().log10().mul(c.d22_5);
		else if (x === 72) ef = g.exoticmatter.fix(c.d0).add(c.d10).log10().log10().pow(c.d2).mul(c.d1_5);
		else if (x === 73) ef = g.stardust.add(c.d10).log10().log10().mul(c.d8);
		else if (x === 74) ef = g.truetimeThisStardustReset.add1Log(c.d10).mul(c.d7_5);
		ef = ef.mul(starBoosts[7].mult());
		let lim = starBoosts[7].cap();
		return Decimal.convergentSoftcap(ef, lim.mul(c.d0_75), lim);
	}
	if (x === 90) return g.exoticmatter.add(c.d1).log10().pow(c.d0_75).div(c.e2).add(c.d1).pow(starBoosts[9]());
	functionError("starEffect", arguments);
}

function formatStarEffect(x) {
	if (Math.floor(x / 10) === 2) return starEffect(20).noLeadFormat(2);
	if (x === 42) return c.e18.format();
	if ([61, 62, 63].includes(x)) return starEffect(60).format(2);
	if (Math.floor(x / 10) === 9) return starEffect(90).format(2);
	return starEffect(x).noLeadFormat(x === 64 ? 3 : 2);
}

function showStarEffectFormula(x) {
	if (x === 42) return "10<sup>18</sup>";
	if ([11, 12, 13, 14].includes(x)) {
		let modifier;
		if (x === 11) modifier = " × (1 - 1 ÷ log<sup>[2]</sup>((EM + 1) × " + c.e10.format() + "))";
		if (x === 12) modifier = " ÷ log<sup>[2]</sup>((EM + 1) × " + c.e10.format() + ")";
		if (x === 13) modifier = " × (1 - 1 ÷ (1 + t ÷ 1,000))";
		if (x === 14) modifier = " ÷ (1 + t ÷ 1,000)";
		return "10<sup>" + starBoosts[1](x).noLeadFormat(3) + modifier + "</sup>";
	}
	if ([61, 62, 63].includes(x)) return formulaFormat.convSoftcap(formulaFormat.logSoftcap("log((EM + 1)<sup>0.02</sup>)<sup>0.7</sup>", c.e3, c.d0_5, starEffect(60).gt(c.e3)), c.d7e3, c.d8e3, starEffect(60).gt(c.d7e3));
	if (x === 64) return formulaFormat.convSoftcap("log(EM + 10)<sup>0.1</sup>", c.d1, c.d3, true);
	if ([71, 72, 73, 74].includes(x)) {
		let power = starBoosts[7].mult(), out;
		if (x === 71) out = "log<sup>[2]</sup>(MP<sup>0.31623</sup> + 10)" + formulaFormat.mult(power.mul(c.d22_5));
		if (x === 72) out = "log<sup>[2]</sup>(EM + 10)<sup>2</sup>" + formulaFormat.mult(power.mul(c.d1_5));
		if (x === 73) out = "log<sup>[2]</sup>(S + 10)" + formulaFormat.mult(power.mul(c.d8));
		if (x === 74) out = "log(t + 1)" + formulaFormat.mult(power.mul(c.d7_5));
		let lim = starBoosts[7].cap();
		return formulaFormat.convSoftcap(out, lim.mul(c.d0_75), lim, starEffect(x).gt(lim.mul(c.d0_75)));
	}
	if ([91, 92, 93, 94].includes(x)) {
		let out = "log(EM + 1)<sup>0.75</sup> ÷ 100 + 1";
		if (starBoosts[9]().neq(c.d1)) out = "(" + out + ")<sup>" + starBoosts[9]().noLeadFormat(3) + "</sup>";
		return out;
	}
}

function showStarInfo(x) {
	alignTooltip("starInfo", "button_star" + x + "Modern");
	d.innerHTML("starInfo", "<b>星星 " + x + "</b><hr>" + starText(x).replace("{x}", dynamicStars.includes(x) ? (showFormulas ? formulaFormat(showStarEffectFormula(x)) : formatStarEffect(x)) : null));
}

function updateStarLayout() {
	d.display("starContainerLegacy", g.starContainerStyle === "Legacy" ? "inline-block" : "none");
	d.display("starContainerModern", g.starContainerStyle === "Modern" ? "inline-block" : "none");
	for (let i of document.getElementsByClassName("starID" + g.starContainerStyle)) i.style.display = g.starIdsShown ? "inline-block" : "none";
	for (let i of document.getElementsByClassName("starActive" + g.starContainerStyle)) i.style.display = g.starActivityShown ? "inline-block" : "none";
}

const starIcons = (() => {
	let out = [];
	for (let i = 11; i < 15; i++) out.push([i, (i > 12 ? icon.time : icon.exoticmatter) + [icon.inv, ""][i % 2] + "→" + icon.exoticmatter]);
	for (let i = 21; i < 25; i++) out.push([i, icon[axisCodes[i - 21] + "Axis"] + icon.plus]);
	for (let i = 31; i < 35; i++) out.push([i, icon.star("") + classes.xscript(icon.plus, classes.stars(i - 20))]);
	for (let i = 41; i < 45; i++) out.push([i, (i > 42 ? icon.stardust : icon.exoticmatter) + classes.sup(["+", "^"][i % 2])]);
	for (let i = 51; i < 55; i++) out.push([i, icon.mastery(i - 49)]);
	for (let i = 61; i < 65; i++) out.push([i, icon.exoticmatter + icon.arr + icon[axisCodes[i - 57] + "Axis"]]);
	for (let i = 71; i < 75; i++) out.push([i, [icon.masteryPower, icon.exoticmatter, icon.stardust, icon.time][i - 71] + icon.arr + icon.tickspeed]);
	out.push([81, icon.normalaxis + classes.exoticmatter("$") + icon.minus]);
	out.push([82, icon.VAxis + icon.plus]);
	out.push([83, icon.darkaxis + classes.darkmatter("$") + icon.minus]);
	out.push([84, icon.darkYAxis + icon.plus]);
	for (let i = 91; i < 95; i++) out.push([i, icon.exoticmatter + "→" + icon.star(i - 80)]);
	for (let i = 101; i < 105; i++) out.push([i, icon.mastery(i - 95)]);
	return Object.fromEntries(out);
})();

function starText(x) {
	if ([11, 12, 13, 14].includes(x)) return "奇异物质获取乘以 {x}（基于"  + (x > 12 ? "本次星尘重置的时间" : "奇异物质") + ["减少）", "增加）"][x % 2] ;
	if ([21, 22, 23, 24].includes(x)) return "获得 " + starEffect(20) + " 个免费 " + axisCodes[x - 21] + " 轴";
	if ([31, 32, 33, 34].includes(x)) return "将上方两格的星星 " + (x - 20) + " 的效果立方化";
	if (x === 41) return "奇异物质获取提升至 1.05 次幂";
	if (x === 42) return "奇异物质获取乘以 {x}";
	if (x === 43) return "星尘获取提升至 1.05 次幂";
	if (x === 44) return "星尘获取乘以 100";
	if ([51, 52, 53, 54, 101, 102, 103, 104].includes(x)) return "你可以同时激活第 " + (x - ((x < 101) ? 49 : 95)) + " 行的所有精通";
	if ([61, 62, 63].includes(x)) return "获得 {x} 个免费 " + axisCodes[x - 57] + " 轴（基于奇异物质）";
	if (x === 64) return "获得 {x} 个免费 S 轴（基于奇异物质）";
	if ([71, 72, 73, 74].includes(x)) return "游戏运行速度提升 {x}%（基于 " + ["精通力", "奇异物质", "星尘", "本次星尘重置的时间"][x - 71] + "）";
	if ([81, 83].includes(x)) return (x === 83 ? "暗" : "普通") + "轴费用提升至 0.8 次幂";
	if ([82, 84].includes(x)) return (x === 84 ? "暗 Y" : "普通 V") + " 轴强度提升 3 倍";
	if ([91, 92, 93, 94].includes(x)) return "星星 " + (x - 80) + " 的效果提升至 {x} 次幂（基于奇异物质）";
	functionError("starText", arguments);
}

function starRowsShown() {
	return Array.removeDuplicates(countTo(40).map(x => starRow(x))).slice(0, Array.removeDuplicates(countTo(Math.min(g.stars, 40)).map(x => starRow(x))).length + 1).sort((a, b) => a - b);
}

function unspentStars() { return g.stars - totalStars; }

function starRow(index, s2 = StudyE(2)) {
	if (s2) {
		if (studyPower(2) === 0) return [1, 1, 2, 1, 1, 2, 3, 2, 2, 3, 4, 3, 3, 4, 5, 4, 4, 5, 6, 5, 5, 6, 7, 6, 6, 7, 8, 7, 7, 8, 9, 8, 8, 9, 10, 9, 9, 10, 10, 10][index - 1];
		if (studyPower(2) === 1) return [1, 1, 1, 2, 1, 2, 2, 3, 2, 3, 3, 4, 3, 4, 4, 5, 4, 5, 5, 6, 5, 6, 6, 7, 6, 7, 7, 8, 7, 8, 8, 9, 8, 9, 9, 10, 9, 10, 10, 10][index - 1];
		if (studyPower(2) === 2) return Math.floor(index / 4 + 0.75);
		return [3, 3, 9, 3, 9, 2, 3, 9, 2, 4, 9, 2, 4, 5, 2, 4, 5, 6, 4, 5, 6, 7, 5, 6, 7, 8, 6, 7, 8, 1, 7, 8, 1, 10, 8, 1, 10, 1, 10, 10][index - 1];
	}
	return [1, 1, 2, 1, 2, 3, 1, 2, 3, 4, 2, 3, 4, 5, 3, 4, 5, 6, 4, 5, 6, 7, 5, 6, 7, 8, 6, 7, 8, 9, 7, 8, 9, 10, 8, 9, 10, 9, 10, 10][index - 1];
}

function maxStars(row) {
	let output = 0;
	for (let i = 0; i < Math.min(g.stars, 40); i++) if (starRow(i + 1) === row) output++;
	return output;
}

function availableStarRow(row) {
	return (maxStars(row) > [1, 2, 3, 4].map(x => g.star[x + 10 * row] ? 1 : 0).sum());
}

function starCap() { return 60; }

// ===== 暗物质 =====
const darkmatterVariables = ["darkmatter", "darkmatterThisWormholeReset", "darkmatterThisSpacetimeReset", "totaldarkmatter"];

function incrementDarkMatter(x) {
	x = x.fix(c.d0);
	for (let i of darkmatterVariables) o.add(i, x);
}

function buyDarkAxis(x, manual = false) {
	if (Decimal.eq(maxAxisForAchievement(x), g["dark" + x + "Axis"])) { if (manual) { achievement.lockPopup(); } return; }
	if (g.darkmatter.gt(darkAxisCost(x)) && (4 + g.stardustUpgrades[0] > axisCodes.indexOf(x))) {
		if (darkAxisCost(x).gt(c.d1)) { g.ach908possible = false; }
		o.sub("darkmatter", darkAxisCost(x));
		o.add("dark" + x + "Axis", c.d1);
	}
	if (g.darkSAxis.gt(c.d0)) g.ach525possible = false;
	addAchievements("axisBuy");
}

function buyMaxDarkAxis(caps, manual = false) {
	let total = axisCodes.map(x => g["dark" + x + "Axis"]).sumDecimals();
	for (let j = 0; j < 4 + g.stardustUpgrades[0]; j++) {
		let amount = caps[j] === "u" ? maxAffordableDarkAxis(axisCodes[j]) : Decimal.min(maxAffordableDarkAxis(axisCodes[j]), N(caps[j]).fix(c.d0, false));
		if (amount === "NA") continue;
		if (amount.lte(g["dark" + axisCodes[j] + "Axis"])) continue;
		amount = amount.min(maxAxisForAchievement("dark" + axisCodes[j]));
		if (darkAxisCost(axisCodes[j], amount.sub(c.d1)).lt(g.darkmatter)) o.sub("darkmatter", darkAxisCost(axisCodes[j], amount.sub(c.d1)));
		g["dark" + axisCodes[j] + "Axis"] = amount;
		if (darkAxisCost(axisCodes[j], g["dark" + axisCodes[j] + "Axis"].sub(c.d1)).gt(c.d1)) { g.ach908possible = false; }
	}
	if (g.darkSAxis.gt(c.d0)) g.ach525possible = false;
	addAchievements("axisBuy");
	if (manual && (achievement.maxForLocks.axis[g.achOnProgressBar] !== undefined) && achievement.locking(g.achOnProgressBar) && axisCodes.map(x => g["dark" + x + "Axis"]).sumDecimals().eq(total)) { achievement.lockPopup(); }
}

function darkStarEffect1(x = stat.realDarkStars) {
	return studies[4].reward(3).mul(x).div(c.d20).add(c.d1);
}

function darkStarEffect3SoftcapInc() {
	let out = c.d10;
	if (g.achievement[803]) out = out.div(c.d0_97);
	return out;
}

function darkStarEffect3(x) {
	x = (x === undefined) ? stat.realDarkStars : N(x);
	if (x.lte(c.e2)) return x;
	let inc = darkStarEffect3SoftcapInc();
	return Decimal.convergentSoftcap(x.sub(c.e2).div(inc).add(c.d1).ln().mul(inc).add(c.e2), c.d150, c.d200);
}

function darkStarEffectHTML() {
	let v1 = stat.realDarkStars;
	let v2 = calcStatWithDifferentBase("realDarkStars", stat.maxAffordableDarkStars.max(g.darkstars.add(c.d1)));
	let eff2 = darkAxisBoostedNextStar();
	let eff3text;
	let eff3inc = darkStarEffect3SoftcapInc();
	if (showFormulas) {
		eff3text = formulaFormat(v1.gte(c.e2) ? formulaFormat.convSoftcap("100 + ln(★ ÷ " + eff3inc.noLeadFormat(3) + " - 9) × " + eff3inc.noLeadFormat(3), c.d150, c.d200, darkStarEffect3().gt(c.d150)) : "★");
	} else {
		eff3text = arrowJoin(darkStarEffect3(v1).noLeadFormat(4), darkStarEffect3(v2).noLeadFormat(4));
	}
	return [
		"暗物质的基础获取提升至 " + (showFormulas ? formulaFormat("★" + formulaFormat.mult(studies[4].reward(3).div(c.d20)) + " + 1") : (arrowJoin(darkStarEffect1(v1).noLeadFormat(4), darkStarEffect1(v2).noLeadFormat(4)))),
		(eff2.length === (8 + study13.rewardLevels.slabdrill) ? "所有暗" : (eff2.length === 0) ? "无暗" : ("暗 " + eff2.joinWithAnd())) + "轴将变得更强",
		"你将获得额外 " + eff3text + "% 的免费轴"
	].join("<br>");
}

function realDarkAxisScalePower(type) {
	let out = stat.darkAxisScalingPower;
	if (type === "S") { out = out.mul(c.d2); }
	else if (type === "O") { out = out.mul(c.d3); }
	return out;
}

function realDarkAxisSuperscalePower(type) {
	let out = stat.darkAxisSuperscalingPower;
	if (type === "W") { out = out.mul(c.d3); }
	else if (type === "S") { out = out.mul(c.d5); }
	else if (type === "O") { out = out.mul(c.d9); }
	return out;
}

function realDarkAxisCostDivisor(type) {
	if (StudyE(12)) return c.d1;
	let output = stat.darkAxisCostDivisor;
	if (study13.bound(25)) { output = output.layerf(x => Math.max(x - study13.bindingEff(25).toNumber(), -1)).max(c.minvalue); }
	return output;
}

function realDarkAxisCostExponent(type) {
	let typeNum = axisCodes.indexOf(type);
	let output = stat.darkAxisCostExponent;
	if (type === "S" && g.research.r3_11) { output = output.mul(researchEffect(3, 11)); }
	if (typeNum < 8) {
		let tier7res = ["r16_14", "r15_14", "r14_14", "r13_14", "r13_15", "r14_15", "r15_15", "r16_15"][typeNum];
		if (g.research[tier7res]) output = output.mul(researchEffect(researchRow(tier7res), researchCol(tier7res)));
	}
	for (let i of researchGroupList.spatialsynergism.effectors["dark" + type]) { if (g.research[i]) { output = output.div(research[i].value()); } }
	if (type === "P") { output = output.mul(stat.antiPAxisEffect.pow(stat.realantiPAxis)); }
	return output;
}

function darkAxisCost(type, axis = g["dark" + type + "Axis"], ignoreStudy8 = false) {
	let cost = null;
	axis = Decimal.semiexpScaling(axis, stat.darkAxisSuperscalingStart, realDarkAxisSuperscalePower(type));
	axis = Decimal.linearScaling(axis, stat.darkAxisScalingStart, realDarkAxisScalePower(type));
	if (type === "X") { cost = axis.pow(c.d1_2).add(c.d1).pow10(); }
	else if (type === "Y") { cost = axis.add(c.d1).mul(c.d2).pow10(); }
	else if (type === "Z") { cost = axis.add(c.d10).pow10(); }
	else if (type === "W") { cost = axis.pow(c.d1_5).add(c.d15).pow10(); }
	else if (type === "V") { cost = axis.pow(c.d1_25).add(c.d30).pow10(); }
	else if (type === "U") { cost = axis.pow(c.d2).add(c.d45).pow10(); }
	else if (type === "T") { cost = axis.mul(c.d4).add(c.e2).pow10(); }
	else if (type === "S") { cost = [c.inf, c.d1_2, axis].decimalPowerTower(); }
	else if (type === "R") { cost = [N("e5.5e8"), c.d1_2, axis].decimalPowerTower(); }
	else if (type === "Q") { cost = [c.ee9, c.d1_05, axis].decimalPowerTower(); }
	else if (type === "P") { cost = [N("e3e9"), c.d4div3, axis].decimalPowerTower(); }
	else if (type === "O") { cost = axis.add(c.d30).div(c.d30).layerplus(3); }
	else { functionError("darkAxisCost", arguments); }
	cost = corruption.value("darkAxis", cost);
	cost = cost.pow(realDarkAxisCostExponent(type));
	cost = cost.div(realDarkAxisCostDivisor(type));
	if (StudyE(8) && Decimal.gt(cost, achievement.locking(908) ? c.d1 : studies[8].darkAxisMaxCost()) && (!ignoreStudy8)) return c.maxvalue;
	return cost;
}

function maxAffordableDarkAxis(type, dm = g.darkmatter) {
	if (StudyE(8)) dm = Decimal.min(dm, achievement.locking(908) ? c.d1 : studies[8].darkAxisMaxCost());
	if (darkAxisCost(type).gte(dm) && dm.eq(g.darkmatter)) return g["dark" + type + "Axis"];
	let effective_DM = dm.mul(realDarkAxisCostDivisor(type)).root(realDarkAxisCostExponent(type));
	effective_DM = corruption.invertValue("darkAxis", effective_DM);
	let axis;
	if (type === "X") { axis = effective_DM.lte(c.d10) ? c.dm1 : effective_DM.log10().sub(c.d1).pow(c.d5div6); }
	else if (type === "Y") { axis = effective_DM.lte(c.e2) ? c.dm1 : effective_DM.log10().div(c.d2).sub(c.d1); }
	else if (type === "Z") { axis = effective_DM.lte(c.e10) ? c.dm1 : effective_DM.log10().sub(c.d10); }
	else if (type === "W") { axis = effective_DM.lte(c.e15) ? c.dm1 : effective_DM.log10().sub(c.d15).pow(c.d2div3); }
	else if (type === "V") { axis = effective_DM.lte(c.e30) ? c.dm1 : effective_DM.log10().sub(c.d30).pow(c.d0_8); }
	else if (type === "U") { axis = effective_DM.lte(c.e45) ? c.dm1 : effective_DM.log10().sub(c.d45).pow(c.d0_5); }
	else if (type === "T") { axis = effective_DM.lte(c.e100) ? c.dm1 : effective_DM.log10().sub(c.e2).div(c.d4); }
	else if (type === "S") { axis = effective_DM.lte(c.inf) ? c.dm1 : effective_DM.log(c.d2).div(c.d1024).log(c.d1_2); }
	else if (type === "R") { axis = effective_DM.lte("e5.5e8") ? c.dm1 : effective_DM.log10().div("5.5e8").log(c.d1_2); }
	else if (type === "Q") { axis = effective_DM.lte(c.ee9) ? c.dm1 : effective_DM.log10().div(c.e9).log(c.d1_05); }
	else if (type === "P") { axis = effective_DM.lte("e3e9") ? c.dm1 : effective_DM.log10().div(3e9).log(c.d4div3); }
	else if (type === "O") { axis = effective_DM.lte(N(30 / 30).layerplus(3)) ? c.dm1 : effective_DM.layerplus(-3).mul(c.d30).sub(c.d30); }
	else { functionError("maxAffordableDarkAxis", arguments); }
	axis = Decimal.linearSoftcap(axis, stat.darkAxisScalingStart, realDarkAxisScalePower(type));
	axis = Decimal.semilogSoftcap(axis, stat.darkAxisSuperscalingStart, realDarkAxisSuperscalePower(type));
	return axis.floor().add(c.d1);
}

function darkStarPriceMod(type) {
	if (type === "sub") {
		let output = c.d0;
		if (MasteryE(63)) { output = output.add(masteryEffect(63)); }
		return output;
	} else if (type === "div") {
		let output = stat.stardustBoost9;
		if (g.achievement[512]) { output = output.div(0.9975 ** g.stars); }
		if (g.research.r6_3) { output = output.mul(stat.gravitationalEnergyEffect.pow(researchEffect(6, 3))); }
		if (g.research.r16_12) { output = output.mul(researchEffect(16, 12)); }
		output = output.mul(luckUpgrades.quatrefolium.darkstar.eff());
		return output;
	} else if (type === "pow") {
		let output = c.d1;
		if (study13.bound(26)) { output = output.mul(study13.bindingEff(26)); }
		return output;
	} else {
		functionError("darkStarPriceMod", arguments);
	}
}

function darkStarReq(x) {
	x = (x === undefined) ? g.darkstars : N(x);
	if (x.gt(stat.darkStarScalingStart)) {
		let start = stat.darkStarScalingStart;
		let power = stat.darkStarScalingPower;
		x = x.sub(start).mul(power.add(c.d1)).add(start);
		x = Decimal.exponentialScaling(x, start, power);
	}
	let cost = [c.d36, x.mul(c.d5_5), x.pow(c.d2).div(c.d8)].sumDecimals();
	return cost.pow(darkStarPriceMod("pow")).div(darkStarPriceMod("div")).sub(darkStarPriceMod("sub")).ceil().max(c.d0);
}

function darkStarReqFormula() {
	let start = stat.darkStarScalingStart, power = stat.darkStarScalingPower;
	let out = stat.maxAffordableDarkStars.gte(start) ? formulaFormat.expScaling("★" + formulaFormat.mult(power.add(c.d1)) + formulaFormat.add(start.mul(power).neg()), start, power, true) : "★";
	out = "((" + out + (stat.maxAffordableDarkStars.gte(start) ? "<br>" : "") + " + 22)<sup>2</sup> - 196)" + formulaFormat.exp(darkStarPriceMod("pow")) + formulaFormat.mult(c.d0_125.div(darkStarPriceMod("div"))) + formulaFormat.add(darkStarPriceMod("sub").neg());
	if (darkStarReq().eq(c.d0)) out = "max(" + out + ", 0)";
	return formulaFormat(out);
}

function darkAxisBoostedNextStar() {
	let v1 = stat.realDarkStars;
	let v2 = calcStatWithDifferentBase("realDarkStars", stat.maxAffordableDarkStars.max(g.darkstars.add(c.d1)));
	let out = [];
	for (let i of axisCodes.slice(0, 8 + study13.rewardLevels.slabdrill)) if (Decimal.neq(darkStarEffect2Level(i, v1), darkStarEffect2Level(i, v2))) out.push(i);
	return out;
}

function darkStarEffect2Level(axis, x) {
	x = (x === undefined) ? stat.realDarkStars : N(x);
	let axisNum = axisCodes.indexOf(axis);
	let cycles = x.div((axisNum > 7) ? c.d32 : c.d8).floor();
	let over = (axisNum > 7) ? x.sub(axisNum * 8 - 64).sub(cycles.mul(c.d32)).div(c.d8).max(c.d0).min(c.d1) : x.sub(axisNum).sub(cycles.mul(c.d8)).max(c.d0).min(c.d1);
	let out = Decimal.add(cycles, over);
	if (axis === "W") { return Decimal.linearSoftcap(out, c.d10, c.d3); }
	if (axis === "S") { return Decimal.logarithmicSoftcap(out, c.d10, c.d9); }
	if (axis === "O") { return Decimal.logarithmicSoftcap(out, c.d20, c.d1, -1); }
	return Decimal.linearSoftcap(out, c.d40, c.d1);
}

function darkStarEffect2LevelFormula(axis) {
	let axisNum = axisCodes.indexOf(axis);
	let out = (axisNum > 7) ? ("⌊★ ÷ 32⌋ + max(0, min((★ ÷ 8) mod 4" + formulaFormat.add(N(8 - axisNum)) + ", 1))") : ("⌊★ ÷ 8⌋ + clamp(0, ★ mod 8" + formulaFormat.add(N(-axisNum)) + ", 1)");
	if (darkStarEffect2Level(axis).gte(["W", "S", "O"].includes(axis) ? c.d10 : c.d40)) {
		if (axis === "W") { out = formulaFormat.linSoftcap("<br>" + out + "<br>", c.d10, c.d3, true); }
		else if (axis === "S") { out = formulaFormat.logSoftcap("<br>" + out + "<br>", c.d10, c.d9, true); }
		else if (axis === "O") { out = "log(" + formulaFormat.logSoftcap("<br>10<sup>" + out + "</sup><br>", c.d20, c.d1, true) + ")"; }
		else { out = formulaFormat.logSoftcap("<br>" + out + "<br>", c.d40, c.d1, true); }
	}
	return "<i>" + formulaFormat.bracketize(out) + " × " + ((axisNum > 7) ? "5" : "10") + "%</i>";
}

function maxAffordableDarkStars(x) {
	x = (x === undefined) ? stat.totalDarkAxis : N(x);
	let effective_dark_axis = x.add(darkStarPriceMod("sub")).mul(darkStarPriceMod("div")).root(darkStarPriceMod("pow"));
	let out = (effective_dark_axis.lt(c.d24)) ? c.dm1 : effective_dark_axis.mul(c.d2).add(c.d49).pow(c.d0_5).mul(c.d2).sub(c.d22);
	if (out.gt(stat.darkStarScalingStart)) {
		let start = stat.darkStarScalingStart;
		let power = stat.darkStarScalingPower;
		out = Decimal.logarithmicSoftcap(out, start, power);
		out = out.sub(start).div(power.add(c.d1)).add(start);
	}
	return out.floor().add(c.d1);
}

function gainDarkStar(cap, manual = false) {
	if (achievement.ownedInTier(5) < 7) {
		if (StudyE(12)) { if (manual) { notify("研究 XII 中禁用星尘重置", "#990000", "#ffffff"); } return; }
	}
	let achCap = ((achievement.maxForLocks.darkstars[g.achOnProgressBar] !== undefined) && achievement.locking(g.achOnProgressBar)) ? achievement.maxForLocks.darkstars[g.achOnProgressBar] : c.maxvalue;
	if (Decimal.eq(g.darkstars, achCap)) { if (manual) { achievement.lockPopup(); } return; }
	cap = achCap.min((cap === "u") ? c.maxvalue : N(cap));
	if (!(cap instanceof Decimal)) { functionError("gainDarkStar", arguments); }
	let gain = stat.maxAffordableDarkStars.min(N(cap));
	if (!g.darkstarBulk) gain = gain.min(g.darkstars.add(c.d1));
	if (gain.lte(g.darkstars)) return;
	if (gain.sub(g.darkstars).gte(c.d20)) { addAchievement(513); }
	if (gain.sub(g.darkstars).gte(c.d35)) { addAchievement(514); }
	if (gain.sub(g.darkstars).gte(c.d50)) { addAchievement(515); }
	g.darkstars = gain;
	if (achievement.ownedInTier(5) < 7) {
		stardustReset();
		g.darkmatter = c.d0;
		for (let i = 0; i < 12; i++) g["dark" + axisCodes[i] + "Axis"] = c.d0;
	}
	if (g.darkstars.gt(g.stars)) g.shiningBrightTonight = false;
	addAchievement(528);
	addAchievement(813);
}

// ===== 能量 =====
function energyTypesUnlocked() {
	if (StudyE(3)) return 6 + studies[3].reward(1);
	return Math.max(0, g.stardustUpgrades[4] - 1);
}

function energySoftcapStart(x) {
	let out = [c.d0_25, c.d0_25, c.d0_25, c.d4, c.d0_25, c.inf, c.d0_25, c.d0_25, c.d0_5, c.d1][x];
	return out;
}

function energySoftcapStrength(x) {
	let out = c.d10;
	if (out.lt(1 / Math.LN10)) { error("能量软上限强度超出范围"); }
	return out;
}

function energyEffect(x) {
	let type = g[energyTypes[x] + "Energy"];
	let resource = [g.exoticmatter, g.stardust, g.darkmatter, g.XAxis, g.masteryPower, c.d10, g.hawkingradiation, g.knowledge, c.d10, c.d10][x];
	let softcap = energySoftcapStart(x);
	let inc = [c.d0_1, c.d0_1, c.d0_1, c.d0_5, c.d0_1, c.d0_25, c.d0_05, c.d0_025, c.d0_1, c.d0_1][x];
	let eff = ((type.gt(resource)) && (resource.gt(c.d1))) ? type.log(resource).log10().mul(StudyE(3) ? c.d1 : stat.energyEffectBoost).mul(inc).add(c.d1) : c.d1;
	if (eff.gt(softcap.add(c.d1)) && (!StudyE(3))) { eff = softcap.mul(eff.sub(c.d1).div(softcap).ln().div(energySoftcapStrength(x)).add(c.d1)).add(c.d1); }
	if (x >= energyTypesUnlocked()) { eff = c.d1; }
	if (study13.bound(52) && (!StudyE(3))) { eff = eff.sub(study13.bindingEff(52)).max(c.minvalue); }
	if (x === 8) { eff = eff.recip(); }
	return StudyE(3) ? eff.pow(studies[3].energyPowerConstant()) : eff;
}

function energySpeedMult(x) {
	if (StudyE(3)) return studies[3].energyGainConstant();
	let mult = stat.energyGainSpeed;
	if ([0, 1].includes(x) && g.achievement[521]) mult = mult.mul(c.d1_5);
	if ([2, 3].includes(x) && g.achievement[522]) mult = mult.mul(c.d1_5);
	if ([4, 5].includes(x) && g.achievement[523]) mult = mult.mul(c.d1_5);
	let energySpeedResearch = ["r4_1", "r4_2", "r4_3", "r4_13", "r4_14", "r4_15", "r9_3", "r9_1", "r10_3", "r10_1"][x];
	if (g.research[energySpeedResearch]) mult = mult.mul(researchEffect(researchRow(energySpeedResearch), researchCol(energySpeedResearch)));
	if (x < 6) {
		let research7energy = [[13, 15], [1, 14], [13, 14], [2, 3], [2, 15], [1, 3]][x];
		for (let i = 0; i < 2; i++) if (g.research["r7_" + research7energy[i]]) mult = mult.mul(researchEffect(7, research7energy[i]));
	}
	if (x === 5) { mult = mult.mul(studies[3].reward(3)); }
	if ((x === 6) && g.achievement[910]) { mult = mult.mul(achievement(910).effect().mul(stat.totalAntiAxis).add(c.d1)); }
	return mult;
}

function energyPerSec(x) {
	let resource = [g.exoticmatter, g.stardust, g.darkmatter, g.XAxis, g.masteryPower, energyTypes.map(x => g[x + "Energy"].add(c.d10).log10()).productDecimals().pow(c.d0_1), g.hawkingradiation, g.knowledge, fullAxisCodes.map(x => g[x + "Axis"].add(c.d10).log10()).productDecimals().pow(c.d0_1), stat.tickspeed][x];
	let divisor = [c.d200, c.d350, c.d500, c.d350, c.d200, c.d50, c.e8, c.e10, c.d5e4, N(3e13)][x];
	let mult = energySpeedMult(x);
	return resource.add(c.d10).dilate(c.d0_9).pow(mult.div(divisor));
}

// ===== 虫洞重置 =====
function wormholeAnimation() { wormholeAnimationActive = true; wormholeAnimationStart = Date.now(); }

const HRVariables = ["hawkingradiation", "hawkingradiationThisSpacetimeReset", "totalhawkingradiation"];

function incrementHR(x) {
	x = x.fix(c.d0);
	for (let i of HRVariables) o.add(i, x);
}

function attemptWormholeReset(showPopups = false) {
	if (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)) {
		if (!unlocked("Hawking Radiation")) {
			wormholeAnimation();
		} else if (g.confirmations.wormholeReset && showPopups && (g.activeStudy === 0)) {
			let willReset = [
				["奇异物质", true],
				["普通轴和暗轴", true],
				["精通力", true],
				["精通计时器", true],
				["星尘", true],
				["星尘升级（保留第 2 项的前 1 级和第 4 项的前 5 级）", true],
				["星星", true],
				["暗物质", true],
				["能量", true]
			];
			popup({
				text: "确定要进行虫洞重置吗？<br><br>这将重置 " + willReset.filter(x => x[1]).map(x => x[0]).joinWithAnd() + "。",
				buttons: [["确认", "if (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq)) {wormholeReset(" + showPopups + ")} else {notify('暗物质轴不足，无法虫洞重置！','#000066','#ffffff')}"], ["取消", ""]]
			});
		} else {
			wormholeReset(showPopups);
		}
	} else {
		if (showPopups) notify((g.activeStudy === 0) ? "你必须能够获得霍金辐射才能重置！" : "你必须达成研究目标才能重置！<br>如果你卡住了，请从研究标签页中止研究。", "#000099", "#ffffff");
	}
}

function wormholeReset(showPopups = false) {
	let HRgained = stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq);
	let timeLoopMult = 1;
	if (HRgained) {
		addAchievements("wormholeResetBefore");
		timeLoopMult = wormholeAmplificationMultiplier();
		g.dilatedTime -= wormholeAmplificationCost();
		incrementHR(stat.pendinghr.floor().mul(timeLoopMult));
		g.WormholeResets += timeLoopMult;
		g.fastestWormholeReset = Decimal.min(g.fastestWormholeReset, g.timeThisWormholeReset);
	}
	if (g.wormholeResets === 0) {
		timeState = 0;
		d.display("wormholeAnimation", "inline-block");
		let start = Date.now();
		while (Date.now() - start < 1e4) d.element("wormholeAnimation").style.opacity = (Date.now() - start) / 1e4;
	}
	g.previousStardustRuns.last10 = [];
	g.previousStardustRuns.wormhole = { fastest: previousPrestige.generate(1, 2, true), highest: previousPrestige.generate(1, 2, true) };
	if (HRgained) {
		let f0 = previousPrestige.generate(2, 0, false);
		let f3 = previousPrestige.generate(2, 3, false);
		let f4 = previousPrestige.generate(2, 4, false);
		g.previousWormholeRuns.last10 = [f0].concat(g.previousWormholeRuns.last10).slice(0, 10);
		if (f3.time < g.previousWormholeRuns.spacetime.fastest.time) g.previousWormholeRuns.spacetime.fastest = f3;
		if (f4.time < g.previousWormholeRuns.eternity.fastest.time) g.previousWormholeRuns.eternity.fastest = f4;
		if (f3.gain.gt(g.previousWormholeRuns.spacetime.highest.gain)) g.previousWormholeRuns.spacetime.highest = f3;
		if (f4.gain.gt(g.previousWormholeRuns.eternity.highest.gain)) g.previousWormholeRuns.eternity.highest = f4;
		if (f3.efficiency.gt(g.previousWormholeRuns.spacetime.efficientest.efficiency)) g.previousWormholeRuns.spacetime.efficientest = f3;
		if (f4.efficiency.gt(g.previousWormholeRuns.eternity.efficientest.efficiency)) g.previousWormholeRuns.eternity.efficientest = f4;
	}
	if (g.activeStudy !== 0) {
		if (stat.totalDarkAxis.gte(studies[g.activeStudy].goal())) {
			g.studyCompletions[g.activeStudy] = (g.activeStudy === 13) ? Math.max(studyPower(13), g.studyCompletions[13]) : Math.min(studyPower(g.activeStudy) + 1, 4);
			if (g.activeStudy === 13) {
				study13.updateRewardLevels();
			} else {
				let resbuild = Object.keys(research).filter(x => g.research[x] && (research[x].type !== "study"));
				respecResearch();
				if (g.restoreResearchAfterStudy) { buyResearchList(resbuild); }
			}
			updateResearchTree();
			generateResearchCanvas();
			if ((g.activeStudy === 10) && (studyPower(10) === 3)) { for (let i of g.study10Options) { g.ach920Completions |= 2 ** (i - 1); } }
		}
		g.activeStudy = 0;
		g.luckEssence = 0;
		if (g.studyCompletions[7] > 0) unlockFeature("Luck");
		if (g.studyCompletions[9] > 0) unlockFeature("Antimatter");
		g.study10Options = [];
	}
	g.exoticmatter = c.d0;
	g.exoticmatterThisStardustReset = c.d0;
	g.exoticmatterThisWormholeReset = c.d0;
	for (let i = 0; i < 12; i++) {
		g[axisCodes[i] + "Axis"] = c.d0;
		g["dark" + axisCodes[i] + "Axis"] = c.d0;
	}
	g.masteryPower = c.d0;
	g.baseMasteryPowerGain = c.d1;
	g.timeThisStardustReset = 0;
	g.truetimeThisStardustReset = c.d0;
	g.fastestStardustReset = c.d9e15;
	g.timeThisWormholeReset = 0;
	g.truetimeThisWormholeReset = c.d0;
	g.stardust = c.d0;
	g.stardustThisWormholeReset = c.d0;
	g.stardustUpgrades = g.stardustUpgrades.map((x, i) => Math.min(x, [0, 1, 0, 5, 0][i]));
	g.stars = 0;
	for (let i of starList) g.star[i] = false;
	totalStars = 0;
	g.darkmatter = c.d0;
	g.darkmatterThisWormholeReset = c.d0;
	g.darkstars = c.d0;
	g.darkEnergy = c.d1;
	g.stelliferousEnergy = c.d1;
	g.gravitationalEnergy = c.d1;
	g.spatialEnergy = c.d1;
	g.neuralEnergy = c.d1;
	g.metaEnergy = c.d1;
	g.vacuumEnergy = c.d1;
	g.mentalEnergy = c.d1;
	g.dimensionalEnergy = c.d1;
	g.temporalEnergy = c.d1;
	g.StardustResets = 0;
	g.TotalStardustResets = 0;
	g.shiningBrightTonight = true;
	g.ach519possible = true;
	g.ach524possible = achievement(524).active();
	g.ach525possible = true;
	g.ach526possible = true;
	g.study9.xp = c.d0;
	g.study9.fracxp = c.d0;
	g.study9.resets = 0;
	g.ach825possible = true;
	g.ach901Int = c.d0;
	g.study12.empowerments = c.d0;
	g.study12.fortitude = c.d0;
	g.ach907Progress = 0;
	g.ach908possible = true;
	d.display("wormholeAnimation", "none");
	if (g.researchRespec) {
		respecResearch();
		g.researchRespec = false;
	}
	if (g.achievement[506] && g.ach505Progress.lt(c.e3)) g.ach505Progress = c.e3;
	g.TotalWormholeResets += timeLoopMult;
	updateStats();
	if (HRgained) { addAchievements("wormholeResetAfter"); }
}

function updateWormholeResetButtonText() {
	if (g.activeStudy === 0) {
		d.display("span_wormholeResetButtonHRText", "inline-block");
		d.display("span_wormholeResetButtonStudyText", "none");
		d.innerHTML("span_wormholeResetButtonPendingHR", stat.pendinghr.format());
	} else {
		d.display("span_wormholeResetButtonHRText", "none");
		d.display("span_wormholeResetButtonStudyText", "inline-block");
		d.innerHTML("span_wormholeResetButtonPendingHR", roman(g.activeStudy));
	}
	if (stat.totalDarkAxis.lt(stat.wormholeDarkAxisReq)) {
		d.innerHTML("span_wormholeResetButtonReqText", "(需要 " + BEformat(stat.wormholeDarkAxisReq) + " 总暗物质轴)");
	} else if ((g.activeStudy === 0) && stat.pendinghr.lt(c.e2)) {
		d.innerHTML("span_wormholeResetButtonReqText", "(下一次在 " + BEformat(stat.pendinghr.floor().add(c.d1).root(stat.HRExponent).div(stat.HRMultiplier).root(stat.HRBaseExponent).log(c.d2).root(stat.HRBaseApexExp).mul(c.d1500).ceil()) + " 总暗物质轴)");
	} else {
		d.innerHTML("span_wormholeResetButtonReqText", "");
	}
}

// ===== 虫洞里程碑 =====
const wormholeMilestoneList = {
	1: { text: "解锁暗轴自动购买器", notification: "你已解锁暗轴自动购买器" },
	2: { text: "解锁暗星自动购买器", notification: "你已解锁暗星自动购买器" },
	3: { text: "解锁星尘升级自动购买器", notification: "你已解锁星尘升级自动购买器" },
	4: { text: "解锁星星自动购买器", notification: "你已解锁星星自动购买器" },
	5: { text: "解锁自动星星分配", notification: "你已解锁自动星星分配" },
	6: { text: "解锁锁定手动购买星尘升级的功能", notification: "你现在可以在自动化标签页中锁定手动购买星尘升级" },
	7: { text: "暗星不再重置暗物质" },
	8: { text: "解锁自动星尘重置", notification: "你已解锁自动星尘重置" },
	9: { dynamic: "星星和星尘升级的费用根据霍金辐射降低<br>（公式：10<sup>log(费用)<sup>{v}</sup></sup>）", static: "星星和星尘升级的费用根据霍金辐射降低" },
	10: { text: "每秒获得 1 星尘，不受除 时间速度外的任何乘数影响", notification: "你现在每秒自动获得 1 星尘，不受除 时间速度外的任何乘数影响" },
	11: { text: "第 3 项星尘升级可以多购买 4 次" },
	12: { text: "解锁自动虫洞重置", notification: "你已解锁自动虫洞重置" },
	13: { text: "每解锁一个成就，游戏运行速度提升 0.25%", notification: "每解锁一个成就，游戏现在运行速度提升 0.25%" },
	14: { text: "知识获取速度提升 1.25×", notification: "知识获取速度现在提升 1.25×" },
	15: { text: "解锁第 4 行的更多研究", notification: "你已解锁 6 个新的第 4 行研究" },
	16: { text: "虫洞里程碑的知识乘数提升至 1.6×", notification: "知识获取现在提升 1.28×" },
	17: { text: "虫洞里程碑的知识乘数提升至 2×", notification: "知识获取现在提升 1.25×" },
	18: { dynamic: "根据霍金辐射增加 {v} 到暗 T 轴计时器（基于霍金辐射）", static: "暗 T 轴计时器根据霍金辐射增加" },
	19: { text: "虫洞里程碑的知识乘数提升至 2.5×", notification: "知识获取现在提升 1.25×" },
	20: { text: "在离线时间子标签页解锁时间循环", notification: "你已在离线时间子标签页解锁时间循环" },
	21: { text: "第一行研究每解锁一个成就强度提升 0.1%" },
	22: { text: "虫洞里程碑的知识乘数提升至 3.2×", notification: "知识获取现在提升 1.28×" },
	23: { text: "虫洞里程碑的知识乘数提升至 4×", notification: "知识获取现在提升 1.25×" },
	24: { text: "第二行研究每解锁一个成就强度提升 0.2%" },
	25: { text: "虫洞里程碑的知识乘数提升至 5×", notification: "知识获取现在提升 1.25×" },
	26: { text: "虫洞里程碑的知识乘数提升至 6.4×", notification: "知识获取现在提升 1.28×" },
	27: { dynamic: "第 10 行精通根据霍金辐射提升 {v}% 强度", static: "第 10 行精通根据霍金辐射变得更强" },
	28: { text: "虫洞里程碑的知识乘数提升至 8×", notification: "知识获取现在提升 1.25×" },
	29: { text: "虫洞里程碑的知识乘数提升至 10×", notification: "知识获取现在提升 1.25×" },
	30: { text: "立即获得所有待处理的星尘。在研究期间无效。", notification: "只要不在研究中，你现在会立即获得所有待处理的星尘。恭喜你完成了收藏！" }
};

const wormholeMilestone9 = {
	mult: function () {
		let mult = c.dm0_1;
		if (g.achievement[716]) mult = mult.mul(achievement(716).effect());
		return mult;
	},
	eff: function (x = g.hawkingradiation) { return c.e.pow(x.div(c.d10).add(c.d1).quad_slog().mul(wormholeMilestone9.mult())); },
	formula: function () { return "e<sup>slog(HR ÷ 10 + 1)" + formulaFormat.mult(wormholeMilestone9.mult(), 4) + "</sup>"; }
};

const wormholeMilestone18 = {
	mult: function () { let out = c.d200; return out; },
	scstart: function () { let out = c.d86400; return out; }, // 24 小时
	sclim: function () { let out = c.d3155692599; return out; }, // 100 年
	eff: function (x = g.hawkingradiation) { return Decimal.convergentSoftcap(x.add1Log(c.d10).pow(c.d1_5).mul(this.mult()), this.scstart(), this.sclim(), 1); },
	formula: function () {
		let out = "log(HR + 1)<sup>1.5</sup>" + formulaFormat.mult(this.mult());
		return Decimal.gte(this.eff(), this.scstart()) ? ("10<sup>log(" + formulaFormat.convSoftcap(out, this.scstart().log10(), this.sclim().log10(), true) + ")</sup>") : out;
	}
};

const wormholeMilestone27 = {
	eff: function (x = g.hawkingradiation) {
		let out = x.div(c.e3).add(c.d1).log10().pow(c.d0_3).mul(c.d10);
		return Decimal.convergentSoftcap(Decimal.logarithmicSoftcap(out, c.d25, c.d1), c.d50, c.e2);
	},
	formula: function () { return formulaFormat.convSoftcap(formulaFormat.logSoftcap("log(HR ÷ 1,000 + 1)<sup>0.3</sup> × 10", c.d25, c.d1, wormholeMilestone27.eff().gt(c.d25)), c.d50, c.e2, wormholeMilestone27.eff().gt(c.d50)); }
};

function wormholeMilestoneText(x) {
	if (x === 9) return "星星和星尘升级的费用根据霍金辐射降低";
	if (x === 18) return "根据霍金辐射增加暗 T 轴计时器的额外时间";
	if (x === 27) return "第 10 行精通根据霍金辐射变得更强";
	return wormholeMilestoneList[wormholeMilestoneList.map(x => x[0]).indexOf(x)][1];
}

// ===== 研究 =====
function visibleStudies() {
	let out = [];
	for (let i = 1; i < 13; i++) {
		if (!g.research[(i === 10) ? studies[10].research[0] : studies[i].research]) {
			if ((g.studyCompletions[i] === 4) && (!g.completedStudiesShown) && (g.studyContainerStyle === "Detailed")) { continue; }
			if (!((g.studyCompletions[i] > 0) || g.researchVisibility.includes(studies[i]["research"]) || StudyE(i))) { continue; }
		}
		out.push(Number(i));
	}
	return out;
}

function StudyE(x) {
	if (x < 10) if (g.activeStudy === 10) if ([[1, 4, 7], [2, 5, 8], [3, 6, 9], g.study10Options][studyPower(10)].includes(x)) return true;
	if (g.activeStudy === x) return true;
	return false;
}

function enterStudy(x) {
	if ((x === 10) && (studyPower(10) === 3) && (g.study10Options.length < 3)) { // 选择选项
		popup({
			text: "选择第 " + ordinal(g.study10Options.length + 1) + " 个选项：",
			buttons: countTo(9).filter(i => !g.study10Options.includes(i)).map(x => [roman(x), "g.study10Options.push(" + x + ");enterStudy(10)"]),
			buttonSize: 5
		});
	} else {
		g.researchRespec = false;
		wormholeReset();
		g.activeStudy = x;
		if (x === 1) setTimeout(() => g.clickedInStudy1 = false, 0); // gameClick() 在此之后运行，需延迟绕过
		if (StudyE(5)) {
			let studyRes = studies[g.activeStudy].research;
			respecResearch();
			buySingleResearch(researchRow(studyRes), researchCol(studyRes), true);
			updateResearchTree();
		}
		if (x === 13) {
			addAchievement(905);
		}
	}
}

const studyButtons = {
	state: function (x) { return [g.activeStudy === x, StudyE(x), g.research[studies[x]["research"]], g.activeStudy !== 0, true].indexOf(true); },
	click: function (x) {
		let state = studyButtons.state(x);
		if (state === 0) { wormholeReset(); }    // 状态 1, 3 和 4 无操作
		else if (state === 2) { enterStudy(x); }
	},
	text: function (x) {
		let state = studyButtons.state(x);
		if (state === 0) { return (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq) ? "完成" : "中止") + "研究"; }
		if (state === 1) { return "被困在"; }
		if (state === 2) { return "开始"; }
		if (state === 3) { return "已在研究 " + studies[0].roman(g.activeStudy); }
		if (state === 4) { return "需要研究 " + researchOut(studies[x]["research"]); }
	},
	class: function (x) { return ["enabled", "enabled", "enabled", "disabled", "disabled"][studyButtons.state(x)]; }
};
function updateStudyDiv(HTMLnum, studyNum, follow) {
	d.class("div_study" + HTMLnum + follow, "studyDiv comp" + (((g.activeStudy === 10) && (Math.min(g.studyCompletions[10], 3) !== studyPower(10))) ? studyPower(10) : g.studyCompletions[studyNum]));
	d.innerHTML("span_study" + HTMLnum + "Num" + follow, studies[0].roman(studyNum));
	d.innerHTML("span_study" + HTMLnum + "Name" + follow, (studyNum === 10) ? (["恒星", "决断", "时间", "本体"][studyPower(10)] + "三元组") : studies[studyNum].name);
	d.innerHTML("button_study" + HTMLnum + follow, studyButtons.text(studyNum));
	d.innerHTML("span_study" + HTMLnum + "Goal" + follow, studies[studyNum].goal().format());
	d.innerHTML("span_study" + HTMLnum + "Description" + follow, (studies[studyNum].description().length === 1) ? studies[studyNum].description()[0] : ("<table>" + studies[studyNum].description().map((x, i) => "<tr><td style=\"vertical-align:top;text-align:left;width:20px;\">" + (i + 1) + "</td><td style=\"vertical-align:top;text-align:left;\">" + x + "</td>").join("") + "</table>"));
	if (studies[studyNum].disclaimers === undefined) {
		d.tr("span_study" + HTMLnum + "Disclaimers" + follow, false);
	} else {
		let disclaimers = studies[studyNum].disclaimers.filter(x => x[1]()).map(x => x[0]);
		if (disclaimers.length === 0) {
			d.tr("span_study" + HTMLnum + "Disclaimers" + follow, false);
		} else {
			d.tr("span_study" + HTMLnum + "Disclaimers" + follow, true);
			d.innerHTML("span_study" + HTMLnum + "Disclaimers" + follow, "<i>" + disclaimers.map(x => "注：" + x).join("<br>") + "</i>");
		}
	}
	if (follow !== "CompactView") { d.innerHTML("span_study" + HTMLnum + "Completions" + follow, g.studyCompletions[studyNum]); }
	d.innerHTML("span_study" + HTMLnum + "Reward" + follow, "<table>" + studies[studyNum].reward_desc().map((x, i) => "<tr><td style=\"vertical-align:top;text-align:left;width:20px;\">" + (i + 1) + "</td><td style=\"vertical-align:top;text-align:left;\">" + x + "</td>").join("") + "</table>");
	d.class("button_study" + HTMLnum + follow, "studyButton " + studyButtons.class(studyNum));
}

function studyRewardHTML(studyNum, rewardNum, precisionOrCallback = 2, completions = g.studyCompletions[studyNum]) {
	if (showFormulas) if (studies[studyNum].rewardFormulas !== undefined) if (studies[studyNum].rewardFormulas[rewardNum] !== undefined) return formulaFormat(studies[studyNum].rewardFormulas[rewardNum](completions));
	function format(n) { return (typeof precisionOrCallback === "number") ? n.noLeadFormat(precisionOrCallback) : precisionOrCallback(n); }
	let curr = N(studies[studyNum].reward(rewardNum, completions));
	let next = N(studies[studyNum].reward(rewardNum, Math.min(completions + 1, 4)));
	if ((completions === 4) || Decimal.eq(curr, next)) return "<b>" + format(curr) + "</b>";
	return "<b>" + arrowJoin(format(curr), format(next)) + "</b>";
}

function studyPower(x) {
	if (x === 13) { return study13.allBindings.map(x => g.study13Bindings[x] ? study13.bindings[x].lv : 0).sum(); }
	if ((x < 10) && (g.activeStudy === 10)) { return 3; } // 禁止漏洞利用 :D
	if (x === 10) { for (let i = 3; i >= 0; i--) { if (g.research[studies[10].researchList[i]]) { return i; } } } // 允许重试之前的三元组
	return Math.min(g.studyCompletions[x], 3);
}

function studyRewardBoost(studyNum, rewardNum) {
	if (rewardNum === 2) {
		let out = (studyNum === 10) ? c.d1 : studies[10].reward(4);
		if ((studyNum === 7) && g.research.r28_1) out = out.mul(researchEffect(28, 1));
		if (study13.bound(265)) { out = out.mul(study13.bindingEff(265)); }
		return out;
	}
	if (rewardNum === 3) {
		let out = stat.redLightEffect;
		if (studyNum === 10) {
			if (g.achievement[920]) { out = out.mul(achievement(920).effect()); }
		} else {
			let studyAchievements = [null, 608, 609, 705, 715, 812, 814, 902, 908, 914, null, 926, 932];
			if (typeof studyAchievements[studyNum] === "number") if (g.achievement[studyAchievements[studyNum]]) { out = out.div(c.d0_9); }
		}
		if ((studyNum === 7) && g.research.r25_1) { out = out.mul(researchEffect(25, 1)); }
		if (study13.bound(245)) { out = out.mul(study13.bindingEff(245)); }
		return out;
	}
	functionError("studyRewardBoost", arguments);
}

// ===== 光 =====
function generateChroma(x, amount) {
	let typesUnlocked = [0, 3, 6, 8, 9][lightTiersUnlocked()];
	if (g.achievement[718]) {
		let val718 = [amount, c.d1.sub(stat.chromaCostMultiplier).max(c.d0), c.em15].productDecimals();
		for (let j = 0; j < typesUnlocked; j++) g.chroma[j] = g.chroma[j].add(val718).max(c.d0); // 防止卡顿
	}
	for (let i = 0; i < 100; i++) { // 防止无限循环
		let lowestChroma = g.chroma.reduce((x, y) => x.min(y));
		if (amount.lt(lowestChroma.max(stat.chromaPerSec).div(c.e15))) break;
		if (lightComponents(x) === null) {
			g.chroma[x] = g.chroma[x].add(amount).fix(c.d0);
			return;
		} else {
			let toGenerate = lightComponents(x).map(i => g.chroma[i]).reduce((x, y) => x.min(y)).div(chromaCostFactor(x)).min(amount).max(c.d0);
			if (toGenerate.eq(c.d0) && g.haltChromaIfLacking) {
				g.activeChroma = null; return;
			} else {
				for (let i of lightComponents(x)) g.chroma[i] = g.chroma[i].sub(toGenerate.mul(chromaCostFactor(x))).max(c.d0).fix(c.d0);
				g.chroma[x] = g.chroma[x].add(toGenerate).max(c.d0).fix(c.d0);
				amount = amount.sub(toGenerate);
				if (amount.sign !== 0) {
					if (g.haltChromaIfLacking) { g.activeChroma = null; }
					else { for (let i of lightComponents(x)) if (g.chroma[i].eq(c.d0)) { x = i; g.activeChroma = i; } }
				}
			}
		}
	}
	if (g.achievement[718]) {
		let remainder = amount.div(c.d9).mul(c.d1.sub(stat.chromaCostMultiplier).max(c.d0));
		for (let i = 0; i < typesUnlocked; i++) g.chroma[i] = g.chroma[i].add(remainder);
	}
}

function lightTiersUnlocked() {
	if (g.research.r19_8) return 4;
	if (g.research.r11_8) return 3;
	if (g.research.r10_5) return 2;
	if (g.research.r8_8) return 1;
	return 0;
}

function lightComponents(i) {
	if (i < 3) return (g.prismaticUpgrades.chromaOverdrive.sign === 0) ? null : [8];
	return [[1, 2], [0, 2], [0, 1], [3, 4, 5], [3, 4, 5], [6, 7]][i - 3];
}

function updateYellowLightCache(i) {
	for (let ach of yellowLight.affected) {
		achievement(ach).yellowValue = yellowLight.value(achievement(ach).yellowBreakpoints, g.lumens[5]);
		achievement(ach).nextYellowValue = yellowLight.value(achievement(ach).yellowBreakpoints, g.lumens[5].add(c.d1));
	}
	yellowLight.currentAffected = yellowLight.affected.filter(ach => Decimal.neq(yellowLight.value(achievement(ach).yellowBreakpoints, g.lumens[5]), yellowLight.value(achievement(ach).yellowBreakpoints, g.lumens[5].add(c.d1))));
}

const lightData = [
	{ baseReq: c.e3, baseScale: c.d4, effect: "每个研究的第三个奖励效果提升 {x}%" },
	{ baseReq: c.e3, baseScale: c.d2, effect: "每个购买的 S 轴将 T 轴效果乘以 {x}<br><span class=\"small\">(当前总体乘数为 {e}×)</span>" },
	{ baseReq: c.e3, baseScale: c.d3, effect: "霍金辐射的基础获取提升至 {x} 次幂" },
	{ baseReq: c.e5, baseScale: c.d1_5, effect: "研究 7-5 对知识的基础获取产生 {x}{s} 效果<br><span class=\"small\">(若拥有研究 7-5，当前约为知识获取的 {e}× 加成)</span>" },
	{ baseReq: c.e5, baseScale: c.d2_5, effect: "提升精通力基础获取指数 {x}<br><span class=\"small\">(当前为精通力获取提供 {e}× 加成)</span>" },
	{ baseReq: c.e5, baseScale: c.d1_1, effect: "{x} 个成就的奖励将变得更强。<br>" + ["查看下一个效果", "查看所有效果"].map((x, i) => "<button class=\"genericbutton size3 reviewYellowLight\" onClick=\"reviewYellowLight(" + i + ")\" id=\"button_reviewYellowLight" + i + "\">" + x + "</button>").join("") },
	{ baseReq: c.e10, baseScale: c.d10, effect: "星星费用提升至 {x} 次幂" },
	{ baseReq: c.e10, baseScale: c.d10, effect: "色素生成成本降低 {x}{s}" },
	{ baseReq: c.e100, baseScale: c.e10, effect: "色素获取乘以 {x}" }
];

function lumenCostScale(i) {
	if (i === 8) return prismaticUpgrades.lumenThresholdReduction1.eff();
	if ([6, 7].includes(i)) return prismaticUpgrades.lumenThresholdReduction2.eff();
	let out = lightData[i].baseScale;
	return out.sub(c.d1).mul(prismaticUpgrades.lumenThresholdReduction3.eff()).add(c.d1);
}

function affordableLumens(x) { return Decimal.affordGeometricSeries(g.chroma[x], lightData[x].baseReq, lumenCostScale(x), g.lumens[x]); }
function costOfAffordableLumens(x) { return Decimal.sumGeometricSeries(affordableLumens(x), lightData[x].baseReq, lumenCostScale(x), g.lumens[x]); }
function lumenReq(x) { return lumenCostScale(x).pow(g.lumens[x]).mul(lightData[x].baseReq); }

function addLumens(x) {
	let added = affordableLumens(x);
	if (added.neq(c.d0)) {
		g.chroma[x] = g.chroma[x].sub(costOfAffordableLumens(x)).fix(c.d0);
		g.lumens[x] = g.lumens[x].add(added).fix(c.d0);
		if (x === 5) updateYellowLightCache();
	}
	addAchievements("lumenGain");
}

const lightEffect = [
	{
		value: function (x = g.lumens[0]) { return Decimal.convergentSoftcap(x, c.e2, c.d200, 3).div(c.e2).add(c.d1); },
		format: function (x) { return x.sub(c.d1).mul(c.e2).noLeadFormat(4); },
		formula: function () { return g.lumens[0].gte(c.e2) ? ("<span style=\"font-size:95%;\">Ξ<sup>[3]</sup>" + formulaFormat.convSoftcap("log<sup>[3]</sup>(L)", c.e2.layerplus(-3), c.d200.layerplus(-3), true) + "</span>") : "L"; }
	},
	{
		value: function (x = g.lumens[1]) { return c.d0_02.mul(x).add(c.d0_18).mul(x).add(c.d1); },
		format: function (x) { return x.noLeadFormat(2); },
		formula: function () { return "0.02 × L<sup>2</sup> + 0.18 × L + 1"; }
	},
	{
		value: function (x = g.lumens[2]) { return x.div(c.d10).add(c.d4).log2().log2(); },
		format: function (x) { return x.format(4); },
		formula: function () { return "log<span class=\"xscript\"><sup>[2]</sup><sub>2</sub></span>(L ÷ 10 + 4)"; }
	},
	{
		ssExp: function () { return g.achievement[901] ? achievement(901).effect() : c.d0_5; },
		value: function (x = g.lumens[3], s = this.ssExp()) {
			let out = x.gt(c.d50) ? x.div(c.d25).sub(c.d1).ln().add(c.d2).div(c.d4) : x.div(c.e2);
			return out.gt(c.d1) ? out.mul(c.e2.div(s)).sub(c.e2.div(s)).add(c.d1).pow(s).add(c.d99).div(c.e2) : out;
		},
		format: function (x) { return x.gte(c.d10) ? x.noLeadFormat(3) : x.mul(c.d100).noLeadFormat(x.gte(c.d1) ? 5 : 3); },
		formula: function (s = this.ssExp()) {
			if (g.lumens[3].lt(c.d50)) return "L";
			if (stat.cyanLightEffect.lt(c.d10)) {
				if (stat.cyanLightEffect.lt(c.d1) || s.eq(c.d1)) { return "ln(L ÷ 25 - 1) × 25 + 50"; }
				return "(ln(L ÷ 25 - 1) × " + c.d25.div(s).noLeadFormat(3) + formulaFormat.add(c.d50.div(s).sub(c.e2.div(s)).add(c.d1)) + ")" + formulaFormat.exp(s) + " + 99";
			} else {
				if (s.eq(c.d1)) { return "ln(L ÷ 25 - 1) ÷ 4 + 0.5"; }
				return "((ln(L ÷ 25 - 1) × " + c.d25.div(s).noLeadFormat(3) + formulaFormat.add(c.d50.div(s).sub(c.e2.div(s)).add(c.d1)) + ")" + formulaFormat.exp(s) + " + 99) ÷ 100";
			}
		}
	},
	{
		value: function (x = g.lumens[4]) { return Decimal.logarithmicSoftcap(x.div(c.d10), c.d256, c.d0_25); },
		format: function (x) { return x.noLeadFormat(3); },
		formula: function () { return formulaFormat.logSoftcap("L ÷ 10", c.d256, c.d0_25, g.lumens[4].gte(2560)); }
	},
	{
		value: function (x = g.lumens[5]) { return achievement.all.filter(a => achievement(a).yellowBreakpoints === undefined ? false : achievement(a).yellowBreakpoints.length === 3 ? (achievement(a).yellowBreakpoints[0].lte(x) && achievement(a).yellowBreakpoints[1].gt(x)) : (achievement(a).yellowBreakpoints[0].lte(x))); },
		formula: function () { return numword(yellowLight.currentAffected.length); }
	},
	{
		value: function (x = g.lumens[6]) { return x.gt(c.d25) ? N(12.5).div(x) : c.d1.sub(x.div(c.d50)); },
		format: function (x) { return x.noLeadFormat(3); },
		formula: function () { return g.lumens[6].gte(c.d25) ? "12.5 ÷ L" : "1 - L ÷ 50"; }
	},
	{
		value: function (x = g.lumens[7], radiance = study13.rewardLevels.radiance) {
			x = x.mul(study13.rewards.radiance.eff(radiance).mul);
			return x.gt(c.d5) ? ((radiance === 10) ? x.mul(c.d0_4) : Decimal.convergentSoftcap(x.mul(c.d0_4), c.d10, study13.rewards.radiance.eff(radiance).lim, 2)).recip() : c.d1.sub(x.div(c.d10));
		},
		format: function (x) { return g.lumens[7].mul(study13.rewards.radiance.eff().mul).gte(c.d25) ? x.recip().noLeadFormat(3) : c.d1.sub(x).mul(c.e2).noLeadFormat(3); },
		formula: function () {
			let mult = study13.rewards.radiance.eff().mul;
			if (g.lumens[7].mul(mult).lt(c.d5)) return mult.mul(c.d10).noLeadFormat(2) + " × L";
			if (g.lumens[7].mul(mult).lt(c.d25)) return "100 - " + c.d250.div(mult).noLeadFormat(3) + " ÷ L";
			return (study13.rewardLevels.radiance === 10) ? ("L" + formulaFormat.mult(mult.mul(c.d0_4))) : "Ξ<sup>[2]</sup>" + formulaFormat.convSoftcap("log<sup>[2]</sup>(L" + formulaFormat.mult(mult.mul(c.d0_4)) + ")", c.d0, study13.rewards.radiance.eff().lim.log10().log10(), true) + "</sup></sup>";
		}
	},
	{
		base: function () {
			let out = c.e5;
			if (g.wormholeUpgrades[7]) { out = out.mul(wormholeUpgrades[7].eff()); }
			if (study13.rewardLevels.sacredNumber > 2) { out = out.mul(1.034); }
			return out;
		},
		softcap: function (zemer = study13.rewardLevels.zemer) {
			let out = c.e2;
			out = out.add(study13.rewards.zemer.eff(zemer));
			return out;
		},
		value: function (x = g.lumens[8], zemer = study13.rewardLevels.zemer) {
			let divisor = x.div(this.softcap(zemer)).max(c.d1).log10().pow(c.d2).add(c.d1);
			return this.base().pow(x.div(divisor));
		},
		format: function (x) { return x.format(); },
		formula: function () { return this.base().format() + "<sup>L" + (g.lumens[8].gte(c.e2) ? "÷ (log(L ÷ " + this.softcap().format() + ")<sup>2</sup> + 1)" : "") + "</sup>"; }
	}
];

function toggleChromaGen(x) {
	g.activeChroma = (g.activeChroma === x) ? null : x;
}

function chromaCostFactor(x) {
	if (!(lightComponents(x) instanceof Array)) return;
	return c.d1.div(lightComponents(x).length).mul(stat.chromaCostMultiplier);
}

function reviewYellowLight(mode) {    // 0 = 下一个, 1 = 所有效果
	let shownAchievements, out = [];
	if (mode === 0) { shownAchievements = yellowLight.affected.filter(x => achievement(x).yellowBreakpoints[0].lt(g.lumens[5].add(c.d1)) && achievement(x).yellowBreakpoints[1].gt(g.lumens[5])); }
	else if (mode === 1) { shownAchievements = yellowLight.affected.filter(x => achievement(x).yellowBreakpoints[0].lt(g.lumens[5])); }
	else { functionError("reviewYellowLight", arguments); }
	function achPriority(ach) { return (g.achievement[ach] && Decimal.neq(achievement(ach).effect(c.d0), achievement(ach).effect(c.d1))) ? 1 : 0; } // 成就显示优先级
	shownAchievements = shownAchievements.sort((a, b) => achPriority(b) - achPriority(a));
	for (let x of shownAchievements) {
		let colors = achievement.tierColors[achievement.tierOf(x)];
		out.push("<div style=\"background-color:" + colors.dark + ";color:" + colors.light + ";height:60px;width:calc(60vw - 16px);border-style:solid;border-color:" + colors.light + ";border-width:2px;border-radius:10px;margin:4px" + ((achPriority(x) === 0) ? ";filter:opacity(33%)" : "") + "\">" + (achievement.visible(x) ? ("<table><tr><td style=\"width:225px;height:60px;\">" + x + "<br>" + achievement(x).name + "</td><td style=\"width:calc(60vw - 241px);height:60px;\">" + achievement(x).reward.replaceAll("{}", yellowLight.effectHTML(x, (mode === 1 || g.showLightEffectsFrom0) ? c.d0 : achievement(x).yellowValue, (mode === 1 || g.showLightEffectsFrom0) ? achievement(x).yellowValue : achievement(x).nextYellowValue)) + "</td></tr></table>") : ("<table><tr><td style=\"height:60px\">[该成就尚未揭示]</td></tr></table>")) + "</div>");
	}
	popup({
		text: out.join(""),
		buttons: [["关闭", ""]]
	});
}

// ===== 星系 =====
function effectiveGalaxies(effNum, isBoost, gal = g.galaxies) {
	gal = N(gal).add(effectiveGalaxies.add(isBoost));
	return (gal.gte(galaxyEffects[effNum].req - 1)) ? N(gal.sub(galaxyEffects[effNum].req - 1)) : c.d0;
}

effectiveGalaxies.add = function (isBoost) {
	if (![0, 1, true, false].includes(isBoost)) { functionError("effectiveGalaxies.add", arguments); }
	let out = c.d0;
	if ((!isBoost) && study13.bound(315)) { out = out.add(study13.bindingEff(315)); }
	return out;
};

function effectiveGalaxyFormulaText(effNum, isBoost, data = {}) {
	let add = [c.d1, data.add ?? c.d0, effectiveGalaxies.add(isBoost), Decimal.FC_NN(-1, 0, galaxyEffects[effNum].req)].sumDecimals();
	let max = Decimal.add(data.add ?? c.d0, data.max ?? c.d0);
	return add.gte(max) ? ("G" + formulaFormat.add(add)) : ("max(G" + formulaFormat.add(add) + ", " + max.format() + ")");
}

const galaxyEffects = [
	null,
	{
		req: 1,
		boost: {
			value: function (n = g.galaxies) { return Decimal.mul(effectiveGalaxies(1, 1, n).div(c.e2).add(c.d1), c.d2.sub(N(82 / 101).pow(effectiveGalaxies(1, 1, n)))); },
			text: function () { return "第 1 行星星效果增强 " + (this.value().gt(c.d10) ? "{}×" : "{}%"); },
			format: function (e) { return this.value().gte(c.d10) ? e.noLeadFormat(3) : e.sub(c.d1).mul(c.e2).noLeadFormat(2); },
			formula: function () {
				let out = "(1 + " + effectiveGalaxyFormulaText(1, 1) + " ÷ 100) × (2 - (82 ÷ 101)<sup>" + effectiveGalaxyFormulaText(1, 1) + "</sup>)";
				if (this.value().lt(c.d10)) out = "(" + out + " - 1) × 100";
				return out;
			}
		},
		penalty: {
			value: function (n = g.galaxies) { return achievement.perAchievementReward[7].currentVal.pow(effectiveGalaxies(1, 0, n)); },
			text: function () { return "星星的基础费用提升至 {} 次幂"; },
			format: function (e) { return e.format(); },
			formula: function () { return achievement.perAchievementReward[7].currentVal.format() + "<sup>" + effectiveGalaxyFormulaText(1, 0) + "</sup>"; }
		}
	},
	{
		req: 2,
		boost: {
			exp: function () { return g.wormholeUpgrades[3] ? c.d1_5 : c.d0_9; },
			value: function (n = g.galaxies) { return [c.d1_15, effectiveGalaxies(2, 1, n), this.exp()].decimalPowerTower(); },
			text: function () {
				function eff(gal) { let s = affordableStars(gal); return Decimal.mul(galaxyEffects[2].boost.value(gal).pow(s), stat.chromaGainBase.pow(s - 60)); }
				return (this.value().gt(c.d10) ? "{}×" : "+{}%") + " 每颗星星的色素获取<br><span class=\"small\">(当前总体乘数：" + arrowJoin(eff(g.galaxies).noLeadFormat(2), eff(g.galaxies + 1).noLeadFormat(2)) + "×)</span>";
			},
			format: function (e) { return this.value().gte(c.d10) ? e.noLeadFormat(3) : e.sub(c.d1).mul(c.e2).noLeadFormat(2); },
			formula: function () {
				let out = "1.15<sup>" + effectiveGalaxyFormulaText(2, 1) + "<sup>" + this.exp().noLeadFormat(3) + "</sup></sup>";
				if (galaxyEffects[2].boost.value().lt(c.d10)) out = "(" + out + " - 1) × 100";
				return out;
			}
		},
		penalty: {
			base: function () {
				let out = c.d0_99;
				if (g.research.r13_5) { out = out.pow(researchEffect(13, 5)); }
				for (let i of [104, 114]) { if (study13.bound(i)) { out = out.pow(study13.bindingEff(i)); } }
				return out;
			},
			value: function (n = g.galaxies) { return this.base().pow(effectiveGalaxies(2, 0, n)); },
			text: function () { return "低于 40 星的每颗星星使星尘获取提升至 {} 次幂（当前：^" + ((g.stars < 40) ? this.value().pow(40 - g.stars).format(3) : "1") + "）"; },
			format: function (e) { return e.noLeadFormat(3); },
			formula: function () { return this.base().formatFrom1(3) + "<sup>" + effectiveGalaxyFormulaText(2, 0) + "</sup>"; }
		}
	},
	{
		req: 4,
		boost: {
			value: function (n = g.galaxies) { return effectiveGalaxies(3, 1, n).div(c.e2).add(c.d1); },
			text: function () { return "U 轴效果每星系" + (this.value().gte(c.d10) ? "乘以 {}" : "提升 {}%"); },
			format: function (e) { return this.value().gte(c.d10) ? e.noLeadFormat(3) : e.sub(c.d1).mul(c.e2).noLeadFormat(2); },
			formula: function () { return this.value().gte(c.d10) ? ("1 + " + effectiveGalaxyFormulaText(3, 1) + " ÷ 100") : effectiveGalaxyFormulaText(3, 1); }
		},
		penalty: {
			base: function () {
				let out = c.inf;
				out = out.pow(studies[9].reward(2));
				out = out.pow(luckUpgrades.duofolium.star.eff());
				return out;
			},
			value: function (n = g.galaxies) { return [this.base(), effectiveGalaxies(3, 0, n), c.d3].decimalPowerTower(); },
			text: function () { return "每颗星星使星星费用乘以 {}（在第一惩罚之前应用）"; },
			format: function (e) { return e.format(); },
			formula: function () { return this.base().format() + "<sup>" + effectiveGalaxyFormulaText(3, 0) + "<sup>3</sup></sup>"; }
		}
	},
	{
		req: 6,
		boost: {
			exp: function () { return g.wormholeUpgrades[3] ? c.d0_6 : c.d0_5; },
			value: function (n = g.galaxies) { return effectiveGalaxies(4, 1, n).add(c.d1).pow(this.exp()); },
			text: function () { return "棱镜的基础获取提升至 <i>((x + 1)<sup>{}</sup> - 1)</i>"; },
			format: function (e) { return e.noLeadFormat(4); },
			formula: function () { return effectiveGalaxyFormulaText(4, 1, { add: 1 }) + "<sup>" + this.exp().noLeadFormat(3) + "</sup>"; }
		},
		penalty: {
			value: function (n = g.galaxies) { return effectiveGalaxies(4, 0, n).mul(c.d10).max(c.d1).log10().pow(c.d1_5).div(c.e2); },
			text: function () { return "超过 40 星的每星系使星星折算增强 {}%"; },
			format: function (e) { return e.mul(c.e2).noLeadFormat(2); },
			formula: function () { return "(log(" + effectiveGalaxyFormulaText(4, 0, { max: 0.1 }) + ") + 1)<sup>1.5</sup>"; }
		}
	},
	{
		req: 10,
		boost: {
			value: function (n = g.galaxies) { return Decimal.FC_NN(1, 0, 0.5 + 0.02 * effectiveGalaxies(5, 1, n)); },
			text: function () { return "分配的星星对研究 II 的第三个奖励具有 {}% 效率"; },
			format: function (e) { return e.mul(c.e2).format(); },
			formula: function () { return effectiveGalaxyFormulaText(5, 1, { add: 25 }) + " × 2"; }
		},
		penalty: {
			value: function (n = g.galaxies) { let e = effectiveGalaxies(5, 0, n); return Decimal.fracDecibel_arithmetic(e.add(c.d5).mul(e).div(c.d2)); },
			text: function () { return "低于 20 的每未分配星星使游戏运行速度降低 {}× (当前: " + this.value().pow(Math.max(0, 20 - unspentStars())).noLeadFormat(3) + "×)"; },
			format: function (e) { return e.noLeadFormat(3); },
			formula: function () { return "dB(" + effectiveGalaxyFormulaText(5, 0) + " × " + effectiveGalaxyFormulaText(5, 0, { add: 5 }) + " ÷ 2)"; }
		}
	}
];

function gainGalaxy() {
	if (g.stars === starCap()) {
		g.galaxies++;
		if (g.galaxies > g.highestGalaxies) g.highestGalaxies = g.galaxies;
		if (g.galaxies > g.highestGalaxiesSpacetime) g.highestGalaxiesSpacetime = g.galaxies;
		addAchievements("galaxyGain");
		wormholeReset();
	}
}

function loseGalaxy(num = 1) {
	if (g.galaxies === 0) { notify("你没有星系可以失去！", "#999900", "#000000"); }
	else if (num === 0) { notify("未失去星系", "#999900", "#000000"); }
	else if (num < 0) { notify("无法失去负星系", "#999900", "#000000"); }
	else if (num % 1 !== 0) { notify("无法失去分数星系", "#999900", "#000000"); }
	else {
		g.galaxies = Math.max(g.galaxies - num, 0);
		wormholeReset();
	}
}

function formatGalaxyEffect(num, type, gal = g.galaxies) {
	return textFormat(galaxyEffects[num][type].format(galaxyEffects[num][type].value(gal)), "_galaxies");
}

// ===== 运气 =====
function runeTypeNum(type) { return ["mono", "duo", "tri", "quatre", "cinque"].indexOf(type.substring(0, type.length - 6)) + 1; }

function runeTypeUnlocked(type) {
	if (["unifolium", "duofolium"].includes(type)) { return g.studyCompletions[13] > 23; }
	if (type === "trifolium") return g.research.r24_5;
	if (type === "quatrefolium") return g.research.r24_3;
	if (type === "cinquefolium") return g.research.r25_3;
	functionError("runeTypeUnlocked", arguments);
}

function affordableLuckRunes(type) {
	if (!runeTypeUnlocked(type)) return c.d0;
	if (g.luckShardSpendFactor.eq(c.d0)) return g.luckShards.gte(luckRuneCost(type, c.d1)) ? c.d1 : c.d0;
	return Decimal.affordGeometricSeries(g.luckShards.mul(g.luckShardSpendFactor), luckRunes[type].baseCost, luckRunes[type].scale, g.totalLuckRunes[type]).max(g.luckShards.gte(luckRuneCost(type, c.d1)) ? c.d1 : c.d0);
}

function luckRuneCost(type, amount = affordableLuckRunes(type)) { return Decimal.sumGeometricSeries(amount, luckRunes[type].baseCost, luckRunes[type].scale, g.totalLuckRunes[type]); }

function buyLuckRunes(type) {
	let amount = affordableLuckRunes(type);
	o.sub("luckShards", luckRuneCost(type, amount));
	g.totalLuckRunes[type] = g.totalLuckRunes[type].add(amount);
}

function unspentLuckRunes(type) { return Decimal.sub(g.totalLuckRunes[type], g.spentLuckRunes[type]); }

function affordableLuckUpgrades(type, upg) {
	if (g.luckRuneSpendFactor.eq(c.d0)) return unspentLuckRunes(type).gte(luckUpgradeCost(type, upg, c.d1)) ? c.d1 : c.d0;
	return Decimal.affordGeometricSeries(unspentLuckRunes(type).mul(g.luckRuneSpendFactor), luckRunes[type].upgBaseCost, luckRunes[type].upgScale, g.luckUpgrades[type][upg]).max(unspentLuckRunes(type).gte(luckUpgradeCost(type, upg, c.d1)) ? c.d1 : c.d0);
}

function luckUpgradeCost(type, upg, amount = affordableLuckUpgrades(type, upg)) {
	if (g.luckUpgrades[type][upg].add(amount).gte(luckRunes[type].noRoundThreshold)) return Decimal.sumGeometricSeries(amount, luckRunes[type].upgBaseCost, luckRunes[type].upgScale, g.luckUpgrades[type][upg]);
	let owned = g.luckUpgrades[type][upg].toNumber();
	let out = 0;
	let base = luckRunes[type].upgBaseCost.toNumber();
	let scale = luckRunes[type].upgScale.toNumber();
	for (let i = 0; i < amount.toNumber(); i++) out += Math.floor(base * scale ** (i + owned));
	return N(out);
}

function buyLuckUpgrade(type, upg) {
	if (luckUpgradeUnlocked(type, upg)) {
		let amount = affordableLuckUpgrades(type, upg);
		g.spentLuckRunes[type] = g.spentLuckRunes[type].add(luckUpgradeCost(type, upg, amount));
		g.luckUpgrades[type][upg] = g.luckUpgrades[type][upg].add(amount);
		addAchievements("buyLuckUpgrade");
	}
}

function respecLuckUpgrades() {
	for (let type of luckRuneTypes) {
		g.spentLuckRunes[type] = c.d0;
		for (let upg of luckUpgradeList[type]) g.luckUpgrades[type][upg] = c.d0;
	}
	wormholeReset();
}

function respecLuckUpgradeRow(type) {
	g.spentLuckRunes[type] = c.d0;
	for (let upg of luckUpgradeList[type]) g.luckUpgrades[type][upg] = c.d0;
	wormholeReset();
}

function luckUpgradeUnlocked(type, upg) {
	let func = luckUpgrades[type][upg].unlocked;
	return (func === undefined) ? true : func();
}

function luckShardEffect1(x = g.luckShards) { return x.add(c.d1).log10().add(c.d10).log10().pow(c.d2_3).sub(c.d1).mul(c.e2).mul(prismaticUpgrades.prismRune.eff.y()); }
function luckShardEffect2(x = g.luckShards) {
	x = x.pow(studies[11].reward(2)).max(x);
	return (x.gt(c.ee10) ? N(5 / 9).pow(x.quad_slog(10)).mul(6561 / 1250) : c.d1.sub(x.add(c.d10).log10().log10().div(c.e2)));
}

function luckShardEffect1Formula() { return prismaticUpgrades.prismRune.eff.y().mul(c.e2).noLeadFormat(4) + " × (log<sup>[2]</sup>((LS + 1) × " + c.e10.format() + ")<sup>2.3</sup> - 1)"; }
function luckShardEffect2Formula(x = g.luckShards) {
	let ls = "LS" + formulaFormat.exp(studies[11].reward(2));
	if (x.gte(c.ee10)) {
		let height = x.quad_slog(10).floor().format();
		let out = "0.5556<sup>log<sup>[" + height + "]</sup>(" + ls + ") + " + height + "</sup> × 5.2488";
		return luckShardEffect2().gt(c.d0_1) ? ("100 × (1 - " + out + ")") : out;
	}
	return "log<sup>[2]</sup>(" + ls + " + 10)";
}

// ===== 棱镜 =====
function affordablePrismaticUpgrades(upg) {
	let data = prismaticUpgrades[upg];
	let owned = g.prismaticUpgrades[upg];
	let available = g.prismaticSpendFactor.eq(c.d0) ? g.prismatic : g.prismatic.mul(g.prismaticSpendFactor);
	if (data.max === undefined) { // 无限制
		if (g.prismaticSpendFactor.eq(c.d0)) return available.gt(data.scale.pow(owned).mul(data.baseCost)) ? c.d1 : c.d0;
		return Decimal.affordGeometricSeries(available, data.baseCost, data.scale, owned);
	} else { // 有限制
		if (g.prismaticSpendFactor.eq(c.d0)) return (available.gt(data.cost()) && Decimal.lt(owned, data.max)) ? c.d1 : c.d0;
		if (singlePrismaticUpgradeCost(upg).gt(g.prismatic)) return c.d0; // 避免卡顿的二分搜索
		let lower = c.d0;
		let upper = data.max;
		let middle;
		do {
			middle = lower.add(upper).div(c.d2).ceil();
			if (available.gt(data.cost(middle))) lower = middle;
			else upper = middle;
		} while (upper.sub(lower).gt(c.d1));
		middle = upper;
		function canAfford(levels) {
			let spent = c.d0;
			for (let i = levels.toNumber() - 1; i >= owned.toNumber(); i--) {
				let diff = data.cost(N(i));
				if (spent.div(diff).gt(c.e16)) { break; }
				spent = spent.add(diff);
			}
			return available.gte(spent);
		}
		while (middle.gt(owned) && (!canAfford(middle))) { middle = middle.sub(c.d1); }
		return Decimal.min(middle, data.max).sub(owned);
	}
}

function prismaticUpgradeCost(upg, amount) {
	let data = prismaticUpgrades[upg];
	let owned = g.prismaticUpgrades[upg];
	if (data.max === undefined) { // 无限制
		return Decimal.sumGeometricSeries(amount, data.baseCost, data.scale, owned);
	} else { // 有限制
		let out = c.d0;
		for (let i = amount.toNumber() - 1; i >= 0; i--) {
			let diff = data.cost(owned.add(i));
			if (out.div(diff).gt(c.e16)) return out;
			out = out.add(diff);
		}
		return out;
	}
}

function singlePrismaticUpgradeCost(upg) {
	let data = prismaticUpgrades[upg];
	return (data.max === undefined) ? data.scale.pow(g.prismaticUpgrades[upg]).mul(data.baseCost) : data.cost();
}

function buyPrismaticUpgrade(upg) {
	if ((prismaticUpgrades[upg].unlockReq ?? (() => true))()) {
		let affordable = affordablePrismaticUpgrades(upg);
		let cost = prismaticUpgradeCost(upg, affordable);
		g.prismatic = g.prismatic.sub(cost).fix(c.d0);
		g.prismaticUpgrades[upg] = g.prismaticUpgrades[upg].add(affordable.fix(c.d0)).fix(c.d0);
		addAchievements("prismaticUpgradeBuy");
	}
}

function buyMaxPrismaticUpgrades() { for (let i of nonRefundablePrismaticUpgrades) buyPrismaticUpgrade(i); }

function refundPrismaticUpgrade(upg) {
	if (g.prismaticUpgrades[upg].eq(c.d0)) { notify("没有可退还的内容！", achievement.tierColors[8].dark, achievement.tierColors[8].light); }
	else {
		g.prismaticUpgrades[upg] = g.prismaticUpgrades[upg].sub(c.d1).fix(c.d0);
		o.add("prismatic", prismaticUpgradeCost(upg, c.d1));
	}
}

function refundAllPrismaticUpgrades(upg) {
	let amt = g.prismaticUpgrades[upg];
	if (amt.eq(c.d0)) { notify("没有可退还的内容！", achievement.tierColors[8].dark, achievement.tierColors[8].light); }
	else {
		g.prismaticUpgrades[upg] = c.d0;
		o.add("prismatic", prismaticUpgradeCost(upg, amt));
	}
}

function prismaticUpgradeEffectHTML(upg) {
	let out = prismaticUpgrades[upg].desc;
	for (let i of prismaticUpgrades[upg].variables) out = out.replace("{" + i + "}", "<span id=\"span_prismaticUpgrade_" + upg + "_" + i + "\"></span>");
	return out;
}

function prismaticUpgradeUnlocked(upg) {
	let func = prismaticUpgrades[upg].unlockReq;
	return (func === undefined) ? true : func();
}

// ===== 反物质 =====
const antimatterVariables = ["antimatter", "antimatterThisSpacetimeReset", "totalantimatter"];

function incrementAntimatter(x) {
	x = x.fix(c.d0);
	for (let i of antimatterVariables) o.add(i, x);
}

function antiAxisActive(type) {
	if (g.studyCompletions[9] === 0) return false;
	if ((type === "V") && (!g.research.r24_11)) return false;
	if ((type === "U") && (!g.research.r24_13)) return false;
	if ((type === "T") && (!g.research.r25_13)) return false;
	if ((type === "S") && (!g.research.r26_13)) return false;
	return 4 + g.stardustUpgrades[0] > axisCodes.indexOf(type);
}

function antiAxisUnlocked(type) { return antiAxisActive(type) || "RQPO".slice(0, study13.rewardLevels.slabdrill).includes(type); }

function realAntiAxisCostDivisor(type) {
	let output = stat.antiAxisCostDivisor;
	return output;
}

function realAntiAxisCostExponent(type) {
	let output = stat.antiAxisCostExponent;
	return output;
}

function realAntiAxisScalePower(type) {
	let out = stat.antiAxisScalingPower;
	if (type === "Z") { out = out.mul(c.d2); }
	else if (type === "W") { out = out.mul(c.d1_5); }
	else if (type === "U") { out = out.mul(c.d3); }
	else if (type === "S") { out = out.mul(c.d1_5); }
	else if (type === "Q") { out = out.mul(c.d1_5); }
	else if (type === "O") { out = out.mul(c.d4); }
	return out;
}

function realAntiAxisSuperscalePower(type) {
	let out = stat.antiAxisSuperscalingPower;
	if (type === "Y") { out = out.mul(c.d3); }
	else if (type === "Z") { out = out.mul(c.d1_5); }
	else if (type === "W") { out = out.mul(c.d1_25); }
	else if (type === "U") { out = out.mul(c.d2); }
	else if (type === "S") { out = out.mul(c.d5); }
	else if (type === "Q") { out = out.mul(c.d4); }
	else if (type === "O") { out = out.mul(c.d9); }
	return out;
}

function antiAxisCost(type, axis) {
	axis = (axis === undefined) ? g["anti" + type + "Axis"] : N(axis);
	let cost;
	axis = Decimal.semiexpScaling(axis, stat.antiAxisSuperscalingStart, realAntiAxisSuperscalePower(type));
	axis = Decimal.linearScaling(axis, stat.antiAxisScalingStart, realAntiAxisScalePower(type));
	if (type === "X") cost = axis.add(c.d9).pow10();
	else if (type === "Y") cost = axis.mul(c.d2).add(c.d12).pow10();
	else if (type === "Z") cost = axis.div(c.d3).add(c.d3).pow(c.d3).pow10();
	else if (type === "W") cost = axis.add(c.d2).pow(c.d2).mul(c.d7_5).pow10();
	else if (type === "V") cost = axis.mul(c.d3).add(c.d25).pow10();
	else if (type === "U") cost = axis.div(c.d7_5).add(c.d2).pow(c.d7_5).pow10();
	else if (type === "T") cost = axis.mul(c.d250).add(c.e3).pow10();
	else if (type === "S") cost = c.inf.pow(c.d1_3.pow(axis).mul(c.d100div9));
	else if (type === "R") cost = axis.add(c.d25).pow(c.d3).pow10();
	else if (type === "Q") cost = axis.div(c.d10).pow10().mul(6e4).pow10();
	else if (type === "P") cost = c.d1_2.pow(axis).mul(2e6 / 9).pow10();
	else if (type === "O") cost = axis.add(23).div(c.d30).layerplus(3);
	else functionError("axisCost", type);
	cost = corruption.value("antiAxis", cost);
	cost = cost.pow(realAntiAxisCostExponent(type));
	cost = cost.div(realAntiAxisCostDivisor(type));
	return cost;
}

function maxAffordableAntiAxis(type, am = g.antimatter) {
	if (antiAxisCost(type).gte(am) && am.eq(g.antimatter)) return g["anti" + type + "Axis"];
	let effective_AM = corruption.invertValue("antiAxis", am.mul(realAntiAxisCostDivisor(type)).root(realAntiAxisCostExponent(type)));
	let axis;
	if (type === "X") { axis = effective_AM.lte(c.e9) ? c.dm1 : effective_AM.log10().sub(c.d9); }
	else if (type === "Y") { axis = effective_AM.lte(c.e12) ? c.dm1 : effective_AM.log10().sub(c.d12).div(c.d2); }
	else if (type === "Z") { axis = effective_AM.lte(1e27) ? c.dm1 : effective_AM.log10().pow(c.d1div3).sub(c.d3).mul(c.d3); }
	else if (type === "W") { axis = effective_AM.lte(c.e30) ? c.dm1 : effective_AM.log10().div(c.d7_5).pow(c.d0_5).sub(c.d2); }
	else if (type === "V") { axis = effective_AM.lte(c.e25) ? c.dm1 : effective_AM.log10().sub(c.d25).div(c.d3); }
	else if (type === "U") { axis = effective_AM.lte(1e256) ? c.dm1 : effective_AM.log10().root(c.d7_5).sub(c.d2).mul(c.d7_5); }
	else if (type === "T") { axis = effective_AM.lte(c.ee3) ? c.dm1 : effective_AM.log10().sub(c.e3).div(c.d250); }
	else if (type === "S") { axis = effective_AM.lte(c.inf.pow(c.d12)) ? c.dm1 : effective_AM.log(c.d2).div(c.d102400div9).log(c.d1_3); }
	else if (type === "R") { axis = effective_AM.lte("e15625") ? c.dm1 : effective_AM.log10().root(c.d3).sub(c.d25); }
	else if (type === "Q") { axis = effective_AM.lte("e6e4") ? c.dm1 : effective_AM.log10().div(6e4).log10().mul(c.d10); }
	else if (type === "P") { axis = effective_AM.lte("e2.5e5") ? c.dm1 : effective_AM.log10().div(2e6 / 9).log(c.d1_2); }
	else if (type === "O") { axis = effective_AM.lte(N(23 / 30).layerplus(3)) ? c.dm1 : effective_AM.layerplus(-3).mul(c.d30).sub(23); }
	else functionError("maxAffordableAxis", arguments);
	axis = Decimal.linearSoftcap(axis, stat.antiAxisScalingStart, realAntiAxisScalePower(type));
	axis = Decimal.semilogSoftcap(axis, stat.antiAxisSuperscalingStart, realAntiAxisSuperscalePower(type));
	return axis.floor().add(c.d1);
}
function buyAntiAxis(x, manual = false) {
	if (Decimal.eq(maxAxisForAchievement(x), g["anti" + x + "Axis"])) { if (manual) { achievement.lockPopup(); } return; }
	if (g.antimatter.gte(antiAxisCost(x)) && antiAxisUnlocked(x)) {
		o.sub("antimatter", antiAxisCost(x));
		o.add("anti" + x + "Axis", c.d1);
	}
	if (g.antiSAxis.gt(c.d0)) g.ach525possible = false;
	addAchievements("axisBuy");
}

function buyMaxAntiAxis(caps, manual = false) {
	let total = axisCodes.map(x => g["anti" + x + "Axis"]).sumDecimals();
	for (let j = 0; j < 8 + study13.rewardLevels.slabdrill; j++) {
		let type = axisCodes[j];
		if (!antiAxisUnlocked(type)) continue;
		let amount = caps[j] === "u" ? maxAffordableAntiAxis(axisCodes[j]) : Decimal.min(maxAffordableAntiAxis(axisCodes[j]), N(caps[j]).fix(c.d0, false));
		if (amount === "NA") continue;
		if (amount.lte(g["anti" + axisCodes[j] + "Axis"])) continue;
		amount = amount.min(maxAxisForAchievement("anti" + axisCodes[j]));
		if (antiAxisCost(axisCodes[j], amount.sub(c.d1)).lt(g.antimatter)) o.sub("antimatter", antiAxisCost(axisCodes[j], amount.sub(c.d1)));
		g["anti" + axisCodes[j] + "Axis"] = amount;
	}
	if (g.antiSAxis.gt(c.d0)) g.ach525possible = false;
	addAchievements("axisBuy");
	if (manual && (achievement.maxForLocks.axis[g.achOnProgressBar] !== undefined) && achievement.locking(g.achOnProgressBar) && axisCodes.map(x => g["anti" + x + "Axis"]).sumDecimals().eq(total)) { achievement.lockPopup(); }
}

function antiAxisDimBoostPower(type) {
	let out = c.d1;
	if ((type === "S") && g.research.r26_14) { out = out.mul(researchEffect(26, 14)); }
	let res = researchList.antimatter[type + "1"];
	if (g.research[res]) { out = out.mul(researchEffect(researchRow(res), researchCol(res))); }
	if (study13.bound(244)) { out = out.div(study13.bindingEff(244)); }
	return out;
}

function antiAxisDimBoost(type, next = false) {
	let x = g["anti" + type + "Axis"];
	if (next) { x = x.add(c.d1); }
	return x.mul(antiAxisDimBoostPower(type)).div(c.e3).add(c.d1).ln().add(c.d1).pow(c.d0_9);
}

function antiAxisDimBoostFormula(type) {
	let out = "(ln(" + type + formulaFormat.mult(antiAxisDimBoostPower(type).div(c.e3)) + " + 1) + 1)<sup>0.9</sup>";
	let boost = antiAxisDimBoost(type);
	if (boost.lt(c.d10)) { out = "(" + out + " - 1) × 100"; }
	return "<i>" + out + "</i>" + (boost.lt(c.d10) ? "%" : "×");
}

const antimatterGalaxy = {
	costs: {
		base: function () { return N("1e5000"); },
		scale: function () { return c.d1_2; }
	},
	req: function (x = g.antimatterGalaxies) { return [this.costs.base(), this.costs.scale(), x].decimalPowerTower(); },
	affordable: function (x = g.antimatter) { return x.lt(this.costs.base()) ? c.d0 : x.log(this.costs.base()).log(this.costs.scale()).floor().add(c.d1); },
	reqFormula: function () { return formulaFormat("10<sup>" + this.costs.base().log10().noLeadFormat(3) + " × " + this.costs.scale().noLeadFormat(4) + "<sup>G</sup></sup>"); },
	effect1: function (x = stat.realAntimatterGalaxies) { return x; },
	effect1Formula: function () { return formulaFormat("G"); },
	effect2: function (x = stat.realAntimatterGalaxies) { return x.div(c.e3).add(c.d1).pow(c.d10); },
	effect2Formula: function () { return formulaFormat("(1 + G ÷ 1,000)<sup>10</sup>"); },
	effect3: function (x = stat.realAntimatterGalaxies) { return x.div(c.d500); },
	effect3Formula: function () { return formulaFormat("G × 0.2"); },
	effectHTML: function () {
		let v1 = stat.realAntimatterGalaxies;
		let v2 = calcStatWithDifferentBase("realAntimatterGalaxies", stat.maxAffordableAntimatterGalaxies.max(g.antimatterGalaxies.add(c.d1)));
		return [
			"获得 " + (showFormulas ? this.effect1Formula() : arrowJoin(this.effect1(v1).noLeadFormat(3), this.effect1(v2).noLeadFormat(3))) + " 个免费暗星",
			"反物质获取提升至 " + (showFormulas ? this.effect2Formula() : arrowJoin(this.effect2(v1).noLeadFormat(4), this.effect2(v2).noLeadFormat(4))) + " 次幂",
			"每普通星系使游戏运行速度提升 " + (showFormulas ? this.effect3Formula() : arrowJoin(this.effect3(v1).mul(c.e2).noLeadFormat(3), this.effect3(v2).mul(c.e2).noLeadFormat(3))) + "%"
		].join("<br>");
	},
	gain: function (cap) {
		cap = (cap === "u") ? c.maxvalue : N(cap);
		if (!(cap instanceof Decimal)) { functionError("antimatterGalaxy.gain", arguments); }
		let gain = stat.maxAffordableAntimatterGalaxies.min(cap);
		if (!g.antimatterGalaxyBulk) gain = gain.min(g.antimatterGalaxies.add(c.d1));
		if (gain.gt(g.antimatterGalaxies)) { g.antimatterGalaxies = gain; }
	}
};

// ===== 虫洞升级 =====
function buyWormholeUpg(x) {
	if ((g.wormholeUpgrades[x] < wormholeUpgrades[x].max) && g.hawkingradiation.gte(wormholeUpgrades[x].cost)) {
		o.sub("hawkingradiation", wormholeUpgrades[x].cost);
		g.wormholeUpgrades[x]++;
	}
}

function wormholeUpgName(x) { return "虫洞升级 " + x + " “" + wormholeUpgrades[x].name + "”"; }

function repeatableWormholeUpgradeCost(baseExp, maxExp, max, owned) {
	return [Decimal.decibel(owned), baseExp, Decimal.pow(maxExp.div(Decimal.decibel(max - 1).mul(baseExp)), N(Math.max(1.25 * owned / (max - 1) - 0.25, 0) ** 3))].productDecimals().pow10();
}

// ===== 额外 UI（顶部资源栏等）=====
function showFooter() { return (g.footerDisplay === "All tabs") ? true : (g.footerDisplay === "Only Axis tab") ? (g.activeTab === "main" && g.activeSubtabs.main === "axis") : (g.footerDisplay === "None") ? false : undefined; }

const topResources = [
	{
		text: function () { return "<span class=\"_exoticmatter\">" + g.exoticmatter.format() + "</span> 奇异物质" + ((g.exoticmatter.lt(c.ee9) || g.exoticmatter.gt_tolerance(stat.exoticmatterPerSec, 1e-4)) ? (" (<span class=\"_exoticmatter\">" + stat.exoticmatterPerSec.noLeadFormat(2) + "</span> / 秒)") : ""); },
		condition: function () { return g.topResourcesShown.exoticmatter; }
	},
	{
		text: function () { return "<span class=\"_mastery\">" + g.masteryPower.format() + "</span> 精通力" + ((g.masteryPower.lt(c.ee9) || g.masteryPower.gt_tolerance(stat.masteryPowerPerSec, 1e-4)) ? (" (<span class=\"_mastery\">" + stat.masteryPowerPerSec.format(2) + "</span> / 秒)") : ""); },
		condition: function () { return g.topResourcesShown.masteryPower && unlocked("Masteries"); }
	},
	{
		text: function () { return "<span class=\"_stardust\">" + g.stardust.format() + "</span> 星尘"; },
		condition: function () { return g.topResourcesShown.stardust && unlocked("Stardust"); }
	},
{
    text: function () { 
        try {
            if (g.stardustUpgrades[4] > 0 && g.darkmatter && typeof g.darkmatter.format === 'function') {
                let darkMatterText = "<span class=\"_darkmatter\">" + g.darkmatter.format() + "</span> 暗物质";
                
                if (stat && stat.darkmatterPerSec && typeof stat.darkmatterPerSec.format === 'function') {
                    if (g.darkmatter.lt(c.ee9) || (typeof g.darkmatter.gt_tolerance === 'function' && g.darkmatter.gt_tolerance(stat.darkmatterPerSec, 1e-4))) {
                        darkMatterText += " (<span class=\"_darkmatter\">" + stat.darkmatterPerSec.format(2) + "</span> / 秒)";
                    }
                }
                return darkMatterText;
            }
        } catch (e) {
            console.warn("暗物质显示错误:", e);
        }
        return "";
    },
    condition: function () { 
        try {
            return g.topResourcesShown.darkmatter && unlocked("Dark Matter");
        } catch (e) {
            return false;
        }
    }
},
	{
		text: function () { return "<span class=\"_wormhole\">" + g.hawkingradiation.format() + "</span> 霍金辐射"; },
		condition: function () { return g.topResourcesShown.hr && unlocked("Hawking Radiation"); }
	},
	{
		text: function () { return g.studyCompletions[9] > 0 ? ("<span class=\"_antimatter\">" + g.antimatter.format() + "</span> 反物质" + ((g.antimatter.lt(c.ee9) || g.antimatter.gt_tolerance(stat.antimatterPerSec, 1e-4)) ? (" (<span class=\"_antimatter\">" + stat.antimatterPerSec.format(2) + "</span> / 秒)") : "")) : ""; },
		condition: function () { return g.topResourcesShown.antimatter && unlocked("Antimatter"); }
	},
	{
		condition: function () { return g.dilatedTime > 0; },
		text: function () { return "<span class=\"_time\">" + timeFormat(g.dilatedTime) + "</span> 膨胀时间 " + ["", "<span class=\"_time2\">(" + N(stat.baseOverclockSpeedup).noLeadFormat(3) + "× 超频)</span>", "<span class=\"blue\">(冻结)</span>", "<span class=\"yellow\">(均衡)</span>"][timeState]; }
	},
	{
		text: function () { let t = stat.tickspeed, out = (t.eq(c.d0) || t.gt(c.d1)) ? [t, "×"] : [t.recip(), "÷"]; return "<span class=\"_time\">" + out[0].noLeadFormat(3) + "</span>" + out[1] + " 时间速度"; },
		condition: function () { return stat.tickspeed.neq(c.d1); }
	},
	{
		text: function () { return "<span class=\"_darkmatter\">" + stat.totalDarkAxis.format(0) + "</span> 总暗物质轴"; },
		condition: function () { return StudyE(1); }
	},
	{
		text: function () { return studies[4].name + ": ^<span class=\"red\">" + c.d0_5.pow(g.TotalStardustResets).noLeadFormat(3) + "</span>"; },
		condition: function () { return StudyE(4); }
	},
	{
		text: function () { return studies[6].name + ": ÷<span class=\"red\">" + studies[6].effect().noLeadFormat(3) + "</span>"; },
		condition: function () { return StudyE(6); }
	},
	{
		text: function () { return "<span class=\"_luck\">" + g.luckEssence.toLocaleString("en-US") + "</span> 运气精华 (+<span class=\"_luck\">" + studies[7].luckEssenceGain().toLocaleString("en-US") + "</span>)"; },
		condition: function () { return StudyE(7); }
	},
	{
		text: function () { return studies[7].name + ": ^<span class=\"red\">" + studies[7].luckEffect().noLeadFormat(3) + "</span>"; },
		condition: function () { return StudyE(7); }
	},
	{
		text: function () { return studies[8].name + " 限制: <span class=\"red\">" + studies[8].darkAxisMaxCost().format() + "</span>"; },
		condition: function () { return StudyE(8); }
	},
	{
		text: function () { return "<span class=\"_exp\">" + g.study9.xp.format() + "</span> 经验值 (^<span class=\"red\">" + studies[9].experientiaEffect().noLeadFormat(4) + "</span>)"; },
		condition: function () { return StudyE(9); }
	},
	{
		text: function () { return "<span class=\"_exp\">" + (9 - g.timeThisWormholeReset).toFixed(1) + "秒</span> 后重置 (<span class=\"_exp\">" + studies[9].formatChange() + " XP</span>)"; },
		condition: function () { return StudyE(9); }
	},
	{
		text: function () { return studies[11].name + ": <span class=\"red\">" + String(studies[11].lunarMinutes()).padStart(2, "0") + "</span> 已过 <span style=\"font-family:monospace\" class=\"red\">" + studies[11].active() + "</span>"; },
		condition: function () { return StudyE(11); }
	},
	{
		text: function () { return "束缚 236: <span style=\"color:var(--binding)\">" + timeFormat(study13.bindingEff(236) - g.timeThisWormholeReset) + "</span> 剩余"; },
		condition: function () { return study13.bound(236) && (!showFooter()); }
	}
];

function updateTopResourceModal() {
	for (let i = 0; i < topResources.length; i++) {
		if (topResources[i].condition()) {
			d.display("div_topResource" + i, "inline-block");
			d.innerHTML("div_topResource" + i, topResources[i].text());
		} else {
			d.display("div_topResource" + i, "none");
		}
	}
}

function showConfigModal(label, buttons, configKey) {
	popup({
		text: "<span style=\"text-decoration:underline\">以下是 " + label + " 的选项列表：</span><br>" + buttons.filter(x => x.visible ?? true).map(x => "<button class=\"genericbutton size2\" onClick=\"" + x.onClick + ";openConfig['" + configKey + "']()\">" + x.text + "</button>").join("") + "<br>",
		buttons: [["关闭", ""]]
	});
}

const openConfig = (() => {
	function toggle(variable) { return variable + "=!" + variable; }
	return {
		"Axis": function () { showConfigModal("轴", [ // Axis
			{ text: "奇异物质数量显示在 " + (g.topResourcesShown.exoticmatter ? "屏幕顶部" : "轴子标签页"), onClick: toggle("g.topResourcesShown.exoticmatter") },
			{ text: (g.glowOptions.buyAxis ? "显" : "不显") + "示可购买轴的发光效果", onClick: toggle("g.glowOptions.buyAxis") }
		], "Axis"); },
		"Mastery": function () { updateMasteryLayout(); showConfigModal("精通", [ // Mastery
			{ text: "精通力数量显示在 " + (g.topResourcesShown.masteryPower ? "屏幕顶部" : "精通子标签页"), onClick: toggle("g.topResourcesShown.masteryPower") },
			{ text: "精通标签布局: " + g.masteryContainerStyle, onClick: "g.masteryContainerStyle=(g.masteryContainerStyle==='Modern'?'Legacy':'Modern')" },
			{ text: (g.masteryIdsShown ? "显" : "隐") + "示精通 ID", onClick: "toggle('masteryIdsShown')" },
			{ text: (g.masteryBoostsShown ? "显" : "隐") + "示精通加成百分比", onClick: "toggle('masteryBoostsShown')" },
			{ text: (g.masteryActivityShown ? "显" : "隐") + "示精通激活状态", onClick: "toggle('masteryActivityShown')" },
			{ text: "精通行顺序 " + (g.masteryRowsReversed ? "" : "未") + "反转", onClick: "toggle('masteryRowsReversed');d.innerHTML('masteryContainerLegacy',masteryTableLegacy());d.innerHTML('masteryContainerModern',masteryTableModern())" }
		], "Mastery"); },
		"Offline Time": function () { showConfigModal("离线时间", [ // Offline Time
			{ text: (g.glowOptions.overclock ? "显" : "不显") + "示超频期间的发光效果", onClick: toggle("g.glowOptions.overclock") }
		], "Offline Time"); },
		"Achievement": function () { updateAchievementsTab(); showConfigModal("成就", [ // Achievement
			{ text: "成就 ID " + (g.achievementIDShown ? "" : "不") + "显示", onClick: "toggle('achievementIDShown');for (let i of achievement.all){d.display('span_ach'+i+'ID',g.achievementIDShown?'inline-block':'none')}" },
			{ text: (g.completedAchievementTiersShown ? "显" : "隐") + "示已完成的成就层级", onClick: "toggle('completedAchievementTiersShown')" },
			{ text: "成就层级顺序 " + (g.achievementTiersReversed ? "" : "未") + "反转", onClick: "toggle('achievementTiersReversed');d.innerHTML('achievementContainer',achievementContainer());", visible: unlocked("Stardust") }
		], "Achievement"); },
		"Stardust Boost": function () { showConfigModal("星尘加成", [ // Stardust Boost
			{ text: "星尘数量显示在 " + (g.topResourcesShown.stardust ? "屏幕顶部" : "星尘标签页"), onClick: toggle("g.topResourcesShown.stardust") },
			{ text: "星尘重置确认 " + (g.confirmations.stardustReset ? "启" : "禁") + "用", onClick: toggle("g.confirmations.stardustReset") },
			{ text: "钢铁意志下星尘重置确认 " + (g.confirmations.ironWillStardustReset ? "启" : "禁") + "用", onClick: toggle("g.confirmations.ironWillStardustReset"), visible: g.achievement[502] },
			{ text: (g.glowOptions.buyStardustUpgrade ? "显" : "不显") + "示可购买星尘升级的发光效果", onClick: toggle("g.glowOptions.buyStardustUpgrade") },
			{ text: (g.showingCappedStardustUpgrades ? "显" : "隐") + "示已达上限的星尘升级", onClick: "toggle('showingCappedStardustUpgrades')" }
		], "Stardust Boost"); },
		"Star": function () { updateStarLayout(); showConfigModal("星星", [ // Star
			{ text: "星星标签布局: " + g.starContainerStyle, onClick: "g.starContainerStyle=(g.starContainerStyle==='Modern'?'Legacy':'Modern')" },
			{ text: (g.glowOptions.buyStar ? "显" : "不显") + "示可购买星星的发光效果", onClick: toggle("g.glowOptions.buyStar") },
			{ text: (g.glowOptions.assignStar ? "显" : "不显") + "示可分配星星的发光效果", onClick: toggle("g.glowOptions.assignStar") }
		], "Star"); },
		"Dark Matter": function () { showConfigModal("暗物质", [ // Dark Matter
			{ text: "暗物质数量显示在 " + (g.topResourcesShown.darkmatter ? "屏幕顶部" : "暗物质子标签页"), onClick: toggle("g.topResourcesShown.darkmatter") },
			{ text: (g.glowOptions.buyDarkAxis ? "显" : "不显") + "示可购买暗轴的发光效果", onClick: toggle("g.glowOptions.buyDarkAxis") },
			{ text: (g.glowOptions.buyDarkStar ? "显" : "不显") + "示可获得暗星的发光效果", onClick: toggle("g.glowOptions.buyDarkStar") },
			{ text: "暗星批量购买 " + (g.darkstarBulk ? "启" : "禁") + "用", onClick: "toggle('darkstarBulk')" },
			{ text: (g.glowOptions.study12 ? "显" : "不显") + "示可获得钛强化效果的发光效果", onClick: toggle("g.glowOptions.study12"), visible: visibleStudies().includes(12) || unlocked("Matrix") }
		], "Dark Matter"); },
		"Research": function () { showConfigModal("研究", [ // Research
			{ text: "霍金辐射数量显示在 " + (g.topResourcesShown.hr ? "屏幕顶部" : "虫洞标签页"), onClick: toggle("g.topResourcesShown.hr") },
			{ text: "虫洞重置确认 " + (g.confirmations.wormholeReset ? "启" : "禁") + "用", onClick: toggle("g.confirmations.wormholeReset") },
			{ text: "单独按钮购买研究 " + (g.confirmations.researchDoubleClick ? "启" : "禁") + "用", onClick: toggle("g.confirmations.researchDoubleClick") },
			{ text: (g.glowOptions.observe ? "显" : "不显") + "示可观测的发光效果", onClick: toggle("g.glowOptions.observe") },
			{ text: (g.glowOptions.buyPermanentResearch ? "显" : "不显") + "示可购买永久研究的发光效果", onClick: toggle("g.glowOptions.buyPermanentResearch"), visible: (g.studyCompletions[1] + g.studyCompletions[2]) > 5 }
		], "Research"); },
		"Study": function () { showConfigModal("研究（Studies）", [ // Study
			{ text: "研究容器样式: " + g.studyContainerStyle, onClick: "g.studyContainerStyle=(g.studyContainerStyle==='Compact')?'Detailed':'Compact'" },
			{ text: (g.completedStudiesShown ? "显" : "隐") + "示已达最大完成次数的研究", onClick: "toggle('completedStudiesShown')", visible: g.studyContainerStyle === "Detailed" },
			{ text: "研究完成后自动重置研究 " + (g.restoreResearchAfterStudy ? "禁" : "启") + "用", onClick: "toggle('restoreResearchAfterStudy')" }
		], "Study"); },
		"Light": function () { showConfigModal("光", [ // Light
			{ text: (g.glowOptions.noChromaGeneration ? "显" : "不显") + "示无色素生成的发光效果", onClick: toggle("g.glowOptions.noChromaGeneration") },
			{ text: "若缺少成分色素，" + (g.haltChromaIfLacking ? "停止生成" : "切换至生成限制成分"), onClick: "toggle('haltChromaIfLacking')", visible: lightTiersUnlocked() > 1 },
			{ text: "流明效果从 " + (g.showLightEffectsFrom0 ? "零" : "上一个流明") + "显示", onClick: "toggle('showLightEffectsFrom0')" },
			{ text: achievement.label(815) + " 奖励 " + (g.ach815RewardActive ? "" : "未") + "激活", onClick: "toggle('g.ach815RewardActive')", visible: g.achievement[815] }
		], "Light"); },
		"Galaxy": function () { showConfigModal("星系", [ // Galaxy
			{ text: (g.glowOptions.createGalaxy ? "显" : "不显") + "示可创建星系的发光效果", onClick: toggle("g.glowOptions.createGalaxy") }
		], "Galaxy"); },
		"Luck": function () { showConfigModal("运气", [ // Luck
			{ text: (g.glowOptions.buyLuckRune ? "显" : "不显") + "示可购买足够运气符文的发光效果", onClick: toggle("g.glowOptions.buyLuckRune") },
			{ text: (g.glowOptions.buyLuckUpgrade ? "显" : "不显") + "示可购买运气升级的发光效果", onClick: toggle("g.glowOptions.buyLuckUpgrade") }
		], "Luck"); },
		"Prismatic": function () { showConfigModal("棱镜", [ // Prismatic
			{ text: (g.glowOptions.buyPrismaticUpgrade ? "显" : "不显") + "示可购买不可退还棱镜升级的发光效果", onClick: toggle("g.glowOptions.buyPrismaticUpgrade") },
			{ text: (g.glowOptions.buyRefundablePrismaticUpgrade ? "显" : "不显") + "示可购买可退还棱镜升级的发光效果", onClick: toggle("g.glowOptions.buyRefundablePrismaticUpgrade") }
		], "Prismatic"); },
		"Antimatter": function () { showConfigModal("反物质", [ // Antimatter
			{ text: "反物质数量显示在 " + (g.topResourcesShown.antimatter ? "屏幕顶部" : "反物质子标签页"), onClick: toggle("g.topResourcesShown.antimatter") },
			{ text: (g.glowOptions.buyAntiAxis ? "显" : "不显") + "示可购买反轴的发光效果", onClick: toggle("g.glowOptions.buyAntiAxis") }
		], "Antimatter"); },
		"Wormhole Upgrades": function () { showConfigModal("虫洞升级", [ // Wormhole Upgrades
			{ text: (g.glowOptions.buyAntiAxis ? "显" : "不显") + "示可购买虫洞升级的发光效果", onClick: toggle("g.glowOptions.buyWormholeUpgrade") }
		], "Wormhole Upgrades"); },
		"Study XIII": function () { showConfigModal("研究 XIII", [ // Study XIII
			{ text: "在束缚查看器中 " + (g.study13ShowParentBindings ? "显示" : "隐藏") + "父束缚", onClick: toggle("g.study13ShowParentBindings") }
		], "Study XIII"); }
	};
})();

function endgameColor() {
	return "hsl(" + ((Date.now() / 1e4) % 360) + "," + (90 + Math.sin(Date.now() / 1e6) * 10) + "%," + (40 + Math.cos(Date.now() / 1e8) * 10) + "%)"; // 随时间缓慢变化的随机颜色
}

const progressMilestones = [
	{
		type: 1,
		get label() { return achievement.label(g.achOnProgressBar) + (g.achievement[g.achOnProgressBar] ? (" 里程碑 " + (achievement(g.achOnProgressBar).milestones() + 1)) : ""); },
		percent: function () { let p = achievement(g.achOnProgressBar).progress(); return Array.isArray(p) ? (p[0] / 100) : ((typeof p) === "object") ? ((((typeof p.percent) === "number") ? p.percent : p.percent[0]) / 100) : undefined; },
		req: function () { let p = achievement(g.achOnProgressBar).progress(); return ((typeof p) === "string") ? p : Array.isArray(p) ? (p[1].noLeadFormat(3) + " / " + p[2].noLeadFormat(3)) : ((typeof p) === "object") ? ((Array.isArray(p) ? (p.percent[1].noLeadFormat(2) + " / " + p.percent[2].noLeadFormat(2) + "; ") : "") + p.text) : ""; },
		get color() { return g.achievement[g.achOnProgressBar] ? "#00cccc" : "var(--achievements)"; },
		condition: function () { return g.achOnProgressBar === "N"; }
	},
	{
		type: 1,
		label: "精通",
		percent: function () { return Decimal.div(g.exoticmatter, axisCost("X", 0)); },
		req: function () { return "需要 1 个 X 轴"; },
		color: "var(--mastery)",
		condition: function () { return unlocked("Masteries"); }
	},
	{
		type: 1,
		label: "下一行精通",
		percent: function () { return Decimal.div(g.exoticmatter, axisCost("Z", 0)); },
		req: function () { return "需要 1 个 Z 轴"; },
		color: "var(--mastery)",
		condition: function () { return stat.masteryRow2Unlocked; }
	},
	{
		type: 1,
		label: "下一行精通",
		percent: function () { return stat.totalNormalAxis.div(c.d40); },
		req: function () { return "需要 40 个总轴"; },
		color: "var(--mastery)",
		condition: function () { return stat.masteryRow3Unlocked; }
	},
	{
		type: 1,
		label: "下一行精通",
		percent: function () { return stat.totalNormalAxis.div(c.d50); },
		req: function () { return "需要 50 个总轴"; },
		color: "var(--mastery)",
		condition: function () { return stat.masteryRow4Unlocked; }
	},
	{
		type: 1,
		label: "星尘和另一个第 4 行精通",
		percent: function () { return g.exoticmatter.div(stat.stardustExoticMatterReq); },
		req: function () { return "需要产生 " + stat.stardustExoticMatterReq + " 总奇异物质"; },
		color: "linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0) 50%,var(--mastery) 50%,var(--mastery)),linear-gradient(90deg,#ff0,#f60)",
		condition: function () { return masteryData[42].req(); }
	},
	{
		type: 2,
		condition: function () { return g.stardustUpgrades[4] > 0 || unlocked("Hawking Radiation"); }
	},
	{
		type: 1,
		label: "虫洞",
		percent: function () { return stat.totalDarkAxis.div(stat.wormholeDarkAxisReq); },
		req: function () { return "需要 " + stat.wormholeDarkAxisReq.format(0) + " 暗物质轴"; },
		color: "linear-gradient(90deg,#0000ff,#9900ff)",
		condition: function () { return unlocked("Hawking Radiation"); }
	},
	{
		type: 1,
		label: "研究完成",
		percent: function () { return stat.totalDarkAxis.div(stat.wormholeDarkAxisReq); },
		req: function () { return "需要 " + stat.wormholeDarkAxisReq.format(0) + " 暗物质轴" + (study13.bound(236) ? ("; " + timeFormat(study13.bindingEff(236) - g.timeThisWormholeReset) + " 剩余") : ""); },
		get color() { return (study13.bound(236) ? ("linear-gradient(90deg,rgba(143,112,51,0.5),rgba(143,112,51,0.5) " + (100 * g.timeThisWormholeReset / study13.bindingEff(236)) + "%,rgba(0,0,0,0) " + (100 * g.timeThisWormholeReset / study13.bindingEff(236)) + "%,rgba(0,0,0,0)),") : "") + "#000066"; },
		condition: function () { return g.activeStudy === 0; }
	},
	{
		type: 1,
		label: "解锁第一个膨胀升级",
		percent: function () { return stat.tickspeed.log(dilationUpgrades[1].tickspeedNeeded); },
		req: function () { return "需要 " + dilationUpgrades[1].tickspeedNeeded.format() + "× 时间速度"; },
		color: "var(--time)",
		condition: function () { return g.dilationUpgradesUnlocked > 0; }
	},
	{
		type: 1,
		label: "解锁第二个膨胀升级",
		percent: function () { return stat.tickspeed.log(dilationUpgrades[2].tickspeedNeeded); },
		req: function () { return "需要 " + dilationUpgrades[2].tickspeedNeeded.format() + "× 时间速度"; },
		color: "var(--time)",
		condition: function () { return g.dilationUpgradesUnlocked > 1; }
	},
	{
		type: 2,
		condition: function () { return achievement.ownedInTier(8) !== 0; }
	},
	{
		type: 1,
		label: "运气碎片",
		percent: function () { return 0; },
		req: function () { return "需要完成研究 VII"; },
		color: "var(--luck)",
		condition: function () { return g.studyCompletions[7] > 0; }
	},
	{
		type: 1,
		label: "反物质",
		percent: function () { return 0; },
		req: function () { return "需要完成研究 IX"; },
		color: "var(--antimatter)",
		condition: function () { return g.studyCompletions[9] > 0; }
	},
	{
		type: 2,
		condition: function () { return g.achievement[810]; }
	},
	{
		type: 1,
		label: "解锁第三个膨胀升级",
		percent: function () { return stat.tickspeed.log(dilationUpgrades[3].tickspeedNeeded); },
		req: function () { return "需要 " + dilationUpgrades[3].tickspeedNeeded.format() + "× 时间速度"; },
		color: "var(--time)",
		condition: function () { return g.dilationUpgradesUnlocked > 2; }
	},
	{
		type: 2,
		condition: function () { return g.achievement[905]; }
	},
	{
		type: 1,
		label: "当前终局",
		percent: function () { return g.studyCompletions[13] / 200; },
		req: function () { return "需要 200 次研究 XIII 完成"; },
		color: "endgame",
		condition: function () { return g.studyCompletions[13] > 199; }
	},
	{
		type: 3,
		condition: function () { return false; }
	}
];

function ProgressBar() {
	let data, label, filled, color;
	for (let next of progressMilestones) {
		if (!next.condition()) {
			data = next;
			break;
		}
	}
	if (data.type === 1) {
		let progressText = data.req();
		if (data.percent() !== undefined) { progressText = N(data.percent()).max(c.d0).min(c.d1).mul(c.e2).toNumber().toFixed(2) + "%" + ((progressText !== undefined) ? (" (" + progressText + ")") : ""); }
		label = "迈向 " + data.label + " 的进度: " + progressText;
		filled = (data.percent === undefined) ? 0 : N(data.percent()).max(c.d0).min(c.d1).mul(c.e2).toNumber();
		color = data.color === "endgame" ? endgameColor() : data.color;
	} else if (data.type === 2) {
		label = "未检测到新的方面。<span style=\"font-weight:700\">也许你需要别的东西。</span>";
		filled = 0;
		color = "#666666"; // 与未填充部分相同
	} else if (data.type === 3) {
		label = "你处于当前终局。点击以获取关于下次更新内容和时间的线索";
		filled = 100;
		color = endgameColor();
	}
	d.innerHTML("gameprogress", label);
	d.element("gameprogress").style.background = "linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0) " + filled + "%,rgba(102,102,102,0.9) " + filled + "%,rgba(102,102,102,0.9))," + color;
	d.element("gameprogress").style.color = blackOrWhiteContrast(getComputedStyle(d.element("gameprogress"))["background-color"]);
}

function progressBarOnClick() {
	let data;
	for (let next of progressMilestones) {
		if (!next.condition()) {
			data = next;
			break;
		}
	}
	if (data.type === 3) notify(version.nextUpdateHint + " " + version.percentage(), endgameColor(), "#ffffff");
}

function save() {
	// 直接保存为JSON字符串，不加密
	localStorage.setItem("save", JSON.stringify(g));
}

function getSavedGame(saved, game, base = basesave) {
	for (let prop in saved) {
		if (!saved.hasOwnProperty(prop)) continue;
		
		let savedValue = saved[prop];
		let gameValue = game[prop];
		let baseValue = base[prop];
		
		if (typeof baseValue === "undefined") continue;
		
		if (baseValue instanceof Decimal) {
			game[prop] = Decimal.valid(savedValue) ? N(savedValue) : baseValue;
		} else if (typeof savedValue === 'object' && savedValue !== null && !Array.isArray(savedValue)) {
			if (game.hasOwnProperty(prop) && gameValue !== null && typeof gameValue === 'object') {
				getSavedGame(savedValue, gameValue, baseValue);
			} else if (game.hasOwnProperty(prop)) {
				game[prop] = {};
				getSavedGame(savedValue, game[prop], baseValue);
			}
		} else if (Array.isArray(savedValue)) {
			let out = [];
			for (let i = 0; i < savedValue.length; i++) {
				let baseItem = baseValue && baseValue[i];
				if (baseItem instanceof Decimal) {
					out.push(Decimal.valid(savedValue[i]) ? N(savedValue[i]) : baseItem);
				} else {
					out.push(savedValue[i]);
				}
			}
			game[prop] = out;
		} else if (game.hasOwnProperty(prop)) {
			if (baseValue instanceof Decimal) {
				game[prop] = Decimal.valid(savedValue) ? N(savedValue) : baseValue;
			} else {
				game[prop] = savedValue;
			}
		}
	}
}

function load(savegame) {
	function validateSavegame(save) {
		if (typeof save !== 'object' || save === null) return false;
		const requiredFields = ['exoticmatter', 'XAxis', 'timePlayed'];
		for (let field of requiredFields) {
			if (save[field] === undefined) {
				console.warn(`存档缺少必需字段: ${field}`);
				return false;
			}
		}
		return true;
	}
	
	try {
		if (typeof savegame === "string") {
			try {
				savegame = JSON.parse(savegame);
			} catch (e1) {
				try {
					console.log("尝试Base64解码存档...");
					const decoded = atob(savegame);
					savegame = JSON.parse(decoded);
					console.log("Base64解码成功");
				} catch (e2) {
					try {
						const decoded = decodeURIComponent(atob(savegame));
						savegame = JSON.parse(decoded);
						console.log("Base64+URI解码成功");
					} catch (e3) {
						console.error("存档解析失败:", e1.message, e2.message, e3.message);
						newGame();
						return;
					}
				}
			}
		} else if (savegame === null || savegame === undefined) {
			newGame();
			return;
		}
		
		if ((typeof savegame === "object") && (savegame !== null)) {
			if (!validateSavegame(savegame)) {
				console.warn("存档验证失败，创建新游戏");
				newGame();
				return;
			}
			
			g = decimalStructuredClone(basesave);
			getSavedGame(savegame, g);
			
			if (typeof g.stardustAutomatorMode !== "number") {
				g.stardustAutomatorMode = ["amount", "time", "mult", "pow"].indexOf(g.stardustAutomatorMode);
			}
			if (typeof g.wormholeAutomatorMode !== "number") {
				g.wormholeAutomatorMode = ["amount", "time", "mult", "pow"].indexOf(g.wormholeAutomatorMode);
			}
			
			if ((savegame.achievement === undefined) && (savegame.ownedAchievements !== undefined)) {
				g.achievement = Object.fromEntries(achievement.all.map(x => [x, savegame.ownedAchievements.map(x => String(x)).includes(String(x))]));
			}
			if ((savegame.secretAchievement === undefined) && (savegame.ownedSecretAchievements !== undefined)) {
				g.secretAchievement = Object.fromEntries(Object.keys(secretAchievementList).map(x => [x, savegame.ownedSecretAchievements.map(x => String(x)).includes(String(x))]));
			}
			
			totalAchievements = Object.values(g.achievement).map(x => x ? 1 : 0).sum();
			totalSecretAchievements = Object.values(g.secretAchievement).map(x => x ? 1 : 0).sum();
			
			if ((savegame.star === undefined) && (savegame.ownedStars !== undefined)) {
				g.star = Object.fromEntries(starList.map(x => [x, savegame.ownedStars.includes(x)]));
			}
			if ((savegame.research === undefined) && (savegame.ownedResearch !== undefined) && (savegame.permanentResearch !== undefined)) {
				g.research = Object.fromEntries(Object.keys(research).map(x => [x, savegame.ownedResearch.includes(x) || savegame.permanentResearch.includes(x)]));
			}
			
			if (savegame.lumens === undefined) {
				for (let i = 0; i < 9; i++) addLumens(i);
			}
			
			totalStars = Object.values(g.star).map(x => x ? 1 : 0).sum();
			totalResearch.temporary = researchList.nonPermanent.filter(x => research[x].type === "normal").map(x => (g.research[x]) ? 1 : 0).sum();
			totalResearch.permanent = researchList.permanent.map(x => g.research[x] ? 1 : 0).sum();
			
			fixMasteryArrays();
			
			for (let i = 0; i < 4; i++) {
				g.observations[i] = N(g.observations[i]).fix(c.d0);
			}
			
			if (g.chroma && g.chroma.length === 8) g.chroma.push(c.d0);
			if (g.lumens && g.lumens.length === 8) g.lumens.push(c.d0);
			
			if (g.chroma) {
				for (let i = 0; i < Math.min(9, g.chroma.length); i++) {
					g.chroma[i] = N(g.chroma[i]).fix(c.d0);
				}
			}
			
			g.TotalStardustResets = Math.max(g.StardustResets, g.TotalStardustResets);
			g.TotalWormholeResets = Math.max(g.WormholeResets, g.TotalWormholeResets);
			
			if (((typeof g.version) !== "number") && (g.EMDLevelDisplayInFooter === 0)) {
				g.version = 1;
				g.EMDLevelDisplayInFooter = 1;
			}
			
			if (typeof g.galaxies !== "number") g.galaxies = 0;
			
			olddelta = Date.now();
			g.dilatedTime += (olddelta - g.timeLeft) / 1000;
			updateOverclockScrollbar();
			
			console.log("存档加载成功");
		} else {
			console.warn("存档格式不正确，创建新游戏");
			newGame();
		}
	} catch (e) {
		console.error("加载存档时发生未预期错误:", e);
		newGame();
	}
	
	savecounter++;
}
function newGame() {
	
}
function openExport(x) {
	popup({
		text: "这是你的导出字符串：",
		input: x,
		buttons: [["关闭", ""]]
	});
}

function importSave() {
	popup({
		text: "在此导入你的存档字符串：",
		input: "",
		buttons: [["确认", "processImport(popupInput())"], ["关闭", ""]]
	});
}

function processImport(string, bypassWarning = false) {
	if (!string || typeof string !== 'string' || string.trim() === '') {
		popup({
			text: "存档字符串不能为空！",
			buttons: [["关闭", ""]]
		});
		return;
	}
	
	if (string.substring(0, 34) === "AntimatterDimensionsSavefileFormat" && string.substring(string.length - 13) === "EndOfSavefile") {
		addSecretAchievement(34);
		return;
	}
	
	let save;
	try {
		save = JSON.parse(string);
	} catch (e) {
		console.error("存档解析失败:", e);
		popup({
			text: "无法解析存档字符串！请确保你输入的是有效的存档数据。",
			buttons: [["关闭", ""]]
		});
		return;
	}
	
	if (!bypassWarning) {
		let flag = false;
		try {
			const checkVariables = ["exoticmatter", "XAxis", "SAxis", "stardust", "stardustUpgrades", "masteryPower", "timePlayed", "stars", "darkmatter", "darkSAxis"];
			for (let i of checkVariables) {
				if (save[i] === undefined) {
					flag = true;
					break;
				}
			}
		} catch {
			flag = true;
		}
		
		if (flag) {
			popup({
				text: "这看起来不像有效的 EMD 存档，确定要导入吗？<br><br><i style=\"color:#ff0000;\">如果导入此内容，你的进度可能会被清空。</i>",
				buttons: [["仍然导入", `processImport('${string}', true)`], ["取消", ""]]
			});
			return;
		}
	}
	
	try {
		load(save);
		for (let i = 0; i < initSteps.length; i++) {
			if (initSteps[i].onImport ?? false) {
				initSteps[i].function();
			}
		}
		notify("存档导入成功！", "#00ff00", "#000000");
	} catch (e) {
		console.error("存档导入失败:", e);
		popup({
			text: "存档导入过程中发生错误！",
			buttons: [["关闭", ""]]
		});
	}
}

const promoCodeList = (() => {
	function sach(x) { return {
		action: () => addSecretAchievement(x),
		condition: () => !g.secretAchievement[x]
	}; }
	return {    // key = 代码, value = 函数
		"XNu35M0qc7KzBcgW": sach(7),
		"RsNU8rznMqhPdFjg": sach(8),
		"GEtJEyjWuFB1oNSA": sach(30),
		"YVAn4tknrVD5NcBB": {
			action: () => {
				newsSupport.newsletter.spamStart = Infinity;
				addSecretAchievement(33);
			},
			condition: () => (!g.secretAchievement[33]) && (newsSupport.newsletter.remaining.length === 0)
		},
	};
})();

function inputPromo() {
	popup({
		text: "在此输入你的代码：",
		input: "",
		buttons: [["确认", "processPromo(stringSimplify(popupInput()))"], ["关闭", ""]]
	});
}

function processPromo(str) {
	let hash = alemanicHash(str, 16);
	if (promoCodeList[hash] !== undefined) {
		if (promoCodeList[hash].condition()) {
			promoCodeList[hash].action();
		} else {
			notify("代码已被使用。请再试一次！", "#0000cc");
		}
	} else {
		notify("无效代码。请再试一次！", "#990000");
	}
}

function exportSave() {
	openExport(btoa(JSON.stringify(g)));
}

const wipeSavePassword = Array.random(["史莱克是爱，史莱克是生命", "要确认你想清除存档，请输入。", "foo", "是", "yes", "96", "g.exoticmatter++", "alemaninc，这是最糟糕的主意。", "这是史上最烂的游戏。", "M > O > U", "44031", "X > Y > Z", "存档选择器", "这是随机生成的短语", "玛雅嘻玛雅呼", "清除存档", "请不要删除我", "确认", "康菲姆", "克隆菲姆", "斯塔特马克", "泽恩诺罗尼", "反物质维度更好。", "难以置信的慢启动", "惊讶竟然没有什么能加速这个过程", "alemaninc 令人印象深刻地每周多次将破损代码部署到生产环境"]);
function stringSimplify(x) {
	return String(x).replace(/[^A-Za-z0-9]/g, "").toLowerCase();
}

function wipeSavePopup() {
	popup({
		text: "要确认你想清除你的存档，请输入 \"" + wipeSavePassword + "\"。",
		input: "",
		buttons: [["确认", "wipeSave(popupInput())"], ["取消", ""]]
	});
}

function wipeSave(password) {
	if ((typeof password) !== "string") {
		// 什么都不做
	} else if (stringSimplify(password) === stringSimplify(wipeSavePassword)) {
		g = decimalStructuredClone(basesave);
		openTab("main");
		openSubTab("main", "axis");
		updateAchievementsTab();
		d.display("span_noAchievements", "inline-block");
		updateYellowLightCache();
		updateStats();
	} else {
		popup({ text: "答案不正确，清除未执行。", buttons: [["关闭", ""]] });
	}
}