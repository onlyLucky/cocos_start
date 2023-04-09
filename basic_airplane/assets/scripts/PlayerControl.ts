

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerControl extends cc.Component {

	start() {
		// 移动
		this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
			this.node.setPosition(event.getLocation())
		})
	}

	update(dt) { }
}
