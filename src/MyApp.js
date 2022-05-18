import React,{useState,useEffect} from 'react'
import { AiFillSetting } from "react-icons/ai";
import styles from "./styles/App.module.css"
import sound from "./alarm.wav"

const MyApp = () => {

    const [seconds,setSeconds] = useState(60)
    const [minutes,setminutes] = useState(0)
    const [isRunning,setIsRunning] = useState(false);
    const [isFinishing,setIsFinishing] = useState(false)
    const [audio] = useState(new Audio(sound))

    const handleChangeSeconds = (e)=>{
        setSeconds( e.target.value)
    }
    const handleChangeMinutes = (e)=>{
        setminutes( e.target.value)
    }

    const handleReset = ()=>{
        setIsRunning(false)
        setSeconds(60)
        setminutes(1)
        setIsRunning(true)
    }



    const handleTimer = ()=>{
        if(seconds ===0 && minutes ===0){
            setSeconds(60);
        }
        if(seconds === ""){
            setSeconds(60);
        }
        setIsFinishing(false)
        setIsRunning((e)=> !e)
    }

    useEffect(()=>{

        if(isRunning){

            const interval = setInterval(() => {

                if(seconds>0){
                    setSeconds((e)=>  (e- 1));
                }
                
                if(seconds === 0 && minutes === 0 ){
                    setIsRunning(false)
                    setIsFinishing(false)
                    //audio.pause()
                    window.alert("El tiempo ha terminado")
                    
                }
                if(seconds <= 10 && minutes ===0 ){
                    setIsFinishing(true)
                    audio.play();

                }


                if(seconds === 0 && minutes > 0){
                    setSeconds(59)
                    setminutes((min)=> min -1)
                }

            
            }, [1000]);

            return()=>clearInterval(interval)
        }

    },[isRunning,seconds,minutes,audio])    


    return (
        <div className={styles.main_container}>
            <div className={isFinishing ? `${styles.times_container}  ${styles.times_container_finishing}` : styles.times_container}>
                <section className={styles.inputs}>
                    <input
                        className={styles.first_btn}
                        type="number"
                        autoComplete='off'
                        maxLength={2}
                        value={minutes}
                        onChange={handleChangeMinutes}
                        min={0}
                        max={60}
                        />
                    <h1 className={ styles.puntos}>:</h1>
                    <input
                        type="number"
                        autoComplete='off'
                        maxLength="2"
                        value={seconds}
                        size="2"
                        max={60}
                        min={0}
                        onChange={handleChangeSeconds}
                    />
                </section>

                <section className={styles.btns}>
                    <button onClick={handleTimer}>{isRunning ? "PAUSE":"START"}</button>
                    <button onClick={isRunning ? ()=>{} : handleReset}><AiFillSetting className={styles.iconos}/></button>
                </section>
            </div>
        </div>
    )
}

export default MyApp