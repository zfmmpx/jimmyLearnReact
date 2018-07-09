var object = {
	data: [1, 2, 3],
	dataDouble: [1, 2, 3],
	double: function() {
		console.log("this inside of outerFn double()");
		console.log(this);
		return this.data.map(function(item) {
			console.log(this); // 这里的this指什么
			return item * 2;
		});
	},
	doubleArrow: function() {
		console.log("this inside of outerFn doubleArrow()");
		console.log(this);
		return this.dataDouble.map(item => {
			console.log(this);
			return item * 2;
		});
	}
}

object.double();
object.doubleArrow();