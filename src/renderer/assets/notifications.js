(function(){
  const container=document.createElement('div');
  container.id='notification-container';
  Object.assign(container.style,{
    position:'fixed',
    top:'1rem',
    right:'1rem',
    display:'flex',
    flexDirection:'column',
    gap:'0.5rem',
    zIndex:'1000',
    pointerEvents:'none'
  });

  document.addEventListener('DOMContentLoaded',()=>{
    document.body.appendChild(container);
  });

  function createNotification(status){
    const div=document.createElement('div');
    div.style.background='rgba(0,0,0,0.8)';
    div.style.color='#fff';
    div.style.padding='0.5rem 1rem';
    div.style.borderRadius='0.25rem';
    div.style.minWidth='240px';
    div.style.pointerEvents='auto';
    const text=document.createElement('div');
    text.textContent=status.status||'';
    text.style.fontSize='0.8rem';
    div.appendChild(text);
    const progress=document.createElement('div');
    progress.style.height='4px';
    progress.style.background='#555';
    progress.style.marginTop='4px';
    progress.style.borderRadius='2px';
    const bar=document.createElement('div');
    bar.style.height='100%';
    bar.style.width=`${status.progress||0}%`;
    bar.style.background='#4ade80';
    bar.style.borderRadius='2px';
    progress.appendChild(bar);
    div.appendChild(progress);
    container.appendChild(div);
    return{div,bar,text};
  }

  let current=null;
  if(window.electronAPI){
    window.electronAPI.receive('download-progress',status=>{
      if(!container.parentElement)document.body.appendChild(container);
      if(!current){
        current=createNotification(status);
      }else{
        if(status.status)current.text.textContent=status.status;
        if(status.progress!==undefined){
          current.bar.style.width=`${Math.min(Math.max(status.progress,0),100)}%`;
        }
      }
      if(status.progress>=100){
        setTimeout(()=>{
          if(current){
            container.removeChild(current.div);
            current=null;
          }
        },3000);
      }
    });
  }
})();
