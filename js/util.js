


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
