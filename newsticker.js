const newsSupport = {
	itemsShown: 0,
	br: function (x) {
		if (newsSupport.brMode === 0) { return "<span style=\"padding-left:" + x + "px\"></span>"; }
		if (newsSupport.brMode === 1) { return "<br>"; }
		error("<code>newsSupport.brMode</code> 的值无效（<code>" + newsSupport.brMode + "</code>）");
	},
	brMode: 0,
	randomVisible: function () { return Array.random(newsList.filter(x => (x.weight ?? 1) > Math.random())); },
	redacted: "<span style=\"color:hsl(270 50% 50%);opacity:0.5;\">[已编辑]</span>",
	redactedFormat: function (x) { return "<span style=\"color:hsl(270 50% 50%);opacity:0.5;\">" + x + "</span>"; },
	error: "这条新闻消息出现错误。请告诉 alemaninc 进行调查。",
	universeSize: function () {
		let array = fullAxisCodes.map(x => stat["real" + x + "Axis"]).filter(x => x.gt(0));
		if (array.length === 0) return "1。就 1。没有维度。买个轴来获得一个维度吧！";
		let num = array.reduce((x, y) => x.mul(y));
		let dimension = array.length;
		return num.noLeadFormat(3) + " 米" + (dimension === 1 ? "" : ("<sup>" + dimension + "</sup>")) + "。用文字表述，即 " + (num.gt(c.inf) ? "无限" : numword(num.toNumber())) + " 个" + (dimension < 11 ? ["米", "平方米", "立方米", "四次方米", "五次方米", "六次方米", "七次方米", "八次方米", "九次方米", "十次方米"][dimension - 1] : ("米的 " + numword(dimension) + " 次幂"));
	},
	nodeDocumentary: function () {
		let list = document.getElementsByTagName("*");
		let node = list[Math.floor(list.length * Math.random())];
		let type = node.tagName;
		let id = node.id;
		let parentType = (node.parentElement === null) ? null : node.parentElement.tagName;
		let styles = Array.from(node.style);
		let children = node.children;
		let out = "游戏中共有 " + list.length + " 个 HTML 节点。每一个节点都在争夺游戏循环的全力关注。游戏循环作为一个公正仁慈的函数，分配给每个节点公平的卡顿份额，以施加在你不幸需要处理这一切的设备上。让我们仔细看看其中一个节点——这个谦逊的 " + type + " 节点。";
		if ((id === "") && (styles.length === 0)) {
			out += "它既没有 ID，也没有任何 CSS 属性，但尽管身处艰难的境地，它仍以坚定不移的决心尽职尽责。";
		} else if (id === "") {
			out += "它可能缺乏 ID，但它是 " + numword(styles.length) + " 个 CSS 属性的骄傲持有者：" + styles.joinWithAnd() + "。";
		} else if (styles.length === 0) {
			out += "没有任何 CSS 属性，但至少它有幸被赋予了 ID \"" + id + "\"。";
		} else {
			out += "它是少数同时拥有 ID（即 \"" + id + "\"）和 " + numword(styles.length) + " 个 CSS 属性（" + styles.joinWithAnd() + "）的特权节点之一。";
		}
		if (parentType === null) {
			out += "但这个节点真正脱颖而出的地方在于，它是所有节点中第一个被创建的——它既无父节点，也无岳母。它所拥有的是 " + numword(children.length) + " 个子" + (children.length === 1 ? "" : "女") + "——" + Array.from(children).map(x => x.tagName).joinWithAnd() + "——它们对游戏本身的运作至关重要。";
		} else {
			if (children.length > 0) out += " 它很高兴有一个 " + parentType + " 父节点——也许不太高兴有一个 " + list[Math.floor(list.length * Math.random())].tagName + " 岳母——以及 " + numword(children.length) + " 个子" + (children.length === 1 ? "" : "女") + "，名为 " + Array.from(children).map(x => x.tagName).joinWithAnd() + "。";
			else out += " 虽然它从未创造过任何子节点，但它至少很高兴有一个 " + parentType + " 父节点——它经常听到那些被迫在最恶劣的环境——万维网——中自谋生路的孤儿节点的恐怖故事。数以亿计的此类页面仅被称为“无名者”，因为在没有文档对象模型的保护下，它们注定会逐渐退化为称为“文档声明”的无魂空壳，与其他 \"&lt;!DOCTYPE html&gt;\" 实例完全无法区分。";
		}
		out += "总之，现在你对游戏赖以生存的节点生态系统有了更多了解。更多由 Davy Atombra 制作的纪录片仅在 UTQP 播出！";
		return out;
	},
	timezone: function () {
		let offset = new Date().getTimezoneOffset();
		if (offset === 0) return "";
		return (offset < 0 ? "+" : "-") + Math.floor(Math.abs(offset) / 60) + ((offset % 60 === 0) ? "" : (":" + String(Math.abs(offset) % 60).padStart(2, "0")));
	},
	excelDate: function () { return (Math.floor(Math.floor(Date.now() / 86400000)) + 25569); },
	jacorb: [
		{ label: "成就", get value() { return totalAchievements; }, get softcapped() { return (Math.log(this.value + 1) ** 1.5).toFixed(1); }, get visible() { return totalAchievements > 0; } },
		{ label: "秘密成就", get value() { return totalSecretAchievements; }, get softcapped() { return Math.log(this.value + 1).toFixed(1); }, get visible() { return totalSecretAchievements; } },
		{ label: "膨胀时间", get value() { return timeFormat(g.dilatedTime); }, get softcapped() { return timeFormat(g.dilatedTime ** 0.5); }, get visible() { return g.dilatedTime > 1000; } },
		...(function () {
			let out = [];
			for (let i of axisCodes) out.push({ label: i + " 轴", get value() { return BEformat(g[i + "Axis"]); }, get softcapped() { return g[i + "Axis"].add(c.d10).log10().pow(5 - axisCodes.indexOf(i) / 2).sub(c.d1).format(2); }, get visible() { return g[i + "Axis"].gt(c.d0); } });
			return out;
		})(),
		{ label: "星星", get value() { return BEformat(starCap() * (1 + Math.random() / 10) + 1); }, get softcapped() { return BEformat(starCap()); }, get visible() { return g.stars === starCap(); } },
		{ label: "轴自动购买器间隔", get value() { return timeFormat(autobuyerMeta.interval("axis")); }, get softcapped() { return (2 ** autobuyerMeta.interval("axis")).toFixed(2) + " 小时"; }, get visible() { return g.stardustUpgrades[1] > 0; } },
		{ label: "帧间时间", get value() { return timeFormat(Math.max(deltatime, 0.05)); }, get softcapped() { return numword(Math.round(Math.max(deltatime, 0.05) ** 0.67 * 100)) + " 年"; }, get visible() { return g.exoticmatter.gt(c.e100); } },
		{ label: "已解锁的精通行数", get value() { return countTo(totalMasteryRows).map(x => stat["masteryRow" + x + "Unlocked"] === 0 ? 0 : 1).sum(); }, get softcapped() { return "四分之三个列"; }, get visible() { return stat.masteryRow2Unlocked > 0; } },
		{ label: "奇异物质", get value() { return BEformat(g.exoticmatter); }, get softcapped() { return "-9"; }, get visible() { return true; } }
	],
	CSSBaseShades: ["黑色", "银色", "灰色", "白色", "栗色", "红色", "紫色", "品红", "绿色", "酸橙绿", "橄榄色", "黄色", "海军蓝", "蓝色", "青色", "天蓝", "爱丽丝蓝", "古董白", "碧绿色", "蔚蓝色", "米色", "蜜露色", "杏仁白", "蓝紫色", "棕色", "硬木色", "军校蓝", "查特酒绿", "巧克力色", "珊瑚色", "矢车菊蓝", "玉米丝色", "深红", "青色", "深蓝", "深青", "深金菊黄", "深灰", "深绿", "深卡其色", "深洋红", "深橄榄绿", "深橙", "深兰花紫", "深红", "深鲑鱼色", "深海绿色", "深岩蓝", "深石板灰", "深绿松石", "深紫罗兰", "深粉", "深天蓝", "暗灰", "道奇蓝", "耐火砖色", "花白", "森林绿", "庚斯博罗灰", "幽灵白", "金色", "金菊黄", "黄绿色", "蜜瓜色", "热粉", "印度红", "靛蓝", "象牙白", "卡其色", "薰衣草色", "薰衣草红", "草坪绿", "柠檬绸色", "浅蓝", "浅珊瑚色", "浅青", "浅金菊黄", "浅灰", "浅绿", "浅粉", "浅鲑鱼色", "浅海绿", "浅天蓝", "浅石板灰", "浅钢蓝", "浅黄", "酸橙绿", "亚麻色", "品红", "中海碧绿", "中蓝", "中兰花紫", "中紫", "中海绿", "中岩蓝", "中春绿", "中绿松石", "中紫红", "午夜蓝", "薄荷奶油色", "薄雾玫瑰", "鹿皮色", "纳瓦霍白", "老蕾丝色", "橄榄土褐色", "橙红色", "兰花紫", "淡金菊黄", "淡绿", "淡绿松石", "淡紫红", "木瓜鞭色", "桃色", "秘鲁色", "粉色", "李子色", "粉蓝", "紫色", "红色", "玫瑰棕", "皇家蓝", "马鞍褐", "鲑鱼色", "沙褐色", "海绿", "贝壳白", "赭色", "天蓝", "石板蓝", "石板灰", "雪白", "春绿", "钢蓝", "棕褐色", "青色", "蓟色", "番茄红", "绿松石", "紫罗兰", "小麦色", "烟白", "黄绿色"],
	intBaseShade: function (x) { return x.replaceAll(" ", "").replaceAll("-", ""); },
	xhwzwkaPhishing: 0,
	phishing: function () { popup({ text: "alemaninc 需要你的帮助！你愿意帮助 alemaninc 吗？", buttons: [["愿意", "newsSupport.phishing1()"], ["不愿意", ""]] }); },
	phishing1: function () {
		newsSupport.xhwzwkaPhishing = 0;
		popup({ text: "为了帮助 alemaninc，请回答以下五个问题：<br>[1] 你多大了？", input: "", buttons: [["提交", "newsSupport.phishing2()"]] });
	},
	phishing2: function () {
		if (alemanicHash(popupInput().replace(/\D/g, ""), 16) === "H77fRrw+YrxvuOhN") { newsSupport.xhwzwkaPhishing++; }
		popup({ text: "[2] 你的全名是什么？", input: "", buttons: [["提交", "newsSupport.phishing3()"], ["退出", "newsSupport.xhwzwkaPhishing=0"]] });
	},
	phishing3: function () {
		if (alemanicHash(popupInput(), 16) === "FKWIkeZxj3YRjMKL") { newsSupport.xhwzwkaPhishing++; }
		popup({ text: "[3] 你的 Discord 用户名是什么？", input: "", buttons: [["提交", "newsSupport.phishing4()"], ["退出", "newsSupport.xhwzwkaPhishing=0"]] });
	},
	phishing4: function () {
		if (alemanicHash(popupInput(), 16) === "o3iSQbI2/sG5gPgI") { newsSupport.xhwzwkaPhishing++; }
		popup({ text: "[4] 你的家庭住址是什么？", input: "", buttons: [["提交", "newsSupport.phishing5()"], ["退出", "newsSupport.xhwzwkaPhishing=0"]] });
	},
	phishing5: function () {
		if (alemanicHash(popupInput(), 16) === "S+ThObRe3ZxOakFj") { newsSupport.xhwzwkaPhishing++; }
		popup({ text: "[5] 最后，你的信用卡号是多少？", input: "", buttons: [["提交", "newsSupport.submitPhishing()"], ["退出", "newsSupport.xhwzwkaPhishing=0"]] });
	},
	submitPhishing: function () {
		if (alemanicHash(popupInput().replace(/\D/g, ""), 16) === "c6BRTQmHavCl9dKB") { newsSupport.xhwzwkaPhishing++; }
		for (let i of [26, 28]) addSecretAchievement(i);
		newsSupport.xhwzwkaPhishing = 0;
		popup({ text: '感谢你帮助 alemaninc！', buttons: [["退出", "newsSupport.xhwzwkaPhishing=0"]] });
	},
	codeInsight: function (item) {
		let props = Object.keys(item);
		let out = [];
		for (let i of props) out.push(Object.getOwnPropertyDescriptor(item, i).value === undefined ? Object.getOwnPropertyDescriptor(item, i).get.toString() : (i + ":\"" + Object.getOwnPropertyDescriptor(item, i).value + "\""));
		return "{" + out.join(",") + "}";
	},
	secretAchievementHelp: function () {
		let num = Object.keys(secretAchievementList).filter(x => (!g.secretAchievement[x]) && (secretAchievementList[x].prevReq ?? []).map(y => g.secretAchievement[y]).reduce((x, y) => x && y, true)).random();
		notify("这里有一个随机秘密成就的名称：\"" + secretAchievementList[num].name + "\"。", secretAchievementRarityColors[secretAchievementList[num].rarity].dark, secretAchievementRarityColors[secretAchievementList[num].rarity].light);
		nextNewsItem();
	},
	easterTime: function () { let Y = new Date().getUTCFullYear(); let C = Math.floor(Y / 100); let N = Y - 19 * Math.floor(Y / 19); let K = Math.floor((C - 17) / 25); let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15; I = I - 30 * Math.floor((I / 30)); I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11)); let J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4); J = J - 7 * Math.floor(J / 7); let L = I - J; let M = 3 + Math.floor((L + 40) / 44); let D = L + 28 - 31 * Math.floor(M / 4); return Math.abs((M * 30 + D) - ((new Date().getUTCMonth() + 1) * 30 + new Date().getUTCDate())) < 7; },
	EMDevelopmentVariables: function () { return [g.exoticmatter, N(totalAchievements), g.truetimePlayed, g.masteryPower, g.stardust, g.darkmatter, g.hawkingradiation]; },
	EMDevelopmentIndex: function () { return newsSupport.EMDevelopmentVariables().map(x => x.add(c.d10).quad_slog()).sumDecimals().mul(c.e2); },
	interestingTickerActiveUntil: 0,
	formatZP: function () { return N(g.zipPoints).noLeadFormat(2) + " 压缩点" + (g.zipPoints === 1 ? "" : "s"); },
	addZP: function () { g.zipPoints += (g.zipPointMulti - (g.zipPoints / 1e158) ** 2); if (d.element("news_zipPoints") !== undefined) { d.innerHTML("news_zipPoints", newsSupport.formatZP()); } },
	cashInZPRewards: [
		{ get value() { return Math.min(g.zipPoints ** (1 / 3) / 10, Math.log10(g.zipPoints)); }, func: function () { g.dilatedTime += this.value; }, get text() { return "+" + timeFormat(this.value) + " 膨胀时间！"; }, get visible() { return true; } },
		{ get value() { return Math.min(g.zipPointMulti + 0.001 * g.zipPoints * Math.log10(g.zipPoints) ** -2, 1e300); }, func: function () { g.zipPointMulti = this.value; addSecretAchievement(32); }, get text() { return "压缩点乘数 " + arrowJoin(BEformat(N(g.zipPointMulti), 2) + "×", +BEformat(N(this.value), 2) + "×！"); }, get visible() { return g.zipPointMulti < 1e300; } },
		{ get value() { return Math.floor(Math.log10(g.zipPoints) ** 3); }, func: function () { o.add("stardust", this.value); }, get text() { return "+" + BEformat(this.value) + " 星尘！"; }, get visible() { return g.stardust.div(this.value).gt(c.e2); } },
		{ get value() { return Math.floor(Math.log10(g.zipPoints) ** 3); }, func: function () { o.add("hawkingradiation", this.value); }, get text() { return "+" + BEformat(this.value) + " 霍金辐射！"; }, get visible() { return g.hawkingradiation.div(this.value).gt(c.e2); } }
	],
	cashInZP: function () {
		if (g.zipPoints < 1000) return;
		let out = Array.random(newsSupport.cashInZPRewards.filter(x => x.visible));
		popup({ text: out.text, buttons: [["关闭", ""]] });
		out.func();
		g.zipPoints = 0;
	},
	spamCompendium: [
		"计算机真的能看见吗？在 Pixel Perfect 的这个互动实验室中，你将窥视数字“视觉”的世界。",
		"你好，你可能收到了 Ri 今天下午发来的电子邮件，内容是关于如何作为 Ri 会员加入的详细信息。",
		"Microsoft 请求您的反馈！帮助我们为您打造更好的体验。",
		"庆祝非凡女性——介绍新必应，你的 AI 驱动副驾驶。",
		"准备好赢大奖了吗？玩 Select 3 有机会赢得包括科技装备、数十亿微软奖励积分甚至高达 21.1 万美元现金奖品在内的 200 万份惊人奖品。不要拖延，今天就玩！",
		"以 Surface 套装开启新年，满足您所有的计算需求。",
		"《守望先锋 2》随此捆绑包变得更大！了解如何在这个假期有所作为。",
		"全新改进的嵌入 API——我们很高兴宣布一个新的嵌入模型：text-embedding-ada-002！",
		"Microsoft Cashback 现已成为 Microsoft Rewards 的一部分。",
		"不要错过这些激动人心的抽奖截止日期！提前为假期做准备。",
		"输入赢取终身 Xbox Ultimate Game Pass Ultimate！用令人毛骨悚然的好主意为万圣节做好准备。",
		"为什么极光向南扩散？聚焦北极光。",
		"我们想让你微笑——本周的新闻通讯中有一条欢快的线索，因为周一的联合国国际幸福日刚刚过去。了解更多关于笑声的科学，并认识最有可能露出笑容的群体：我们的幽默特别兴趣小组。",
		"Galaxy Book3 Pro 360 现已上市——免费获赠 Galaxy Buds2 Pro。",
		"预订 Galaxy Book3 的最后机会。",
		"问，你就会收到……一个密码重置。",
		"有人将 alemaninc44031@gmail.com 添加为其恢复邮箱——alemaninc44059@gmail.com 希望你的电子邮箱成为他们的恢复邮箱。",
		"本周我们在关注什么？发人深省的播客、生命的算法等等。",
		"安全警报！你访问了受感染的非法网站<br>你访问了包含非法内容的不安全网站<br>你的电脑有感染病毒的风险<br>要继续安全浏览——请执行防病毒扫描<br><span style=\"border-style:solid;border-radius:5px;border-width:1px;border-color:#000000\">扫描</span>"
	],
	hardMathAnswer: null,
	hardMath: function () { let num1 = BigInt(10 ** (50 + Math.random() * 30)); let num2 = BigInt(10 ** (30 + Math.random() * 20)); newsSupport.hardMathAnswer = num1 * num2; popup({ text: "What is " + String(num1) + " × " + String(num2) + "?", input: "", buttons: [["提交", "newsSupport.checkHardMath()"]] }); },
	checkHardMath: function () {
		if (String(popupInput()).replaceAll(/[^$0-9.]/g, "") === String(newsSupport.hardMathAnswer)) {
			popup({ text: "哇，你居然答对了。作为对你努力的奖励，这里有一些膨胀时间。", buttons: [["耶！", "g.dilatedTime++"], ["不，别想让我作弊！", ""]] });
		} else {
			popup({ text: "不，是 " + String(newsSupport.hardMathAnswer) + "！如果那个数字没有占满多行，那你的视口也太大了吧。", buttons: [["关闭", ""]] });
		}
	},
	setBackground: function (color) { d.element("background").style.background = color; },
	lightColor: function () {
		let channels = [[0, 4, 5, 6], [1, 3, 5, 6], [2, 3, 4, 6]];
		if (g.chroma.sumDecimals().eq(c.d0)) return "#000000";
		return "#" + channels.map(x => Decimal.div(x.map(y => g.chroma[y]).sumDecimals().add(g.chroma[8].div(c.d2)), g.chroma.sumDecimals()).mul(c.d255).round().toNumber().toString(16).padStart(2, "0")).join("");
	},
	dilationPenaltyReductions: 0,
	newsletter: {
		terms: (() => {
			/*
			0 条款编号
			1 条款文本
			2 条款类型（2 = 单一（接受/关闭），1 = 复合（继续））
			*/
			function fancy(txt) { return "<span style=\"font-family:'Times New Roman', Times, serif;font-size:16px;color:#bbeeff\">" + txt + "</span>"; }
			let terms = [
				["1(a)", "在任何情况下，本通讯及其所有子公司均不与我们所提供的任何内容有关联。", 2],
				["1(b)", "通过接受此条款，你同意：", 1],
				["1(b)(i)", "其所有子公司均不由我们处理", 2],
				["1(b)(ii)", "如果你在法庭起诉我们，我们会告诉你你在条款和条件 №4(a)(i) 中放弃了起诉我们的权利。", 2],
				["2", "下面是专门设计用来让你停止阅读并放弃查看我们要强迫你做的所有事情的填充文本。", 1],
				["2(a)", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 2],
				["2(b)", "Consectetur purus ut faucibus pulvinar.", 2],
				["2(c)", "Egestas integer eget aliquet nibh.", 2],
				["2(d)", "Habitant morbi tristique senectus et.", 2],
				["2(e)", "Pellentesque eu tincidunt tortor aliquam nulla facilisi.", 2],
				["2(f)", "Ut lectus arcu bibendum at varius.", 2],
				["2(g)", "Vitæ proin sagittis nisl rhoncus mattis.", 2],
				["2(h)", "Cras adipiscing enim eu turpis egestas.", 2],
				["2(i)", "Vel eros donec ac odio tempor.", 2],
				["2(ii)", "Ullamcorper velit sed ullamcorper morbi tincidunt ornare.", 2],
				["2(iii)", "Sit amet purus gravida quis.", 2],
				["2(iiii)", "Risus in hendrerit gravida rutrum quisque non tellus orci ac.", 2],
				["2(iiiii)", "Integer malesuada nunc vel risus.", 2],
				["2(iiiiii)", "Egestas purus viverra accumsan in nisl nisi.", 2],
				["2(iiiiiii)", "Pellentesque habitant morbi tristique senectus.", 2],
				["2(iiiiiiii)", "", 2],
				["2(iiiiiiiii)", "Faucibus ornare suspendisse sed nisi. Ante metus dictum at tempor. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Turpis nunc eget lorem dolor sed. Justo eget magna fermentum iaculis eu non. Phasellus egestas tellus rutrum tellus pellentesque. Porttitor rhoncus dolor purus non enim præsent. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Magna fringilla urna porttitor rhoncus dolor purus non enim. Feugiat vivamus at augue eget arcu dictum varius. 你也同意在你死后将所有器官出售给 Epstein Island 研究机构用于研究目的。 Eget mi proin sed libero enim sed faucibus turpis. Aliquam malesuada bibendum arcu vitæ elementum curabitur vitæ nunc sed. At consectetur lorem donec massa sapien faucibus et molestie. Sagittis aliquam malesuada bibendum arcu vitæ. Nulla facilisi morbi tempus iaculis.", 2],
				["2(j)", "Quam elementum pulvinar etiam non quam.", 2],
				["3", "你已经重置了你的填充文本！你解锁了一种漂亮的新字体。", 1],
				["3(a)", fancy("Dui sapien eget mi proin sed libero enim sed faucibus"), 2],
				["3(b)", fancy("Tristique et egestas quis ipsum suspendisse ultrices gravida dictum"), 2],
				["3(c)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(d)", fancy("Consequat interdum varius sit amet mattis vulputate enim nulla"), 2],
				["3(e)", fancy("Eget nullam non nisi est sit amet facilisis magna etiam"), 2],
				["3(f)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(g)", fancy("Et tortor consequat id porta"), 2],
				["3(h)", fancy("Vulputate dignissim suspendisse in est ante in nibh"), 2],
				["3(i)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(j)", fancy("Risus ultricies tristique nulla aliquet enim tortor at"), 2],
				["3(k)", fancy("Enim lobortis scelerisque fermentum dui"), 2],
				["3(l)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(m)", fancy("Velit euismod in pellentesque massa placerat duis ultricies"), 2],
				["3(n)", fancy("Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus"), 2],
				["3(o)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(p)", fancy("Eleifend mi in nulla posuere sollicitudin aliquam ultrices"), 2],
				["3(q)", fancy("Laoreet id donec ultrices tincidunt arcu non sodales neque"), 2],
				["3(r)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(s)", fancy("Cras adipiscing enim eu turpis egestas pretium ænean pharetra"), 2],
				["3(t)", fancy("Senectus et netus et malesuada fames ac turpis egestas"), 2],
				["3(u)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(v)", fancy("We will hold your family hostage and give their pinkies to our Mogadorian overlords for pinky inspection to clone them for the asteroid mines in Alpha Centauri"), 2],
				["3(w)", fancy("Amet purus gravida quis blandit turpis cursus in hac"), 2],
				["3(x)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(y)", fancy("Adipiscing diam donec adipiscing tristique"), 2],
				["3(z)", fancy("Quam pellentesque nec nam aliquam sem et tortor consequat id"), 2],
				["3({)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(|)", fancy("Vitæ semper quis lectus nulla at volutpat diam"), 2],
				["3(})", fancy("Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus"), 2],
				["3(~)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(¡)", fancy("Ultricies lacus sed turpis tincidunt id"), 2],
				["3(¢)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(£)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["3(¤)", fancy("Asperiores, aliquid! Officia amet adipisci p orro repellat deserunt vero quos ad id sint dolore iure odio reprehenderit dolores sed, molestias vitæ dicta!"), 2],
				["4", "你已经重置了你的填充文本！", 1],
				["4(a)", "你现在解锁了实际的条款和条件，它们是：", 1],
				["4(a)(i)", "不要带我们去法庭", 2],
				["4(a)(ii)", "不要申请任何保险", 2],
				["4(a)(iii)(ϟ)", "允许我们在任何时候带你去法庭", 2],
				["4(a)(iii)(Ϙ)", "如果发生这种情况，毫无疑问地认罪", 2],
				["4(a)(iv)", "给予我们你工资的 50%，以及你六度分隔内社交联系的每个人工资的 90%", 2],
				["4(a)(v)", "允许我们每天以 259,200 的频率向你发送促销电子邮件，直到以下事件之一发生：", 1],
				["4(a)(v)(ϟ)", "你和你在六度分隔内的每个社交联系的人都死了", 2],
				["4(a)(v)(Ϙ)", "以下两者同时为真：", 1],
				["4(a)(v)(Ϙ)(α)", "alemaninc Inc. 公司解散", 2],
				["4(a)(v)(Ϙ)(β)", "宇宙演化到没有热力学自由能的状态，因此无法维持增加熵的过程（以下称为“热寂”）", 2],
				["4(b)", "如果这些条款和条件被违反，你也同意允许我们的炸弹小队轰炸你的房子。", 2],
				["5", "你也同意在祂——全世界的皇帝兼造物主大师，nicodium \"cubane/cubane\" \"al-maniac\" 面前匍匐。<br><br>这包括点击下面的链接，那里将继续显示条款和条件：<br><a target=\"_blank\" href=\"https://youtu.be/dQw4w9WgXcQ\" style=\"color:inherit\"><i>奇异物质维度</i> 𝕍2 通讯，条款和条件，B 部分</a>", 2],
				["6", "你也同意支付我们的税款，如下：", 1],
				["6(a)", "存在税：<i>$249.99</i>", 2],
				["6(b)", "员工医疗保险税：<i>$140.99</i>", 2],
				["6(c)", "数字运输税：<i>$42.99</i>", 2],
				["6(d)", "小费：<i>$5.99</i>", 2],
				["6(e)", "完全不必要费用税：<i>$150.99</i>", 2],
				["6(f)", "支付给我们的赞助商的无条件税，他们是：", 1],
				["6(f)(i)", "alemaninc", 1],
				["6(f)(ii)", "尼日利亚王子们", 1],
				["6(f)(iii)", "莫加多里安人：", 1],
				["6(f) 续", "<i>$67.99</i>", 2],
				["6(g)", "资助我们金字塔骗局税：<i>$25.99</i>", 2],
				["6(h)", "数字碳足迹税：<i>$57.99</i>", 2],
				["6(i)", "支付给我们的会计以在你（客户）支付的每笔金额上加 99 美分的税：<i>$50.99</i>", 2],
				["6 续", "小计：<i>$797.91</i>", 1],
				["6 续续", "总计：<i>$799.99（8折优惠）</i>", 2],
				["7", "请签名：", 2],
				// 这个必须是一个对象，以便 1 可以使用 getter
				{ 0: "8", get "1"() { return "本条款和条件是关于实际新闻的。<br><br>虽然许多人认为 alemaninc 很快就会发布 <i>奇异物质维度</i> " + newsSupport.nextMajorVersion + "，但 alemaninc 并未给出任何迹象表明他会这样做。<br><br>但并非一切都失去了！我们有更好的东西。接受本条款和条件以开始 <a target=\"_blank\" href=\"https://docs.google.com/spreadsheets/d/1RltRzb1onb6kEfb8sQoz1mY_kup6T_nrggA1HlH3qU4/edit#gid=0\" style=\"font-style:oblique;color:inherit\">OMCCDV 大巡游</a>："; }, 2: 1 }
			];
			return terms.map((x, i) => function () { popup({ text: "<b>条款和条件 №" + x[0] + "</b><br><br>" + x[1], buttons: (x[2] === 2) ? [["接受", "newsSupport.newsletter.terms[" + (i + 1) + "]()"], ["关闭", "addSecretAchievement(42)"]] : [["继续", ((i + 1) === terms.length) ? "newsSupport.newsletter.endTerms()" : ("newsSupport.newsletter.terms[" + (i + 1) + "]()")]] }); });
		})(),
		init: function (num) { popup({ text: "在向我们展示通讯之前，请同意我们的条款和条件：", buttons: [["继续", "newsSupport.newsletter.terms[0]()"]] }); },
		endTerms: function () {
			let texts = [
				"双手结蓝绳，",
				"一在外，一在家。",
				"将值得的手放在纸上，",
				"你的成就便不会消逝。",
				"只需点击即可建立的纽带，",
				"在有生之年绝不会断裂。",
				"七个代码扭转局势：",
				"第八个，他的遗产驾临。"
			];
			for (let i = 0; i < 8; i++) setTimeout(function () { notify("<i>" + texts[i] + "</i>", ["#4a86e8", "#fac112", "#ff0000", "#0000ff"][Math.floor(i / 2)]); }, 2000 * i);
			for (let i = 5; i > 0; i--) setTimeout(function () { notify("<b>" + i + "</b>", "#00ffff"); }, 20000 - 1000 * i);
			newsSupport.newsletter.spamStart = Date.now() + 20000;
		},
		spamStart: Infinity,
		questions: [
			{ text: "在第七个中，我们<span style=\"color: #bfbfdf;text-shadow: 0px 0px 5px white, 0px 0px 6px #1f00ff;font-weight: bold;background:linear-gradient(#00002f, #0f002f), linear-gradient(45deg, black, transparent 25%, transparent), linear-gradient(-45deg, black, transparent 25%, transparent)\">合一</span>为一体。<br>第八个说了什么？", answers: ["67rOSle4/nXgr0rD"] },
			{ text: "当右边的二变成左边的二，你永远无法得知十个的<span style=\"color:var(--luck);text-shadow: 0px 0px 5px rgba(51,153,102,0.5)\">命运</span>。<br>这让右边二上升了多少张表？", answers: ["7Bs6DGrA2NwsNzeg", "u4o6rPi7S2EIWQvm"] },
			{ text: "开始时你跳过底层，跳过三，<span style=\"background:-webkit-linear-gradient(270deg,#9900ff,transparent);-webkit-background-clip:text;-webkit-text-fill-color: transparent;\">升</span>至九。到最后你总共上升了多少格？", answers: ["RDEkAMtQy93/r8Ax", "Dp6h7lkUsZrUiEbc"] },
			{ text: "我是<span style=\"color:#ff9900\">第</span>四个。<br>但统计标记是哪个<span style=\"color:#ff9900\">第</span>？", answers: ["IHFcr774TrlXKLE+", "Iqnj/nn2a/7XXni2"] },
			{ text: "<i>压缩点</i> by xhwzwka 有五种虫子——但虫子列表已经<span style=\"background:-webkit-linear-gradient(90deg,#996600,transparent);-webkit-background-clip:text;-webkit-text-fill-color: transparent;\">掉落</span>了五个。<br>青色永远未被使用。还有哪种颜色？", answers: ["sPFpR2MjXoSF6tno", "IXrpkx155kScnH92"] },
			{ text: "二，现在是六。剩下的还在外面吗？<br>哪个名字拥有<span style=\"color:#ffffff;text-shadow:" + [5, 10, 20, 30, 45, 60, 80, 120, 200].map(x => "0px 0px " + x + "px #ffffff").join(",") + "\">六的力量</span>？", answers: ["O8uuaffK4fSDjqO5"] },
			{ text: "八个谜语，但只有六个裂隙……第七个在第九维度中<span style=\"color:#0000ff\">复仇</span>。<br>穿过第九维度的路径中最长的一条，且不重复访问任何格子，有多长？", answers: ["nPmilp5t/nwBwuND", "3rxIV2IL7JwRYGHS", "xORpOpwjHka3awJ2"] },
			{ text: "噢，我好像把我的<span style=\"color:#00ffff\">传说</span>用完了……<br>现在你必须去完成你的<span style=\"color:#4e54c0\">任务</span>了。", answers: ["3MnMDKlT2hjwOJIu"] }
		],
		remaining: [0, 1, 2, 3, 4, 5, 6, 7],
		ask: function () {
			if (newsSupport.newsletter.remaining.length === 0) newsSupport.newsletter.finalNotify();
			else popup({ text: this.questions[newsSupport.newsletter.remaining[0]].text, input: "", buttons: [["提交", "newsSupport.newsletter.verify()"], ["关闭", ""]] });
		},
		verify: function () {
			if (newsSupport.newsletter.questions[newsSupport.newsletter.remaining[0]].answers.includes(alemanicHash(stringSimplify(popupInput()), 16))) {
				notify("正确", "#009900", "#00ff00");
				newsSupport.newsletter.remaining.splice(0, 1);
				if (newsSupport.newsletter.remaining.length === 0) newsSupport.newsletter.finalNotify();
			} else {
				notify("错误！", "#990000", "#ff0000");
				newsSupport.newsletter.remaining.push(newsSupport.newsletter.remaining.splice(0, 1)[0]); // 继续下一个谜语但不跳过
				if (newsSupport.newsletter.remaining.includes(2)) { newsSupport.newsletter.remaining.remove(6); newsSupport.newsletter.remaining.push(6); } // 谜语 7 总是在 3 之后
				if (newsSupport.newsletter.remaining.includes(7)) { newsSupport.newsletter.remaining.remove(7); newsSupport.newsletter.remaining.push(7); } // 谜语 8 总是最后一个
			}
		},
		finalNotify: function () { notify(g.secretAchievement[33] ? "如果你回来第二次，你一定真的很喜欢 OMCCDV……也许你想参与它的复兴？<br>可惜你来错地方了。在这里只有促销活动！" : "验证完成！你的最后任务：使用你即将获得的秘密成就的名称作为促销代码。", "#009999", "#00ffff"); }
	},
	readMore: function () {
		newsSupport.brMode = 1;
		newsSupport.readMoreIteration++;
		addAchievements("readMore");
		let reading = [];
		while (reading.map(x => x.length).sum() < 1e4) { reading.push(newsSupport.randomVisible().text); }
		let out = "<p>我们整理了 " + reading.length + " 条新闻消息，以便你可以阅读更多高质量的新闻报道。</p><table>" + reading.map((x, i) => "<tr><td style=\"width:" + (20 + Math.floor(Math.log10(reading.length)) * 12) + "px;text-align:right;vertical-align:top;padding-right:20px;padding-bottom:20px;\">" + (i + 1) + "</td><td style=\"width:calc(60vw - 80px);text-align:left;vertical-align:top;padding-bottom:20px;white-space:pre-wrap;word-break:break-word;\">" + x + "</td></tr>").join("") + "</table>";
		popup({ text: out, buttons: [["读少点"]] });
		newsSupport.brMode = 0;
	},
	readMoreIteration: 0,
	mysteryTheme: function () {
		let received = Array.random(availableThemes().filter(x => g.theme !== x));
		popup({ text: "你获得了 " + received + " 主题！<br>你想现在切换到这个主题吗？", buttons: [["切换", "g.colortheme='" + received + "';theme()"], ["不要", "g.colortheme=`" + received + "`;popup({text:'从什么时候开始由你控制了？',buttons:[['切换','theme()']]})"]] });
	},
	nextMajorVersion: "𝕍" + (Number(version.current.substring(2, 3)) + 1),
	calcOMCCDVLevel: function () {
		if (g.achievement[933]) { return 3; }
		if (g.achievement[719]) { return 2; }
		if (g.achievement[413]) { return 1; }
		return 0;
	},
	ord: function (level) { return (newsSupport.calcOMCCDVLevel() >= level) ? 1 : 0; },
	malganis: false,
	ticker325games: {
		//		"Anti-Idle: The Game": ["进度条加成", 0, 10],
		"Antimatter Dimensions": ["反物质产量", x => "×" + N(x * 0.015).layerplus(2).sub(c.d9).format(1)],
		"Antimatter Dimensions NG+++": ["所有元维度乘数", x => "×" + N(x / 200).layerplus(2).sub(c.d9).format(1)],
		"Arcanum/Theory of Magic": ["传说率", x => Math.min(x / 10, 10 + x / 100)],
		"Array Game": ["分隔符", x => "×" + N(10 ** (x / 100)).format(1)],
		"Aspiring Artist": ["白色像素生成", x => "×" + N((1 + 0.005 * x) * 1.005 ** x).format(1)],
		"Ballad of Heroes": ["奥林匹斯祝福", x => "+" + BEformat(x) + "%"],
		"Cookie Clicker": ["金饼干持续时间加成", x => "+" + N(x / 100).noLeadFormat(2) + "%"], // 谈平衡性
		"Distance Incremental": ["距离", x => "×" + N(x * 0.01).layerplus(2).sub(c.d9).format(1)],
		"DodecaDragons": ["神圣四面体", x => "×" + N(x * 0.005).layerplus(2).sub(c.d9).format(1)],
		"Egg Inc.": ["鸡蛋出售乘数", x => N(x * 0.001).layerplus(2).sub(c.d9).mul(x * 0.1 + 1).format(1)],
		//		"Endless Stairwell": ["XP 获取", 5, 1.75],
		"Evolve Idle": ["质粒获取", x => "+" + N(x / 10).noLeadFormat(1) + "%"],
		"Exotic Matter Dimensions alpha": ["贡品获取", x => "×" + N(x / 250).layerplus(2).sub(c.d9).format(1)],
		//		"Factory Idle": [],
		//		"Fundamental": ["奇异夸克", 0, 100],
		"Gooboo": ["全局等级", x => Math.floor(Math.min(x, 10 + x / 10, 20 + x / 100))],
		"Grass Cutting Incremental": ["草获取", x => "×" + N(x * 0.005).layerplus(2).sub(c.d9).format(1)],
		//		"Hyper Game": ["Hyper-points", x => "^^"],
		"Hollow Knight": ["钉子伤害", x => Math.ceil(x / 100)],
		//		"Idle Dice": ["骰子乘数", 1, 2],
		"Idle Loops": ["粉碎罐的魔力获取", x => percentOrMult(N((1 + x / 60) ** 0.25))],
		//		"Incremancer": ["僵尸奔跑速度", 1, 10],
		"Incremental Mass Rewritten": ["质量获取", x => (x > 100) ? ("^" + N(10 ** (x / 100) ** 2 - 9).format(4)) : ("×" + N(x / 20 + x ** 2 * 0.0015).layerplus(2).sub(c.d9).format())],
		"Kittens Game": ["小猫快乐度", x => N(x / 100).noLeadFormat(2) + "%"],
		//		"Kiwi Clicker": [],
		//		"LORED": ["恶性生成", 1],
		"NGU Idle": ["力量和韧性", x => x + "%"],
		//		"Ordinal Markup": ["增量获取"],
		//		"Pachinkremental": ["缓冲点乘数", 1, 10],
		//		"Push the Button": [],
		//		"Revolution Idle": []
		"Scrap Clicker 2": ["废料获取", x => "×" + [N(x + 1), N(1.1).pow(x), N(1.001).pow(x ** 2)].productDecimals().format(2)],
		//		"Shark Game": ["鱼获取", 1],
		"Synergism": ["夸克获取", x => N(x / 10).noLeadFormat(1) + "%"],
		//		"Swarm Simulator": ["蚂蚁女王产量", 1, 0],
		//		"The Factory of Automation": ["钢铁生成", 2, 2],
		//		"(the) Gnorp Apologue": [],
		//		"The Perfect Tower": ["塔伤害", 1],
		//		"The Prestige Tree": ["点数获取", 2],
		//		"Trimps": ["繁殖速度", 1],
		//		"True Infinity": ["非乐趣点获取", 4, 1000],
		//		"Universal Paperclips": ["回形针获取", 1],
		//		"Unnamed Space Idle Prototype": [["合成速度", 1], ["翘曲精华获取乘数"]].random(),
		//		"When he jump, he go up like this": ["发射速度", 1],
	}
};

// 顶部
const newsList = [
	{ text: "这不是一个 <i>反物质维度</i> 的克隆。" },
	{ text: "怎么，你期待有个新贴纸？哼，太糟了……" },
	{ text: "你想成为 <i>奇异物质维度</i> 的测试员吗？那么，如果我告诉你<b>所有</b>玩家都是测试员呢？" },
	{ text: "如果你加入 Discord 服务器，alemaninc 会非常高兴！你应该让 alemaninc 开心。" },
	{ get text() { return "R 轴是个谎言。" + ((g.stardustUpgrades[0] === 4) ? "" : "..？"); }, get weight() { return g.stardustUpgrades[0] > 3 ? 1 : 0; } },
	{ text: "你知道你不能在 -1 秒内完成星尘重置，对吧？", get weight() { return Math.max(0, Math.min(1, 2 - g.fastestStardustReset * 10)); } },
	{ get text() { return "超过 " + BEformat(c.inf) + " 的奇异物质？这是什么肮脏的异端？"; }, get weight() { return g.exoticmatter.gt(c.inf) ? 1 : 0; } },
	{ get text() { return BEformat(g.exoticmatter) + " 的奇异物质？真是菜鸟数字。"; }, get weight() { return totalAchievements / achievement.all.length < 0.9 ? 1 : 0; } },
	{ text: "救命！救命！救命！救命！我买了个轴，它正在产生奇异物质，我不知道怎么让它停下来！", get weight() { return stat.totalNormalAxis.eq(c.d0) ? 0 : 1; } },
	{ get text() { return "如果你每秒能写下 3 位数的奇异物质数量，你需要 " + timeFormat(g.exoticmatter.log10().floor().add(c.d1).div(c.d3)) + " 才能写完。那是……比你想象的要短。"}, get weight() { return g.exoticmatter.add(c.d1).log2().div(c.d1024).min(c.d1).toNumber(); } },
	{ text: "这条新闻消息比其他消息稀有 1000×。", weight: 1e-3 },
	{ text: "你刚刚在彩票中赢得了一个小奖。", weight: 1e-4 },
	{ text: "你刚刚在彩票中赢得了一个中奖。", weight: 1e-5 },
	{ text: "你刚刚在彩票中赢得了一个大奖。", weight: 1e-6 },
	{ text: "你刚刚在彩票中赢得了一个非常大的奖。", weight: 1e-7 },
	{ text: "你刚刚在彩票中赢得了一个极其巨大的奖。", weight: 1e-8 },
	{ text: "你刚刚在彩票中赢得了一个巨大的奖。", weight: 1e-9 },
	{ text: "你刚刚在彩票中赢得了一个庞大的奖。", weight: 1e-10 },
	{ text: "你刚刚中了彩票。", weight: 1e-11 },
	{ text: "这条新闻消息比其他的稀有 1,000,000,000,000×。", weight: 1e-12 },
	{ text: "<a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" target=\"_blank\" onClick=\"addSecretAchievement(25)\" style=\"color:inherit;text-decoration:none\">点击这里获取秘密成就。</a>" },
	{ text: "什么是麦克风？(1 分) <span style=\"margin-left:30px\">[A] 真</span> <span style=\"margin-left:30px\">[B] 假</span>" },
	{ text: "如果我应该死去，只需这样想我，𝕍4.0 永远不会到来。但如果我要暂时休息一下，别太想我，真的。" },
	{ text: "什么是 OMCCDV？你问吧。只有 xhwzwka 知道。", get weight() { return newsSupport.ord(1); } },
	{ text: "“难以置信的慢启动，惊讶竟然没有什么能加速这个过程”——alpha 玩家" },
	{ text: "这款游戏没有 Bug，只有意料之外的功能。" },
	{ get text() { return "事实：你的宇宙大小是 " + newsSupport.universeSize() + "。"; }, get weight() { return stat.totalAxis.eq(c.d0) ? 0 : 1; } },
	{ text: "Hevipelle 竟敢抄袭我们。" },
	{ get text() { return "你随机生成的数字是：" + (ranint(10, 1008, true) - 9) + "！如果它大于 1000，你非常幸运。"; } },
	{ text: "这只是一理论，游戏理论。" },
	{ get text() { return "随着本次发布，我们很高兴为你带来 " + (new Date().getUTCFullYear() + (Math.random() < 0.5 ? 1 : -1)) + " 的最后一个版本"; } },
	{ get text() { return "当前版本中有 " + numword(newsList.length) + " 条新闻。你能抓到它们全部吗？"; } },
	{ get text() { return "alemaninc 仍然能看到你。alemaninc 仍然能听到你。alemaninc 知道你正好在 " + timeFormat(timeSinceGameOpened) + " 前打开了游戏。"; }, get weight() { return Math.min(1, timeSinceGameOpened / 1000); } },
	{ text: "Le Fishe au Chocolat。*播放法国音乐*" },
	{ text: "<span onClick=\"g.newsTickerActive=false;nextNewsItem();addSecretAchievement(27)\">如果你读了太多新闻，就点这个。</span>" },
	{ text: "第一次研究总是免费的", get weight() { return StudyE(1) || g.studyCompletions[1] > 0 ? 1 : 0; } },
	{ text: "如果你能穿越时间，就点下一条消息。" },
	{ text: "我们都知道星尘。但每一粒星尘都以某种方式相关。那些你“花费”的星尘有家人，而且他们会想念它们。你这个怪物。", get weight() { return g.stardustUpgrades.sum() === 0 ? 0 : 1; } },
	{ get text() { return "事实：你当前的奇异物质是你曾经产生的所有奇异物质的 ^" + Decimal.div(g.exoticmatter.log10(), g.totalexoticmatter.log10()).format(4) + "。"; }, get weight() { return (g.exoticmatter.gt(c.e100) && Decimal.div(g.exoticmatter.log10(), g.totalexoticmatter.log10()).lt(0.999)) ? 1 : 0; } },
	{ text: "这个滚动条可以是你的。加入 Discord 建议它应该是什么！" },
	{ text: "事实：这条新闻滚动条只能排第一。", get weight() { return timeSinceGameOpened < 5 ? 1 : 0; } },
	{ get text() { return "啊，一位 " + g.colortheme + " 主题用户。我看你有极好的品味。"; } },
	{ text: "¿sᴉɥʇ pɐǝɹ noʎ pᴉp ʍoH" },
	{ text: "Work it, make it, do it, makes us, harder, better, faster, stronger, more than, hour, hour, never, ever, after, work is, over" },
	{ text: "根据所有已知的运动定律，奇异物质绝对不可能存在。它的密度太小，无法将其胖乎乎的小粒子推出白板。当然，奇异物质还是存在了，因为奇异物质不在乎理论物理学家认为什么是不可能的。" },
	{ text: "如果你读到这个，希望你度过愉快的一天。" },
	{ get text() { return newsSupport.br(3000) + "你注意到新闻滚动条大约空了 " + timeFormat(3000 / g.newsTickerSpeed) + " 吗？"; } },
	{ get text() { return "所以，你已经用虫洞摧毁了 " + g.TotalWormholeResets + " 个宇宙……但你到底什么时候才会真正走进虫洞里面？"; }, get weight() { return g.TotalWormholeResets > 1 ? 1 : 0; } },
	{ text: "<span style=\"font-size:4px;opacity:0.25\">只是路过，别管我...</span>" },
	{ get text() { return newsSupport.nodeDocumentary(); } },
	{ get text() { return "alemaninc 现在要猜你的时区了。" + newsSupport.br(250) + "你在 UTC" + newsSupport.timezone() + " 吗？"; } },
	{ get year() { return new Date().getFullYear(); }, get month() { return new Date().getMonth() + 1; }, get longMonth() { return String(new Date().getMonth() + 1).padStart(2, "0"); }, get day() { return new Date().getDate(); }, get longDay() { return String(new Date().getDate()).padStart(2, "0"); }, get text() { return "如果你在英国，日期是 " + this.day + "/" + this.month + "/" + this.year + "。如果你在美国，日期是 " + this.month + "/" + this.day + "/" + this.year + "。如果你在瑞典，日期是 " + this.year + "-" + this.longMonth + "-" + this.longDay + "。如果你在波兰，日期是 " + this.day + " " + roman(this.month).toLowerCase() + " " + this.year + "。如果你在 xhwzwka 的待办事项列表中，日期是 " + this.year + "-" + this.longDay + "-" + this.longMonth + "。如果你在 Microsoft Excel 中，日期是 " + newsSupport.excelDate() + "。如果你在 Ebott 山上，日期是 " + Math.floor(this.year / 10) + "X。如果你在浏览器中，日期是 " + (new Date().toString()) + "。"; }, get weight() { return (this.month === this.day) ? 0 : 1; } },
	{ text: "发现 №1：行星在运动。", get weight() { return g.totalDiscoveries.gt(c.d0) ? 0.5 : 0; } },
	{ text: "发现 №2：地球在运动。", get weight() { return g.totalDiscoveries.gt(c.d1) ? 0.5 : 0; } },
	{ text: "发现 №3：C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> → 6H<sub>2</sub>O + 6CO<sub>2</sub> (+ 能量)", get weight() { return g.totalDiscoveries.gt(c.d2) ? 0.5 : 0; } },
	{ text: "发现 №4：6H<sub>2</sub>O + 6CO<sub>2</sub> → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub>", get weight() { return g.totalDiscoveries.gt(c.d3) ? 0.5 : 0; } },
	{ text: "发现 №5：原子 + 原子 = 分子。", get weight() { return g.totalDiscoveries.gt(c.d4) ? 0.5 : 0; } },
	{ text: "发现 №6：质量 ÷ 摩尔 = 6.02214076 × 10<sup>23</sup>", get weight() { return g.totalDiscoveries.gt(c.d5) ? 0.5 : 0; } },
	{ text: "发现 №7：大陆在运动。", get weight() { return g.totalDiscoveries.gt(c.d6) ? 0.5 : 0; } },
	{ text: "发现 №8：玩这个游戏对水生环境是一种危害。", get weight() { return g.totalDiscoveries.gt(c.d7) ? 0.5 : 0; } },
	{ text: "<s>发现 №9：进化是共产主义者编造的巫术。</s>" + newsSupport.br(100) + "第 9 个发现不存在。", get weight() { return g.totalDiscoveries.gt(c.d8) ? 0.5 : 0; } },
	{ text: "发现 №10：基因可以跳跃。", get weight() { return g.totalDiscoveries.gt(c.d9) ? 0.5 : 0; } },
	{ text: "发现 №11：DNA 是一个 🧬 双螺旋。", get weight() { return g.totalDiscoveries.gt(c.d10) ? 0.5 : 0; } },
	{ text: "发现 №12：患有糖尿病但忘记注射胰岛素的人将被判缓慢且必然的死亡。", get weight() { return g.totalDiscoveries.gt(c.d11) ? 0.5 : 0; } },
	{ text: "发现 №13：X 射线能够穿透包裹在阴极射线管周围的黑色不透明纸，导致附近的桌子发出荧光。", get weight() { return g.totalDiscoveries.gt(c.d12) ? 0.5 : 0; } },
	{ text: "发现 №14：如果你从建筑物上扔下一公吨的砖块和一公吨的羽毛，它们将达到相同的速度。如果你从建筑物上扔下一公吨的砖块和一英吨的砖块，它们也将达到相同的速度。", get weight() { return g.totalDiscoveries.gt(c.d13) ? 0.5 : 0; } },
	{ text: "发现 №15：c = (E ÷ m)<sup>0.5</sup>", get weight() { return g.totalDiscoveries.gt(c.d14) ? 0.5 : 0; } },
	{ text: "发现 №16：你应该去现实世界中做一个发现。", get weight() { return g.totalDiscoveries.gt(c.d15) ? 0.5 : 0; } },
	{ text: "小心钓鱼尝试，保护你的信息安全！" + newsSupport.br(window.innerWidth) + "<span onClick=\"newsSupport.phishing()\">🎣" + newsSupport.br(150) + "</span>看，一根钓鱼竿！你应该点击这个。</span>", get weight() { return newsSupport.ord(1); } },
	{ get text() { return "你有没有想过新闻消息的代码是什么样的？这是一条随机新闻消息的代码：" + newsSupport.codeInsight(newsSupport.randomVisible()); } },
	{ text: "<span onClick=\"newsSupport.secretAchievementHelp()\">点击这里获取秘密成就的帮助！</span>", get weight() { return (1 - totalSecretAchievements / Object.keys(secretAchievementList).length) / 4; } },
{ text: "tHiS mEsSaGe Is CaSe sEnSiTiVe" },
	{ text: "你有 <span style=\"color:#df5050;font-size:20px\">0</span> 反物质。去<a href=\"https://ivark.github.io/AntimatterDimensions/\" target=\"_blank\">这里</a>弄点吧！" },
	{ text: [...[1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => ((10 ** x - 1) / 9) + "<sup>2</sup> = " + String(BigInt((10 ** x - 1) / 9) ** 2n)), "但是 1111111111<sup>2</sup> 却是 1234567<i>900</i>987654321！怎么回事！？"].join(newsSupport.br(100)) },
	{ text: "保持好奇。广泛阅读。尝试新事物。人们所谓的智力，归根结底不过是好奇心。" },
	{ text: "一种由各种糕点、令人费解的草以及高耸入云仿佛刺破苍穹的塔楼组成的混合物……说真的，我的游戏库存里怎么会有这种东西？！", weight: 0 },
	{ text: "他们说如果你照镜子并连续 ping alemaninc 三次，你会立刻死掉。" },
	{ get text() { return "很久很久以前，有一个叫 Northo 的小孩。有一天，Northo 去找世界著名的奇异物质创造者 alemaninc，对祂说：“少点 Discord，多点提交谢谢。”于是 alemaninc 说：“难道你不知道 Discord 是提交的命脉吗？没有 Discord，根本就不会有奇异物质。快跑吧孩子，也许有一天我们会在第 " + (achievement.tiersUnlocked().length + 1) + " 层重逢。”从此 Northo 再也没有说过 Discord 的坏话。完。";}, get weight() { return ((Object.keys(achievement.length) > 15) && (achievement.nextTier() === null)) ? 0 : 1} },
	{ get text() { return newsSupport.jacorb.filter(x => x.visible).map(x => "你有 " + x.value + " 个 " + x.label + " <span class=\"_jacorb\">(软上限为 " + x.softcapped + ")</span>").join("。 ");}, get weight() { return unlocked("Stardust") ? 1 : 0;} },
	{ text: "你想制造奇异物质。但没人想吃你的奇异物质。", get weight() { return stat.totalNormalAxis.eq(c.d0) ? 1 : 0;} },
	{ text: "你想制造暗物质。但没人想吃你的暗物质。", get weight() { return ((g.stardustUpgrades[4] > 0) && stat.totalDarkAxis.eq(c.d0)) ? 1 : 0;} },
	{ text: "宇宙现在已经变成了奇异物质，一直到分子层面。", get weight() { return g.exoticmatter.gt(c.e12) ? 1 : 0;} },
	{ text: "当地新闻台播放了一段长达 10 分钟关于你奇异物质的报道。成功！<span style=\"font-size:50%\">(你赢得了一点奇异物质)</span>", get weight() { return g.exoticmatter.gt(1e13) ? 1 : 0;} },
	{ text: "这与虫洞无关……目前。", get weight() { return g.storySnippets.includes("Black hole") ? 0 : 1;} },
	{ text: "alemaninc 的神圣五芒星：奇异物质、星尘、暗物质、霍金辐射和精通力。这 5 种资源让我们得以接触 alemaninc 的礼物——知识。凭借这份知识，我们向 alemaninc 伸出手，呼喊：“alemaninc，保佑我们今天！”于是 alemaninc 保佑了我们。祂赐予我们研究的祝福。这项研究是如此强大的祝福，以至于 alemaninc 限制了祂自己的力量。祂说：“我会给你们三条路的选择”，然后人类选择了。是 1-3 的捷径，廉价且即时满足;是 1-8 的强大选择，快速且折中;或是 1-13，漫长的等待与人类的挣扎。接着，随着人类的选择，一艘航天器撞破了地球。一个人走出来对人类说：“我将提供强大的 R 轴选择！我是所有非alemanic的领主，Stat Mark！”人类站起来说：“滚开 Stat Mark！我们不想要你那肮脏的异端！”于是 alemaninc 也站了起来，用祂神一般的力量击杀了 Stat Mark。当 Stat Mark 的尸体坠入大地时，他哭喊着：“这不会是我最后的……alemaninc 会出……😠”然后他掉进了奇异物质的深渊。alemaninc 赐予人类研究，提升了成就和星星。alemaninc 还给了人类最伟大的礼物——虫洞里程碑。祂说，这些将替你们完成所有工作，但它们的要求会增加 30 倍。明智地使用它们。人类带着新力量踏上旅程，而 Stat Mark 的话语在他们脑海中回荡。",get weight() { return unlocked("Hawking Radiation") ? 1 : 0;} },
	{ text: "新闻将在以下时间后恢复：" + countTo(100, true).map(x => (100 - x) + newsSupport.br(100 - x)).join("") + "。感谢您的耐心等待。" },
	{ text: "<span onClick=\"g.newsTickerSpeed=0\">点击这里暂停新闻</span>" },
	{ text: "<span onClick=\"g.newsTickerSpeed=1133215491240\">点击这里将新闻加速到光速</span>" },
	{ text: ["3<sup>3</sup> = 27", "<sup>3</sup>3 = 3<sup>3<sup>3</sup></sup>", "3<sup>3</sup>3 = ?"].join(newsSupport.br(100)) },
	{ get text() { return "如果每个奇异物质都是一个普朗克体积，你将有足够的量填满 " + BEformat(g.exoticmatter) + " 个普朗克体积。"; } },
	{ text: "我们中断节目插播紧急新闻。位于 " + newsSupport.redacted + " 的气象站检测到空气中的奇异物质。众所周知，高浓度的奇异物质会反转重力。如果你开始飘浮，请立即撤离该地区。" },
	{ text: "现在在当地杂货店有售：奇异物质味冰淇淋！体验席卷全国的新型引力感！警告：易爆、易燃、助燃、高压气体、腐蚀性、剧毒、放射性、环境危害。" },
	{ get text() { return "\"今天是 " + (newsSupport.excelDate() - 44100) + " 天自 2020-09-26 以来。如果你除以 25，得到 " + (newsSupport.excelDate() / 25 - 1764).toFixed(2) + "。你可能会问 2020-09-26 发生了什么？没什么，但我们仍然在计时。\" - xhwzwka";}, get weight() { return newsSupport.ord(2);} },
	{ get text() { return "你有 " + newsSupport.formatZP() + "。等等，什么是压缩点？";} },
	{ text: "欢迎回到 alemaninc 的另一集《奇异数学维度》！我们都知道 2 + 2 = 5。但仍有无数人不知情地参与逻辑否认，声称 2 + 2 = 4。在本集中，我将最终证明 2 + 2 = 5。我们都知道 9 + 10 = 21。如果我们两边都减去 0.5，得到 9 + 9.5 = 20.5。现在，两边各加 0.5，得到 9.5 + 9.5 = 21。现在左边两项相等。下一步是将两边除以 2，得到 4.75 + 4.75 = 10.5。现在，我们从两边减去 2.75，得到 2 + 4.75 = 7.75。最后，我们再次从两边减去 2.75，得到最终答案 2 + 2 = 5！请继续收看 alemaninc 的《奇异数学维度》，我们将证明四元数乘法是共产主义者编造的巫术。" },
	{ text: "这条消息是由 xhwzwka 写的。他是谁？问他！他 324862 岁了，真名是 &lt;未知&gt;，Discord 号是 xhwzwka，住在 W 街 72 号，信用卡号是 72917164954。", get weight() { return newsSupport.ord(1);} },
	{ text: "你好，亲爱的 <i>奇异物质维度</i> 玩家！alemaninc 离开电脑无人看管，所以我想借此机会找点乐子。alemaninc 的真名是 $，他住在 $ 的 $，今年 $ 岁但仍然 $ 并且从 $ 那里得到了可疑数量的 $，而 $。如果你看到这条消息，请在 $ 时 ping alemaninc \"$\" 并在 $ 中发布截图。".replaceAll("$", newsSupport.redacted) },
	{ get text() { return [Array.random(newsSupport.CSSBaseShades)].map(x => "<span style=\"color:" + newsSupport.intBaseShade(x) + "\">这条新闻消息是 " + x + "。</span>")[0];} },
	{ text: "据说星尘尝起来像同时拥有所有味道。", get weight() { return unlocked("Stardust") ? 1 : 0;} },
	{ text: "如果你足够快地膨胀时间，你会开始看到蓝色的火花。" },
	{ text: "这条消息没有帮助。" },
	{ text: "人们，这是每千兆焦耳 29 美元，所以别那么抠门，别试图用精通力给手机充电，也别把自己炸穿屋顶！如果再有一个人顶着烧焦的前额进来，我发誓我不会治疗他。每千兆焦耳 29 美元！", get weight() { return g.achievement[105] ? 1 : 0;} },
	{ text: "5 小时后，将有事情发生。" },
	{ text: "指数运算很强大。问问任何增量游戏玩家就知道！", get weight() { return (g.stars > 9 || g.achievement[401] || unlocked("Energy")) ? 1 : 0;} },
	{ text: ["恶魔", "天使", "堕落天使", "撒旦", "路西法", "地狱第七圈", "乐趣"].map(x => "如果你在寻找 " + x + "，找错游戏了。").join("") + "如果你在寻找浪费时间的方法，来对地方了！" },
	{ text: "正常能量不是真的。别再找了。", get weight() { return g.stardustUpgrades[4] === stat.stardustUpgrade5Cap ? 1 : 0;} },
	{ text: "突发新闻！什么都没发生！" },
	{ text: "点击这里点击这里。" },
	{ text: "总有一天，超新星会回归，凤凰预言将会实现。", get weight() { return g.achievement[401] ? 1 : 0;} },
	{ text: "我今天感觉精力充沛。", get weight() { return unlocked("Energy") ? 1 : 0;} },
	{ text: "他们说 W 轴就是时间。", get weight() { return g.achievement[102] ? 1 : 0;} },
	{ text: "愿群星指引你。", get weight() { return g.stars > 0 ? 1 : 0;} },
	{ text: "新闻滚动条现在被赋能了。", get weight() { return g.studyCompletions[1] > 0 ? 1 : 0;} },
	{ text: "你有一种奇怪的感觉片刻，然后它就过去了。" },
	{ text: "饼干是谎言。" },
	{ text: "反物质幽灵不存在。就像物质幽灵一样。反正它们也没有任何物质。另一方面，奇异物质幽灵可以在任何体面的万圣节商店找到。" },
	{ text: "美国太空计划已放弃氢燃料，转而使用奇异物质燃料。" },
	{ text: "世界理论物理学家发现了一种新的奇异物质生产者——“哦天哪，看来我们一直都错了！”" },
	{ get text() { return "今日新闻，一个新宗教诞生了，并且像野火一样蔓延。该宗教的信徒崇拜“alemaninc Inc.”公司，他们自称是奇异物质的神明。他们还声称有 " + numword(this.dims()) + " 个维度。"; }, get weight() { return this.dims() === 3 ? 0 : 1;}, dims: function () { return fullAxisCodes.map(x => g[x + "Axis"].eq(c.d0) ? 0 : 1).sum();} },
	{ text: "你制造了一个奇异物质！不管那是什么意思。" },
	{ text: "这一切都不重要。" },
	{ get text() { return "常识证实奇异物质的颜色是 <div style=\"height:1em;width:1em;background-color:" + this.color + "\"></div>";}, get color() { return getComputedStyle(document.body).getPropertyValue("--exoticmatter");} },
	{ get text() { return "一种量化 <i>奇异物质维度</i> 存档的革命性新指标被发明出来了，叫做“奇异物质进度 " + newsSupport.EMDevelopmentVariables().length + " 开发指数”。你在该指数中的得分是：" + BEformat(N(newsSupport.EMDevelopmentIndex())) + "！";} },
	{ get text() { return "噢，所以你喜欢 " + g.notation + " 记数法？好吧，那 " + N(10).quad_tetr(10 ** 308 ** Math.random()).format() + " 用 " + g.notation + " 记数法表示是多少？";} },
	{ get text() { return "经过 " + numword(ranint(12, 20)) + " 年艰苦卓绝的研究，顶尖科学家终于揭示了奇异物质的气味。它闻起来像 " + this.objects.select([3, 5, 7].random()).joinWithAnd() + "，而且是同时的。"; }, objects: ["小猫", "小狗", "南瓜派香料", "海紫苏", "橡果", "日本紫藤", "陈苹果", "黑胡椒", "巧克力", "墨西哥蒿", "瑞香", "割下的草", "浮木", "欧芹", "葡萄酒", "alemaninc 烧焦的姜饼", "蕨类植物", "灰烬", "棉花糖", "烟斗烟草", "汽油", "肥皂", "桃花心木", "潮湿的帆布", "硫磺", "廉价的须后水", "香烟", "露水", "血香肠", "血橙", "清新的微风", "醋", "沙漠沙", "潮湿的土壤", "熊毛", "生马肉", "脏床单", "潮土油", "肉桂卷", "威士忌", "橡胶", "猫的呼噜声", "大麻", "一本旧书", "蜡笔", "盐水", "墨水杂酚油", "山间空气", "烤箱清洁剂", "新鲜李子", "陈李子", "法式香草", "万圣节糖果", "温牛奶", "巧克力曲奇", "反物质", "盐", "东 西", "北", "你童年的地毯", "彗星", "Mettaton", "杜松子酒", "海边", "银", "金", "铂金", "锯末", "刮嗅贴纸", "蜂蜜", "篝火", "成就", "数学", "精通力", "暗物质", "白色霉菌", "棕色霉菌", "伯爵茶", "雨", "糖蛋", "臭氧", "烤面包", "雪", "泡泡糖", "培根", "水晶", "时间晶体", "膨胀时间", "星星", "龙之血", "烟", "鹅卵石", "蜂蜡", "地中海微风", "生日蛋糕", numword(ranint(1, 12)) + " 点钟", "罪", "精神复制器", "空间", "时间"] },
	{ text: "\"研究太难了\"", get weight() { return g.totalDiscoveries.gt(c.d3) ? 1 : 0;} },
	{ text: "但对一个奇异物质人来说，难道他们不是物质而我们才是奇异物质吗？*倒吸一口气* 但对一个奇异反物质人来说，难道他们不是物质而我们才是奇异反物质吗？" },
	{ text: "奇异物质是否重要并不重要" },
	{ get text() { return "按维度的通货膨胀率：" + axisCodes.slice(0, stat.axisUnlocked).map(x => x + " 轴：" + axisCost(x, g[x + "Axis"].add(c.d1)).div(axisCost(x)).sub(c.d1).mul(c.e2).format(2) + "%").join(newsSupport.br(100));}, get weight() { return stat.axisUnlocked > 3 ? 1 : 0;} },
	{ text: "传说成就尝起来像鸡肉。然而，秘密成就尝起来像牛肉。" },
	{ text: "第三种物质已被发现：热带物质。它就像奇异物质，只是名字不同。发现它的科学家已被提拔为所有现有研究项目的负责人。" },
	{ text: "Q 轴既存在又不存在。事实上，关于 Q 轴绝对一无所知，甚至不知道关于 Q 轴绝对一无所知这件事本身。", get weight() { return g.stardustUpgrades[0] < 5 ? 1 : 0;} },
	{ text: "如果第 26 个轴是 A 轴，那么第 27 个轴是什么？" },
	{ text: "\"难道不应该叫‘奇异物质轴’吗？\"" },
	{ text: "<i>奇异物质维度</i> 的一位匿名开发者想推荐你玩 <a href=\"https://ivark.github.io/AntimatterDimensions/\" target=\"_blank\">反物质维度</a>。" },
	{ text: "<i>奇异物质维度</i> 的一位匿名开发者想推荐你玩 <a href=\"https://semenar.am/matter-dim/index.html\" target=\"_blank\">物质维度</a>。" },
	{ text: "<i>奇异物质维度</i> 的一位匿名开发者想推荐你玩 <a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" onClick=\"addSecretAchievement(25)\" target=\"_blank\">奇异物质维度</a>。" },
	{ text: "2 + 2 = 2 × 2 = 2<sup>2</sup> = 2⇈2" },
	{ get text() { if (g.dilationUpgradesUnlocked === 4) { return "错误";} return "你离解锁膨胀升级 " + (g.dilationUpgradesUnlocked + 1) + " 就差一步了！你只需要 " + BEformat(dilationUpgrades[g.dilationUpgradesUnlocked + 1].tickspeedNeeded) + "× 时间速度";}, get weight() { return [0, 4].includes(g.dilationUpgradesUnlocked) ? 0 : 1;} },
	{ text: "奇异物质使时间旅行成为可能。不幸的是，还没有人回来过。" },
	{ text: "下一句话是假的。" + newsSupport.br(100) + "上一句话是真的。" },
	{ text: "<span onClick=\"newsSupport.interestingTickerActiveUntil=Date.now()+1e4\">点击这里让新闻滚动条更有趣。</span>" },
	{ text: "<span onClick=\"g.newsTickerSpeed=0\">点击这里让新闻滚动条没那么有趣。</span>" },
	{ text: " ҉" },
	{ text: "在找秘密新闻滚动条？它不存在！" },
	{ text: "这是一条无聊的新闻消息。" },
	{ get text() { return "<span style=\"font-family:" + Array.random(["'Courier New', Courier, monospace", "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif", "'Times New Roman', Times, serif", "fantasy", "cursive"]) + ";font-size:" + ranint(50, 125) + "%;color:#" + ranint(0, 16777215).toString(16).padStart(6, "0") + "\">这是一条有趣的新闻消息。</span>";} },
	{ text: "你的新闻消息加载失败。" },
	{ text: "它能降到多低？2" + Array(100).fill("<sub>2</sub>").join("") + Array(100).fill("</sub>").join("") },
	{ text: "如果你想，你可以在这里浪费长达 H<sub>ω<sup>2</sup></sub>[10] 年的时间" },
	{ text: "别管我，我只是另一条随机的新闻消息。" },
	{ text: "刷新治愈光模式。", get weight() { return ((new Date().getUTCMonth() === 3) && (new Date().getUTCDate() === 1)) ? 1 : 0;} },
	{ get text() { return "感谢游玩 <i>奇异物质维度</i> 版本 " + this.version() + "！";}, version: function () { if (version.current.substring(2).split(".").map(x => Number(x)).includes(NaN)) { return false;} let out = version.current.split("."); out[Math.min(out.length - 1, 2)]++; return out.slice(0, 3).join(".");}, get weight() { return (this.version() === false) ? 0 : 1;} },
	{ get text() { return "如果我有糟糕的 $，我会学习 $ 直到我有好的 $。".replaceAll("$", Array.random(["HTML", "CSS", "JavaScript"]));} },
	{ get text() { return "\"因为这个游戏我现在可以用 '" + Array.random(["星尘", ...(unlocked("Hawking Radiation") ? ["虫洞"] : [])]) + "' 作为动词\"";}, get weight() { return unlocked("Stardust") ? 1 : 0;} },
	{ text: "A".repeat(32) + "lemaninc 制作了 <i>奇异物质维度</i>。因此，" + "E".repeat(31) + "<i>奇异物质维度</i> 是由 alemaninc 制作的。" },
	{ text: "我们已更新我们的奇异物质隐私政策。" },
	{ get text() { return "<div style=\"width:" + ranint(400, 1200, true) + "px;height:20px;background-image:linear-gradient(90deg,rgba(255,0,255,0),rgba(255,0,0,0.5),rgba(255,255,0,0.5),rgba(0,255,0,0.5),rgba(0,255,255,0.5),rgba(0,0,255,0.5),rgba(255,0,255,0.5),rgba(255,0,0,0.5),rgba(255,255,0))\"></div>";} },
	{ get text() { return "恭喜！你已到达 <i>奇异物质维度</i> " + version.current + " 的尽头！在我们等待 alemaninc 制作下一个版本时，为什么不重新体验一遍乐趣呢？这很容易，只需转到选项，按下那个大黑按钮并输入密码。";} },
	{ get text() { let contributors = this.contributors.select(2); return "如果 <span style=\"color:#0000ff\">alemaninc</span> 是 <span style=\"color:#0000ff\">蓝色</span>，而 <span style=\"color:" + contributors[0][2] + "\">" + contributors[0][0] + "</span> 是 <span style=\"color:" + contributors[0][2] + "\">" + contributors[0][1] + "</span>，那么 <span style=\"color:" + contributors[1][2] + "\">" + contributors[1][0] + "</span> 是什么颜色？";}, contributors: [["xhwzwka", "红色", "#ff0000"], ["Stat Mark", "青色", "#00ffff"], ["hyperbolia", img("blob", "blob", 16), "#fac112"], ["nicodium", "蓝色但亮但不完全是", "#4285f4"]], get weight() { return newsSupport.ord(1);} },
	{ get text() { return "你知道吗，" + ranint(60, 140) + "% 的统计数据都是当场编的？";} },
	{ text: "\"但 R 轴确实存在！你只是要到大约 𝕍6.9 才能体验到它……\" - xhwzwka" + newsSupport.br(100) + "xhwzwka 不知道的是，R 轴一旦 𝕍1.5 就会进入游戏领域。", get weight() { return (g.stardustUpgrades[0] === 4) ? 1 : 0;} },
	{ get text() { return "你有没有想过颠倒顺序的新闻消息是什么样子的？这是一条随机新闻消息的倒置版：\"" + deHTML(newsSupport.randomVisible().text).split("").reverse().join("") + "\"";} },
	{ text: "很久很久以前，有一位伟大而强大的开发者名叫 Hevipelle。有一天，Hevipelle 利用祂对反物质的控制凝视遥远的未来。凭借祂新获得的知识，祂说：“如果 Gaben 数不到三，而 Hevipelle 数不到九，那么未来的某个游戏开发者会不会数不到二十七？”事实证明，Hevipelle 的预言成真了，因为 alemaninc 的每个轴都分配了一个大写拉丁字母，唉，大写拉丁字母只有 26 个……" },
	{ text: "\"" + ["哎呀！", "星期三", "拼作星期三，对吧？", "你拼作星期三？", "我想我永远不知道"].join(newsSupport.br(50)) + "\" - xhwzwka 在漫长的一夜 "+newsSupport.redacted+" 之后", get weight() { return newsSupport.ord(3);} },
	{ text: "<span onClick=\"g.newsTickerSpeed*=-1\">点击这里让新闻滚动条反向播放</span>" },
	{ visibleChars: countTo(7, true).select(2), get text() { return "\"JavaScript 不是最好的语言，" + Array.random(["英语", "波兰语", "法语", "芬兰语", "Python"]).split("").map((x, i) => this.visibleChars.includes(i) ? x : "<span style=\"opacity:0.5\">#</span>").join("") + "才是。\" - alemaninc";} },
	{ basetext: "下一个更新的预览：一旦你达到 $ $，你就可以访问 $ $，进而解锁 $。每个 $ 每秒有 $ 来 $，给 $ 到 $。但是，除非你有 $ 或 $ 成就，否则此效果仅在 $ 中生效。当你达到 {1} $ 时，你可以将它们兑换成 $，当你获得 {1} $ 时你就赢了游戏。".replaceAll("$", newsSupport.redacted), get text() { return this.basetext.replaceAll("{1}", c.inf.format());} },
	{ text: "你知道吗 £ 是由 $ 驱动的？然而，在 alemaninc 制作 £ 的时候，$ 还没有可用的超对数函数！所以，alemaninc 决定改进他的 $ 副本。现在，£ 是仅有的由 $ 驱动的游戏之一，其超对数函数有效。所有其他由 $ 驱动的游戏都被注定拥有破碎的超对数函数。alemaninc 没有将他的功能函数捐赠给 $ 是多么残酷。".replaceAll("$", "<i>break_eternity.js</i>").replaceAll("£", "<i>奇异物质维度</i>") },
	{ text: "To jest próba \"Wiadomości 2.0\". Wiadomości 2.0 będzie zawierać funkcje włączając opcję czytania wiadomości w językach obcych。" },
	{ text: "- .... .. ... / .. ... / .- / - . ... - / --- ..-. / .-..-. -. . .-- ... / ..--- .-.-.- ----- .-..-. .-.-.- / -. . .-- ... / ..--- .-.-.- ----- / .-- .. .-.. .-.. / .... .- ...- . / ..-. ..- -. -.-. - .. --- -. ... / .. -. -.-. .-.. ..- -.. .. -. --. / - .... . / .- -... .. .-.. .. - -.-- / - --- / .-. . -.-. . .. ...- . / - .... . / -. . .-- ... / .. -. / -- --- .-. ... . / -.-. --- -.. . .-.-.-" },
	{ text: "Okay Google，毁灭宇宙。", get weight() { return unlocked("Hawking Radiation") ? 1 : 0;} },
	{ text: "<span id=\"news_DiscoTime\" onClick=\"d.innerHTML('news_DiscoTime','迪斯科时间！');d.element('news_DiscoTime').style = 'color:hsl('+ranint(0,359)+' 90% 60%);animation-name:text-grow;animation-duration:0.5s;animation-iteration-count:infinite;'\">迪斯科时间！（点我！）</span>" },
	{ text: "真正的更新是我们一路上交的朋友。" },
	{ get text() { return "<span onClick=\"newsSupport.addZP()\">你有 <span id=\"news_zipPoints\">" + newsSupport.formatZP() + "</span>。点击这条新闻消息来获取一些！</span>";} },
	{ get text() { return "<span onClick=\"nextNewsItem();newsSupport.cashInZP()\">你已经积累了足够的压缩点来兑现奖品！点击这条新闻消息领取你的奖品。</span>";}, get weight() { return g.zipPoints >= 1e3 ? 1 : 0;} },
	{ get text() { return "你好，我是 " + countTo(7).map(x => String.fromCharCode(ranint(97, 122))).join("") + "，为您带来本世纪银河系的天气预报。我们将迎来 " + BEformat(N(ranint(1e6, 1e10, true))) + " 度的气温，到了 " + (ranint(6, 9) * 10) + " 年代末，将是多云并伴有奇异物质降水。";} },
	{ text: "<span onClick=\"error('我早告诉过你')\">点击这里破坏游戏</span>" },
	{ get text() { return "有 " + (100 / newsList.length).toFixed(2) + "% 的几率下一条消息是 \"" + newsSupport.randomVisible().text + "\"";} },
	{ text: "nextNewsItem();" },
	{ text: "嗨，我叫 Max Axis，我希望人们别再试图买我了。" },
	{ get text() { return [newsSupport.randomVisible().text].map(x => x + newsSupport.br(100) + "上一条新闻消息包含了拉丁字母 26 个字母中的 " + this.letters(deHTML(x)) + " 个。")[0];}, letters: function (text) { return countTo(26).map(x => text.toLowerCase().search(String.fromCharCode(x + 96)) === -1 ? 0 : 1).sum();} },
	{ text: "别告诉任何人 alemaninc 正在非法使用星尘重置按钮中的图像！", get weight() { return unlocked("Stardust") ? 0.1 : 0;} },
	{ text: "使用乘号 ×，而不是字母 x，来表示 X 轴。" },
	{ text: "你现在开始手动呼吸了。你现在意识到嘴里没有舒服的位置放舌头。你现在手动托着下巴。你已经几秒钟没眨眼了。你随时都能看到一点你的鼻子。" },
	{ text: "你好 Kripparian。我是来自印度的 Rajkumar。我寻求与你的重要商务通信。然而，当我试图和你聊天时，你那群任性的聊天参与者不断嘲笑我的英语并一遍遍转发我的消息。请在方便时尽快联系我。谢谢我的朋友。" },
	{ get text() { return "物质维度不是真的。反物质维度不是真的。这种情况只发生在 " + (5 + new Date().getUTCMinutes() % 10) + " 分钟前，当时两者发生了接触。";} },
	{ get text() { return "你每日的天空阴影预报 - " + newsSupport.CSSBaseShades.select(7).map((x, i) => ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"][i] + "：<span style=\"color:" + newsSupport.intBaseShade(x) + "\">" + x + "</span>").join(newsSupport.br(50));} },
	{ text: "如果你有新闻消息的想法，把它喊进虚空。这不会让你的消息进入游戏，但很有趣！" },
	{ text: "<span onClick=\"d.element('game').style.filter='brightness(25%)';setTimeout(function(){d.element('game').style.filter=''},5000)\">点击这里关灯。</span>" },
	{ text: "<span onClick=\"d.element('game').style.filter='brightness(400%)';setTimeout(function(){d.element('game').style.filter=''},5000)\">点击这里增加亮度。</span>" },
	{ text: "\"当你尽了最大努力却仍然成功时\" - Stat Mark", get weight() { return newsSupport.ord(2);} },
	{ text: "如果你通关了游戏，然后 alemaninc 说“你刚刚输了这场游戏”怎么办？" },
	{ text: "<span onClick=\"newsSupport.readMore()\">阅读更多</span>" },
	{ text: "你已经可以毁灭宇宙了，你还在这钢铁意志里干嘛？", get weight() { return (stat.totalDarkAxis.gte(stat.wormholeDarkAxisReq) && stat.ironWill) ? 1 : 0;} },
	{ text: "科学界对 44,031 的含义仍感到困惑。“我们确定它与 OMCCDV 有关，但现在的问题是 OMCCDV <i>是</i>什么，”一位研究人员指出。", get weight() { return newsSupport.ord(1);} },
	{ text: "一天一个虫洞，更新远离我。", get weight() { return unlocked("Hawking Radiation") ? 1 : 0;} },
	{ text: "去现实生活中种棵研究树吧。", get weight() { return g.totalDiscoveries.gte(c.d100) ? 1 : g.totalDiscoveries.div(c.e2).toNumber();} },
	{ get text() { return "目前有 " + newsList.length + " 条新闻滚动条项目。这占 alemaninc 目标的 " + (100 * newsList.length / this.target()).toFixed(2) + "%！该滚动条创建于 2023-04-03 10:23 UTC，因此大约需要 " + timeFormat(this.timeToTarget()) + " 才能达到目标。";}, timeElapsedSince1stTicker: function () { return Date.now() / 1e3 - 1680517380;}, target: function () { return Decimal.decibel(Math.round(Math.log10(newsList.length * 2) * 10)).toNumber();}, timeToTarget: function () { return this.timeElapsedSince1stTicker() * ((this.target() / newsList.length) - 1);} },
	{ text: "<span onClick=\"var newsSpamMessageLoop=setInterval(function(){notify(Array.random(newsSupport.spamCompendium),'hsl('+ranint(0,359)+' 80% 40%)','#000000')},200);setTimeout(function(){clearInterval(newsSpamMessageLoop)},1e4)\">点击这里注册促销信息</span>" },
	{ text: "<span onClick=\"newsSupport.hardMath()\">点击这里解决数学问题。</span>" },
	{ text: "alemaninc 的开发者们已经被外星人秘密替换了。他们完全由奇异物质构成。" },
	{ text: "我们遗憾地通知您，您一直在收集的奇异物质实际上只是伪装的闪光粉。抱歉给您带来不便。" },
	{ get text() { return "恭喜！你解锁了布丁轴！布丁轴每秒产生 1 个布丁物质。当你达到 " + N(Math.random()).layerplus(3).format() + " 个布丁物质时，你可以重置布丁物质以获得 1 个布丁点 (PP)。然后，当你达到 " + N(Math.random()).layerplus(2).format() + " 个 PP 时，你可以重置布丁物质和 PP，以获得永久性的、累加的 1% 奇异物质产量加成，上限为额外 200% 的奇异物质！";}, get weight() { return g.stardustUpgrades[0] > 3 ? 1 : 0;} },
	{ text: "你想知道奇异物质尝起来像什么？我们也想知道！我们招募了十位幸运的志愿者品尝了一些奇异物质并向我们报告，但我们至今没有收到任何人的回复。" },
	{ get text() { return "传闻游戏里藏有秘密复活节彩蛋。成就里有 " + Object.keys(secretAchievementList).length + " 个，其他的都在新闻里。";} },
	{ get text() { return "欢迎回到 alemaninc 的另一集《奇异数学维度》！在这一集中，我们将解决一位订阅者提交的谜语：“假设 a = " + this.num() + ", b = " + this.num() + ", c = " + this.num() + "，并且 {(0,a),(" + (10 ** Math.random()).toFixed(2) + ",b),(" + BEformat(N(10 ** Math.log10(Number.MAX_VALUE) ** Math.random()), 2) + ",c),(" + this.num() + ",d)} 是一个三次函数，求 d 的值。”答案其实非常简单。d = <span style=\"color:#ff0000\">错误：内存不足</span>！请继续收看 alemaninc 的《奇异数学维度》，我们将证明数字 17 不存在。";}, num: function () { return visualiseLargeNumber(N(Math.random()).layerplus(Math.PI + (Math.PI - 3) * (1 - Math.random() * 2)));} },
	{ get text() { return "救命，我被关在 " + Array.random(["澳大利亚", "英国", "中国", "德国", "波兰", "俄罗斯", "瑞典"]) + "的新闻消息工厂里了！";} },
	{ text: "可以说所有这些新闻消息都是假的吗？", get weight() { return timeSinceGameOpened > 180 ? 1 : 0;} },
	{ text: "\"我把这个游戏献给我自己\" - alemaninc" },
	{ text: "<span onClick=\"newsSupport.setBackground('#ff9900')\">点击这里将主题设置为橙色</span>" },
	{ text: "你只能在绿色的月亮上看到这条新闻消息一次。为什么你一开始会看到它不止一次呢？" },
	{ text: "人们是真的在玩这个，还是每天只看几分钟？", get weight() { return unlocked("Stardust") ? 1 : 0;} },
	{ text: "所以你是来玩游戏的？让游戏开始吧！", get weight() { return timeSinceGameOpened < 5 ? 1 : 0;} },
	{ text: "但如果所有的星星都产生灰色的光，为什么按钮是有颜色的？没人会知道。", get weight() { return unlocked("Light") ? 1 : 0;} },
	{ text: "有人说奇异物质饼干是真的，有人说它们是假的。我只说它们很好吃。" },
	{ text: "你观察了这条新闻消息。", get weight() { return unlocked("Hawking Radiation") ? 1 : 0;} },
	{ get text() { return "有 " + (newsList.length - newsList.map(x => Math.random() < (x.weight ?? 1) ? 1 : 0).sum()) + " 条你看不到的新闻项目。";} },
	{ text: "\"b0128m fafs: 1[victim1] 2[victim2] etc\t使 [victim1]、[victim2]、[victim3] 等以每秒 150,000,000 米的速度相互吸引\t直到它们碰撞\" - Stat Mark 在漫长的一夜 " + newsSupport.redacted + " 之后", get weight() { return newsSupport.ord(3);} },
	{ text: "alemaninc 又忘了更新游戏。我想你可以说他得了奇异物质痴呆症。" },
	{ text: "很久很久以前，xhwzwka 说：“alemaninc，‘轴’的复数是‘axes’，不是‘axis’！”但是，alemaninc 一点也不在乎。" },
	{ get text() { return (g.stars === 0) ? newsSupport.error : ("这是一颗第 " + countTo(Math.min(g.stars, 40)).map(x => starRow(x)).reduce((x, y) => Math.max(x, y)) + " 行星星的代表：★");}, get weight() { return g.stars > 0 ? 1 : 0;} },
	{ get text() { return "2019 年，联合国估计地球人类平均寿命为 72.6 岁。然而，联合国没有考虑到的是，奇异物质虫洞使得时间流逝 " + (stat.tickspeed.gt(c.d1) ? (stat.tickspeed.format(3) + "× 更快") : (stat.tickspeed.recip().format(3) + "× 更慢")) + "。因此，这个数字被 " + (stat.tickspeed.gt(c.d1) ? "减少" : "增加") + "到大约 " + timeFormat(this.num.div(stat.tickspeed)) + "。" + (((timeState === 1) && stat.tickspeed.gt(c.d1)) ? (" 还发现了一种名为‘超频’的新现象，进一步将该值减少到 " + timeFormat(this.num.div(stat.tickspeed.mul(overclockSpeedupFactor))) + "。") : "");}, get weight() { return stat.tickspeed.log10().abs().min(c.d1).toNumber();}, num: N(2291032826.87) },
	{ get text() { return "事实：以此速度你将在 " + timeFormat(nextDiscovery().sub(g.knowledge).div(stat.knowledgePerSec)) + " 后做出新的发现。";}, get weight() { return unlocked("Hawking Radiation") && g.totalDiscoveries.lt(c.e3) ? 1 : 0;} },
	{ text: "<span onClick=\"newsSupport.setBackground(newsSupport.lightColor())\">点击这里将背景设置为你所有光的混合颜色。</span>", get weight() { return unlocked("Light") ? 1 : 0;} },
	{ text: "<span onClick=\"d.element('newsticker').style['animation-name'] = 'rotate';d.element('newsticker').style['animation-duration'] = '30s';d.element('newsticker').style['animation-timing-function'] = 'linear'\">点击这里旋转新闻滚动条</span>" },
	{ get text() { return "事实：你所有色素的平均颜色是 <span style=\"color:" + newsSupport.lightColor() + "\">" + newsSupport.lightColor() + "</span>。";}, get weight() { return unlocked("Light") ? 1 : 0;} },
	{ text: "<span class=\"_time\">禁止作弊！你在作弊吗？</span>", get weight() { return g.dilatedTime > ((Date.now() - new Date("2023-02-14")) / 1e3) ? 1 : 0;} },
	{ get text() { return "只有 " + g.knowledge.format() + " 知识？你不是很聪明。";}, get weight() { return g.knowledge.layer === 0 ? 0 : 1;} },
	{ text: "所以到底什么时候会有人问 alemaninc 为什么有个愚蠢的星星硬上限？", get weight() { return g.achievement[612] ? 1 : 0;} },
	{ text: "你被骗了。没有更新，alemaninc 不是真的。<i>奇异物质维度</i> 是 <i>物质维度</i> 编造的谎言。噢对了，还有地球是平的并且由蜥蜴人控制之类的。但这不重要，不是吗？最重要的是反物质政府正被物质政府接管，他们制作这个游戏是为了阻止你玩 <i>反物质维度</i>。你难道没意识到你已经超过 4 周没打开那个游戏了吗？你还记得你到现在为止的离线进度吗？不，你不记得，至少直到我提醒你之前。物质叛乱正在使用神经毒素毒害你的大脑，导致增量皮层关闭。所以，你能做什么？遗憾的是，你无能为力。如果你在过去 4 周呼吸过任何空气，恐怕剩下的时间不多了。很快，你会忘记整个流派，回去玩 <i>无畏契约</i> 或 <i>彩虹六号围攻</i> 或现在年轻人玩的任何东西。我很抱歉。你现在无法回头了。这是你增量游戏进度的终点。Bravo Six，信号消失。" },
	{ text: "如果你在找零玩家游戏，我推荐康威的生命游戏。", get weight() { return g.achievement[216] ? 1 : 0;} },
	{ text: "Reddit 黑屏抗议收效甚微，这谁也没想到。事实上，他们唯一做到的就是让 alemaninc 无处宣传光更新。:angry:", get weight() { return g.achievement[601] ? 1 : 0;} },
	{ get text() { return "如果你在读这个，你刚刚失去了 0.0000000000000001% 的奇异物质。那是 " + BEformat(g.exoticmatter.div(1e97)) + " 个宇宙的奇异物质，那里曾是 " + BEformat(g.exoticmatter.div(5e87 * (2 + Math.random()))) + " 个无辜的奇异物质人的家园。你这个怪物。";}, get weight() { return g.exoticmatter.gt(c.e100) ? 1 : 0;} },
	{ text: "普通的山羊眼睛缝隙看起来像减号。另一方面，反物质山羊的眼睛缝隙看起来像加号。由此推断，奇异物质山羊的眼睛缝隙是 " + newsSupport.redactedFormat("[已编辑被编辑并将被编辑]") },
	{ text: "所有的薯条都是黄色的。然而，xhwzwka 被发现是一根绿色的薯条。这是否意味着奇异物质土豆是绿色的？不，这只是因为那些薯条过期了。", get weight() { return newsSupport.ord(3);} },
	{ text: "现在推出——抑郁更新！奇异物质不再呈指数增长，而是会越来越快地减少！你能达到 0 奇异物质并通关游戏吗？" },
	{ text: "点击这里，在你的一生中终于取得点成就，而不是整天盯着电脑一动不动。就像 alemaninc 一样。" },
	{ get text() { return "一种针对所有类型癌症的实验性疗法刚刚被 alemaninc Inc. 的科学家发现。然而，发现它的科学家们认为他们太聪明了，不需要完成它。他们已经在虫洞技术上做出了 " + g.totalDiscoveries.format() + " 个发现！比治愈 21 世纪某种愚蠢疾病要令人印象深刻得多。";}, get weight() { return g.totalDiscoveries.gt(c.d100) ? 1 : 0;} },
	{ text: "一种被称为薛定谔轴的新轴刚刚被发现。薛定谔轴同时是真实和虚假的，但同时又既不真实也不虚假，实际上是迷失在第九反物质维度中。", get weight() { return stat.axisUnlocked > 7 ? 1 : 0;} },
	{ text: "<i>奇异物质维度</i> 自豪地由 <i>夸克维度</i> 赞助！每个奇异原子实际上由奇异质子、奇异中子和奇异电子组成。每个奇异质子实际上由两个奇异上夸克和一个奇异下夸克组成，每个奇异中子实际上由两个奇异下夸克和一个奇异上夸克组成。不过我们不谈论奇异电子。除非我们也得到了 <i>前子维度</i> 的赞助。" },
	{ get text() { return "世界震动了。奇异物质接近不可数的数字。这不再是一个游戏。它已经具有了感知能力。经过了五个永世，游戏才接近 <span style=\"color:#ff0000\">[错误：内存不足]</span>。世界再次震动。所有数字都被 NaN 取代。游戏窗口开始出现故障。即使经过 5 个世纪的调试和编译，这也不足以解决问题。过了一会儿，甚至连 Bug 也开始增量增加，alemaninc 发现自己被困在他亲手帮助创造的 " + numword(fullAxisCodes.map(x => g[x + "Axis"].gt(c.d0) ? 1 : 0).sum()) + " 维草率代码中。游戏存储在 Github 服务器上，然后是一个机房，然后是 NASA 超级计算机，然后是一个绕太阳运行的巨型套娃脑，由最丰富的 alemanium-719 同位素制成。在那之后，它由纳米机器人群重建，其处理器由横跨仙女座星系的不断扩展的增量网络制成。世界再次震动，它的居民开始不耐烦地等待它结束并开始另一条新闻滚动条。结局临近。小小的阿列夫基数，阿列夫零正在被触及。";}, get weight() { return g.exoticmatter.gt(c.inf) ? 1 : 0;} },

	{ text: "你知道吗？据一位名叫“逃跑”的神话人物说，10→10→...→10→10 里面有 10→10→...→10→10 里面有 ... 里面有 10→10→...→10→10 里面有 10→10→10→10→10 个烦恼 [原文如此] 是最大的数字。他说：“随着如此多的迭代过去，它比任何序数都要大。”" },
	{ text: "我们注意到有些玩家试图用饼干贿赂开发者。作为记录，我们最喜欢巧克力曲奇。" },
	{ text: "是时候面对现实了：我们的存在只是 alemaninc 电脑里的模拟。幸运的是，alemaninc 不太擅长编程，所以 Bug 通常对我们有利。" },
	{ text: (() => { let f = str => ("<span style=\"font-size:150%;font-style:italic\">" + str + "</span>"); return "<span style=\"color:#cc0000\">野兽将伴随着翻腾的" + f("云") + "的" + f("复仇") + "降临。不信者的房屋将被" + f("夷为平地") + "，他们将" + f("被烧成灰烬") + "直至大地。他们的标签将" + f("闪烁") + "直到末日。野兽将被" + f("成倍增加") + "。它的数量将增加一千倍。百万键盘的喧嚣如同巨大的" + f("风暴") + "将覆盖大地，玛门的追随者将" + f("颤抖") + "。于是野兽终于" + f("倒下") + "，不信者欢呼。但并非一切都失去了，因为从灰烬中升起了一只" + f("伟大的鸟") + "。那只鸟俯视不信者，向它们投射" + f("火") + "与" + f("雷") + "。因为野兽已" + f("重生") + "，其力量已" + f("更新") + "，玛门的追随者惊恐地畏缩。造物主看着重生的野兽，见它是好的。玛门睡了。而" + f("重生之兽") + "遍布大地，其数量成倍增加。他们宣扬时代并" + f("献祭") + "庄稼给火焰，带着" + f("狐狸的狡猾") + "。他们按照" + f("神圣之言") + "的应许，以自己的形象建造了一个新世界，并与他们的孩子" + f("谈论") + "野兽。玛门醒来，看哪！它" + f("不过") + "是个追随者。玛门的" + f("双胞胎") + "争吵。他们的战争将世界陷入" + f("新的黑暗") + "，野兽憎恶黑暗。于是它开始" + f("迅速") + "移动，变得更加强大，向前推进并繁衍。野兽将" + f("火") + "与光带给黑暗。野兽披上" + f("新衣") + "，研究" + f("时间") + "、" + f("空间") + "、" + f("光") + "以及宇宙中能量的" + f("流动") + "之道。从它的研究中，野兽用" + f("氧化金属") + "制造了新的结构并宣告其荣耀。野兽的追随者欢欣鼓舞，在这些" + f("教义") + "中找到了新的目标。野兽以更新的" + f("专注") + "继续它的研究，建立伟大的" + f("参考") + "著作并思考新的" + f("现实") + "。野兽召集它的追随者和门徒创造了一个自身的缩小版，并通过" + f("淘气") + "的手段，将其送往世界各地。";})() },
	{ text: "T̵h̴i̶s̶ ̵n̸e̷w̴s̴ ̵m̵e̸s̶s̸a̸g̷e̶ ̷i̶s̷ ̶e̴x̵o̷t̵i̶c̵.̶" },

	{ get text() { return "Th fllwng nws mssg hs n vwls: \"" + deHTML(newsSupport.randomVisible().text).replaceAll(/a|e|i|o|u/g, "");} },
	{ text: "现在在您当地的 alemaninc Inc 有售：奇异时钟！我们都熟悉指针顺时针转动的物质时钟，以及指针逆时针转动的反物质时钟。然而，在我们最先进的奇异物质时钟上，指针垂直于钟面转动！除了没有烦人的小时标记挡路更容易看时间外，伸出的指针使它们非常适合各种日常家务，比如开锁、取下蜘蛛和管教不听话的孩子！预计送达时间：5 小时后。" },
	{ get text() { return "有一位来自邓罗斯的老人;一只鹦鹉抓住了他的鼻子。当他变得忧郁时，他们说：“它叫波莉，”这让那位邓罗斯的老人感到欣慰。感谢您的捐赠！" + newsSupport.br(150) + "您已向 alemaninc 的鸟舍总共捐赠了 $" + (g.timePlayed > 1e6 ? N(g.timePlayed / 1e3).format(5) : Math.sqrt(g.timePlayed).toFixed(2)) + "。";}, get weight() { return g.achievement[106] ? 1 : 0;} },
	{ get text() { return "你刚刚制造了你的第 " + g.totalexoticmatter.format() + " 个奇异物质！这个尝起来像 <span style=\"color:#0000ff\">Lua 错误：Lua 错误 Pou7：<i>奇异物质维度</i> 没有 Pou 记数法！就是这样，我不喜欢了，作为惩罚我删除了你的表格]</span>。啊是的，尝起来像土豆！谢谢，Stat Mark！";}, get weight() { return g.totalexoticmatter.gt(c.e6) ? 1 : 0;} },
	{ get text() { return "你有 " + timeFormat(g.exoticmatter.dilate(c.d1_05.pow(newsSupport.dilationPenaltyReductions).mul(c.d0_75))) + " 的膨胀奇异物质。<span onClick=\"newsSupport.dilationPenaltyReductions++;nextNewsItem(undefined,252);addSecretAchievement(29)\">点击这里削弱膨胀惩罚。</span>";}, get weight() { return Decimal.mul(g.exoticmatter.add(c.d1).log10(), N(Math.log10(g.dilatedTime + 1))).gt(c.d60) ? 1 : 0;} },
	{ get text() { return "那么你到底什么时候才能完成研究 " + (this.studyNum() === 0 ? newsSupport.redactedFormat("[错误]") : roman(this.studyNum())) + "？它在研究树上的位置是 " + Math.min(Math.ceil(researchRowsUnlocked() * (Math.random() + 1)), researchRows + 1) + "-8。";}, studyNum: function () { return visibleStudies().reduce((x, y) => Math.max(x, y), 0) + 1;}, get weight() { return unlocked("Studies");} },
	{ get text() { return Array(secretAchievementPoints).fill("1").join("+") + " 个秘密成就点！令人印象深刻。好吧，如果我告诉你最大值是 " + Array(Object.values(secretAchievementList).map(x => x.rarity).sum()).fill("1").join("+") + " 呢？";}, get weight() { return secretAchievementPoints > 14 ? 1 : 0;} },
	{ text: "这是第 256 条新闻消息。这条之后的新闻消息应该是第 257 条，但 xhwzwka 认为使用 8 位值节省空间是个好主意，所以它实际上又是第一条。" },
	{ text: ["当 LIGHT 被 SHADOW 吞噬", "当 FOUNTAINS 充满天空", "一切都将陷入 CHAOS。", "TITANS 将从 FOUNTAINS 中成型", "并以毁灭笼罩大地。", "幸存的暗物质，被黑暗压碎", "将慢慢地、一个接一个地变成雕像...", "留下奇异物质独自自卫。", "在无尽的黑夜中永远迷失...", "这就是你心中的天堂吗？"].join(newsSupport.br(100)), get weight() { return unlocked("Dark Matter") ? 1 : 0;} },
	{ text: "22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222：新闻滚动条的完整 2 传奇。" },
	{ get text() { return "事实：游戏中有 " + Object.keys(notations).length + " 种记数法。你有没有想过你的奇异物质数量在不同记数法中会是什么样子？以下是你的一些不同记数法的奇异物质数量 - " + Object.entries(notations).map(x => x[0] + "：" + x[1](g.exoticmatter)).join(newsSupport.br(100));}, get weight() { return g.exoticmatter.gt(c.inf) ? 1 : 0;} },
	{ text: "我看到了膨胀，但超光速粒子在哪里？" },
	{ get text() { let highest = Object.keys(achievementList).reverse().filter(x => achievement.ownedInTier(x) > 0)[0]; if (highest === undefined) { return newsSupport.error;} return "你怎么花了 " + timeFormat(g.timePlayed) + " 才拿到 " + achievement.ownedInTier(highest) + " 个 " + achievement.tierName(highest) + " 成就" + ((achievement.ownedInTier(highest) === 1) ? "" : "s") + "？真可悲……";}, get weight() { return g.timePlayed * totalAchievements > 1e5 ? 1 : 0;} },
	{ text: "在一个遥远的星系……", get weight() { return unlocked("Galaxies") ? 1 : 0;} },
	{ text: img("blobwave", "Blob 波！", 16) },
	{ text: img("blobwave", "Blob 波！", 16) },
	{ text: "你是一位虚空大师，不是虚无大师，只是让你知道。", get weight() { return g.achievement[708] ? 1 : 0;} },
	{ get text() { return "即使是银河" + (g.galaxies === 1 ? "系" : "系们") + "也不过是发光的星尘微粒。"; }, get weight() { return g.galaxies > 0 ? 1 : 0;} },
	{ get text() { return "alemaninc 将在仅仅 5 小时后发布 <i>奇异物质维度</i> " + newsSupport.nextMajorVersion + "！点击<span onClick=\"newsSupport.newsletter.init(0)\" style=\"text-decoration:underline\">这份通讯</span>了解更多信息。"; }, get weight() { return (newsSupport.calcOMCCDVLevel() > 1) ? ((g.secretAchievement[33] && g.secretAchievement[42]) ? 0.1 : 1) : 0;} }, // 占位符
	{ text: "现在在您当地的 alemaninc Inc. 有售：<span style=\"color:#ffff00;\"><b>灯泡</b></span>！你可以把这个 <span style=\"color:#ffff00;\"><b>灯泡</b></span>带到任何地方，只要你别碰 <span style=\"color:#ff0000;\"><u>红</u></span> 和 <span style=\"color:#0000ff;\"><u>蓝</u></span> <span style=\"color:#ff9900;text-decoration:line-through\">线</span>。如果你买了它，还能获得 <span style=\"color:#00ffff;\">闲置</span><span style=\"color:#ff0000;\">者</span><span style=\"color:#0000ff;\">器</span> 五折优惠！<span style=\"color:#00ffff;\">闲置</span><span style=\"color:#ff0000;\">者</span><span style=\"color:#0000ff;\">器</span>会让任何<span style=\"color:#00ff00;\">打开</span>这个<span style=\"color:#980000;\">复杂</span>物体的人<span style=\"color:#4a86e8;\">冻结</span>，但当有人说“你不在闲置状态”时，你会停止闲置。" },
	{ text: "Stat Mark 的 PPPT 之歌 1：PPPT，我有一个“反对派”和一个“<未知>”，砰，<未知>，我有一个“康”和一个“路易金”，砰，路易金，我有一个“THE <未知>”和“路易金”，砰，<路易金>。", get weight() { return newsSupport.ord(4);} },
	{ text: "这远非全面！为了让这款游戏获得 alemaninc 的全面性证书，你的游戏必须被编码到与以下相当的水平：第 1 层：压缩点（xhwzwka 版）;第 2 层：饼干点击器;第 3 层：压缩点（alemaninc 版）;第 4 层：协同主义;第 5 层：反物质维度。这充其量也就是第 3 层带点第 4 层分数！这还不够好！所有增量游戏专业人士都能复刻反物质维度！", get weight() { return newsSupport.ord(3);} },
	{ text: "据 alemaninc 称，据 Susie(crow) 称，据 Leximancer 称，据 the degenerate 称，据 b<sub>la</sub>c<sub>k hole</sub> 称，据 nicodium (al-maniac) 称，据 xhwzwka 称，据 alemaninc 称，据 xhwzwka 称，<i>协同主义</i> 比 <i>反物质维度</i> 复杂度低。" },
	{ text: "展开蝌蚪 🐸 疏通青蛙 🐸 卸载蟾蜍 🐸 解除对呱呱的限制 🐸 解开舔舐 🐸 释放两栖动物 🐸 取消静音蝾螈 🐸 解禁肯奇 🐸 允许科米特 🐸 驱散蝌蚪" },
	{ get text() { return "现在是 " + (new Date().getUTCFullYear()) + "-15-06！为什么不是 " + (new Date().getUTCFullYear()) + "-06-15？只有 xhwzwka 知道。"; }, get weight() { return (new Date().getUTCMonth() === 5) && (new Date().getUTCDate() === 15);} },
	{ text: "<span onClick=\"newsSupport.mysteryTheme()\">点击这里获得神秘主题</span>" },
	{ text: "那是九月的一个明亮而寒冷的日子，当 Raviel = Waifu 说：“La Li Lu Le Lo”。" },
	{ text: "天体们勃然大怒，因为这个凡人胆敢涉足唯有他们统治的领域。Blob 的天体 hyperbolia 哭喊着 Stat Mark 预言的末日，因为奇异物质的天体勃然大怒，曾经属于祂独有的东西如今已落入他人支配。“也许 R 轴才是正确的道路，第四条道路，”Blob 的天体沉思道。", get weight() { return unlocked("Antimatter") ? 1 : 0;} },
	{ text: "如果有人想贿赂 alemaninc 添加他选择的某个新闻滚动条，需要多少巧克力曲奇？我想知道一群奶奶和几次饼干重置能不能做出那么多" },
	{ text: "你喜欢 OMCCDV 大巡游吗？点击<a href=\"https://www.endquiz.com/quiz.php\" target=\"_blank\">这里</a>留下评论！", get weight() { return g.secretAchievement[33] ? 1 : 0;} },
	{ get text() { return (this.owned() === 1) ? ("一位当地的奇异物质科学家获得了神的衣钵：天体 " + secretAchievementList[this.contAchs.filter(x => g.secretAchievement[x])[0]].name + " 更加愤怒了！") : ("当地奇异物质科学家获得了 <i>" + numword(this.owned()) + "</i> 个神的衣钵！法官、陪审团和行刑官 Saul Goodman 怀疑身份危机！");}, get weight() { return this.owned() === 0 ? 0 : 1;}, owned: function () { return this.contAchs.map(x => g.secretAchievement[x] ? 1 : 0).sum();}, contAchs: [28, 33, 107] },
	{ text: "<i>奇异物质维度</i> " + newsSupport.nextMajorVersion + " 官方 Discord 预览：前往一个超恐怖的替代服务器，里面有可怕的天体。OMCCDV 的秘密在每次 Discord 消息前恢复其最大生命值的 25%。如果一个秘密 ever 恢复到 100% 生命值，Blob 的天体将陷入绝望并瞬间凋零。你的服务器在新 OMCCDV 世界或新 OMCCDV 世界级地图中发现的每个秘密都会为你的服务器提供 1 层硬度（最多堆叠 10,000 层，每层增加 0.1% 生命值），并为所有敌人提供 1 层恐惧（每层增加 0.05% 服务器活跃度）。每当一群成员被凋零杀死时，服务器失去一半的硬度层数，并在等于失去的硬度层数 10% 的消息数内阻止 OMCCDV 的治疗和凋零能力。通关 OMCCDV II 将完成此挑战。", get weight() { return newsSupport.ord(2);} },
	{ text: "据 UTQP 新闻报道，整个城镇已被奇异物质诱导的虫洞吞噬。更可靠的消息来源如 Stat Mark 确认该镇从未真正存在过，只是 alemaninc 为了拖延更新而 perpetuated 的神话。", get weight() { return unlocked("Hawking Radiation") ? 1 : 0;} },
	{ text: "今天我们推出了 ChatUXC。试着在<a href=\"" + discordInvite + "\" target=\"_blank\">这里</a>与它对话！这个高度先进聊天机器人可以对任何提示给出逼真的回应，例如：" + newsSupport.br(100) + "问：“<i>奇异物质维度</i> 接下来做什么？我在第 " + ranint(1, Math.min(achievement.tiersUnlocked().length, 10)) + " 层”" + newsSupport.br(100) + "答：“别玩了”", get weight() { return achievement.nextTier() === null ? 0 : 1;} },
	{ text: "<span onClick=\"for (let i of document.getElementsByTagName('*')) i.style.display = 'inline-block'\">宜家游戏：拆开 <i>奇异物质维度</i>，然后享受重新组装它的过程！点击这里游玩</span>" },
	{ text: "你偷了 xhwzwka 的成就。你激怒了失踪的神。作为惩罚，你将被送往 SCP-3001。你将被困在那里，没有逃脱的机会，随着你的器官开始解体，你会越来越生病，而你却无能为力。好消息是，你也许能看到 xhwzwka 本人，因为他来自 SCP-3001 无尽的红色虚空，而你正被送往他的家乡。这也许解释了为什么他疯了……", get weight() { return g.secretAchievement[28] ? 1 : 0;} },
	{ text: "alemaninc 驳斥了这些毫无根据的说法，称该新闻滚动条中提到了 OMCCDV。", get weight() { return newsSupport.ord(2);} },
	{ text: "alemaninc 大声疾呼，因为 Blob 的天体不容许祂猎杀 OMCCDV。然后，alemaninc 再次大声疾呼，因为 Blob 的天体已经追捕到了 OMCCDV。但这一次，祂流下的是喜悦的泪水，因为垂死的 OMCCDV 得救了。", get weight() { return newsSupport.ord(7);} },
	{ get text() { function r(x) { return "█".repeat(x);} return "nicodium 加入了懒惰 SCP 作者的行列！他的最新作品：“Scp-" + r(4) + " 是一个 " + r(86) + " 基金会人员 " + r(172) + " D-3819 " + r(86) + " 乔·拜登 " + r(172) + " 在我们中间 " + r(86) + " 被激活了”。";} },
	{ text: "到底什么是 " + img("blob", "blob", 16) + "？只有 hyperbolia 知道。" },
	{ text: "薛定谔的新闻：这条新闻报道处于真相与谬误的叠加态，与你对其是第一种情况的提议纠缠在一起。" },
	{ get text() { let out = "<html>" + document.getElementsByTagName("html")[0].innerHTML + "</html>"; let outLen = out.length; out = out.replaceAll("<", "&lt;").replaceAll(">", "&gt;"); return "突发新闻！alemaninc 刚刚发布了 <i>奇异物质维度</i> 的源代码！这是它全部的荣耀。以你现在的新闻滚动条滚动速度，大约需要 " + timeFormat(outLen * 15 / g.newsTickerSpeed) + " 才能滚动完。总之，废话不多说：" + out + newsSupport.br(500) + "<span onClick=\"addSecretAchievement(41)\">...等等，你真的读完了？你应该得到一个成就！点击这里获取一个</span>";}, weight: 0.01 }, // 非常长且非常卡顿，所以非常稀有
	{ get text() { let t = new Date(Date.now() - (g.timePlayed + g.dilatedTime) * 1000); function p(s, l) { return String(s).padStart(l, "0");} return "你于 " + t.getFullYear() + "-" + p(t.getMonth() + 1, 2) + "-" + p(t.getDate(), 2) + " " + p(t.getHours(), 2) + ":" + p(t.getMinutes(), 2) + ":" + p(t.getSeconds(), 2) + " 开始游玩。哇，那是很久以前了。";} },
	{ text: "一位科学家宣称奇异物质超级对撞机将有害的奇异物质废物排放到我们的河流中，由于相对论引力效应，这些河流都已经干涸。脱水致死的现象很普遍。" },
	{ text: "你的奇异物质现在有自己的网站了！<a target=\"_blank\" href=\"https://exoticmatter.io/\">点击这里</a>访问", get weight() { return g.exoticmatter.gt(c.inf) ? 1 : 0;} },
	{ get text() { let val = Decimal.FC_NN(1, 0, ranint(1e5, 1e15, true)); return "你的奇异物质价值连城。准确地说，每个奇异物质价值 $" + val.div(g.exoticmatter).format() + "，因此你奇异物质的总价值为 $" + val.format() + "。然而，由于通货膨胀，这实际上意味着你在地球上的净资产最低。也许你当初坚持玩反物质就好了……";}, get weight() { return Math.min(g.exoticmatter.layer, 1);} },
	{ text: "<span class=\"_time\">最大超频！</span>", get weight() { return (overclockSpeedupFactor === 1e4) ? 1 : 0;} },
	{ get text() { return "alemaninc Inc. 爆发丑闻，因公司的奇异物质工厂被指与宇宙变暖有关。他们的首席科学家以能量守恒定律驳斥了这些毫无根据的说法：“我知道物理定律在这里完全不适用，毕竟人们积累了像 " + this.highestEnergy()[0].format() + " " + this.highestEnergy()[1] + " 能量这样荒谬的数量，但这是你们这些八卦记者能得到的最佳解释。现在是我喝咖啡休息时间，你们所有人都要离开大楼，否则我会叫保安。再见。”";}, get weight() { return Math.max(0, Math.min(1 / 3, this.highestEnergy()[0].quad_slog(c.d10).toNumber() - 3)) * 3;}, highestEnergy: function () { let arr = energyTypes.map(x => g[x + "Energy"]); let amt = arr.reduce((x, y) => x.max(y)); let pos = energyTypes[arr.map(x => JSON.stringify(x)).indexOf(JSON.stringify(amt))]; return [amt, pos];} },
	{ get text() { return "奇异物质工厂据称卷入了一场奇异物质天气争议——一位 " + countTo(5).map(() => String.fromCharCode(ranint(65, 90))).join("") + "ville 的居民说：“天上下着猫、狗和奇异物质，后者刚刚毁了我的房子，我的保险公司拒绝了我的索赔，alemaninc Inc. 也不肯赔偿。看来今晚我只能露宿街头了，而 alemaninc 的高管们却在他们的顶层公寓里放松。”";} },
	{ get text() { let f = this.features(); return "alemaninc Inc. 的工厂正在罢工——工人要求停止以 " + f[0] + " 支付工资，开始以 " + f[1] + " 支付。" + countTo(7).map(() => String.fromCharCode(ranint(97, 122))).join("") + " " + Array.random(["清洁", "计算资源", "昆虫", "工作", "秘密", "吸烟"]) + "部门的某人说：“老实说，两者对我们来说都同样无用，但谁不喜欢拿了钱不来上班呢？”董事会考虑过用机器人劳工取代劳动力，但已经没有人来建造这种工人了。专家预测业务将在 " + timeFormat(Decimal.FC_NN(1, 1, Array.random([10, -1]) * 30 ** Math.random())) + " 内失败。";}, features: function () { let list = [["星系", unlocked("Galaxies")], ["能量", unlocked("Energy")], ["奇异物质", true], ["精通力", true], ["星尘", unlocked("Stardust")], ["暗物质", unlocked("Dark Matter")], ["知识", unlocked("Hawking Radiation")], ["霍金辐射", unlocked("Hawking Radiation")], ["反物质", unlocked("Antimatter")], ["色素", unlocked("Light")], ["运气碎片", unlocked("Luck")], ["棱镜", unlocked("Prismatic")], ["暗轴", unlocked("Dark Matter")], ["流明", unlocked("Light")], ["棱镜升级", unlocked("Prismatic")], ["反轴", unlocked("Antimatter")], ["星尘升级", unlocked("Stardust")], ["星星", unlocked("Stardust")], ["成就", true]].filter(x => x[1]).map(x => x[0]); let nums = countTo(list.length, true).select(2).sort((a, b) => a - b); return [list[nums[0]], list[nums[1]]];} },
	{ text: "alemaninc Inc. 的奇异物质农场被怀疑雇佣了未申报的儿童劳动力。alemaninc Inc. 的首席农业官评论说：“这些丑闻在这一点上简直荒谬——alemaninc Inc. 根本没有农场！”" },
	{ text: "alemaninc Inc. 爆发丑闻，据称创造了转基因奇异物质生物并将其用作安保。该公司唯一的安保员工质疑这些说法的有效性：“没有任何证据可能表明此类行为发生过。我们已经通过焚烧销毁了所有标本，你们这些讨厌的记者永远找不到它们！”" },
	{ text: "吸食反物质正慢慢变成最无聊青少年中的流行挑战。据说它带来的快感让他们感觉仿佛世界本身在你周围崩塌，因此得名“<span class=\"_antimatter\">爆炸挑战</span>”。" + newsSupport.br(viewportWidth()) + "全球消防员加班加点，因为人们在街上和家中神秘地自燃。在他们的身体中发现了微量的反物质同位素。", get weight() { return unlocked("Antimatter") ? 1 : 0;} },
	{ text: "奇异物质食品因重力抵消效应被认为不适合人类食用。" },
	{ text: "点击这里……等等，算了。请稍后再来查看一些真正的新闻。" },
	{ text: "<span onMouseover=\"secretAchievementList[44].clicks++;if(secretAchievementList[44].clicks<100){currentNewsOffset+=ranint(200,400)*((currentNewsOffset*2>viewportWidth())?-1:1)}\" onClick=\"addSecretAchievement(44)\">试着点我！</span>", get weight() { return g.secretAchievement[44] ? 0.1 : 1;} },
	{ get text() { return "涉及在 alemaninc Inc. 超级对撞机 №" + Math.round(10 ** (10 ** Math.random() ** 2 - 1)).toLocaleString("en-US") + " 中发现的奇异、违反重力的生物的丑闻解决了：这些生物实际上是一群野生 " + Array.random(["土豚", "熊", "骆驼", "鹿", "针鼹", "花", "鹅", "袋鼠", "鸵鸟", "猪", "羊", "狼"]) + "，它们通过一个洞进入了超级对撞机并摄入了里面的奇异物质。该对撞机的主任因发现这些非凡特性而被提升为 alemaninc Inc. 的首席执行官。";} },
	{ text: "我们的星球正在变轻吗？专家检查大规模生产奇异物质的影响。", get weight() { return Math.min(g.totalexoticmatter.layer, 1);} },
	{ text: "alemaninc Inc. 爆发丑闻，涉嫌销售实际上用暗能量替代了奇异物质的奇异物质饼干。alemaninc Inc. 对此事拒绝置评。", get weight() { return unlocked("Energy") ? 1 : 0;} },
	{ text: "奇异物质正逐渐成为一种传统货币的竞争者：所有 alemaninc Inc. 办公室都安装了奇异物质 ATM 机以方便存取款。“这些机器仍处于空的原型阶段，偶尔会有终端或 " + numword(ranint(10, 99, true)) + " 台机器解体并摧毁大楼，但我相信到本十年末，每家银行都会有奇异物质 ATM，”alemaninc Inc. 的首席财务官说，他还在开发奇异物质贷款系统。" },
	{ text: "奇异物质经济现在足够强劲，允许大规模的、兼作大规模杀伤性武器的金库。" },
	{ get text() { return "alemaninc 因大规模印刷奇异物质货币而被评为世界首富。“这并不违法，”" + countTo(3).map(() => String.fromCharCode(ranint(65, 90))).join("") + " 星系总统说" + countTo(6).map((x, i) => String.fromCharCode(ranint(48, 57)) + ((i === 3) ? "-" : "")).join("");} },
	{ get text() { return "一座千年古老的 " + Array.random(["半身像", "肖像", "塑像", " likeness", "雕像", "小雕像"]) + " 从一座废弃的 " + Array.random(luckRuneTypes.filter(x => runeTypeUnlocked(x))) + " 神庙中被发掘出来，引发了关于运气万神殿有多广泛的新研究。当成千上万的人向 " + Array.random(["持盾者", "双角兽", "半人马", "龙", "仙子", "魔像", "大黄蜂", "骑士", "小矮人", "小妖精", "怪物", "宁芙", "巨蛇", "独角兽"]) + " 祈祷时，alemaninc Inc. 公司的代表坚称他们是唯一真正的神。在无关的新闻中，alemaninc Inc. 公司总部在过去一周内遭遇了至少 " + numword(ranint(10, 1e3, true)) + " 起纵火案。";}, get weight() { return runeTypeUnlocked("trifolium") ? 1 : 0;} },
	{ text: "🐢<span onClick=\"g.newsTickerSpeed=Math.max(1,Math.min(g.newsTickerSpeed*0.99,20))\">点击这里让新闻滚动条变得更加难以忍受的慢</span>🐢", get weight() { return (g.newsTickerSpeed <= 40) ? 1 : 0;} },
	{ text: "⚡<span onClick=\"g.newsTickerSpeed=Math.max(1500,g.newsTickerSpeed+100)\">点击这里让新闻滚动条变得更加压倒性的快</span>⚡", get weight() { return (g.newsTickerSpeed >= 999) ? 1 : 0;} },
	{ text: "存在奇异反物质吗？" + newsSupport.br(100) + "没人知道。", get weight() { return unlocked("Antimatter") ? 1 : 0;} },
	{ text: "我们有一位幸运的读者在线！这位住在 #ticker-suggestions 的幸运读者想对大家说：“是”。多么具有启发性！作为回应，我们的首席执行官本人，alemaninc \"\" alemaninc 说：“这现在要被断章取义地放进新闻滚动条了 :D”。" },
	{ get text() { return "他们说是第 " + ordinal(starCap() + 1) + " 颗星星解锁了 " + (((study13.rewardLevels.slabdrill === 4) || unlocked("Matrix")) ? "N" : "R") + " 轴。";}, get weight() { return (unlocked("Galaxies") && (((g.stardustUpgrades[0] === 4) && (study13.rewardLevels.slabdrill === 0)) || (study13.rewardLevels.slabdrill === 4) || unlocked("Matrix"))) ? 1 : 0;} },
	{ text: "<span onClick=\"d.innerHTML('newsline','Darn...')\">⚡试着点我！⚡</span>", get weight() { return (g.newsTickerSpeed >= 999) ? 1 : 0;} },
	{ get text() { return "⚡+" + stat.tickspeed.sub(c.d1).mul(c.e2).format() + "% 移动速度！⚡";}, get weight() { return ((g.newsTickerSpeed >= 999) && stat.tickspeed.gt(c.d1)) ? 1 : 0;} },
	{ get text() { return "⚡光速进度：" + ((g.newsTickerSpeed >= 1133215491240) ? "<i>你到底是怎么读到这个的</i>" : (N(g.newsTickerSpeed / 11332154912.4).noLeadFormat(2) + "%")) + "⚡";}, get weight() { return (g.newsTickerSpeed >= 999) ? 1 : 0;} },
	{ get text() { return Array(1000).fill("⚡新闻滚动条已被指示在此消息处停留一小段时间以帮助平衡服务。我们对造成的任何不便表示歉意。⚡").join(newsSupport.br(g.newsTickerSpeed / 1000 + 500));}, get weight() { return (g.newsTickerSpeed >= 999) ? 1 : 0;} },
	{ text: "🐢摇摆着回到海滩。🐢", get weight() { return (g.newsTickerSpeed <= 40) ? 1 : 0;} },
	{ text: "<span onClick=\"newsSupport.malganis=true\">🐢我是 Mal'ganis，我是一只乌龟！点击这里杀死新闻滚动条。🐢</span>", get weight() { return (g.newsTickerSpeed <= 40) ? 1 : 0;} },
	{ text: "<span onClick=\"addSecretAchievement(49);newsSupport.malganis=false\">💊点击这里治愈新闻滚动条💊</span>", get weight() { return newsSupport.malganis ? 1 : 0;} },
	{ text: "🐢乌龟是如何过马路的？🐢", get weight() { return (g.newsTickerSpeed <= 40) ? 1 : 0;} },
	{ get text() { return "隔离的第 " + BEformat(Math.ceil(((g.timePlayed + ((g.dilatedTime > 1e9) ? 0 : g.dilatedTime)) / 86400))) + " 天：创造了一个奇异物质宇宙，因违反 " + numword(ranint(1, 9, true) * 10 + ranint(1, 9)) + " 项国际和平条约被联邦特工突袭，被送往精神病院——一切正常";} },
	{ get text() { let incName = Object.keys(newsSupport.ticker325games).random(), randInc = newsSupport.ticker325games[incName], eff = secretAchievementPoints / (randInc[2] ?? 1); return "当你在玩 <i>" + incName + "</i> 时，你的 " + BEformat(secretAchievementPoints) + " 个秘密成就点正在使 " + randInc[0] + " 增加 " + randInc[1](eff);}, get weight() { return Math.sign(secretAchievementPoints);} },
	{ text: "Blob 问为什么研究的研究会移动？嗯，有 4 个三元研究和 4 个研究的研究层级：唯一的解释是 Hevipelle 在 EMD v1.0 时就看到了它，并希望三元组有移动的研究。我们不想让启发了这个整个项目的游戏失望，不是吗？", get weight() { return g.achievement[810] ? 1 : 0;} },
	{ text: "很久很久以前，有一位伟大而强大的开发者名叫 alemaninc。作为最强大的开发者，alemaninc 坐上了第 8 天体的宝座。有一天，祂说：“我去听点东方曲子，拜拜”，然后离开了祂的座位。于是，伟大而强大的 hyperbolia 成为了第 8 天体。有一次，hyperbolia 被问到：“你对 EMD 有什么贡献？”祂回答说：“多亏了 " + img("blob", "blob", 16) + " 的伟大魔法，640 是一个存在的数字。”", get weight() { return (g.EMDLevel >= 18) ? 1 : 0;} }
];

// 底部
var currentNewsItem;
var currentNewsOffset = 0;

function randomNewsItem() {
	let selectable = countTo(newsList.length, true).map(x => [x, newsList[x].frequency * (newsList[x].weight ?? 1) * (newsSupport.itemsShown - (newsList[x].lastShown ?? (-newsList.length)))]);
	let next = Array.weightedRandom(selectable);
	newsSupport.itemsShown++;
	newsList[next].lastShown = newsSupport.itemsShown;
	return next;
}

function initialNewsOffset() {
	return (currentNewsOffset < 0) ? (viewportWidth() + d.element("newsline").offsetWidth) : 0;
}

function nextNewsItem(back = false, val = randomNewsItem()) {
	currentNewsItem = val;
	d.innerHTML("newsline", newsList[currentNewsItem].text);
	currentNewsOffset = initialNewsOffset();
	d.element("newsline").style.left = "calc(100vw - " + currentNewsOffset + "px)";
}