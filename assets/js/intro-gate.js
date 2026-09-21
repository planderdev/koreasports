// Runs before first paint (classic script in <head>) so a returning visitor never sees the intro flash.
(function(){try{if(!/[?&]intro=1(&|$)/.test(location.search)&&sessionStorage.getItem('kwsa-intro-seen')==='1')document.documentElement.classList.add('intro-seen');}catch(e){}})();
