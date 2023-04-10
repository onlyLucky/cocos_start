

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

	@property(cc.Prefab)
	bulletPre: cc.Prefab = null;

	start() {
		// 移动
		this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
			this.node.setPosition(event.getLocation())
		});
		// 攻击 计时器
		this.schedule(() => {
			// 创建子弹
			let bullet = cc.instantiate(this.bulletPre);
			// 设置父物体
			bullet.setParent(cc.director.getScene());
			// 设置子单位置
			bullet.x = this.node.x;
			bullet.y = this.node.y + 60;
		}, 0.5);
	}

	update(dt) { }
}
