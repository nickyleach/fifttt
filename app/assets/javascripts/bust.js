;(function(window, document){
	/**
	 * Frame buster that is used if the bookmarklet is used when not authenticated
	 * @todo Figure out the assets pipeline for more sane conditional CSS / JS loading
	 */
	if(/\/services/.test(window.location.pathname)) return;
	
	if(top !== this){
		top.location.href = this.location.href;
		return
	}

})(window, document);