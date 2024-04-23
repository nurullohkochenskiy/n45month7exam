import create from "zustand";
const getToken = async (set) => {
  //& ClientID va ClientSecretni shu yerdan almashtirib tekshirib ko'rish mumkin
  const clientId = "b489631a85aa46bbbbffa3ff87ed11fd";
  const clientSecret = "c8b83f7d5f2f42f29416fa52df3a8a2d";
  set((state) => ({
    ...state,
    loading: true,
  }));
  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
      },
      body: "grant_type=client_credentials",
    });
    const auth = await res.json();
    if (!JSON.parse(localStorage.getItem("token"))) {
      localStorage.setItem("token", JSON.stringify(auth.access_token));
    }
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

const updateToken = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
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
    if (data.error) {
      localStorage.removeItem("token");
      await getToken();
    }
  } catch (err) {
    console.log(err);
  }
};
const useTokenStore = create((set) => ({
  loading: false,
  error: "",
  token: JSON.parse(localStorage.getItem("token")) || "",
  getToken: () => getToken(set),
  updateToken: () => updateToken(),
}));

export default useTokenStore;
