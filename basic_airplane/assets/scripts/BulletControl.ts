import EnemyControl from "./EnemyControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletControl extends cc.Component {

	@property
	speed: number = 800;


	start() {
		cc.director.getCollisionManager().enabled = true;
	}

	update(dt) {
		// 移动
		this.node.y += this.speed * dt;
		// 出屏幕销毁
		if (this.node.y > 820) {
			this.node.destroy();
		}
	}



	onCollisionEnter(other) {
		console.log(other, 'other')
		// 碰撞到敌人，销毁自己，让敌人死亡
		if (other.tag == 1) {
			// 销毁敌人
			other.getComponent(EnemyControl).die();
			// 销毁自己
			this.node.destroy();
		}
	}
}
