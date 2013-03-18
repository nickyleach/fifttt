;(function(window, document){

	/**
	 * Listener for events coming from the child iframe 
	 * @param  {Event} e
	 */
	function iframeListener(e){
		if(event.origin != "http://127.0.0.1:3000") return;

		if(event.data == 'domready'){
			iframe.contentWindow.postMessage(getText(), 'http://127.0.0.1:3000/');
			iframe.style.display = 'block';
		} else if(event.data == 'close'){
			iframe.parentNode.removeChild(iframe);
			window.removeEventListener('message', iframeListener);
		} else if(event.data == 'hide'){
			iframe.style.display = 'none';
		}
	}

	/**
	 * Finds the selected text on the page
	 * @return {string}
	 */
	function getText(){
		var text = "";
		if(typeof window.getSelection() != 'undefined'){
			text = window.getSelection().toString();
		} else if(typeof document.selection != 'undefined'){
			text = document.selection.createRange().text;
		}

		return text;
	}

	/**
	 * If is no text selected, don't bother loading the iframe
	 */
	if(!getText()) return alert('No text selected!');

	/**
	 * Listen to events coming from the child iframe (FIFTTT)
	 */
	if(typeof window.addEventListener != 'undefined'){
		window.addEventListener('message', iframeListener, false);
	} else if (typeof window.attachEvent != 'undefined'){
		window.attachEvent('onmessage', iframeListener);
	}

	/**
	 * Insert the iframe into the current document
	 */
	var iframe = document.createElement('iframe');
	iframe.src = 'http://127.0.0.1:3000/services';
	iframe.style.cssText = 'background:#FFF; position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:300px; border:1px solid #EEE; margin:0; padding:0; overflow:hidden; z-index:999999; display:none; box-shadow:0 0 1em;';
	document.body.appendChild(iframe);

})(window, document);