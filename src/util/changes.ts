export function getActions(arr1,arr2){
    let Arr1 = getData(arr1);
    let Arr2 = getData(arr2);
    for (let i = 0; i < Arr2.length; i++) {
        let found = Arr1.find(item => item.to_hash === Arr2[i].hash);
        if (found) {
          Arr2[i].action = found.action;
          let fdir = found.path.split('/')        
          Arr2[i].dir = fdir > 2?fdir.filter((item,index)=>{return index<fdir.length-1} ).join(''):fdir[0];
        }
      }
}

function getData(arr){
  return arr.data?arr.data:arr
}