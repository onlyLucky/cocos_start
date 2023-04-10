const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyControl extends cc.Component {



	start() {

	}

	update(dt) { }

	// 死亡
	die() {
		cc.loader.loadRes("enemy0_die")
		this.node.destroy();
	}
}
