;(function(window, document, $){
	/**
	 * This code should only be executed on the /services page
	 * @todo Figure out the assets pipeline for more sane conditional CSS / JS loading
	 */
	if(!/\/services/i.test(window.location.pathname)) return;

	/**
	 * Alert the parent window that we've fully loaded the iframe
	 */
	$(function(){
		window.parent.postMessage('domready', '*');	
	});

	/**
	 * Wait for the parent window to deliver the selected text
	 */
	$(window).on('message', function(e){
		$('form textarea').val(e.originalEvent.data);
	});

	/**
	 * When the user doesn't want to post the text, alert the parent window so that
	 * it can remove this frame
	 */
	$(document).on('reset', 'form', function(){
		window.parent.postMessage('close', '*');
	});

	/**
	 * Submit the selected text back to the app and alert the parent window so that
	 * it can hide the frame
	 */
	$(document).on('submit', 'form', function(e){
		window.parent.postMessage('hide', '*');

		/**
		 * We will also trigger the parent window to remove the frame once the form
		 * has been submitted
		 */
		$(window).on('unload', function(e){
			window.parent.postMessage('close', '*');
		});
	});

})(window, document, jQuery);