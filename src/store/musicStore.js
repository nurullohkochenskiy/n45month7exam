import create from "zustand";
const getMusic = async (set, id) => {
  const token = JSON.parse(localStorage.getItem("token"));

  set((state) => ({
    ...state,
    loading: true,
  }));
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/tracks/${id}`,
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
      music: data,
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
const useMusicStore = create((set) => ({
  music: {},
  loading: false,
  error: "",
  getMusic: (id) => getMusic(set, id),
}));

export default useMusicStore;
