import create from "zustand";
const getSinglePlaylist = async (set) => {
  const token = JSON.parse(localStorage.getItem("token"));
  set((state) => ({
    ...state,
    loading: true,
  }));
  try {
    const playlistId = "37i9dQZF1DWZEmUK7BVkZM";
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    console.log(data);
    set((state) => ({
      ...state,
      loading: false,
      error: "",
    }));
  } catch (err) {
    set((state) => ({
      ...state,
      loading: false,
      error: err.message,
    }));
  }
};
const getFeaturedPlaylists = async (set) => {
  const token = JSON.parse(localStorage.getItem("token"));
  set((state) => ({
    ...state,
    loading: true,
  }));
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/browse/featured-playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    set((state) => ({
      ...state,
      loading: false,
      FeaturedPlaylists: data.playlists.items.slice(0, 6),
      error: "",
    }));
  } catch (err) {
    set((state) => ({
      ...state,
      loading: false,
      error: err.message,
    }));
  }
};

const getYourTopMixes = async (set) => {
  const token = JSON.parse(localStorage.getItem("token"));
  set((state) => ({
    ...state,
    loading: true,
  }));
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/browse/categories/toplists/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    let settingdata = data.playlists.items.slice(0, 4);
    try {
      const arr = data.playlists.items.slice(0, 4);
      const promises = arr.map(async (item) => {
        const res = await fetch(item.tracks.href, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return await res.json();
      });
      const responseData = await Promise.all(promises);
      const mainData = settingdata.map((item, index) => {
        return {
          ...item,
          namefordisplay: [
            responseData[index].items[0].track.artists[0].name,
            responseData[index].items[1].track.artists[0].name,
          ],
        };
      });
      settingdata = [...mainData];
      // console.log(names);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
    set((state) => ({
      ...state,
      YourTopMixes: settingdata,
      loading: false,
      error: "",
    }));
  } catch (err) {
    set((state) => ({
      ...state,
      loading: false,
      error: err.message,
    }));
  }
};

const getMadeForYou = async (set) => {
  const token = JSON.parse(localStorage.getItem("token"));
  set((state) => ({
    ...state,
    loading: true,
  }));
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    let settingdata = data.playlists.items.slice(0, 4);
    try {
      const arr = data.playlists.items.slice(0, 4);
      const promises = arr.map(async (item) => {
        const res = await fetch(item.tracks.href, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return await res.json();
      });
      const responseData = await Promise.all(promises);
      const mainData = settingdata.map((item, index) => {
        return {
          ...item,
          namefordisplay: [
            responseData[index].items[0].track.artists[0].name,
            responseData[index].items[1].track.artists[0].name,
          ],
        };
      });
      settingdata = [...mainData];
      // console.log(names);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
    set((state) => ({
      ...state,
      MadeForYou: settingdata,
      loading: false,
      error: "",
    }));
  } catch (err) {
    set((state) => ({
      ...state,
      loading: false,
      error: err.message,
    }));
  }
};
const getRecentlyPlayed = async (set) => {
  const token = JSON.parse(localStorage.getItem("token"));
  set((state) => ({
    ...state,
    loading: true,
  }));
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    let settingdata = data.playlists.items.slice(0, 4);
    try {
      const arr = data.playlists.items.slice(0, 4);
      const promises = arr.map(async (item) => {
        const res = await fetch(item.tracks.href, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return await res.json();
      });
      const responseData = await Promise.all(promises);
      const mainData = settingdata.map((item, index) => {
        return {
          ...item,
          namefordisplay: [
            responseData[index].items[0].track.artists[0].name,
            responseData[index].items[1].track.artists[0].name,
          ],
        };
      });
      settingdata = [...mainData];
      // console.log(names);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
    set((state) => ({
      ...state,
      RecentlyPlayed: settingdata,
      loading: false,
      error: "",
    }));
  } catch (err) {
    set((state) => ({
      ...state,
      loading: false,
      error: err.message,
    }));
  }
};
const getJumpBackIn = async (set) => {
  const token = JSON.parse(localStorage.getItem("token"));
  set((state) => ({
    ...state,
    loading: true,
  }));
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    let settingdata = data.playlists.items.slice(0, 4);
    try {
      const arr = data.playlists.items.slice(0, 4);
      const promises = arr.map(async (item) => {
        const res = await fetch(item.tracks.href, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return await res.json();
      });
      const responseData = await Promise.all(promises);
      const mainData = settingdata.map((item, index) => {
        return {
          ...item,
          namefordisplay: [
            responseData[index].items[0].track.artists[0].name,
            responseData[index].items[1].track.artists[0].name,
          ],
        };
      });
      settingdata = [...mainData];
      // console.log(names);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
    set((state) => ({
      ...state,
      JumpBackIn: settingdata,
      loading: false,
      error: "",
    }));
  } catch (err) {
    set((state) => ({
      ...state,
      loading: false,
      error: err.message,
    }));
  }
};
const getUniquelyYours = async (set) => {
  const token = JSON.parse(localStorage.getItem("token"));
  set((state) => ({
    ...state,
    loading: true,
  }));
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    let settingdata = data.playlists.items.slice(0, 4);
    try {
      const arr = data.playlists.items.slice(0, 4);
      const promises = arr.map(async (item) => {
        const res = await fetch(item.tracks.href, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return await res.json();
      });
      const responseData = await Promise.all(promises);
      const mainData = settingdata.map((item, index) => {
        return {
          ...item,
          namefordisplay: [
            responseData[index].items[0].track.artists[0].name,
            responseData[index].items[1].track.artists[0].name,
          ],
        };
      });
      settingdata = [...mainData];
      // console.log(names);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
    set((state) => ({
      ...state,
      UniquelyYours: settingdata,
      loading: false,
      error: "",
    }));
  } catch (err) {
    set((state) => ({
      ...state,
      loading: false,
      error: err.message,
    }));
  }
};




const usePlaylistStore = create((set) => ({
  FeaturedPlaylists: [],
  YourTopMixes: [],
  SinglePlaylist: [],
  MadeForYou: [],
  RecentlyPlayed: [],
  JumpBackIn: [],
  UniquelyYours: [],
  loading: false,
  error: "",
  getFeaturedPlaylists: () => getFeaturedPlaylists(set),
  getYourTopMixes: () => getYourTopMixes(set),
  getSinglePlaylist: () => getSinglePlaylist(set),
  getMadeForYou: () => getMadeForYou(set),
  getRecentlyPlayed: () => getRecentlyPlayed(set),
  getJumpBackIn: () => getJumpBackIn(set),
  getUniquelyYours: () => getUniquelyYours(set),
}));

export default usePlaylistStore;