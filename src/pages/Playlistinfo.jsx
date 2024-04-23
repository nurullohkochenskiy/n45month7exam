import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import usePlaylistStore from "../store/playlistStore";

const Playlistinfo = () => {
  const { id } = useParams();
  const { getSinglePlaylist, singlePlaylist } = usePlaylistStore();
  useEffect(() => {
    getSinglePlaylist(id);
  }, []);

  if (!singlePlaylist) {
    return <div className="loadingscreen"></div>;
  }
  const artistnames = [
    singlePlaylist.tracks.items[0].track.artists[0].name,
    singlePlaylist.tracks.items[1].track.artists[0].name,
    singlePlaylist.tracks.items[2].track.artists[0].name,
  ];
  console.log(singlePlaylist);
  return (
    <>
      <Container>
        <div className="homewrapper">
          <div className="actionspn">
            <svg
              width="36"
              height="36"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle opacity="0.5" cx="20" cy="20" r="20" fill="black" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5426 19.302C12.1382 19.7064 12.1547 20.3669 12.5788 20.7506L23.2737 30.4269C23.7856 30.8901 24.5761 30.8506 25.0392 30.3386C25.5024 29.8267 25.4629 29.0362 24.951 28.5731L15.4254 19.9547L24.9962 10.3839C25.4843 9.89573 25.4843 9.10427 24.9962 8.61612C24.508 8.12796 23.7166 8.12796 23.2284 8.61612L12.5426 19.302Z"
                fill="white"
              />
            </svg>
            <svg
              width="36"
              height="36"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle opacity="0.5" cx="20" cy="20" r="20" fill="black" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.0702 19.302C27.4745 19.7064 27.458 20.3669 27.034 20.7506L16.3391 30.4269C15.8272 30.8901 15.0367 30.8506 14.5735 30.3386C14.1103 29.8267 14.1499 29.0362 14.6618 28.5731L24.1874 19.9547L14.6166 10.3839C14.1284 9.89573 14.1284 9.10427 14.6166 8.61612C15.1047 8.12796 15.8962 8.12796 16.3843 8.61612L27.0702 19.302Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="infos">
            <div className="thumbnail">
              <img
                width={280}
                height={280}
                src={singlePlaylist.images[0].url}
                alt=""
              />
            </div>
            <div className="words">
              <span className="type">PUBLIC PLAYLIST</span>
              <span className="name">{singlePlaylist.name}</span>
              <span className="artistnames">
                {artistnames.join(",").length <= 30
                  ? artistnames.join(", ")
                  : artistnames[0]}{" "}
                and more
              </span>
              <div className="moreinfo">
                <span className="author">Made for davedirect3</span>
                <span className="details">
                  {singlePlaylist.tracks.items.length} songs, 2hr 01 min
                </span>
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="left">
              <div className="play">
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 104 104"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_131_2989)">
                    <circle cx="52" cy="48" r="36" fill="#65D36E" />
                    <path
                      d="M65.2865 48.5123C66.1517 48.0266 66.1517 46.8122 65.2865 46.3264L45.8178 35.3968C44.9525 34.911 43.8709 35.5182 43.8709 36.4898V58.349C43.8709 59.3205 44.9525 59.9277 45.8178 59.442L65.2865 48.5123Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_131_2989"
                      x="0"
                      y="0"
                      width="104"
                      height="104"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="8" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.45 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_131_2989"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_131_2989"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="like">
                <svg
                  width="45"
                  height="45"
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
              <div className="download">
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_131_2995)">
                    <circle
                      cx="26"
                      cy="26"
                      r="17.75"
                      stroke="white"
                      strokeWidth="2.5"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M34.8388 28.9289L26.8839 36.8839C26.3957 37.372 25.6043 37.372 25.1161 36.8839L17.1612 28.9289C16.673 28.4408 16.673 27.6493 17.1612 27.1612C17.6493 26.673 18.4408 26.673 18.9289 27.1612L24.75 32.9822L24.75 17C24.75 16.3096 25.3096 15.75 26 15.75C26.6904 15.75 27.25 16.3096 27.25 17L27.25 32.9822L33.0711 27.1612C33.5592 26.673 34.3507 26.673 34.8388 27.1612C35.327 27.6493 35.327 28.4408 34.8388 28.9289Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_131_2995">
                      <rect width="52" height="52" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="options">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_131_2994)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5715 22C12.5715 23.7358 11.1644 25.1429 9.42862 25.1429C7.69287 25.1429 6.28577 23.7358 6.28577 22C6.28577 20.2643 7.69287 18.8572 9.42862 18.8572C11.1644 18.8572 12.5715 20.2643 12.5715 22ZM25.1429 22C25.1429 23.7358 23.7358 25.1429 22.0001 25.1429C20.2643 25.1429 18.8572 23.7358 18.8572 22C18.8572 20.2643 20.2643 18.8572 22.0001 18.8572C23.7358 18.8572 25.1429 20.2643 25.1429 22ZM34.5715 25.1429C36.3072 25.1429 37.7143 23.7358 37.7143 22C37.7143 20.2643 36.3072 18.8572 34.5715 18.8572C32.8357 18.8572 31.4286 20.2643 31.4286 22C31.4286 23.7358 32.8357 25.1429 34.5715 25.1429Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_131_2994">
                      <rect width="44" height="44" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="right">
              <div className="search">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.0881 16.0684L21.2696 20.4797C21.6711 20.9033 21.6582 21.5818 21.2408 21.989C20.8299 22.3898 20.1811 22.3768 19.7859 21.9596L15.6013 17.5434C14.1789 18.6372 12.5749 19.239 10.7894 19.349C9.59632 19.4225 8.44086 19.2568 7.32304 18.8519C6.20522 18.4471 5.23006 17.8699 4.39755 17.1205C3.56504 16.3711 2.88397 15.4572 2.35435 14.379C1.82472 13.3007 1.52444 12.1558 1.45352 10.9445C1.38259 9.73316 1.5472 8.55971 1.94733 7.42414C2.34746 6.28858 2.91706 5.29768 3.65612 4.45146C4.39518 3.60524 5.29603 2.91255 6.35867 2.3734C7.42131 1.83424 8.54915 1.52792 9.74218 1.45443C10.9352 1.38095 12.0907 1.54663 13.2085 1.95148C14.3264 2.35633 15.3016 2.93346 16.134 3.68289C16.9665 4.43231 17.6475 5.34617 18.1772 6.42446C18.7069 7.50276 19.0072 8.64758 19.0781 9.85892C19.1231 10.6275 19.0724 11.3852 18.9262 12.132C18.78 12.8788 18.5506 13.5805 18.2381 14.2369C17.9255 14.8934 17.5422 15.5039 17.0881 16.0684ZM10.6663 17.2437C11.5796 17.1874 12.4411 16.952 13.2509 16.5374C14.0606 16.1228 14.748 15.5921 15.3129 14.9452C15.8779 14.2984 16.3146 13.5421 16.6232 12.6763C16.9317 11.8104 17.0589 10.9139 17.0046 9.98658C16.9504 9.05929 16.7196 8.18477 16.3122 7.36305C15.9049 6.54132 15.3831 5.84402 14.7468 5.27115C14.1105 4.69828 13.3662 4.25575 12.5138 3.94356C11.6615 3.63136 10.7787 3.50339 9.86543 3.55964C8.95212 3.6159 8.09058 3.85131 7.2808 4.26588C6.47103 4.68046 5.78365 5.21119 5.21868 5.85808C4.65372 6.50498 4.21697 7.2613 3.90844 8.12706C3.59992 8.99281 3.47279 9.88937 3.52706 10.8167C3.58133 11.7441 3.81211 12.6186 4.21938 13.4403C4.62666 14.2619 5.1485 14.9592 5.78488 15.5321C6.42127 16.105 7.16558 16.5475 8.01783 16.8597C8.87007 17.1719 9.75288 17.2999 10.6663 17.2437Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text">Custom order</span>
              <div className="custon">
                {" "}
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 13.5L1 6.5L15 6.5L8 13.5Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
          <div className="listhead">
            <div className="text left">
              # <span className="text"> TITLE</span>
            </div>
            <span className="album text">ALBUM</span>
            <span className="date text">DATE ADDED</span>
            <span className="duration text">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2625_1439)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23 14C23 18.9706 18.9706 23 14 23C9.02944 23 5 18.9706 5 14C5 9.02944 9.02944 5 14 5C18.9706 5 23 9.02944 23 14ZM25 14C25 20.0751 20.0751 25 14 25C7.92487 25 3 20.0751 3 14C3 7.92487 7.92487 3 14 3C20.0751 3 25 7.92487 25 14ZM14.5 8.5H12.5V15.5H18V13.5H14.5V8.5Z"
                    fill="#B3B3B3"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2625_1439">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
          <div className="songlistwrapper">
            <ul className="songlist">
              {singlePlaylist.tracks.items.map((item, index) => {
                return (
                  <li className="songlist_item">
                    <div className="left">
                      <span className="order text">{index+1}</span>
                      <img
                        width={47}
                        height={47}
                        src={item.track.album.images[2].url}
                        alt=""
                      />
                      <div className="title">
                        <div className="name">{item.track.name}</div>
                        <div className="artist text">{item.track.album.artists[0].name}</div>
                      </div>
                    </div>
                    <div className="middle">
                      <span className="albumname text">Play It Safe</span>
                    </div>
                    <div className="right">
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
                      <div className="duration">2 : 12</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Playlistinfo;
