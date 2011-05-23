var snipsSelected = function snipsSelected ( info,tab ) {
	var snips_id = localStorage['snipsid']

	/*get: title,href,selection*/
	var title = tab.title,
		href = info.pageUrl
	
	var selection = info.selectionText
	if(!selection) {
		console.log("nothing selected!")
		
		if(info.mediaType == 'image') {
			selection = '<img src="'+info.srcUrl+'"/>'
		}
	}
	
	if (!selection) {
		console.log('cannot create snips, selection empty!')
		return
	}
	
	console.log(title + ", " + href + ", '" + selection + "'")
	var e = encodeURIComponent;
	var p = 'id=' + e(snips_id) + '&u=' + e(href) + '&t=' + e(title) + '&s=' + e(selection.length < 10240 ? selection : '');
	console.log('sending: ' + p)
	
	var formData = new FormData()
	formData.append('p',p)
	
	var xhr = new XMLHttpRequest()
	xhr.open('POST','http://snips.co/save')
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			console.log('done sending!')
			
			console.log(xhr.status)
			console.log(xhr.responseType)
			console.log(xhr.responseText)
			
			chrome.tabs.executeScript(null,{
				file: 'show.js'
			})
		}
	}
	xhr.send(formData)
}

var snipsElm = chrome.contextMenus.create( {
	'title': 'Snips selected!',
	'contexts': ['selection','image'],
	'onclick': snipsSelected
}, function() {
	console.log("snip this loaded - ", chrome.extension.lastError)
})
