<template>
  <div v-if="!$route.meta.hideNavigation">
    <nav class="navbar navbar-expand-lg navbar-light">
      <h1 class="navbar-brand" href="#">
        <a href="/home">
          <span>E</span>valuate
        </a>
      </h1>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="home">Home</a>
          </li>
          <li class="nav-item dropdown">
            <i class="el-icon-bell"></i>
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Notifications</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <div class="message-notifacation">
                <div class="dropdown-item">
                  <p>xWARE accepted youy invitation to evaluate you</p>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <img :src="'http://127.0.0.1:8000' +data.image" width="40" height="40" />
            <a class="nav-link" href="/profile">{{ data.user.first_name }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { HTTP } from "../share/Api";

export default {
  data() {
    return {
      notifacation: "unsee",
      data: {
        user: {}
      }
    };
  },
  methods: {
    click() {
      this.notifacation = "see";
    },
    getData() {
      HTTP.get("profile").then(response => {
        this.data = response.data.profile;
        console.log(this.data);
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.see {
  background: #f2f2f2;
}
.unsee {
  background: white;
}
nav {
  padding: 30px;
}
nav h1 a {
  color: black;
}
nav h1 a:hover {
  text-decoration: none;
}
nav h1 span {
  color: #42b983;
}
nav ul li {
  margin-left: 40px;
}
nav ul li i {
  font-size: 19px;
}
nav ul li .dropdown-menu {
  width: 380px;
  top: 54px;
  left: -100px;
  background: hsl(0, 0%, 95%);
  overflow-y: scroll;
  display: none;
  height: 400px;
  display: block;
  visibility: hidden;
  opacity: 0;
  transform: translateY(50px);
  transition: 0.5s ease all;
}

.dropdown-menu.show {
  display: block;
  visibility: visible;
  opacity: 1;
  transform: translateY(0px);
  transition: 0.5s ease all;
}
ul li .message-notifacation {
  margin-right: 20px;
}
ul li .dropdown-item {
  font-size: 14px;
  border-left: 5px solid #005966;
  margin: 10px;
  padding-top: 25px;
  padding-bottom: 0px;
  padding-bottom: 15px;
  background: white;
}

ul li a {
  display: inline-block;
}
ul li img {
  border-radius: 50%;
}
</style>
