
const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletControl extends cc.Component {

	@property(cc.Label)
	speed: number = 800;


	start() {

	}

	update(dt) {
		// 移动
		this.node.y += this.speed * dt;
		// 出屏幕销毁
		if (this.node.y > 820) {
			this.node.destroy();
		}
	}
}
