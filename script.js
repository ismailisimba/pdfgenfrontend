const server = "https://script.google.com/macros/s/AKfycbzqvuHfz2KfMNR3pDsb97T3bk4EC_SbLuFq2tYiAiqJMXDP6r0XXm348kJISVaZQDVP/exec";
const defobj = {"parameters":{"paraOne":"alliancepdf"},"postData":{"contents":JSON.stringify({
    "name": "Ismaili Amir Simba",
    "day": "22-02-2023",
    "policyterm": "25 Years",
    "age": "29",
    "suminsured": "1,000,000",
    "premium": "1,000,000",
    "totalpremium": "1,000,000",
    "revbonus": "1,000,000",
    "termbonus": "1,000,000",
    "totalmatval": "1,000,000",
    "cashback": "1,000,000"
  })}};
const butt = document.getElementById("getPrem");
let publicDateVar = 0;



Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});



window.onload = () => {
    const dateVar = new Date().toDateInputValue();
    publicDateVar = dateVar;
    const arr = dateVar.toString().split("-");
    document.getElementById('day').value = arr[2]+"-"+arr[1]+"-"+arr[0];
    addSubmitEvent();
}




function addSubmitEvent (){
    butt.addEventListener("click",async(e)=>{
        const vals = e.target.parentNode.parentNode.querySelectorAll("input");
        const obj = {};
        vals.forEach(val=>{
            obj[val.name] = val.value;
        })
        //defobj.postData.contents = obj;
        console.log(obj)
        startAnimation();
        fetchInfoWithFilter(JSON.stringify(obj),"alliancepdf").then((e)=>{
            stopAnimation();
            const linkSource = `data:application/pdf;base64,${e}`;
            const downloadLink = document.createElement("a");
            const space = document.createElement("br");
            downloadLink.href = linkSource;
            downloadLink.innerText = "Download Pdf";
            downloadLink.download = "test.pdf";
            //downloadLink.click();
            document.querySelectorAll(".premiumprice")[0].innerHTML = "";
            document.querySelectorAll(".premiumprice")[0].innerHTML = "Download your pdf at the following link. ";
            document.querySelectorAll(".premiumprice")[0].appendChild(space);
            document.querySelectorAll(".premiumprice")[0].appendChild(downloadLink);
        })
    })
}







async function fetchInfoWithFilter (data,para) {

    data = JSON.stringify(data);
      
  
    var myRequest = new Request(server+"?paraOne="+para);
    
  
         
    const returnVal = await fetch(myRequest, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        //'Content-Type': 'text/txt'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data // body data type must match "Content-Type" header
    })
          .then(function(response) {
            if (!response.ok) {
              
              throw new Error("HTTP error, status = " + response.status);
              
            }
            
            return response.text();
          })
          .then(function(myBlob) {
            
            var cloudObject = myBlob;
            
          
            return cloudObject;
            
          })
          .catch(function(error) {
           console.log(error.message)
          });
  
        
         // document.querySelectorAll(".mycolumns")[1].innerHTML = returnVal;
          return returnVal; 
  
      // tempDiv.innerHTML = Object.entries(localVar.values)[0][1][3] ;   
  };




  function  startAnimation(){
      butt.style.visibility = "collapse";
      document.getElementById("loadanime").style.visibility = "visible";
  };


async  function  stopAnimation(){
    butt.style.visibility = "visible";
    document.getElementById("loadanime").style.visibility = "collapse";
};




function showCustomPopUp(text){
    const myText = document.createElement("span");
    myText.id = "span";
    const mom = document.querySelectorAll("#customalert")[0];
    myText.innerHTML = text;

    const stale = mom.querySelectorAll("#span");
    if(stale.length>0){
        stale.forEach(ele=>{ele.remove()});
    }

    mom.appendChild(myText);
    mom.style.display = "block";
    document.getElementById("closebutton_calThree211810").addEventListener("click",()=>{
        mom.style.display = "none";
    })
}


function addDateEventListeners(){
    const dayEl = document.getElementById("day");
    const monthEl = document.getElementById("month");
    dayEl.addEventListener("input",(e)=>{
        if(e.target.value.length<=1){

        }else if(e.target.value<1||e.target.value>31){
            e.target.value=1;
            showCustomPopUp("Only Day 1 to 31 are supported");
        }
    })

    monthEl.addEventListener("input",(e)=>{
        if(e.target.value.length<=1){

        }else if(e.target.value<1||e.target.value>12){
            e.target.value=1;
            showCustomPopUp("Only Month 1 to 12 are supported");
        }
    })
}