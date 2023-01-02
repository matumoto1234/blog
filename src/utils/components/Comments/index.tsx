// コメントにはDisqusを使用する
// scriptでのdisqus.js読み込み以外はDisqusから提供されているコードをコピーしたもの
export const Comments: React.FC = () => {
  return (
    <>
      <div id="disqus_thread"></div>
      <script src="/src/utils/lib/disqus.js" />
      <noscript>
        Please enable JavaScript to view the
        <a href="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </a>
      </noscript>
    </>
  )
}
