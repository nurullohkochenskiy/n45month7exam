import React, { useState, useEffect, useRef } from "react";
import usePlaylistStore from "../store/playlistStore";
import { Link, useLocation } from "react-router-dom";
import useTokenStore from "../store/tokenStore";
import useMusicStore from "../store/musicStore";

const Player = () => {
  const { getMusic, loading, music } = useMusicStore();
 
  const [audioInfo, setAudioInfo] = useState({
    duration: 0,
    currentTime: 0,
    isPlaying: false,
  });
  const audioRef = useRef(null);
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return; 

    const handleLoadedMetadata = () => {
      setAudioInfo((prevState) => ({
        ...prevState,
        duration: audio.duration,
      }));
    };

    const handleTimeUpdate = () => {
      setAudioInfo((prevState) => ({
        ...prevState,
        currentTime: audio.currentTime,
      }));
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef.current]);
  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setAudioInfo((prevState) => ({
      ...prevState,
      currentTime: newTime,
    }));
  };
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setAudioInfo((prevState) => ({
        ...prevState,
        isPlaying: true,
      }));
    } else {
      audio.pause();
      setAudioInfo((prevState) => ({
        ...prevState,
        isPlaying: false,
      }));
    }
  };
  function formatTime(time) {
    const minutes = Math.floor(Number(time) / 60);
    const seconds = Math.floor(Number(time) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  if (loading) {
    return <div className="loadingscreen"></div>;
  }
  return (
    <div className="playbar">
      <div className="title">
        <div className="info">
          <span className="song_name">Play It Safe</span>
          <span className="song_artist text">Julia Wolf</span>
        </div>
        <div className="likebtn">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2434_1646)">
              <path
                d="M14.0009 6.03963C16.4673 3.74352 20.2787 3.81973 22.6548 6.28786C25.0299 8.75708 25.1118 12.6895 22.9026 15.2546L13.9988 24.5L5.09703 15.2546C2.88787 12.6895 2.97082 8.75055 5.34482 6.28786C7.72303 3.823 11.5271 3.74025 14.0009 6.03963Z"
                fill="#63CF6C"
              />
            </g>
            <defs>
              <clipPath id="clip0_2434_1646">
                <rect width="28" height="28" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className="controlbar">
        <div className="controls">
          <div className="shuffle">
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.4708 7.31952C21.0448 7.74555 21.0448 8.43627 21.4708 8.8623L22.1566 9.54813H19.8151C18.3733 9.54813 17.0016 10.215 16.0522 11.3776L7.94266 21.3076C7.37299 22.0052 6.55001 22.4053 5.68493 22.4053H5V24.5481H5.68493C7.12674 24.5481 8.49837 23.8813 9.44781 22.7187L17.5573 12.7887C18.127 12.0911 18.95 11.691 19.8151 11.691H22.4991L21.4708 12.7192C21.0448 13.1453 21.0448 13.836 21.4708 14.262C21.8968 14.688 22.5876 14.688 23.0136 14.262L26.1313 11.1443C26.3265 10.9491 26.3265 10.6325 26.1313 10.4372L23.0136 7.31952C22.5876 6.89349 21.8968 6.89349 21.4708 7.31952ZM6.36879 8.54813C7.76049 8.54813 9.08446 9.19407 10.0009 10.3202L12.4531 13.1728L11 14.5481L8.54806 11.687C7.9982 11.0113 7.20381 10.6238 6.36879 10.6238H5.00043V8.54813H6.36879ZM16.3284 20.7761C17.2449 21.9022 18.5688 22.5481 19.9605 22.5481H22.6419L21.4708 23.7192C21.0448 24.1453 21.0448 24.836 21.4708 25.262C21.8968 25.688 22.5876 25.688 23.0136 25.262L26.1313 22.1443C26.3265 21.9491 26.3265 21.6325 26.1313 21.4372L23.0136 18.3195C22.5876 17.8935 21.8968 17.8935 21.4708 18.3195C21.0448 18.7455 21.0448 19.4363 21.4708 19.8623L22.081 20.4725H19.9605C19.1255 20.4725 18.3311 20.0849 17.7813 19.4093L16 17.0481L14.5 18.5481L16.3284 20.7761Z"
                fill="#BABABA"
              />
            </svg>
          </div>
          <div className="prev">
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.8"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 7C7.44772 7 7 7.44772 7 8V24C7 24.5523 7.44772 25 8 25H10C10.5523 25 11 24.5523 11 24V18.1512L23.5 24.8738C24.1667 25.2323 25 24.7842 25 24.0671V7.9329C25 7.21582 24.1667 6.76765 23.5 7.12619L11 13.8488V8C11 7.44772 10.5523 7 10 7H8Z"
                fill="white"
              />
            </svg>
          </div>
          <div onClick={handlePlayPause} className="pause">
            {audioInfo.isPlaying ? (
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24ZM17 16C17 15.4477 17.4477 15 18 15H21C21.5523 15 22 15.4477 22 16V32C22 32.5523 21.5523 33 21 33H18C17.4477 33 17 32.5523 17 32V16ZM27 15C26.4477 15 26 15.4477 26 16V32C26 32.5523 26.4477 33 27 33H30C30.5523 33 31 32.5523 31 32V16C31 15.4477 30.5523 15 30 15H27Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44ZM18.5 15.1262L33.5 23.1933C34.1667 23.5518 34.1667 24.4482 33.5 24.8067L18.5 32.8738C17.8333 33.2323 17 32.7842 17 32.0671V15.9329C17 15.2158 17.8333 14.7677 18.5 15.1262Z"
                  fill="white"
                />
              </svg>
            )}
          </div>
          <div className="next">
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.8"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 7C24.5523 7 25 7.44772 25 8V24C25 24.5523 24.5523 25 24 25H22C21.4477 25 21 24.5523 21 24V18.1512L8.5 24.8738C7.83333 25.2323 7 24.7842 7 24.0671V7.9329C7 7.21582 7.83333 6.76765 8.5 7.12619L21 13.8488V8C21 7.44772 21.4477 7 22 7H24Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="repeat">
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20H12V22H10C7.79086 22 6 20.2091 6 18V10C6 7.79086 7.79086 6 10 6H22C24.2091 6 26 7.79086 26 10V18C26 20.2091 24.2091 22 22 22H18.843L20.0141 23.1711C20.4401 23.5971 20.4401 24.2879 20.0141 24.7139C19.588 25.1399 18.8973 25.1399 18.4713 24.7139L15.3536 21.5962C15.1583 21.4009 15.1583 21.0843 15.3536 20.8891L18.4713 17.7714C18.8973 17.3454 19.588 17.3454 20.0141 17.7714C20.4401 18.1974 20.4401 18.8881 20.0141 19.3142L19.3282 20H22C23.1046 20 24 19.1046 24 18V10C24 8.89543 23.1046 8 22 8Z"
                fill="#BABABA"
              />
            </svg>
          </div>
        </div>
        <div className="progress">
          <span className="time">{formatTime(audioInfo.currentTime)}</span>
          <audio
            ref={audioRef}
            src={music.preview_url}
          ></audio>
          <input
            className="seeker"
            type="range"
            min={0}
            max={audioInfo.duration}
            value={audioInfo.currentTime}
            onChange={handleSeek}
          />
          <span className="time">{`${formatTime(audioInfo.duration)}`}</span>
        </div>
      </div>
      <div className="voicebar">
        <div className="queue">
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.7"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 9H10C9.44772 9 9 9.44772 9 10V11C9 11.5523 9.44772 12 10 12H22C22.5523 12 23 11.5523 23 11V10C23 9.44772 22.5523 9 22 9ZM10 7C8.34315 7 7 8.34315 7 10V11C7 12.6569 8.34315 14 10 14H22C23.6569 14 25 12.6569 25 11V10C25 8.34315 23.6569 7 22 7H10ZM7 17H25V19.5H7V17ZM25 23H7V25.5H25V23Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="devices">
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.7"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.2 9C7.53726 9 7 9.53892 7 10.2037V16.8398C7 17.5 7.5 18 8.2 18H11V20H8C5.74668 20 5 18.1677 5 15.9074V10.6111C5 8.61675 6.21177 7 8.2 7H11V9H8.2ZM24 9H16C15.4477 9 15 9.44772 15 10V23C15 23.5523 15.4477 24 16 24H24C24.5523 24 25 23.5523 25 23V10C25 9.44772 24.5523 9 24 9ZM16 7C14.3431 7 13 8.34315 13 10V23C13 24.6569 14.3431 26 16 26H24C25.6569 26 27 24.6569 27 23V10C27 8.34315 25.6569 7 24 7H16ZM20 22C21.6569 22 23 20.6569 23 19C23 17.3431 21.6569 16 20 16C18.3431 16 17 17.3431 17 19C17 20.6569 18.3431 22 20 22ZM21 13C21 13.5523 20.5523 14 20 14C19.4477 14 19 13.5523 19 13C19 12.4477 19.4477 12 20 12C20.5523 12 21 12.4477 21 13ZM11 23H8V25H11V23Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="volume">
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.7"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.1385 9.74993L9.47894 13.6673C7.50702 14.8273 7.50702 17.679 9.47894 18.8389L16.1385 22.7563V9.74993ZM8.4649 11.9434C5.17837 13.8767 5.17837 18.6295 8.4649 20.5628L16.6314 25.3666C17.2981 25.7588 18.1385 25.2781 18.1385 24.5047V8.00152C18.1385 7.2281 17.2981 6.74745 16.6314 7.13958L8.4649 11.9434ZM19.1387 9.25317C20.1236 9.25317 21.0989 9.44717 22.0088 9.82408C22.9187 10.201 23.7455 10.7534 24.442 11.4499C25.1384 12.1463 25.6909 12.9731 26.0678 13.883C26.4447 14.793 26.6387 15.7683 26.6387 16.7532C26.6387 17.7381 26.4447 18.7134 26.0678 19.6233C25.6909 20.5332 25.1384 21.36 24.442 22.0565C23.7455 22.7529 22.9187 23.3054 22.0088 23.6823C21.0989 24.0592 20.1236 24.2532 19.1387 24.2532V22.2443C19.8598 22.2443 20.5738 22.1022 21.24 21.8263C21.9062 21.5503 22.5116 21.1459 23.0215 20.636C23.5314 20.1261 23.9358 19.5207 24.2118 18.8545C24.4877 18.1883 24.6298 17.4743 24.6298 16.7532C24.6298 16.0321 24.4877 15.318 24.2118 14.6518C23.9358 13.9856 23.5314 13.3803 23.0215 12.8704C22.5116 12.3605 21.9062 11.956 21.24 11.6801C20.5738 11.4041 19.8598 11.2621 19.1387 11.2621V9.25317ZM21.3311 14.5363C20.7997 13.8955 20.053 13.4431 19.213 13.2532L19.1387 20.2532C19.9826 20.079 20.7387 19.6408 21.2836 19.0101C21.8285 18.3795 22.1299 17.5936 22.1385 16.781C22.1471 15.9684 21.8625 15.177 21.3311 14.5363Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="fullscreen">
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.5 7H23.9058H23.8979H20.0909C19.4884 7 19 7.48842 19 8.09091C19 8.6934 19.4884 9.18182 20.0909 9.18182H21.2652L18.3216 12.1253C17.8928 12.5542 17.8928 13.2495 18.3216 13.6784C18.7505 14.1072 19.4458 14.1072 19.8746 13.6784L22.8182 10.7348V11.9091C22.8182 12.5116 23.3066 13 23.9091 13C24.5116 13 25 12.5116 25 11.9091V8.0982V8.09807V7.5C25 7.22386 24.7761 7 24.5 7ZM7.5 25H8.09417H8.10212H11.9091C12.5116 25 13 24.5116 13 23.9091C13 23.3066 12.5116 22.8182 11.9091 22.8182H10.7348L13.6784 19.8746C14.1072 19.4458 14.1072 18.7505 13.6784 18.3216C13.2495 17.8928 12.5542 17.8928 12.1254 18.3216L9.18182 21.2652V20.0909C9.18182 19.4884 8.6934 19 8.09091 19C7.48842 19 7 19.4884 7 20.0909V23.9018V23.9019V24.5C7 24.7761 7.22386 25 7.5 25Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Player;
