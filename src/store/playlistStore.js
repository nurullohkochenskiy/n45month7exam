import create from "zustand";
const getSinglePlaylist = async (set, id) => {
  const token = JSON.parse(localStorage.getItem("token"));

  set((state) => ({
    ...state,
    loading: true,
  }));
  try {
    const playlistId = id;
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
      singlePlaylist: data,
      loading: false,
      error: "",
    }));
  } catch (err) {
    console.log(err);
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
    // console.log(data.playlists.items.slice(0, 6));
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
    console.log(settingdata);
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
  SinglePlaylist: {},
  MadeForYou: [],
  RecentlyPlayed: [],
  JumpBackIn: [],
  UniquelyYours: [],
  loading: false,
  error: "",
  getFeaturedPlaylists: () => getFeaturedPlaylists(set),
  getYourTopMixes: () => getYourTopMixes(set),
  getSinglePlaylist: (id) => getSinglePlaylist(set, id),
  getMadeForYou: () => getMadeForYou(set),
  getRecentlyPlayed: () => getRecentlyPlayed(set),
  getJumpBackIn: () => getJumpBackIn(set),
  getUniquelyYours: () => getUniquelyYours(set),
}));

export default usePlaylistStore;
