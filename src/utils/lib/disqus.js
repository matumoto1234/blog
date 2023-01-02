/**
 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */

var disqus_config = function () {
  this.page.url = location.href // Replace PAGE_URL with your page's canonical URL variable

  const crumbs = location.href.split('/')
  this.page.identifier = crumbs[crumbs.length - 1] // Replace PAGE_IDENTIFIER with your page's unique identifier variable
}
;(function () {
  // DON'T EDIT BELOW THIS LINE
  var d = document,
    s = d.createElement('script')
  s.src = 'https://matumoto1234.disqus.com/embed.js'
  s.setAttribute('data-timestamp', +new Date())
  ;(d.head || d.body).appendChild(s)
})()
