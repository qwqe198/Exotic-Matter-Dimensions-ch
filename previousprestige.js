const previousPrestige = {
	// 获取当前激活的精通编号列表
	masteries: function () {
		return g.activeMasteries
			.map((x, index) => (x === 0) ? null : (x + index * 10))
			.filter(x => typeof x === "number")
	},

	// 获取当前分配的星星编号列表
	stars: function () {
		return starList.filter(x => g.star[x])
	},

	// 获取当前已购买的研究编号列表
	research: function () {
		return Object.keys(research).filter(x => g.research[x])
	},

	// 获取当前幸运升级状态
	luck: function () {
		return [
			[c.d0],
			[c.d0, c.d0],
			luckUpgradeList.trifolium.map(x => g.luckUpgrades[x]),
			luckUpgradeList.quatrefolium.map(x => g.luckUpgrades[x]),
			luckUpgradeList.cinquefolium.map(x => g.luckUpgrades[x])
		]
	},

	// 生成历史运行记录对象
	generate: function (resLayer, inLayer, base) {
		if ((arguments.length < 3) || Object.values(arguments).includes(undefined)) {
			functionError("previousPrestige.generate", arguments)
		}

		let out = {}

		// 星尘层级
		if (resLayer === 1) {
			out.time = base ? Number.MAX_VALUE : g.timeThisStardustReset
			out.truetime = base ? c.maxvalue : g.truetimeThisStardustReset
			out.gain = base ? c.d0 : stat.pendingstardust.floor()
		}
		// 虫洞层级
		else if (resLayer === 2) {
			out.time = base ? Number.MAX_VALUE : g.timeThisWormholeReset
			out.truetime = base ? c.maxvalue : g.truetimeThisWormholeReset
			out.gain = base ? c.d0 : stat.pendinghr.floor()
			out.efficiency = base ? c.d0 : stat.pendinghr.floor().div(g.timeThisWormholeReset)
			out.study = base ? 0 : g.activeStudy
		}
		else {
			functionError("previousPrestige.generate", arguments)
		}

		// 嵌套层级（记录更多构建信息）
		if (inLayer >= 1) {
			out.masteries = base ? [] : this.masteries()
			if (inLayer >= 2) {
				out.stars = base ? [] : this.stars()
				if (inLayer >= 3) {
					out.research = base ? [] : this.research()
					out.luck = base
						? [[c.d0], [c.d0, c.d0], [c.d0, c.d0, c.d0], [c.d0, c.d0, c.d0, c.d0], [c.d0, c.d0, c.d0, c.d0, c.d0]]
						: this.luck()
				}
			}
		}

		return out
	},

	// 存储的历史星尘运行记录
	stardustRunsStored: [
		{
			label: "有史以来收益最高的运行",
			layer: 4,
			location: function () { return g.previousStardustRuns.eternity.highest },
			visibility: function () { return unlocked("Stardust") }
		},
		{
			label: "有史以来最快的运行",
			layer: 4,
			location: function () { return g.previousStardustRuns.eternity.fastest },
			visibility: function () { return unlocked("Stardust") }
		},
		{
			label: "当前矩阵中收益最高的运行",
			layer: 3,
			location: function () { return g.previousStardustRuns.spacetime.highest },
			visibility: function () { return unlocked("Matrix") }
		},
		{
			label: "当前矩阵中最快的运行",
			layer: 3,
			location: function () { return g.previousStardustRuns.spacetime.fastest },
			visibility: function () { return unlocked("Matrix") }
		},
		{
			label: "当前虫洞中收益最高的运行",
			layer: 2,
			location: function () { return g.previousStardustRuns.wormhole.highest },
			visibility: function () { return unlocked("Hawking Radiation") }
		},
		{
			label: "当前虫洞中最快的运行",
			layer: 2,
			location: function () { return g.previousStardustRuns.wormhole.fastest },
			visibility: function () { return unlocked("Hawking Radiation") }
		}
	],

	// 存储的历史虫洞运行记录
	wormholeRunsStored: [
		{
			label: "有史以来收益最高的运行",
			layer: 4,
			location: function () { return g.previousWormholeRuns.eternity.highest },
			visibility: function () { return unlocked("Hawking Radiation") }
		},
		{
			label: "有史以来最快的运行",
			layer: 4,
			location: function () { return g.previousWormholeRuns.eternity.fastest },
			visibility: function () { return unlocked("Hawking Radiation") }
		},
		{
			label: "有史以来效率最高的运行",
			layer: 4,
			location: function () { return g.previousWormholeRuns.eternity.efficientest },
			visibility: function () { return unlocked("Hawking Radiation") }
		},
		{
			label: "当前矩阵中收益最高的运行",
			layer: 3,
			location: function () { return g.previousWormholeRuns.spacetime.highest },
			visibility: function () { return unlocked("Matrix") }
		},
		{
			label: "当前矩阵中最快的运行",
			layer: 3,
			location: function () { return g.previousWormholeRuns.spacetime.fastest },
			visibility: function () { return unlocked("Matrix") }
		},
		{
			label: "当前矩阵中效率最高的运行",
			layer: 3,
			location: function () { return g.previousWormholeRuns.spacetime.efficientest },
			visibility: function () { return unlocked("Matrix") }
		}
	],

	// 用于显示构建列表的 DOM 节点
	buildListNodes: document.getElementsByClassName("previousPrestigeBuildList"),

	// 当前可显示的构建类型
	shownBuilds: function () {
		let out = ["Star", "Mastery"]
		if (unlocked("Hawking Radiation")) out.push("Research")
		return out
	},

	// 切换标签页
	showTab: function (id) {
		for (let i of d.class("previousPrestigeTab")) i.style.display = "none"
		d.display(id, "inline-block")
		for (let i of d.class("previousPrestigeTabButton")) i.style.filter = "brightness(60%)"
		event.currentTarget.style.filter = "brightness(100%)"
	},

	// 显示具体构建详情
	showBuild: function (layer, type, index) {
		let location

		if (layer === "stardust") {
			if (type === "last") {
				location = g.previousStardustRuns.last10[index - 1]
			} else if (type === "record") {
				location = previousPrestige.stardustRunsStored[index].location()
			} else {
				functionError("previousPrestige.showBuild", arguments)
			}
		}
		else if (layer === "wormhole") {
			if (type === "last") {
				location = g.previousWormholeRuns.last10[index - 1]
			} else if (type === "record") {
				location = previousPrestige.wormholeRunsStored[index].location()
			} else {
				functionError("previousPrestige.showBuild", arguments)
			}
		}
		else {
			functionError("previousPrestige.showBuild", arguments)
		}

		let out = []

		if (location.masteries !== undefined) {
			out.push(["精通", location.masteries.filter(x => x % 10 > 0).join(",")])
		}
		if (location.stars !== undefined) {
			out.push(["星星", location.stars.join(",")])
		}
		if ((location.research !== undefined) && unlocked("Hawking Radiation")) {
			out.push(["研究", location.research.join(",")])
		}
		if ((location.luck !== undefined) && unlocked("Luck")) {
			out.push([
				"幸运",
				location.luck
					.filter(x => x.map(i => N(i).sign).includes(1))
					.map((x, i) => (i + 1) + ":" + x.join(","))
					.join("\n")
			])
		}

		popup({
			text: out
				.filter(x => x[1] !== "")
				.map(x => "<p>" + x[0] + "<br><textarea style=\"width:90%;height:40px\">" + x[1] + "</textarea></p>")
				.join(""),
			buttons: [["Close", ""]]
		})
	}
}