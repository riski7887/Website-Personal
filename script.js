(function(){
  var home=document.getElementById('top');
  var views={'project-mobil-bekas':document.getElementById('view-mobil-bekas'),'project-merchandise':document.getElementById('view-merchandise')};
  var titles={'project-mobil-bekas':'Aplikasi Pemilihan Mobil Bekas','project-merchandise':'Aplikasi Penjualan Merchandise'};
  var baseTitle=document.title;
  function route(){
    var h=decodeURIComponent(location.hash.slice(1));
    var v=views[h];
    Object.keys(views).forEach(function(k){views[k].hidden=(views[k]!==v)});
    home.hidden=!!v;
    if(v){window.scrollTo(0,0);document.title=titles[h]+' | Rizki Ashar Siregar'}
    else{
      document.title=baseTitle;
      var t=h&&document.getElementById(h);
      if(t)t.scrollIntoView();else window.scrollTo(0,0);
    }
  }
  window.addEventListener('hashchange',route);route();

  var items=[],i=0;
  var lb=document.getElementById('lb'),img=document.getElementById('lbi'),cap=document.getElementById('lbc'),st=document.getElementById('lbs');
  function show(n){
    i=(n+items.length)%items.length;var it=items[i];
    lb.classList.remove('zoom');st.scrollTop=0;st.scrollLeft=0;
    var th=it.querySelector('img');img.src=th.src;img.alt=it.dataset.cap;
    cap.innerHTML='';cap.appendChild(document.createTextNode(it.dataset.no+' - '+it.dataset.cap));
    var s=document.createElement('small');s.textContent=(i+1)+' / '+items.length;cap.appendChild(s);
  }
  function open(list,n){items=list;show(n);lb.classList.add('open');document.body.style.overflow='hidden'}
  function close(){lb.classList.remove('open','zoom');document.body.style.overflow=''}
  Object.keys(views).forEach(function(k){
    var list=[].slice.call(views[k].querySelectorAll('.gitem'));
    list.forEach(function(b,n){b.addEventListener('click',function(){open(list,n)})});
  });
  document.getElementById('lbx').addEventListener('click',close);
  document.getElementById('lbp').addEventListener('click',function(){show(i-1)});
  document.getElementById('lbn').addEventListener('click',function(){show(i+1)});
  img.addEventListener('click',function(){lb.classList.toggle('zoom');st.scrollTop=0;st.scrollLeft=0});
  st.addEventListener('click',function(e){if(e.target===st)close()});
  var x0=null,y0=null;
  st.addEventListener('touchstart',function(e){if(lb.classList.contains('zoom'))return;x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  st.addEventListener('touchend',function(e){
    if(x0===null)return;var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)show(dx<0?i+1:i-1);
  },{passive:true});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')show(i-1);
    if(e.key==='ArrowRight')show(i+1);
  });
})();
