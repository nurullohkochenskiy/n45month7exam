import React, { useState, useEffect, useRef } from "react";
import usePlaylistStore from "../store/playlistStore";
import { Link, useLocation } from "react-router-dom";
import useTokenStore from "../store/tokenStore";

const Container = ({ children }) => {
  const { getToken, updateToken } = useTokenStore();
  const {
    loading,
    getFeaturedPlaylists,
    getYourTopMixes,
    // getSinglePlaylist,
    getMadeForYou,
    getRecentlyPlayed,
    getJumpBackIn,
    getUniquelyYours,
  } = usePlaylistStore();
  const homeicon = `<svg width="30"  height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd" d="M26.9167 27.9136V10.3487L16.5036 4.25261L6.08333 10.3948V27.9136H11.6389V21.0368C11.6389 19.3084 13.038 17.9072 14.7639 17.9072H18.2361C19.962 17.9072 21.3611 19.3084 21.3611 21.0368V27.9136H26.9167ZM27.9583 30C28.5336 30 29 29.5329 29 28.9568V9.75018C29 9.37949 28.8036 9.03665 28.484 8.84957L17.0275 2.14259C16.7018 1.95191 16.2986 1.95251 15.9734 2.14417L4.51329 8.89932C4.19525 9.08679 4 9.42878 4 9.79835V28.9568C4 29.5329 4.46637 30 5.04167 30H12.6805C13.2558 30 13.7222 29.5329 13.7222 28.9568V21.0368C13.7222 20.4606 14.1886 19.9936 14.7639 19.9936H18.2361C18.8114 19.9936 19.2778 20.4606 19.2778 21.0368V28.9568C19.2778 29.5329 19.7442 30 20.3195 30H27.9583Z" fill="white"/>
  </svg>
  `;
  const homeiconFilled = `<svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M29 29C29 29.5523 28.5523 30 28 30H20.2778C19.7255 30 19.2778 29.5523 19.2778 29V21.0526C19.2778 20.5003 18.8301 20.0526 18.2778 20.0526H14.7222C14.1699 20.0526 13.7222 20.5003 13.7222 21.0526V29C13.7222 29.5523 13.2745 30 12.7222 30H5C4.44772 30 4 29.5523 4 29V9.89769C4 9.54272 4.18817 9.21436 4.49443 9.0349L15.9962 2.29524C16.3075 2.11283 16.6929 2.11225 17.0047 2.29373L28.503 8.98543C28.8107 9.16451 29 9.49369 29 9.84972V29Z" fill="white"/>
  </svg>
  `;
  const [audioInfo, setAudioInfo] = useState({
    duration: 0,
    currentTime: 0,
    isPlaying: false,
  });
  const audioRef = useRef(null);
  useEffect(() => {
    getToken();
    updateToken();
    getFeaturedPlaylists();
    getYourTopMixes();
    getMadeForYou();
    getRecentlyPlayed();
    getJumpBackIn();
    getUniquelyYours();
  }, []);
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return; // Check if audio element exists

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
    // console.log(seconds);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  const location = useLocation();
  return (
    <>
      {loading ? (
        <div className="loadingscreen"></div>
      ) : (
        <div className="main_wrapper">
          <div className="body">
            <div className="left_side">
              <div className="active_links">
                <ul className="active_links_items">
                  <li className="active_links_item">
                    <Link to={"/"}>
                      <div>
                        <svg
                          className="icons sidebar_icons"
                          width="30"
                          height="30"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M26.9167 27.9136V10.3487L16.5036 4.25261L6.08333 10.3948V27.9136H11.6389V21.0368C11.6389 19.3084 13.038 17.9072 14.7639 17.9072H18.2361C19.962 17.9072 21.3611 19.3084 21.3611 21.0368V27.9136H26.9167ZM27.9583 30C28.5336 30 29 29.5329 29 28.9568V9.75018C29 9.37949 28.8036 9.03665 28.484 8.84957L17.0275 2.14259C16.7018 1.95191 16.2986 1.95251 15.9734 2.14417L4.51329 8.89932C4.19525 9.08679 4 9.42878 4 9.79835V28.9568C4 29.5329 4.46637 30 5.04167 30H12.6805C13.2558 30 13.7222 29.5329 13.7222 28.9568V21.0368C13.7222 20.4606 14.1886 19.9936 14.7639 19.9936H18.2361C18.8114 19.9936 19.2778 20.4606 19.2778 21.0368V28.9568C19.2778 29.5329 19.7442 30 20.3195 30H27.9583Z"
                            fill="white"
                          />
                        </svg>
                        <span className="text listItem">Home</span>
                      </div>
                    </Link>
                  </li>
                  <li className="active_links_item">
                    <div>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.7747 22.3561L29.5924 28.4934C30.1511 29.0828 30.1332 30.0268 29.5524 30.5933C28.9808 31.1511 28.078 31.1329 27.5282 30.5526L21.7061 24.4083C19.7272 25.93 17.4956 26.7673 15.0114 26.9203C13.3514 27.0226 11.7438 26.792 10.1886 26.2288C8.63335 25.6655 7.2766 24.8625 6.11833 23.8199C4.96006 22.7772 4.01249 21.5057 3.27561 20.0055C2.53874 18.5053 2.12096 16.9125 2.02229 15.2271C1.92361 13.5418 2.15262 11.9092 2.70933 10.3292C3.26604 8.74932 4.05852 7.37069 5.08678 6.19334C6.11504 5.01599 7.36839 4.05225 8.84685 3.30212C10.3253 2.55198 11.8945 2.1258 13.5543 2.02356C15.2142 1.92132 16.8218 2.15183 18.3771 2.7151C19.9324 3.27837 21.2892 4.08134 22.4474 5.12402C23.6055 6.16669 24.5531 7.43815 25.2901 8.93838C26.027 10.4386 26.4448 12.0314 26.5434 13.7168C26.606 14.7861 26.5356 15.8403 26.3321 16.8793C26.1287 17.9184 25.8096 18.8946 25.3747 19.8079C24.9399 20.7212 24.4066 21.5706 23.7747 22.3561ZM14.84 23.9912C16.1107 23.9129 17.3094 23.5854 18.436 23.0085C19.5626 22.4317 20.519 21.6933 21.305 20.7934C22.091 19.8934 22.6986 18.8412 23.1279 17.6365C23.5572 16.4319 23.7341 15.1845 23.6586 13.8944C23.5831 12.6042 23.262 11.3875 22.6953 10.2442C22.1286 9.10096 21.4026 8.13081 20.5173 7.33378C19.632 6.53674 18.5964 5.92105 17.4106 5.48669C16.2247 5.05232 14.9965 4.87428 13.7258 4.95255C12.4551 5.03081 11.2565 5.35835 10.1298 5.93514C9.00317 6.51194 8.04682 7.25035 7.26078 8.15038C6.47473 9.0504 5.86709 10.1027 5.43783 11.3072C5.00858 12.5117 4.83171 13.7591 4.90721 15.0494C4.98272 16.3396 5.3038 17.5563 5.87045 18.6995C6.4371 19.8427 7.16312 20.8128 8.04853 21.6099C8.93394 22.407 9.96951 23.0227 11.1552 23.457C12.341 23.8913 13.5692 24.0694 14.84 23.9912Z"
                          fill="white"
                        />
                      </svg>

                      <span className="text listItem">Search</span>
                    </div>
                  </li>
                  <li className="active_links_item">
                    <div>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="3"
                          height="26"
                          rx="1.5"
                          fill="white"
                        />
                        <rect
                          x="11"
                          y="3"
                          width="3"
                          height="26"
                          rx="1.5"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.5 6.67524V26.5191H26.5V9.76681L21.5 6.67524ZM20.5288 3.1517C19.8627 2.73984 19 3.21512 19 3.99394V28.0076C19 28.5557 19.4477 29 20 29H28C28.5523 29 29 28.5557 29 28.0076V8.94045C29 8.59781 28.8219 8.2794 28.5288 8.09821L20.5288 3.1517Z"
                          fill="white"
                        />
                      </svg>
                      <span className="text listItem">Your Library</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="yourplaylists_sidebar">
                <ul className="yourplaylists_sidebar_items">
                  <li className="yourplaylists_sidebar_item">
                    <div>
                      <svg
                        className="icons "
                        width="30"
                        height="30"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 0C0.895431 0 0 0.895431 0 2V30C0 31.1046 0.895431 32 2 32H30C31.1046 32 32 31.1046 32 30V2C32 0.895431 31.1046 0 30 0H2ZM15 9H17V15H23V17H17V23H15V17H9V15H15V9Z"
                          fill="white"
                        />
                      </svg>
                      <span className="text listItem">Create Playlist</span>
                    </div>
                  </li>
                  <li className="yourplaylists_sidebar_item">
                    <div>
                      <img
                        width={30}
                        height={30}
                        className="iconImg"
                        src="https://misc.scdn.co/liked-songs/liked-songs-300.png"
                        alt="sss"
                      />
                      <span className="text listItem">Liked Songs</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="playlists_sidebar">
                <ul className="playlists_sidebar_items">
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                  <li className="playlists_sidebar_item text listitem">
                    Anime Lofi & Chillhop Music
                  </li>
                </ul>
              </div>
            </div>
            <div className={location.pathname == "/" ? ("purplebg center"): ("yellowbg center")} >{children}</div>
            <div className="right_side">
              <div className="topline">
                <span className="title text">Friend Activity</span>
                <div className="icons">
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
                      d="M11.4165 11.1494C11.4165 8.32115 13.6928 6.75 15.5552 6.75C18.0175 6.75 20.0018 8.72612 20.0018 11.1494C20.0018 12.1948 19.3886 13.6903 18.4846 14.8923C18.0185 15.5121 17.796 16.3324 17.8302 17.0964C17.8643 17.8585 18.1656 18.6949 18.9085 19.1938L22.6582 21.7122C22.7647 21.8051 22.9197 21.993 23.0532 22.2299C23.2024 22.4949 23.2497 22.688 23.2497 22.7539V23.9167H15.5552V25.4167H24.7497V22.7539C24.7497 22.3039 24.5547 21.8393 24.3601 21.4937C24.1582 21.1354 23.8792 20.7687 23.5788 20.5269L23.5536 20.5066L19.7448 17.9486C19.5197 17.7974 19.3492 17.4857 19.3287 17.0293C19.3084 16.5748 19.4486 16.1061 19.6834 15.7939C20.6941 14.45 21.5018 12.6419 21.5018 11.1494C21.5018 7.88483 18.833 5.25 15.5552 5.25C12.9735 5.25 9.9165 7.38767 9.9165 11.1494C9.9165 12.994 10.5304 14.1883 11.1941 15.1293C11.355 15.3575 11.5186 15.5705 11.6697 15.7663L11.702 15.8081L11.7021 15.8082C11.8434 15.9913 11.9714 16.1571 12.0901 16.3225C12.3442 16.677 12.5193 16.9823 12.6133 17.3039L14.0531 16.8833C13.8899 16.3247 13.6032 15.8588 13.3092 15.4486C13.1742 15.2604 13.0303 15.0739 12.8926 14.8956L12.8572 14.8499C12.7059 14.6538 12.5602 14.4637 12.4199 14.2648C11.8788 13.4976 11.4165 12.5999 11.4165 11.1494ZM10.5833 26L10.5833 23.4166H8V21.9166H10.5833L10.5833 19.3333H12.0833L12.0833 21.9166H14.6665V23.4166H12.0833L12.0833 26L10.5833 26Z"
                      fill="#B3B3B3"
                    />
                  </svg>

                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.2912 35.2446C18.8893 35.6597 18.9051 36.3172 19.3266 36.713C19.7482 37.1089 20.4158 37.0933 20.8177 36.6782L27.9999 29.2614L35.1821 36.6782C35.584 37.0933 36.2516 37.1089 36.6732 36.713C37.0947 36.3172 37.1106 35.6597 36.7086 35.2446L29.4573 27.7564L36.2368 20.7554C36.6388 20.3403 36.6229 19.6828 36.2014 19.287C35.7799 18.8911 35.1123 18.9067 34.7103 19.3218L27.9999 26.2515L21.2895 19.3218C20.8875 18.9067 20.2199 18.8911 19.7984 19.287C19.3769 19.6828 19.361 20.3403 19.763 20.7554L26.5426 27.7564L19.2912 35.2446Z"
                      fill="#B3B3B3"
                    />
                  </svg>
                </div>
              </div>
              <div className="textline">
                <span className="text text_content">
                  Let friends and followers on Spotify see what you’re listening
                  to.
                </span>
              </div>
              <div className="friends">
                <ul className="friendlist">
                  <li className="friendlist_item">
                    <svg
                      width="179"
                      height="62"
                      viewBox="0 0 179 62"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.2"
                        cx="31"
                        cy="31"
                        r="31"
                        fill="white"
                      />
                      <circle
                        cx="56"
                        cy="10"
                        r="6.75"
                        fill="#4077CA"
                        stroke="black"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M35.4198 29.2808C34.6922 30.2174 34.4014 31.4723 34.4983 32.5997C34.5947 33.7217 35.1101 34.9892 36.3222 35.6517L41.9191 38.7108C42.0698 38.8492 42.2812 39.1047 42.4666 39.4254C42.5673 39.5994 42.644 39.7653 42.6932 39.9064C42.7174 39.9761 42.7325 40.0327 42.7411 40.0757C42.7493 40.1162 42.7499 40.1362 42.75 40.1379C42.75 40.138 42.75 40.138 42.75 40.1379V42.75H19.25V40.1379C19.25 40.138 19.25 40.138 19.25 40.1379C19.2501 40.1362 19.2508 40.1162 19.2589 40.0757C19.2675 40.0327 19.2826 39.9761 19.3068 39.9064C19.356 39.7653 19.4327 39.5994 19.5334 39.4254C19.7188 39.1047 19.9302 38.8492 20.0809 38.7108L25.6778 35.6517C26.8899 34.9892 27.4053 33.7217 27.5017 32.5997C27.5986 31.4723 27.3078 30.2174 26.5802 29.2808C25.1845 27.484 24.25 25.2544 24.25 23.7241C24.25 20.1896 27.2304 17.25 31 17.25C34.7696 17.25 37.75 20.1896 37.75 23.7241C37.75 25.2544 36.8155 27.484 35.4198 29.2808Z"
                        stroke="#B3B3B3"
                        strokeWidth="2.5"
                      />
                      <path
                        opacity="0.2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M77 15C77 12.2386 79.2386 10 82 10H174C176.761 10 179 12.2386 179 15C179 17.7614 176.761 20 174 20H82C79.2386 20 77 17.7614 77 15ZM77 31C77 28.2386 79.2386 26 82 26H151C153.761 26 156 28.2386 156 31C156 33.7614 153.761 36 151 36H82C79.2386 36 77 33.7614 77 31ZM82 42C79.2386 42 77 44.2386 77 47C77 49.7614 79.2386 52 82 52H151C153.761 52 156 49.7614 156 47C156 44.2386 153.761 42 151 42H82Z"
                        fill="white"
                      />
                    </svg>
                  </li>
                  <li className="friendlist_item">
                    <svg
                      width="179"
                      height="62"
                      viewBox="0 0 179 62"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.2"
                        cx="31"
                        cy="31"
                        r="31"
                        fill="white"
                      />
                      <circle
                        cx="56"
                        cy="10"
                        r="6.75"
                        fill="#4077CA"
                        stroke="black"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M35.4198 29.2808C34.6922 30.2174 34.4014 31.4723 34.4983 32.5997C34.5947 33.7217 35.1101 34.9892 36.3222 35.6517L41.9191 38.7108C42.0698 38.8492 42.2812 39.1047 42.4666 39.4254C42.5673 39.5994 42.644 39.7653 42.6932 39.9064C42.7174 39.9761 42.7325 40.0327 42.7411 40.0757C42.7493 40.1162 42.7499 40.1362 42.75 40.1379C42.75 40.138 42.75 40.138 42.75 40.1379V42.75H19.25V40.1379C19.25 40.138 19.25 40.138 19.25 40.1379C19.2501 40.1362 19.2508 40.1162 19.2589 40.0757C19.2675 40.0327 19.2826 39.9761 19.3068 39.9064C19.356 39.7653 19.4327 39.5994 19.5334 39.4254C19.7188 39.1047 19.9302 38.8492 20.0809 38.7108L25.6778 35.6517C26.8899 34.9892 27.4053 33.7217 27.5017 32.5997C27.5986 31.4723 27.3078 30.2174 26.5802 29.2808C25.1845 27.484 24.25 25.2544 24.25 23.7241C24.25 20.1896 27.2304 17.25 31 17.25C34.7696 17.25 37.75 20.1896 37.75 23.7241C37.75 25.2544 36.8155 27.484 35.4198 29.2808Z"
                        stroke="#B3B3B3"
                        strokeWidth="2.5"
                      />
                      <path
                        opacity="0.2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M77 15C77 12.2386 79.2386 10 82 10H174C176.761 10 179 12.2386 179 15C179 17.7614 176.761 20 174 20H82C79.2386 20 77 17.7614 77 15ZM77 31C77 28.2386 79.2386 26 82 26H151C153.761 26 156 28.2386 156 31C156 33.7614 153.761 36 151 36H82C79.2386 36 77 33.7614 77 31ZM82 42C79.2386 42 77 44.2386 77 47C77 49.7614 79.2386 52 82 52H151C153.761 52 156 49.7614 156 47C156 44.2386 153.761 42 151 42H82Z"
                        fill="white"
                      />
                    </svg>
                  </li>
                  <li className="friendlist_item">
                    <svg
                      width="179"
                      height="62"
                      viewBox="0 0 179 62"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.2"
                        cx="31"
                        cy="31"
                        r="31"
                        fill="white"
                      />
                      <circle
                        cx="56"
                        cy="10"
                        r="6.75"
                        fill="#4077CA"
                        stroke="black"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M35.4198 29.2808C34.6922 30.2174 34.4014 31.4723 34.4983 32.5997C34.5947 33.7217 35.1101 34.9892 36.3222 35.6517L41.9191 38.7108C42.0698 38.8492 42.2812 39.1047 42.4666 39.4254C42.5673 39.5994 42.644 39.7653 42.6932 39.9064C42.7174 39.9761 42.7325 40.0327 42.7411 40.0757C42.7493 40.1162 42.7499 40.1362 42.75 40.1379C42.75 40.138 42.75 40.138 42.75 40.1379V42.75H19.25V40.1379C19.25 40.138 19.25 40.138 19.25 40.1379C19.2501 40.1362 19.2508 40.1162 19.2589 40.0757C19.2675 40.0327 19.2826 39.9761 19.3068 39.9064C19.356 39.7653 19.4327 39.5994 19.5334 39.4254C19.7188 39.1047 19.9302 38.8492 20.0809 38.7108L25.6778 35.6517C26.8899 34.9892 27.4053 33.7217 27.5017 32.5997C27.5986 31.4723 27.3078 30.2174 26.5802 29.2808C25.1845 27.484 24.25 25.2544 24.25 23.7241C24.25 20.1896 27.2304 17.25 31 17.25C34.7696 17.25 37.75 20.1896 37.75 23.7241C37.75 25.2544 36.8155 27.484 35.4198 29.2808Z"
                        stroke="#B3B3B3"
                        strokeWidth="2.5"
                      />
                      <path
                        opacity="0.2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M77 15C77 12.2386 79.2386 10 82 10H174C176.761 10 179 12.2386 179 15C179 17.7614 176.761 20 174 20H82C79.2386 20 77 17.7614 77 15ZM77 31C77 28.2386 79.2386 26 82 26H151C153.761 26 156 28.2386 156 31C156 33.7614 153.761 36 151 36H82C79.2386 36 77 33.7614 77 31ZM82 42C79.2386 42 77 44.2386 77 47C77 49.7614 79.2386 52 82 52H151C153.761 52 156 49.7614 156 47C156 44.2386 153.761 42 151 42H82Z"
                        fill="white"
                      />
                    </svg>
                  </li>
                </ul>
              </div>
              <div className="textline">
                <span className="text text_content">
                  Go to Settings {">"} Social and enable “Share my listening
                  activity on Spotify.’ You can turn this off at any time.
                </span>
              </div>
              <div className="buttonwrapper">
                <button className="btn">SETTINGS</button>
              </div>
            </div>
          </div>
          <div className="playing_img"></div>
          <div className="footer">
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
                  <span className="time">
                    {formatTime(audioInfo.currentTime)}
                  </span>
                  <audio
                    ref={audioRef}
                    src="https://p.scdn.co/mp3-preview/96339b4101e4bd8b7a08d104659f0084bf76e37f?cid=b489631a85aa46bbbbffa3ff87ed11fd"
                  ></audio>
                  <input
                    className="seeker"
                    type="range"
                    min={0}
                    max={audioInfo.duration}
                    value={audioInfo.currentTime}
                    onChange={handleSeek}
                  />
                  <span className="time">{`${formatTime(
                    audioInfo.duration
                  )}`}</span>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Container;
