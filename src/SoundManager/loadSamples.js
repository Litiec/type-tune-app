import {firebase} from '../firebase/firebase';


let sampleRef;
let sampleMap;
const storage = firebase.storage();

export const loadSamples = (callback)=>{
    sampleRef ={}
    sampleMap ={}
    storage.ref().child('samples').listAll().then((res)=>{
        res.items.forEach((itemRef)=>{
            storage.ref().child(itemRef.fullPath).getDownloadURL().then((url)=>{
                sampleRef[itemRef.name] = url
            }).catch((error)=>{
                console.log(error)
            })
        })
    }).then(()=>{
        storage.ref().child('sampleMap/soundMap.json').getDownloadURL().then((url)=>{
            fetch(url).then((res)=>res.json()).then((data)=>{
                sampleMap= data;
                callback();
            })
        })
    })
}

export const getSamplesRef = ()=>{
    return sampleRef;
}
export const getSampleMap =()=>{
    return sampleMap;
}