import {Transport, Part} from 'tone';
import {keyMap, getSampler} from './soundMap';

export default class SoundManager {
    constructor(){
        this.eventTime = 0;
        this.resetTime = 0;
        this.events =[];
        this.reset = true
        this.part;
        
    }
    regEvents(key){
        this.startTransportTime()
        const note = keyMap()[key];
        if(note){
            if(this.reset){
                this.resetTime = parseFloat(Transport.seconds.toFixed(2))
                this.events = [];
                this.reset=false;
            }
            this.eventTime = parseFloat(Transport.seconds.toFixed(2))-this.resetTime;
            getSampler().triggerAttack(note);
            this.events.push({
                time:this.eventTime,
                note:note
            });
        }
    }
    playnow(key){
        this.startTransportTime()
        const note = keyMap()[key];
        if(note){
            getSampler().triggerAttack(note);
        }
    }
    deleteRegEvent(){
        this.reset=true;
    }
    getEvents(){
        this.reset = true
        return this.events;
    }
    playEvents(events, callback){
        this.startTransportTime();
        let eventSize = events.length
        this.part = new Part((time, value)=>{
           getSampler().triggerAttack(value.note,time)
            eventSize--;
            if(eventSize===0){
                return callback();
            }
        }, events);
        this.part.start();
    }
    stopEvents(){
        this.part.stop();
    }
    startTransportTime(){
        if(Transport.state ==='stopped'){
            Transport.start();
        }
    }

}


