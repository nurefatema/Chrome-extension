const btn=document.getElementById("btn")
const inputEl=document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
const btnDel=document.getElementById("btn-d")
const btnTab=document.getElementById("btn-t")
let arTabs=[]

let store=JSON.parse(localStorage.getItem("myTracks"))
if(store){
    arTabs=store
    render()
}
btnDel.addEventListener("dblclick",function(){
    localStorage.clear()
    arTabs=[]
    render()
})

btn.addEventListener("click",function(){
    arTabs.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myTracks",JSON.stringify(arTabs))
    render()
})

btnTab.addEventListener("click",function(){
    chrome.tabs.query({active: true,currentWindow: true},function(tabs){
        arTabs.push(tabs[0].url)
        localStorage.setItem("myTracks",JSON.stringify(arTabs))
        render()
    })

})

function render(){
    let item=""
    for(let i=0; i<arTabs.length;i++){
        item+=`<li>
               <a target='_blank' href='${arTabs[i]}'>${arTabs[i]}</a>
               </li>`
    }
    ulEl.innerHTML=item
}