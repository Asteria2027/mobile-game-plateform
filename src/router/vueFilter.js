import Vue from 'vue';
Vue.filter('sum',function(value){
	if(value){
		var myvalue = Math.floor(value/100);
		var arrry = [];
		for(var i = 1;i<= myvalue;i++){
			arrry.push(i);
		}
		return arrry;
	}
})
