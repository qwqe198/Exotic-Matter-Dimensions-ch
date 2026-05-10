function howToPlay(x) {
	let htp = HTPtexts[HTPtexts.map(x => x.name).indexOf(x)]
	let text = "<h1>" + ((htp.name === "Galaxies") ? "<span onClick=\"secretAchievementList[31].click()\">银河系漫游指南</span>" : htp.name) + "</h1>" +
		htp.paragraphs.map(x => "<p>" + x + "</p>").join("")
	if (htp.dynamics !== undefined)
		for (let i = 0; i < htp.dynamics.length; i++)
			text = text.replace("{" + i + "}", htp.dynamics[i]())
	popup({
		text: text,
		buttons: [["Close", ""]]
	})
}

function htpNavigation() {
	popup({
		text: "你想了解如何游玩哪一部分？",
		buttons: HTPtexts.filter(x => x.visibility()).map(x => [x.name, "howToPlay('" + x.name + "')"])
	})
}

const HTPtexts = [
	{
		name: "奇异物质",
		visibility: function () { return true },
		paragraphs: [
			"奇异物质是游戏的核心货币。你以每秒 1 个的速度被动生成奇异物质。",
			"奇异物质可用于购买轴，这些轴会以不同的方式提升 {0}。"
		],
		dynamics: [
			() => (g.stardustUpgrades[1] > 1 || unlocked("Hawking Radiation")) ? "各种游戏机制" : "奇异物质生成"
		]
	},
	{
		name: "精通",
		visibility: function () { return unlocked("Masteries") },
		paragraphs: [
			"精通是一种特殊的升级类型。它们免费使用，但你{0}每行的精通只能同时激活一个。",
			"精通提供的加成基于精通力，其产量随时间推移根据你拥有的奇异物质数量而增加。"
		],
		dynamics: [
			() => unlocked("Stardust") ? " 初始 " : " "
		]
	},
	{
		name: "离线时间",
		visibility: function () { return true },
		paragraphs: [
			"当你不玩游戏时，会以每秒 1 秒扩张时间的速度积累扩张时间。",
			"扩张时间可用于超频游戏。超频使用扩张时间来加速产量。{0}<br>在 {1}× 乘数以下，超频与在线游玩效率相同。然而，超过此阈值后，超频成本的增速远快于获得的乘数，导致部分扩张时间被浪费。",
			"时间也可以被冻结。在时间冻结期间，你会像游戏关闭一样积累扩张时间，但仍可以与游戏互动。",
			"最后，时间也可以被均衡。这将使所有帧恰好为 50 毫秒长，消除处理器速度等因素造成的随机性 —— 任何多余的时间将作为额外的扩张时间加入。这对于诸如 212 之类的限时成就很有用。",
			"{2}"
		],
		dynamics: [
			() => (g.stars > 21 || unlocked("Hawking Radiation")) ? "与 时间速度不同，超频乘数会影响诸如‘实际游玩时间’之类的内容。" : "",
			() => stat.overclockSoftcap.toFixed(0),
			() => g.dilationUpgradesUnlocked === 0 ? "" : "在游戏的后期，扩张时间还可以用于扩张升级，以不同的方式改善超频。"
		]
	},
	{
		name: "时间速度",
		visibility: function () { return stat.tickspeed.neq(c.d1) },
		paragraphs: [
			"时间速度是游戏运行速度的倍数。",
			"它影响所有“每秒”生成的资源 —— 包括奇异物质、精通力（含计时器）、W 轴效果、暗物质、能量等。",
			"它不影响“游玩时间”统计（尽管有单独的统计项考虑 时间速度），也不影响任何会因 时间速度而阻碍进度的内容 —— 例如 212 等限时成就的计时器。"
		]
	},
	{
		name: "公式",
		visibility: function () { return true },
		paragraphs: [
			"按下 {0}，你可以查看游戏内的某些公式（你可以在 选项 > 热键 中更改此按键）。",
			"以下是这些公式中使用的部分数学符号概览：",
			tableGenerator([
				["⌊x⌋", "向下取整"],
				["⌈x⌉", "向上取整"],
				["log(n)", "对数"],
				["log<sup>[x]</sup>(n)", "迭代对数：例如 log<sup>[2]</sup>(20) = log(log(20))"],
				["log<sub>b</sub>(n)", "以 b 为底的对数"],
				["a ⇈ b", "四则运算（Tetration）"],
				["slog", "超对数"],
				["Σ<span class=\"xscript\"><sup>b</sup><sub>a</sub></span>x", "求和：例如 Σ<span class=\"xscript\"><sup>4</sup><sub>1</sub></span>n<sup>2</sup> = " + [1, 2, 3, 4].map(x => "(" + x + ")<sup>2</sup>").join(" + ") + " = 30"],
				["Π<span class=\"xscript\"><sup>b</sup><sub>a</sub></span>x", "乘积：例如 Π<span class=\"xscript\"><sup>4</sup><sub>1</sub></span>n<sup>n</sup> = " + [1, 2, 3, 4].map(x => "(" + x + ")<sup>(" + x + ")</sup>").join(" × ") + " = 27648"],
				["Ξ<sup>[x]</sup>n", "迭代指数：例如 Ξ<sup>[2]</sup>3 = 10<sup>10<sup>3</sup></sup>"],
				["dB(x)", "“分贝”函数 —— 返回接近 10<sup>x ÷ 10</sup> 的“美观”值<br>（精确值为 [1,1.25,1.6,2,2.5,3.2,4,5,6.4,8][x mod 10] × 10<sup>⌊x ÷ 10⌋</sup>）"]
			], "", "", "border-style:solid;border-width:1px;border-color:#00ff00;padding:5px;", false)
		],
		dynamics: [
			() => formatHotkey(g.hotkeys["Show/hide formulas"])
		]
	},
	{
		name: "成就",
		visibility: function () { return totalAchievements > 0 },
		paragraphs: [
			"成就是通过达到游戏内的特定目标授予的。",
			"成就被分为不同的“层级”——每一层会根据该层拥有的成就，对游戏的某个部分提供加成。许多成就也有其独特的奖励。",
			"有些成就可以通过自然游玩获得，但其他一些只能在特定条件下获得 —— 最好经常查看成就标签页，看看哪些成就可以轻松达成。"
		]
	},
	{
		name: "星尘",
		visibility: function () { return unlocked("Stardust") || g.exoticmatter.gt(c.e25) },
		paragraphs: [
			"达到 {0} 奇异物质后，你将解锁获取星尘的能力。",
			"获取星尘会重置你的奇异物质和轴 —— 然而，你可以使用这些星尘解锁游戏的崭新功能。此外，你未花费的星尘会提供各种加成，使进程比以前更快。",
			"重置时获得的星尘量与重置时未花费的奇异物质的量成正比。"
		],
		dynamics: [
			() => stat.stardustExoticMatterReq.format()
		]
	},
	{
		name: "星尘加成",
		visibility: function () { return unlocked("Stardust") },
		paragraphs: [
			"星尘加成是基于你拥有的未花费星尘数量而增加的奖励。",
			"你初始只解锁了两个，但你可以通过星尘升级解锁更多，最多可达 {0} 个。"
		],
		dynamics: [
			() => numword(stat.stardustUpgrade3Cap + 2)
		]
	},
	{
		name: "星尘升级",
		visibility: function () { return unlocked("Stardust") },
		paragraphs: [
			"星尘升级是可以使用星尘购买的单次升级。",
			"五个星尘升级中的每一个都有若干等级，每个等级提供不同的效果。",
			"花费在星尘升级上的星尘会永久消失，但奇异物质的需求会相应减少。"
		]
	},
	{
		name: "星星",
		visibility: function () { return unlocked("Stardust") },
		paragraphs: [
			"星星可以用递增数量的星尘购买。",
			"你可以将星星分配到星星升级中，这些升级像精通一样按行分组。每行星星升级包含四个升级。",
			"与精通不同，每行可以拥有的星星升级数量没有限制。然而，每颗星星只能分配到特定的行 —— 例如，第 1 和第 2 颗星星只能分配到第 1 行，第 3 颗星星只能分配到第 2 行。",
			"{0}"
		],
		dynamics: [
			() => (unlocked("Light") || g.stars === starCap()) ? ("不可能拥有超过 " + BEformat(starCap()) + " 颗星星。") : ""
		]
	},
	{
		name: "暗物质",
		visibility: function () { return unlocked("Dark Matter") },
		paragraphs: [
			"暗物质基于你的星尘随时间被动生成。",
			"像奇异物质一样，它可以用来购买轴 —— 但是你不能使用暗物质购买普通轴。相反，暗物质必须用于购买暗轴，它们具有与普通轴不同的效果。",
			"除了其主要效果外，每个暗轴还会按固定量提升相应普通轴的等级。"
		]
	},
	{
		name: "自动化",
		visibility: function () { return g.stardustUpgrades[1] > 0 },
		paragraphs: [
			"自动化允许你自动化游戏的某些部分，例如购买普通轴。",
			"大多数自动装置都有间隔，并在间隔结束时激活一次。间隔可以通过消耗越来越多的资源来减少，通常是与被自动化内容相关的资源。有一些终局自动装置没有间隔，始终激活。",
			"你的自动化永远不会被重置。"
		]
	},
	{
		name: "暗星",
		visibility: function () { return unlocked("Dark Matter") },
		paragraphs: [
			"达到一定量的总暗轴后，你可以获得一颗暗星。",
			"这会进行一次星尘重置，并额外重置你的暗物质和暗轴。然而，每颗暗星提供三种奖励：",
			"[1] 对暗物质基础获取的倍率效果",
			"[2] 对特定暗轴效果的加成（第 1 颗暗星提升暗 X 轴，第 2 颗提升 Y，第 3 颗提升 Z……第 8 颗提升 S，然后第 9 颗再次提升 X，依此类推）",
			"[3] 暗轴给予普通轴加成的增加"
		]
	},
	{
		name: "能量",
		visibility: function () { return unlocked("Energy") },
		paragraphs: [
			"能量是由第五个星尘升级解锁的一组资源。",
			"能量呈指数增长 —— 即每秒乘以某个数，而不是相加。",
			"当特定能量的量超过特定资源时，该资源的产量会被提升到某个幂次。",
			"{0}"
		],
		dynamics: [
			() => g.studyCompletions[3] > 0 ? "大多数能量在星尘重置时会重置，但少数会持续到虫洞重置。" : "能量在星尘重置时会重置为 1。"
		]
	},
	{
		name: "虫洞",
		visibility: function () { return unlocked("Hawking Radiation") || stat.totalDarkAxis.gte(c.e3) },
		paragraphs: [
			"虫洞是游戏中解锁的第二个重置选项。虫洞会重置星尘所重置的一切，以及星尘标签页中的所有内容。作为交换，你会获得霍金辐射。",
			"与星尘不同，霍金辐射没有固有效果。但是，它可以用于在“研究”标签页中获得发现值。此外，一些虫洞里程碑的效果会根据你拥有的霍金辐射量而增加。"
		]
	},
	{
		name: "虫洞里程碑",
		visibility: function () { return unlocked("Hawking Radiation") },
		paragraphs: [
			"完成第 5 层成就解锁虫洞里程碑。",
			"虫洞里程碑让游戏变得不那么繁琐，例如解锁新的自动装置，并允许某些东西在星尘和虫洞重置时保留。少数里程碑也提供产量加成。"
		]
	},
	{
		name: "研究",
		visibility: function () { return unlocked("Hawking Radiation") },
		paragraphs: [
			"在第一次摧毁宇宙（虫洞重置）后，你开始生成知识。",
			"知识对所有精通提供加成（最高 {0}%)，但更重要的是，它使你能够获得发现值。",
			"发现值可以花费在研究上，这是一组排列成树的强力升级。",
			"最初你只能访问第 1 行研究。为了购买后续行的研究，你必须至少拥有 1 个与之相连的研究。",
			"研究可以在虫洞重置时重置。这会移除你所有的研究，但返还花费在上面发现值。",
			"{1}"
		],
		dynamics: [
			() => stat.knowledgeEffectCap.noLeadFormat(1),
			() => g.research.r8_8 ? "一些研究是永久的，不受重置影响。这些研究通过周围的白色边框区分。" : ""
		]
	},
	{
		name: "研究（Studies）",
		visibility: function () { return unlocked("Studies") },
		paragraphs: [
			"研究是通过购买特殊的红色边框研究解锁的。",
			"当研究开始时，会进行一次虫洞重置，并施加特殊限制（“绑定”）。",
			"如果你能在研究中达到一定的总暗轴数量，你就可以完成它。这会解除研究的绑定，并给予 3 项奖励。",
			"每项研究最多可以完成 4 次 —— 每次完成都有更苛刻的绑定和更高的目标。",
			"大多数研究在完成后也会解锁新的研究。"
		]
	},
	{
		name: "光",
		visibility: function () { return unlocked("Light") },
		paragraphs: [
			"在光中，你可以生成不同颜色的色素。获得的色素量基于你拥有的星星数量：如果你有 {0} 颗星星（最大值），则获得每秒 1 色素的基础值。然而，如果你少于 {0} 颗星星，每少一颗星星，色素获取就会除以 3。",
			"如果你获得足够类型的色素，你就会获得一个光素，给予各种加成之一。获得光素的需求呈指数增长，但不同颜色的增幅因子各不相同。",
			"红、绿和蓝色素可以免费生成。然而，其他颜色的色素必须通过消耗其他颜色的色素来制造。"
		],
		dynamics: [
			() => BEformat(starCap())
		]
	},
	{
		name: "星系",
		visibility: function () { return unlocked("Galaxies") },
		paragraphs: [
			"一旦你达到 {0} 颗星星，就不可能再购买更多。取而代之的是，你可以获得星系。",
			"你获得的每个星系都会显著增加星星费用，但会提供回报加成。",
			"如果星星惩罚对你来说太难了，你可以摧毁你创造的星系 —— 但是，获得或失去星系会强制进行一次虫洞重置。"
		],
		dynamics: [
			() => BEformat(starCap())
		]
	},
	{
		name: "幸运",
		visibility: function () { return unlocked("Luck") },
		paragraphs: [
			"一旦你完成研究 VII，你将开始生成幸运碎片。",
			"这些幸运碎片可以用来购买符文 —— 你初始只有三叶草可用，但随着时间的推移会解锁更多类型。",
			"每种符文都可以花费在可退款的幸运升级上。"
		]
	},
	{
		name: "棱镜",
		visibility: function () { return unlocked("Prismatic") },
		paragraphs: [
			"一旦你购买研究 20-8，你将基于你所有的光素类型生成棱镜。",
			"你可以将这些棱镜花费在棱镜升级上。大多数棱镜升级像普通升级一样工作 —— 但是，少数除了正面效果外还有负面效果。这些可以被退款。"
		]
	},
	{
		name: "反物质",
		visibility: function () { return unlocked("Antimatter") },
		paragraphs: [
			"完成研究 IX 后，你将随时间被动生成反物质。",
			"像奇异物质和暗物质一样，它可以用来购买一种新型的轴。但是，你初始只能访问前四个反轴。其余的必须通过研究解锁。",
			"除了其主要效果外，每个暗轴还会以乘法方式提升相应普通轴和暗轴的等级。"
		]
	},
	{
		name: "研究 XIII",
		visibility: function () { return unlocked("Study XIII") },
		paragraphs: [
			"研究 XIII 的工作方式与前几个研究不同。",
			"在研究 XIII 中，你可以访问一个绑定树。你可以点击树上的绑定来激活它们，再次点击则停用。每个绑定给予绑定等级。",
			"当你进入研究 XIII 时，你激活的所有绑定的限制都会生效。但是，如果你能达到目标需求，你对研究 XIII 的完成次数将增加到你的绑定等级。",
			"研究 XIII 没有三个奖励，而是有一系列命名的奖励。这些奖励在特定完成阈值时解锁，并可以通过获得更多完成次数来升级。",
			"注意 —— 与研究不同，激活研究只需要其任意一个父节点，而要激活绑定，你必须激活所有适用的父绑定。"
		]
	}
].sort((a, b) => (a.name > b.name) ? 1 : -1)