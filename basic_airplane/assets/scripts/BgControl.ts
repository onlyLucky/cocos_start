
const { ccclass, property } = cc._decorator;

@ccclass
export default class BgControl extends cc.Component {


	start() {
		console.log('start')
	}

	update(dt) {
		for (let bgNode of this.node.children) {
			// 移动像素 帧 -> 秒
			bgNode.y -= 50 * dt
			if (bgNode.y < - 850) {
				bgNode.y += 852 * 2;
			}
		}
	}
}

