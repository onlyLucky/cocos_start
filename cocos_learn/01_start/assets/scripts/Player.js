

cc.Class({
    extends: cc.Component,

    properties: {
			// 主角跳跃高度
			jumpHeight: 0,
			// 主角跳跃持续时间
			jumpDuration:0,
			// 最大移动速度
			maxMoveSpeed: 0,
			// 加速度
			accel: 0
    },

		// 处理主角跳跃
		runJumpAction(){
			// 跳跃上升  缓动（cc.tween）系统  by() 方法的作用是对属性进行相对值计算，表示的是变化值
			var jumpUp = cc.tween().by(this.jumpDuration, {y: this.jumpHeight},{easing: 'sineOut'})
			// 下落
			var jumpDown = cc.tween().by(this.jumpDuration,{y: -this.jumpHeight},{easing:'sineIn'})

			// 创建一个缓动，按 jumpUp、jumpDown 的顺序执行动作
			var tween = cc.tween().sequence(jumpUp,jumpDown)
			return cc.tween().repeatForever(tween)
		},
    // 监听键盘事件响应函数
		onKeyDown(event){
			switch(event.keyCode){
				case cc.macro.KEY.a:
					this.accLeft = true;
					break;
				case cc.macro.KEY.d:
					this.accRight = true;
					break;
			}
		},
		onKeyUp(event){
			switch(event.keyCode){
				case cc.macro.KEY.a:
					this.accLeft = false;
					break;
				case cc.macro.KEY.d:
					this.accRight = false;
					break;
			}
		},
		// onLoad 方法会在场景加载后立刻执行
    onLoad () {
			console.log('onLoad')
			var jumpAction = this.runJumpAction();
			cc.tween(this.node).then(jumpAction).start()

			// 加速度方向开关
			this.accLeft = false;
			this.accRight = false;
			// 主角当前水平方向速度
			this.xSpeed = 0

			// 初始化键盘监听
			cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this)
			cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)
		},

    start () {
			
    },

		// update 会在场景加载后每帧调用一次
		update(dt){
			// 根据当前加速度方向每帧更新速度
			if (this.accLeft) {
				this.xSpeed -= this.accel * dt;
			}
			else if (this.accRight) {
				this.xSpeed += this.accel * dt;
			}

			// 限制主角的速度不能超过最大值
			if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
				// if speed reach limit, use max speed with current direction
				this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
			}

			// 根据当前速度更新主角的位置
			this.node.x += this.xSpeed * dt;
		},

    onDestroy () {
			// 取消键盘输入监听
			cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this)
			cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)
		}
});
