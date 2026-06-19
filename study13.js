"use strict";
const study13 = {
	name:function(){
		let available = study13.allBindings.filter(x=>g.study13Bindings[x]&&(x!==25)).map(x=>Number(x))
		let lvExcl25 = studyPower(13)-(g.study13Bindings[25]?56:0)
		if (lvExcl25===0) {return g.study13Bindings[25]?"空间(56)":"第一项研究(0)"}
		if (lvExcl25===24) {return g.study13Bindings[25]?"时间维度(80)":"梦想家星系(24)"}
		if (lvExcl25===56) {return g.study13Bindings[25]?"奇迹倒映的生命之血之海(112)":"奇妙的镜子(56)"}
		if (lvExcl25===96) {return g.study13Bindings[25]?"纪元，成就境界石(152)":"纯净成就〜第十的所在(96)"}
		if (lvExcl25===144) {return g.study13Bindings[25]?"四重矩阵(200)":"三元组研究(144)"}
		if (lvExcl25===200) {return g.study13Bindings[25]?("勿近勿视；超越此古老勇敢世界隐藏着天堂〜"+g.playerName+"的装置(256)"):"十三层地狱〜开发地狱(200)"}
		let used = []
		function bindingRank(id) {return (id===25)?Infinity:(Math.floor(id/10)*100+Math.min(id%10,10-(id%10))*9+study13.bindings[id].lv*11+Math.sin(id))} // 用此函数识别最强绑定
		while ((available.length>0)&&(used.length<3)) { // 我们最多只用3个，所以用O(n)方法而非O(n^2)的排序
			let maxRank = available.map(x=>bindingRank(x)).reduce((x,y)=>Math.max(x,y))
			let next = available.filter(x=>bindingRank(x)===maxRank)[0]
			available.remove(next)
			used.push(next)
		}
		let base
		if ([3,15,28,44,61,81,102,126,151,179].includes(lvExcl25)) {base = study13.bindings[used[0]].nameMod[0]+"与"+study13.bindings[used[1]].nameMod[0]}
		else if ([6,18,32,48,66,86,108,132,158,186].includes(lvExcl25)) {base = study13.bindings[used[0]].nameMod[0]+"、"+study13.bindings[used[1]].nameMod[0]+"和"+study13.bindings[used[0]].nameMod[1]+study13.bindings[used[2]].nameMod[0]}
		else if ([9,21,36,52,71,91,114,138,165,193].includes(lvExcl25)) {let out = [];for (let i=0;i<3;i++) {for (let j=2;j>0;j--) {out.push(study13.bindings[used[i]].nameMod[j])}};base = out.sort((a,b)=>(b.includes("'")?1:0)-(a.includes("'")?1:0)).join(" ")+" "+study13.bindings[used[0]].nameMod[0]}
		else if ([12,40,76,120,172].includes(lvExcl25)) {base = study13.bindings[used[0]].nameMod[1]+study13.bindings[used[0]].nameMod[0]}
		else {
			/*
			其中[1]、[2]和[3]分别是最强、次强和第三强的绑定（强度=等级），
			任何研究XIII组合的名称由"[2] [名字] [介词] [3] [1]"决定
			*/
			function basename(ids){
				if (Math.sqrt(ids.sum())%1<0.1) {return study13.bindings[used[0]].nameMod[0]+"〜"}
				const names = [
					[ids.length+"个绑定",["在","的"]],
					["挑战",["在","的"]],
					["维度",["〜","超越","的"]],
					["梦想",["在","的"]],
					["领地",["超越","在"]],
					["经验",["的","与"]],
					["游戏",["的"]],
					["阻碍",["在","的"]],
					["入学",["在","的","到","通过"]],
					["献祭",["给"]],
					["地方",["在","的"]],
					["现实",["〜","的"]],
					["领域",["〜","之前","超越","在","的"]],
					["裂隙",["超越","在","的","超越","通过"]],
					["研究",["在","的"]],
					["子空间",["〜","在"]],
					["理论",["〜","的"]],
					["试炼",["〜","被","在","的"]],
					["贡品",["给"]],
					["宇宙",["〜","超越","的"]],
					["世界",["〜","超越","在","的"]],
					["虫洞",["从","到"]],
					["虚空",["〜"]]
				]
				let num = ids.map((x,i)=>x*(x+1)*((i%22)+1)).sum()
				let pos = num%names.length
				return names[pos][0]+names[pos][1][num%names[pos][1].length]
			}
			base = "[1]"+basename([...available,...used])+"[2][0]"
			for (let i=0;i<3;i++) {base = base.replace("["+i+"]",(used.length>i)?(study13.bindings[used[i]].nameMod[i]+" "):"")}
		}
		base = capitalize(base.trim())
		if (g.study13Bindings[25]) {
			let special25Name = ["结晶空间","结晶时间","生命游戏","伟大领域","矩阵"][Math.floor(Math.sqrt(25+lvExcl25)*1438)%5]
			base = special25Name+"《"+base+"》"
		}
		return base+"("+studyPower(13)+")"
	},
	activeT3:"bindings",
	openT3:function(name) {
		this.activeT3=name
		for (let i of d.class("tier3tab wormhole_study13")) i.style.display="none";
		d.display("tier3tab_wormhole_study13_"+name,"inline-block");
		for (let i of d.class("tabtier3 wormhole_study13")) i.style.filter = "brightness(60%)"
		d.element("button_tier3tab_wormhole_study13_"+name).style.filter = "brightness(100%)"
		updateHTML()
	},
	totalActiveBindings:function(){return Object.values(g.study13Bindings).map(x=>x?1:0).sum()},
	bindingEff:function(id){return study13.bindings[id].effect(study13.bindingPower(id))},
	...(()=>{
		function numOrFormula(id) {return showFormulas?formulaFormat(study13.bindings[id].formulaDesc()):study13.bindings[id].numDesc()}
		function studyIcon(num) {return research[(num===10)?"r27_8":studies[num].research].icon.replaceAll("studyDot","studyDot binding")}
		let metaBindings = {}
		function metaBinding(thisID,targetIDs,adjacent_req,lv,powerDiv,nameMod,bindingIcon=(targetIDs.length===1)?targetIDs[0]:("<div style=\"position:relative;top:0.5em\">"+targetIDs.join("<br>")+"</div>")){
			for (let i of targetIDs) {
				if (metaBindings[i]===undefined) {metaBindings[i]=[]}
				metaBindings[i].push(thisID)
			}
			return {
				description:function(){return "绑定"+(targetIDs.length===1?"":"")+targetIDs.joinWithAnd()+"每绑定等级增强"+(targetIDs.length===1?"是":"")+" "+study13.bindingEff(thisID).mul(c.e2).noLeadFormat(3)+"% (总计: "+[study13.bindingEff(thisID),c.e2,N(studyPower(13))].productDecimals().noLeadFormat(3)+"%)"},
				adjacent_req:adjacent_req,
				icon:icon.binding+icon.arr+classes.binding("B"+classes.sub(bindingIcon)),
				lv:lv,
				effect:function(power){return power.div(powerDiv)},
				nameMod:nameMod
			}
		}
		let researchBindings = {}
		function researchBinding(thisID,resID,resIcon,adjacent_req,basePow,nameMod,lv=1){
			researchBindings[resID] = thisID
			return {
				description:function(){return "研究"+researchOut(resID)+"弱化"+percentOrDiv(study13.bindingEff(thisID),3)},
				adjacent_req:adjacent_req,
				icon:icon.research+classes.xscript("-",resIcon)+"<br><span class=\"small\">"+classes.research(researchOut(resID))+"</span>",
				lv:lv,
				effect:function(power){return basePow.pow(power)},
				nameMod:nameMod
			}
		}
		return {
			metaBindings:metaBindings,
			researchBindings:researchBindings,
			bindings:{
				15:{
					numDesc:function(){return study13.bindingEff(15).noLeadFormat(3)},
					formulaDesc:function(){return "("+N(5e5).format()+" ÷ (log<sup>[2]</sup>(EM + 10)<sup>2</sup> + 1) + 1)"+formulaFormat.exp(study13.bindingPower(15))},
					description:function(){return "所有暗轴成本提升到"+numOrFormula(15)+"次幂（被奇异物质削弱）"},
					adjacent_req:[],
					icon:icon.exoticmatter+classes.sup("-1")+icon.arr+classes.darkmatter("A$"),
					lv:1,
					effect:function(power){return N(5e5).div(g.exoticmatter.add(c.d10).log10().log10().pow(c.d2).add(c.d1)).add(c.d1).pow(power)},
					nameMod:["空间","维度","公理化"]
				},
				24:{
					description:function(){return "每颗星将星成本提升到"+study13.bindingEff(24).noLeadFormat(3)+"次幂"},
					adjacent_req:[15],
					icon:icon.star("")+classes.stardust("$")+icon.plus,
					lv:1,
					effect:function(power){return c.d1_1.pow(power)},
					nameMod:["恒星","星体","炽燃"]
				},
				25:{
					description:function(){return "奇异物质和暗物质获取量以及总奇异和暗轴成本除数映射为"+formulaFormat("x → max(log<sup>["+study13.bindingEff(25).noLeadFormat(4)+"]</sup>(x), 0)")},
					adjacent_req:[],
					icon:(()=>{
						function f(x){return "<div style=\"height:14px;\"><table><tr><td style=\"height:18px;width:18px;font-size:14px;vertical-align:center;text-align:center;padding:0px;color:"+x+";\">◉</td></tr></table></div>"}
						return f("#556677")+"<br>"+f("#3333ff")+f("#00cc00")+"<br>"+f("#996600")
					})(),
					lv:56,
					effect:function(power){return power.div(c.d40)},
					// 绑定25不以常规方式影响名称
				},
				26:{
					description:function(){return "暗星需求提升到"+study13.bindingEff(26).noLeadFormat(3)+"次幂"},
					adjacent_req:[15],
					icon:icon.darkstar+classes.darkmatter("$")+icon.plus,
					lv:2,
					effect:function(power){return c.d1_1.pow(power)},
					nameMod:["黑暗","无光","暗淡"]
				},
				33:{
					description:function(){return "来自暗方的空间协同研究弱化"+percentOrDiv(study13.bindingEff(33))},
					adjacent_req:[24],
					icon:classes["wormhole_noGlow"]("SS")+classes.xscript("-",icon.darkaxis),
					lv:2,
					effect:function(power){return c.d0_25.pow(power)},
					nameMod:["协同","黑暗","柏拉图式"]
				},
				37:{
					description:function(){return "来自奇异方的空间协同研究弱化"+percentOrDiv(study13.bindingEff(33))},
					adjacent_req:[26],
					icon:classes["wormhole_noGlow"]("SS")+classes.xscript("-",icon.normalaxis),
					lv:1,
					effect:function(power){return c.d0_25.pow(power)},
					nameMod:["协同","光明","柏拉图式"]
				},
				41:researchBinding(41,"r8_14",icon.star(""),[33],c.d0_25,["超新星","纤维","破碎星辰"]),
				44:{
					description:function(){return "第3行精通弱化"+percentOrDiv(study13.bindingEff(44))},
					adjacent_req:[26,33],
					icon:icon.mastery()+classes.xscript("-",classes.mastery("3x")),
					lv:1,
					effect:function(power){return c.d0_3.pow(power)},
					nameMod:["自由","无主","无人问津"]
				},
				46:{
					description:function(){return "第7行星弱化"+percentOrDiv(study13.bindingEff(46))},
					adjacent_req:[24,37],
					icon:icon.star("")+classes.xscript("-",classes.stars("7x")),
					lv:1,
					effect:function(power){return c.d0_5.pow(power)},
					nameMod:["蜗牛","短暂","时间性"]
				},
				49:researchBinding(49,"r6_5",icon.masteryPower,[37],c.d0_25,["大学","博士","难以企及"]),
				52:{
					description:function(){return "所有能量效果减去"+study13.bindingEff(52).noLeadFormat(3)},
					adjacent_req:[41],
					icon:icon.energy+classes.sup("-1"),
					lv:3,
					effect:function(power){return c.d1div3.mul(power)},
					nameMod:["疲劳","梦境","厌倦"]
				},
				53:{
					description:function(){return "第1行精通弱化"+study13.bindingEff(53).recip().noLeadFormat(2)+"倍"},
					adjacent_req:[41,44],
					icon:icon.mastery()+classes.xscript("-",classes.mastery("1x")),
					lv:1,
					effect:function(power){return c.d0_1.pow(power)},
					nameMod:["起源","五原子","怀旧"]
				},
				55:{
					description:function(){return "研究1-3、1-8和1-13弱化"+percentOrDiv(study13.bindingEff(55))},
					adjacent_req:[24,26],
					icon:icon.research+classes.xscript("-",classes.research("1")),
					lv:1,
					effect:function(power){return c.d0_2.pow(power)},
					nameMod:["突破","首项科学","七条直线"]
				},
				57:{
					description:function(){return "第1行星弱化"+percentOrDiv(study13.bindingEff(57))},
					adjacent_req:[46,49],
					icon:icon.star("")+classes.xscript("-",classes.stars("1x")),
					lv:1,
					effect:function(power){return c.d0_3.pow(power)},
					nameMod:["反重力","星空","负"]
				},
				58:{
					description:function(){return "能量获取减慢"+study13.bindingEff(58).noLeadFormat(3)+"倍"},
					adjacent_req:[49],
					icon:icon.energy+icon.minus,
					lv:3,
					effect:function(power){return c.e15.pow(power)},
					nameMod:["昏沉","沉睡","休憩"]
				},
				64:{
					description:function(){return "第8行精通弱化"+percentOrDiv(study13.bindingEff(64))},
					adjacent_req:[52,53],
					icon:icon.mastery("")+classes.xscript("-",classes.mastery("8x")),
					lv:2,
					effect:function(power){return c.d0_3.pow(power)},
					nameMod:["大师","经验丰富","技艺精湛"]
				},
				66:{
					description:function(){return "第9行星弱化"+percentOrDiv(study13.bindingEff(66))},
					adjacent_req:[57,58],
					icon:icon.star("")+classes.xscript("-",classes.stars("9x")),
					lv:2,
					effect:function(power){return c.d0_7.pow(power)},
					nameMod:["耦合","双重束缚","双重欺骗"]
				},
				85:{
					numDesc:function(){return study13.bindingEff(85).noLeadFormat(3)},
					formulaDesc:function(){return "(1 - (log(EM + 1) ÷ "+c.e7.format()+" + 1))"+formulaFormat.exp(study13.bindingPower(85))},
					description:function(){return "星尘获取量随奇异物质减少而大幅降低（当前: ^"+numOrFormula(85)+"）"},
					adjacent_req:[55,64,66],
					icon:icon.exoticmatter+classes.sup("-1")+icon.arr+icon.stardust+classes.sup("-1"),
					lv:1,
					effect:function(power){
						let out = g.exoticmatter.add1Log(c.d10).div(c.e7)
						if (out.gt(1e-10)) {out = Decimal.sub(c.d1,out.add(c.d1).recip()).pow(power)}
						return out
					},
					nameMod:["洋葱","分层","等级"]
				},
				94:{
					description:function(){return "失去"+study13.bindingEff(94).noLeadFormat(3)+"个免费S轴"},
					adjacent_req:[85],
					icon:icon.SAxis+icon.minus,
					lv:1,
					effect:function(power){return power},
					nameMod:["幂","指数","几何"]
				},
				95:{
					description:function(){return "所有普通轴成本提升到"+study13.bindingEff(95).noLeadFormat(3)+"次幂"},
					adjacent_req:[85],
					icon:classes.exoticmatter("A$")+icon.plus,
					lv:5,
					effect:function(power){return c.e2.pow(power)},
					nameMod:["二元性","十六维","空间"]
				},
				96:{
					description:function(){return "失去"+study13.bindingEff(96).noLeadFormat(3)+"个免费暗S轴"},
					adjacent_req:[85],
					icon:icon.darkSAxis+icon.minus,
					lv:1,
					effect:function(power){return power},
					nameMod:["根式","对数","代数"]
				},
				103:{
					description:function(){return "星尘升级成本提升到"+study13.bindingEff(103).noLeadFormat(3)+"次幂"},
					adjacent_req:[94],
					icon:classes.stardust("SU$")+icon.plus,
					lv:2,
					effect:function(power){return c.d50.pow(power)},
					nameMod:["增强与轴","无空间","无力"]
				},
				104:{
					description:function(){return "银河惩罚2提升到"+study13.bindingEff(104).noLeadFormat(3)+"次幂"},
					adjacent_req:[94],
					icon:icon.galaxy+classes.xscript("-","<span class=\"_galaxypenalties\">2</span>"),
					lv:1,
					effect:function(power){return c.d1_5.pow(power)},
					nameMod:["星系团","纤维状","银河"]
				},
				106:{
					description:function(){return "普通和暗T轴效果提升到"+study13.bindingEff(106).noLeadFormat(3)+"次幂"},
					adjacent_req:[96],
					icon:gradientText("T","-webkit-linear-gradient(90deg,var(--exoticmatter),var(--darkmatter))")+icon.minus,
					lv:1,
					effect:function(power){return c.d0_5.pow(power)},
					nameMod:["四时","Tau","第二十一"]
				},
				107:{
					description:function(){return "失去"+study13.bindingEff(107).noLeadFormat(3)+"颗免费暗星"},
					adjacent_req:[96],
					icon:icon.darkstar+icon.minus,
					lv:4,
					effect:function(power){return power.mul(c.d50)},
					nameMod:["夜闪耀","闪耀","明亮"]
				},
				113:{
					description:function(){return "星尘升级成本提升到"+study13.bindingEff(113).noLeadFormat(3)+"次幂"},
					adjacent_req:[103,104],
					icon:classes.stardust("SU$")+classes.sup("++"),
					lv:4,
					effect:function(power){return c.d1_5.pow(power)},
					nameMod:["空间赋能","拥挤","未增强"]
				},
				114:{
					description:function(){return "银河惩罚2提升到"+study13.bindingEff(114).noLeadFormat(3)+"次幂"},
					adjacent_req:[103,106],
					icon:icon.galaxy+classes.xscript("--","<span class=\"_galaxypenalties\">2</span>"),
					lv:1,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["超星系团","丝状","集群"]
				},
				116:{
					description:function(){return "普通和暗T轴效果提升到"+study13.bindingEff(116).noLeadFormat(3)+"次幂"},
					adjacent_req:[104,107],
					icon:gradientText("T","-webkit-linear-gradient(90deg,var(--darkmatter),var(--exoticmatter))")+icon.minus,
					lv:1,
					effect:function(power){return c.d0_1.pow(power)},
					nameMod:["T","Taw","奈费尔提蒂"]
				},
				117:{
					description:function(){return "失去"+study13.bindingEff(117).noLeadFormat(3)+"颗免费暗星"},
					adjacent_req:[106,107],
					icon:icon.darkstar+classes.sup("--"),
					lv:2,
					effect:function(power){return power.mul(c.d20)},
					nameMod:["竹取","闪烁","天文"]
				},
				124:{
					description:function(){return "失去"+study13.bindingEff(124).noLeadFormat(3)+"个免费S轴"},
					adjacent_req:[113,114],
					icon:icon.SAxis+classes.sup("--"),
					lv:1,
					effect:function(power){return power},
					nameMod:["指数","多项式","形变"]
				},
				125:{
					description:function(){return "所有普通轴成本乘以"+study13.bindingEff(125).noLeadFormat(2)},
					adjacent_req:[95],
					icon:classes.exoticmatter("A$")+classes.sup("++"),
					lv:5,
					effect:function(power){return N("5e5e5").pow(power)},
					nameMod:["大门","封锁","墙"]
				},
				126:{
					description:function(){return "失去"+study13.bindingEff(126).noLeadFormat(3)+"个免费暗S轴"},
					adjacent_req:[116,117],
					icon:icon.darkSAxis+classes.sup("--"),
					lv:1,
					effect:function(power){return power},
					nameMod:["根式","反多项式","变量"]
				},
				135:{
					numDesc:function(){return study13.bindingEff(135).noLeadFormat(3)},
					formulaDesc:function(){return "(1 - (log(S + 1) ÷ 1,000 + 1))"+formulaFormat.exp(study13.bindingPower(135))},
					description:function(){return "奇异物质获取量随星尘减少而大幅降低（当前: ^"+numOrFormula(135)+"）"},
					adjacent_req:[124,125,126],
					icon:icon.stardust+classes.sup("-1")+icon.arr+icon.exoticmatter+classes.sup("-1"),
					lv:1,
					effect:function(power){
						let out = g.stardust.add1Log(c.d10).div(c.e3)
						if (out.gt(1e-10)) {out = Decimal.sub(c.d1,out.add(c.d1).recip())}
						return out.pow(power)
					},
					nameMod:["食人魔","声望","堆叠"]
				},
				155:{
					description:function(){return "星标折算提前"+study13.bindingEff(155).noLeadFormat(3)+"颗星开始"},
					adjacent_req:[135],
					icon:icon.star("")+icon.arr+icon.star("")+classes.stars("$"),
					lv:8,
					effect:function(power){return N(17.5).mul(power)},
					nameMod:["黑暗天空","遮蔽","污染"]
				},
				162:{
					description:function(){return achievement.label(209)+"奖励弱化"+study13.bindingEff(162).noLeadFormat(3)+"倍"},
					adjacent_req:[135],
					icon:icon.achievements+classes.xscript("-",classes.achievements("209")),
					lv:1,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["七维体","第七","七维"]
				},
				164:{
					description:function(){return achievement.label(210)+"奖励弱化"+study13.bindingEff(164).noLeadFormat(3)+"倍"},
					adjacent_req:[155],
					icon:icon.achievements+classes.xscript("-",classes.achievements("210")),
					lv:2,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["八维体","第八","八维"]
				},
				166:{
					description:function(){return achievement.label(501)+"奖励增强减慢"+study13.bindingEff(166).noLeadFormat(3)+"倍"},
					adjacent_req:[155],
					icon:icon.achievements+classes.xscript("-",classes.achievements("501")),
					lv:1,
					effect:function(power){return c.d10.pow(power)},
					nameMod:["里程碑","第二","传送门"]
				},
				168:{
					description:function(){return achievement.label(528)+"奖励弱化"+study13.bindingEff(168).noLeadFormat(3)+"倍"},
					adjacent_req:[135],
					icon:icon.achievements+classes.xscript("-",classes.achievements("528")),
					lv:2,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["平衡","均衡","中性"]
				},
				172:{
					description:function(){return "U轴效果基数提升到"+study13.bindingEff(172).noLeadFormat(3)+"次幂"},
					adjacent_req:[162],
					icon:icon.UAxis+icon.minus,
					lv:2,
					effect:function(power){return c.d0_1.pow(power)},
					nameMod:["依赖","主导","劣势"]
				},
				174:{
					numDesc:function(){return study13.bindingEff(174).noLeadFormat(3)},
					formulaDesc:function(){return "(1 + 1 ÷ log(L + 10))"+formulaFormat.exp(study13.bindingPower(174))},
					description:function(){return achievement.label(210)+"奖励额外弱化"+numOrFormula(174)+"倍（随黄色辉光减少）"},
					adjacent_req:[164],
					icon:icon.lumen(5)+classes.sup(-1)+icon.arr+icon.achievements+classes.xscript("-1",classes.achievements("210")),
					lv:1,
					effect:function(power){return g.lumens[5].log10().recip().add(c.d1).pow(power)},
					nameMod:["八种黄调","金色","发光"]
				},
				176:{
					description:function(){return achievement.label(501)+"奖励上限为"+study13.bindingEff(176).noLeadFormat(3)+"倍（精通101之前）<br>（预计效果: "+arrowJoin(achievement(501).realEffect(false).format(2)+"倍",achievement(501).realEffect(true).format(2)+"倍")+"）"},
					adjacent_req:[166],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("501"))+icon.arr+icon.achievements+classes.sub(classes.achievements("501")),
					lv:2,
					effect:function(power){return c.d2.pow(power.recip())},
					nameMod:["收敛","有限","雅各布式"]
				},
				178:{
					numDesc:function(){return study13.bindingEff(178).noLeadFormat(3)},
					formulaDesc:function(){return "(1 + 1 ÷ log(L + 10))"+formulaFormat.exp(study13.bindingPower(178))},
					description:function(){return achievement.label(528)+"奖励额外弱化"+numOrFormula(178)+"倍（随黄色辉光减少）"},
					adjacent_req:[168],
					icon:icon.lumen(5)+classes.sup(-1)+icon.arr+icon.achievements+classes.xscript("-1",classes.achievements("528")),
					lv:1,
					effect:function(power){return g.lumens[5].log10().recip().add(c.d1).pow(power)},
					nameMod:["黄德鲁伊","太阳","色彩均衡"]
				},
				182:{
					description:function(){return "V轴效果减去"+study13.bindingEff(182).noLeadFormat(3)},
					adjacent_req:[164,172],
					icon:icon.VAxis+icon.minus,
					lv:1,
					effect:function(power){return c.d4.mul(power)},
					nameMod:["依赖","五维七维","主导"]
				},
				184:{
					description:function(){return achievement.label(210)+"奖励软上限更强 <span style=\"white-space:nowrap\">(O(n<sup>"+achievement(210).scp(false).noLeadFormat(3)+"</sup>) "+icon.arr+" O(n<sup>"+achievement(210).scp(true).noLeadFormat(3)+"</sup>))</span>"},
					adjacent_req:[162,166,174],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("210"))+icon.arr+icon.achievements+classes.sub(classes.achievements("210")),
					lv:2,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["弹性极限","子空间","八个破碎维度"]
				},
				186:{
					description:function(){return "精通101弱化"+percentOrDiv(study13.bindingEff(186))},
					adjacent_req:[164,168,176],
					icon:icon.mastery("")+classes.xscript("-",classes.mastery("101")),
					lv:1,
					effect:function(power){return c.d0_5.pow(power)},
					nameMod:["曲率","思维扭曲","时钟之墙"]
				},
				188:{
					description:function(){return achievement.label(528)+"奖励软上限更强 <span style=\"white-space:nowrap\">(10<sup>O(log(n)<sup>"+achievement(528).scp(false).add(c.d1).recip().noLeadFormat(3)+"</sup>)</sup> "+icon.arr+" 10<sup>O(log(n)<sup>"+achievement(528).scp(true).add(c.d1).recip().noLeadFormat(3)+"</sup>)</sup>)</span>"},
					adjacent_req:[166,178],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("528"))+icon.arr+icon.achievements+classes.sub(classes.achievements("528")),
					lv:2,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["比例极限","不平衡","<span class=\"_jacorb\">（软上限）</span>"]
				},
				192:{
					numDesc:function(){return percentOrDiv(study13.bindingEff(192))},
					formulaDesc:function(){return "(ΣA ÷ (ΣA + 10,000))"+formulaFormat.exp(study13.bindingPower(192))},
					description:function(){return achievement.label(207,4)+"的奖励"+(showFormulas?"增强":"弱化")+numOrFormula(192)+"倍（基于总普通轴）"},
					adjacent_req:[174,182],
					icon:icon.achievements+classes.sub(classes.achievements("207-210"))+"<br>"+icon.normalaxis+icon.arr+icon.normalaxis+classes.sup(2),
					lv:2,
					effect:function(power){return Decimal.div(stat.totalNormalAxis,stat.totalNormalAxis.add(c.e4)).pow(power)},
					nameMod:["平方","二维七维","二次"]
				},
				194:{
					description:function(){return "每个普通轴的免费数量超过从"+achievement.label(210)+"奖励获得的数量时减少 (O(n<sup>"+study13.bindingEff(194).noLeadFormat(3)+"</sup>))"},
					adjacent_req:[172,176,184],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("210"))+icon.arr+icon.normalaxis+icon.inv,
					lv:1,
					effect:function(power){return c.d0_99.pow(power)},
					nameMod:["声望树","八个雅各布维度","遥远的增量"]
				},
				196:{
					description:function(){return achievement.label(201)+"奖励和所有奇数行精通弱化"+percentOrDiv(study13.bindingEff(196))},
					adjacent_req:[174,178,186],
					icon:icon.achievements+classes.sub(classes.achievements("201"))+icon.br+icon.mastery("")+classes.sub(classes.mastery("[2z±1]x")),
					lv:2,
					effect:function(power){return c.d0_95.pow(power)},
					nameMod:["混合","二合一","奇数"]
				},
				198:{
					description:function(){return "每个暗轴的免费数量超过从"+achievement.label(528)+"奖励获得的数量时减少 (O(n<sup>"+study13.bindingEff(198).noLeadFormat(3)+"</sup>))"},
					adjacent_req:[176,188],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("528"))+icon.arr+icon.darkaxis+icon.inv,
					lv:1,
					effect:function(power){return c.d0_99.pow(power)},
					nameMod:["暗圈","十六个雅各布维度","充满能量的增量"]
				},
				204:{
					description:function(){return achievement.label(706)+"奖励软上限增强"+study13.bindingEff(204).noLeadFormat(3)+"倍<br>（预计效果: "+arrowJoin(achievement(706).effect(false).noLeadFormat(2)+"倍",achievement(706).effect(true).noLeadFormat(2)+"倍")+"）"},
					adjacent_req:[182,186,194],
					icon:icon.achievements+classes.xscript("-1",classes.achievements("706"))+icon.arr+icon.achievements+classes.sub(classes.achievements("706")),
					lv:4,
					effect:function(power){return c.d3.pow(power)},
					nameMod:["饼干","易碎","魔法书"]
				},
				206:{
					description:function(){return achievement.label(717)+"奖励弱化"+percentOrDiv(study13.bindingEff(206))},
					adjacent_req:[184,188,196],
					icon:icon.achievements+classes.xscript("-",classes.achievements("717")),
					lv:4,
					effect:function(power){return c.d0_8.pow(power)},
					nameMod:["蚂蚁","升华","柏拉图式"]
				},
				225:{
					numDesc:function(){return study13.bindingEff(225).noLeadFormat(3)},
					formulaDesc:function(){return "min(log<sub>"+this.discoveryReq(study13.bindingPower(225)).noLeadFormat(3)+"</sub>(1 - υD ÷ "+g.totalDiscoveries.format()+"), 1)"},
					description:function(){return "你最多只能花费发现的"+this.discoveryReq(study13.bindingPower(225)).mul(c.e2).noLeadFormat(3)+"% ("+g.spentDiscoveries.format(0,3)+" / "+this.spendableDiscoveries().format(0,3)+")。<br><br>如果你花费超过此值，奇异物质、星尘、暗物质和精通能量获取量将大幅减少（当前: 如果 "+formulaFormat("x > 10")+" 则 "+unbreak(arrowJoin("x","10<sup>log(<i>x</i>)<sup>"+numOrFormula(225)+"</sup></sup>"))+"）"},
					adjacent_req:[192,198,204,206],
					icon:studyIcon(5),
					lv:4,
					discoveryReq:function(power){return c.d0_25.pow(power)},
					spendableDiscoveries:function(){return this.discoveryReq(study13.bindingPower(225)).mul(g.totalDiscoveries).floor()},
					effect:function(power){let p = g.totalDiscoveries.eq(c.d0)?c.d0:Decimal.div(g.spentDiscoveries,g.totalDiscoveries),r=this.discoveryReq(power);return p.gt(r)?p.log(r):c.d1},
					nameMod:["科学","文盲","中世纪"]
				},
				234:{
					description:function(){return "所有精通根据其行数变弱 (×"+study13.bindingEff(234).formatFrom1(2)+"<sup><i>行</i></sup>)"},
					adjacent_req:[225],
					icon:studyIcon(8),
					lv:3,
					effect:function(power){return c.d0_98.pow(power)},
					nameMod:["精通","第八","熟练"]
				},
				236:{
					description:function(){return "你必须在"+timeFormat(study13.bindingEff(236))+"内完成研究，否则将被强制移出。<br><br>"+studies[0].exactFrames[0]},
					adjacent_req:[225],
					get icon(){return studyIcon(11)},
					lv:5,
					effect:function(power){return N(540).div(power).toNumber()},
					nameMod:["月亮","斯克里文","月球"]
				},
				242:{
					description:function(){return "游戏运行速度每低于目标一个暗轴减慢"+study13.bindingEff(242).formatFrom1(3)+"倍 (当前: ×"+study13.bindingEff(242).pow(stat.wormholeDarkAxisReq.sub(stat.totalDarkAxis).max(c.d0)).noLeadFormat(2)+")"},
					adjacent_req:[234],
					icon:studyIcon(6),
					lv:3,
					effect:function(power){return c.d1_05.pow(power)},
					nameMod:["虚空","黑色","辐射"]
				},
				244:{
					numDesc:function(){return study13.bindingEff(244).noLeadFormat(3)},
					formulaDesc:function(){return "(8 ÷ log(★ + 10) + 1)"+formulaFormat.exp(study13.bindingPower(244))},
					description:function(){return "反轴维度提升弱化"+numOrFormula(244)+"倍（随暗星减少）"},
					adjacent_req:[236],
					icon:studyIcon(9),
					lv:5,
					effect:function(power){return c.d8.div(g.darkstars.add(c.d10).log10()).add(c.d1).pow(power)},
					nameMod:["反物质","经验丰富","老练"]
				},
				245:{
					description:function(){return "每项研究的第三个奖励弱化"+percentOrDiv(study13.bindingEff(245))},
					adjacent_req:[234],
					icon:studyIcon(1),
					lv:4,
					effect:function(power){return c.d0_75.pow(power)},
					nameMod:["开发者","机械","无法游玩"]
				},
				246:{
					numDesc:function(){return study13.bindingEff(246).noLeadFormat(3)},
					formulaDesc:function(){return "(6 ÷ (log<sup>[3]</sup>(S + "+c.e10.format()+") + 1)<sup>2</sup> + 1)"+formulaFormat.exp(study13.bindingPower(246))},
					description:function(){return "所有运气升级的有效等级减少"+numOrFormula(246)+"倍（随星尘减少）"},
					adjacent_req:[236],
					icon:studyIcon(7),
					lv:4,
					effect:function(power){return c.d6.div(g.stardust.add(c.e10).layerplus(-3).add(c.d1).pow(c.d2)).add(c.d1).pow(power)},
					nameMod:["幸运","不幸","旋转的轮子"]
				},
				248:{
					numDesc:function(){return study13.bindingEff(248).noLeadFormat(2)},
					formulaDesc:function(){return "(S = 0) ? 1 : 10<sup>10<sup>(S - 1)"+formulaFormat.mult(study13.bindingPower(248))+"</sup>"+formulaFormat.mult(study13.bindingPower(248))+"</sup>"},
					description:function(){return "星尘获取量基于已进行的星尘重置次数减少 (当前: ÷"+numOrFormula(248)+")"},
					adjacent_req:[236],
					icon:studyIcon(4),
					lv:3,
					effect:function(power){return (g.TotalStardustResets===0)?c.d1:[power.pow10(),power.pow10(),N(g.TotalStardustResets-1)].decimalPowerTower()},
					nameMod:["真空","放射性","居里"]
				},
				254:{
					description:function(){return "第5行和第6行能量研究弱化"+percentOrDiv(study13.bindingEff(254))},
					adjacent_req:[242,244,246],
					icon:studyIcon(3),
					lv:4,
					effect:function(power){return c.d0_75.pow(power)},
					nameMod:["镇痛","守恒","虚空精神维度时间"]
				},
256:{
					description:function(){return "将星成本增加"+study13.bindingEff(256).noLeadFormat(3)+"颗星"+(study13.bindingEff(256).eq(c.d1)?"":"s")},
					adjacent_req:[245,248],
					icon:studyIcon(2),
					lv:3,
					effect:function(power){return power.mul(c.d2)},
					nameMod:["创造","银河","中子"]
				},
				265:{
					description:function(){return "每项研究的第二个奖励弱化"+percentOrDiv(study13.bindingEff(265))},
					adjacent_req:[254,256],
					get icon(){return studyIcon(10)},
					lv:4,
					effect:function(power){return c.d0_75.pow(power)},
					nameMod:{0:"研究",1:"本体论",get 2(){return ["星体","决定性","时间性"][Math.floor(Date.now()/60000+(g.study13Bindings[291]?1:0)+(g.study13Bindings[299]?2:0))%3]}}
				},
				275:{
					numDesc:function(){return study13.bindingEff(275).noLeadFormat(2)},
					formulaDesc:function(){
						let p = study13.bindingPower(275);
						let out = "((1 + log<sup>[2]</sup>(DM + 10) ÷ 100)<sup>331.3</sup>"+(p.eq(c.d1)?" ":"<br>")+"× 10<sup>5</sup>)"+formulaFormat.exp(p.recip())+formulaFormat.mult(p.recip())
						if (StudyE(12)) {out = "1 - 1 ÷ ("+out+" + 1)"}
						return out
					},
					description:function(){return "暗物质获取上限为1，但钛强化可用，坚韧获取量和上限乘以"+numOrFormula(275)+"（基于暗物质）"+(StudyE(12)?"<br><br><i>（注：如果同时在研究XII中，坚韧乘数不生效）</i>":"")},
					adjacent_req:[265],
					get icon(){return studyIcon(12)},
					lv:6,
					effect:function(power){
						let out = g.darkmatter.add(c.d10).log10().log10().div(c.e2).add(c.d1).pow(331.3).mul(c.e5).root(power).div(power)
						if (StudyE(12)) {out = c.d1.sub(out.add(c.d1).recip())}
						return out
					},
					nameMod:["元素","钛制","强化"]
				},
				291:{
					description:function(){return "暗物质获取量提升到"+study13.bindingEff(291).noLeadFormat(3)+"次幂"},
					adjacent_req:[275],
					icon:icon.darkmatter+icon.minus,
					lv:2,
					effect:function(power){return c.d0_9.pow(power)},
					nameMod:["墨水瓶","冥河","不透光"]
				},
				299:{
					description:function(){return "奇异物质获取量提升到"+study13.bindingEff(299).noLeadFormat(3)+"次幂"},
					adjacent_req:[275],
					icon:icon.exoticmatter+icon.minus,
					lv:1,
					effect:function(power){return c.d0_9.pow(power)},
					nameMod:["负世界","热带","奇异"]
				},
				301:metaBinding(301,[291],[291,299],2,256,["墨海","冥河","焦油与"]),
				304:{
					description:function(){return "星成本提升到"+study13.bindingEff(304).noLeadFormat(3)+"次幂"},
					adjacent_req:[291],
					icon:icon.star("")+classes.stardust("$")+icon.plus,
					lv:1,
					effect:function(power){return c.e2.pow(power)},
					nameMod:["辉光","星云","十行"]
				},
				306:{
					description:function(){return "有效暗星数量减少"+percentOrDiv(study13.bindingEff(306),3)},
					adjacent_req:[299],
					icon:icon.darkstar+icon.minus,
					lv:2,
					effect:function(power){return c.d0_5.pow(power)},
					nameMod:["早已熄灭的星","阻碍","矮人"]
				},
				309:metaBinding(309,[299],[291,299],2,128,["零世界","亚马逊","奇异"]),
				312:{
					description:function(){return "精通能量获取量提升到"+study13.bindingEff(312).noLeadFormat(3)+"次幂"},
					adjacent_req:[301,306],
					icon:icon.masteryPower+icon.minus,
					lv:1,
					effect:function(power){return c.d0_5.pow(power)},
					nameMod:["专业知识","熟练","有天赋"]
				},
				315:{
					description:function(){return "所有惩罚效果增加"+study13.bindingEff(315).noLeadFormat(3)+"个星系"+(study13.bindingEff(315).eq(c.d1)?"":"s")},
					adjacent_req:[301,304,306,309],
					icon:classes.galaxypenalties("G")+icon.plus,
					lv:2,
					effect:function(power){return power},
					nameMod:["监狱","惩罚者","罪犯"]
				},
				318:{
					description:function(){return "精通计时器增加减慢"+study13.bindingEff(318).noLeadFormat(3)+"倍"},
					adjacent_req:[304,309],
					icon:icon.mastery("")+icon.time+icon.minus,
					lv:1,
					effect:function(power){return c.e3.pow(power)},
					nameMod:["天赋","技艺","受过教育"]
				},
				323:{
					description:function(){return study13.rewardLabel("emBoost")+"弱化"+percentOrDiv(study13.bindingEff(323))},
					adjacent_req:[304,309,312],
					icon:classes.binding("S")+classes.xscript(classes.binding("13")+icon.minus,icon.normalaxis),
					lv:1,
					effect:function(power){return c.d0_2.pow(power)},
					nameMod:["裂变","反应性","已反应"]
				},
				327:{
					description:function(){return study13.rewardLabel("dmBoost")+"弱化"+percentOrDiv(study13.bindingEff(327))},
					adjacent_req:[301,306,318],
					icon:classes.binding("S")+classes.xscript(classes.binding("13")+icon.minus,icon.darkaxis),
					lv:2,
					effect:function(power){return c.d0_2.pow(power)},
					nameMod:["聚变","无反应性","未反应"]
				},
				331:{
					description:function(){return "普通S轴弱化"+percentOrDiv(study13.bindingEff(331))},
					adjacent_req:[301,327],
					icon:icon.SAxis+classes.sup("---"),
					lv:1,
					effect:function(power){return c.d0_9.pow(power)},
					nameMod:["西格玛","卡帕","狂热"]
				},
				333:{
					numDesc:function(){return study13.bindingEff(333).noLeadFormat(3)},
					formulaDesc:function(){return "10<sup>max(60 - ★, 0)"+formulaFormat.mult(study13.bindingPower(333).div(c.d300))+" + max(40 - ★, 0)<sup>2</sup>"+formulaFormat.mult(study13.bindingPower(333).div(c.d2e3))+"</sup>"},
					description:function(){return "滴速除以"+numOrFormula(333)+"（基于星数）"},
					adjacent_req:[318,323],
					icon:icon.star("")+icon.inv+icon.arr+icon.tickspeed+icon.inv,
					lv:1,
					effect:function(power){return N(Math.max(60-g.stars,0)/300+Math.max(40-g.stars,0)**2/2000).mul(power).pow10()},
					nameMod:["膨胀","拉伸","膨胀"]
				},
				337:{
					description:function(){return "低于1的滴速提升到"+study13.bindingEff(337).noLeadFormat(4)+"次幂"},
					adjacent_req:[312,327],
					icon:icon.tickspeed+icon.inv+icon.arr+icon.tickspeed+icon.inv,
					lv:1,
					effect:function(power){return c.d2.pow(power)},
					nameMod:["时间监狱","加速","二次"]
				},
				339:{
					description:function(){return "暗S轴弱化"+percentOrDiv(study13.bindingEff(339))},
					adjacent_req:[309,323],
					icon:icon.darkSAxis+classes.sup("---"),
					lv:2,
					effect:function(power){return c.d0_9.pow(power)},
					nameMod:["信","卡夫","佩莱尼克"]
				},
				342:metaBinding(342,[225],[331,333],2,230.4,["黑暗时代","不变","神圣"]),
				345:metaBinding(345,[333,337],[315,333,337],2,128,["静止","冻结","静态"],"33x"),
				348:{
					description:function(){return "知识对所有精通的加成弱化"+percentOrDiv(study13.bindingEff(348))+"（在软上限之前）"},
					adjacent_req:[337,339],
					icon:icon.knowledge+icon.inv+icon.arr+icon.mastery("")+icon.inv,
					lv:1,
					effect:function(power){return c.d0_8.pow(power)},
					nameMod:["理论","不适用","无用"]
				},
				353:metaBinding(353,[236],[342,345],2,8/7,["倒计时","滴答","赛跑"]),
				357:metaBinding(357,[234],[345,348],1,256,["金字塔","倒塌","建筑"]),
				371:researchBinding(371,"r14_6",icon.tickspeed,[331,357],c.d0_8,["秒","古老","永恒"]),
				373:researchBinding(373,"r14_10",icon.darkYAxis,[353,348],c.d0_6,["年长黑暗","芥子气","昨夜车库"],2),
				375:metaBinding(375,[315],[345],4,256,["冥界","阎王","罪恶"]),
				377:researchBinding(377,"r2_10",icon.stardust,[357,342],c.d0_6,["星云","主序","星云"],2),
				379:researchBinding(379,"r16_12",icon.darkstar,[339,353],c.d0_6,["矮星","精灵","花园地精"]),
				382:researchBinding(382,"r13_11",classes.stardust("B"),[371,373,375],c.d0_5,["三位一体","三个微观世界","三元"]),
				388:researchBinding(388,"r9_5",icon.achievements,[375,377,379],c.d0_25,["骄傲","成就","过度成就"]),
				393:researchBinding(393,"r1_8",icon.normalaxis,[379,382],c.em3,["基础","初级","原始"]),
				395:{
					description:function(){return "从暗物质获得的免费普通轴减少"+percentOrDiv(study13.bindingEff(395))},
					adjacent_req:[373,375,377],
					icon:"("+icon.darkaxis+icon.arr+icon.normalaxis+")"+icon.inv,
					lv:2,
					effect:function(power){return c.d0_1.pow(power)},
					nameMod:["暗能量","光谱","无质量"]
				},
				397:researchBinding(397,"r7_8",icon.star(""),[371,388],c.d0_75,["星座","天文","观星者"]),
				415:{
					description:function(){return "终结性研究弱化"+percentOrDiv(study13.bindingEff(415))},
					adjacent_req:[393,395,397],
					icon:icon.research+classes.xscript("-","<span style=\"color:"+researchGroupList.finality1.color+"\">F</span>"),
					lv:2,
					effect:function(power){return c.d0_2.pow(power)},
					nameMod:["顶点","终极","最终"]
				},
				442:metaBinding(442,[371,373,377,379,382,388,393,397],[415],3,1024,["间隙之神","","无知"],icon.research),
				445:metaBinding(445,[85,103,104,125,135,242,333,337],[415],2,1024,["开端","通往","八项测试"],"-1"),
				448:metaBinding(448,[164,168,174,178,184,188,194,198],[415],3,1024,["进展","高贵发展","可敬"],gradientText("A","linear-gradient(180deg,var(--exoticmatter) 25%,var(--achievements) 41.67% 58.33%,var(--darkmatter) 75%)"))
			}
		}
	})(),
	bindingSelected:undefined,
	allParentBindings:function(id){ // 所有从绑定'id'分支出来的绑定，包括'id'本身
		let out = [id]
		while (true) {
			let prev = out // 添加数组中已有绑定的所有父绑定，然后检查是否添加了新绑定。如果没有，返回
			let next = []
			for (let i of out) {next.push(i); for (let j of study13.bindings[i].adjacent_req) {next.push(j)}}
			next = Array.removeDuplicates(next)
			if (prev.length===next.length) {return next}
			out = next
		}
	},
	allDescendantBindings:function(id){ // 所有从'id'分支出来的绑定，包括'id'本身
		let out = [id]
		while (true) {
			let prev = Array.removeDuplicates(out) // 添加数组中已有绑定的所有子绑定，然后检查是否添加了新绑定。如果没有，返回
			for (let i of study13.allBindings) {for (let j of study13.bindings[i].adjacent_req) {if (out.includes(j)) {out.push(Number(i))}}}
			out = Array.removeDuplicates(out)
			if (prev.length===out.length) {return out}
		}
	},
	activateBinding:function(id){
		if (StudyE(13)) {return}
		let changes = false
		if (g.study13Bindings[id]) { // 如果绑定已激活，则移除它及其所有后代
			for (let i of study13.allDescendantBindings(id)) {
				if (g.study13Bindings[i]) {changes = true}
				g.study13Bindings[i] = false
			}
		} else { // 如果绑定未激活，则添加它及其所有祖先
			for (let i of study13.allParentBindings(id)) {
				if (!g.study13Bindings[i]) {changes = true}
				g.study13Bindings[i] = true
			}
		}
		if (changes) {study13.updateBindingTree();}
	},
	updateBindingTree:function(){
		for (let i of study13.allBindings) {d.element("button_study13Binding"+i).style.filter = "contrast("+(g.study13Bindings[i]?120:100)+"%)"}
	},
	accessibleBindingName:function(id) {
		let data = study13.bindings[id]
		let out = "绑定"+id
		if (data.adjacent_req.length>0) out += "，从"+data.adjacent_req.joinWithAnd()+"分支"
		return out
	},
	bindingPower:function(id){
		let out = c.d1, row = Math.floor(id/10)
		// 逐行效果
		// 非逐行效果
		if (study13.rewards.weakenBindings.allAffected.includes(id)) {out = out.mul(stat.study13RewardWeakBindings[id])} // 邮件破坏者
		if ((study13.rewardLevels.signed8bit>0)&&[2,8].includes(id%10)) { // 邮件破坏者 II
			let complement = 10*Math.floor(id/10)+10-(id%10)
			if (g.study13Bindings[id]&&g.study13Bindings[complement]) {out = out.mul(c.d0_9)}
		}
		if (achievement(919).rewardAffects.includes(id)&&g.achievement[919]) {out = out.mul(achievement(919).effect())}
		// 这些直接影响其他绑定，为了清晰起见，即使不在研究XIII中也应用它们
		if (study13.metaBindings[id]!==undefined) {for (let i of study13.metaBindings[id]) {if (g.study13Bindings[i]) {out = out.mul(study13.bindingEff(i).mul(studyPower(13)).add(c.d1))}}}
		return out
	},
	renderTree:function(){
		d.element("study13BindingContainer").style.height = (74*study13.bindingRows+30)+"px"
		let canvas = d.element("study13BindingCanvas");
		let context = canvas.getContext("2d")
		canvas.style.height = (study13.bindingRows*74)+"px";
		canvas.height = study13.bindingRows*74;
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (let b1 of study13.allBindings) {
			for (let b2 of study13.bindings[b1].adjacent_req) {
				context.moveTo((b1%10)*74-37,Math.floor(b1/10)*74-37);
				context.lineTo((b2%10)*74-37,Math.floor(b2/10)*74-37);
			}
		}
		context.strokeStyle = "#c2a366";
		context.lineWidth = 2;
		context.stroke();
		for (let y of [481,999,1517,2035]) {for (let x=-6;x<=666;x+=12) {
			context.rect(x,y,6,6)
			context.moveTo(x+6,y+3)
			context.lineTo(x+12,y+3)
		}}
		context.strokeStyle = "#698133"
		context.lineWidth = 1;
		context.stroke();
	},
	bound:function(id){return (study13.bindings[id]===undefined)?functionError("study13.bound",arguments):(StudyE(13)&&g.study13Bindings[id])},
	resizeBinding:function(x){
		let size = 15
		let elem = d.element("button_study13Binding"+x)
		while (true) {
			d.element("foo").innerHTML = elem.innerHTML
			d.element("foo").style["font-size"] = elem.style["font-size"]
			if ((d.element("foo").offsetWidth>50)||(d.element("foo").offsetHeight>50)) {
				size--
				elem.style["font-size"] = size+"px"
				if (size===0) break
			} else {
				break
			}
		}
	},
	/*
	奖励类型包括：
	scaling      每个奖励取代前一个，例如"2×奇异物质"、"4×奇异物质"、"8×奇异物质"
	composite    每个等级添加一个新奖励，例如"2×X轴效果"、"2×Y轴效果"、"2×Z轴效果"
	single       只有一个等级
	*/
	rewards:(()=>{
		function scaleFormat(curr,prev,func){
			if (func(curr)===func(prev)) {return func(curr)}
			return arrowJoin("<span style=\"color:var(--binding_dark)\">"+func(prev)+"</span>","<span style=\"color:var(--binding_light)\">"+func(curr)+"</span>")
		}
		return {
			emBoost:{
				name:"奇异反应器",
				breakpoints:[1,3,6,10,15,21,28,36,45,55,66,78,91,105,120,136,153,171,190,210,231,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.emBoost){
					let out = N((lv===22)?0.15:(lv/150))
					if (study13.bound(323)) {out = out.mul(study13.bindingEff(323))}
					return out.add(c.d1)
				},
				desc:function(curr,prev){return "前七个普通轴的效果"+scaleFormat(curr,prev,x=>percentOrMult(this.eff(x),3,false))+"更强"},
			},
			dmBoost:{
				name:"暗反应器",
				breakpoints:[1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.emBoost){
					let out = N((lv===16)?0.11:(lv/150))
					if (study13.bound(327)) {out = out.mul(study13.bindingEff(327))}
					return out.add(c.d1)
				},
				desc:function(curr,prev){return "前七个暗轴的效果"+scaleFormat(curr,prev,x=>percentOrMult(this.eff(x),3,false))+"更强"},
			},
			amBoost:{
				name:"反反应器",
				breakpoints:[1,5,12,22,35,51,70,92,117,145,176,210,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.emBoost){
					let out = N((lv===13)?0.09:(lv/150))
					return out.add(c.d1)
				},
				desc:function(curr,prev){return "前七个反轴的效果"+scaleFormat(curr,prev,x=>percentOrMult(this.eff(x),3,false))+"更强"},
			},
			masterNumber:{
				name:"大师的整数序列百科全书®",
				breakpoints:[2,5,12,29,70,169],
				type:"composite",
				l3Mult:function(){return (study13.rewardLevels.masterNumber===6)?(g.stars+g.galaxies+totalAchievements):g.stars},
				desc:function(lv){return ["精通42增强130%","精通63增强1.3倍","精通105每颗星增强0.13%（当前："+N(this.l3Mult()*0.13).noLeadFormat(2)+"%）","精通42每完成一次研究XIII额外增强1.3%（当前："+N(g.studyCompletions[13]*1.3).noLeadFormat(2)+"%）（与等级1乘算）","精通63每购买一颗暗星额外增强0.13%（当前："+g.darkstars.mul(0.13).noLeadFormat(2)+"%）（与等级2乘算）","星系和成就现在加入等级3效果"][lv-1]}
			},
			particleLab:{
				name:"Stat Mark的可食用元素周期表",
				breakpoints:[3,9,19,37,55,87,119,169,219,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.particleLab){return Decimal.FC_NN(1,0,(lv===10)?(10/3):(lv>4)?(0.75+lv/4):(1+lv/5))},
				desc:function(curr,prev){return "知识的基础获取量乘以"+scaleFormat(curr,prev,x=>this.eff(x).noLeadFormat(3))+"倍"}
			},
			clock:{
				name:"13小时怀表",
				breakpoints:[16,64,144,256],
				type:"composite",
				desc:function(lv){return ["游戏运行速度每完成一次研究XIII加快0.78125%（当前："+N(g.studyCompletions[13]*0.78125).noLeadFormat(3)+"%）","游戏在研究XIII中每绑定等级额外加快0.1953125%（当前："+N(studyPower(13)*0.1953125).noLeadFormat(3)+"%）","游戏额外加快10%","游戏额外加快1%"][lv-1]}
			},
			...(()=>{
				let out = {}
				for (let i=0;i<3;i++) {out["trinity"+i] = {
					name:["碎片","火花","恒星"][i]+"三位一体",
					breakpoints:[24],
					type:"single",
					desc:function(){return ["解锁3个新的运气升级","解锁2个新的棱镜升级","解锁反物质星系"][i]}
				}}
				return out
			})(),
			weakenBindings:(()=>{
				let out = {
					name:"邮件破坏者",
					breakpoints:[25,40,55,100,120,128,144,153,160,172,180,188,200],
					type:"scaling",
					eff:function(lv=study13.rewardLevels.weakenBindings){
						function f(x,l){return Decimal.FC_NN(1,0,Math.max(l,Math.min(1,x)))}
						return {
							44:Decimal.FC_NN(1,0,(lv>=10)?(Math.log(0.6)/Math.log(0.3)):1),
							46:f(Math.log(0.45+lv/20)/Math.log(0.5),Math.log(0.75)/Math.log(0.5)),
							52:f(1-Math.floor((lv+1)/2)/10,0.5),
							53:f((lv>4)?1-Math.log10(lv-3):1,Math.log10(2)),
							57:Decimal.FC_NN(1,0,(lv>=10)?(Math.log(0.6)/Math.log(0.3)):1),
							58:f(1-Math.floor(lv/2)/15,2/3),
							103:f(1.18-lv*0.09,Math.log(40/3)/Math.log(50)),
							107:f(1.18-lv*0.09,0.64),
							155:f((76-lv)/70,32/35),
							225:f(Math.log(0.1+lv/20)/Math.log(0.25),0.5),
							234:(lv>9)?c.d0_99:c.d1,
							236:N(9-lv).min(c.d0).pow10(),
							242:Decimal.FC_NN(1,0,(lv>4)?0.1:1),
							248:f(1.05-lv/80,0.9),
							304:f(1-Math.sqrt(Math.max(lv-7,0)/12),0.5),
							306:f(Math.log(Math.max(lv-1,6)/12)/Math.log(0.5),Math.log(0.75)/Math.log(0.5)),
							312:f((2/3)**(lv-8),(Math.log(0.9)*10)/(Math.log(0.5)*9)),
							318:f((2/3)**(lv-8),Math.log10(3)/3),
							373:Decimal.FC_NN(1,0,Math.log(1-0.4/Math.min(2,Math.max(1,lv-9)**0.5))/Math.log(0.6)),
							377:Decimal.FC_NN(1,0,Math.log(1-0.4/Math.min(2,Math.max(1,lv-9)**0.5))/Math.log(0.6)),
						}
					},
					desc:function(curr,prev){
						if (curr===0) {return "所有绑定均已完全激活"}
						return "某些绑定被削弱：<br>"+Object.entries(this.eff(curr)).filter(b=>b[1].neq(c.d1)).map(b=>"<div style=\"height:16px;font-size:12px;width:225px;border-style:solid;border-radius:4px;border-width:2px;border-color:var(--binding);margin:4px;padding:4px;\"><span style=\"float:left\">"+b[0]+"</span><span style=\"float:right\">"+scaleFormat(curr,prev,x=>percentOrDiv(this.eff(x)[b[0]]))+"</span></div>").join("")
					}
				}
				out.allAffected = Object.keys(out.eff(out.breakpoints.length)).map(x=>Number(x))
				return out
			})(),
			nitro:{
				name:"硝基色素",
				breakpoints:[27,30,33,36,40,44,48,52,56,62,68,74,80,88,96,108,120,144],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.nitro){return Decimal.FC_NN(1,0,Math.max(2**(1/9),Math.min(1.26-lv/100,2**(1/3))))},
				desc:function(curr,prev){return prismaticUpgradeName("chromaOverdrive")+"每等级将色素成本增加"+scaleFormat(curr,prev,x=>this.eff(x).noLeadFormat(2))+"倍"}
			},
			wildfire:{
				name:"白色野火",
				breakpoints:[36,46,56,66,76,86,96,108,124,144],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.wildfire){return N(lv/10)},
				desc:function(curr,prev){return "白色辉光以^"+scaleFormat(curr,prev,x=>this.eff(x).format())+"效果影响星尘升级成本（当前：^"+scaleFormat(curr,prev,x=>stat.whiteLightEffect.pow(this.eff(x)).noLeadFormat(3))+"）"}
			},
			slabdrill:{
				name:"传统旧石板与时尚钻头",
				breakpoints:[56,96,144,200],
				type:"scaling",
				desc:function(curr,prev){return "第一个星尘升级可额外购买"+scaleFormat(curr,prev,x=>x)+"次"}
			},
			sacredNumber:{
				name:"电线与硫磺",
				breakpoints:[69,138,207],
				type:"composite",
				desc:function(lv){return ["运气碎片和棱镜获取量乘以420","所有反轴成本除以13.37每拥有一个反轴（总计：×"+N(13.37).pow(stat.totalAntiAxis).format()+"）","灰色辉光基数增加3.4%"][lv-1]}
			},
			radiance:{
				name:"黑色辐射",
				breakpoints:[96,104,112,122,132,144,156,170,184,200],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.radiance){return {mul:Decimal.FC_NN(1,0,Math.min(1+lv/6,2.5)),lim:N(1-lv/10).max(c.minvalue).recip().pow10().floor().pow10()}},
				desc:function(curr,prev){return "有效黑色辉光数量"+scaleFormat(curr,prev,x=>percentOrMult(this.eff(x).mul,false))+"增加，其效果上限为"+scaleFormat(curr,prev,x=>this.eff(x).lim.format())+"<br><br>（转换为黑色辉光效果"+scaleFormat(curr,prev,x=>percentOrDiv(lightEffect[7].value(g.lumens[7],x),3).replace("-","").replace("÷","×"))+"）"}
			},
			century:{
				name:"天体的百年庆典",
				breakpoints:[100,200],
				type:"composite",
				desc:function(lv){return ["反物质获取量每完成一次研究XIII乘以100（总计：×"+c.e2.pow(g.studyCompletions[13]).format()+"）","星尘获取量每完成一次研究XIII乘以100（总计：×"+c.e100.pow(g.studyCompletions[13]).format()+"）"][lv-1]}
			},
			signed8bit:{
				name:"邮件破坏者II 〜 补码",
				breakpoints:[128],
				type:"single",
				desc:function(){return "激活任意行第2列和第8列的绑定（例如52和58；192和198；242和248）将使这两个绑定弱化10%"}
			},
			zemer:{
				name:"灰色之花",
				breakpoints:[144,154,164,176,188,200,212,226,240,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.zemer){return c.d5.mul(lv)},
				desc:function(curr,prev){return "灰色辉光软上限延迟"+scaleFormat(curr,prev,x=>this.eff(x).format())+"开始<br><br>（转换为灰色辉光效果"+scaleFormat(curr,prev,x=>lightEffect[8].value(g.lumens[8],x).format(2))+"倍）"},
			},
			particleLab2:{
				name:"Stat Mark的永恒衰变链",
				breakpoints:[144,168,200,224,240],
				type:"composite",
				desc:function(lv){return (lv===5)?"解锁研究":("解锁研究"+(lv+28)+"-4和"+(lv+28)+"-12")}
			},
			forge:{
				name:"泰坦的熔炉",
				breakpoints:[150,155,160,165,170,175,180,185,190,195,200,206,212,218,224,230,236,242,248,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.forge){return {b:Decimal.fracDecibel_arithmetic(Decimal.FC_NN(1,0,70-lv/2)).pow10(),s:Decimal.FC_NN(1,0,Math.max(3360-lv*6,3350-lv*5)/3000)}},
				desc:function(curr,prev){return "钛强化的基础成本为"+scaleFormat(curr,prev,x=>this.eff(x).b.format())+"，成本增加为^"+scaleFormat(curr,prev,x=>this.eff(x).s.noLeadFormat(5))}
			},
			particleLab3:(()=>{
				let out = {
					name:"Stat Mark的细胞崛起游戏",
					breakpoints:[168,174,182,192,200],
					type:"scaling",
					eff:function(lv=study13.rewardLevels.particleLab3){
						function f(x,l){return Decimal.FC_NN(1,0,Math.min(l,Math.max(1,x)))}
						let finality12Boost = f(lv/2,12)
						return {
							r15_7:f(Math.round(100+lv*12.5-lv**2 * 0.25)/100,2),
							r15_9:f(Math.round(lv*7.5+lv**2 * 0.25)*10,1000),
							r19_7:f(lv*4,16),
							r19_9:N(1+lv**(2/3)/40,Math.log(1.225)/Math.log(1.2)),
							r22_6:Decimal.FC_NN(1,0,2.05625-(Math.max(-6.5,Math.min(lv-9.5,-1.5)))**2/40),
							r22_10:Decimal.FC_NN(1,0,0.94375+(Math.max(1.5,Math.min(lv-1.5,6.5)))**2/40),
							r25_1:Decimal.FC_NN(1,0,(lv>=4)?(Math.log(7.7)/Math.log(7)):1),
							r25_15:(lv>=4)?c.d9:c.d1,
							r41_6:finality12Boost,
							r41_10:finality12Boost,
							r44_4:finality12Boost,
							r44_12:finality12Boost,
							r47_6:finality12Boost,
							r47_10:finality12Boost
						}
					},
					desc:function(curr,prev){
						if (curr===0) {return "无研究被增强"}
						return "某些研究被增强：<br>"+Object.entries(this.eff(curr)).filter(r=>r[1].neq(c.d1)).map(r=>"<div style=\"height:16px;font-size:12px;width:225px;border-style:solid;border-radius:4px;border-width:2px;border-color:var(--binding);margin:4px;padding:4px;\"><span style=\"float:left\">"+researchOut(r[0])+"</span><span style=\"float:right\">"+scaleFormat(curr,prev,x=>percentOrMult(this.eff(x)[r[0]],2,true))+"</span></div>").join("")
					}
				}
				out.allAffected = Object.keys(out.eff(out.breakpoints.length))
				return out
			})(),
			purifier:{
				name:"封魔阵",
				breakpoints:[176,188,200,208,216,224,232,240,248,256],
				type:"scaling",
				eff:function(lv=study13.rewardLevels.purifier){return {e:Decimal.FC_NN(1,0,1+lv/5-lv**2/100),d:Decimal.FC_NN(1,0,1+lv**2/100)}},
				desc:function(curr,prev){return "普通轴腐化晚^"+scaleFormat(curr,prev,x=>this.eff(x).e.noLeadFormat(4))+"开始<br>暗轴腐化晚^"+scaleFormat(curr,prev,x=>this.eff(x).d.noLeadFormat(4))+"开始"}
			},
			hyperdrive:{
				name:"色素超光速驱动",
				breakpoints:betaActive?[200,208,216,223,230,236,242,247,252,256]:[],
				type:"scaling",
				eff:function(lvs=study13.rewardLevels.hyperdrive,lvp=g.prismaticUpgrades.chromaOverdrive){return (lvs===0)?c.d1:lvp.add(c.d1).log10().mul((Math.log10(lvs)+1)**2/100).add(c.d1)},
				desc:function(curr,prev){return "色素获取量提升到"+scaleFormat(curr,prev,x=>showFormulas?formulaFormat("1 + log(λ + 1)"+formulaFormat.mult((x===0)?c.d0:N((Math.log10(x)+1)**2/100))):this.eff(x).noLeadFormat(4))+"次幂（基于"+prismaticUpgradeName("chromaOverdrive")+"等级）"}
			},
			trinity3:{
				name:"三位一体协同",
				breakpoints:[243],
				type:"single",
				eff:function(){return [g.luckShards,g.prismatic,g.antimatter].map(x=>x.add(c.d10).log10().log10()).productDecimals().div(c.e4).add(c.d1)},
				desc:function(){return "运气碎片、棱镜和反物质获取量提升到"+(showFormulas?formulaFormat("1 + log<sup>[2]</sup>(LS + 10) × log<sup>[2]</sup>(P + 10) × log<sup>[2]</sup>(AM + 10) ÷ 10,000"):this.eff().noLeadFormat(4))+"次幂（基于运气碎片、棱镜、反物质）"}
			},
			particleLab4:{
				name:"Stat Mark的高低结构世界",
				breakpoints:[243],
				type:"single",
				eff:function(){
					let uD = unspentDiscoveries();
					if (uD.eq(c.d0)) {return c.d0;}
					let tD = g.totalDiscoveries;
					let t_u = tD.div(uD);
					return tD.div(Decimal.pow(t_u,t_u)).pow(c.d10).max(c.d10).log10().log10().pow(c.d2)
				},
				desc:function(){return "知识效果上限增加"+(showFormulas?formulaFormat("log<sup>[2]</sup>(max(ΣD ÷ (ΣD ÷ υD) ⇈ 2)<sup>10</sup>, 10))<sup>2</sup>"):this.effect().format(3))+"个百分点（基于未花费和总发现）"}
			},
			matrix:{
				get name(){return g.playerName+"的装置〜“未响应”"},
				breakpoints:[256],
				type:"single",
				desc:function(){return "解锁创建新矩阵的能力"}
			}
		}
	})(),
	rewardSelected:undefined,
	updateRewardLevels:function(){
		for (let i of study13.allRewards) {study13.prevRewardLevels[i] = study13.rewardLevels[i]}
		loop: for (let i of study13.allRewards) {
			for (let lv=study13.rewards[i].breakpoints.length;lv>0;lv--) {if (g.studyCompletions[13]>=study13.rewards[i].breakpoints[lv-1]) {study13.rewardLevels[i]=lv;continue loop}}
			study13.rewardLevels[i]=0
		}
		d.innerHTML("study13RewardContainer",study13.rewardSort().map(x=>"<div class=\"study13Reward\" onClick=\"study13.rewardSelected='"+x+"'\" onMouseover=\"study13.rewardSelected='"+x+"'\""+((study13.rewardLevels[x]===study13.prevRewardLevels[x])?"":" style=\"color:#c2a333;border-color:#c2a333;font-weight:700\"")+">"+((study13.rewards[x].type==="single")?study13.rewards[x].name:("<span style=\"float:left\">"+study13.rewards[x].name+"</span><span style=\"float:right\">"+study13.rewardLevels[x]+"</span>"))+"</div>").join(""))
	},
	rewardSort:function(){ // 确定奖励显示的顺序。最近升级的奖励在顶部，尚未解锁的奖励不显示
		let out = []
		for (let i of study13.allRewards) {if (study13.rewardLevels[i]>0) {out.push([i,study13.rewards[i].breakpoints[study13.rewardLevels[i]-1]])}}
		return out.reverse().sort((a,b)=>b[1]-a[1]).map(x=>x[0])
	},
	rewardLabel:function(id,lv){return "研究XIII奖励《"+study13.rewards[id].name+"》"+((lv===undefined)?"":("等级"+lv))}
}
study13.allBindings = Object.keys(study13.bindings).map(x=>Number(x))
d.innerHTML("span_study13MaxCompletions",betaActive?256:200)
study13.bindingRows = Math.floor(study13.allBindings.reduce((x,y)=>Math.max(x,y))/10)
study13.allRewards = Object.keys(study13.rewards)
if (!betaActive) {for (let i of study13.allRewards) {study13.rewards[i].breakpoints = study13.rewards[i].breakpoints.filter(x=>x<=200)}}
study13.rewardLevels = Object.fromEntries(study13.allRewards.map(x=>[x,0]))
study13.prevRewardLevels = Object.fromEntries(study13.allRewards.map(x=>[x,0]))