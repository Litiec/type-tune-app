import React from 'react';
import {connect} from 'react-redux';
import {startGetGuessingComment,deletingGuessingComment} from '../actions/guessing'
import SoundManager from '../SoundManager/SoundManager';

class GuessingGame extends React.Component{
    constructor(props){
        super(props) 
        this.state={
            text:'',
            textguessing : '',
            isPlaying:false,
            nrClue:'',
            msg:'',
            disabled:false
        };
        this.soundmanager;
    }
    componentDidMount(){
        if(this.props.match.params.id){
            this.props.dispatch(startGetGuessingComment(this.props.match.params.id)).then(()=>{
                let textguessing;
                if(this.props.comment.text){
                    for(let i = 0; i<this.props.comment.text.length;i++){
                        if(!textguessing){
                            textguessing='_'
                        }else{
                            textguessing+='_'
                        }
                    }
                    this.setState(()=>({
                        textguessing
                    }))
                    this.soundmanager = new SoundManager();
                }else{
                    this.setState(()=>({
                        disabled:true
                    }))
                }
            })
        }
    }
    replaceAt =(input,search,replace,start, end)=>{
        return input.slice(0,start)+ input.slice(start,end).replace(search,replace)+input.slice(end)
    }
    onTextChange =(e)=>{
        const text = e.target.value;
        if(text.charAt(text.length-1)=== this.props.comment.text.charAt(text.length-1)){
            this.setState(()=>({
                text
            }))
            const textguessing = this.replaceAt(this.state.textguessing,'_',text.charAt(text.length-1),text.length-1, text.length)
            this.setState(()=>({
                textguessing
            }))
        }
        this.soundmanager.playnow(text.charCodeAt(text.length-1))
        if(text===this.props.comment.text){
            this.setState(()=>({
                msg:'CONGRATULATION',
                disabled:true
            }))
            this.props.dispatch(deletingGuessingComment(this.props.match.params.id));
            this.soundmanager=undefined
        }
    }
    handlePlayer=()=>{
        if(!this.state.isPlaying){
            this.soundmanager.playEvents(this.props.comment.events,()=>{
                this.setState(()=>({isPlaying:false}))
            });
            this.setState(()=>({isPlaying:true}));
        }else{
            this.soundmanager.stopEvents();
            this.setState(()=>({isPlaying:false}));
        }
    }
    giveClue =()=>{
        let nrClue = this.state.nrClue;
        let textguessing= this.state.textguessing;
        let count = 0
        if(nrClue.length<3){
            const guessing = this.props.comment.text;
            let findChar=guessing.charAt(Math.floor(Math.random()*guessing.length));
            while(nrClue.indexOf(findChar)!==-1&&count<20){
                findChar=guessing.charAt(Math.floor(Math.random()*guessing.length));
                count++;
            }
            nrClue+=findChar;
            console.log(nrClue)
            for(let i = 0; i <guessing.length;i++){
                if(findChar===guessing.charAt(i)){
                textguessing=this.replaceAt(textguessing,'_',findChar,i,i+1)
                }
            }
            this.setState(()=>({
                textguessing,
                nrClue
            }))
        }else{
            console.log('DONE')
        }
    }
    render(){
        return(
            <div className="guessingGame">
                <h2 className="heading-secondary">Guessing Game</h2>
                <div className="guessingGame__textBox">
                <textarea className="comment-box u-margin-bottom-small"
                maxLength="100" cols="30" rows="3" 
                autoFocus
                value = {this.state.text}
                onChange={this.onTextChange}
                disabled={this.state.msg||this.state.disabled}
                ></textarea>
                <button  className="btn btn--blue" disabled={this.state.disabled} onClick={this.handlePlayer}>{this.state.isPlaying ? 'Stop':'Play'}</button>
                <button className="btn btn--purple" disabled={this.state.nrClue.length===3||this.state.disabled}onClick={this.giveClue}>Clue</button>
                {this.state.textguessing && <p className="guessingGame__text">{this.state.textguessing}</p>}
                {this.state.msg && <p className="heading-secondary">{this.state.msg}</p>}
                </div>
            </div>
        );
    }
} 
const mapStateToProps =(state,props)=>{
    return{
        comment:state.guessing
    }
}
export default connect(mapStateToProps)(GuessingGame);
