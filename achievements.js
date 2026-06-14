"use strict"
;
function achievement(id) {return achievementList[String(id).substring(0,String(id).length-2
)][id];}
achievement.
tierOf = function(id){return String(id).substring(0,String(id).length-2
);}
achievement.
tierName = function(id) {return "第 "+id+" 阶"
;}
achievement.
ownedInTier = function(tier){return Object.keys(achievementList[tier]).map(x=>g.achievement[x]?1:0).sum
();}
achievement.
tierColors
 = {
	1:{dark:"#009900",light:"#00ff00"
},
	2:{dark:"#804c00",light:"#ff9900"
},
	3:{dark:"#330033",light:"#990099"
},
	4:{dark:"#009999",light:"#00ffff"
},
	5:{dark:"#000033",light:"#0000ff"
},
	6:{dark:"#000000",light:"#ffffff"
},
	7:{dark:"#666600",light:"#bbbb00"
},
	8:{dark:"#008855",light:"#00ff99"
},
	9:{dark:"#660000",light:"#cc0000"
}
}
achievement.
perAchievementReward
 = {
	1:{text:"本阶每完成一个成就，X轴效果 +0.02×（当前：+{}×）",value:()=>(achievement.ownedInTier(1)/50).toFixed(2),calc:x=>N(x/50),currentVal:c.d0
},
	2:{text:"本阶每完成一个成就，第一行的星星强度提高 1%（当前：{}%）",value:()=>achievement.ownedInTier(2),calc:x=>N(x/100+1),currentVal:c.d1
},
	3:{text:"本阶每完成一个成就，从暗物质获得的免费轴数量 +1%（当前：{}%）",value:()=>achievement.ownedInTier(3),calc:x=>N(x/100+1),currentVal:c.d1
},
	4:{text:"本阶每完成一个成就，能量效果增强 0.1%（当前：{}%）",value:()=>(achievement.ownedInTier(4)/10).toFixed(1),calc:x=>N(x/1e3+1),currentVal:c.d1
},
	5:{text:"本阶每完成一个成就，基础知识获取量乘以该数值（当前：×{}）",value:()=>achievement.ownedInTier(5),calc:x=>N(x),currentVal:c.d0
},
	6:{text:"本阶每完成一个成就，第8-12行的研究成本降低 1%，且每完成4个成就额外降低 1%（当前：{}%）",value:()=>Math.floor(achievement.ownedInTier(6)*1.25),calc:x=>Decimal.FC_NN(1,0,1-Math.floor(x*1.25)/100),currentVal:c.d1
},
	7:{text:"第一个星系惩罚的底数根据本阶成就数量减少 ({})",value:function(){return showFormulas?formulaFormat("⌈10<sup>36 ÷ (17 + A)</sup>⌉"):(achievement.ownedInTier(7)===Object.keys(achievementList[7]).length)?"currently: 10":("currently: "+this.calc(achievement.ownedInTier(7)).format()+", next: "+this.calc(achievement.ownedInTier(7)+1).format())},calc:x=>Decimal.FC_NN(1,0,Math.ceil(10**(36/(x+17)))),currentVal:c.e2
},
	8:{text:"本阶每完成一个成就，可额外购买 2 个“空间协同”研究（当前：{}）",value:()=>2*achievement.ownedInTier(8)+6,calc:x=>2*x+6,currentVal:6
},
	9:{text:"Study XIII 的目标根据本阶成就数量减少 ({})",base:()=>1032,value:function(){return showFormulas?formulaFormat("min(999, "+this.base()+" - 4 × A)"):(achievement.ownedInTier(9)===Object.keys(achievementList[9]).length)?("currently: "+(this.base()-132)):("currently: "+this.calc(achievement.ownedInTier(9)).format()+", next: "+this.calc(achievement.ownedInTier(9)+1))},calc:function(x){return Decimal.FC_NN(1,0,Math.min(999,this.base()-x*4))},currentVal:c.d999
}
}
achievement.
initial = {1:101,2:201,3:301,4:402,5:501,6:601,7:701,8:717,9:823
}
achievement.
visible = function(id
) {
	if (g.achievement[id]) {return true
}
	if ((achievement(id).beta===true)&&(!betaActive)) {return false
}
	let tier = achievement.tierOf
(id)
	if (!g.achievement[achievement.initial[tier]]) {return false
}
	if (achievement(id).prevReq!==undefined) {for (let i of achievement(id).prevReq) {if (!g.achievement[i]) {return false
}}}
	return true
}
achievement.
percent = function(value,needed,log
){
	let valuefactor=(typeof log==="function")?log(value):value.layerplus
(-log)
	let neededfactor=(typeof log==="function")?log(needed):needed.layerplus
(-log)
	let percent = valuefactor.div(neededfactor).max(c.d0).min(c.d1
)
	return [percent.isNaN()?0:(percent.toNumber()*100
),value,needed]
}
achievement.
label = function(id,num=1
){
	let name = achievement(id).name
	if (num>1
) {
		for (let i=5;i>0;i--) {name = name.replace(" "+roman(i),"")} // 避免出现类似 "Parity II" 这样的复数名称
		loop: for (let i=1;i<num;i++) {if (name!==achievement(id+i-1).name.substring(0,name.length)) {name = undefined; break
 loop}}
	}
	return "成就"+((num===1)?"":"们")+" "+id+((num===1)?"":("-"+(id+num-1)))+((name===undefined)?"":(" \""+name+"\""
))
}
achievement.
roman = function(num){return (num===1)?"":(" "+roman
(num))}
achievement.
tiersUnlocked = function(){return Object.keys(achievementList).filter(x=>(Number(x)!==NaN)&&(achievement.ownedInTier(x)>0
))}
achievement.
nextTier = function(
){
	let u = achievement.tiersUnlocked
()
	let out = Object.keys(achievementList).filter(x=>!u.includes
(x))
	return out.length===0?null:out[0
]
}
achievement.
selectForProgressBar = function(
){
	if (g.achOnProgressBar==="N"
) {
		let available = achievement.all.filter(x=>achievement.visible(x)&&((!g.achievement[x])||((achievement(x).maxMilestones===undefined)?false:(achievement(x).milestones()<achievement(x).maxMilestones
))))
		let showDisclaimer = available.map(x=>achievement(x).failed===undefined).includes(false
)
		if (available.length>0) {popup
({
			text:"选择要在进度条显示的成就？"+(showDisclaimer?"<br><i>（带 <b>*</b> 标记的ID成就在显示在进度条上时，会变为不可失败状态。）</i>":""
),
			buttons:available.map(x=>[x+((achievement(x).failed===undefined)?"":"<b>*</b>")+"<br>\""+achievement(x).name+"\"","g.achOnProgressBar='"+x+"'"
]),
			buttonSize:2
		})} 
else {popup
({
			text:"没有可显示的成就。"
,
			buttons:[["关闭",""
]]
		})}
	} 
else {g.achOnProgressBar = "N"
}
}
achievement.
wormholeProgress = function(){return achievement.percent(stat.totalDarkAxis,stat.wormholeDarkAxisReq,0
)}
achievement.
locking = function(x){return (g.achOnProgressBar==x)?(!achievement(x).failed()):false
}
achievement.
lockPopup = function(
) {
	if (g.achOnProgressBar==="N") {return
}
	popup
({
		text:"此操作会导致你失败 "+achievement.label(g.achOnProgressBar)+"。请从进度条移除它以执行此操作。"
,
		buttons
:[
			[
"移除","g.achOnProgressBar='N'"
],
			[
"关闭",""
]
		]
	})
}
achievement.
maxForLocks
 = {
	axis
:{
		202:{W:c.d0
},
		203:{Z:c.d0
},
		204:{Y:c.d0
},
		205:{X:c.d0
},
		217:{X:c.d1,Y:c.d3,Z:c.d3,W:c.d7
},
		303:Object.fromEntries(axisCodes.slice(0,8).map(x=>[x,c.d1
])),
		304:Object.fromEntries(axisCodes.slice(0,8).map(x=>[x,c.d3
])),
		305:Object.fromEntries(axisCodes.slice(0,8).map(x=>[x,c.d5
])),
		525:{S:c.d0,darkS:c.d0
},
		526:Object.fromEntries(axisCodes.map(x=>[x,c.d0
])),
		get 
527(){return Object.fromEntries(axisCodes.map(x=>["dark"+x,((axisCodes.map(x => g["dark"+x+"Axis"].eq(c.d0)?0:1).sum()===3)&&g["dark"+x+"Axis"].eq(c.d0))?c.d0:c.maxvalue
]))},
		707:{X:c.d0,Y:c.d0,Z:c.d0,W:c.d0,V:c.d0,U:c.d0,T:c.d0,S:c.d0,R:c.d0,Q:c.d0,P:c.d0,O:c.d0
},
		813:Object.fromEntries(axisCodes.map(x=>[x,"dark"+x]).flat().map(x=>[x,c.d0
])),
		get 
825(){return Object.fromEntries(axisCodes.map(x=>[x,"dark"+x]).flat().map(x=>[x,achievement(825).maxAxisToNotFail(calcStatUpTo("free"+x+"Axis","Softcap"
))]))}
	},
	mastery:[524,707,908
],
	stardustReset
:{
		get 
502(){return true
},
		get 
503(){return true
},
		get 
504(){return true
},
		get 
505(){return true
},
		get 
506(){return true
},
		get 
707(){return true
},
		get 
715(){return g.TotalStardustResets===1
},
	},
	specificStardustUpgrades
:{
		521:{5:5
},
		522:{5:3
},
		523:{5:1
}
	},
	totalStardustUpgrades
:{
		520:15
,
		707:6
,
		915:6
,
		932:7
	},
	stars
:{
		516:0
,
		528:40
,
		609:0
,
		707:0
,
		get 
711(){return Math.min(39-achievement(711).milestones(),40
)},
	},
	darkstars
:{
		get 
512(){return N(g.stars
)},
		528:c.d40
,
		get 
806(){return (achievement.ownedInTier(5)<7)?c.d0:c.maxvalue
},
		get 
813(){return (achievement.ownedInTier(5)<7)?c.d0:c.maxvalue
},
		914:c.d0
,
	},
	discoveries
:{
		get 
616(){return true
},
		get 
817(){return true
}
	},
	discoveries:[616,817
],
	research:[502,503,504,505,506,707,812,915
]
}
/*
	name									成就名称
	description					成就描述（达成条件）
	check								检查是否达成条件的函数
	progress						显示接近程度的消息（未完成时显示）
	[prevReq]						必须先拥有的成就ID列表
	reward							列出的奖励描述
	[effect]						计算奖励效果的函数（用于动态奖励）
	[effectFormat]			显示奖励数值的函数（受黄光影响时）
	[yellowBreakpoints]	黄光照明的范围
	flavor							在成就面板底部显示的背景文本/风味文本
	[beta]							如果设为 true，除非开启 Beta 否则无法获得
*/
const achievementList = {
	1: {
		101: {
			name: "直线",
			description: "购买一个 X 轴",
			check: function () { return g.XAxis.gt(c.d0); },
			event: "axisBuy",
			progress: function () { return "未完成！"; },
			reward: "+1% 奇异物质",
			flavor: "触觉上的直线，抵得上视觉中的圆"
		},

		102: {
			name: "正方形",
			description: "购买一个 Y 轴",
			check: function () { return g.YAxis.gt(c.d0); },
			event: "axisBuy",
			progress: function () { return "未完成！"; },
			prevReq: [101],
			reward: "+2% 奇异物质",
			flavor: "向上，而非向北"
		},

		103: {
			name: "立方体",
			description: "购买一个 Z 轴",
			check: function () { return g.ZAxis.gt(c.d0); },
			event: "axisBuy",
			progress: function () { return "未完成！"; },
			prevReq: [102],
			reward: "+3% 奇异物质",
			flavor: "这是知识；这是三维：再次睁开你的眼睛，试着稳稳地注视。"
		},

		104: {
			name: "时间维度",
			description: "购买一个 W 轴",
			check: function () { return g.WAxis.gt(c.d0); },
			event: "axisBuy",
			progress: function () { return "未完成！"; },
			prevReq: [103],
			reward: "+4% 精通力",
			flavor: "时间显然不是我们的自然维度，因此我们从未真正安于时间之中。"
		},

		105: {
			name: "一万小时",
			get description() { return "累积 " + BEformat(c.e11) + " 精通力"; },
			check: function () { return g.masteryPower.gt(c.e11); },
			event: "gameloop",
			progress: function () { return achievement.percent(g.masteryPower, c.e11, 0); },
			get reward() { return "基于游玩时间，为第一行精通提供极微小加成（当前：{}%）"; },
			flavor: "一万小时，才能掌握一门技艺。",
			effect: function () {
				return Decimal.convergentSoftcap(
					g.truetimePlayed.div(c.e5).add(c.d10).log10().log10(),
					c.d0_75,
					c.d1
				).pow(c.d0_5);
			},
			effectFormat: x => x.format(2),
			formulaText: () => formulaFormat.convSoftcap(
				"log<sup>[2]</sup>(t ÷ 100,000 + 10)",
				c.d0_75,
				c.d1,
				g.truetimePlayed.gt(42014859476)
			) + "<sup>0.5</sup>"
		},

		106: {
			name: "10,000 小时？",
			description: "总共游玩 10 小时",
			check: function () { return g.truetimePlayed > 36000; },
			event: "gameloop",
			progress: function () { return achievement.percent(g.truetimePlayed.div(c.d3600), c.d10, 0); },
			reward: "精通力获取公式略微增强（+0.001 指数）",
			flavor: "在非洲的每一万小时里，只过去了 600 分钟"
		},

		107: {
			name: "X² 轴",
			description: "使 X 轴效果超过 4×",
			check: function () { return stat.XAxisEffect.gt(c.d4); },
			event: "gameloop",
			progress: function () { return achievement.percent(stat.XAxisEffect, c.d4, 1); },
			prevReq: [101],
			reward: "1 个免费 Y 轴",
			flavor: "空间是相对的"
		},

		108: {
			name: "反馈回路",
			description: "使 Z 轴效果超过 4×",
			check: function () { return stat.ZAxisEffect.gt(c.d4) && stat.axisUnlocked > 2; },
			event: "gameloop",
			progress: function () { return achievement.percent(stat.ZAxisEffect, c.d4, 1); },
			prevReq: [103],
			get reward() {
				return "每购买 1 个 Z 轴，获得 {} 个免费 X 轴（当前：" +
					g.ZAxis.mul(this.effect()).noLeadFormat(2) + "）";
			},
			effect: function (y = this.yellowValue) {
				return y.eq(c.d1) ? c.d0_05 : y.eq(c.d0) ? c.d0_04 : c.d0_2.div(c.d5.sub(y));
			},
			flavor: "g.exoticmatter++",
			effectFormat: x => x.recip().noLeadFormat(2),
			yellowBreakpoints: [c.d75, c.d125, 0]
		},

		109: {
			name: "缓慢",
			description: "使 W 轴效果超过 4×",
			check: function () { return stat.WAxisEffect.gt(4) && stat.axisUnlocked > 3; },
			event: "gameloop",
			progress: function () { return achievement.percent(stat.WAxisEffect, c.d4, 1); },
			prevReq: [104],
			get reward() {
				return "每个 W 轴增加 30 秒 W 轴计时器" +
					(g.lumens[5].lt(c.d360) ? "" : "<sup>{}</sup>") +
					(Decimal.eq(g.WAxis, stat.realWAxis) ? "" :
						" （含免费；当前：" + timeFormat(stat.realWAxis.pow(achievement(109).effect()).mul(c.d30)) + "）");
			},
			effect: function (y = this.yellowValue) { return y.add(c.d1); },
			effectFormat: x => x.noLeadFormat(4),
			yellowBreakpoints: [c.d360, N(3.6e5), 1],
			flavor: "为何缓慢之乐消失了？啊，昔日那些漫步者如今去了何方？"
		},

		...(() => {
			let out = {};
			for (let i = 0; i < 3; i++) {
				let req = [c.d86400, c.e6, c.e9][i];
				out[110 + i] = {
					name: "停滞" + achievement.roman(i + 1),
					get description() {
						return "储存相当于 " + [
							"24 小时",
							timeFormat(c.e6) + "（1,000,000 秒）",
							timeFormat(c.e9) + "（" + c.e9.format() + " 秒）"
						][i] + " 的奇异物质产量" +
							(i === 0 ? "（提示：有没有办法降低产量？）" : "");
					},
					check: function () {
						return g.exoticmatter.div(stat.exoticmatterPerSec).gt(req) &&
							(timeSinceGameOpened > 5);
					},
					event: "gameloop",
					progress: function () {
						return achievement.percent(
							g.exoticmatter,
							stat.exoticmatterPerSec.mul(req),
							0
						);
					},
					prevReq: i === 0 ? [] : [109 + i],
					reward: "若奇异物质低于 " + [15, 30, 60][i] +
						" 秒的产量，则立即提升至该数值",
					flavor: [
						"不怕慢，就怕站。",
						"要感受生命，别站着不动；要感受宇宙，别移动！",
						"正直，就是在说出真相时仍能挺直腰杆，而当对方前来交谈时依然如此！"
					][i]
				};
			}
			return out;
		})(),

		113: {
			name: "二次",
			get description() { return "拥有 9 个已购买的 X 轴"; },
			check: function () { return g.XAxis.gte(c.d9); },
			event: "axisBuy",
			progress: function () { return achievement.percent(g.XAxis, c.d9, 0); },
			prevReq: [101],
			reward: "每个 Y 轴 +0.0004× Y 轴效果",
			flavor: "6<sup>X<sup>2</sup></sup>"
		},

		114: {
			name: "左翼",
			description: "激活前四行中每一个的第一个精通",
			check: function () {
				return MasteryE(11) && MasteryE(21) && MasteryE(31) && MasteryE(41);
			},
			prevReq: [103],
			event: "gameloop",
			progress: function () {
				return achievement.percent(
					N([11, 21, 31, 41].map(x => MasteryE(x) ? 1 : 0).sum()),
					c.d4,
					0
				);
			},
			get reward() { return "+{}% 奇异物质（基于精通力）"; },
			flavor: "我不支持左翼或右翼——我支持整只鸟。",
			effect: function (y = this.yellowValue) {
				let out = g.masteryPower.add(c.d1).log10().pow(c.d2).div(c.e3).add(c.d1);
				return (y.eq(c.d1)
					? out.pow(out.log10().add(c.d1))
					: Decimal.convergentSoftcap(out, c.d8_5, c.d10)
				).fix(c.d0);
			},
			effectFormat: x => x.sub(c.d1).mul(c.e2).format(2),
			formulaText: () => {
				if (g.lumens[5].lt(c.e2))
					return formulaFormat.convSoftcap(
						"log(MP + 1)<sup>2</sup> ÷ 10",
						c.d750,
						c.d900,
						g.masteryPower.gt(4.004e86)
					);
				return "((log(MP + 1)<sup>2</sup> ÷ 1,000 + 1)<sup>1 + log(log(MP + 1)<sup>2</sup> ÷ 1,000 + 1)</sup> - 1) × 100";
			},
			yellowBreakpoints: [c.d99, c.e2, 0]
		},

		115: {
			name: "原版复制品",
			description: "拥有免费轴",
			check: function () {
				return axisCodes.map(x => stat["free" + x + "Axis"])
					.reduce((x, y) => x.max(y))
					.gt(c.d0);
			},
			event: "gameloop",
			progress: function () { return "未完成！"; },
			reward: "+1 奇异物质",
			flavor: "让一个傻瓜留住他的钱，这在道德上是错误的。"
		}
	},

	2: {
		201: {
			name: "回到超立方体原点",
			description: "产生星尘",
			check: function () { return true; },
			event: "stardustReset",
			progress: function () { return "未完成！"; },
			get reward() {
				return "第四行精通强度 +{}%（基于总" +
					(g.achievement[301] ? "普通 " : "") + "轴数）";
			},
			flavor: "“看哪，我的物质，强者啊，绝望吧！”<br>除此之外，什么也没留下。",
			effect: function (y = this.yellowValue) {
				let out = stat.totalNormalAxis.add(c.d1).log10();
				out = y.eq(c.d0)
					? Decimal.convergentSoftcap(out, c.d4, c.d5)
					: out.mul(out.div(c.e2).add(c.d1));
				if (study13.bound(196)) out = out.mul(study13.bindingEff(196));
				return out;
			},
			effectFormat: x => x.format(2),
			formulaText: () => {
				let out = "log(ΣA + 1)";
				out = g.lumens[5].lt(c.d100)
					? formulaFormat.convSoftcap(out, c.d4, c.d5, stat.totalNormalAxis.gte(9999))
					: out + " + " + out + "<sup>2</sup> ÷ 100";
				if (study13.bound(196))
					out = "(" + out + ") × " + study13.bindingEff(196).noLeadFormat(3);
				return out;
			},
			yellowBreakpoints: [c.d99, c.e2, 0]
		},

		...(() => {
			let out = {};
			for (let i = 0; i < 4; i++) {
				let type = axisCodes[3 - i];
				out[202 + i] = {
					name: ["无时", "无空", "弦论", "0∞"][i],
					get description() {
						return "在不使用 " +
							(unlocked("Dark Matter") ? "普通 " : "") +
							type + " 轴的情况下达到 " + c.e25.format() + " 奇异物质";
					},
					check: function () {
						return g.exoticmatter.gt(c.e25) && g[type + "Axis"].eq(c.d0);
					},
					event: "gameloop",
					progress: function () {
						return g[type + "Axis"].eq(c.d0)
							? achievement.percent(g.exoticmatter, c.e25, 1)
							: "失败";
					},
					failed: function () { return g[type + "Axis"].neq(c.d0); },
					prevReq: [[104, 202, 203, 204][i]],
					get reward() {
						return "+0." + (4 - i) +
							"% 每个 " + type + " 轴的星尘（总计：" +
							percentOrMult(
								Decimal.pow(
									Decimal.FC_NN(1, 0, 1.004 - i / 1e3),
									g[type + "Axis"]
								),
								2,
								true
							) + ")";
					},
					flavor: [
						"像所有伟大的艺术一样，它嘲弄暴君——时间。",
						"四轴好，两轴更好",
						"这位可怜的无知君主——他自称如此——似乎确信那条被称为他王国的直线，以及他在其中度过一生的地方，构成了整个世界。",
						"那个点是一个像我们一样的存在，但被困在无维度的深渊中。他自己就是他的世界，他的宇宙；除了他自己，他对任何事物都没有概念；他不知道长、宽、高，因为他没有经验；他甚至不认识数字二；也没有复数的概念；因为他是唯一，也是全部，实际上什么也不是。"
					][i]
				};
			}
			return out;
		})(),

		206: {
			name: "缺失的一环",
			description: "使 Y 轴效果超过 0.4×",
			check: function () {
				return stat.YAxisEffect.gt(c.d0_4) && stat.axisUnlocked > 1;
			},
			event: "gameloop",
			progress: function () {
				return achievement.percent(stat.YAxisEffect, c.d0_4, 0);
			},
			prevReq: [102],
			get reward() { return "{} 个免费 Y 轴（基于精通力）"; },
			flavor: "几乎不可能阻止 Y 轴繁殖，但当 Y 轴繁殖时，进化停止，退化开始。Y 轴确实是社会缺失的一环。",
			effect: function (y = this.yellowValue) {
				let out = g.masteryPower.add(c.d1).dilate(c.d0_3).pow(c.d0_3);
				return Decimal.convergentSoftcap(
					out,
					c.d8,
					y.eq(c.d1) ? c.d512 : c.d12
				).fix(c.d0);
			},
			effectFormat: x => x.noLeadFormat(2),
			formulaText: () =>
				formulaFormat.convSoftcap(
					"10<sup>log(MP + 1)<sup>0.3</sup> × 0.3</sup>",
					c.d8,
					g.lumens[5].lt(c.d100) ? c.d12 : c.d512,
					g.masteryPower.gt(2.4444e39)
				),
			yellowBreakpoints: [c.d99, c.e2, 0]
		},

		207: {
			name: "五维超立方体",
			description: "购买一个 V 轴",
			check: function () { return g.VAxis.gt(c.d0); },
			event: "axisBuy",
			progress: function () { return "未完成！"; },
			prevReq: [104],
			get reward() {
				return "每个 " +
					(unlocked("Dark Matter") ? "普通轴" : "轴") +
					" 使所有 " +
					(unlocked("Dark Matter") ? "普通轴" : "轴") +
					" 价格便宜 {}%（总计：" +
					percentOrDiv(
						this.effect().pow(stat.totalNormalAxis),
						2,
						true
					) + ")";
			},
			effect: function (y = this.yellowValue) {
				let out = c.d0_99.div(N(2.2).pow(y));
				if (study13.bound(192)) out = out.pow(study13.bindingEff(192));
				return out;
			},
			effectFormat: x => c.d1.sub(x).mul(c.e2).noLeadFormat(2),
			yellowBreakpoints: [c.d0, c.d25, 0],
			flavor: "跳出超立方体的框框思考"
		},

		208: {
			name: "六维超立方体",
			description: "购买一个 U 轴",
			check: function () { return g.UAxis.gt(c.d0); },
			event: "axisBuy",
			progress: function () { return "未完成！"; },
			prevReq: [207],
			get reward() {
				return "每个 " +
					(unlocked("Dark Matter") ? "普通轴" : "轴") +
					" 额外获得 {}% 星尘（总计：" +
					percentOrMult(
						this.effect().pow(stat.totalNormalAxis),
						2,
						true
					) + ")";
			},
			effect: function (y = this.yellowValue) {
				let out = (
					y.eq(c.d1) ? c.d0_06 :
					y.eq(c.d0) ? c.em3 :
					y.mul(c.d0_059).add(c.em3)
				).add(c.d1);
				if (study13.bound(192)) out = out.pow(study13.bindingEff(192));
				return out;
			},
			effectFormat: x => x.sub(c.d1).mul(c.e2).noLeadFormat(2),
			yellowBreakpoints: [c.d0, c.d36, 0],
			flavor: "64 顶点，192 边，240 个正方形面"
		},

		209: {
			name: "七维超立方体",
			description: "购买一个 T 轴",
			check: function () { return g.TAxis.gt(c.d0); },
			event: "axisBuy",
			progress: function () { return "未完成！"; },
			prevReq: [208],
			get reward() {
				return "每个 " +
					(unlocked("Dark Matter") ? "普通轴" : "轴") +
					" 使前七个 " +
					(unlocked("Dark Matter") ? "普通轴" : "轴") +
					" 的效果 +{}×（总计：+" +
					this.effect().mul(stat.totalNormalAxis).noLeadFormat(3) + ")";
			},
			effect: function (y = this.yellowValue) {
				let out = y.eq(c.d1)
					? c.d7em4
					: y.eq(c.d0)
						? c.em4
						: c.d7.pow(y).div(c.e4);
				if (study13.bound(162)) out = out.div(study13.bindingEff(162));
				if (study13.bound(192)) out = out.mul(study13.bindingEff(192));
				return out;
			},
			effectFormat: x => x.noLeadFormat(2),
			yellowBreakpoints: [c.d0, c.d49, 0],
			flavor: "560 个立方体胞，280 个四维超立方体面，84 个五维超立方体面"
		},

		210: {
			name: "八维超立方体",
			description: "购买一个 S 轴",
			check: function () { return g.SAxis.gt(c.d0); },
			event: "axisBuy",
			progress: function () { return "未完成！"; },
			prevReq: [209],
			get reward() {
				return "每拥有 {} 个普通轴，获得 1 个前一类型的免费轴" +
					(Decimal.div(
						axisCodes.map(i => g[i + "Axis"]).reduce((x, y) => x.max(y)),
						achievement(210).effect()
					).gte(c.d80) ? "（超过 80 后软上限）" : "");
			},
			effect: function (y = this.yellowValue) {
				let out = y.eq(c.d1)
					? c.d64
					: y.eq(c.d0)
						? c.d80
						: c.d80.sub(y.pow(c.d2div3).mul(c.d16));
				if (study13.bound(164)) out = out.mul(study13.bindingEff(164));
				if (study13.bound(174)) out = out.mul(study13.bindingEff(174));
				if (study13.bound(192))
					out = out.div(study13.bindingEff(192).max(c.minvalue));
				return out;
			},
			effectFormat: x => x.noLeadFormat(3),
			yellowBreakpoints: [c.d16, c.d80, 0],
			scp: function (b184 = study13.bound(184)) {
				let out = c.d1;
				if (b184) out = out.mul(study13.bindingEff(184));
				return out.add(c.d1).recip();
			},
			value: function (type) {
				let out = g[type + "Axis"].div(this.effect());
				if (out.gt(c.d80))
					out = out.div(c.d80).pow(this.scp()).mul(c.d80);
				return out;
			},
			flavor: "80 个构成一个奇异物质星系"
		},

		211: {
			name: "屏幕上永不出现的城市",
			get description() { return "累积 " + BEformat(c.e80) + " 奇异物质"; },
			check: function () { return g.exoticmatter.gt(c.e80); },
			event: "gameloop",
			progress: function () {
				return achievement.percent(g.exoticmatter, c.e80, 1);
			},
			reward: "Z 轴效果使用更好的公式（+0.01 指数）",
			flavor: "虽然不怎么漂亮，但我们确实知道如何运营"
		},

		...(() => {
			let out = {};
			for (let i = 0; i < 4; i++) {
				let req = Decimal.FC_NN(
					[1, 1, 1, 1][i],
					[0, 0, 0, 1][i],
					[1609.344, 1199169832, 1e15, 25][i]
				);
				out[i + 212] = {
					name: "四秒英里" + achievement.roman(i + 1),
					get description() {
						return "在星尘重置后的 4 秒内达到 " +
							req.format(6) + " 奇异物质";
					},
					check: function () {
						return g.exoticmatter.gt(req) &&
							g.timeThisStardustReset < 4;
					},
					event: "gameloop",
					progress: function () {
						return g.timeThisStardustReset < 4
							? {
								percent: achievement.percent(
									g.exoticmatter,
									req,
									i > 1 ? 1 : 0
								),
								text: (4 - g.timeThisStardustReset) + " 秒剩余"
							}
							: "失败";
					},
					prevReq: i === 0 ? [] : [211 + i],
					reward: "游戏运行速度提升 0.4%",
					flavor: [
						"你觉得一英里五分钟很快吗？",
						"(Δt')² + v² = c²",
						"你是为英里而生，不是为四百米，越早意识到这点越好。",
						"在薄冰上滑行时，安全在于速度。"
					][i]
				};
			}
			return out;
		})(),

		216: {
			name: "零玩家游戏",
			description: "解锁轴自动购买器",
			check: function () { return g.stardustUpgrades[1] > 0; },
			event: "stardustUpgrade",
			progress: function () { return "未完成！"; },
			reward: "逐渐消退的成就感",
			flavor: "只有当被游玩时，游戏才成其为游戏；在此之前，它只是一套规则和等待人类参与的道具。"
		},

		217: {
			name: "1337",
			description: "恰好拥有 1 个 X 轴、3 个 Y 轴、3 个 Z 轴和 7 个 W 轴（不含免费轴）",
			check: function () {
				return g.XAxis.eq(c.d1) &&
					g.YAxis.eq(c.d3) &&
					g.ZAxis.eq(c.d3) &&
					g.WAxis.eq(c.d7);
			},
			event: "axisBuy",
			progress: function () {
				return (g.XAxis.gt(c.d1) ||
					g.YAxis.gt(c.d3) ||
					g.ZAxis.gt(c.d3) ||
					g.WAxis.gt(c.d7))
					? "失败"
					: achievement.percent(
						axisCodes.slice(0, 4).map(x => g[x + "Axis"]).sumDecimals(),
						c.d14,
						0
					);
			},
			failed: function () {
				return g.XAxis.gt(c.d1) ||
					g.YAxis.gt(c.d3) ||
					g.ZAxis.gt(c.d3) ||
					g.WAxis.gt(c.d7);
			},
			prevReq: [104],
			reward: "+33.7% 星尘",
			flavor: "x 4x15 Y 4X15 2 4X15 W 4x15"
		}
	},

	3: {
		301: {
			name: "宇宙是黑暗的",
			description: "解锁暗物质",
			check: function () { return g.stardustUpgrades[4] > 0; },
			event: "stardustUpgrade",
			progress: function () { return "未完成！"; },
			get reward() { return "+{}% 星尘（基于暗物质）"; },
			flavor: "这不是普通的日常黑暗，这是……高级黑暗。",
			effect: function (y = this.yellowValue) {
				let out = g.darkmatter.add(c.d1).log10().div(c.e2).add(c.d1);
				return (y.eq(c.d0)
					? Decimal.convergentSoftcap(out, c.d8_5, c.d10)
					: out.pow(out.log10().add(c.d1))
				).fix(c.d1);
			},
			effectFormat: x => x.sub(c.d1).mul(c.e2).format(2),
			formulaText: () => {
				if (g.lumens[5].lt(c.d100))
					return formulaFormat.convSoftcap(
						"log(DM + 1)",
						c.d750,
						c.d900,
						g.darkmatter.gt("e750")
					);
				return "((1 + log(DM + 1) ÷ 100)<sup>1 + log(1 + log(DM + 1) ÷ 100)</sup> - 1) × 100";
			},
			yellowBreakpoints: [c.d99, c.e2, 0]
		},

		302: {
			name: "价态",
			get description() {
				return "在不填充任何部分星行（所有行必须全满或全空）的情况下达到 " +
					BEformat(c.inf) + " 奇异物质";
			},
			check: function () {
				return g.exoticmatter.gt(c.inf) && this.valence();
			},
			prevReq: [211],
			event: "gameloop",
			progress: function () {
				return this.valence()
					? achievement.percent(g.exoticmatter, c.inf, 1)
					: "失败";
			},
			failed: function () {
				loop: for (let i = 1; i < 10; i++) {
					if (maxStars(i) === 4) continue loop;
					for (let j = 1; j < 5; j++)
						if (g.star[10 * i + j]) return true;
				}
				return false;
			},
			get reward() {
				return "+30.8% 每个未分配星星的暗物质（总计：" +
					percentOrMult(
						N(1.308).pow(unspentStars()),
						2,
						true
					) + ")";
			},
			flavor: "我讲了一个稀有气体笑话，可惜没人反应",
			valence: function () {
				return countTo(10).map(x =>
					[1, 2, 3, 4].map(y => g.star[10 * x + y] ? 1 : 0).sum() % 4
				).sum() === 0;
			}
		},

		...(() => {
			let out = {};
			for (let i = 0; i < 3; i++) {
				let req = [c.d1, c.d3, c.d5][i];
				out[303 + i] = {
					name: "奇偶性" + achievement.roman(i + 1),
					get description() {
						return "恰好拥有 " + (1 + i * 2) +
							" 个每种" +
							(unlocked("Hindrance") ? "前八个" : "") +
							"普通轴（已购买）";
					},
					check: function () {
						return !axisCodes.slice(0, 8).map(
							x => g[x + "Axis"].eq(req)
						).includes(false);
					},
					event: "axisBuy",
					progress: function () {
						let amts = axisCodes.slice(0, 8).map(x => g[x + "Axis"]);
						return amts.reduce((x, y) => x.max(y)).gt(req)
							? "失败"
							: achievement.percent(
								amts.sumDecimals(),
								req.mul(c.d8),
								0
							);
					},
					failed: function () {
						for (let i of axisCodes.slice(0, 8))
							if (g[i + "Axis"].gt(req)) return true;
						return false;
					},
					prevReq: [[210, 303, 304][i]],
					reward: "1 个免费暗 " +
						"XYZ".split("").slice(0, i + 1).joinWithAnd() + " 轴",
					flavor: [
						"很奇怪，即使你什么都不做，数字仍在增长",
						"即使胜算不大，也要坚持",
						"愿几率永远站在你这边"
					][i]
				};
			}
			return out;
		})(),

		306: {
			name: "商人",
			description: "使 V 轴效果超过 44,444×",
			check: function () {
				return stat.VAxisEffect.gt(c.d44444) && stat.axisUnlocked > 4;
			},
			event: "gameloop",
			progress: function () {
				return achievement.percent(stat.VAxisEffect, c.d44444, 1);
			},
			prevReq: [207],
			reward: "1 个免费 V 轴",
			flavor: "我的金库安全得多。在我做银行家的所有时间里，我从没丢过哪怕一枚 Geo！"
		},

		307: {
			name: "中子星",
			description: "使 U 轴效果超过 4×",
			check: function () {
				return stat.UAxisEffect.gt(c.d4) && stat.axisUnlocked > 5;
			},
			event: "gameloop",
			progress: function () {
				return achievement.percent(stat.UAxisEffect, c.d4, 1);
			},
			prevReq: [208],
			reward: "1 个免费 U 轴",
			flavor: "创造论者和中子星有什么共同点？"
		},

		308: {
			name: "多项式定理",
			description: "使 T 轴效果超过 44,444×",
			check: function () {
				return stat.TAxisEffect.gt(c.d44444) && stat.axisUnlocked > 6;
			},
			event: "gameloop",
			progress: function () {
				return achievement.percent(stat.TAxisEffect, c.d44444, 1);
			},
			prevReq: [209],
			reward: "1 个免费 T 轴",
			flavor: "(X+Y+Z+W+V+U+T)<sup>S</sup>"
		},

		309: {
			name: "宗师级",
			description: "同时激活 10 个精通",
			check: function () { return this.active() > 9; },
			event: "gameloop",
			progress: function () {
				return achievement.percent(N(this.active()), c.d10, 0);
			},
			get reward() {
				return "基于暗物质，将奇异物质增益乘以精通力<sup>{}</sup>（当前效果：×" +
					g.masteryPower.add(c.d1).pow(this.effect()).format(2) + "）";
			},
			flavor: "只有全身心投入事业的人，才能成为真正的宗师。正因如此，宗师级要求一个人的全部。",
			effect: function (y = this.yellowValue) {
				let out = g.darkmatter.add1Log(c.d10).pow(c.d0_5).div(c.e2);
				return (y.eq(c.d0)
					? Decimal.convergentSoftcap(out, c.d0_5, c.d1)
					: Decimal.logarithmicSoftcap(out, c.d1, c.d1)
				).fix(c.d0);
			},
			effectFormat: x => x.format(3),
			formulaText: () => {
				let out = "log(DM + 1)<sup>0.5</sup> ÷ 100";
				return g.lumens[5].lt(c.d100)
					? formulaFormat.convSoftcap(out, c.d0_5, c.d1, g.darkmatter.gt("e2500"))
					: formulaFormat.logSoftcap(out, c.d1, c.d1, g.darkmatter.gt(c.ee4));
			},
			yellowBreakpoints: [c.d99, c.e2, 0],
			active: function () {
				return Object.keys(masteryData).map(x =>
					MasteryE(x) ? 1 : 0
				).reduce((x, y) => x + y);
			}
		},

		310: {
			name: "超能力",
			description: "达到 1,500% 精通 11 效率",
			check: function () { return masteryBoost(11).gte(c.d15); },
			event: "gameloop",
			progress: function () {
				return achievement.percent(
					masteryBoost(11).mul(c.e2),
					c.d1500,
					0
				);
			},
			get reward() {
				return "为精通计时器增加 15" +
					(stat.tickspeed.eq(c.d1) ? "" : " 真实") +
					" 分钟" +
					(g.studyCompletions[8] === 0
						? ""
						: "（由于研究 VIII，现在这已经没用了！:)）");
			},
			flavor: "精通侠，精通侠<br>做一切精通者能做的事"
		},

		311: {
			name: "何时才够？",
			get description() { return "达到 " + BEformat(c.ee3) + " 奇异物质"; },
			check: function () { return g.exoticmatter.gt(c.ee3); },
			prevReq: [211],
			event: "gameloop",
			progress: function () {
				return achievement.percent(g.exoticmatter, c.ee3, 1);
			},
			get reward() { return "基于奇异物质，将其增益乘以 {}"; },
			get flavor() {
				return "可观测宇宙中的普朗克体积数量约为 " +
					BEformat("4.65e185") +
					"。因此，若 1 个可观测宇宙 = " +
					c.ee3.format() + " 奇异物质，求 1 奇异物质的体积";
			},
			effect: function (y = this.yellowValue) {
				let out = g.exoticmatter.add(c.d1).pow(c.em3);
				return (y.eq(c.d0)
					? Decimal.convergentSoftcap(out, c.e9, c.e10, 1)
					: Decimal.linearSoftcap(out, c.e10, c.d1div3, 1)
				).fix(c.d1);
			},
			effectFormat: x => x.format(2),
			formulaText: () => {
				let out = "log(EM + 1) ÷ 1,000";
				return "10<sup>" + (
					g.lumens[5].lt(c.e2)
						? formulaFormat.convSoftcap(
							out,
							c.d9,
							c.d10,
							g.exoticmatter.gt("e9e3")
						)
						: formulaFormat.linSoftcap(
							out,
							c.d10,
							c.d1div3,
							g.exoticmatter.gt(c.ee4)
						)
				) + "</sup>";
			},
			yellowBreakpoints: [c.d99, c.d100, 0]
		},

		312: {
			name: "车库大甩卖",
			get description() { return "使 X 轴价格降至 " + BEformat(c.em40) + " 以下"; },
			check: function () { return axisCost("X").lt(c.em40); },
			event: "gameloop",
			progress: function () {
				return achievement.percent(axisCost("X"), c.em40, 1);
			},
			get reward() { return "星尘加成 5 以削弱效果影响 Y 轴（^0.04）"; },
			flavor: "像鸟儿一样自由"
		}
	},

	4: {
		401: {
			name: "超新星已解锁",
			description: "拥有 24 颗星星",
			check: function () { return g.stars >= 24; },
			event: "starBuy",
			progress: function () {
				return achievement.percent(N(g.stars), c.d24, 0);
			},
			prevReq: [201],
			reward: "^1.05 奇异物质",
			flavor: "如果没有恒星爆炸，也许会有天堂，但一定不会有地球。"
		},

		...(() => {
			let out = {};
			for (let i = 0; i < 6; i++) {
				out[402 + i] = {
					name: ["暗圈", "创世", "坟墓物质", "布朗运动", "思考食粮", "充能"][i],
					description: "解锁第 " + ["第一", "第二", "第三", "第四", "第五", "第六"][i] + " 种能量",
					prevReq: i === 0 ? [] : [401 + i],
					check: function () { return energyTypesUnlocked() > i; },
					event: "stardustUpgrade",
					progress: function () { return "未完成！"; },
					reward: "+" + (i + 3) + "% 所有能量获取",
					flavor: [
						"我们将面临考验。暗能量将敲响我们所有人的门",
						"无处可去，只能遍行天下，于是就在星空下继续前行。",
						"你可以讨厌重力，但重力不在乎",
						"这是一个物种准备离开超空间时的样子",
						"心灵的能量是生命的本质",
						"万物皆能量"
					][i]
				};
			}
			return out;
		})(),

		408: {
			name: "永恒暴涨",
			description: "在星尘重置后的前 4 分钟内，使暗能量效果超过 1",
			check: function () {
				return stat.darkEnergyEffect.gt(c.d1) &&
					g.timeThisStardustReset < 240;
			},
			event: "gameloop",
			progress: function () {
				return g.timeThisStardustReset < 240
					? timeFormat(240 - g.timeThisStardustReset) + " 剩余"
					: "失败";
			},
			get reward() {
				return "时间速度对能量获取的效果被 " +
					(g.lumens[5].gte(this.yellowBreakpoints[0])
						? "提升至 {} 次幂"
						: "平方");
			},
			flavor: "我不介意回到夏令时。在通胀之下，那一个小时将是我今年唯一存下的东西。",
			effect: function (y = this.yellowValue) { return y.add(c.d2); },
			effectFormat: x => x.noLeadFormat(4),
			yellowBreakpoints: [c.d100, c.e3, 1]
		},

		...(() => {
			let out = {};
			for (let i = 0; i < 3; i++) {
				let req = [c.d2, c.d4, c.d8][i];
				out[409 + i] = {
					name: "时间是相对的" + achievement.roman(i + 1),
					description: "达到 " + req.toString() + "× 时间速度",
					prevReq: i === 0 ? [] : [408 + i],
					check: function () { return stat.tickspeed.gte(req); },
					event: "gameloop",
					progress: function () {
						return achievement.percent(stat.tickspeed, req, 1);
					},
					reward: "基于 " +
						["奇异物质", "精通力", "星尘"][i] +
						" 的极微小 时间速度加成（当前：{}%）",
					flavor: [
						"夜晚的所有声音似乎都穿过了一条无限长的空心隧道。",
						"如果我早起，这一天感觉比晚起更长，即使我醒着的时间相同。",
						"一位数学家计划通过虫洞前往平行宇宙穿越回过去，而他今天甚至连最快的火箭都到不了火星。"
					][i],
					effect: function (y = this.yellowValue) {
						let res = [g.exoticmatter, g.masteryPower, g.stardust][i];
						let mult = [c.d0_8, c.d1_2, c.d1][i].mul(y.add(c.d1));
						return res.add(c.e10).layerplus(-3).mul(mult).fix(c.d0);
					},
					effectFormat: x => x.format(2),
					formulaText: function () {
						return "log<sup>[3]</sup>(" +
							["EM", "MP", "S"][i] + " + " +
							c.e10.format() + ")" +
							formulaFormat.mult(
								[c.d0_8, c.d1_2, c.d1][i].mul(
									this.yellowValue.add(c.d1)
								)
							);
					},
					yellowBreakpoints: [
						[c.d30, c.d40, c.d50][i],
						[c.d60, c.d70, c.d80][i],
						0
					]
				};
			}
			return out;
		})(),

		412: {
			name: "满堂",
			description: "将星星分配到最后一行",
			check: function () {
				return g.star[101] || g.star[102] || g.star[103] || g.star[104];
			},
			progress: function () { return "未完成！"; },
			prevReq: [401],
			get reward() { return "基于暗星，将星尘获取乘以 {}"; },
			flavor: "不止是乐园",
			base: function (r11_5 = g.research.r11_5) {
				let out = c.d1_125;
				if (r11_5)
					out = out.mul(researchEffect(11, 5).pow(totalAchievements));
				return out;
			},
			effect: function (r11_5 = g.research.r11_5) {
				let out = [this.base(r11_5), g.darkstars, c.d2].decimalPowerTower();
				if (!r11_5)
					out = Decimal.logarithmicSoftcap(out, c.inf, c.d1).fix(c.d1);
				return out;
			},
			effectFormat: x => x.format(2),
			formulaText: function () {
				let out = this.base().noLeadFormat(3) + "<sup>★<sup>2</sup></sup>";
				if (!g.research.r11_5)
					out = formulaFormat.logSoftcap(
						out,
						c.inf,
						c.d1,
						this.effect().gt(c.inf)
					);
				return out;
			}
		},

		413: {
			name: "OMCCDV",
			get description() { return "达到 " + BEformat(c.e44031) + " 奇异物质"; },
			check: function () { return g.exoticmatter.gt(c.e44031); },
			event: "gameloop",
			progress: function () {
				return achievement.percent(g.exoticmatter, c.e44031, 1);
			},
			prevReq: [413], // 秘密成就
			get reward() {
				return "每个 S 轴 +19.07%、每个暗 S 轴 +20.20% 精通力获取（当前：" +
					Decimal.mul(
						c.d1_1907.pow(g.SAxis),
						c.d1_202.pow(g.darkSAxis)
					).format(2) + "×)";
			},
			flavor: "这是我的随机号码，有缘再联系"
		}
	},
	5: {
	501: {
		name: "某处的虫洞",
		description: "摧毁宇宙",
		check: function () { return true; },
		event: "wormholeResetBefore",
		progress: function () { return "未完成！"; },
		get reward() {
			return "每秒基于当前宇宙的存活时间，给予奇异物质、精通力、星尘与暗物质 +" +
				this.perSec().mul(c.e2).noLeadFormat(3) +
				"% 的加成（当前总计：" +
				(this.effectExp().eq(c.d1)
					? percentOrMult(this.realEffect(), 2, true)
					: arrowJoin(
						percentOrMult(this.base(), 2, true),
						percentOrMult(this.realEffect(), 2, true)
					)) + ")";
		},
		flavor: "毁灭的冲动，同样是一种创造的冲动。",
		perSec: function () {
			let out = c.em4;
			if (g.achievement[816]) out = out.mul(c.d2);
			if (study13.bound(166)) out = out.div(study13.bindingEff(166));
			return out;
		},
		base: function (b176 = study13.bound(176)) {
			let out = g.truetimeThisWormholeReset.mul(this.perSec()).add(c.d1);
			if (b176)
				out = Decimal.convergentSoftcap(
					out,
					c.d1,
					study13.bindingEff(176),
					1
				);
			return out;
		},
		effectExp: function (m101 = MasteryE(101)) {
			if (m101) return masteryEffect(101);
			if (g.achievement[615]) return masteryEffect(101).pow(c.d0_5);
			return c.d1;
		},
		realEffect: function (b176 = study13.bound(176)) {
			return this.base(b176).pow(this.effectExp());
		}
	},

	502: {
		name: "钢铁意志",
		get description() {
			return "在不进行星尘重置、也不拥有任何研究的当前宇宙中，达到 " +
				BEformat(c.e50) + " 奇异物质";
		},
		check: function () {
			return g.exoticmatter.gt(c.e50) && stat.ironWill;
		},
		event: "gameloop",
		progress: function () {
			return stat.ironWill
				? achievement.percent(g.exoticmatter, c.e50, 1)
				: "失败";
		},
		failed: function () { return !stat.ironWill; },
		get reward() {
			return "普通轴价格折算减弱 " +
				N(studies[12].reward(1) * 100 + 5).noLeadFormat(2) + "%";
		},
		flavor: "没能杀死你的，终将使你更强大"
	},

	503: {
		name: "钢铁意志 II",
		get description() {
			return "在不进行星尘重置、也不拥有任何研究的当前宇宙中，达到 " +
				BEformat(c.e130) + " 奇异物质";
		},
		check: function () {
			return g.exoticmatter.gt(c.e130) && stat.ironWill;
		},
		event: "gameloop",
		progress: function () {
			return stat.ironWill
				? achievement.percent(g.exoticmatter, c.e130, 1)
				: "失败";
		},
		failed: function () { return !stat.ironWill; },
		prevReq: [502],
		get reward() {
			return "暗轴价格折算减弱 " +
				N(studies[12].reward(1) * 100 + 5).noLeadFormat(2) + "%";
		},
		flavor: "上天只给了你一丝疯狂，千万别丢掉它"
	},

	504: {
		name: "钢铁意志 III",
		description: "在不进行星尘重置、也不拥有任何研究的当前宇宙中解锁暗物质",
		check: function () {
			return g.stardustUpgrades[4] > 0 && stat.ironWill;
		},
		event: "gameloop",
		progress: function () {
			return stat.ironWill ? "仍有可能" : "失败";
		},
		failed: function () { return !stat.ironWill; },
		prevReq: [503],
		get reward() {
			return "从所有来源获得的发现值额外 +" +
				N(studies[12].reward(1) * 100 + 5).noLeadFormat(2) + "%";
		},
		flavor: "这样挺好"
	},

	505: {
		name: "钢铁意志 IV",
		description: "在不进行星尘重置、也不拥有任何研究的当前宇宙中购买暗 X 轴",
		check: function () {
			return g.darkXAxis.gt(c.d0) && stat.ironWill;
		},
		event: "axisBuy",
		progress: function () {
			return stat.ironWill
				? (g.achievement[505]
					? achievement.percent(
						stat.totalDarkAxis,
						this.effectBreakpoints[
							Math.min(this.milestones(), 39)
						],
						0
					)
					: "仍有可能")
				: "失败";
		},
		failed: function () { return !stat.ironWill; },
		prevReq: [504],
		effect: function () {
			return N(1.01 + this.milestones() / 1e3 + studies[12].reward(1)).fix(c.d0);
		},
		effectFormat: x => x.sub(c.d1).mul(c.e2).noLeadFormat(2),
		formulaText: () =>
			N(1 + studies[12].reward(1) * 100).noLeadFormat(2) +
			" + μ ÷ 10",
		effectBreakpoints: [
			c.d2, c.d3, c.d4, c.d5, c.d6, c.d7, c.d8, c.d9, c.d10, c.d12,
			c.d15, c.d20, c.d25, c.d30, c.d40, c.d50, c.d60, c.d70, c.d80,
			c.d90, c.e2, c.d120, c.d140, c.d160, c.d180, c.d200, c.d225,
			c.d250, c.d275, c.d300, c.d325, c.d350, c.d400, c.d450, c.d500,
			c.d550, c.d600, c.d700, c.d800, c.d900
		],
		milestones: function () {
			for (let i = 39; i >= 0; i--) {
				if (g.ach505Progress.gte(this.effectBreakpoints[i])) {
					return i + 1;
				}
			}
			return 0;
		},
		maxMilestones: 40,
		get reward() {
			return "普通 S 轴强度 +{}%" +
				(this.milestones() === 40
					? ""
					: ("（随钢铁意志模式下总暗轴里程碑提升。" +
						"下一个里程碑在总暗轴达到 " +
						this.effectBreakpoints[this.milestones()] + "）"));
		},
		flavor: "当我年轻时刚起步……<br>……我非常穷。<br>但我从未放弃。而今天，经过多年努力与坚持……<br>……我变老了。"
	},

	506: {
		name: "钢铁意志 V",
		description: "在不进行星尘重置、也不拥有任何研究的当前宇宙中摧毁宇宙",
		check: function () { return stat.ironWill; },
		event: "wormholeResetBefore",
		progress: function () {
			return stat.ironWill
				? achievement.wormholeProgress()
				: "失败";
		},
		failed: function () { return !stat.ironWill; },
		prevReq: [505],
		reward: "霍金辐射获取 ^1.1",
		flavor: "一个渴望某种绝望荣耀的孩子"
	},

	...(() => {
		let out = {};
		for (let i = 0; i < 4; i++) {
			let req = 18000 / 10 ** i, effect, formulaText;
			function flavorFormat(txt, n) {
				return txt.split(" ")
					.map(x => x.split("").join("&nbsp;".repeat(n)))
					.join(" ".repeat(n * 2 + 1));
			}
			if (i === 3) {
				effect = function () {
					let d = g.totalDiscoveries;
					if (!g.achievement[805])
						return d.div(c.e3).add(c.d1).min(c.d1_25);
					let s = achievement(805).effect();
					return (d.div(c.d10).gt(s))
						? [s, Decimal.div(
							d.log10().sub(c.d1),
							s.log10()
						), c.d0_01].decimalPowerTower().div(c.e2).add(c.d1)
						: d.div(c.e3).add(c.d1);
				};
				formulaText = function () {
					let b = g.totalDiscoveries.div(c.d10),
						s = achievement(805).effect();
					return g.achievement[805]
						? (b.gte(s)
							? (s.noLeadFormat(3) +
								"<sup>log<sub>" +
								s.noLeadFormat(3) +
								"</sub>(D ÷ 10)<sup>0.01</sup></sup>")
							: "D ÷ 10")
						: "min(D ÷ 10, 25)";
				};
			} else {
				effect = function () {
					return Decimal.FC_NN(1, 0, req)
						.div(g.fastestWormholeReset.max(c.d18))
						.log10().max(c.d0)
						.simplex(2)
						.mul(c.d10)
						.div(4 - i)
						.fix(c.d0);
				};
				formulaText = () =>
					"(max(log(" + BEformat(req) +
					" ÷ max(t, 18)), 0)<sup>2</sup> - 0.25)" +
					formulaFormat.mult(
						Decimal.FC_NN(1, 0, 5 / (i + 2))
					);
			}
			out[507 + i] = {
				name: "超高速" + achievement.roman(i + 1),
				get description() {
					return "在宇宙开启后的 " +
						timeFormat(req) + " 内摧毁它";
				},
				check: function () {
					return g.timeThisWormholeReset < req;
				},
				prevReq: i === 0 ? [] : [506 + i],
				event: "wormholeResetBefore",
				progress: function () {
					return g.timeThisWormholeReset < req
						? {
							percent: achievement.wormholeProgress(),
							text: timeFormat(req -
								g.timeThisWormholeReset) + " 剩余"
						}
						: "失败";
				},
				reward: (i === 3)
					? "游戏运行速度 +{}%（基于总发现值）"
					: ("星尘加成 " + (3 * i + 1) +
						" 强度 +{}%（基于最快虫洞重置，下限 18 秒）"),
				flavor: flavorFormat(
					[
						"没有什么比光速更快",
						"可能唯一的例外",
						"是坏消息",
						"它遵循自己特殊的法则"
					][i],
					[1, 2, 3, 5][i]
				),
				effect: effect,
				effectFormat: x =>
					((i === 3) ? x.sub(c.d1).mul(c.e2) : x)
						.noLeadFormat(3),
				formulaText: formulaText
			};
		}
		return out;
	})(),

	511: {
		name: "九维超立方体",
		get description() {
			return "先达到 " + BEformat(c.d9_999e99) +
				" 星尘，然后在一次重置中将其提升到 9 次方";
		},
		check: function () {
			return stat.pendingstardust.gt(
				g.stardust.pow(c.d9)
			) && g.stardust.gt(c.d9_999e99);
		},
		event: "stardustReset",
		progress: function () {
			return g.stardust.gt(c.d9_999e99)
				? achievement.percent(
					stat.pendingstardust,
					g.stardust.pow(c.d9),
					1
				)
				: ("先达到 " + BEformat(c.d9_999e99) + " 星尘");
		},
		reward: "普通 U 轴强度 +0.9%",
		flavor: "Slabdrill？"
	},

	512: {
		name: "今夜闪耀",
		description: "在本次虫洞重置的任意时刻，拥有的暗星数量不超过普通星（含已分配）",
		check: function () { return g.shiningBrightTonight; },
		event: "wormholeResetBefore",
		progress: function () {
			return g.shiningBrightTonight
				? {
					percent: achievement.wormholeProgress(),
					text: g.darkstars.format() +
						" / " + g.stars + " 暗星"
				}
				: "失败";
		},
		failed: function () { return !g.shiningBrightTonight; },
		get reward() {
			return "每拥有 1 颗普通星，暗星价格便宜 0.25%（总计：" +
				percentOrDiv(N(0.9975 ** g.stars)) + "）";
		},
		flavor: "宛如天空中的钻石"
	},

	...(() => {
		let out = {};
		for (let i = 0; i < 3; i++) {
			let req = [c.d20, c.d35, c.d50][i];
			out[513 + i] = {
				name: "复制体" + achievement.roman(i + 1),
				description: "一次性批量购买 " + req.toString() + " 颗暗星",
				prevReq: i === 0 ? [] : [512 + i],
				check: function () { return true; },
				progress: function () {
					return achievement.percent(
						stat.maxAffordableDarkStars.sub(g.darkstars),
						req,
						0
					);
				},
				get reward() {
					return "每颗暗星 +2× 暗物质（总计：" +
						c.d2.pow(g.darkstars).format() + "×）";
				},
				flavor: [
					"人类最大的缺陷，就是无法理解指数函数。",
					"任何相信指数增长能在有限世界中永远持续的人，要么是疯子，要么是经济学家。",
					(() => {
						let out = "10";
						for (let i = 0; i < 99; i++) {
							out = "10<sup>" + out + "</sup>";
						}
						return out;
					})()
				][i]
			};
		}
		return out;
	})(),

	516: {
		name: "黑洞纪元",
		description: "在没有星星的状态下摧毁宇宙",
		check: function () { return g.stars === 0; },
		event: "wormholeResetBefore",
		progress: function () {
			return g.stars === 0
				? achievement.wormholeProgress()
				: "失败";
		},
		failed: function () { return g.stars !== 0; },
		reward: "第 5 行和第 10 行的星星额外使对应精通强度 +1%",
		flavor: "那双眼睛像黑曜石碎片般漆黑发亮，死死盯着他。它们就像黑洞，不放出任何东西，连信息也没有。"
	},

	517: {
		name: "廉价填充",
		get description() {
			return "使所有普通轴价格降至 " +
				BEformat(c.eme6) + " 以下";
		},
		check: function () { return this.lowest().lt(c.eme6); },
		prevReq: [312],
		event: "gameloop",
		progress: function () {
			return achievement.percent(this.lowest(), c.eme6, 1);
		},
		reward: "所有普通轴价格 ^0.95",
		flavor: "宝贝，今晚不需要物质账单我也能玩得开心",
		lowest: function () {
			return axisCodes.slice(0, 8)
				.map(x => axisCost(x))
				.reduce((x, y) => x.max(y));
		}
	},

	518: {
		name: "辐照",
		description: "单次虫洞重置获得 696,342 霍金辐射",
		check: function () { return stat.pendinghr.gte(696342); },
		event: "wormholeResetBefore",
		progress: function () {
			return achievement.percent(
				stat.pendinghr,
				c.d696342,
				0
			);
		},
		reward: "奇异物质获取乘以 {}（基于观测值）",
		flavor: "在他们头顶，一颗巨大的太阳灼烧着，瘫痪了半片天空。它永不停歇，始终固定在天空的一点上，并将一直燃烧，直到——那个不再遥不可及的日子——它燃尽为止。",
		effect: function (y = this.yellowValue) {
			let p = c.d12.pow(y);
			return c.d2.pow(
				g.observations.map(
					x => x.pow(c.d0_75.div(p))
				).sumDecimals().pow(p)
			).fix(c.d1);
		},
		effectFormat: x => x.format(2),
		formulaText: function () {
			return "2<sup>" +
				(this.yellowValue.gt(c.d0) ? "(" : "") +
				"Σ<span class=\"xscript\"><sup>4</sup><sub>1</sub></span>O<span class=\"xscript\"><sup>" +
				c.d0_75.div(
					c.d12.pow(this.yellowValue)
				).noLeadFormat(4) +
				"</sup><sub>n</sub></span>" +
				(this.yellowValue.gt(c.d0)
					? ")<sup>" +
						c.d12.pow(this.yellowValue)
							.noLeadFormat(4) +
						"</sup>"
					: "") +
				"</sup>";
		},
		yellowBreakpoints: [c.d2e3, c.e10, 2]
	},

	519: {
		name: "闪亮的黄色光球",
		description: "在当前宇宙中累积 40 颗星星，且不分配任何一颗",
		check: function () {
			return g.stars >= 40 && g.ach519possible;
		},
		prevReq: [412],
		event: "starBuy",
		progress: function () {
			return g.ach519possible
				? achievement.percent(N(g.stars), c.d40, 0)
				: "失败";
		},
		failed: function () { return !g.ach519possible; },
		get reward() {
			return "每拥有一个星尘升级，星星价格 ×{}，反之亦然（总计：" +
				this.effect().pow(g.stardustUpgrades.sum())
					.noLeadFormat(2) +
				"× 星星，" +
				this.effect().pow(g.stars).noLeadFormat(2) +
				"× 星尘升级）";
		},
		effect: function (y = this.yellowValue) {
			return y.eq(c.d1)
				? c.inf
				: y.eq(c.d0)
					? c.d2
					: [c.d2, c.d1024, y].decimalPowerTower();
		},
		effectFormat: x => x.noLeadFormat(2),
		yellowBreakpoints: [c.d10, c.e10, 2],
		flavor: "你知道这些是怎么运作的，对吧？"
	},

	520: {
		name: "配给制",
		description: "在本次虫洞重置的任意时刻，拥有的星尘升级不超过 15 个（注：轴自动购买器和精通解锁在重置时始终保留）",
		check: function () {
			return effectiveStardustUpgrades() <= 15;
		},
		event: "wormholeResetBefore",
		progress: function () {
			let o = effectiveStardustUpgrades();
			return o > 15
				? "失败"
				: {
					percent: achievement.wormholeProgress(),
					text: (15 - o) +
						" 个升级剩余" +
						(o === 14 ? "" : "s")
				};
		},
		failed: function () {
			return effectiveStardustUpgrades() > 15;
		},
		get reward() {
			return (g.lumens[5].lt(this.yellowBreakpoints[0])
				? "平方根"
				: "{} 次根") +
				" 每个星尘升级第一级的费用";
		},
		effect: function (y = this.yellowValue) {
			return y.mul(c.d8).add(c.d2);
		},
		effectFormat: x => x.noLeadFormat(2),
		yellowBreakpoints: [c.d200, c.e3, 0],
		flavor: "社会主义最糟糕的广告，就是它的信徒。"
	},

	...(() => {
		let out = {};
		for (let i = 0; i < 3; i++) {
			let max = 4 - 2 * i;
			out[521 + i] = {
				name: "珠光宝气" + achievement.roman(1 + i),
				description: "在不解锁 " +
					energyTypes[max] + " 能量的前提下摧毁宇宙",
				prevReq: i === 0 ? [] : [520 + i],
				check: function () {
					return energyTypesUnlocked() <= max;
				},
				event: "wormholeResetBefore",
				progress: function () {
					return energyTypesUnlocked() <= max
						? achievement.wormholeProgress()
						: "失败";
				},
				failed: function () {
					return energyTypesUnlocked() > max;
				},
				reward: "50% " + energyTypes[max] +
					" 与 " + energyTypes[max + 1] + " 能量获取",
				flavor: [
					"5 小时的能量，但你可以在 3 秒内吃完",
					"25 小时能量：适合那些一天需要额外一小时的人",
					"无论怎样，你仍然拥有六焦耳"
				][i]
			};
		}
		return out;
	})(),

	524: {
		name: "精通并非微不足道的怪物",
		description: "在任何时刻都不激活精通的情况下摧毁宇宙",
		check: function () { return g.ach524possible; },
		event: "wormholeResetBefore",
		progress: function () {
			return g.ach524possible
				? achievement.wormholeProgress()
				: "失败";
		},
		failed: function () { return !g.ach524possible; },
		reward: "解锁新的一行精通",
		flavor: "现在掉落物相关的事故增加了 270%",
		active: function () {
			return !g.activeMasteries.slice(1)
				.map(x => x === 0)
				.includes(false);
		}
	},

	525: {
		name: "反正你也用不着",
		description: "在任何时刻都不购买普通或暗 S 轴的情况下摧毁宇宙",
		check: function () { return g.ach525possible; },
		event: "wormholeResetBefore",
		progress: function () {
			return g.ach525possible
				? achievement.wormholeProgress()
				: "失败";
		},
		failed: function () { return !g.ach525possible; },
		get reward() {
			return "+" +
				this.effect().noLeadFormat(3) +
				" 普通与暗 S 轴效果";
		},
		effect: function () {
			let out = (g.achievement[526]
				? achievement(526).effect()
				: c.d1).div(c.e4);
			if (betaActive) {
				out = out.mul(
					studies[12].reward(3).add(c.d1)
				);
			}
			return out;
		},
		flavor: "极简主义的极致"
	},

	526: {
		name: "大挤压",
		description: "在当前虫洞重置中未购买普通轴的情况下购买暗 X 轴",
		check: function () {
			return g.ach526possible &&
				g.darkXAxis.gt(c.d0) &&
				unlocked("Hawking Radiation");
		},
		event: "axisBuy",
		progress: function () {
			return g.ach526possible
				? {
					percent: achievement.percent(
						g.darkmatter,
						darkAxisCost("X"),
						0
					),
					text: "未完成！"
				}
				: "失败";
		},
		failed: function () { return !g.ach526possible; },
		prevReq: [525],
		get reward() {
			return "成就 " + achievement.label(525) +
				" 的奖励强度 +{}%（基于总普通轴）";
		},
		flavor: "", // 故意留空
		effect: function () {
			let out = Decimal.convergentSoftcap(
				stat.totalNormalAxis.add(c.d1).log10(),
				c.d4,
				c.d9
			);
			if (!betaActive) {
				out = out.mul(
					studies[12].reward(3).add(c.d1)
				);
			}
			out = out.add(c.d1);
			return out;
		},
		effectFormat: x =>
			x.sub(c.d1).mul(c.e2).noLeadFormat(3),
		formulaText: function () {
			let mult = studies[12].reward(3).add(c.d1);
			return formulaFormat.convSoftcap(
				"log(ΣA + 1)" +
					formulaFormat.mult(mult),
				c.d4.mul(mult),
				c.d9.mul(mult),
				stat.totalNormalAxis.gte(9999)
			) + " × 100";
		}
	},

	527: {
		name: "第四维度不存在",
		description: "在未拥有超过 3 种暗轴类型、也未重置暗轴的情况下，达到 160 总暗轴",
		check: function () {
			return stat.totalDarkAxis.gte(160) &&
				this.active() &&
				(achievement.ownedInTier(5) >= 7 ||
					g.darkstars.eq(c.d0));
		},
		event: "axisBuy",
		progress: function () {
			return (
				(g.darkstars.eq(c.d0) ||
					achievement.ownedInTier(5) >= 7) &&
				this.active()
			)
				? achievement.percent(
					stat.totalDarkAxis,
					c.d160,
					0
				)
				: "失败";
		},
		failed: function () { return !this.active(); },
		get reward() {
			return "暗星折算延迟 {} 颗暗星生效" +
				((Decimal.gte(
					g.lumens[5],
					this.yellowBreakpoints[0]
				) &&
					(g.studyCompletions[12] === 0))
					? " <span style=\"color:#666600\">(需完成研究 XII 才能生效)</span>"
					: "");
		},
		flavor: "爱因斯坦会同意",
		effect: function (y = this.yellowValue) {
			return studies[12].reward(2).mul(y).add(c.d4);
		},
		effectFormat: x => x.noLeadFormat(3),
		yellowBreakpoints: [
			c.d12.pow(c.d4),
			c.d12.pow(c.d7),
			1
		],
		active: function () {
			return axisCodes.map(
				x => g["dark" + x + "Axis"].eq(c.d0) ? 0 : 1
			).sum() <= 3;
		}
	},

	528: {
		name: "宏大平衡",
		description: "恰好拥有 40 颗星星与 40 颗暗星",
		check: function () {
			return g.stars === 40 &&
				g.darkstars.eq(c.d40);
		},
		prevReq: [412],
		event: "starBuy",
		progress: function () {
			return (g.stars <= 40 &&
				g.darkstars.lte(c.d40))
				? achievement.percent(
					Decimal.add(g.stars, g.darkstars),
					c.d80,
					0
				)
				: "失败";
		},
		failed: function () {
			return (g.stars > 40) | g.darkstars.gt(c.d40);
		},
		get reward() {
			return "每拥有 {} 个普通轴，免费获得 1 个对应的暗轴" +
				(axisCodes.map(i =>
					g[i + "Axis"]
				).reduce((x, y) => x.max(y))
					.mul(this.effect())
					.gte(c.e2)
					? "（超过 100 后软上限）"
					: "");
		},
		flavor: "不包括中子星、原恒星、白矮星、蓝超巨星，也不包括海星",
		effect: function (y = this.yellowValue) {
			let out = y.mul(c.d2)
				.pow10()
				.mul(c.d8em3);
			if (study13.bound(168)) {
				out = out.div(
					study13.bindingEff(168)
				);
			}
			if (study13.bound(178)) {
				out = out.div(
					study13.bindingEff(178)
				);
			}
			return out;
		},
		effectFormat: x => x.recip().noLeadFormat(3),
		yellowBreakpoints: [c.e4, c.e8, 1],
		scp: function (b188 = study13.bound(188)) {
			let out = c.d2;
			if (b188) {
				out = out.mul(
					study13.bindingEff(188)
				);
			}
			return out;
		},
		value: function (type) {
			return Decimal.linearSoftcap(
				g[type + "Axis"].mul(
					achievement(528).effect()
				),
				c.d100,
				this.scp(),
				1
			);
		}
	},

	529: {
		name: "百万富翁",
		get description() {
			return "达到 " + BEformat(c.ee6) + " 奇异物质";
		},
		check: function () {
			return g.exoticmatter.gt(c.ee6);
		},
		prevReq: [311],
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				g.exoticmatter,
				c.ee6,
				1
			);
		},
		get reward() {
			return "基础精通力指数的底值乘以 {}（基于霍金辐射）<br><span class=\"small\">(太长不看：更多精通力)</span>";
		},
		flavor: "去现实世界里成为百万富翁吧。",
		effect: function () {
			return Decimal.mul(
				Decimal.convergentSoftcap(
					g.hawkingradiation
						.add(c.d10)
						.dilate(c.d0_1)
						.div(c.d10),
					c.d1_75,
					c.d2
				),
				g.hawkingradiation
					.add(c.e10)
					.log10()
					.log10()
			).fix(c.d1);
		},
		effectFormat: x => x.noLeadFormat(4),
		formulaText: function () {
			return formulaFormat.convSoftcap(
				"10<sup>log(HR + 10)<sup>0.1</sup></sup> ÷ 10",
				c.d1_75,
				c.d2,
				g.hawkingradiation.gt(641695609)
			) + " × log<sup>[2]</sup>(HR + " +
				c.e10.format() + ")";
		}
	},

	530: {
		name: "大爆炸",
		description: "一次性批量购买 4,800 个普通轴",
		check: function () {
			return unlocked("Hawking Radiation");
		},
		progress: function () {
			return achievement.percent(
				axisCodes.map(x =>
					maxAffordableAxis(x)
				).reduce((x, y) => x.add(y))
					.sub(stat.totalNormalAxis),
				c.d4800,
				0
			);
		},
		reward: "暗轴价格折算减弱 1%",
		flavor: "是上帝创造了人，还是人创造了上帝？"
	}
},

6: {
	601: {
		name: "启蒙",
		description: "解锁光",
		check: function () { return g.research.r8_8; },
		event: "researchBuy",
		progress: function () { return "未完成！"; },
		reward: "基于奇异物质与星尘，获得更多霍金辐射（当前：{}）",
		flavor: "噢，独自知晓真理是多么艰难！",
		effect: function () {
			return [
				g.exoticmatter.add(c.d1)
					.pow(c.em8)
					.mul(c.d10)
					.layerplus(-2),
				g.stardust.add(c.d1)
					.pow(c.em5)
					.mul(c.d10)
					.layerplus(-2)
			].productDecimals().pow10();
		},
		effectFormat: x => percentOrMult(x, 2, true),
		formulaText: function () {
			let out =
				"10<sup>log<sup>[2]</sup>((EM + 1)<sup>" +
				c.em8.format() +
				"</sup> × 10) × log<sup>[2]</sup>((S + 1)<sup>" +
				c.em5.format() +
				"</sup> × 10)</sup>";
			return this.effect().gte(c.d10)
				? (out + "×")
				: ("(" + out + " - 1) × 100%");
		}
	},

	602: {
		name: "第十三区",
		description: "解锁 12 个星尘加成",
		check: function () {
			return g.stardustUpgrades[2] > 9;
		},
		event: "stardustUpgrade",
		progress: function () {
			return achievement.percent(
				N(g.stardustUpgrades[2] + 2),
				c.d12,
				0
			);
		},
		reward: "第三个星尘升级的费用提升至 0.9 次幂",
		flavor: "女士们先生们……欢迎来到第 76 届饥饿游戏！"
	},

	603: {
		name: "16,777,216 色定理",
		description: "获得每种主要光素各 1 个",
		check: function () {
			return !g.lumens.slice(0, 3)
				.map(x => x.eq(c.d0))
				.includes(true);
		},
		event: "lumenGain",
		progress: function () {
			return achievement.percent(
				g.lumens.slice(0, 3)
					.map(x => x.min(c.d1))
					.sumDecimals(),
				c.d3,
				0
			);
		},
		reward: "{} 色素获取（基于总光素）",
		flavor: "灵魂会被其思想的颜色所染。",
		yellowMult: function (y = this.yellowValue) {
			return y.lt(2 / 47)
				? y.mul(2.35)
				: y.mul(0.94).add(0.06);
		},
		effect: function (y = this.yellowValue) {
			return Decimal.add(
				g.lumens.sumDecimals().div(c.d100),
				[
					g.lumens.productDecimals()
						.pow(c.d0_1),
					this.yellowMult(y)
				].productDecimals().pow10()
			);
		},
		effectFormat: x => percentOrMult(x, 2, true),
		yellowBreakpoints: [c.e6, c.e100, 1],
		formulaText: function () {
			return (g.lumens.sumDecimals().gte(c.d900))
				? ("ΣL ÷ 100 + " +
					(this.yellowValue.eq(c.d0)
						? "1"
						: ("10<sup>(ΠL)<sup>0.1</sup>" +
							formulaFormat.mult(
								this.yellowMult()
							))) +
					"×")
				: "+ΣL<span style=\"font-style:normal;\">%</span>";
		}
	},

	604: {
		name: "毕业",
		description: "任意研究完成 4 次",
		check: function () {
			return g.studyCompletions.includes(4);
		},
		event: "wormholeResetAfter",
		progress: function () {
			return achievement.percent(
				N(g.studyCompletions.slice(1)
					.reduce((x, y) => Math.max(x, y))),
				c.d4,
				0
			);
		},
		get reward() {
			return "每次研究完成都会给予相关基础研究费用 1% 的免费发现值（当前总计：" +
				this.effValue().noLeadFormat(2) + ")";
		},
		flavor: "他会自动假设其他领域的专家都是魔术师，并根据自己无知的广度来判断他们智慧的深度……",
		studyValue: function (x) {
			if (x === 10) {
				return studies[10].researchList
					.slice(0, g.studyCompletions[10])
					.map(x => research[x].basecost)
					.sumDecimals()
					.mul(c.d0_01);
			}
			return research[studies[x].research]
				.basecost
				.mul(0.01 * g.studyCompletions[x]);
		},
		effValue: function () {
			return countTo(13)
				.map(x => this.studyValue(x))
				.sumDecimals();
		}
	},

	605: {
		name: "馈赠之时",
		description: "达到 256× 时间速度",
		check: function () {
			return stat.tickspeed.gte(c.d256);
		},
		prevReq: [411],
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				stat.tickspeed,
				c.d256,
				1
			);
		},
		reward: "研究 8-2 强度 +10%",
		flavor: "给予某人你的时间，是你能送出的最大的礼物。"
	},

	606: {
		name: "球状闪电",
		req: c.d10.quad_tetr(c.pi),
		get description() {
			return "达到 " +
				this.req.format() +
				((g.notation === "Tetration")
					? ""
					: " (10 ⇈ π)") +
				" 暗能量";
		},
		check: function () {
			return g.darkEnergy.gt(this.req);
		},
		prevReq: [402],
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				g.darkEnergy,
				this.req,
				1
			);
		},
		reward: "{} 所有能量获取（基于暗能量）",
		flavor: "用 X 编写图形程序，就像用罗马数字求 π 的平方根一样。",
		effect: function (y = this.yellowValue) {
			return g.darkEnergy
				.mul(c.ee10)
				.layerplus(-3)
				.pow(
					c.pi.sub(c.d2)
						.mul(y)
						.add(c.d2)
				);
		},
		effectFormat: x => percentOrMult(x, 2, true),
		yellowBreakpoints: [N(1e6), N(1570796), 1],
		formulaText: function () {
			return "log<sup>[3]</sup>(DE × " +
				c.ee10.format() +
				")<sup>" +
				c.pi.sub(c.d2)
					.mul(this.yellowValue)
					.add(c.d2)
					.noLeadFormat(4) +
				"</sup>×";
		}
	},

	607: {
		name: "这里有四盏灯",
		description: "至少拥有四种颜色的光素各 1 个",
		check: function () {
			return this.lumens() > 3;
		},
		prevReq: [603],
		event: "lumenGain",
		progress: function () {
			return achievement.percent(
				N(this.lumens()),
				c.d4,
				0
			);
		},
		get reward() {
			return "第 60 颗星以下的每颗星，色素获取除以 {} 而非 3";
		},
		flavor: "这里有六盏灯。你现在看到几盏？",
		effect: function (y = this.yellowValue) {
			return y.eq(c.d1)
				? c.d1_25
				: y.eq(c.d0)
					? N(2.75)
					: c.d2_5.sub(y);
		},
		effectFormat: x => x.noLeadFormat(3),
		yellowBreakpoints: [N(999), c.e4, 1],
		lumens: function () {
			return g.lumens.map(x => x.sign).sum();
		}
	},

	608: {
		name: "零玩家游戏 II",
		description: "在当前虫洞中不进行任何点击的情况下完成研究 I 第四层",
		check: function () {
			return (g.activeStudy === 1) &
				(g.studyCompletions[1] > 2) &&
				(!g.clickedInStudy1);
		},
		event: "wormholeResetBefore",
		progress: function () {
			return (g.studyCompletions[1] < 3)
				? "先完成研究 I 3 次"
				: (g.activeStudy !== 1)
					? "先进入研究 I"
					: g.clickedInStudy1
						? "失败"
						: achievement.wormholeProgress();
		},
		reward: "研究 I 的第三个奖励强度 +11.1%",
		flavor: "懒人唯一成功的时候，就是他试图什么都不做的时候。"
	},

	609: {
		name: "黑洞纪元 II",
		description: "在没有任何星星的情况下完成研究 II 第四层",
		check: function () {
			return (g.activeStudy === 2) &
				(g.studyCompletions[2] > 2) &&
				(g.stars === 0);
		},
		event: "wormholeResetBefore",
		progress: function () {
			return (g.studyCompletions[2] < 3)
				? "先完成研究 II 3 次"
				: (g.activeStudy !== 2)
					? "先进入研究 II"
					: (g.stars === 0)
						? achievement.wormholeProgress()
						: "失败";
		},
		failed: function () {
			return (g.studyCompletions[2] < 3) ||
				(g.activeStudy !== 2) ||
				(g.stars > 0);
		},
		reward: "研究 II 的第三个奖励强度 +11.1%",
		flavor: "让我们暂时不要努力成为黑洞。让我们照亮世界，而不是将其涂黑，也不要把它撕成碎片。让我们证明自己配得上成为星尘。"
	},

	610: {
		name: "三位九协会",
		description: "达到 999 发现值",
		check: function () {
			return g.totalDiscoveries.gte(999);
		},
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				g.totalDiscoveries,
				c.d999,
				0
			);
		},
		reward: "+{}% 霍金辐射（基于未花费发现值的百分比）",
		flavor: "999 紧急呼叫中心，请问您的紧急情况是什么？<br>“我的 Fitbit 说我快死了！”",
		effect: function () {
			return unspentDiscoveries()
				.div(
					g.totalDiscoveries.gte(c.d999)
						? g.totalDiscoveries
						: g.totalDiscoveries
							.mul(c.d999)
							.pow(c.d0_5)
							.max(c.d1)
				).add(c.d1);
		},
		effectFormat: x =>
			x.sub(c.d1).mul(c.e2).format(2),
		formulaText: () => "100 × υD ÷ ΣD"
	},

	611: {
		name: "八枚银币",
		description: "解锁 8 种颜色的光",
		check: function () { return g.research.r11_8; },
		event: "researchBuy",
		progress: function () { return "未完成！"; },
		prevReq: [607],
		get reward() {
			return "每购买 1 颗暗星，色素获取 +0.25%（总计：" +
				percentOrMult(
					N(1.0025).pow(g.darkstars),
					2,
					true
				) + ")";
		},
		flavor: "星星啊，收起你们的光芒，别让光照见我黑暗深沉的欲望"
	},

	612: {
		name: "星条旗",
		description: "购买第 60 颗星星",
		check: function () { return g.stars === 60; },
		event: "starBuy",
		progress: function () {
			return achievement.percent(
				N(g.stars),
				c.d60,
				0
			);
		},
		get reward() {
			return "每拥有一颗星星，星尘升级费用 ^{}，反之亦然（总计：^" +
				N(this.effect() ** g.stars)
					.noLeadFormat(3) +
				" 星星，^" +
				N(this.effect() **
					g.stardustUpgrades.sum())
					.noLeadFormat(3) +
				" 星尘升级）";
		},
		effect: function (y = this.yellowValue) {
			return 0.999 - 0.009 * y.toNumber();
		},
		effectFormat: x => N(x).noLeadFormat(5),
		yellowBreakpoints: [N(480), N(750), 0],
		flavor: "<span class=\"_jacorb\">(硬上限)</span>"
	},

	613: {
		name: "反物质学院",
		description: "同时激活研究 9-7、9-8 与 9-9",
		prevReq: [610],
		check: function () {
			return this.active() === 3;
		},
		event: "researchBuy",
		progress: function () {
			return achievement.percent(
				N(this.active()),
				c.d3,
				0
			);
		},
		active: function () {
			return [7, 8, 9].map(
				x => g.research["r9_" + x] ? 1 : 0
			).sum();
		},
		reward: "+{}× 研究 10-7、10-8 与 10-9 的效果",
		effect: function (y = this.yellowValue) {
			return y.pow10().pow10().sub(c.d1).div(c.d3);
		},
		effectFormat: x => x.noLeadFormat(2),
		yellowBreakpoints: [N(3333), N(333333), 2],
		flavor: "反物质学院的不公：初学者只能选择一个研究领域，而精英可以全选。“这不公平，伙计。为什么他们可以？”受挫的学生问道。"
	},

	614: {
		name: "红石时钟",
		description: "最近 10 次虫洞重置，每一次都不超过 1 秒",
		check: function () {
			return (g.previousWormholeRuns.last10.length == 10) &&
				(!g.previousWormholeRuns.last10
					.map(x =>
						parseFloat(x.time.toFixed(14)) <= 1.0
					).includes(false));
		},
		prevReq: [510],
		event: "wormholeResetAfter",
		progress: function () {
			return (g.previousWormholeRuns.last10.length === 10)
				? {
					percent: achievement.percent(
						N(this.time()),
						c.d1,
						x => x.recip()
					),
					text: "最慢的一次为 " +
						timeFormat(this.time())
				}
				: ("先完成 10 次虫洞重置（当前：" +
					g.previousWormholeRuns.last10.length +
					"）");
		},
		time: function () {
			return g.previousWormholeRuns.last10
				.map(x => x.time)
				.reduce((x, y) => Math.max(x, y));
		},
		get reward() {
			return "+1% 时间速度，乘以当前虫洞存活时间的秒数位数（当前：" +
				this.effect().format() +
				"%，下次提升在 " +
				timeFormat(
					this.effect().pow10()
						.sub(g.truetimeThisWormholeReset)
				) + "）";
		},
		effect: function () {
			return g.truetimeThisWormholeReset.gte(c.d10)
				? g.truetimeThisWormholeReset
					.log10()
					.floor()
					.add(c.d1)
				: c.d1;
		},
		flavor: "我想讲个关于红石延迟的笑话，但那样我就只是在重复我自己"
	},

	615: {
		name: "Twosday",
		req: N("2.22e2222"),
		get description() {
			return "累积 " + this.req.format() + " 精通力";
		},
		check: function () {
			return g.masteryPower.gte(this.req);
		},
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				g.masteryPower,
				this.req,
				1
			);
		},
		get reward() {
			return "精通 101 即使在未激活时也以平方根效果生效（当前：^" +
				masteryEffect(101)
					.pow(c.d0_5)
					.format(3) +
				")";
		},
		get flavor() {
			return "但 Twosday 已经是大约 " +
				Math.round(
					(Date.now() - 1645488000000) /
						86400000
				).toLocaleString("en-US") +
				" 天前的事了！";
		}
	},

	616: {
		name: "伪科学",
		description: "在没有任何已花费发现值的情况下完成 30 项研究",
		prevReq: [610, 611],
		check: function () {
			return (totalResearch.overall() >= 30) &&
				g.spentDiscoveries.eq(c.d0);
		},
		event: "researchBuy",
		progress: function () {
			return g.spentDiscoveries.eq(c.d0)
				? achievement.percent(
					N(totalResearch.overall()),
					c.d30,
					0
				)
				: "失败";
		},
		failed: function () {
			return g.spentDiscoveries.neq(c.d0);
		},
		reward: "每拥有一项研究，研究 7-5 强度 +0.33%",
		flavor: "关于我们<em>如何</em>进化的这些谜团，不应分散我们对一个无可争议事实的关注：我们<em>确实</em>进化了。"
	}
},

7: {
	701: {
		name: "阿奎利安星系",
		description: "创造一个星系",
		check: function () { return true; },
		event: "galaxyGain",
		progress: function () { return "未完成！"; },
		get reward() {
			return "前 40 颗星星花费减少 (-^0.01 / 星，当前：^" +
				this.realEffect().noLeadFormat(4) + ")";
		},
		realEffect: function () {
			return Decimal.FC_NN(
				1,
				0,
				1 - 0.01 * Math.max(0, 40 - g.stars)
			);
		},
		flavor: "你知道吗，你可以在 <a href=\"https://galaxy.click/play/129\" target=\"_blank\">galaxy.click</a> 上玩《奇异物质维度》？试试看！"
	},

	702: {
		name: "双重星系",
		description: "创造 2 个星系",
		check: function () { return g.galaxies >= 2; },
		event: "galaxyGain",
		progress: function () {
			return achievement.percent(
				N(g.galaxies),
				c.d2,
				0
			);
		},
		get reward() {
			return "每颗星，每颗星，星星费用除以 {}（基于当前虫洞时间）（总计：" +
				this.effect().pow(g.stars ** 2).format(2) +
				"）";
		},
		flavor: "你知道吗，你还可以在 <a href=\"https://alemaninc.github.io/Exotic-Matter-Dimensions/\" target=\"_blank\">alemaninc.github.io</a> 上玩《奇异物质维度》？那个也试试！",
		effect: function () {
			return g.truetimeThisWormholeReset
				.div(c.e7)
				.add(c.d1)
				.pow(c.e2);
		},
		effectFormat: x => x.formatFrom1(3),
		formulaText: () =>
			"(1 + t ÷ " + c.e7.format() + ")<sup>100</sup>"
	},

	703: {
		name: "你越过了巨墙",
		description: "创造 3 个星系",
		prevReq: [702],
		check: function () { return g.galaxies >= 3; },
		event: "galaxyGain",
		progress: function () {
			return achievement.percent(
				N(g.galaxies),
				c.d3,
				0
			);
		},
		reward: "星星折算起始点变为 {} 而非 25（基于霍金辐射）",
		flavor: "你知道吗，你还可以在 <a href=\"file:///C:/Users/\" target=\"_blank\">C:/Users/ale</a>……好吧，这个可能不行……",
		effect: function () {
			return g.hawkingradiation
				.add(c.e10)
				.log10()
				.log10()
				.add(c.d24);
		},
		effectFormat: x => x.noLeadFormat(4),
		formulaText: () =>
			"log<sup>[2]</sup>(HR + " +
			c.e10.format() + ") + 24"
	},

	704: {
		name: "五指折扣",
		get description() {
			return "拥有 " + BEformat(5555) + " 总暗轴";
		},
		check: function () {
			return stat.totalDarkAxis.gte(5555);
		},
		event: "axisBuy",
		progress: function () {
			return achievement.percent(
				stat.totalDarkAxis,
				N(5555),
				0
			);
		},
		reward: "+0.5555× 暗 Y 轴效果",
		flavor: "你得顺手牵羊一两件！"
	},

	705: {
		name: "此地永无芳名",
		description: "使暗能量效果低于 0.003",
		check: function () {
			return stat.darkEnergyEffect.lt(c.d3em3);
		},
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				stat.darkEnergyEffect,
				c.d3em3,
				1
			);
		},
		reward: "研究 III 的第三个奖励强度 +11.1%",
		flavor: "给我两年时间，你的晚餐就免费了"
	},

	706: {
		name: "皮质烘焙师",
		description: "达到知识效果软上限",
		check: function () {
			return Decimal.div(
				stat.knowledgeEffect,
				stat.knowledgeEffectCap
			).gte(c.d0_75);
		},
		prevReq: [610],
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				stat.knowledgeEffect,
				stat.knowledgeEffectCap.mul(c.d0_75),
				0
			);
		},
		reward: "每个暗 W 轴（含免费）给予暗物质获取 {}× 乘数（基于知识）",
		flavor: "知识就像大海。潜得太深，那压垮人的重量可能会杀了你。",
		scp: function (b204 = study13.bound(204)) {
			let out = c.d0_1;
			if (b204) {
				out = out.mul(
					study13.bindingEff(204)
				);
			}
			return out;
		},
		effect: function (b204 = study13.bound(204)) {
			return Decimal.logarithmicSoftcap(
				g.knowledge.add(c.d1)
					.log10()
					.pow(c.d2div3),
				c.e3,
				this.scp(b204),
				1
			).sub(c.inflog)
				.pow10()
				.add(c.d1);
		},
		effectFormat: x => x.noLeadFormat(2),
		formulaText: function () {
			return "10<sup>" +
				formulaFormat.logSoftcap(
					"log(K + 1)<sup>2 ÷ 3</sup>",
					c.e3,
					this.scp(),
					g.knowledge.gt("ee4.5")
				) +
				" - 308.254</sup> + 1";
		}
	},

	707: {
		name: "虚空主宰",
		get description() {
			return "在不购买普通轴、不激活精通、不进行星尘重置、不购买星星或星尘升级、也没有临时研究的情况下，达到 " +
				c.e30.format() + " 精通力";
		},
		check: function () {
			return g.masteryPower.gte(c.e30) &&
				stat.totalNormalAxis.eq(c.d0) &&
				g.ach524possible &&
				(g.TotalStardustResets === 0) &&
				(g.stars === 0) &&
				(effectiveStardustUpgrades() === 6) &&
				(totalResearch.temporary === 0);
		},
		event: "gameloop",
		progress: function () {
			return (totalResearch.temporary > 0)
				? "因拥有研究而失败"
				: (g.stars > 0)
					? "因拥有星星而失败"
					: (effectiveStardustUpgrades() > 6)
						? "因购买星尘升级而失败"
						: (g.TotalStardustResets > 0)
							? "因星尘重置而失败"
							: (!g.ach524possible)
								? "因激活精通而失败"
								: (stat.totalNormalAxis.neq(c.d0))
									? "因拥有轴而失败"
									: achievement.percent(
										g.masteryPower,
										c.e30,
										1
									);
		},
		failed: function () {
			return stat.totalNormalAxis.neq(c.d0) ||
				(!g.ach524possible) ||
				(g.TotalStardustResets !== 0) ||
				(g.stars !== 0) ||
				(effectiveStardustUpgrades() !== 6) ||
				(totalResearch.temporary !== 0);
		},
		reward: "+{} 基础精通力获取指数（基于上次取消精通分配以来的时间）",
		flavor: "这不是钢铁意志 VI",
		effect: function (y = this.yellowValue) {
			return stat.masteryTimer
				.log10()
				.add1PowSub1(y.add(c.d1));
		},
		effectFormat: x => x.format(3),
		yellowBreakpoints: [N(7e5), N(777777), 0],
		formulaText: function () {
			return this.yellowValue.eq(c.d0)
				? "log(t + 1)"
				: ("(log(t + 1) + 1)<sup>" +
					this.yellowValue
						.add(c.d1)
						.noLeadFormat(4) +
					"</sup> - 1");
		}
	},

	...(() => {
		let out = {};
		for (let i = 0; i < 3; i++) {
			let req = N(
				["7.77e777", "3.33e833", "8.88e888"][i]
			);
			out[708 + i] = {
				name: "令人费解的曲率" +
					achievement.roman(i + 1),
				get description() {
					return "使成就 " +
						achievement.label(501) +
						" 的奖励效果超过 " +
						req.format() + "×";
				},
				check: function () {
					return achievement(501)
						.realEffect()
						.gte(req);
				},
				prevReq: i === 0 ? [] : [707 + i],
				event: "gameloop",
				progress: function () {
					return {
						percent: achievement.percent(
							achievement(501)
								.realEffect(),
							req,
							1
						),
						text: "预计达成所需时间：" +
							timeFormat(
								req.root(
									achievement(501)
										.effectExp()
								)
									.sub(c.d1)
									.div(
										achievement(501)
											.perSec()
									)
									.sub(
										g.truetimeThisWormholeReset
									)
									.div(stat.tickspeed)
							)
					};
				},
				get reward() {
					return [
						"精通 101 与 103 可同时激活",
						"成就 " +
							achievement.label(501) +
							" 奖励会降低暗轴费用",
						"精通 103 强度 ×9"
					][i];
				},
				flavor: [
					"上帝是一个哲学黑洞——理性崩塌之处。",
					"上帝不仅掷骰子，有时还把它们扔到看不见的地方。",
					"奥斯维辛将永远是整个人类历史的黑洞"
				][i]
			};
		}
		return out;
	})(),

	711: {
		name: "月光之都",
		description: "在不超过 40 颗星星的情况下每秒产生 1 色素",
		check: function () {
			return g.ach711Progress < 41;
		},
		event: "gameloop",
		progress: function () {
			return (g.ach711Progress === 61)
				? ("每秒 1 色素在" +
					(unlocked("Matrix")
						? "当前矩阵中未达到"
						: "从未达到"))
				: (g.stars <= (39 - this.milestones()))
					? {
						percent: achievement.percent(
							stat.chromaPerSec,
							c.d1,
							0
						),
						text: g.stars +
							" / " +
							(39 - this.milestones()) +
							" 颗星星"
					}
					: "失败";
		},
		failed: function () {
			return g.stars >
				(g.achievement[711]
					? (39 - this.milestones())
					: 40);
		},
		get reward() {
			return "解锁精通 105，且精通 105 以 {}% 效率工作" +
				((g.ach711Progress === 0)
					? ""
					: ("（基于首次达到每秒 1 色素时的最少星星数。下一个里程碑在 " +
						Math.min(
							g.ach711Progress - 1,
							39
						) + ")"));
		},
		flavor: "我只知道两段曲子；一段是《月光》，另一段不是",
		milestones: function () {
			return 40 - g.ach711Progress;
		},
		maxMilestones: 40,
		effect: function () {
			return (g.ach711Progress === 0)
				? c.d1
				: (g.ach711Progress > 40)
					? c.d0
					: Decimal.FC_NN(
						1,
						0,
						0.91 - g.ach711Progress / 50
					);
		},
		effectFormat: x =>
			x.mul(c.e2).max(c.d11).format(),
		formulaText: () =>
			"max(100 × ⌊μ ÷ 40⌋, 11 + μ × 2)"
	},

	712: {
		name: "倒带",
		description: "购买一项位于其下方研究之后的研究",
		check: function () {
			return g.research.r15_2 ||
				g.research.r15_14;
		},
		event: "researchBuy",
		progress: function () { return "未完成！"; },
		reward: "每项光子研究使所有其他光子研究费用减少 {} 发现值",
		effect: function (y = this.yellowValue) {
			return y.mul(c.d1404).add(c.d36);
		},
		effectFormat: x => x.noLeadFormat(3),
		yellowBreakpoints: [c.d3600, N(144000), 0],
		flavor: "如果你错过了起点、基础，那你注定要回头重学基础。"
	},

	713: {
		name: "V 的成就",
		description: "同时激活所有色素研究",
		check: function () {
			return this.active() === 6;
		},
		prevReq: [613],
		event: "researchBuy",
		progress: function () {
			return achievement.percent(
				N(this.active()),
				c.d6,
				0
			);
		},
		active: function () {
			return [7, 8, 9].map(
				x => g.research["r10_" + x]
					? 2
					: g.research["r9_" + x]
						? 1
						: 0
			).sum();
		},
		get reward() {
			return "将所有色素研究的费用乘数降低至 {}×" +
				(g.lumens[5].gte(c.d500)
					? ""
					: "（必须拥有 500 黄光素才能生效）");
		},
		effect: function (y = this.yellowValue) {
			return c.d4.pow(c.d1.sub(y));
		},
		effectFormat: x => x.noLeadFormat(3),
		yellowBreakpoints: [N(500), N(50000), 1],
		flavor: "反物质学院的不公：初学者只能选择一个领域，而精英可以全选。“这不公平，伙计。为什么他们可以？”受挫的学生问道。"
	},

	714: {
		name: "高龄",
		description: "游玩 122 年",
		check: function () {
			return g.truetimePlayed.gt(31556926 * 122);
		},
		prevReq: [106],
		event: "gameloop",
		progress: function () {
			return {
				percent: achievement.percent(
					g.truetimePlayed.div(31556926),
					c.d122,
					0
				),
				text: "距离达成还剩真实时间：" +
					timeFormat(
						N(31556926 * 122)
							.sub(g.truetimePlayed)
							.div(stat.tickspeed)
					)
			};
		},
		get reward() {
			return "+{} 额外发现值（基于游玩时间）" +
				(this.effect().gt(
					g.knowledge.add1Log(c.d10)
						.div(c.d10)
				)
					? ("（基于知识，超过 " +
						g.knowledge.add1Log(c.d10)
							.pow(c.d0_9)
							.format() +
						" 后软上限）")
					: "");
		},
		effect: function () {
			let out = g.truetimePlayed.div(31556926);
			return Decimal.logarithmicSoftcap(
				out,
				g.knowledge.add1Log(c.d10)
					.pow(c.d0_9),
				c.d1
			);
		},
		effectFormat: x => x.format(3),
		formulaText: function () {
			return formulaFormat.logSoftcap(
				"t ÷ 31,556,926",
				g.knowledge.add1Log(c.d10)
					.div(c.d0_9),
				c.d1,
				this.effect().gt(
					g.knowledge.add1Log(c.d10)
						.div(c.d0_9)
				)
			);
		},
		flavor: "一旦你觉得做某事太老，那就去做它。"
	},

	715: {
		name: "亚稳态",
		description: "仅进行一次星尘重置便完成研究 IV 第四层",
		check: function () {
			return (g.activeStudy === 4) &
				(g.studyCompletions[4] > 2) &&
				(g.TotalStardustResets < 2);
		},
		event: "wormholeResetBefore",
		progress: function () {
			return (g.studyCompletions[4] < 3)
				? "先完成研究 IV 3 次"
				: (g.activeStudy !== 4)
					? "先进入研究 IV"
					: g.TotalStardustResets > 1
						? "失败"
						: achievement.wormholeProgress();
		},
		failed: function () {
			return (g.studyCompletions[4] < 3) ||
				(g.activeStudy !== 4) ||
				(g.TotalStardustResets > 1);
		},
		reward: "研究 IV 的第三个奖励强度 +11.1%",
		flavor: "大自然厌恶真空，如果我能足够漫不经心地行走，我确信会被填满。"
	},

	716: {
		name: "无限升级",
		get description() {
			return "以低于 " +
				c.inf.recip().format() +
				" 星尘的价格购买一个星尘升级";
		},
		check: function () { return true; },
		progress: function () {
			let min = countTo(5).map(
				x => stat["stardustUpgrade" + x + "Cost"]
			).reduce((x, y) => x.min(y));
			return min.lt(c.inf.recip())
				? "目前可达成！"
				: achievement.percent(
					min,
					c.inf.recip(),
					1
				);
		},
		reward: "9-成就虫洞里程碑效果提升至 {} 次幂（基于当前虫洞时间）",
		timeMult: function () {
			let out = c.em4;
			if (g.wormholeUpgrades[4]) {
				out = out.mul(c.e2);
			}
			return out;
		},
		effect: function () {
			return g.truetimeThisWormholeReset
				.mul(this.timeMult())
				.add(c.d10)
				.log10()
				.log10()
				.div(c.d10)
				.add(c.d1);
		},
		effectFormat: x => x.format(4),
		formulaText: function () {
			return "log<sup>[2]</sup>(t" +
				formulaFormat.mult(this.timeMult()) +
				" + 10) ÷ 10 + 1";
		},
		flavor: "我无法构想无限，但我也不接受有限。"
	},

	717: {
		name: "蚁神的发现",
		description: "购买一项空间协同研究",
		prevReq: [712],
		event: "researchBuy",
		check: function () {
			return g.research.r17_1 ||
				g.research.r17_15;
		},
		progress: function () { return "未完成！"; },
		get reward() {
			return "普通与暗轴价格折算减弱 {}%（基于历史最高奇异物质）";
		},
		power: function () {
			let out = c.d1;
			if (study13.bound(206)) {
				out = out.mul(
					study13.bindingEff(206)
				);
			}
			return out;
		},
		effect: function () {
			return Decimal.convergentSoftcap(
				g.exoticmatterThisSpacetimeReset
					.add(c.d1)
					.log10()
					.div(c.e8)
					.add(c.d1)
					.log2()
					.mul(this.power()),
				c.d25,
				c.d50
			);
		},
		effectFormat: x => x.toFixed(3),
		formulaText: function () {
			return formulaFormat.convSoftcap(
				"log<sub>2</sub>(log(EM) ÷ " +
					c.e8.format() + " + 1)" +
					formulaFormat.mult(this.power()),
				c.d25,
				c.d50,
				this.effect().gt(c.d25)
			);
		},
		flavor: "这是我的歌，没人能夺走<br>已经这么久了，但你现在来了，长驻于此<br>我想知道你是否明白梦想成真的意义"
	},

	718: {
		name: "软上限染色的灯",
		description: "分别拥有 26 个黑白光素",
		prevReq: [611],
		check: function () {
			return g.lumens[6].gt(c.d25) &&
				g.lumens[7].gt(c.d25);
		},
		event: "lumenGain",
		progress: function () {
			return achievement.percent(
				Decimal.add(
					g.lumens[6].min(c.d26),
					g.lumens[7].min(c.d26)
				),
				c.d52,
				0
			);
		},
		get reward() {
			return "研究 13-8 强度 +2.6%，若启用色素生成，则所有颜色的色素同时以 (1 ÷ " +
				c.e15.format() + ") 效率生成。";
		},
		flavor: "施工中：所有机制必须佩戴硬帽。"
	},

	719: {
		name: "OMCCDV II",
		req: Decimal.FC_NN(1, 0, 44059),
		description: "达到 44,059 总轴",
		prevReq: [719],
		check: function () {
			return stat.totalAxis.gte(this.req);
		},
		event: "axisBuy",
		progress: function () {
			return achievement.percent(
				stat.totalAxis,
				this.req,
				0
			);
		},
		get reward() {
			return "每次观测使知识获取增加 (2,020 + 816 × [星系数])%，并自我复合（当前：" +
				this.effect().format() + "×）";
		},
		flavor: "“这是一座房子，你想住在这里吗？” —— Stat Mark, 2020",
		effect: function () {
			return N(8.16)
				.mul(g.galaxies)
				.add(21.2)
				.pow(g.observations.sumDecimals());
		}
	}
},
	8: {
	801: {
		name: "探险家",
		description: "揭示所有空间协同研究",
		check: function () {
			return this.revealed() === 56;
		},
		event: "researchBuy",
		progress: function () {
			function q(x) {
				return "<span style=\"color:#330066\">" +
					"?".repeat(x) + "</span>";
			}
			return this.revealed() + " / " + q(2) +
				" (" + q(2) + "." + q(3) + "%)";
		},
		reward: "霍金辐射获取乘以基于第 8 页成就数量的加成（当前：×{}）",
		effect: function () {
			return Decimal.FC_NN(
				1,
				0,
				10 ** ((1 + achievement.ownedInTier(8) * 0.08) ** 2 - 1)
			);
		},
		effectFormat: x => x.noLeadFormat(2),
		formulaText: () =>
			"10<sup>(1 + A × 0.08)<sup>2</sup> - 1</sup>",
		flavor: "冒险只是糟糕的计划。",
		revealed: function () {
			let v = visibleResearch();
			return researchGroupList.spatialsynergism
				.contents
				.map(x => v.includes(x) ? 1 : 0)
				.sum();
		}
	},

	802: {
		name: "遮蔽太阳",
		get description() {
			return "达到 " +
				c.d2_1e67.format() + " 霍金辐射";
		},
		check: function () {
			return g.hawkingradiation.gte(c.d2_1e67);
		},
		prevReq: [518],
		event: "wormholeResetAfter",
		progress: function () {
			return achievement.percent(
				g.hawkingradiation,
				c.d2_1e67,
				1
			);
		},
		get reward() {
			return "每拥有 1 个黑洞观测，暗 X 轴效果 +1%（当前：" +
				percentOrMult(
					g.observations[3].div(c.e2).add(c.d1),
					2,
					true
				) + ")";
		},
		flavor: "每一次革命都会蒸发，只留下新的官僚主义的黏液。"
	},

	803: {
		name: "三进制",
		description: "每种普通轴的数量至少是下一种普通轴的 3 倍，且至少拥有 1 个 S 轴。",
		check: function () {
			if (g.SAxis.eq(c.d0)) return false;
			for (let i = 0; i < 7; i++) {
				if (Decimal.lt(
					g[axisCodes[i] + "Axis"],
					g[axisCodes[i + 1] + "Axis"].mul(c.d3)
				)) return false;
			}
			return true;
		},
		event: "axisBuy",
		progress: function () {
			if (stat.realSAxis.eq(c.d0))
				return "需要一个 S 轴";
			let text = "立刻进行虫洞以完成此成就！",
				minratio = c.d3;
			for (let i = 0; i <= axisCodes.length - 2; i++) {
				if (g[axisCodes[i + 1] + "Axis"].gt(c.d0)) {
					minratio = minratio.min(
						Decimal.div(
							g[axisCodes[i] + "Axis"],
							g[axisCodes[i + 1] + "Axis"]
						)
					);
				}
				if (Decimal.lt(
					g[axisCodes[i] + "Axis"],
					g[axisCodes[i + 1] + "Axis"].mul(c.d3)
				)) {
					text =
						g[axisCodes[i] + "Axis"].noLeadFormat(3) +
						" / " +
						g[axisCodes[i + 1] + "Axis"]
							.mul(c.d3)
							.noLeadFormat(3) +
						" " + axisCodes[i] + " 轴";
				}
			}
			return {
				percent: minratio.toNumber() / 0.03,
				text: text
			};
		},
		reward: "第 3 个暗星效果软上限减弱 3%",
		flavor: "“达到三进制需要惊人的 1.00E100<br>这需要 2 小时来完成<br>三进制是最终进制。你必须达到<br>ω^ω^ω，这需要 1 天。”<br>—— Stat Mark"
	},

	804: {
		name: "但泽俄罗斯",
		req: N("e771277123"),
		get description() {
			return "达到 " +
				((g.notation === "BE Default")
					? "1e771277123"
					: ["Engineering", "Mixed scientific", "Scientific"]
							.includes(g.notation)
						? "1.00e771,277,123"
						: (g.notation === "Logarithm")
							? "e771,277,123"
							: this.req.format()) +
				" 奇异物质";
		},
		check: function () {
			return g.exoticmatter.gt(this.req);
		},
		prevReq: [529],
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				g.exoticmatter,
				this.req,
				1
			);
		},
		get reward() {
			return "每 7 颗暗星 +12.3% Y 轴效果（总计：" +
				percentOrMult(
					N(1.123).pow(
						stat.realDarkStars.div(c.d7).floor()
					),
					2,
					true
				) + ")";
		},
		flavor: "仰望星辰，看见我的伤疤"
	},

	805: {
		name: "能量时刻",
		req: N("ee60"),
		get description() {
			return "达到 " + this.req.format() + " 元能量";
		},
		check: function () {
			return g.metaEnergy.gt(this.req);
		},
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				g.metaEnergy,
				this.req,
				1
			);
		},
		get reward() {
			return "成就 " + achievement.label(510) +
				" 的奖励硬上限变为软上限，且起始点为 {}%（基于元能量）";
		},
		effect: function () {
			return g.metaEnergy
				.log10()
				.pow(c.d0_1)
				.add(c.e6)
				.pow(0.0162)
				.mul(c.d20);
		},
		effectFormat: x => x.noLeadFormat(3),
		formulaText: function () {
			return "(log(ME)<sup>0.1</sup> + " +
				c.e6.format() +
				")<sup>0.0162</sup> × 20";
		},
		flavor: "你刚刚拨动了我的开关？"
	},

	806: {
		name: "廉价填充 II",
		get description() {
			return "使所有暗轴价格降至 " +
				BEformat(c.eme5) +
				((achievement.ownedInTier(5) < 7)
					? " 且在本虫洞中不重置暗物质"
					: "");
		},
		check: function () {
			return this.lowest().lt(c.eme5) &&
				((achievement.ownedInTier(5) > 6) ||
					g.darkstars.eq(c.d0));
		},
		prevReq: [517],
		event: "gameloop",
		progress: function () {
			return ((achievement.ownedInTier(5) < 7) &&
					g.darkstars.gt(c.d0))
				? "失败"
				: achievement.percent(
					this.lowest(),
					c.eme5,
					1
				);
		},
		failed: function () {
			return (achievement.ownedInTier(5) < 7) &&
				g.darkstars.gt(c.d0);
		},
		reward: "所有暗轴价格 ^0.95",
		flavor: "让我们跌破零点，躲开太阳",
		lowest: function () {
			return axisCodes.slice(0, 8)
				.map(x => darkAxisCost(x))
				.reduce((x, y) => x.max(y));
		}
	},

	807: {
		name: "获得幸运",
		description: "购买一个幸运升级",
		prevReq: [807],
		check: function () {
			return Object.values(g.luckUpgrades)
				.map(x => Object.values(x))
				.flat()
				.map(x => x.sign)
				.includes(1);
		},
		event: "buyLuckUpgrade",
		progress: function () { return "未完成！"; },
		reward: "幸运碎片获取乘以 {}（基于总符文）",
		effect: function () {
			return Object.values(g.totalLuckRunes)
				.map(x => x.div(c.e2).add(c.d10).log10())
				.productDecimals()
				.pow10()
				.sub(c.d9);
		},
		effectFormat: x => x.noLeadFormat(2),
		formulaText: function () {
			return runeTypeUnlocked("quatrefolium")
				? ("10<sup>Π<span class=\"xscript\"><sup>" +
					luckRuneTypes.map(
						x => runeTypeUnlocked(x) ? 1 : 0
					).sum() +
					"</sup><sub>1</sub></span>log(R" +
					(runeTypeUnlocked("quatrefolium")
						? "<sub>n</sub>"
						: "") +
					" ÷ 100 + 10)</sup> - 9")
				: "1 + R ÷ 100";
		},
		flavor: "噢，我好像用完了随机存取<span style=\"color:#9575cd\">记忆</span>……"
	},

	808: {
		name: "八色魔法",
		description: "购买一个棱镜升级",
		prevReq: [808],
		event: "prismaticUpgradeBuy",
		check: function () {
			return Object.values(g.prismaticUpgrades)
				.map(x => x.sign)
				.includes(1);
		},
		progress: function () { return "未完成！"; },
		reward: "暗 W 轴强度 +{}%（基于永久研究数量）",
		effect: function () {
			let r = totalResearch.permanent;
			return Math.exp(-r / 100) + r / 100;
		},
		effectFormat: x =>
			N((x - 1) * 100).noLeadFormat(2),
		formulaText: () =>
			"100 × (1 - e<sup>R ÷ 100</sup>) + R",
		flavor: "开火，我会移动。"
	},

	809: {
		name: "伪神毁灭者",
		description: "购买一个反轴",
		prevReq: [809],
		check: function () {
			for (let i of axisCodes) {
				if (g["anti" + i + "Axis"].neq(c.d0)) {
					return true;
				}
			}
			return false;
		},
		event: "axisBuy",
		progress: function () { return "未完成！"; },
		reward: "免费轴软上限的起始点与限制提高 5 个百分点",
		flavor: "有一天，alemaninc 对 Stat Mark 不太友好。于是 Stat Mark 向天堂的 Pelle 祈祷，她赐予 Stat Mark 在他想要的任何地方制造反物质风暴的力量。Stat Mark 把反物质风暴送给了 alemaninc，摧毁了他的房子。从此再也没人见过 alemaninc。"
	},

	810: {
		name: "夜之极夜",
		description: "解锁研究的研究",
		prevReq: [810],
		check: function () { return g.research.r26_5; },
		event: "researchBuy",
		progress: function () { return "未完成！"; },
		get reward() {
			return "研究 3-6 与 3-10 强度 +{}%（基于红光素）";
		},
		flavor: "提前两小时回来。",
		effect: function () {
			return g.lumens[0]
				.div(c.e3)
				.add(c.d1)
				.log10()
				.pow(c.d2)
				.add(c.d1);
		},
		effectFormat: x =>
			x.sub(c.d1).mul(c.e2).noLeadFormat(3),
		formulaText: () =>
			"log(L ÷ 1,000 + 1)<sup>2</sup> × 100"
	},

	811: {
		name: "一千垓光子的壁垒",
		description: "创造 7 个星系",
		prevReq: [703],
		check: function () { return g.galaxies >= 7; },
		event: "galaxyGain",
		progress: function () {
			return achievement.percent(
				N(g.galaxies),
				c.d7,
				0
			);
		},
		get reward() {
			return "每少于你的最高星系数 1 个星系，星星费用提升至 0.97 次幂" +
				(unlocked("Matrix")
					? " 本矩阵"
					: "") +
				"（当前：^" +
				c.d0_97
					.pow(
						g.highestGalaxiesSpacetime -
						g.galaxies
					)
					.noLeadFormat(3) +
				"）";
		},
		flavor: "Aarexian 平衡的红药丸与升级点击器的蓝药丸"
	},

	812: {
		name: "石器时代",
		description: "在没有临时研究的情况下完成研究 V 第四层（不包含研究本身的研究）",
		check: function () {
			return (g.activeStudy === 5) &&
				(g.studyCompletions[5] > 2) &&
				(totalResearch.temporary === 0);
		},
		event: "wormholeResetBefore",
		progress: function () {
			return (g.studyCompletions[5] < 3)
				? "先完成研究 V 3 次"
				: (g.activeStudy !== 5)
					? "先进入研究 V"
					: totalResearch.temporary === 0
						? achievement.wormholeProgress()
						: "失败";
		},
		failed: function () {
			return (g.studyCompletions[5] < 3) ||
				(g.activeStudy !== 5) ||
				(totalResearch.temporary !== 0);
		},
		reward: "研究 V 的第三个奖励强度 +11.1%",
		flavor: "我们已经从石器时代进步到了石心人的时代。"
	},

	813: {
		name: "零维中的隐藏之星",
		req: N(208),
		get description() {
			return "在本虫洞中，没有任何普通或暗轴的情况下，拥有 " +
				this.req.format() +
				" 总星星、（有效）暗星和星系" +
				(achievement.ownedInTier(5) > 6
					? ""
					: " 且在本虫洞中不重置暗物质");
		},
		check: function () {
			return g.ach526possible &&
				(stat.totalDarkAxis.sign === 0) &&
				((achievement.ownedInTier(5) > 6) ||
					g.darkstars.eq(c.d0)) &&
				stat.realDarkStars
					.add(g.stars + g.galaxies)
					.gte(this.req);
		},
		event: "gameloop",
		progress: function () {
			return ((achievement.ownedInTier(5) < 7) &&
					g.darkstars.gt(c.d0))
				? "因重置暗星而失败"
				: (!g.ach526possible)
					? "因本虫洞中存在普通轴而失败"
					: (stat.totalDarkAxis.sign === 1)
						? "因本虫洞中存在暗轴而失败"
						: achievement.percent(
							stat.realDarkStars
								.add(g.stars + g.galaxies),
							N(this.req),
							0
						);
		},
		failed: function () {
			return ((achievement.ownedInTier(5) < 7) &&
					g.darkstars.gt(c.d0)) ||
				(!g.ach526possible) ||
				(stat.totalDarkAxis.sign !== 0);
		},
		reward: "暗星折算减弱 5%",
		flavor: "我不需要睡眠，不需要答案。我需要确定，在这片失衡公式的沼泽中，真理之蟾蜍蹲在何处。"
	},

	814: {
		name: "触碰虚空",
		description: "在 6 秒或更短时间内完成研究 VI 第四层",
		check: function () {
			return (g.activeStudy === 6) &&
				(g.studyCompletions[6] > 2) &&
				(g.timeThisWormholeReset < 6);
		},
		prevReq: [510],
		event: "wormholeResetBefore",
		progress: function () {
			return (g.studyCompletions[6] < 3)
				? "先完成研究 VI 3 次"
				: (g.activeStudy !== 6)
					? "先进入研究 VI"
					: (g.timeThisWormholeReset < 6)
						? {
							percent: achievement.wormholeProgress(),
							text: timeFormat(
								6 - g.timeThisWormholeReset
							) + " 剩余"
						}
						: "失败";
		},
		reward: "研究 VI 的第三个奖励强度 +11.1%",
		flavor: "生命宽广无边。没有边界，没有疆域。"
	},

	815: {
		name: "幻想乡千年",
		get description() {
			return "每秒产生 " +
				c.ee3.format() + " 色素";
		},
		check: function () {
			return stat.chromaPerSec.gt(c.ee3);
		},
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				stat.chromaPerSec,
				c.ee3,
				1
			);
		},
		flavor: "从永恒的观点来看，你不过是一瞬间。",
		get reward() {
			return "解锁无需消耗任何代价即可同时生成所有类型色素的选项。然而，激活时色素生成会根据色素费用乘数降低（当前：×{}）" +
				(((study13.rewardLevels.hyperdrive !== 0) ||
					unlocked("Matrix"))
					? "<br><br><i>（这是一个纯乘数，意味着不受指数、扩张或层级函数影响）</i>"
					: "");
		},
		effect: function () {
			return c.d1
				.sub(stat.chromaCostMultiplier)
				.max(c.d0);
		},
		effectFormat: x => x.noLeadFormat(3),
		formulaText: () => "max(1 - m, 0)"
	},

	816: {
		name: "宇宙心智",
		get description() {
			return "拥有 ^" +
				c.inflog.format(5) +
				" 的精通 101 效果";
		},
		check: function () {
			return achievement(501)
				.effectExp()
				.gt(c.inflog);
		},
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				achievement(501).effectExp(),
				c.inflog,
				0
			);
		},
		get reward() {
			return "成就 " +
				achievement.label(501) +
				" 的奖励增速翻倍";
		},
		flavor: "永恒心智中的一次脉冲，亦复如是"
	},

	817: {
		name: "认知的存在",
		description: "在不花费任何发现值的情况下拥有所有理论研究",
		check: function () {
			return (ownedResearchInGroup("study5a").length === 4) &&
				g.spentDiscoveries.eq(c.d0);
		},
		event: "researchBuy",
		progress: function () {
			return g.spentDiscoveries.eq(c.d0)
				? achievement.percent(
					N(ownedResearchInGroup("study5a").length),
					c.d4,
					0
				)
				: "失败";
		},
		failed: function () {
			return g.spentDiscoveries.neq(c.d0);
		},
		reward: "解锁花费 0 发现值的研究自动购买器",
		flavor: "我确信，逻辑思维的艺术不可能是人类心智的本能。"
	},

	818: {
		name: "世界第八大奇迹",
		description: "购买一个反 S 轴",
		prevReq: [809],
		check: function () {
			return g.antiSAxis.neq(c.d0);
		},
		event: "axisBuy",
		progress: function () { return "未完成！"; },
		reward: "每个反 U 轴给予 1 个免费反 X 轴",
		flavor: "是我们生活的世界的奇迹"
	},

	819: {
		name: "独角兽之力",
		description: "拥有研究 24-8",
		prevReq: [808],
		check: function () { return g.research.r24_8; },
		event: "researchBuy",
		progress: function () { return "未完成！"; },
		get reward() {
			return "基于棱镜值，减弱幸运与反物质研究的惩罚 {}" +
				(this.effect().lt(c.d0_1) ? "×" : "%") +
				"，且 Quatrefolium " +
				luckUpgrades.quatrefolium.prismatic.name +
				" 强度 ×2";
		},
		effect: function (y = this.yellowValue) {
			return g.prismatic
				.add(c.d1)
				.log10()
				.div(c.e3)
				.add(c.d1)
				.pow(y.pow10().neg());
		},
		effectFormat: function (x) {
			return this.effect().lt(c.d0_1)
				? x.recip().formatFrom1(4)
				: c.d1.sub(x).mul(c.e2).noLeadFormat(3);
		},
		formulaText: function () {
			let out =
				"(log(P + 1) ÷ 1,000 + 1)" +
				formulaFormat.exp(
					this.yellowValue.pow10().neg(),
					false,
					4
				);
			if (this.effect().gte(c.d0_1)) {
				out = "(1 - " + out + ") × 100";
			}
			return out;
		},
		yellowBreakpoints: [c.d5e4, N(5e9), 1],
		flavor: "我不会回望，不会低头，我在上升，你最好转身"
	},

	820: {
		name: "一小时内的永恒",
		description: "在不到 1 小时真实时间内，在本虫洞中达到 1 年游戏时间",
		check: function () {
			return g.truetimeThisWormholeReset.gte(c.d31556926) &&
				(g.timeThisWormholeReset < 3600);
		},
		prevReq: [605, 809],
		event: "gameloop",
		progress: function () {
			return (g.timeThisWormholeReset < 3600)
				? {
					percent: achievement.percent(
						g.truetimeThisWormholeReset
							.div(c.d31556926),
						c.d1,
						0
					),
					text: timeFormat(
						3600 - g.timeThisWormholeReset
					) + " 剩余；剩余时间内平均需要 " +
						c.d31556926
							.sub(g.truetimeThisWormholeReset)
							.div(3600 - g.timeThisWormholeReset)
							.format(2) + "× 时间速度"
				}
				: "失败";
		},
		get reward() {
			return "将研究 24-12 效果软上限起始点乘以本虫洞的秒数（当前：×" +
				g.truetimeThisWormholeReset
					.max(c.d1)
					.format(2) + ")";
		},
		flavor: "将无限握于掌心，将现实置于游戏之中"
	},

	...(() => {
		let out = [];
		let names = [
			"将星象托付给奥特曼",
			"天体物理学大师",
			"无名者的囚笼",
			"三元之三元"
		];
		let triads = [
			"Stellar",
			"Decisive",
			"Temporal",
			"Ontological"
		];
		let rewards = [
			"星尘重置自动购买器减少 1% 的无用性",
			"星星移动速度 +2%",
			"从 alemaninc 的特殊开发地狱中解脱",
			"此后的所有时间墙都比之前缩短 4%"
		];
		let flavors = [
			"经济预测的唯一作用，就是让占星术看起来体面。",
			"天空才是极限；难的是决定先骑哪颗星。",
			"免于折磨……本身就是一种折磨。",
			"“吾名奥西曼德斯，万王之王：”其余皆为历史。"
		];
		for (let i = 0; i < 4; i++) {
			out.push([
				821 + i,
				{
					name: names[i],
					description: "完成研究的研究中的 " +
						triads[i] + " 三元组",
					prevReq: [(i === 0) ? 810 : (820 + i)],
					check: function () {
						return g.studyCompletions[10] > i;
					},
					event: "wormholeResetAfter",
					progress: function () {
						return ((g.activeStudy === 10) &&
								(studyPower(10) === i))
							? achievement.wormholeProgress()
							: ("先进入研究的研究（" +
								triads[i] + "）");
					},
					reward: rewards[i],
					flavor: flavors[i]
				}
			]);
		}
		return Object.fromEntries(out);
	})(),

	825: {
		name: "自由即奴役",
		description: "在没有任何普通或暗轴的等级下，达到 540 总购买轴",
		check: function () {
			return stat.totalAxis.gte(540) &&
				g.ach825possible;
		},
		update: function () {
			if (g.ach825possible) {
				for (let i of axisCodes) {
					if (Decimal.lt(
						stat["free" + i + "Axis"],
						g[i + "Axis"].mul(c.d2)
					)) {
						g.ach825possible = false;
					}
					if (Decimal.lt(
						stat["freedark" + i + "Axis"],
						g["dark" + i + "Axis"].mul(c.d2)
					)) {
						g.ach825possible = false;
					}
				}
			}
		},
		maxAxisToNotFail: function (f) {
			let s = stat.freeAxisSoftcapStart;
			if (s.gt(c.d2)) {
				return f.div(c.d2).floor();
			}
			let l = stat.freeAxisSoftcapLimit;
			return Decimal.div(
				l.sub(c.d2).mul(f),
				Decimal.add(
					l.mul(c.d2),
					s.sub(c.d4).mul(s)
				)
			).floor();
		},
		prevReq: [809],
		event: "axisBuy",
		progress: function () {
			return g.ach825possible
				? achievement.percent(
					stat.totalAxis,
					N(540),
					0
				)
				: "失败";
		},
		failed: function () {
			return !g.ach825possible;
		},
		reward: "第 3 行精通强度 ×3，并获得 10% " +
			prismaticUpgradeName("prismCondenser") +
			" 力量（使其影响更多反轴）",
		flavor: "如果你想保守一个秘密，你必须也对你自己隐瞒它。"
	}
},

9: {
	901: {
		name: "十一进制",
		req: Decimal.FC_NN(1, 1, 12345678900),
		get description() {
			return "奇异物质位数至少为 12,345,678,901 位" +
				(["BE Default", "Engineering", "Logarithm",
					"Mixed scientific", "Scientific"]
					.includes(g.notation)
					? ""
					: ("（需要 " +
						this.req.format() +
						" 奇异物质）"));
		},
		check: function () {
			return g.exoticmatter.gt(this.req);
		},
		event: "gameloop",
		prevReq: [804],
		progress: function () {
			return achievement.percent(
				numberOfDigits(g.exoticmatter),
				N(12345678901),
				0
			);
		},
		reward: "基于奇异物质，青色光软上限随时间减弱（当前：指数 " +
			arrowJoin("0.5", "{}") + "）",
		effect: function () {
			return Decimal.sub(
				c.d1,
				N(5e9).div(
					g.ach901Int
						.add(c.e100)
						.log10()
						.pow(c.d5)
				)
			);
		},
		effectFormat: x => x.format(3),
		formulaText: () =>
			"1 - " + N(5e9).format() +
			" ÷ log(" + c.e100.format() +
			" + ∫<span class=\"xscript\"><sup>t</sup><sub>0</sub></span>log(EM + 1)<sup>10</sup>dt)<sup>5</sup>",
		flavor: "达到 g<sub>ψ(Ω)</sub> (11) 查看何时可以强化！"
	},

	902: {
		name: "四破碎之镜",
		maxStardust: 28,
		luckReq: 137777777,
		get description() {
			return "在拥有超过 " +
				this.luckReq.toLocaleString("en-US") +
				" 幸运精华且不超过 " +
				this.maxStardust +
				" 次星尘重置的情况下完成研究 VII 第四层";
		},
		check: function () {
			return (g.activeStudy === 7) &&
				(g.studyCompletions[7] > 2) &&
				(g.luckEssence >= this.luckReq) &&
				(g.TotalStardustResets <= this.maxStardust);
		},
		event: "wormholeResetBefore",
		progress: function () {
			return (g.studyCompletions[7] < 3)
				? "先完成研究 VII 3 次"
				: (g.activeStudy !== 7)
					? "先进入研究 VII"
					: (g.TotalStardustResets <= this.maxStardust)
						? {
							percent: achievement.percent(
								N(g.luckEssence),
								N(this.luckReq),
								0
							),
							text: (this.maxStardust -
								g.TotalStardustResets) +
								" 次重置剩余"
						}
						: "失败";
		},
		reward: "研究 VII 的第三个奖励强度 +11.1%",
		flavor: "我打碎了一面镜子，招致七年厄运，但我的律师认为他能帮我争取到五年。"
	},

	903: {
		name: "期盼已久的重制",
		get description() {
			return "最近 10 次（有效）虫洞重置，每次产生的霍金辐射至少是上一次的 " +
				c.inf.format() + "×";
		},
		check: function () {
			return this.current() === 9;
		},
		prevReq: [802],
		event: "wormholeResetAfter",
		progress: function () {
			return (g.previousWormholeRuns.last10.length === 0)
				? "先进行虫洞重置"
				: {
					percent: [
						this.current() +
						Decimal.div(
							stat.pendinghr,
							N(g.previousWormholeRuns.last10[0].gain)
						).add(c.d1).log(c.inf).min(c.d1).toNumber() / 0.09,
						stat.pendinghr,
						N(g.previousWormholeRuns.last10[0].gain)
							.mul(c.inf)
					],
					text: (9 - this.current()) +
						" 次虫洞重置仍需进行"
				};
		},
		reward: "解锁虫洞升级",
		flavor: "并不存在黑洞——在光无法逃逸至无穷远的意义上。",
		current: function () {
			let valid = 0;
			for (let i = 0;
				i < (g.previousWormholeRuns.last10.length - 1);
				i++) {
				if (Decimal.gte(
					g.previousWormholeRuns.last10[i].gain,
					N(g.previousWormholeRuns.last10[i + 1].gain)
						.mul(c.inf)
				)) {
					valid++;
				} else {
					break;
				}
			}
			return valid;
		}
	},

	904: {
		name: "百万富翁 II",
		get description() {
			return "达到 " + BEformat(c.e2e6) + " 星尘";
		},
		check: function () {
			return g.stardust.gt(c.e2e6);
		},
		prevReq: [529],
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				g.stardust,
				c.e2e6,
				1
			);
		},
		get reward() {
			return "研究 9-15 与 10-13 强度 ×{}（基于霍金辐射）";
		},
		flavor: "如果你不是出身富贵之家，那就必须有一个富贵之家出自你。",
		effect: function () {
			return g.hawkingradiation
				.add(1e200)
				.log10()
				.log10()
				.pow(c.d5)
				.div(c.d64);
		},
		effectFormat: x => x.format(3),
		formulaText: () =>
			"log<sup>[2]</sup>(HR + " +
			N(1e200).format() +
			")<sup>5</sup> ÷ 64"
	},

	905: {
		name: "踏入 E",
		description: "进入研究 XIII",
		check: function () { return true; }, // 本地检查
		prevReq: [821],
		progress: function () { return "未完成！"; },
		reward: "色素、幸运碎片、棱镜值与反物质获取乘以 {}（基于研究 XIII 完成次数）",
		effectBreakpoints: [0, 24, 56, 96, 144, 200],
		effect: function () {
			let base;
			for (let i = 4; i >= 0; i--) {
				if (g.studyCompletions[13] >=
					this.effectBreakpoints[i]) {
					base = i + 1 +
						((g.studyCompletions[13] -
							this.effectBreakpoints[i]) /
						(this.effectBreakpoints[i + 1] -
							this.effectBreakpoints[i]));
					break;
				}
			}
			return N(base * 2).pow10()
				.sub(c.d1)
				.mul(c.d13)
				.div(c.d99);
		},
		effectFormat: x => x.noLeadFormat(3),
		formulaText: function () {
			for (let i = 4; i >= 0; i--) {
				if (g.studyCompletions[13] >=
					this.effectBreakpoints[i]) {
					return "(10<sup>(c" +
						formulaFormat.add(
							(this.effectBreakpoints[i + 1] -
								this.effectBreakpoints[i]) *
							(i + 1) -
							this.effectBreakpoints[i]
						) +
						")" +
						formulaFormat.mult(
							N(2 / (
								this.effectBreakpoints[i + 1] -
								this.effectBreakpoints[i]
							))
						) +
						"</sup> - 1) × 13 ÷ 99";
				}
			}
		},
		get flavor() {
			return "<b>这是最后一次更新。</b> 自游戏更新以来已过去 <b>" +
				BEformat(
					Math.floor(
						(Date.now() - 1616371200000) / 86400000
					)
				) +
				"</b> 天。";
		}
	},

	906: {
		name: "月球上的黑暗永恒",
		get description() {
			return "在研究 VI 与 XIII 之外，使 时间速度低于 " +
				c.e8.format() + "÷";
		},
		check: function () {
			return stat.tickspeed.lt(c.em8) &&
				(!StudyE(6)) &&
				(g.activeStudy !== 13);
		},
		event: "gameloop",
		progress: function () {
			return g.achievement[906]
				? achievement.percent(
					stat.tickspeed,
					this.milestoneReq(this.milestones() + 1),
					1
				)
				: (StudyE(6) || (g.activeStudy === 13))
					? "失败"
					: achievement.percent(
						stat.tickspeed,
						c.em8,
						1
					);
		},
		get reward() {
			return "观测效果软上限减弱 {}%" +
				((this.milestones() === 40)
					? ""
					: ("（随历史最佳 时间速度里程碑提升，下一个在 " +
						this.milestoneReq(this.milestones() + 1)
							.format() + "×）"));
		},
		effect: function () {
			return Decimal.FC_NN(
				1,
				0,
				1 - Math.log2(
					1 + this.milestones() / 40
				) / 4
			);
		},
		effectFormat: x =>
			c.d1.sub(x).mul(c.e2).noLeadFormat(3),
		formulaText: () =>
			"25 × log<sub>2</sub>(1 + μ ÷ 40)",
		milestoneReq: function (x) {
			return Decimal.decibel(
				Math.floor(x / 4) + 40
			).mul(1 + (x % 4) * 0.06);
		},
		milestones: function () {
			for (let i = 40; i > 0; i--) {
				if (g.bestTickspeedThisMatrix.gte(
					this.milestoneReq(i)
				)) {
					return i;
				}
			}
			return 0;
		},
		maxMilestones: 40,
		flavor: "朋友的主要功能之一，就是以温和而象征性的方式，承受我们本想施加在敌人身上，却无法实施的惩罚。"
	},

	907: {
		name: "医学哲学家",
		description: "在单个虫洞中购买 16 个研究研究",
		prevReq: [905],
		check: function () {
			return g.ach907Progress > 15;
		},
		event: "researchBuy",
		progress: function () {
			return achievement.percent(
				N(g.ach907Progress),
				c.d16,
				0
			);
		},
		reward: "所有研究研究费用降低 {}%",
		effect: function (y = this.yellowValue) {
			return c.d0_9.sub(c.d0_8.mul(y));
		},
		effectFormat: x =>
			c.d1.sub(x).mul(c.e2).noLeadFormat(3),
		yellowBreakpoints: [N(250000), N(2.25e6), 0],
		flavor: "永远不要把教育与智力混为一谈，你可以拥有博士学位却依然是个白痴。"
	},

	908: {
		name: "大师约会",
		description: "在不激活任何精通、且不购买费用大于 1 的暗轴的情况下完成研究 VIII 第四层",
		prevReq: [524],
		check: function () {
			return (g.activeStudy === 8) &&
				(g.studyCompletions[8] > 2) &&
				g.ach524possible &&
				g.ach908possible;
		},
		event: "wormholeResetBefore",
		progress: function () {
			return (g.studyCompletions[8] < 3)
				? "先完成研究 VIII 3 次"
				: (g.activeStudy !== 8)
					? "先进入研究 VIII"
					: g.ach524possible
						? (g.ach908possible
							? achievement.wormholeProgress()
							: "因在暗轴上花费过多而失败")
						: "因拥有精通而失败";
		},
		failed: function () {
			return (g.activeStudy !== 8) ||
				(g.studyCompletions[8] < 3) ||
				(!g.ach524possible) ||
				(!g.ach908possible);
		},
		reward: "研究 VIII 的第三个奖励强度 +11.1%",
		flavor: "没有眼睛比邪恶的眼睛更好，黑暗的大师！"
	},

	909: {
		name: "十八维超立方体",
		description: "购买任意 R 轴",
		check: function () {
			return g.RAxis.gt(c.d0) ||
				g.darkRAxis.gt(c.d0) ||
				g.antiRAxis.gt(c.d0);
		},
		event: "axisBuy",
		progress: function () { return "未完成！"; },
		prevReq: [909],
		get reward() {
			return "所有反轴费用降低至 (1 + [总反轴] ÷ {}) 次根（当前：" +
				this.effect()
					.mul(stat.totalAntiAxis)
					.add(c.d1)
					.noLeadFormat(4) + " 次）";
		},
		effect: function () {
			let out = c.em5;
			if (g.achievement[910]) {
				out = out.mul(c.d1_01);
			}
			return out;
		},
		effectFormat: x => x.recip().noLeadFormat(3),
		flavor: "因为三角形有 3 个角，而正方形只有 5 个……所以因为 3 是 9 的平方根，因此第 9 轴不能存在，因为‘光明会 IV’是真的。"
	},

	910: {
		name: "二十维超立方体",
		description: "购买任意 Q 轴",
		check: function () {
			return g.QAxis.gt(c.d0) ||
				g.darkQAxis.gt(c.d0) ||
				g.antiQAxis.gt(c.d0);
		},
		event: "axisBuy",
		progress: function () { return "未完成！"; },
		prevReq: [909],
		get reward() {
			return "每拥有一个反轴，真空能量增速 +{}%（加法；当前 " +
				[achievement(910).effect(),
					stat.totalAntiAxis,
					c.e2]
					.productDecimals()
					.noLeadFormat(2) +
				"%）；成就 " +
				achievement.label(909) +
				" 奖励强度 +1%";
		},
		effect: function () {
			let out = c.d0_01;
			if (g.achievement[911]) {
				out = out.mul(1.11);
			}
			return out;
		},
		effectFormat: x =>
			x.mul(c.e2).noLeadFormat(2),
		get flavor() {
			return "Q 轴基础费用为 " +
				Decimal.FC_NN(1, 41898, 1e10).format();
		}
	},

	911: {
		name: "二十二维超立方体",
		description: "购买任意 P 轴",
		check: function () {
			return g.PAxis.gt(c.d0) ||
				g.darkPAxis.gt(c.d0) ||
				g.antiPAxis.gt(c.d0);
		},
		event: "axisBuy",
		progress: function () { return "未完成！"; },
		prevReq: [910],
		get reward() {
			return "每拥有一个暗轴，Y 轴效果 +{}%（加法；当前 " +
				[achievement(911).effect(),
					stat.totalDarkAxis,
					c.e2]
					.productDecimals()
					.noLeadFormat(2) +
				"%）；成就 " +
				achievement.label(910) +
				" 奖励强度 +11%";
		},
		effect: function () {
			let out = N(0.0223);
			return out;
		},
		effectFormat: x =>
			x.mul(c.e2).noLeadFormat(2),
		flavor: "(Eins, zwei,) P(olizei)"
	},

	912: {
		name: "二十四维超立方体",
		description: "购买任意 O 轴",
		check: function () {
			return g.OAxis.gt(c.d0) ||
				g.darkOAxis.gt(c.d0) ||
				g.antiOAxis.gt(c.d0);
		},
		event: "axisBuy",
		progress: function () { return "未完成！"; },
		prevReq: [911],
		reward: "普通、暗与反 S 轴强度 +1%",
		flavor: "只有真正的大佬才会把 1E#1e41900 和 P 轴联系起来"
	},

	913: {
		name: "存在主义恐惧",
		description: "同时有十二种不同的轴类型受腐化影响，且至少包含一种 O 轴",
		check: function () {
			return this.hasO() && (this.value() >= 12);
		},
		event: "gameloop",
		progress: function () {
			return this.hasO()
				? achievement.percent(
					N(this.value()),
					c.d12,
					0
				)
				: "需要一个受腐化的 O 轴";
		},
		prevReq: [912],
		reward: "解锁研究 XIII 绑定 25",
		flavor: "五棵冷杉树上的十五只鸟，<br>它们的羽毛在炽热微风中扇动！<br>但是，有趣的小鸟，它们没有翅膀！<br>哦，我们要拿这些有趣的小东西怎么办？<br>活烤，还是炖成一锅；<br>油炸、水煮，趁热吃？",
		value: function () {
			let out = 0;
			for (let i of ["axis", "darkAxis", "antiAxis"]) {
				for (let j of axisCodes) {
					if (corruption.list[i].isCorrupted(j)) {
						out++;
					}
				}
			}
			return out;
		},
		hasO: function () {
			for (let i of ["axis", "darkAxis", "antiAxis"]) {
				if (corruption.list[i].isCorrupted("O")) {
					return true;
				}
			}
			return false;
		},
		beta: true
	},

	914: {
		name: "盲目否定经验",
		description: "在没有暗星的情况下完成研究 IX 第四层",
		check: function () {
			return (g.activeStudy === 9) &&
				(g.studyCompletions[9] > 2) &&
				g.darkstars.eq(c.d0);
		},
		event: "wormholeResetBefore",
		progress: function () {
			return (g.studyCompletions[9] < 3)
				? "先完成研究 IX 3 次"
				: (g.activeStudy !== 9)
					? "先进入研究 IX"
					: g.darkstars.eq(c.d0)
						? achievement.wormholeProgress()
						: "失败";
		},
		failed: function () {
			return (g.activeStudy !== 9) ||
				(g.studyCompletions[9] < 3) ||
				g.darkstars.neq(c.d0);
		},
		reward: "研究 IX 的第三个奖励强度 +11.1%",
		flavor: "每个人都是自身经验的囚徒"
	},

	915: {
		name: "恒星时代终结",
		description: "在没有临时研究且不超过 6 个星尘升级的情况下达到 55 颗星星",
		check: function () {
			return (g.stars >= 55) &&
				(totalResearch.temporary === 0) &&
				(effectiveStardustUpgrades() === 6);
		},
		prevReq: [905],
		event: "starBuy",
		progress: function () {
			return (totalResearch.temporary !== 0)
				? "因拥有研究而失败"
				: (effectiveStardustUpgrades() > 6)
					? "因星尘升级过多而失败"
					: achievement.percent(
						N(g.stars),
						N(55),
						0
					);
		},
		get reward() {
			return "每拥有一个星尘升级，每拥有一个星尘升级，星尘升级费用除以 {}（基于当前虫洞时间）（总计：" +
				this.effect()
					.pow(g.stardustUpgrades.sum() ** 2)
					.format(2) + "）";
		},
		failed: function () {
			return (totalResearch.temporary !== 0) ||
				(effectiveStardustUpgrades() !== 6);
		},
		flavor: "宇宙从生命中爆发出来，而不是相反。每一种生命都有一个宇宙，它自己的宇宙。我们生成现实的球体，个体存在的泡沫。我们的星球由数十亿个现实球体组成，由每个人类，甚至每只动物生成。",
		effect: function () {
			return g.truetimeThisWormholeReset
				.div(c.e8)
				.add(c.d1)
				.pow(c.e2);
		},
		effectFormat: x => x.format(4),
		formulaText: () =>
			"(1 + t ÷ " + c.e8.format() + ")<sup>100</sup>"
	},

	916: {
		name: "当你不在时……无事发生",
		description: "解锁第三个扩张升级",
		check: function () {
			return g.dilationUpgradesUnlocked > 2;
		},
		prevReq: [605, 905],
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				N(g.dilationUpgradesUnlocked),
				c.d3,
				0
			);
		},
		reward: "时间速度对反物质获取的效果提升至 {} 次幂（基于反物质星系）",
		flavor: "后期游戏只有在发布后才算是后期；烂游戏则永远烂下去。",
		effect: function () {
			return g.antimatterGalaxies
				.div(c.e3)
				.add(c.d1)
				.pow(c.e2)
				.mul(c.e2)
				.sub(c.d99);
		},
		effectFormat: x => x.noLeadFormat(3),
		formulaText: () =>
			"(G ÷ 1,000 + 1)<sup>100</sup></sup> × 100 - 99"
	},

	917: {
		name: "蚁神飞升",
		description: "购买所有空间协同研究",
		prevReq: [824, 905],
		check: function () {
			for (let i of researchGroupList
					.spatialsynergism.contents) {
				if (!g.research[i]) {
					return false;
				}
			}
			return true;
		},
		event: "researchBuy",
		progress: function () {
			return achievement.percent(
				N(ownedResearchInGroup(
					"spatialsynergism"
				).length),
				c.d56,
				0
			);
		},
		reward: "霍金辐射获取乘以 {}（基于所有 S 轴）",
		effect: function () {
			return [
				c.d2,
				c.d1_05,
				[g.SAxis, g.darkSAxis, g.antiSAxis]
					.sumDecimals()
			].decimalPowerTower().sub(c.d1);
		},
		effectFormat: x => x.format(2),
		formulaText: () =>
			"2<sup>1.05<sup>ΣS</sup></sup> - 1",
		flavor: "我吃了些香蕉酸奶。<br>然后出去散了步。<br><br>新鲜空气从不伤人"
	},

	918: {
		name: "那个无限星系现在在哪？",
		description: "拥有 308 有效暗星",
		prevReq: [905],
		check: function () {
			return stat.realDarkStars.gte(c.d308);
		},
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				stat.realDarkStars,
				c.d308,
				0
			);
		},
		get reward() {
			return "每 1 有效暗星 +3.08% 色素（当前：" +
				percentOrMult(
					N(1.0308).pow(stat.realDarkStars),
					2,
					true
				) + ")";
		},
		flavor: "摧毁一颗行星的能力，与原力的力量相比微不足道。"
	},

	919: {
		name: "零玩家游戏 III",
		description: "封顶轴自动购买器间隔",
		prevReq: [905],
		check: function () {
			return autobuyerMeta.interval("axis") === 0.05;
		},
		event: "autobuyerUpgrade",
		progress: function () {
			return achievement.percent(
				N(autobuyerMeta.interval("axis")),
				N(0.05),
				x => x.recip()
			);
		},
		rewardAffects: [242, 248, 333, 337],
		get reward() {
			return "研究 XIII 绑定 " +
				this.rewardAffects.joinWithAnd() +
				" 减弱 {}%（基于自动购买器总等级）";
		},
		effect: function () {
			return Decimal.convergentSoftcap(
				N(1 - autobuyerMeta.totalLevels() * 0.00035),
				c.d0_5,
				c.d0
			);
		},
		effectFormat: x =>
			c.d1.sub(x).mul(c.e2).noLeadFormat(3),
		formulaText: () =>
			(autobuyerMeta.totalLevels() >= 2500)
				? "100 - 71,428 ÷ Σλ"
				: "Σλ × 0.035",
		flavor: "做那些根本不该做的事，效率再高也无用。"
	},

	920: {
		name: "双曲立法者",
		description: "使用来自先前三元组的研研究组合完成本体论三元组",
		prevReq: [824, 905],
		check: function () {
			return (g.activeStudy === 10) &&
				(studyPower(10) === 3) &&
				["147", "258", "369"].includes(
					g.study10Options.sort((a, b) => a - b).join("")
				);
		},
		event: "wormholeResetBefore",
		progress: function () {
			if (g.achievement[920]) {
				let remaining = countTo(9).filter(
					x => (g.ach920Completions &
						(2 ** (x - 1))) === 0
				);
				return ((g.activeStudy !== 10) ||
						(studyPower(10) !== 3) ||
						(!g.study10Options.map(
							x => remaining.includes(x)
						).includes(true)))
					? ("进入本体论三元组并选择 " +
						remaining.map(x => roman(x))
							.joinWithAnd()
							.replace("and", "or") +
						" 优先")
					: achievement.wormholeProgress();
			} else {
				return ((g.activeStudy !== 10) ||
						(studyPower(10) !== 3))
					? "先进入本体论三元组并选择 I+IV+VII、II+V+VIII 或 III+VI+IX"
					: achievement.wormholeProgress();
			}
		},
		get reward() {
			return "研究的研究的第三个奖励强度 +{}%" +
				((this.milestones() === 9)
					? ""
					: ("<br>（基于作为本体论三元组一部分完成的研究）"));
		},
		effect: function () {
			return Decimal.FC_NN(
				1,
				0,
				1 + this.milestones() / 81
			);
		},
		effectFormat: x =>
			x.sub(c.d1).mul(c.e2).format(2),
		formulaText: () => "μ ÷ 0.81",
		milestones: function () {
			return g.ach920Completions
				.toString(2)
				.replaceAll("0", "")
				.length;
		},
		maxMilestones: 9,
		flavor: "一位女主人为晚宴做准备，她在厨房的边柜上放着一块可爱的五磅 T 骨牛排等着烹饪，而她在客厅里和客人们聊天——喝了几杯之类的。但随后她借口进入厨房去煮牛排——结果不见了。家里的猫，端正地坐在角落里洗脸。“猫偷吃了牛排，”巴尼说。真的吗？客人们被叫进来；他们争论这件事。牛排不见了，整整五磅；猫坐在那里，看起来吃得很好，心情愉快。“称一下猫的重量，”有人说。他们喝了几杯；这听起来是个好主意。于是他们走进浴室，把猫放在秤上称重。读数正好是五磅。他们都看到了这个读数，一位客人说：“好了，就是这样。牛排在那儿。”他们对自己知道发生了什么感到满意；他们有了经验证据。然后其中一人产生了疑虑，困惑地说：“但是猫在哪里呢？”"
	},

	...(() => {
		let out = {};
		for (let i = 0; i < 5; i++) {
			let s13req = [24, 56, 96, 144, 200][i];
			let bms = [
				"每级获得 1 RP",
				"你现在可以更改变奇点更快（最大、最小、滑块），且自动购买奇点函数升级",
				"<del>永远保持前四个函数升级免费并解锁高级自动切换（鼓励退款）</del><br><ins>解锁 Autoprestiger 以自动进入挑战</ins>",
				"<del>自动获得 Incrementy 与暗流形及升级，且不损失 incrementy（最大费用 e600 Incrementy）</del><br><ins>奖励：解锁自动分配基数与购买 ℵω 的选项</ins>",
				"解锁 Baseless<sup>2</sup> 里程碑（底数 7）"
			];
			let bmrs = [
				"ω<sup>ω<sup>2</sup>3</sup>",
				"ω<sup>ω<sup>2</sup>3+ω3</sup>",
				"<del>ω<sup>ω<sup>2</sup>4+ω3</sup></del> <ins>ω<sup>ω<sup>2</sup>3+ω4</sup></ins>",
				"<del>ω<sup>ω<sup>2</sup>4+ω4</sup></del> <ins>ω<sup>ω<sup>2</sup>4</sup></ins>",
				"ω<sup>ω<sup>3</sup></sup>"
			];
			let b2ms = [
				"奖励：解锁新的奇点函数，并将 OP 上限提升至 e1e100，即 <b>古戈尔普勒克斯</b>",
				"禁用普通挑战奖励折算",
				"解锁新的助推器升级，且 u22 折算更佳 <i>" +
					arrowJoin(
						"(10+(boosters<sup>0.9</sup>))",
						"(10+(boosters<sup>1.25</sup>))"
					) + "</i>",
				"你可以完成欧米茄挑战最多 3 次",
				"解锁 Epsilon 挑战"
			];
			let b2mrs = [
				c.inf,
				N("2.048e451"),
				N("1.152e564"),
				N("1.148e684"),
				N("4.361e809")
			];
			out[921 + i] = {
				name: "无基里程碑" + achievement.roman(i + 1),
				prevReq: (i === 0) ? [905] : [920 + i],
				get description() {
					return "在研究 XIII 等级 " +
						s13req + " 或更高时，拥有至少 1,000,000,000 位数的奇异物质" +
						(["BE Default", "Engineering", "Logarithm",
							"Mixed scientific", "Scientific"]
							.includes(g.notation)
							? ""
							: ("（需要 " +
								this.req.format() +
								" 奇异物质）"));
				},
				check: function () {
					return numberOfDigits(g.exoticmatter)
						.gte(this.nextMilestone(0)) &&
						(g.activeStudy === 13) &&
						(studyPower(13) >= s13req);
				},
				event: "gameloop",
				progress: function () {
					return (g.activeStudy !== 13)
						? "先进入研究 XIII"
						: (studyPower(13) < s13req)
							? ("绑定等级过低（" +
								studyPower(13) +
								" / " + s13req + "）")
							: (study13.bound(236))
								? {
									percent: achievement.percent(
										numberOfDigits(
											g.exoticmatter
										),
										N(this.nextMilestone(
											g.achievement[
												921 + i
											]
												? this.milestones()
												: 0
										)),
										0
									),
									text: numberOfDigits(
										g.exoticmatter
									).format() +
										" / " +
										N(this.nextMilestone(
											g.achievement[
												921 + i
											]
												? this.milestones()
												: 0
										)).format() +
										"；剩余 " +
										timeFormat(
											study13.bindingEff(
												236
											) -
											g.timeThisWormholeReset
										)
								}
								: achievement.percent(
									numberOfDigits(
										g.exoticmatter
									),
									N(this.nextMilestone(
										g.achievement[
												921 + i
											]
												? this.milestones()
												: 0
										)),
									0
								);
				},
				get reward() {
					return (i === 4)
						? ("成就 " +
							achievement.label(921, 5) +
							" 奖励强度 +{}%")
						: ("研究 " +
							["13-5", "13-7 and 13-9",
								"13-8", "13-11"][i] +
							" " +
							((i === 1) ? "are" : "is") +
							" {}% stronger" +
							((achievement(921 + i)
								.milestones() === 13)
								? ""
								: ("（随研究 XIII 等级 ≥ " +
									s13req +
									" 时奇异物质最多位数的里程碑提升）")));
				},
				effect: function () {
					let out = Math.sqrt(
						Math.max(
							this.milestones() * 2 - 1,
							0
						)
					) / 25;
					return (i === 4)
						? Decimal.FC_NN(
							1,
							0,
							g.achievement[925]
								? (1 / (1 - out))
								: (1 + out)
						)
						: Decimal.FC_NN(
							1,
							0,
							1 + out * (
								g.achievement[925]
									? achievement(925).effect()
									: 1
							)
						);
				},
				effectFormat: x =>
					x.sub(c.d1).mul(c.e2).noLeadFormat(2),
				formulaText: function () {
					return "max(μ × 2 - 1, 0)<sup>0.5</sup> × " +
						N(g.achievement[925]
							? (achievement(925).effect() * 4)
							: 4).noLeadFormat(3);
				},
				milestones: function () {
					return g.baselessMilestones[i];
				},
				nextMilestone: function (num) {
					return Math.floor(
						Math.min(
							1e9 * 1.2345678901 ** num,
							12345678901
						)
					);
				},
				maxMilestones: 13,
				get flavor() {
					let out =
						"<b>无基里程碑 №" + (i + 1) +
						" (" + bmrs[i] + ")</b><br>" +
						bms[i];
					if (g.baselessMilestones[i] === 13) {
						out += "<br><b>无基<sup>2</sup> 里程碑 №" +
							(i + 1) + " (" +
							b2mrs[i].format() + " OP)</b><br>" +
							b2ms[i];
					}
					return out;
				}
			};
		}
		return out;
	})(),

	926: {
		name: "抄写员之月",
		description: "在 9 秒或更短时间内完成研究 XI 第四层",
		prevReq: [510, 905],
		check: function () {
			return (g.activeStudy === 11) &&
				(g.studyCompletions[11] > 2) &&
				(g.timeThisWormholeReset < 9);
		},
		event: "wormholeResetBefore",
		progress: function () {
			return (g.studyCompletions[11] < 3)
				? "先完成研究 XI 3 次"
				: (g.activeStudy !== 11)
					? "先进入研究 XI"
					: (g.timeThisWormholeReset < 9)
						? {
							percent: achievement.wormholeProgress(),
							text: timeFormat(
								9 - g.timeThisWormholeReset
							) + " 剩余"
						}
						: "失败";
		},
		reward: "研究 XI 的第三个奖励强度 +11.1%",
		flavor: "以我这般白皙的皮肤，月灼是一种真实的可能性。"
	},

	...(() => {
		let out = {};
		for (let i = 0; i < 3; i++) {
			let req = [N(133), N(140), N(147)][i];
			out[927 + i] = {
				name: "爱尔兰十二尖" + achievement.roman(i + 1),
				description: "拥有 " + req.toString() + " 总幸运升级",
				prevReq: [[807], [905, 927], [928]][i],
				check: function () {
					return Object.values(g.luckUpgrades)
						.map(x =>
							Object.values(x).sumDecimals()
						)
						.sumDecimals()
						.gte(req);
				},
				event: "buyLuckUpgrade",
				progress: function () {
					return achievement.percent(
						Object.values(g.luckUpgrades)
							.map(x =>
								Object.values(x).sumDecimals()
							)
							.sumDecimals(),
						N(req),
						0
					);
				},
				get reward() {
					return "为 " +
						(x =>
							toTitleCase(x[0]) + " " +
							luckUpgrades[x[0]][x[1]].name
						)(
							[
								["trifolium", "antiAxis"],
								["quatrefolium", "prismatic"],
								["cinquefolium", "luck"]
							][i]
						) +
						" 添加 {} 免费等级";
				},
				effect: function (y = this.yellowValue) {
					return y.mul(c.d6).add(c.d1);
				},
				effectFormat: x => x.noLeadFormat(3),
				yellowBreakpoints: [
					N(250000 * 2 ** i),
					N(2.5e6 * 2 ** i),
					1
				],
				flavor: [
					"The key is not to prioritize what's on your schedule...",
					"...but to schedule your priorities.",
					"Would alemaninc's players be satisfied with how low his game is on the schedule?",
					"TBD",
					"TBD"
				][i]
			};
		}
		return out;
	})(),

	930: {
		name: "就这样吧，阿尔伯特·爱因斯坦……",
		description: "抵达腐化",
		prevReq: [905],
		check: function () { return true; }, // 本地检查
		progress: function () { return "未完成！"; },
		reward: "研究 7-8 强度 +2%",
		flavor: "当你和一个漂亮的女孩坐在一起两小时，你觉得只是一分钟。但当你在一块热炉子上坐一分钟，你觉得是两小时。这就是相对论。"
	},

	931: {
		name: "闪耀的信息守恒定律",
		description: "同时激活所有研究",
		prevReq: [907, 917],
		check: function () {
			return totalResearch.overall() === 360;
		},
		event: "researchBuy",
		progress: function () {
			return achievement.percent(
				N(totalResearch.overall()),
				N(360),
				0
			);
		},
		reward: "第 8 列所有研究强度 +{}%（基于总发现值）",
		effect: function () {
			return g.totalDiscoveries
				.add(c.d10)
				.log10()
				.log10()
				.pow(c.d3);
		},
		effectFormat: x => x.format(3),
		formulaText: () =>
			"log<sup>[2]</sup>(D + 10)<sup>3</sup>",
		flavor: "世界是一个巨大的数据问题。",
		beta: true
	},

	932: {
		name: "金属中的疯狂滚动",
		description: "在不拥有超过 7 个星尘升级的情况下完成研究 XII 第四层",
		prevReq: [905],
		check: function () {
			return (g.activeStudy === 12) &&
				(g.studyCompletions[12] > 2) &&
				(effectiveStardustUpgrades() <= 7);
		},
		event: "wormholeResetBefore",
		progress: function () {
			return (g.studyCompletions[12] < 3)
				? "先完成研究 XII 3 次"
				: (g.activeStudy !== 12)
					? "先进入研究 XII"
					: (effectiveStardustUpgrades() > 7)
						? "失败"
						: {
							percent: achievement.wormholeProgress(),
							text: (7 -
								effectiveStardustUpgrades()) +
								" 个升级剩余"
						};
		},
		failed: function () {
			return (g.activeStudy !== 12) ||
				(g.studyCompletions[12] < 3) ||
				(effectiveStardustUpgrades() > 7);
		},
		reward: "研究 XII 的第三个奖励强度 +11.1%",
		flavor: "你现在是斑马部落的首领。<br>（这怎么可能？）",
		beta: true
	},

	933: {
		name: "ÒMCCDV IIÍ",
		req: Decimal.FC_NN(1, 1, 44297),
		get description() {
			return "达到 " + this.req.format() + " 精通力";
		},
		prevReq: [933],
		check: function () {
			return g.masteryPower.gt(this.req);
		},
		event: "gameloop",
		progress: function () {
			return achievement.percent(
				g.masteryPower,
				this.req,
				1
			);
		},
		get reward() {
			return "反 W 轴效果软上限推迟 20.21×，且每反 W 轴额外推迟 4.11×" +
				"（当前：" +
				N(4.11)
					.pow(stat.realantiWAxis)
					.mul(20.21)
					.format(3) +
				"×，换算为约 ^" +
				Decimal.div(
					miscStats.antiWAxisEffect.modifiers[0]
						.softcap(true)
						.log10()
						.log10(),
					miscStats.antiWAxisEffect.modifiers[0]
						.softcap(false)
						.log10()
						.log10()
				)
					.pow(c.d2)
					.format(4) + " 更多效果）";
		},
		get flavor() {
			return "<del>500 sh--</del> <ins>933 成就</ins>... 自我们在 <del>2021 年 8 月 20--</del> <ins>2022 年 1 月</ins> 开始以来，我们已经走了很长一段路。<br><br>自 <del>OMCCDV I--</del> <ins>Exotic Matter Dimensions'</ins> 创建于 <del>2--</del> <ins>2022 年 1 月 3 日</ins> 以来，我们平均每天创建了 <del>2.75 sh--</del> <ins>" +
				N(achievement.all.length /
					(newsSupport.excelDate() - 44564))
					.format(2) +
				" 个成就</ins>。<br><br><del>OM--</del> <ins>EMD</ins> 已经 <del>c--</del> <ins>公开</ins> 了 <del>六个月</del> <ins>" +
				numword(new Date().getUTCFullYear() - 2022) +
				" 年</ins>，因为 <del>Ma--</del> <ins>Stat Mark 和 xhwzwka</ins>... 而我拒绝承认 <del>我</del> <ins>他们</ins> 在推动 <del>他们的 va--</del> <ins>我的贡献</ins> 中所起的作用，尽管每个人都知道 <del>是我开始的</del> <ins>他们建议了一半的功能</ins>。<br><br><del>我还能放哪些统计数--</del> <ins style=\"color:#ff0000;\">哇。看来 alemaninc 真的会做任何事情来把这些都塞进去...</ins>";
		}
	},},}
achievement.all = Object.values(achievementList).map(x => Object.keys(x)).flat()
achievement.withMilestones = achievement.all.filter(x=>(typeof achievement(x).milestones)!=="undefined")
const secretAchievementRarityNames = [null,"Super Easy","Common","Rare","Legendary","Mythical","Shiny","Celestial"]
const secretAchievementRarityColors = {
	1:{light:"#999999",dark:"#333333"},
	2:{light:"#00cc00",dark:"#006600"},
	3:{light:"#cc66ff",dark:"#330066"},
	4:{light:"#ff6600",dark:"#663300"},
	5:{light:"#ff0000",dark:"#660000"},
	6:{light:"#00ffff",dark:"#006666"},
	7:{light:"#0000ff",dark:"#000033"}
}
const secretAchievementList = {
	1: {
		name: "声望",
		get description() {
			return "进行 10,000 次星尘重置" +
				(unlocked("Hawking Radiation")
					? " 在本宇宙中"
					: "");
		},
		check: function () {
			return g.TotalStardustResets >= 1e4;
		},
		event: "stardustReset",
		flavor: "你这一生都在干什么……",
		rarity: 4
	},

	2: {
		name: "周年纪念",
		description: "在游戏周年纪念日游玩 <i>奇异物质维度</i>（使用 UTC 时区）",
		check: function () {
			return (new Date().getUTCMonth() === 1) &&
				(new Date().getUTCDate() === 22);
		},
		flavor: "bUt 22/2/22 sHoUlD bE 2022-02-22, lIkE tHe rEsT oF tHe cHaNgELoG!",
		rarity: 3
	},

	3: {
		name: "Epsilon 时刻",
		description: "连续 10 帧耗时超过 1 秒",
		check: function () {
			return lagAchievementTicks >= 10;
		},
		event: "gameloop",
		flavor: "噢，嘿……你还在啊？",
		rarity: 1
	},

	4: {
		name: "噢，嘿……你还在啊？",
		description: "让游戏窗口保持打开 8 小时",
		check: function () {
			return timeSinceGameOpened > 28800;
		},
		event: "gameloop",
		reward: "终身会员资格：<a href=\"https://www.reddit.com/r/StopGaming\" style=\"color:inherit;\" target=\"_blank\">https://www.reddit.com/r/StopGaming</a>",
		flavor: "大家玩《奇异物质维度》玩得这么开心，我真的很荣幸！<br>但说真的，去求助吧。",
		rarity: 2
	},

	5: {
		name: "传承",
		description: "游玩一年。",
		check: function () {
			return g.timePlayed > 31556926;
		},
		event: "gameloop",
		flavor: "……然后你把超频调到 10,000×，瞬间全部炸掉。",
		rarity: 5
	},

	6: {
		name: "我就是速度",
		description: "连续 10 帧耗时 50 毫秒（最大 FPS）",
		check: function () {
			return fpsAchievementTicks >= 10;
		},
		event: "gameloop",
		flavor: "每分钟 1200 帧！哇。alemaninc 每分钟只能跑 20 帧。",
		rarity: 1
	},

	7: {
		name: "拉斯普京",
		description: "使用 \"cat\" 作为兑换码",
		check: function () { return true; }, // 本地检查
		flavor: "有一只猫，真的消失了",
		rarity: 3
	},

	8: {
		name: "诚聘帮手",
		description: "使用 \"alemaninc\" 作为兑换码",
		check: function () { return true; }, // 本地检查
		flavor: "你考虑过成为 EMD 测试员吗？那么，如果告诉你<b>所有玩家已经是测试员了</b>，会怎样呢？",
		rarity: 2
	},

	9: {
		name: "终极升级",
		description: "点击统计明细中的“隐藏成就加成”文字",
		check: function () { return true; },
		flavor: "从无用升级中能获得许多乐趣。",
		rarity: 2
	},

	10: {
		name: "不错哦",
		description: "在任何输入框中输入 69",
		check: function () { return true; }, // 本地检查
		flavor: "别装作不知道你干了什么。",
		rarity: 2
	},

	11: {
		name: "你懂这些怎么运作的，对吧？",
		description: "在没有研究的情况下重置研究",
		check: function () {
			return g.researchRespec &&
				(!researchList.nonPermanent
					.map(x => g.research[x])
					.includes(true));
		},
		event: "wormholeResetBefore",
		flavor: "<a style=\"color:#ffffff\" href=\"https://books.google.co.uk/books/about/Quantum_Physics_For_Dummies.html?id=pRRq8vCFvzEC&source=kp_book_description&redir_esc=y\" target=\"_blank\">研究将会有所帮助</a>",
		rarity: 3
	},

	12: {
		name: "精确到毫米",
		description: "恰好拥有 1,000 总暗轴时摧毁宇宙",
		check: function () {
			return stat.totalDarkAxis.eq(c.e3);
		},
		event: "wormholeResetBefore",
		flavor: "我们要不要告诉他们关于“最大购买”……",
		rarity: 3
	},

	13: {
		name: "百万分之一",
		description: "每秒有 1 / 1,000,000 的概率获得此成就",
		check: function () { return true; }, // 本地检查
		event: "luckyGameloop",
		flavor: "平均需要 11 天 13 小时 46 分 40 秒才能获得。这……其实不算太久。",
		chance: function (time) {
			return 1 - Math.exp(-time / 1e6);
		},
		rarity: 5
	},

	14: {
		name: "十亿分之一",
		description: "每秒有 1 / 1,000,000,000 的概率获得此成就",
		check: function () { return true; }, // 本地检查
		prevReq: [13],
		event: "luckyGameloop",
		flavor: "平均需要 31 年 259 天 1 小时 46 分 40 秒才能获得。感谢你花时间与《奇异物质维度》在一起！",
		chance: function (time) {
			return 1 - Math.exp(-time / 1e9);
		},
		rarity: 6
	},

	15: {
		name: "万亿分之一",
		description: "每秒有 1 / 1,000,000,000,000 的概率获得此成就",
		check: function () { return true; }, // 本地检查
		prevReq: [14],
		event: "luckyGameloop",
		flavor: "平均需要 31,709 年 289 天 1 小时 46 分 40 秒才能获得。你玩得开心吗？",
		chance: function (time) {
			return 1 - Math.exp(-time / 1e12);
		},
		rarity: 7
	},

	16: {
		name: "专业装修工",
		description: "在一次会话中切换主题颜色 20 次。",
		check: function () {
			return themeAchievementCount > 19;
		},
		reward: "解锁新颜色主题",
		flavor: "又是 DarkReader 的故障？*叹气*",
		rarity: 3
	},

	17: {
		name: "不如去现实生活搞研究。",
		description: "购买研究 6-9。",
		check: function () { return g.research.r6_9; }, // 本地检查
		event: "researchBuy",
		flavor: "<b>这不是免费的，是负的免费，而负免费是很贵的。</b> —— Stat Mark",
		rarity: 2
	},

	18: {
		name: "强化奇异物质维度",
		description: "尝试购买一个强化轴",
		check: function () {
			return empoweredAxisBought >= 1;
		},
		flavor: "就叫它 R 轴算了！",
		rarity: 1
	},

	19: {
		name: "强化奇异物质维度 II",
		description: "在一次会话中尝试购买强化轴 10 次",
		prevReq: [18],
		check: function () {
			return empoweredAxisBought >= 10;
		},
		flavor: "费用：100 强化奇异物质",
		rarity: 2
	},

	20: {
		name: "强化奇异物质维度 III",
		description: "在一次会话中尝试购买强化轴 100 次",
		prevReq: [19],
		check: function () {
			return empoweredAxisBought >= 100;
		},
		flavor: "停下吧。去寻求帮助。",
		rarity: 2
	},

	21: {
		name: "强化奇异物质维度 IV",
		description: "在一次会话中尝试购买强化轴 1,000 次",
		prevReq: [20],
		check: function () {
			return empoweredAxisBought >= 1000;
		},
		flavor: "这是最后一个了，我保证。",
		rarity: 3
	},

	22: {
		name: "强化奇异物质维度 V",
		description: "在一次会话中尝试购买强化轴 10,000 次",
		prevReq: [21],
		check: function () {
			return empoweredAxisBought >= 10000;
		},
		get flavor() {
			return (empoweredAxisBought >= 1e5)
				? ("不存在强化奇异物质维度 VI<br>[疯狂地咯咯笑]")
				: ("距离下一个还有 " +
					(1e5 - empoweredAxisBought)
						.toLocaleString("en-US") +
					" 次点击。祝你好运！");
		},
		rarity: 4
	},

	23: {
		name: "提恰之心",
		description: "购买第 40 颗星星",
		check: function () { return g.stars > 39; },
		event: "starBuy",
		flavor: "第 11 行星星即将到来 𝕍3.0！",
		rarity: 1
	},

	24: {
		name: "塔迪斯",
		description: "点满所有扩张升级",
		check: function () {
			return countTo(4).map(
				x => g.dilationUpgrades[x] ===
					dilationUpgrades[x].cap
			).reduce((x, y) => x && y);
		},
		timeTaken: function () {
			let out = 0;
			for (let i = 1; i < 5; i++) {
				for (let j = 0;
					j < dilationUpgrades[i].cap;
					j++) {
					out += dilationUpgrades[i].cost(j);
				}
			}
			return out;
		},
		get flavor() {
			return timeFormat(this.timeTaken()) +
				" 花得真值。";
		},
		rarity: 6
	},

	25: {
		name: "我爱瑞克摇滚",
		description: "被 alemaninc 给骗了（Rickroll）",
		check: function () { return true; }, // 只需点击链接
		reward: "alemaninc 永远不会放弃《奇异物质维度》！你将永远不会再被一个令人失望的《奇异物质维度》更新辜负。",
		flavor: "看到了吗？这是信任 alemaninc 的另一个理由。",
		rarity: 2
	},

	26: {
		name: "钓鱼执法",
		description: "被 alemaninc 诈骗",
		check: function () { return true; }, // 只需点击 7 个按钮
		get reward() {
			return "alemaninc 正在路上收取那张信用卡。预计到达时间：" +
				timeFormat(Math.max(
					86400 - timeSinceGameOpened,
					46800 - timeSinceGameOpened % 7200
				));
		},
		flavor: "你可以跑，但你躲不掉",
		rarity: 2
	},

	27: {
		name: "小报成瘾",
		description: "得到 alemaninc 的帮助",
		check: function () { return true; }, // 只需点击按钮
		reward: "+1% 生产力",
		flavor: "公众对一切都怀有无尽的好奇心，除了值得了解的东西。",
		rarity: 2
	},

	28: {
		name: "xhwzwka",
		description: "证明你杰出贡献者的身份",
		check: function () {
			return newsSupport.xhwzwkaPhishing === 5;
		},
		prevReq: [26],
		flavor: "\"谁是 XHWZWKA？\"<br>\"定义不明！\"",
		rarity: 5
	},

	29: {
		name: "扩张的瞳孔",
		get description() {
			return "达到 " +
				timeFormat(c.inf.pow10()) +
				" 的扩张奇异物质";
		},
		check: function () {
			return g.exoticmatter
				.log10()
				.pow(
					c.d1_05.pow(
						newsSupport.dilationPenaltyReductions
					).mul(c.d0_75)
				).gt(c.inf);
		},
		flavor: "这就是你需要多久才能停止点击新闻 ticker？",
		rarity: 4
	},

	30: {
		name: img("blobwave", "Blob wave", 32),
		description: "证明你是常驻贡献者",
		check: function () { return true; },
		reward: "你的 blob 在游戏里了！看！",
		flavor: "为什么 PSionJoule 有个隐藏成就而其他人没有？不公平！",
		rarity: 3
	},

	31: {
		name: "深思",
		description: "恰好点击《银河系漫游指南》42 次",
		check: function () { return this.clicks === 42; },
		flavor: "关于生命、宇宙以及人们点击随机标题的终极问题",
		rarity: 5,
		clicks: 0,
		click: function () {
			this.clicks++;
			if (this.clicks === 42) {
				setTimeout(() => {
					addSecretAchievement(31);
				}, 2000);
			} else {
				setTimeout(function () {
					secretAchievementList[31].clicks = 0;
				}, 30000);
			}
		}
	},

	32: {
		name: "你有 1 ^300, 0 ^299, 0 ^298 和 0 ^297",
		get description() {
			return "拥有 " + BEformat("e300") +
				"× 的 Zip Point 乘数";
		},
		check: function () {
			return g.zipPointMulti === 1e300;
		},
		flavor: "愚蠢的 xhwzwka 把它改成了“你有 1e300 指数”。多无聊啊……<br>但随后，他恢复了“你有 1 ^300, 0 ^299, 0 ^298 和 0 ^297”，Zip Points 也恢复了往日的荣光。",
		rarity: 7
	},

	33: {
		name: "Stat Mark",
		description: "证明你是未在服务器内的杰出贡献者",
		check: function () {
			return newsSupport.newsletter.remaining.length === 0;
		},
		flavor: "几乎没标记",
		rarity: 6
	},

	34: {
		name: "进错游戏了吧？",
		description: "导入《反物质维度》的存档字符串",
		check: function () { return true; },
		flavor: "alemaninc 知道被误认为是比自己伟大得多的存在是什么感觉。<br>alemaninc 更生气了。",
		rarity: 2
	},

	35: {
		name: "每个archverse一个",
		description: "虫洞重置后，扩张时间秒数与总虫洞重置次数相等。",
		check: function () {
			return Math.floor(g.dilatedTime) ===
				g.TotalWormholeResets;
		},
		event: "wormholeResetAfter",
		get flavor() {
			return "你会称它们为维度，但它们各自已经有 " +
				fullAxisCodes.map(
					x => stat["real" + x + "Axis"]
				).filter(x => x.gt(0)).length +
				" 个那种东西了……";
		},
		rarity: 4
	},

	36: {
		name: "命运之轮",
		description: "你的幸运精华数值中至少包含 7 个“7”",
		check: function () {
			if (!StudyE(7)) return false;
			let count = 0;
			for (let i of String(g.luckEssence)) {
				if (i === "7") count++;
			}
			return count > 6;
		},
		event: "stardustReset",
		flavor: "这本来可以是 7 分，但 alemaninc 当然很吝啬，只给自己 7 分的成就……",
		rarity: 4
	},

	37: {
		name: "最后一刻",
		description: "在研究 XI 中将超频设为 265.78× 或更高",
		check: function () {
			return StudyE(11) &&
				(overclockSpeedupFactor >= 265.77531);
		},
		event: "gameloop",
		flavor: "alemaninc 真的是个月之笨蛋，不是吗？",
		rarity: 3
	},

	38: {
		name: "阅读更多",
		description: "连续点击“阅读更多”两次。",
		check: function () {
			return newsSupport.readMoreIteration > 1;
		},
		event: "readMore",
		flavor: "你知道吗，开发者其实不是 alemaninc，而是<br><b onMousedown=\"newsSupport.readMore()\">阅读更多</b>",
		rarity: 2
	},

	39: {
		name: "加斯特冲击波",
		description: "连续点击“阅读更多”十次。",
		check: function () {
			return newsSupport.readMoreIteration > 9;
		},
		prevReq: [38],
		event: "readMore",
		flavor: "生命太短，不值得读烂书。",
		rarity: 7
	},

	40: {
		name: "完美平衡",
		description: "让你所有色素的平均颜色在灰色 0.1% 误差范围内",
		check: function () {
			if (g.chroma.sumDecimals().eq(c.d0))
				return false;
			let channels = [
				[0, 4, 5, 6],
				[1, 3, 5, 6],
				[2, 3, 4, 6]
			];
			let colors = channels.map(
				x => Decimal.div(
					x.map(y => g.chroma[y]).sumDecimals()
						.add(g.chroma[8].div(c.d2)),
					g.chroma.sumDecimals()
				)
			);
			return Decimal.eq_tolerance(
				colors[0], colors[1], 0.001
			) &&
			Decimal.eq_tolerance(
				colors[0], colors[2], 0.001
			) &&
			Decimal.eq_tolerance(
				colors[1], colors[2], 0.001
			);
		},
		event: "gameloop",
		flavor: "万物皆应如此。",
		rarity: 2
	},

	41: {
		name: "Internet Explorer",
		description: "阅读《奇异物质维度》的完整源代码",
		check: function () { return true; }, // 本地检查
		flavor: "好的软件，就像葡萄酒，需要时间。",
		rarity: 6
	},

	42: {
		name: "总有更大的鱼",
		description: "逃脱 nicodium 的骗局",
		check: function () { return true; }, // 本地检查
		flavor: "我的同事们觉得我很尴尬，因为我在谈论心智、身体、精神。所以我被称为庸医。我被叫做骗子，起初我很反感，但后来我习惯了。",
		rarity: 2
	},

	43: {
		name: "奇异时间",
		description: "逆转时间",
		check: function () { return deltatime < 0; },
		get flavor() {
			let t = 86400 - (Date.now() % 24000) * 3.6;
			return String(Math.floor(t / 3600)).padStart(2, "0") +
				":" +
				String(Math.floor(t / 60) % 60).padStart(2, "0") +
				":" +
				String(Math.floor(t) % 60).padStart(2, "0");
		},
		rarity: 4
	},

	44: {
		name: "诡异点击者",
		description: "点击不可点击的新闻 ticker",
		clicks: 0,
		check: function () { return this.clicks > 99; },
		flavor: "",
		rarity: 3
	},

	45: {
		name: "降临的 Advent",
		description: "最近 10 次虫洞重置，每次产生的霍金辐射都比前一次少",
		check: function () {
			if (g.previousWormholeRuns.last10.length !== 10) {
				return false;
			}
			for (let i = 0; i < 9; i++) {
				if (Decimal.gte(
					g.previousWormholeRuns.last10[i].gain,
					g.previousWormholeRuns.last10[i + 1].gain
				)) {
					return false;
				}
			}
			return true;
		},
		event: "wormholeResetAfter",
		rarity: 4
	},

	46: {
		name: "灵魂肮脏的天使",
		description: "使用研究 I、II 和 III 进入本体论三元组",
		check: function () {
			return (g.activeStudy === 10) &&
				(studyPower(10) === 3) &&
				(g.study10Options.sum() === 6);
		},
		event: "wormholeResetBefore",
		flavor: "一……二……三……十！",
		rarity: 2
	},

	47: {
		name: "灵魂更肮脏的天使",
		description: "使用研究 I、II 和 III 完成本体论三元组",
		prevReq: [46],
		check: function () {
			return (g.activeStudy === 10) &&
				(studyPower(10) === 3) &&
				(g.study10Options.sum() === 6);
		},
		event: "wormholeResetAfter",
		flavor: "不用找零了，你这肮脏的家伙……",
		rarity: 4
	},

	48: {
		name: "安慰奖",
		description: "黑入一些隐藏成就点数",
		check: function () {
			return Number(
				d.element("span_secretAchievementPoints")
					.innerText
			) !== secretAchievementPoints;
		},
		event: "gameloop",
		flavor: "并不是每次安慰奖都是为了给获得者以慰藉。有时是为了安抚给予者的良心。",
		rarity: 5
	},

	49: {
		name: "乌龟大师",
		description: "治愈新闻 ticker",
		check: function () { return true; }, // 本地检查
		flavor: "1 瓶水，1 个下界疣，1 个龟壳",
		rarity: 5
	},

	50: {
		name: "世界因反物质过剩而崩溃。",
		get description() {
			return "达到 " + c.inf.format() + " 反物质";
		},
		check: function () {
			return betaActive && g.antimatter.gt(c.inf);
		},
		event: "gameloop",
		flavor: unbreak(
			"<div style=\"text-align:left\"><code>" +
			["studies nowait purchase 11-304",
				"while total tt < 12900 {",
				"  studies nowait purchase 11-304",
				"}",
				"studies nowait purchase 11-304",
				"if tp < 10 {",
				"  unlock dilation",
				"  start dilation",
				"  pause 0.1s",
				"  eternity nowait",
				"}",
				"studies purchase 11-304",
				"wait 0 > 0"]
			.map((x, i) =>
				"<span style=\"opacity:0.5;\">" +
				String(i + 1).padStart(2, " ") +
				"</span>  " + x
			).join("<br>") +
			"</code></div>"
		),
		noQuotes: true,
		rarity: 1
	},

	// 跳过 50 个数字用于元成就
	...(() => {
		let names = [
			"给予者",
			"秘密守护者",
			"工人党总书记",
			"[已编辑]",
			"被遗忘者的天人",
			"至暗艺术的秘密",
			"alemaninc"
		];
		let flavors = [
			"我为身处陌生愚蠢之地的人感到难过。",
			"神秘人可以搜索莉莉和詹姆所在的村庄数年而找不到他们，哪怕他的鼻子贴在他们客厅的窗户上！",
			"<i>《如何成为可怕的领导者傻瓜书》</i>：现于您当地的 alemaninc 公司发售。",
			"根据欧洲数据保护法，此新闻消息已被移除。",
			"终于，我想起了一切。驱逐我的黑暗。Lai'tela……",
			"关于魂器，最邪恶的魔法发明，我们既不谈论也不指引——"
		];
		let out = [];
		for (let i = 0; i < 7; i++) {
			out.push([
				101 + i,
				{
					name: names[i],
					description: "达到 " +
						((i + 1) * 100) +
						" 隐藏成就点数",
					prevReq: (i === 0) ? [] : [100 + i],
					event: "secretMeta",
					check: function () {
						return secretAchievementPoints >=
							((i + 1) * 100);
					},
					flavor: flavors[i] ?? "待定",
					rarity: i + 1
				}
			]);
		}
		return Object.fromEntries(out);
	})(),

	...(() => {
		let names = [
			"“某色无限牢狱”",
			"QEF “约 500 年的涟漪”"
		];
		let flavors = [
			"基于蕾米莉亚·斯卡雷特的<i>“猩红幻想乡”</i>",
			"基于<i>“"
		];
		let out = [];
		for (let i = 0; i < 6; i++) {
			out.push([
				108 + i,
				{
					name: names[i] ?? "待定",
					description: "拥有 " +
						((i + 1) * 25) +
						" 个隐藏成就",
					event: "secretMeta",
					check: function () {
						return betaActive &&
							(totalSecretAchievements >=
								(i + 1) * 25);
					},
					flavor: flavors[i] ?? "待定",
					rarity: i + 2
				}
			]);
		}
		return Object.fromEntries(out);
	})(),

	...(() => {
		function dialogueGen(array) {
			return "<div><table>" +
				array.map(x =>
					(x.length === 1)
						? ("<tr><td style=\"width:360px;text-align:left;vertical-align:top;padding-bottom:2px;\" colspan=\"2\">" +
							x[0] + "</td></tr>")
						: ("<tr><td style=\"width:60px;text-align:left;vertical-align:top;padding-bottom:2px;\">" +
							x[0] +
							"</td><td style=\"width:300px;text-align:left;vertical-align:top;padding-bottom:2px;\">" +
							x[1] + "</td></tr>")
				).join("") +
				"</table></div>";
		}
		let flavors = {
			1: [
				["<i>一条长长的走廊。这是妖怪看到的月亮制造的疯狂幻觉吗？对于妖怪来说，这临近的月亮带来了淡淡的怀旧回忆。</i>"]
			],
			2: [
				["<b>八意永琳 进入</b>"],
				["八意永琳：", "哈哈哈。"],
				["", "很好，你在跟着我嘛。"],
			],
			3: [
				["幽香：", "这走廊很奇怪。它不可能这么长。"],
				["灵梦：", "外面变成了我从未见过的世界！"],
			],
			4: [
				["<b>八意永琳 退出</b>"],
				["灵梦：", "看来那条长走廊已经结束了。要不要早点放弃？"],
			],
			5: [
				["<b>八意永琳 进入</b>"],
				["八意永琳：", "啊哈哈。哎呀，你们两个真蠢。"],
				["紫：", "喂，她刚刚说我们蠢。都是因为我让巫女干她自己的事。"],
			],
			6: [
				["八意永琳：", "早晨即将来临。"],
				["", "在那之后，我会把满月还给你。"],
				["灵梦：", "哎呀，你可真是个好听众呢？"],
				["八意永琳：", "我的法术已经完成了。"],
				["", "任何人都不可能从这里带走公主。"],
				["紫：", "公主？我们一开始对公主就没兴趣。"],
				["灵梦：", "我们只想让你把满月还回来。"],
			],
			7: [
				["八意永琳：", "别担心。早晨来临时，我会立刻还给你。"],
				["灵梦：", "那还不够好。"],
				["", "我们要在早晨<b>之前</b>拿回来。"],
				["八意永琳：", "你太不耐烦了。"],
				["", "看看我们现在所在的地方。你知道这里是哪吗？"],
				["灵梦：", "？？"],
			],
			8: [
				["八意永琳：", "这里是从假月通往地球的走廊。"],
				["", "刚才那条无尽的走廊，就是连接两者的虚假通道。"],
				["", "你们两个被假满月制造的幻觉欺骗了，来到了这里。"],
				["灵梦：", "然后呢？那又怎样？"],
				["八意永琳：", "你们有办法回家吗？"],
			],
			9: [
				["紫：", "我明白了。打败你之后再处理那件事。"],
				["", "我们不急。"],
				["八意永琳：", "一个被我的法术完美欺骗的人，怎么会认为自己还能反对我？真奇怪。"],
				["", "嗯，我自己又不是恶魔。"],
				["", "在早晨到来之前，我会陪你们玩玩。"],
			],
			10: [
				["灵梦：", "我不太明白，但是……"],
				["", "如果我们打败她，就能解决一切？"],
				["紫：", "看吧，这就是为什么她说你蠢。"],
				["", "但你完全正确。"],
				["", "博丽灵梦说的每一句话都完全正确。"],
			],
			11: [
				["八意永琳：", "现在，所有的地球人都将永远徘徊，无法到达月球。"],
				["", "月球人也一样。"],
				["", "这样一来，月球人都应该无法到达地球。"],
				["", "这是我最大的秘密法术之一。地球变成了一个巨大的密封室。"],
			],
			12: [
				["紫：", "她就像之前的兔子一样。这里面有太多疯子了。"],
				["灵梦：", "那么，紫。我们快点打败她，回地球去吧。"],
			],
			13: [
				["八意永琳：", "噢，看来你现在想和我玩了。"],
				["", "恐怕我没有力气永远玩下去，但是……"],
				["", "即便如此，我可以玩到早上。"],
			],
			14: [
				["紫：", "我倒是不介意永远玩下去。但改天吧……"],
				["八意永琳：", "幻想乡的黎明近了！"],
			],
			15: [
				["<b>八意永琳 战败</b>"],
				["辉夜：", "你在搞什么鬼！？"],
				["<b>蓬莱山 辉夜 进入</b>"],
				["辉夜：", "永琳，我用我的力量再给你一次机会。"],
				["", "如果你这次输了……"],
				["", "那边的人类，还有妖怪！"],
				["", "用我的力量制造的药品，加上永琳真正的实力，会让你们终生难忘！"],
				["<b>八意永琳 复活</b>"],
			],
			16: [
				["<b>八意永琳 战败</b>"],
				["<b>普通结局 #5</b>"],
			]
		};
		let out = [];
		function countByRarity(rarity) {
			let out = 0;
			for (let i of Object.keys(secretAchievementList)) {
				if (g.secretAchievement[i] &&
					(secretAchievementList[i].rarity === rarity)) {
					out++;
				}
			}
			return out;
		}
		let storyOrder = [6, 12, 5, 8, 15, 1, 10, 3, 11, 2, 4, 13, 9, 14, 16, 7];
		for (let r = 1; r < 7; r++) {
			for (let n = 0; n < [1, 5, 4, 3, 2, 1][r - 1]; n++) {
				let num = 10 + 10 * n;
				let rarity = r + n + 1;
				out.push([
					114 + out.length,
					{
						name: "数字勋章 第" +
							String(storyOrder[out.length])
								.padStart(2, "0") +
							"部分 / 共 16 部分",
						description: "拥有 " +
							num + " 个 " +
							secretAchievementRarityNames[r] +
							" 隐藏成就",
						event: "secretMeta",
						check: function () {
							return countByRarity(r) >= num;
						},
						flavor: dialogueGen(
							flavors[storyOrder[out.length]]
						),
						noQuotes: true,
						rarity: rarity
					}
				]);
			}
		}
		return Object.fromEntries(out);
	})()
};
const achievementEvents = (() => {
	let out = {};
	for (let i of achievement.all) {
		let e = achievement(i).event;
		if (e === undefined) continue;
		if (out[e] === undefined) out[e] = [];
		out[e].push(i);
	}
	return out;
})();

const secretAchievementEvents = (() => {
	let out = {};
	for (let i of Object.keys(secretAchievementList)) {
		let e = secretAchievementList[i].event;
		if (e === undefined) continue;
		if (out[e] === undefined) out[e] = [];
		out[e].push(i);
	}
	return out;
})();

function updateAchievementsTab() {
	let tiers = Object.keys(achievementList);
	for (let tier of tiers) {
		// 如果该层成就尚未解锁首个，或全部已完成但不显示完成状态
		if (
			(achievement.ownedInTier(tier) === 0 &&
				!g.achievement[achievement.initial[tier]]) ||
			(achievement.ownedInTier(tier) ===
				Object.keys(achievementList[tier]).length &&
				!g.completedAchievementTiersShown)
		) {
			d.display("div_achTier" + tier, "none");
		} else {
			d.display("div_achTier" + tier, "inline-block");

			d.innerHTML(
				"span_ownedTier" + tier + "Achievements",
				achievement.ownedInTier(tier).toFixed(0)
			);

			let list = Object.keys(achievementList[tier]);
			for (let ach of list) {
				if (achievement.visible(ach)) {
					d.display("div_achievement" + ach, "inline-block");

					d.element("div_achievement" + ach).style[
						"background-color"
					] = g.achievement[ach]
						? "rgba(0,255,0,0.5)"
						: "rgba(102,102,102,0.2)";

					let bgcolor = [[1, 3], [3, 5], [5, 7]].map(x =>
						parseInt(
							achievement.tierColors[tier].dark.substring(
								x[0],
								x[1]
							),
							16
						)
					);

					let realbgcolor = g.achievement[ach]
						? [
							bgcolor[0] / 2,
							bgcolor[1] / 2 + 128,
							bgcolor[2] / 2
						]
						: bgcolor.map(x => x * 0.8 + 20.4);

					d.element("div_achievement" + ach).style.color =
						blackOrWhiteContrast(realbgcolor.join(","));

					d.element("div_achievement" + ach).style[
						"border-color"
					] = g.achievement[ach]
						? "rgba(0,255,0,0.8)"
						: "rgba(0,0,0,0.2)";
				} else {
					d.display("div_achievement" + ach, "none");
				}
			}
		}
	}
}

function updateSecretAchievementsTab() {
	secretAchievementPoints = Object.entries(g.secretAchievement)
		.map(x => (x[1] ? secretAchievementList[x[0]].rarity : 0))
		.sum();

	d.innerHTML(
		"span_secretAchievementPoints",
		secretAchievementPoints
	);

	for (let i of Object.keys(secretAchievementList)) {
		d.display(
			"div_secretAchievement" + i,
			g.secretAchievement[Number(i)]
				? "inline-block"
				: "none"
		);
	}
}

const yellowLight = {};

yellowLight.value = function (breakpoints, x) {
	if (x.lte(breakpoints[0])) return c.d0;

	if (breakpoints.length === 3) {
		if (x.gte(breakpoints[1])) return c.d1;

		let start = breakpoints[0].layerplus(-breakpoints[2]);
		let end = breakpoints[1].layerplus(-breakpoints[2]);

		return Decimal.div(
			Decimal.sub(x.layerplus(-breakpoints[2]), start),
			Decimal.sub(end, start)
		);
	} else {
		return Decimal.div(
			x.layerplus(-breakpoints[1]),
			breakpoints[0].layerplus(-breakpoints[1])
		).sub(c.d1);
	}
};

yellowLight.affected =
	achievement.all.filter(
		x => achievement(x).yellowBreakpoints !== undefined
	);

yellowLight.currentAffected;

yellowLight.effectHTML = function (id, a, b) {
	if (a.eq(b) || lightTiersUnlocked() < 2) {
		return achievement(id).effectFormat(
			achievement(id).effect()
		);
	}

	return arrowJoin(
		"<span class=\"big\" style=\"font-size:110%;color:#cccc00;\">" +
			achievement(id).effectFormat(
				achievement(id).effect(a)
			) + "</span>",
		"<span class=\"yellow\" style=\"font-size:110%\">" +
			achievement(id).effectFormat(
				achievement(id).effect(b)
			) + "</span>"
	);
};

function showAchievementInfo(id) {
	alignTooltip(
		"achievementInfo",
		"div_achievement" + id
	);

	let colors = achievement.tierColors[
		achievement.tierOf(id)
	];
	let info = d.element("achievementInfo").style;

	info["background-color"] = colors.dark;
	info.color = colors.light;
	info["border-color"] = colors.light;

	let ach = achievement(id);
	let txt = [
		"<h3 style=\"margin:2px;\">" +
			ach.name + "</h3>" +
			(achievement(id).failed === undefined
				? ""
				: "<div style=\"font-size:10px;white-space:break-spaces;\">（在进度条上显示此成就可防止其失败。）</div>"),
		"<b>达成条件</b><br>" + ach.description
	];

	if (ach.reward !== undefined) {
		let rewardText = [
			ach.effect === undefined
				? ach.reward
				: showFormulas && ach.formulaText !== undefined
					? ach.reward.replaceAll(
						"{}",
						formulaFormat(ach.formulaText())
					)
					: yellowLight.affected.includes(String(id))
						? ach.reward.replaceAll(
							"{}",
							yellowLight.effectHTML(
								id,
								c.d0,
								achievement(id).yellowValue
							)
						)
						: ach.effectFormat === undefined
							? ach.reward
							: ach.reward.replaceAll(
								"{}",
								ach.effectFormat(ach.effect())
							)
		];

		if (
			ach.yellowBreakpoints !== undefined &&
			lightTiersUnlocked() > 1
		) {
			if (ach.yellowBreakpoints[0].lte(g.lumens[5])) {
				let limitReached =
					ach.yellowBreakpoints.length === 3
						? ach.yellowBreakpoints[1].lte(
							g.lumens[5]
						)
						: false;

				let from0 = ach.yellowBreakpoints[0].eq(c.d0);

				let text = limitReached && from0
					? ("受黄光素影响，上限为 " +
						ach.yellowBreakpoints[1].format())
					: limitReached && !from0
						? ("受黄光素影响，范围从 " +
							ach.yellowBreakpoints[0].format() +
							" 到 " +
							ach.yellowBreakpoints[1].format())
						: !limitReached && from0
							? "受黄光影响"
							: ("受超过 " +
								ach.yellowBreakpoints[0].format() +
								" 的黄光素影响");

				rewardText.push(
					"<span style=\"color:#cccc00\">(" +
						text + ")</span>"
				);
			}
		}

		txt.push(
			"<b>奖励</b><br>" +
			rewardText.join("<br>")
		);
	}

	let raw = ach.progress();
	let percent =
		Array.isArray(raw)
			? raw
			: typeof raw === "object"
				? raw.percent
				: undefined;

	let tooltip =
		typeof raw === "string"
			? raw
			: typeof raw === "object" && !Array.isArray(raw)
				? raw.text
				: undefined;

	if (percent !== undefined) {
		percent =
			typeof percent === "number"
				? percent.toFixed(3) + "%"
				: percent[0].toFixed(3) +
					"% (" +
					percent[1].noLeadFormat(3) +
					" / " +
					percent[2].noLeadFormat(3) +
					")";
	}

	let req =
		percent !== undefined && tooltip !== undefined
			? percent + " (" + tooltip + ")"
			: percent !== undefined
				? percent
				: tooltip !== undefined
					? tooltip
					: functionError(
						"showAchievementInfo",
						arguments
					);

	if (g.achievement[id]) {
		txt.push(
			"<b>进度</b><br>" +
			(typeof achievement(id).milestones === "undefined"
				? true
				: achievement(id).milestones() ===
					achievement(id).maxMilestones
					? "<span style=\"color:#00cc00\">已完成！</span>"
					: ("<span><span style=\"color:#00cccc\">" +
						achievement(id).milestones() +
						" / " +
						achievement(id).maxMilestones +
						" 里程碑达成</span><br><span style=\"color:#ffcc00\">" +
						req + "</span></span>"))
		);
	} else {
		txt.push(
			"<b>进度</b><br><span style=\"color:#ffcc00;\">" +
				req + "</span>"
		);
	}

	if (
		ach.flavor !== undefined &&
		g.achievement[id]
	) {
		txt.push(
			"<div style=\"font-size:10px;white-space:break-spaces;color:" +
				blackOrWhiteContrast(hexToRGB(colors.dark)) +
				"\">\"" + ach.flavor + "\"</div>"
		);
	}

	d.innerHTML("achievementInfo", txt.join("<hr>"));
}

function addAchievement(x) {
	if (achievement(x).beta && !betaActive) return;
	if (achievement(x).check() && !g.achievement[x]) {
		g.achievement[x] = true;

		let tier = achievement.tierOf(x);
		let colors = achievement.tierColors[tier];

		notify(
			"获得成就！\"" +
				achievement(x).name +
				"\" [" + x + "]",
			colors.dark,
			colors.light
		);

		if (
			achievement.ownedInTier(tier) ===
			Object.keys(achievementList[tier]).length
		) {
			notify(
				"你已完成所有 " +
					achievement.tierName(tier) +
					" 成就！",
				colors.dark
			);
		}

		if (tier === "5" && achievement.ownedInTier(5) === 15) {
			updateResearchTree();
			generateResearchCanvas();
		}

		updateAchievementsTab();
		d.display("span_noAchievements", "none");

		totalAchievements =
			Object.values(g.achievement)
				.map(x => (x ? 1 : 0))
				.sum();

		if (achievement.tierOf(x) === 5) {
			if (
				wormholeMilestoneList[
					achievement.ownedInTier(5)
				] !== undefined
			) {
				let milestone =
					wormholeMilestoneList[
						achievement.ownedInTier(5)
					];

				notify(
					"你解锁了新的虫洞里程碑！" +
						(milestone.notification ??
							milestone.text ??
							milestone.static) +
						".",
					"#000099",
					"#ffffff"
				);
			}
		}

		achievement.perAchievementReward[tier].currentVal =
			achievement.perAchievementReward[tier].calc(
				achievement.ownedInTier(tier)
			);
	}
}

function addAchievements(evt) {
	for (let i of achievementEvents[evt] ?? []) {
		addAchievement(i);
	}
	for (let i of secretAchievementEvents[evt] ?? []) {
		addSecretAchievement(i);
	}
}

function validAchievement(id) {
	try {
		achievement(id);
	} catch {
		return false;
	}
	if (achievement(id) === undefined) return false;
	return true;
}

function addSecretAchievement(x) {
	if (
		secretAchievementList[x].check() &&
		!g.secretAchievement[x]
	) {
		g.secretAchievement[x] = true;

		let colors =
			secretAchievementRarityColors[
				secretAchievementList[x].rarity
			];

		notify(
			"获得隐藏成就！\"" +
				secretAchievementList[x].name +
				"\" (" +
				secretAchievementRarityNames[
					secretAchievementList[x].rarity
				] +
				")",
			colors.dark,
			colors.light
		);

		updateSecretAchievementsTab();
		totalSecretAchievements =
			Object.values(g.secretAchievement)
				.map(x => (x ? 1 : 0))
				.sum();

		addAchievements("secretMeta");
	}
}

function showSecretAchievementInfo(id) {
	alignTooltip(
		"secretAchievementInfo",
		"div_secretAchievement" + id
	);

	let info = d.element("secretAchievementInfo").style;
	let ach = secretAchievementList[id];
	let colors =
		secretAchievementRarityColors[ach.rarity];

	info["background-color"] = colors.dark;
	info.color = colors.light;
	info["border-color"] = colors.light;

	let txt = [
		"<h3 style=\"text-decoration:underline;font-weight:700;margin:0px;\">" +
			ach.name +
			"</h3><span style=\"font-size:75%\">" +
			secretAchievementRarityNames[ach.rarity] +
			" 〜 " +
			ach.rarity +
			" 点" +
			(ach.rarity === 1 ? "" : "s") +
			"</span>",
		"<b>达成条件</b><br>" + ach.description
	];

	if (ach.reward !== undefined) {
		txt.push("<b>奖励</b><br>" + ach.reward);
	}

	txt.push(
		"<div style=\"font-size:75%;color:" +
			blackOrWhiteContrast(
				hexToRGB(colors.dark)
			) +
			"\">" +
			(ach.noQuotes ? "" : "\"") +
			ach.flavor +
			(ach.noQuotes ? "" : "\"") +
			"</div>"
	);

	d.innerHTML(
		"secretAchievementInfo",
		txt.join("<hr style=\"color:inherit;opacity:0.5;\">")
	);
}