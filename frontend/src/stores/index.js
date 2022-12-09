import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from '../config/firebase.config.js';

const URL_API = "http://localhost:3000/";

export const useApp = defineStore({
  id: "App",
  state: () => ({
    user: {
      logged_in: false,
    },
    token: null,
    refreshToken: null,
    loading: false,
    error: null,
    links: {
      link: "",
      custom_link: "",
      success: false,
      path: "",
      all_links: [],
      edit: false,
      delete: false
    }
  }),
  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const data = await axios.post(URL_API + "api/login", {
          email,
          password,
        })
        .then((res) => {
          document.cookie = `session=${res.data.result.session}; max-age=${res.data.result.options.maxAge};`;
        })
        .catch((err) => {
          console.log(err);
        });
      } catch (error) {
        console.log(error);
        this.error = error;
      } finally {
        this.sessionCheck();
        this.router.push("/dashboard");
        this.loading = false;
      }
    },
    async register(email, password, cpassword) {
      this.loading = true;
      this.error = null;
      console.log("register");
      try {
        const { data } = await axios
          .post(URL_API + "api/register", {
            email,
            password,
            cpassword,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            // Todo: Handle error
            console.log(error.response.data.message);
            if (
              error.response.data.message.code === "auth/email-already-in-use"
            ) {
              alert("Email already in use");
            }
          });
        this.user = data.user;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
      this.router.push("/login");
    },
    async logout() {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
    },
    async signOut() {
      this.loading = true;
      try {
        axios.post(URL_API + "api/signout", {
          user: document.cookie.split("; ").find((row) => row.startsWith("session=")).split("=")[1]
        }, {
          headers: {
            "Authorization": "Bearer " + document.cookie.split("; ").find((row) => row.startsWith("session=")).split("=")[1]
          }
        })
        .then((res) => {
          this.user.logged_in = false;
          this.router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
      } catch (error) {
        console.log(error);
        this.error = error;
      } finally {
        document.cookie = "session=; max-age=0";
        this.loading = false;
      }
    },
    async sessionCheck() {
      // Todo: Check if token is valid
      const session = document.cookie
        .split("; ")
        .find((row) => row.startsWith("session="))
        ?.split("=")[1];

      console.log("session : " + session);

      if (session) {
        this.user.logged_in = true;
        console.log("logged_in : " + this.user.logged_in);
        return true;
      }
      return false;
    },
    async visitUrl(path) {
      const url = await axios.post(URL_API + "api/links", {
        path: path,
      })
      .then((res) => {
        if(res.data.result.url) {
          if(res.data.result.url.startsWith("http")) {
            window.location.href = res.data.result.url;
          } else {
            window.location.href = "http://" + res.data.result.url;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    async newLink(url, custom, use_custom) {
      this.loading = true;
      let data = {
        url
      };
      if(use_custom) {
        data.path = custom;
      }
      try {
        axios.put(URL_API + "api/links", data, {
          headers: {
            "Authorization": "Bearer " + document.cookie.split("; ").find((row) => row.startsWith("session=")).split("=")[1]
          }
        })
        .then((res) => {
          console.log(`res ${res.data.result.path}`);
          if(res.data.result.path) {
            this.links.success = true;
            this.links.path = "s.it/" + res.data.result.path;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      } catch (error) {
        console.log(error);
        this.error = error;
      } finally {
        this.loading = false;
      }
      this.links.link = "";
      this.links.custom_link = "";
    },
    async getLinks() {
      this.loading = true;
      let parsedCookie = this.parseJwt(document.cookie);
      let user_id = parsedCookie.user_id;
      try {
        db.collection("links").orderBy("created_at", "desc").onSnapshot((querySnapshot) => {
          let links = [];
          querySnapshot.forEach((doc) => {
            if(doc.data().user_id === user_id) {
              links.push({ ...doc.data(), id: doc.id });
            }
          });
          this.links.all_links = links;
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async deleteLink(id) {
      this.loading = true;
      try {
        axios.delete(URL_API + "api/links", {
          headers: {
            "Authorization": "Bearer " + document.cookie.split("; ").find((row) => row.startsWith("session=")).split("=")[1]
          },
          data: {
            id
          }
        })
        .then((res) => {
          console.log("successfull deleted");
        })
        .catch((err) => {
          console.log(err);
        });
      } catch (error) {
        console.log(error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async editLink(id) {
      this.loading = true;
      try {
        axios.patch(URL_API + "api/links", {
          id,
          url: this.links.all_links.find((link) => link.id === id).url,
          path: this.links.all_links.find((link) => link.id === id).path
        }, {
          headers: {
            "Authorization": "Bearer " + document.cookie.split("; ").find((row) => row.startsWith("session=")).split("=")[1]
          }
        })
        .then((res) => {
          console.log("successfull edited");
        })
        .catch((err) => {
          console.log(err);
        });
      } catch (error) {
        console.log(error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    parseJwt(token) {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    },
  },
});

export const useView = defineStore({
  id: "View",
  state: () => ({
    user_settings: false,
    use_custom_link: false,
    copy: false,
    links: {
      edit: false,
    }
  }),
  actions: {
    copyURL(text) {
      navigator.clipboard.writeText(text);
      this.copy = true;
      setTimeout(() => {
        this.copy = false;
      }, 2000);
    },
    showEditModal() {
      this.links.edit = !this.links.edit;
    },
    useCustomLink() {
      this.use_custom_link = !this.use_custom_link;
    },
    toggleUserSettings() {
      this.user_settings = !this.user_settings;
    },
  },
  getters: {},
});
