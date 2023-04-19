cc.Class({
	extends: cc.Component,

	/* 
	default：设置属性的默认值，这个默认值仅在组件第一次添加到节点上时才会用到
	type：限定属性的数据类型，详见 CCClass 进阶参考：type 参数
	visible：设为 false 时，不在 属性检查器 中显示该属性
	serializable：设为 false 则不序列化（保存）该属性
	displayName：在 属性检查器 中显示指定的属性名
	tooltip：在 属性检查器 中添加属性的 tooltip
	*/

	/* 
	项目使用js 在安装更新vscode 插件，还没有代码提示，可以将项目里面的tsconfig.json文件删除或重命名其他文件
	*/
	properties: {
		// 这个属性引用了星星预制资源
		startPrefab: {
			default: null,
			type: cc.Prefab,
		},
		// 星星产生后消失时间的随机范围
		maxStarDuration: 0,
		minStarDuration: 0,
		// 地面节点，用于确定星星生成的高度
		ground: {
			default: null,
			type: cc.Node
		},
		// Player 节点，用于获取主角弹跳的高度，和控制主角行动开关
		player: {
			default: null,
			type: cc.Node
		}
	},

	// LIFE-CYCLE CALLBACKS:

	onLoad() {
		// 获取地平面的 y 轴坐标
		this.groundY = this.ground.y + this.ground.height / 2;
		// 生成一个新的星星
		this.spawnNewStar();
	},
	spawnNewStar() {
		// 使用给定的模版在场景中生成一个新节点
		var newStar = cc.instantiate(this.startPrefab);
		// 将新增的节点添加到canvas节点下面
		this.node.addChild(newStar);
		// 为星星设置一个随机位置
		newStar.setPosition(this.getNewStartPosition());
	},

	getNewStartPosition() {
		var randX = 0;
		// 根据地平面位置和主角跳跃高度，随机得到一个星星的y
		var randY = this.groundY + matchMedia.random() * this.player.getComponent("Player").jumpHeight + 50;
		// 根据屏幕宽度，随机得到一个星星的x
		var maxX = this.node.width / 2
		randX = (Math.random() - 0.5) * 2 * maxX;
		// 返回星星位置

		return cc.v2(randX, randY)
	},

	start() { },

	// update (dt) {},
});
