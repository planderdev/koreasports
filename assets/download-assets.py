import urllib.request,pathlib,concurrent.futures
files={'swiper.js':'swiper@12.0.3/swiper-bundle.min.js','swiper.css':'swiper@12.0.3/swiper-bundle.min.css','aos.js':'aos@2.3.4/dist/aos.js','aos.css':'aos@2.3.4/dist/aos.css','gsap.js':'gsap@3.13.0/dist/gsap.min.js','ScrollTrigger.js':'gsap@3.13.0/dist/ScrollTrigger.min.js','lenis.js':'lenis@1.3.11/dist/lenis.min.js','remixicon.css':'remixicon@4.6.0/fonts/remixicon.css','remixicon.woff2':'remixicon@4.6.0/fonts/remixicon.woff2','remixicon.woff':'remixicon@4.6.0/fonts/remixicon.woff','PretendardVariable.woff2':'pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2'}
def get(p):
 n,u=p
 try:
  b=urllib.request.urlopen('https://cdn.jsdelivr.net/npm/'+u,timeout=30).read();pathlib.Path('assets/vendor/'+n).write_bytes(b);return n,len(b)
 except Exception as e:return n,str(e)
print(list(concurrent.futures.ThreadPoolExecutor().map(get,files.items())))
imgs={'golf':'1671904942522-8e2a0dbb709f','soccer':'1431324155629-1a6deb1dec8d','horse':'1589400867230-3491ceee2934'}
for name,id in imgs.items():
 b=urllib.request.urlopen('https://images.unsplash.com/photo-'+id+'?w=1800&q=85&fm=webp&fit=crop').read();pathlib.Path('assets/images/'+name+'.webp').write_bytes(b);print(name,len(b))
