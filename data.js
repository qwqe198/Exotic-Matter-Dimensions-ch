"use strict";
var debugActive
try{debugActive=alemanicHash(window.location.href.substring(0,23),16)==="9N6fJbOtGsMg5k65"}catch{debugActive=false}
var betaActive=debugActive
/*
所有在"g"中表示为从键列表生成的对象的变量都存储在这里，并在main.js之前直接执行。
*/
const axisCodes = "XYZWVUTSRQPO".split(""); // 轴代码
const fullAxisCodes = axisCodes.map(x=>[x,"dark"+x,"anti"+x]).flat() // 完整轴代码

const starList = countTo(10).map(x=>countTo(4).map(y=>x*10+y)).flat() // 星星列表

const energyTypes = ["dark","stelliferous","gravitational","spatial","neural","meta","vacuum","mental","dimensional","temporal"]; // 能量类型
const energyResources = ["奇异物质获取","星尘获取","暗物质获取","免费X轴","精通力量获取","所有能量获取","霍金辐射获取","知识获取","所有轴成本","Tick速度"]; // 能量资源
const energyDeterminers = ["奇异物质","星尘","暗物质","X轴","精通力量","所有能量","霍金辐射","知识","所有轴","Tick速度"]; // 能量决定器
const energyHyper = [3,3,3,2,3,3,3,3,3,2]; // 能量超维度

const studies = [
	{    // 0用于工具函数
		exactFrames:["在此研究中，所有帧都恰好是50毫秒长；任何额外时间都会转换为膨胀时间。",()=>true], // 精确帧
		roman:function(x){return (x===10)?"研究之研究":roman(x)} // 罗马数字转换
	}
]
studies[1] = {
	name:"自主性", // Autonomy
	unlockReq:function(){return c.e3.mul(studyPower(1)+1)}, // 解锁需求
	description:function() {return ["你无法进入星尘或自动化标签页，或除了离线时间之外的主要标签页的任何子标签页。然而，这些标签页内部的一切仍然正常工作。","所有快捷键被禁用。"]}, // 描述
	research:"r5_7", // 所需研究
	goal:function(comp=studyPower(1)) {return [N(1000),N(2000),N(3000),N(4000)][comp]}, // 目标
	reward:function(num,comp=g.studyCompletions[1]) { // 奖励
		if (num===1) return [c.d0,c.d0_2,c.d0_33,c.d0_42,c.d0_5][comp];
		if (num===2) {
			if (comp===0) return 0
			let achievementFactor = Math.log2((totalAchievements>80)?(totalAchievements/64):(1+totalAchievements**5/1.31072e10))+1
			return 10*(comp-countTo(comp).map(x=>achievementFactor**(x-5)).sum())*studyRewardBoost(1,2).toNumber()
		}
		if (num===3) return [c.d1,c.d4,c.d20,c.d125,c.e3][comp].pow(studyRewardBoost(1,3));
		functionError("studies[1].reward",arguments)
	},
	reward_desc:function() {return [ // 奖励描述
		"增强Y轴的"+studyRewardHTML(1,1,1)+"%",
		"将星尘升级#2的效果增加"+studyRewardHTML(1,2,2)+"个百分点（基于成就）",
		"将霍金辐射获取乘以"+studyRewardHTML(1,3,2)
	]},
	rewardFormulas:{ // 奖励公式
		2:(comp=g.studyCompletions[1],ach=totalAchievements)=>studyRewardBoost(1,2).mul(c.d10).noLeadFormat(3)+" × Σ<span class=\"xscript\"><sup>"+comp+"</sup><sub>1</sub></span>(1 - ("+(ach>=80?"A ÷ 64":("1 + A<sup>5</sup> ÷ "+BEformat(1.31072e10)))+")<sup>n-5</sup>)"
	}
},
studies[2] = {
	name:"大爆炸理论", // Big Bang Theory
	unlockReq:function(){return N(["e7e3","e1e4","e12500","e4e4"][studyPower(2)])}, // 解锁需求
	binding2Info:function(){ // 绑定2信息
		let normal = Object.fromEntries(countTo(10).map(x=>[x,[]]))
		let bound = Object.fromEntries(countTo(10).map(x=>[x,[]]))
		for (let i=1;i<41;i++) {normal[starRow(i,false)].push(i);bound[starRow(i,true)].push(i)}
		function table(obj,heading) {
			let out = "<table><tr><th colspan=\"6\">"+heading+":</th></tr><tr><td rowspan=\"2\" colspan=\"2\"></td><td colspan=\"4\">购买此行的<i>X</i>所需的星星数量:</td></tr><tr>"+countTo(4).map(x=>"<td>"+x+"</td>").join("")+"</tr>"+countTo(10).map(x=>"<tr>"+((x===1)?"<td rowspan=\"10\">行</td>":"")+"<td>"+x+"</td>"+countTo(4,true).map(y=>"<td>"+obj[x][y]+"</td>").join("")+"</tr>").join("")+"</table>"
			return out.replaceAll("<th","<th class=\"tablecell\"").replaceAll("<td","<td class=\"tablecell\"")
		}
		popup({text:table(normal,"正常")+table(bound,"研究中"),buttons:[["关闭",""]]})
	},
	description:function() {return ["星星成本增加得更快。","星星必须以不同的顺序购买。<button class=\"information\" style=\"border-color:inherit;color:inherit;\" onMouseDown=\"studies[2].binding2Info()\">?</button>","每颗未花费的星星都充当一颗免费暗星。"]}, // 描述
	research:"r5_9", // 所需研究
	goal:function(comp=studyPower(2)) {return [c.d800,c.d950,c.d1100,N(2100)][comp];}, // 目标
	reward:function(num,comp=g.studyCompletions[2]) { // 奖励
		if (num===1) return [c.d0,c.d9,c.d16,c.d21,c.d25][comp];
		if (num===2) return [c.d0,c.d0_07,c.d0_12,c.d0_16,c.d0_2][comp].mul(studyRewardBoost(2,2)).add(c.d1);
		if (num===3) return [c.d0,c.d0_25,c.d0_45,c.d0_6,c.d0_75][comp].mul(studyRewardBoost(2,3)).mul(c.d0_5);
		functionError("studies[2].reward",arguments)
	},
	reward_desc:function() {return [ // 奖励描述
		"星星折算效果减弱"+studyRewardHTML(2,1,0)+"%",
		"第9行星星效果提升到"+studyRewardHTML(2,2,4)+"次幂",
		"每颗未花费的星星充当"+studyRewardHTML(2,3,2)+"颗免费暗星。分配的星星算作"+((g.highestGalaxies>=galaxyEffects[5].req)?(galaxyEffects[5].boost.value().mul(c.e2).format()+"%"):"一半")+"。在研究II中无效。"
	]}
},
studies[3] = {
	name:"镇痛剂", // Analgesia
	unlockReq:function(){return [N("e7.5e7"),c.ee10,N("ee11"),N("e1e12")][studyPower(3)]}, // 解锁需求
	energyGainConstant:function(){return [N(1000),N(2000),N(3000),N(4000)][studyPower(3)]}, // 能量获取常数
	energyPowerConstant:function(){return [c.dm1,c.dm2,c.dm5,N(-20)][studyPower(3)]}, // 能量幂次常数
	description:function(){return ["能量增加速度是"+this.energyGainConstant().format(0)+"倍，但所有其他能量速度和效果乘数被禁用。","能量严重减少产量而不是增加（<i>x</i> → <i>x</i><sup>"+this.energyPowerConstant().format()+"</sup>）。","你开始时解锁所有能量。"]}, // 描述
	disclaimers:[ // 免责声明
		studies[0].exactFrames,
		["第5行和第6行能量研究在研究III中始终100%供电，不受任何增益或削弱影响。",()=>unlocked("研究XIII")]
	],
	research:"r9_2", // 所需研究
	goal:function(comp=studyPower(3)){return [c.d2e3,N(2222),N(2500),N(2666)][comp];}, // 目标
	reward:function(num,comp=g.studyCompletions[3]){ // 奖励
		if (num===1) return comp
		if (num===2) return [c.d0,c.d0_2,c.d0_35,c.d0_45,c.d0_5][comp].mul(studyRewardBoost(3,2))
		if (num===3) {
			let out = c.d1
			for (let i=0;i<comp;i++) out = out.add(g.truetimeThisWormholeReset.div(c.d10.pow(i)).pow(i===0?0.5:i))
			return out.pow(studyRewardBoost(3,3))
		}
		functionError("studies[3].reward",arguments)
	},
	reward_desc:function(){return [ // 奖励描述
		"将星尘升级#5的上限增加"+studyRewardHTML(3,1,0),
		"保留前六种能量的"+studyRewardHTML(3,2,3)+"在星尘重置时（在研究III中无效）",
		"元能量增加速度"+studyRewardHTML(3,3,2)+"倍（基于此虫洞中的游戏时间）"
	]},
	rewardFormulas:{ // 奖励公式
		3:function(comp=g.studyCompletions[3]){
			let out = "1 + Σ<span class=\"xscript\"><sup>"+(comp-1)+"</sup><sub>0</sub></span>(t ÷ 10<sup>n</sup>)<sup>max(n, 0.5)</sup>"
			if (studyRewardBoost(3,3).eq(c.d1)) return out
			return "("+out+")<sup>"+studyRewardBoost(3,3).noLeadFormat(3)+"</sup>"
		}
	}
},
studies[4] = {
	name:"真空衰变", // Vacuum Decay
	unlockReq:function() {return Decimal.FC_NN(1,1,Math.log10(2)*(studyPower(4)+1)*512)}, // 解锁需求
	description:function(){return ["你执行的每个星尘重置都会在研究的剩余时间内将星尘获取提升到0.5次幂。"]}, // 描述
	research:"r9_14", // 所需研究
	goal:function(comp=studyPower(4)){return [N(3200),N(3600),N(4250),N(5400)][comp]}, // 目标
	reward:function(num,comp=g.studyCompletions[4]){ // 奖励
		if (num===1) return N([0.5,0.514,0.527,0.539,0.55][comp])
		if (num===2) return N([1,1.6,2.3,3.1,4][comp]).pow(studyRewardBoost(4,2))
		if (num===3) return [c.d1,c.d2_5,c.d5,c.d10,c.d20][comp].pow(studyRewardBoost(4,3).mul(c.d0_3))
		functionError("studies[4].reward",arguments)
	},
	reward_desc:function(){return [ // 奖励描述
		"基础星尘获取公式指数为"+studyRewardHTML(4,1,2),
		"精通42的效果"+studyRewardHTML(4,2,2)+"倍更强",
		"暗星的第一个效果"+studyRewardHTML(4,3,2)+"倍更强"
	]}
},
studies[5] = {
	name:"科学文盲", // Scientific Illiteracy
	unlockReq:function(){return [N("e5000"),N("e5875"),N("e30825"),N("e281775")][studyPower(5)]}, // 解锁需求
	difficultyConstant:function(){return [c.d32,N(64),N(256),c.e4][studyPower(5)]}, // 难度常数
	description:function(){return ["进入此研究将立即重置你的研究，所有研究成本将乘以"+studies[5].difficultyConstant().format()+"。"]}, // 描述
	research:"r2_8", // 所需研究
	goal:function(comp=studyPower(5)){return [N(4000),N(4000),N(7000),N(10666)][comp]}, // 目标
	reward:function(num,comp=g.studyCompletions[5]){ // 奖励
		if (num===1) return [c.d0,c.d80,c.d90,N(96),c.e2][comp]
		if (num===2) return c.d1.sub([c.d0,c.d0_01,N(29/1500),N(41/1500),N(1/30)][comp].mul(studyRewardBoost(5,2)))
		if (num===3) return [c.d0,c.d2_5,c.d10,c.d30,c.d60][comp].mul(studyRewardBoost(5,3))
		functionError("studies[5].reward",arguments)
	},
	reward_desc:function(){return [ // 奖励描述
		researchGroupList.study5a.label+"和"+researchGroupList.study5b.label+"研究以"+studyRewardHTML(5,1,0)+"%效率工作",
		"观察成本提升到"+studyRewardHTML(5,2,4)+"次幂",
		"从所有研究成本中减去"+studyRewardHTML(5,3,2)+"（不能低于0）"
	]}
},
studies[6] = {
	name:"事件视界", // Event Horizon
	unlockReq:function(){return [N(500),N(1000),N(4000),N(11111)][studyPower(6)]}, // 解锁需求
	effect:function(p=stat.totalDarkAxis.div(stat.wormholeDarkAxisReq).min(c.d1)){return (((g.activeStudy===10)&&(studyPower(10)===2))?N(936).log10():[c.d27,c.d30,N(1.11e111).log10(),N("9.99e999").log10()][studyPower(6)]).pow(c.d1.sub(p)).pow10()}, // 效果
	description:function(){return ["游戏运行速度减慢"+this.effect(c.d0).format()+"倍。然而，随着你接近研究目标，此惩罚逐渐减少，最小达到10倍。"]}, // 描述
	research:"r16_8", // 所需研究
	goal:function(comp=studyPower(6)){return [N(4500),N(4800),N(9999),N(22222)][comp]}, // 目标
	reward:function(num,comp=g.studyCompletions[6]){ // 奖励
		if (num===1) return [c.d1,c.d1_25,N(1.75),N(2.5),c.d4][comp]
		if (num===2) return studyRewardBoost(6,2).mul(comp/20)
		if (num===3) return studyRewardBoost(6,3).mul(0.0075*comp)
		functionError("studies[6].reward",arguments)
	},
	reward_desc:function(){return [ // 奖励描述
		"Tick速度对色度获取的效果提升到"+studyRewardHTML(6,1,4)+"次幂",
		"Tick速度<sup>"+studyRewardHTML(6,2,3)+"</sup>影响知识的基础获取",
		"研究8-2对每个拥有的暗轴增加"+studyRewardHTML(6,3,2)+"%强度（当前："+percentOrMult(studies[6].reward(3).mul(stat.totalDarkAxis).div(c.e2).add(c.d1))+")"
	]},
},
studies[7] = {
	name:"今夜好运降临", // Luck Be In The Air Tonight
	unlockReq:function(){return [N("5.55e577777777"),N("8.88e888888888"),N("e1.5e9"),N("6.66e2666666666")][studyPower(7)]}, // 解锁需求
	description:function(){return ["每个星尘重置根据获得的星尘数量给予幸运精华。奇异物质、精通力量、星尘和暗物质的获取提升到一个幂次，介于"+N(studies[7].luckMinPenalty()).noLeadFormat(4)+"和"+N(studies[7].luckMaxPenalty()).noLeadFormat(4)+"之间，基于幸运精华接近1,000的倍数的程度。"]}, // 描述
	luckEssenceGain:function(x=stat.pendingstardust.sub(g.stardust)){return (x.lt(c.d1)?c.d0:x.add(c.d10).log10().log10().mul([444444,555555,666666,777777][studyPower(7)]).floor()).add(g.luckEssence).min(c.e15).sub(g.luckEssence).toNumber()}, // 幸运精华获取
	luckMinPenalty:function(){ // 最小惩罚
		let out = 0
		if ((g.activeStudy===10)&&(studyPower(10)===0)) {out *= 0.741}
		return out
	},
	luckMaxPenalty:function(){ // 最大惩罚
		let out = 1
		if ((g.activeStudy===10)&&(studyPower(10)===0)) {out *= 0.741}
		return out
	},
	luckEffect:function(x=g.luckEssence){ // 幸运效果
		if (x===1e15) return N(this.luckMinPenalty())   // 为了避免高值时的随机性，在1e15时总是给出最大惩罚
		return N(this.luckMinPenalty() + (1+Math.cos(x*Math.PI/500)) * (this.luckMaxPenalty()-this.luckMinPenalty()) / 2)
	},
	research:"r23_5", // 所需研究
	goal:function(comp=studyPower(7)){return [N(6227),N(8888),N(11111),N(17777)][comp]}, // 目标
	reward:function(num,comp=g.studyCompletions[7]){ // 奖励
		if (num===1) return [c.d0,N(50),N(75),N(90),N(100)][comp]
		if (num===2) return [c.d0,c.d75,c.d90,N(98),c.d100][comp].mul(studyRewardBoost(7,2))
		if (num===3) return [g.hawkingradiation.add(c.e10).log10().log10().pow(comp).sub(c.d1),c.em3,studyRewardBoost(7,3)].productDecimals().pow10().sub(c.d1)
		functionError("studies[7].reward",arguments)
	},
	reward_desc:function(){return [ // 奖励描述
		"增强暗W轴的"+studyRewardHTML(7,1,3)+"%",
		researchGroupList.study7.label+"研究以"+studyRewardHTML(7,2,3)+"%效率工作",
		(unlocked("幸运")||unlocked("矩阵"))?("每秒获取"+studyRewardHTML(7,3,2)+"个幸运碎片（基于霍金辐射）"):"? ? ?（完成后显示）"
	]},
	rewardFormulas:{ // 奖励公式
		3:(comp=g.studyCompletions[7])=>"10<sup>(log<sup>[2]</sup>(HR + "+c.e10.format()+")"+formulaFormat.exp(N(comp))+" - 1)"+formulaFormat.mult(studyRewardBoost(7,3).div(c.e3))+"</sup> - 1"
	}
},
studies[8] = {
	name:"大师", // Masterful
	unlockReq:function(){return [N("3.33e333"),N("7.77e777"),N("9.99e2999"),N("4.44e4444")][studyPower(8)]}, // 解锁需求
	darkAxisMaxCostExp:function(){ // 暗轴最大成本指数
		let out = N(88)
		if ((g.activeStudy===10)&&(studyPower(10)===1)) {out = out.mul(Decimal.add(g.truetimeThisWormholeReset.add1Log(c.d10).add1Log(c.d10),g.truetimeThisWormholeReset.add1Log(c.d10).add1Log(c.d10).pow(c.d2)))}
		return out
	},
	darkAxisMaxCost:function(){return g.masteryPower.add1PowSub1(this.darkAxisMaxCostExp())}, // 暗轴最大成本
	description:function(){return ["允许你从每行激活超过1个精通的效果被禁用。","暗轴的成本不能超过<i>(MP + 1)<sup>"+studies[8].darkAxisMaxCostExp().noLeadFormat(4)+"</sup> - 1</i>。"]}, // 描述
	research:"r18_8", // 所需研究
	goal:function(comp=studyPower(8)){return [N(5888),N(7888),N(15288),N(16888)][comp]}, // 目标
	reward:function(num,comp=g.studyCompletions[8]) { // 奖励
		if (num===1) return [c.d50,N(52.5),N(55),N(57.5),N(60)][comp]
		if (num===2) return [c.d0,c.d9,c.d16,c.d21,c.d24][comp].mul(studyRewardBoost(8,2))
		if (num===3) {return (comp>0)?[N(3240),N(8100),N(16200),N(25920)][comp-1].mul(studyRewardBoost(8,3)):g.achievement[310]?c.d900:c.d0}
		functionError("studies[8].reward",arguments)
	},
	reward_desc:function(){return [ // 奖励描述
		"将知识效果限制增加到"+studyRewardHTML(8,1,2)+"%",
		"精通85对每个第8级成就增强"+studyRewardHTML(8,2,2)+"%（加法；当前："+studies[8].reward(2).mul(achievement.ownedInTier(8)).noLeadFormat(2)+"%）",
		"将精通力量获取计时器增加"+studyRewardHTML(8,3,x=>timeFormat(x))+"的真实时间"
	]}
},
studies[9] = {
	name:"知识即经验", // Scientia est Experientia
	unlockReq:function(){return [N(9.99e149),N(9.99e229),N("9.99e469"),N("9.99e1399")][studyPower(9)]}, // 解锁需求
	description:function(){return ["奇异物质获取、暗物质获取以及所有对普通轴和暗轴成本的全局除数减少到10<sup>log(基础获取)<sup>"+this.experientiaEffect(c.d0).noLeadFormat(3)+"</sup></sup>。","如果未在9秒内完成，研究将重置，你将根据暗星数量获得或失去经验，减轻或增强先前的效果。"]}, // 描述
	disclaimers:[ // 免责声明
		studies[0].exactFrames
	],
	research:"r23_11", // 所需研究
	goal:function(){return N(999)}, // 目标
	reward:function(num,comp=g.studyCompletions[9]){ // 奖励
		if (num===1) return [Infinity,0.09,0.06,0.03,0][comp]
		if (num===2) return c.d0_5.pow(N(comp/3).mul(studyRewardBoost(9,2)))
		if (num===3) return [c.d0,c.d1,N(1.9),N(2.6),c.d3][comp].mul(studyRewardBoost(9,3))
		functionError("studies[9].reward",arguments)
	},
	reward_desc:function(){return [ // 奖励描述
		(unlocked("反物质")||unlocked("矩阵"))?("反物质获取减少到log<sup>["+studyRewardHTML(9,1,x=>(x===Infinity)?"无穷大":N(x).noLeadFormat(3))+"]</sup>(获取)"):"? ? ?（完成后显示）",
		"银河惩罚3减弱"+studyRewardHTML(9,2,x=>c.d1.sub(x).mul(c.e2).noLeadFormat(3))+"%",
		"所有空间协同研究"+studyRewardHTML(9,3,2)+"%更有效"
	]},
	experientiaEffect:function(x=g.study9.xp,pow=studyPower(9)){ // 经验效果
		let base = N((15-pow)/30)
		let exp = x.gt(c.d0)?x.div([c.e2,c.d125,c.d250,c.e3][pow]).add(c.d1).recip():c.d1.sub(x.div(c.e2))
		if ((g.activeStudy===10)&&(studyPower(10)===2)) {exp = exp.mul(0.963)}
		return base.pow(exp)
	},
	timeLeft:function(){return 9-g.timeThisWormholeReset}, // 剩余时间
	deltaXP:function(x=g.darkstars,comp=studyPower(9)){ // 经验变化
		let out = x.sub(g.study9.xp.div(c.d10).add([111,116,131,156][comp]+g.study9.resets))
		if (out.sign===-1) out = out.mul(c.d10)
		return out.floor()
	},
	formatChange:function(x=this.deltaXP()){return ["","±","+"][this.deltaXP().sign+1]+this.deltaXP().format()}, // 格式化变化
	reset:function(){ // 重置
		notify("研究IX已重置！"+this.formatChange()+"经验","var(--exp)","#000000")
		let xp = g.study9.xp.add(this.deltaXP())
		let fracxp = g.study9.fracxp
		let resets = g.study9.resets+1
		let ontological = g.study10Options
		if ((g.activeStudy===0)||Decimal.gt(stat.totalDarkAxis,stat.wormholeDarkAxisReq)) {wormholeReset()} else {enterStudy(g.activeStudy)} // Study X证明
		g.study9.xp = xp
		g.study9.fracxp = fracxp
		g.study9.resets = resets
		g.study10Options = ontological
	}
},
studies[10] = {
	name:"研究之研究", // Study of Studies
	// 由于有4个单独的研究，没有unlockReq属性
	description:function(){ // 描述
		let pow = studyPower(10)
		if (pow===0) {return [
			"应用研究I的效果，并且除了研究之外的虫洞子标签页无法打开。",
			"应用研究IV的效果，并且星尘获取额外提升到0.9次幂。",
			"应用研究VII的效果，并且幸运精华效果乘以0.9。"
		]} else if (pow===1) {return [
			"应用研究II的效果，并且星星折算效果2倍更强。",
			"应用研究V的效果，但所有研究对精通力量中的每位数字便宜0.005%（加法，最多50%；当前总计："+(numberOfDigits(g.masteryPower).gte(c.e4)?"50":numberOfDigits(g.masteryPower).div(c.d200).toFixed(3))+"%）。",
			"应用研究VIII的效果；大师限制提升到"+(showFormulas?formulaFormat("log(log(t + 1) + 1) + log(log(t + 1) + 1)<sup>2</sup>"):Decimal.add(g.truetimeThisWormholeReset.add1Log(c.d10).add1Log(c.d10),g.truetimeThisWormholeReset.add1Log(c.d10).add1Log(c.d10).pow(c.d2)).noLeadFormat(4))+"次幂（基于当前虫洞中的时间）。"
		]} else if (pow===2) {return [
			"应用研究III的效果，但第5行和第6行能量研究无效。",
			"应用研究VI的效果，但其最大惩罚减少到936倍。",
			"应用研究IX的效果，但经验效果提升到0.963次幂"
		]} else {return ["选择任意三个先前的研究，将同时应用这些研究的所有效果。<br>不像之前的三个组合那样施加额外条件。"]}
	},
	disclaimers:[ // 免责声明
		["当被困在研究中时，其效果始终以4级应用，即使你还没有3次完成。",()=>{for (let i of [[1,4,7],[2,5,8],[3,6,9],countTo(9)][studyPower(10)]) {if (g.studyCompletions[i]<3) {return true}}; return false}],
		{get 0(){return (g.studyCompletions[10]===4)?"":("你正在重复一个已经完成的三重奏。购买研究"+researchOut(studies[10].researchList[g.studyCompletions[10]])+"以访问下一级别")},1:()=>((studyPower(10)<Math.min(g.studyCompletions[10],3))&&(g.studyCompletions[10]<4))}
	],
	researchList:["r26_5","r25_8","r26_11","r27_8"], // 研究列表
	get research(){return studies[10].researchList[studyPower(10)]}, // 所需研究
	goal:function(comp=studyPower(10)){return [N(17444),N(8285),N(936),N(36000)][comp]}, // 目标
	rewardStep:function(x,comp=g.studyCompletions[10]){return (comp===4)?2:(comp>=x)?1:0}, // 奖励步骤
	reward:function(num,comp=g.studyCompletions[10]){ // 奖励
		let step = this.rewardStep(num,comp)
		if (num===1) return g.luckShards.add(c.d1).log10().mul([c.d0,N(1.25e-4),N(2e-4)][step]).add(c.d1)
		if (num===2) return (step===0)?c.d1:N(g.stars+g.galaxies*6).pow([c.d2,c.d3][step-1]).div([N(6250),N(4e5)][step-1]).max(c.d1).pow(studyRewardBoost(10,2))
		if (num===3) return [g.antimatter.add(c.e10).layerplus(-3),[c.d0,c.d0_3,c.d0_4][step],studyRewardBoost(10,3)].productDecimals()
		if (num===4) return [c.d1,N(1.12),N(1.21),N(1.28),c.d4div3][comp]
		functionError("studies[10].reward",arguments)
	},
	reward_desc:function(){return [ // 奖励描述
		"将U轴效果乘以"+studyRewardHTML(10,1,x=>x.formatFrom1(3))+"每个成就，基于幸运碎片（转换为"+studies[10].reward(1).pow(totalAchievements).noLeadFormat(3)+"倍U轴效果）",
		"反T轴效果增强"+studyRewardHTML(10,2,x=>x.sub(c.d1).mul(c.e2).noLeadFormat(3))+"%（基于星星和银河）",
		"Tick速度到能量转换指数增加"+studyRewardHTML(10,3,3)+"，基于反物质（转换为"+stat.tickspeed.pow(studies[10].reward(3)).noLeadFormat(2)+"倍更快的能量获取）",
		"每个其他研究的第二个奖励"+studyRewardHTML(10,4,x=>x.sub(c.d1).mul(c.e2).noLeadFormat(3))+"%更有效"
	]},
	rewardFormulas:{ // 奖励公式
		1:function(comp=g.studyCompletions[10]){return "log(S + 1) × "+["0","0.000125","0.0002"][studies[10].rewardStep(1,comp)]+" + 1"},
		2:function(comp=g.studyCompletions[10]){let step = studies[10].rewardStep(2,comp);return (step===0)?"0":("max((★ + G × 6)"+formulaFormat.exp(((step===2)?c.d3:c.d2).mul(studyRewardBoost(10,2)))+formulaFormat.mult(c.e2.div([N(6250),N(4e5)][step-1].pow(studyRewardBoost(10,2))))+" - 100, 0)")},
		3:function(comp=g.studyCompletions[10]){return "log<sup>[3]</sup>(AM + "+c.e10.format()+") "+formulaFormat.mult([c.d0,c.d0_3,c.d0_4][studies[10].rewardStep(3,comp)].mul(studyRewardBoost(10,3)))}
	},
},
studies[11] = {
	name:"月钟", // Lunar Clock
	unlockReq:function(){return [N(1e5),N(112345),N(126196),N(141421)][studyPower(11)]}, // 解锁需求
	active:function(){ // 当前活跃轴
		let num = Math.floor(g.timeThisWormholeReset/0.75)%12
		return (num<8)?axisCodes[num]:["R","Q","P","O"][num-8]
	},
	lunarMinutes:function(){return Math.floor((g.timeThisWormholeReset*80)%60)}, // 月钟分钟
	description:function(){return ["每次只有一个类型的轴活跃，从X开始，每750毫秒变化一次。","第1行精通、第1行星星和星尘增强1和4被禁用，暗物质的基础获取上限为1。"]}, // 描述
	research:"r33_3", // 所需研究
	goal:function(comp=studyPower(11)){return [N(11800),N(12617),N(13579),N(14142)][comp]}, // 目标
	reward:function(num,comp=g.studyCompletions[11]){ // 奖励
		if (num===1) return [c.d256,N(270),N(282),N(292),c.d300][comp]
		if (num===2) return [c.d1,c.d2,N(3.5),N(5.5),c.d8][comp].pow(studyRewardBoost(11,2))
		if (num===3) return [c.d0,c.d2,N(3.2),c.d4,N(4.8)][comp].mul(studyRewardBoost(11,3))
		functionError("studies[11].reward",arguments)
	},
	reward_desc:function(){return [ // 奖励描述
		"普通轴成本超折算从"+studyRewardHTML(11,1,0)+"开始",
		"幸运碎片对其第二个效果的有效数量提升到"+studyRewardHTML(11,2,4)+"次幂",
		"反轴成本超折算从"+studyRewardHTML(11,3,3)+"开始（通常为64）"
	]}
}
studies[12] = {
	name:"铁意志", // Titanium Will
	unlockReq:function(){return [147,152,157,162][studyPower(12)]}, // 解锁需求
	description:function(){return ["非永久性研究无效。","星尘重置被禁用。","所有暗轴成本除数被禁用。","暗物质获取上限为1，但在暗物质标签页中获得钛强化，将这个上限削弱为软上限。"]}, // 描述
	research:"r33_13", // 所需研究
	goal:function(comp=studyPower(12)){return [c.d40,c.d50,c.e2,c.d150][comp]}, // 目标
	sc:function(x=calcStatUpTo("darkmatterPerSec","Fortitude"),p=g.study12.fortitude){ // 软上限计算
		return p.eq(c.d0)?x.min(c.d1):Decimal.logarithmicSoftcap(x,c.d1,p.recip())
	},
	empowerment:{ // 强化
		base:function(){ // 基础
			let out = study13.rewards.forge.eff().b
			return out
		},
		scale:function(){ // 折算
			let out = study13.rewards.forge.eff().s
			return out
		},
		req:function(x=g.study12.empowerments){return [this.base(),this.scale(),x].decimalPowerTower()}, // 需求
		affordable:function(x=g.exoticmatter){return x.lt(this.base())?g.study12.empowerments:x.log(this.base()).log(this.scale()).floor().add(c.d1)}, // 可购买
		gain:function(){g.study12.empowerments = this.affordable()} // 获取
	},
	fortitude:{ // 坚韧
		max:function(x=g.study12.empowerments){ // 最大
			let out = x
			if ((!StudyE(12))&&study13.bound(275)) {out = out.mul(study13.bindingEff(275))}
			return out
		},
		gain:function(x=g.study12.empowerments){ // 获取
			let out = [x,c.em4,stat.tickspeed].productDecimals()
			if ((!StudyE(12))&&study13.bound(275)) {out = out.mul(study13.bindingEff(275))}
			return out
		},
		lim:function(x,max=this.max()){ // 限制
			if (max.eq(c.d0)) {return c.d0}
			return Decimal.pow(max.add(c.d1),Decimal.sub(c.d1,Decimal.log(x.add(c.d1),max.add(c.d1)).add(c.d1).recip())).sub(c.d1)
		},
		invlim:function(x,max=this.max()){ // 反限制
			if (x.gte(max)) {return c.maxvalue}
			return Decimal.pow(max.add(c.d1),Decimal.sub(c.d1,Decimal.log(x.add(c.d1),max.add(c.d1))).recip().sub(c.d1)).sub(c.d1)
		}
	},
	reward:function(num,comp=g.studyCompletions[12]){ // 奖励
		if (num===1) return comp/400
		if (num===2) return [c.d0,c.d16,c.d24,c.d28,c.d32][comp].mul(studyRewardBoost(12,2))
		if (num===3) return [c.d0,N(0.09),N(0.17),c.d0_24,c.d0_3][comp].mul(studyRewardBoost(12,3))
		functionError("studies[12].reward",arguments)
	},
	reward_desc:function(){return [ // 奖励描述
		achievement.label(502,4)+"的奖励增加"+studyRewardHTML(12,1,x=>N(x*100).noLeadFormat(2))+"个百分点"+((studies[12].reward(1)===0.01)?"":"s"),
		achievement.label(527)+"现在可以被黄色流明增强（效果上限在"+studyRewardHTML(12,2,x=>x.add(c.d4).noLeadFormat(3))+"）",
		achievement.label(betaActive?525:526)+"奖励增强"+studyRewardHTML(12,3,x=>x.mul(c.e2).noLeadFormat(3))+"%并且以"+studyRewardHTML(12,3,x=>x.mul(c.e2).noLeadFormat(3))+"%效果影响反S轴"
	]}
}
studies[13] = { // 我们只为ach604存储'research'和为stat.wormholeDarkAxisReq存储'goal'，其他一切都在study13.js中
	research:"r44_8", // 所需研究
	goal:function(){return achievement.perAchievementReward[9].currentVal} // 目标
}
const fullStudyNames = [null,...countTo(12).map(x=>(x===10)?studies[x].name:("研究"+roman(x)+" \""+studies[x].name+"\""))] // 完整研究名称

const lightNames = ["red","green","blue","cyan","magenta","yellow","white","black","gray"] // 颜色名称

const luckRunes = { // 幸运符文
	unifolium:{baseCost:c.inf,scale:c.inf,upgBaseCost:c.d1,upgScale:c.d1_1}, // 单叶
	duofolium:{baseCost:N(1e100),scale:c.e5,upgBaseCost:c.d2,upgScale:N(2**(1/3))}, // 双叶
	trifolium:{baseCost:c.e4,scale:c.d1_01,upgBaseCost:c.d10,upgScale:c.d1_25}, // 三叶
	quatrefolium:{baseCost:c.e6,scale:c.d1_1,upgBaseCost:c.d4,upgScale:c.d1_5}, // 四叶
	cinquefolium:{baseCost:c.e14,scale:c.d3,upgBaseCost:c.d1,upgScale:c.d2} // 五叶
}
const luckRuneTypes = Object.keys(luckRunes) // 幸运符文类型
// 幸运升级使用几何折算作为成本公式，但向下取整 - 计算四舍五入不再重要的升级数量阈值
for (let i of luckRuneTypes) luckRunes[i].noRoundThreshold = c.e16.div(luckRunes[i].upgBaseCost).log(luckRunes[i].upgScale).ceil()
const luckUpgrades = { // 幸运升级
	unifolium:{
		cascade:{ // 级联
			name:"级联",
			desc:"每个（有效）幸运升级等级为下方的两个升级添加{}个等级",
			eff:function(x=stat.luckUpgLevel_unifolium_cascade){ // 效果
				let out = x.add1Log(c.d2).div(c.e2)
				if (out.gt(c.d0_5)) {out = out.mul(2e10).log10().log10().div(c.d2)}
				return out
			},
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:function(){ // 公式
				let out = "log<sub>2</sub>(λ + 1) ÷ 100"
				if (this.eff().gt(c.d0_5)) {out = "log<sup>[2]</sup>("+out+" × "+BEformat(2e10)+") ÷ 2"}
				return out
			},
			cascade:[] // 级联
		}
	},
	duofolium:{
		space:{ // 空间
			name:"所有物质",
			desc:"所有轴成本提升到{}次幂",
			eff:(x=stat.luckUpgLevel_duofolium_space)=>x.div(c.e2).add(c.d1).pow(c.dm0_5), // 效果
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:()=>"(1 + λ × 0.01)<sup>-0.5</sup>", // 公式
			cascade:["cascade"] // 级联
		},
		star:{ // 星星
			name:"所有银河",
			desc:"银河惩罚3提升到{}次幂",
			eff:(x=stat.luckUpgLevel_duofolium_star)=>N(0.94).pow(x), // 效果
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:()=>"0.94<sup>λ</sup>", // 公式
			cascade:["cascade"] // 级联
		}
	},
	trifolium:{
		normalAxis:{ // 普通轴
			name:"奇异物质",
			desc:"普通轴成本提升到{}次幂",
			eff:(x=stat.luckUpgLevel_trifolium_normalAxis)=>c.d99.div(c.d99.add(x)), // 效果
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:()=>"99 ÷ (99 + λ)", // 公式
			cascade:["space"] // 级联
		},
		darkAxis:{ // 暗轴
			name:"暗物质",
			desc:"暗轴成本提升到{}次幂",
			eff:(x=stat.luckUpgLevel_trifolium_darkAxis)=>c.d99.div(c.d99.add(x)), // 效果
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:()=>"99 ÷ (99 + λ)", // 公式
			cascade:["space","star"] // 级联
		},
		antiAxis:{ // 反轴
			name:"反物质",
			desc:"反轴成本提升到{}次幂",
			eff:(x=stat.luckUpgLevel_trifolium_antiAxis)=>c.d99.div(c.d99.add(x).sub(x.div(c.d10).add(c.d1).ln().mul(c.d10))), // 效果
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:()=>"<span style=\"font-size:80%;\">99 ÷ (99 + λ - 10 × ln(1 + λ ÷ 10))</span>", // 公式
			cascade:["star"], // 级联
			unlocked:function(){return g.research.r26_3} // 解锁条件
		}
	},
	quatrefolium:{
		star:{ // 星星
			name:"星星",
			desc:"星星成本提升到{}次幂",
			base:function(){ // 基础
				let out = c.d0_95
				return out
			},
			eff:function(x=stat.luckUpgLevel_quatrefolium_star){return this.base().pow(x)}, // 效果
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:function(){return this.base().noLeadFormat(3)+"<sup>λ</sup>"}, // 公式
			cascade:["normalAxis"] // 级联
		},
		darkstar:{ // 暗星
			name:"暗星",
			desc:"暗星成本除以{}",
			eff:(x=stat.luckUpgLevel_quatrefolium_darkstar)=>x.gt(c.d20)?x.add(c.d5).pow(c.d0_5).sub(c.d5).div(c.d4).exp().mul(c.d2):x.div(c.d20).add(c.d1), // 效果
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:()=>stat.luckUpgLevel_quatrefolium_darkstar.gte(c.d20)?"e<sup>(λ + 5)<sup>0.5</sup> - 5) ÷ 4</sup> × 2":"1 + λ ÷ 20", // 公式
			cascade:["normalAxis","darkAxis"] // 级联
		},
		synergism:{ // 协同
			name:"协同作用",
			desc:"空间协同研究有效性增加{}%",
			eff:(x=stat.luckUpgLevel_quatrefolium_synergism)=>x.gt(c.d50)?x.div(c.d10).sub(c.d4).ln().div(c.d20).add(c.d1_25):x.div(c.d200).add(c.d1), // 效果
			format:(x=this.eff())=>x.sub(c.d1).mul(c.e2).noLeadFormat(3), // 格式化
			formula:()=>stat.luckUpgLevel_quatrefolium_synergism.gte(c.d50)?"25 + ln(λ ÷ 10 - 4) × 5":"λ ÷ 2", // 公式
			cascade:["darkAxis","antiAxis"] // 级联
		},
		prismatic:{ // 棱柱
			name:"四面体",
			get desc(){return "将"+prismaticUpgradeName("prismaticSpeed")+"的基础增加{}"}, // 描述
			power:function(){ // 威力
				let out = c.d32_5
				if (g.achievement[819]) out = out.mul(c.d2)
				return out
			},
			eff:function(x=stat.luckUpgLevel_quatrefolium_prismatic){return x.add(c.d1).mul(c.e10).layerplus(-3).pow(c.d2).mul(this.power())}, // 效果
			format:(x=this.eff())=>x.noLeadFormat(4), // 格式化
			formula:function(){return "<span style=\"font-size:90%;\">"+this.power().noLeadFormat(3)+" × log<sup>[3]</sup>((λ + 1) × "+c.e10.format()+")<sup>2</sup></span>"}, // 公式
			cascade:["antiAxis"], // 级联
			unlocked:function(){return g.research.r26_3} // 解锁条件
		}
	},
	cinquefolium:{
		observation:{ // 观察
			name:"科学",
			desc:"观察成本提升到{}次幂",
			eff:(x=stat.luckUpgLevel_cinquefolium_observation)=>c.d400.div(x.gt(c.e2)?x.div(c.d25).sub(c.d3).ln().mul(c.d25).add(c.d500):x.add(c.d400)), // 效果
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:()=>"400 ÷ ("+(stat.luckUpgLevel_cinquefolium_observation.gte(c.e2)?"25 × ln(λ ÷ 25 - 3) + 500":"λ + 400")+")", // 公式
			cascade:["star"] // 级联
		},
		chroma:{ // 色度
			name:"色度",
			desc:"色度获取乘以{}（基于总流明）",
			eff:(x=stat.luckUpgLevel_cinquefolium_chroma)=>g.lumens.map(i=>i.add(c.d7).log(c.d7).pow(x.max(c.d1).ln().add(c.d1))).sumDecimals().mul(x.min(c.d1)).div(c.d7).pow10(), // 效果
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:()=>"<span style=\"font-size:60%;\">10<sup>Σ<span class=\"xscript\"><sup>9</sup><sub>1</sub></span>(log<sub>7</sub>(L<sub>n</sub> + 7)<sup>ln(max(λ, 1)) + 1</sup>) × min(λ, 1) ÷ 7</sup></span>", // 公式
			cascade:["star","darkstar"] // 级联
		},
		axis:{ // 轴
			name:"空间",
			desc:"获得与<i>[购买数量]<sup>0.5</sup></i> × {}相等的免费普通轴和暗轴（前七种类型）",
			eff:(x=stat.luckUpgLevel_cinquefolium_axis)=>x.gt(c.d20)?x.sub(c.d10).log10().pow(c.d1_15).mul(c.d10):x.div(c.d2), // 效果
			format:(x=this.eff())=>x.noLeadFormat(3), // 格式化
			formula:()=>stat.luckUpgLevel_cinquefolium_axis.gte(c.d20)?"10 × log(λ - 10)<sup>1.15</sup>":"λ ÷ 2", // 公式
			cascade:["darkstar","synergism"] // 级联
		},
		radiation:{ // 辐射
			name:"辐射",
			desc:"霍金辐射获取乘以{}",
			eff:(x=stat.luckUpgLevel_cinquefolium_radiation)=>c.d1_5.pow(x).sub(c.d1).mul(c.d20).pow10(), // 效果
			format:(x=this.eff())=>x.noLeadFormat(2), // 格式化
			formula:()=>"10<sup>20 × (1.5<sup>λ</sup> - 1)</sup>", // 公式
			cascade:["synergism","prismatic"] // 级联
		},
		luck:{ // 幸运
			name:"二次",
			desc:"幸运碎片获取提升到{}次幂",
			eff:(x=stat.luckUpgLevel_cinquefolium_luck)=>x.pow(x.add(c.d8).log10()).div(c.e2).add(c.d1), // 效果
			format:(x=this.eff())=>x.noLeadFormat(4), // 格式化
			formula:()=>"1 + λ<sup>log(λ + 8)</sup> ÷ 100", // 公式
			cascade:["prismatic"], // 级联
			unlocked:function(){return g.research.r26_3} // 解锁条件
		}
	}
}
const luckUpgradeList = Object.fromEntries(luckRuneTypes.map(x=>[x,Object.keys(luckUpgrades[x])])) // 幸运升级列表

/*
- 名称、描述、效果、格式和公式对所有棱柱升级都是通用的
- 每个升级也是以下之一：
	- 无限：可以无限购买，具有几何成本折算，针对批量购买进行了优化。属性：baseCost, scale
	- 有限：有有限的最大等级和独特的成本公式：批量购买时，成本逐个求和。属性：cost, max
- 具有不利影响的升级也有'refundable'属性设置为true
*/
const prismaticUpgrades = { // 棱柱升级
	prismaticSpeed:{
		name:"棱柱放大器",
		desc:"棱柱获取乘以{x}",
		base:function(){ // 基础
			let out = c.d1_5.add(luckUpgrades.quatrefolium.prismatic.eff())
			if (g.research.r22_6) out = out.add(researchEffect(22,6))
			if (g.research.r22_10) out = out.add(researchEffect(22,10))
			return out
		},
		softcap:function(){return c.e2}, // 软上限
		eff:function(x=g.prismaticUpgrades.prismaticSpeed){ // 效果
			let ss = prismaticUpgrades.prismaticSpeed.softcap()
			return prismaticUpgrades.prismaticSpeed.base().pow(Decimal.div(x,x.max(ss).log(ss)))
		},
		format:{x:(x=prismaticUpgrades.prismaticSpeed.eff())=>x.noLeadFormat(2)}, // 格式化
		formula:{x:function(){ // 公式
			let ss = prismaticUpgrades.prismaticSpeed.softcap()
			return prismaticUpgrades.prismaticSpeed.base().noLeadFormat(4)+"<sup>"+(g.prismaticUpgrades.prismaticSpeed.gte(c.e2)?"λ ÷ log<sub>"+ss.format()+"</sub>(λ)":"λ")+"</sup>"
		}},
		variables:"x", // 变量
		baseCost:c.e2, // 基础成本
		scale:c.d2 // 折算
	},
	chromaSpeed:{
		name:"色度放大器",
		desc:"色度获取乘以 {x}",
		eff:(x=g.prismaticUpgrades.chromaSpeed)=>Decimal.sub(x.add(c.d99).log10(),N(66).div(N(98).add(x))).pow(x),
		format:{x:(x=prismaticUpgrades.chromaSpeed.eff())=>x.noLeadFormat(2)},
		formula:{x:()=>"(log(λ + 99) - 66 ÷ (λ + 98))<sup>λ</sup>"},
		variables:"x",
		baseCost:c.e2,
		scale:c.d2
	},
	chromaOverdrive:{
		name:"色度过载",
		desc:"色度获取乘以 {x}，但色度生成贵 {y} 倍。{t}",
		eff:{
			x:(x=g.prismaticUpgrades.chromaOverdrive)=>c.d8.pow(x),
			y:(x=g.prismaticUpgrades.chromaOverdrive)=>study13.rewards.nitro.eff().pow(x)
		},
		format:{
			x:(x=prismaticUpgrades.chromaOverdrive.eff.x())=>x.format(),
			y:(x=prismaticUpgrades.chromaOverdrive.eff.y())=>x.noLeadFormat(2),
			t:()=>(g.achievement[815]&&g.ach815RewardActive)?"":" 拥有此升级至少1级会使红、绿和蓝色色度消耗灰色色度。"
		},
		formula:{
			x:()=>"8<sup>λ</sup>",
			y:()=>(study13.rewardLevels.nitro===18)?"2<sup>λ ÷ 9</sup>":(study13.rewardLevels.nitro===0)?"2<sup>λ ÷ 3</sup>":(study13.rewards.nitro.eff().noLeadFormat(2)+"<sup>λ</sup>")
		},
		variables:"xyt",
		baseCost:c.e5,
		scale:c.d8,
		refundable:true,
		loseLevelGlow:function(){return stat.chromaCostMultiplier.gt(c.d1)}
	},
	lumenThresholdReduction1:{
		name:"光照会 I",
		desc:"灰色流明阈值增加减少至 {x}×",
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>x.eq(c.e5)?c.d10:x.eq(c.d0)?c.e10:x.gt(c.d10)?c.d40.sub(x.log10().add(c.d1).pow(c.d2)).div(c.d4).pow10():x.gt(c.d2)?c.e10.div(x):c.e10.sub(x.mul(c.d2_5e9)),
		format:{x:(x=prismaticUpgrades.lumenThresholdReduction1.eff())=>x.noLeadFormat(3)},
		formula:{x:()=>g.prismaticUpgrades.lumenThresholdReduction1.gte(c.d10)?"10<sup>(40 - (log(λ) + 1)<sup>2</sup>) ÷ 4</sup>":(BEformat(3e10)+" ÷ max(3 × λ, 3 + λ)")},
		variables:"x",
		cost:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>(x.gt(c.d10)?x.div(c.d20).add(c.d1):c.d1_5).pow(x.gt(c.e4)?x.dilate(c.d2_5).div(c.e24):x.gt(c.e3)?x.pow(c.d4).div(c.e8):x.gt(c.e2)?x.pow(c.d2).div(c.e2):x).mul(c.e12),
		costFormula:(x=g.prismaticUpgrades.lumenThresholdReduction1)=>(x.gte(c.d10)?"(1 + λ ÷ 20)":"1.5")+"<sup>"+(x.gte(c.e4)?("10<sup>log(λ)<sup>2.5</sup></sup> ÷ 10<sup>24</sup>"):x.gte(c.e3)?"λ<sup>4</sup> ÷ 10<sup>8</sup>":x.gte(c.e2)?"λ<sup>2</sup> ÷ 100":"λ")+"</sup> × 10<sup>12</sup>",
		max:c.e5
	},
	lumenThresholdReduction2:{
		name:"光照会 II",
		desc:"黑白流明阈值增加减少至 {x}×",
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction2)=>x.eq(c.e2)?c.d5:x.eq(c.d0)?c.d10:c.d10.sub(x.div(c.d20)),
		format:{x:(x=prismaticUpgrades.lumenThresholdReduction2.eff())=>x.noLeadFormat(3)},
		formula:{x:()=>"10 - λ ÷ 20"},
		variables:"x",
		cost:function(x=g.prismaticUpgrades.lumenThresholdReduction2){
			let base = x.gte(c.d20)?x:c.d12
			let exp = x
			if (x.gte(c.d40)) exp = exp.mul(exp.div(c.e2).add(c.d1).pow(x.div(c.d20).sub(c.d1).floor()))
			return base.pow(exp).mul(c.e9)
		},
		costFormula:(x=g.prismaticUpgrades.lumenThresholdReduction2)=>(x.gte(c.d20)?"λ":"12")+"<sup>"+(x.gte(c.d40)?("λ × (1 + λ ÷ 100)"+formulaFormat.exp(x.div(c.d20).sub(c.d1).floor())):"λ")+"</sup> × 10<sup>9</sup>",
		max:c.e2
	},
	lumenThresholdReduction3:{
		name:"光照会 III",
		desc:"前六种流明的阈值增加减少 {x}% <div class=\"information\" style=\"border-color:#000000;color:#000000;\" onMousedown=\"prismaticUpgrades.lumenThresholdReduction3.info()\">?</div>",
		eff:(x=g.prismaticUpgrades.lumenThresholdReduction3)=>x.gt(c.e10)?c.d0_1.div(x.quad_slog(c.d10).log(c.d2).pow(c.d2)):x.gt(c.e2)?x.log10().recip():x.gt(c.d25)?c.d250.sub(x).div(c.d300):c.d1.sub(x.div(c.e2)),
		format:{x:(x=prismaticUpgrades.lumenThresholdReduction3.eff())=>c.d1.sub(x).mul(c.e2)[x.lt(c.d0_1)?"format":"noLeadFormat"](Math.floor(3-Math.log10(x.toNumber())))},
		formula:{x:(x=g.prismaticUpgrades.lumenThresholdReduction3)=>x.gte(c.e10)?"100 - 10 ÷ log<sub>2</sub>(slog(λ))<sup>2</sup>":x.gte(c.e2)?"100 × (1 - 1 ÷ log(λ))":x.gte(c.d25)?"(λ + 50) ÷ 3":"λ"},
		variables:"x",
		baseCost:c.e6,
		scale:c.e2,
		info:function(){
			let out = "每个流明的初始倍率与1之间的差值线性减少所述百分比。<br>在当前值 "+this.format.x()+"% 下，这意味着：<br><br><table><tr><th style=\"width:15vw;\" class=\"tablecell\">颜色</th><th style=\"width:20vw;\" class=\"tablecell\">初始值</th><th style=\"width:20vw;\" class=\"tablecell\">调整后值</th></tr>"
			for (let i=0;i<6;i++) {out += "<tr><td style=\"width:15vw;\" class=\"tablecell\">"+capitalize(lightNames[i])+"</td><td style=\"width:20vw;\" class=\"tablecell\">"+lightData[i].baseScale.noLeadFormat(4)+"×</td><td style=\"width:20vw;\" class=\"tablecell\">"+lightData[i].baseScale.sub(c.d1).mul(this.eff()).add(c.d1).formatFrom1(4)+"×</td></tr>"}
			popup({text:out+"</table>"})
		}
	},
	prismRune:{
		name:"棱镜符文",
		desc:"幸运碎片获取乘以 {x}，其第一项效果强 {y}%",
		eff1Exp:function(){
			let out = c.d7
			if (g.research.r26_1) out = out.mul(researchEffect(26,1))
			return out
		},
		eff:{
			x:(x=g.prismaticUpgrades.prismRune)=>x.div(c.d7).add(c.d1).pow(prismaticUpgrades.prismRune.eff1Exp()),
			y:(x=g.prismaticUpgrades.prismRune)=>x.gt(142)?x.mul(c.d0_66744718112597245).sub(c.d46_34959730371034).log(c.d7):x.mul(c.d7em3).add(c.d1)
		},
		format:{
			x:(x=prismaticUpgrades.prismRune.eff.x())=>x.noLeadFormat(2),
			y:(x=prismaticUpgrades.prismRune.eff.y())=>x.sub(c.d1).mul(c.e2).noLeadFormat(4)
		},
		formula:{
			x:()=>"(1 + λ ÷ 7)"+formulaFormat.exp(prismaticUpgrades.prismRune.eff1Exp(),false,4),
			y:()=>g.prismaticUpgrades.prismRune.gt(142)?"<span style=\"font-size:80%;\">100 × log<sub>7</sub>(0.0953496 × λ - 6.621371)</span>":"0.7 × λ"
		},
		variables:"xy",
		baseCost:N(7.77e19),
		scale:c.d7,
		unlockReq:function(){return g.research.r21_7}
	},
	prismLab:{
		name:"棱镜实验室",
		desc:"你可以购买最多 {x} 个棱镜研究",
		eff:(x=g.prismaticUpgrades.prismLab)=>x.mag+1,
		format:{x:(x=prismaticUpgrades.prismLab.eff())=>x.toString()},
		formula:{x:()=>"λ + 1"},
		variables:"x",
		cost:function(x=g.prismaticUpgrades.prismLab){return Decimal.fromComponents(1,1,Math.floor(88.8 * 10**(x/7))+0.948412965778601)},
		costFormula:()=>"8.88 × 10<sup>⌊88.8 × 10<sup>λ ÷ 7</sup>⌋</sup>",
		max:c.d8,
		unlockReq:function(){return g.research.r21_8}
	},
	prismCondenser:{
		name:"棱镜冷凝器",
		desc:"获得 {x} 个免费的反轴，前 {y} 种类型 {f}<br><span class=\"small\">(冷凝器功率：{p}%)",
		eff:{
			x:(x=g.prismaticUpgrades.prismCondenser)=>Decimal.linearSoftcap(x,c.d99,c.d8,true),
			y:()=>Math.floor(stat.condenserPower),
			p:()=>stat.condenserPower*100
		},
		format:{
			x:(x=prismaticUpgrades.prismCondenser.eff.x())=>x.noLeadFormat(4),
			y:(x=prismaticUpgrades.prismCondenser.eff.y())=>numword(x),
			f:()=>(stat.condenserPower%1===0)?"":("以及此数量的 "+N((stat.condenserPower%1)*100).noLeadFormat(4)+"% 作为反"+axisCodes[Math.floor(stat.condenserPower)]+"轴"),
			p:(x=prismaticUpgrades.prismCondenser.eff.p())=>N(x).noLeadFormat(4)
		},
		formula:{x:()=>g.prismaticUpgrades.prismCondenser.gte(c.d99)?"(λ ÷ 11 - 8)<sup>1 ÷ 9</sup> × 99":"λ"},
		variables:"xyfp",
		cost:function(x=g.prismaticUpgrades.prismCondenser){return [N(9.99e25),N(999).pow(x),[c.d9,x,x.max(c.e2).log10()].decimalPowerTower()].productDecimals()},
		costFormula:()=>BEformat(9.99e25)+" × 999<sup>λ</sup> × 9<sup>λ<sup>"+(g.prismaticUpgrades.prismCondenser.gte(c.e2)?"log(λ)":"2")+"</sup></sup>",
		max:N(999),
		unlockReq:function(){return g.research.r21_9}
	},
	prismLab2:{
		name:"实验室放大器",
		desc:"棱镜研究效果更强<br><table>"+countTo(3).map(x=>"<tr><td style=\"width:60px;text-align:left\">行 "+(x+21)+"：</td><td style=\"width:120px;text-align:right\">{"+String.fromCharCode(119+x)+"}%</td></tr>").join("")+"</table>",
		eff:{
			x:(x=g.prismaticUpgrades.prismLab2)=>x.div(c.e2).add(c.d1),
			y:(x=g.prismaticUpgrades.prismLab2)=>x.div(c.d150).add(c.d1),
			z:(x=g.prismaticUpgrades.prismLab2)=>x.div(c.d225).add(c.d1)
		},
		format:{
			x:(x=prismaticUpgrades.prismLab2.eff.x())=>x.sub(c.d1).mul(c.e2).noLeadFormat(3),
			y:(x=prismaticUpgrades.prismLab2.eff.y())=>x.sub(c.d1).mul(c.e2).noLeadFormat(3),
			z:(x=prismaticUpgrades.prismLab2.eff.z())=>x.sub(c.d1).mul(c.e2).noLeadFormat(3)
		},
		formula:{
			x:()=>"λ",
			y:()=>"λ ÷ 1.5",
			z:()=>"λ ÷ 2.25"
		},
		variables:"xyz",
		cost:(x=g.prismaticUpgrades.prismLab2)=>c.d1_004.pow(x).mul(c.d225).pow10(),
		costFormula:()=>"10<sup>225 × 1.004<sup>λ</sup></sup>",
		max:N(900),
		unlockReq:function(){return g.studyCompletions[13]>23}
	},
	masterSpark:{
		name:"极限火花",
		desc:"你可以同时激活第11行的两个精通，但它们弱 {x}%",
		eff:(x=g.prismaticUpgrades.masterSpark)=>x.eq(c.d0)?c.d1:x.div(c.e2),
		format:{x:(x=prismaticUpgrades.masterSpark.eff())=>c.d1.sub(x).mul(c.e2).format()},
		formula:{x:()=>"(100 - λ) mod 100"},
		variables:"x",
		cost:function(x=g.prismaticUpgrades.masterSpark){return [x.add(c.d1).div(c.d50),x.sub(c.d49).max(c.d0).pow(c.d2).div(1250)].sumDecimals().pow10().pow10()},
		costFormula:()=>"Ξ<sup>[2]</sup>(λ ÷ 50 + max(λ - 49, 0)<sup>2</sup> ÷ 1,250)",
		max:c.e2,
		refundable:true,
		loseLevelGlow:function(){return g.prismaticUpgrades.masterSpark.mod(c.d100).neq(c.d0)},
		unlockReq:function(){return g.studyCompletions[13]>23}
	},
/*	mailbreaker:{
		name:"融化束缚的多彩之星",
		desc:"研究 XIII 束缚 377 弱 {x}%",
		eff:(x=g.prismaticUpgrades.mailbreaker)=>[c.d1,N(0.5),N(0.84),N(0.81),N(0.8)][x.toNumber()],
		format:{x:(x=prismaticUpgrades.mailbreaker.eff())=>c.d1.sub(x).mul(c.e2).format()},
		formula:{x:()=>"λ × (9 - λ) ÷ 2"},
		variables:"x",
		cost:(x=g.prismaticUpgrades.mailbreaker)=>Decimal.FC_NN(1,1,10*Math.floor(2000 * 3**(x-3))),
		costFormula:()=>"10<sup>10 × ⌊2,000 × 3<sup>λ - 3</sup>⌋</sup>",
		max:c.d4,
		unlockReq:function(){return g.achievement[918]}
	}, */
}
const prismaticUpgradeList = Object.keys(prismaticUpgrades)
const nonRefundablePrismaticUpgrades = prismaticUpgradeList.filter(upg=>!prismaticUpgrades[upg].refundable)
const refundablePrismaticUpgrades = prismaticUpgradeList.filter(upg=>prismaticUpgrades[upg].refundable)
function prismaticUpgradeName(upg) {return "棱镜升级 "+((prismaticUpgrades[upg].refundable)?("R"+(refundablePrismaticUpgrades.indexOf(upg)+1)):(nonRefundablePrismaticUpgrades.indexOf(upg)+1))+" \""+prismaticUpgrades[upg].name+"\""}
for (let upg of prismaticUpgradeList) prismaticUpgrades[upg].variables = prismaticUpgrades[upg].variables.split("")

const wormholeUpgrades = {
	1:{
		name:"更多升级 α",
		text:function(){return "霍金辐射增加 {}×（基于虫洞升级）"},
		cost:Decimal.FC_NN(1,1,3000),
		eff:function(){return Decimal.FC_NN(1,1,[20,25,32,40,50,64,80,100,125][countTo(9).map(x=>g.wormholeUpgrades[x]).sum()-g.wormholeUpgrades[1]]*(x=>Math.max(x/20+1,x/10,x/5-4))([10,11,12].map(x=>g.wormholeUpgrades[x]).sum()))},
		format:x=>x.format(),
		formula:()=>"10<sup>dB(U<sub>NR</sub> + 12) × max("+countTo(3).map(x=>"U<sub>R</sub>"+formulaFormat.mult(N(2**x/40))+formulaFormat.add(N(2**(x-1)*(2-x)))).join(", ")+")"
	},
	2:{
		name:"更多升级 β",
		text:function(){return "霍金辐射增加 ^{}（基于虫洞升级）"},
		cost:Decimal.FC_NN(1,1,3300),
		eff:function(){return Decimal.FC_NN(1,0,1+Math.log10(1+((countTo(9).map(x=>g.wormholeUpgrades[x]).sum()-g.wormholeUpgrades[2])/2)+([10,11,12].map(x=>g.wormholeUpgrades[x]).sum())/12)/100)},
		format:x=>x.noLeadFormat(4),
		formula:()=>"1 + log(0.5 + U<sub>NR</sub> ÷ 2 + U<sub>R</sub> ÷ 12) ÷ 100"
	},
	3:{
		name:"更多星系 α",
		text:function(){return "星系加成2和4使用更好的公式"},
		cost:Decimal.FC_NN(1,1,22000)
	},
	4:{
		name:"更多虫洞 α",
		text:function(){return achievement.label(716)+"奖励计时器增加100×更快"},
		cost:Decimal.FC_NN(1,1,3600)
	},
	5:{
		name:"更多成就",
		text:function(){return "精通101效果软上限为 {} 而不是75（基于总成就数）"},
		cost:Decimal.FC_NN(1,1,4000),
		eff:function(){return Decimal.FC_NN(1,0,(totalAchievements>=200)?(totalAchievements/2):(75+totalAchievements**4/64e6))},
		format:x=>x.noLeadFormat(3),
		formula:()=>(totalAchievements>=200)?"A ÷ 2":("75 + A<sup>4</sup> ÷ "+BEformat(64e6))
	},
	6:{
		name:"更多研究",
		text:function(){return "反Y轴效果乘以 {}（基于总研究完成数）"},
		cost:Decimal.FC_NN(1,1,4500),
		eff:function(){return Decimal.FC_NN(1,0,1+g.studyCompletions.slice(1,13).sum()*0.002+g.studyCompletions[13]/1000)},
		format:x=>x.noLeadFormat(4),
		formula:()=>"1 + (Σ<span class=\"xscript\"><sup>12</sup><sub>1</sub></span>S<sub>n</sub>) × 0.002 + S<sub>13</sub> × 0.001"
	},
	7:{
		name:"更多虫洞 β",
		text:function(){return "灰色流明效果基础值增加 {}"+(this.eff().gte(c.d10)?"×":"%")+"（基于霍金辐射）"},
		cost:Decimal.FC_NN(1,1,5250),
		eff:function(){return g.hawkingradiation.add(c.d1).log10().div(c.e5).add(c.d1)},
		format:x=>(g.hawkingradiation.gt("e900000")?x.noLeadFormat(4):x.sub(c.d1).mul(c.e2).noLeadFormat(3)),
		formula:()=>(g.hawkingradiation.gt("e900000")?"1 + log(HR + 1) ÷ 100,000":"log(HR + 1) ÷ 1,000")
	},
	8:{
		name:"更多极大值",
		text:function(){return luckUpgrades.quatrefolium.star.name+" 每个等级将星尘升级成本提升到 {} 次方，基于最高星系数（总计：^"+this.eff().pow(stat.luckUpgLevel_quatrefolium_star).noLeadFormat(3)+"）"},
		cost:Decimal.FC_NN(1,1,6750),
		eff:function(){return N(g.highestGalaxies/500+1).recip()},
		format:x=>x.noLeadFormat(3),
		formula:()=>"(1 + G ÷ 500)<sup>-1</sup>"
	},
	9:{
		name:"更多资本主义",
		text:function(){return "自动购买器间隔上限减半"},
		cost:Decimal.FC_NN(1,1,Math.log10(1.23)+45678)
	},
	10:{
		name:"更多空间",
		text:function(){return "所有轴成本提升到 {} 次方"},
		get cost(){return repeatableWormholeUpgradeCost(N(4000),N(1e7),15,g.wormholeUpgrades[10])},
		eff:function(x=g.wormholeUpgrades[10]){return Decimal.FC_NN(1,0,1-x/100)},
		format:x=>x.noLeadFormat(2),
		formula:()=>"1 + λ ÷ 100",
		max:15
	},
	11:{
		name:"更多星系 β",
		text:function(){return "星星成本提升到 {} 次方"},
		get cost(){return repeatableWormholeUpgradeCost(N(4500),N(2e6),25,g.wormholeUpgrades[11])},
		eff:function(x=g.wormholeUpgrades[11]){return (x===25)?c.d0_1:Decimal.mul(Decimal.pow(c.d0_9,x),Decimal.pow(N(1.001105369799546),N(x-1).simplex(2)))},
		format:x=>x.noLeadFormat(3),
		formula:()=>"0.9<sup>λ</sup> × (0.1 ÷ 0.9<sup>25</sup>)<sup>(λ<sup>2</sup> - λ) ÷ 600</sup>",
		max:25
	},
	12:{
		name:"更多升级 γ",
		text:function(){return "每秒额外生成 <span style=\"white-space:nowrap\">log(<i>[待处理的星尘]</i> + 10)<sup>{}</sup></span> 星尘"},
		get cost(){return repeatableWormholeUpgradeCost(N(4500),N(5e6),20,g.wormholeUpgrades[12])},
		eff:function(x=g.wormholeUpgrades[12]){return (x===0)?c.mmaxvalue:(x===1)?c.d0:N(x/20)},
		format:x=>x.noLeadFormat(1),
		formula:()=>"min(log(λ), (λ - 1) ÷ 10, λ ÷ 20)",
		max:20
	}
}
// 占位符处理程序
for (let i=1;i<13;i++) {
	if (wormholeUpgrades[i]===undefined) {wormholeUpgrades[i] = {
		name:"更多占位符",
		text:function(){return "目前这完全没有作用"},
		cost:c.maxvalue
	}}
}
for (let i=1;i<10;i++) {wormholeUpgrades[i].max=1}

const corruption = {
	list:{
		axis:{
			name:"轴腐蚀",
			description:"超过此点后，基础轴成本增加更快",
			start:function(){
				let out = c.ee15
				out = out.pow(study13.rewards.purifier.eff().e)
				return out
			},
			power:function(){return c.d1},
			effPower:function(){return c.d256.pow(this.power())},
			formula:"{s} ^ (log({x}) ÷ log({s})) ^ {p}",
			func:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower()].decimalPowerTower()},
			invertFunc:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower().recip()].decimalPowerTower()},
			isCorrupted:function(type){return axisCost(type).mul(realAxisCostDivisor(type)).root(realAxisCostExponent(type)).gt(this.start())},
			unlock:function(){
				for (let i of axisCodes.slice(0,8+study13.rewardLevels.slabdrill)) if (this.isCorrupted(i)) return true
				return false
			}
		},
		darkAxis:{
			name:"暗轴腐蚀",
			description:"超过此点后，基础暗轴成本增加更快",
			start:function(){
				let out = c.ee12
				out = out.pow(study13.rewards.purifier.eff().d)
				return out
			},
			power:function(){return c.d1},
			effPower:function(){return c.d64.pow(this.power())},
			formula:"{s} ^ (log({x}) ÷ log({s})) ^ {p}",
			func:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower()].decimalPowerTower()},
			invertFunc:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower().recip()].decimalPowerTower()},
			isCorrupted:function(type){return darkAxisCost(type,g["dark"+type+"Axis"],true).mul(realDarkAxisCostDivisor(type)).root(realDarkAxisCostExponent(type)).gt(this.start())},
			unlock:function(){
				for (let i of axisCodes.slice(0,8+study13.rewardLevels.slabdrill)) if (this.isCorrupted(i)) return true
				return false
			}
		},
		antiAxis:{
			name:"反轴腐蚀",
			description:"超过此点后，基础反轴成本增加更快",
			start:function(){return c.ee9},
			power:function(){return c.d1},
			effPower:function(){return c.d64.pow(this.power())},
			formula:"{s} ^ (log({x}) ÷ log({s})) ^ {p}",
			func:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower()].decimalPowerTower()},
			invertFunc:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower().recip()].decimalPowerTower()},
			isCorrupted:function(type){return antiAxisCost(type).mul(realAntiAxisCostDivisor(type)).root(realAntiAxisCostExponent(type)).gt(this.start())},
			unlock:function(){
				for (let i of axisCodes.slice(0,8+study13.rewardLevels.slabdrill)) if (this.isCorrupted(i)) return true
				return false
			}
		},
		darkstar:{
			name:"暗星腐蚀",
			description:"超过此点后，基础暗星成本增加更快",
			start:function(){return c.e9},
			power:function(){return c.d1},
			effPower:function(){return c.d16.pow(this.power())},
			formula:"{s} ^ (log({x}) ÷ log({s})) ^ {p}",
			func:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower()].decimalPowerTower()},
			invertFunc:function(x){return [this.start(),Decimal.div(x.log10(),this.start().log10()),this.effPower().recip()].decimalPowerTower()},
			isCorrupted:function(){return darkStarReq().add(darkStarPriceMod("sub")).mul(darkStarPriceMod("div")).pow(darkStarPriceMod("pow").recip()).gt(this.start())},
			unlock:function(){return this.isCorrupted()}
		}
	},
	value:function(name,val){
		let data = corruption.list[name]
		return val.gt(data.start())?data.func(val):val
	},
	invertValue:function(name,val){
		let data = corruption.list[name]
		return val.gt(data.start())?data.invertFunc(val):val
	},
	formula:function(name){
		let data = corruption.list[name]
		return data.formula.replaceAll("{s}",data.start().format()).replaceAll("{x}","<i>x</i>").replaceAll("{p}",data.effPower().noLeadFormat(4))
	},
	unlocked:function(name){
		return (g.corruptionsUnlocked & (2 ** corruption.all.indexOf(name))) !== 0
	}
}
corruption.all = Object.keys(corruption.list)