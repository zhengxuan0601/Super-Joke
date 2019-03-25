import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		user:"",
		$msg:""  // 用于显示提示内容
	},
	mutations:{
		logined(state,data){// userInfo传入登录成功之后的用户信息
			console.log(data)
			state.user = data.data;
			data.fn();
		},
		quit(){
			state.user = "";
		}
	},
	actions:{
		
	}
})
