import {getSamplesRef, getSampleMap} from './loadSamples'
import {Sampler} from 'tone'

let sampler;
let charToKey;

export const createSampler =(callback)=>{
    const arrakeys = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    let count = -1
    let fullKeys=[];
    let mapSample={};
    for(let i = 0; i < 127; i++){
        if(i%12===0){
            count++
        }
        fullKeys[i]= arrakeys[i%12]+count
    }
    charToKey={}
    const sampleRef = getSamplesRef();
    const sampleMap = getSampleMap();
    for(var [key,value] of Object.entries(sampleMap)){
        if(value.sample){
            mapSample[fullKeys[key]] = sampleRef[value.sample];
            charToKey[key]=fullKeys[key];
        }
    }
    sampler = new Sampler(mapSample, ()=>{
        callback();
    }).toMaster();
    sampler.volume.value=-10;
}

export const keyMap = ()=> charToKey
export const getSampler =()=> sampler





