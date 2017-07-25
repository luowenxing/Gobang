


function extend(dest,src) {
	for(var property in src) {
		if(src.hasOwnProperty(property)) {
			dest[property] = src[property]
		}
	}
}

function findParent($node,$root,condition) {
	while($node && ($node != $root)) {
		if(condition($node)) {
			return $node
		}
		$node = $node.parentNode
	}
	return null
}

function arrayWatch(callback) {
    var arrayMethods = [];
    ['pop','push'].forEach(function(method){
        var original = Array.prototype[method];
        arrayMethods[method] = function() {
            // this 指向可通过下面的测试看出
            var result = original.apply(this, arguments)
            callback(result)
            return result
        };
    })
    return arrayMethods
}

