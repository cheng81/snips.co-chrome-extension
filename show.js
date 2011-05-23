var d = document
var div = d.createElement('div')
div.innerHTML = 'Snips created!'
div.style.position = 'fixed'
div.style.top = '100px'
div.style.left = '100px'
div.style.border = 'solid 2px #000'
div.style.background = '#EFEFEF'
div.style.padding = '1em'
d.getElementsByTagName('body') [0] .appendChild(div)

setTimeout(function() {
	d.getElementsByTagName('body') [0] .removeChild(div)
},1500)