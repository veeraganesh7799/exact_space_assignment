import React,{useState,useEffect} from 'react'
import {v4} from 'uuid'
import {AiOutlinePlusCircle,AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {BsEmojiWink} from 'react-icons/bs'
import Picker from 'emoji-picker-react'
import './index.css'

const Home = () => {

    const getUserMsgs = JSON.parse(localStorage.getItem('userMsgs'))
    const [userInput, setUserInput] = useState('')
    const [userMsg, setUserMsg] = useState(getUserMsgs !== null ? getUserMsgs : [])
    const [likesCount, setLikesCount ] = useState(null)
    const [showPicker, setShowPicker] = useState(false)
    const [displayUsers, setDisplayUsers] = useState(null)
    

    const emojiHandler = (e, emoji) => setUserInput((prevInput) => prevInput + emoji.emoji);

    const timeHandler = () => {
        const date = new Date().toLocaleTimeString().split(":").slice(0,2).join(":")
        return date
    }

    const userList = ["Alan","Bob","Carol","Dean","Elin"]
    const backgroundColors = ["blue",'orange','violet','light_blue',"red"]

    const userNameHandler = () => {
         const userListLength = userList.length - 1 
        const name = userList[Math.ceil(Math.random()*userListLength)]
        return name
    }

    const displayUsersList = () => {
        return(
            <ul className='user-lists'>
                {userList.map(each=>(
                    <>
                    <li key={each} className='item-name' onClick={()=>setUserInput(userInput+each)}>{each}</li>
                   
                    </>
                ))}
            </ul>
        )
    }


    const handlerLikesCount = id => {
        const updateCount = userMsg.map(each=>{
            if(each.id===id){
                return {...each, likesCount: each.likesCount + 1}
            }
            return each
        })
        setUserMsg(updateCount)
    }

    useEffect(()=>{
        localStorage.setItem("userMsgs",JSON.stringify(userMsg))
        document.addEventListener('keydown',detectKeyDown,true)
    },[userMsg],[])
    
    const detectKeyDown = (event) => {
        if(event.key==="@"){
            setDisplayUsers(true)
        }else{
            setDisplayUsers(false)
            setShowPicker(false)
        }
    }
    

    const submitHandler = event => {
        event.preventDefault()
        const data = {
            id: v4(),
            time: timeHandler(),
            userName: userNameHandler(),
            background: backgroundColors[Math.ceil(Math.random()*backgroundColors.length-1)],
            userInput,
            likesCount
        }
        if (userInput.length) setUserMsg([...userMsg,data])
        setUserInput('')
        setDisplayUsers(false)
    }

  return (
    <div className='main-container'>
      <div className='side-bar-container'>
        <div className='profile-container'>
            <div className='profile-initial-container'>
               <p className='initial'>RR</p>
            </div>
            <div className='profile-name-container'>
                <h4 className='name'>Rolande Raimondi</h4>
                <p className='description'>Research Nurse</p>
            </div>
        </div>
        <div className='middle-side-bar-container'>
            <div className='conversation-container'>
                <p className='conversation-heading'>Conversations</p>
                <AiOutlinePlusCircle className='plus-icon'/>
            </div>
            <div className='list-items'>
                <div className='initial-container'>
                    <p>#</p>
                </div>
                <p className='items-name'>Poland Office</p>
            </div>
            <div className='list-items active'>
                <div className='initial-container active-s'>
                    <p>#</p>
                </div>
                <p className='items-name '>Introductions</p>
            </div>
            <div className='list-items'>
                <div className='initial-container'>
                    <p>#</p>
                </div>
                <p className='items-name'>India Office</p>
            </div>
        </div>
      </div>
      <div className='chat-section-container'>
        <div className='header-container'>
        <div className='header'>
            <h4 className='name'>Introductions</h4>
            <p className='description'>This Channel Is For Company Wide Chatter</p>
        </div>
        <div className='msgs-container'>
            <p className='description-count'>{userMsg.length} | 100</p>
            <CgProfile className='profile-icon'/>
        </div>
        </div>
        <hr/>
        <div className='chat-sroll-container'>
        <div className='chat-display-container'>
            {userMsg.map(each=>(
            <li className='messages-container' key={each.id}>
                <div className='msg-container'>
                <div className= {`${each.background} msg-initial-container` }>
                    <p className='initial'>{each.userName[0]}</p>
                </div>
                <div className='meassager-name'>
                    <span className='messager-name'>{each.userName}</span>
                    <span className='time'>{each.time}</span>    
                </div>
                </div>
                <div className='display-each-msg'>
                <div className='user-msg-container'>
                    <p className='message'>{each.userInput}</p>
                </div>
                <div className='likes-container'>
                {each.likesCount < 1 ?
                <AiOutlineHeart className='like-icon' onClick={()=>handlerLikesCount(each.id)}/> :
                <AiFillHeart className='like-icon fill' onClick={()=>handlerLikesCount(each.id)}/>}
                <p className='like-counts'>{each.likesCount}</p>
                </div>
                </div>
            </li> 
            ))}   
            {showPicker && <Picker 
            pickerStyle={{width: '100%'}}
            onEmojiClick={emojiHandler}/>}   
            {displayUsers && 
            <div>
                {displayUsersList()}
            </div>}
        </div>
        </div>
        <form className='form-container' onSubmit={submitHandler} >
            <input className='input-box' placeholder='Type Message' value={userInput} onChange={(event)=>setUserInput(event.target.value)}/>
            <div className='send-btn-container' >
                <BsEmojiWink className='emoji' type='submit' onClick={()=>setShowPicker(val => !val)}/>
            </div>
            
        </form>
      </div>
    </div>
  )
}

export default Home
