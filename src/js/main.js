// fill = "#091540";

async function fetchData() {
  try {
    let data = await fetch("data.json");
    let dataFile = await data.json();

    for (let i = 0; i < dataFile.length; i++) {
      let box = document.createElement("div");
      box.className = "box";
      let info = document.createElement("div");
      info.className = "info";
      let img = document.createElement("img");
      img.src = dataFile[i].logo;
      info.appendChild(img);
      let theInfo = document.createElement("div");
      info.appendChild(theInfo);
      let theName = document.createElement("h1");
      theName.textContent = dataFile[i].name;
      theInfo.appendChild(theName);
      let description = document.createElement("p");
      description.textContent = dataFile[i].description;
      theInfo.appendChild(description);
      box.appendChild(info);

      let btns = document.createElement("div");
      btns.className = "btns";
      let remove = document.createElement("span");
      remove.className = "remove";
      remove.textContent = "Remove";
      btns.appendChild(remove);
      let toggle = document.createElement("div");
      toggle.className = "toggle";
      if (dataFile[i].isActive === true) {
        toggle.classList.add("active");
      }
      btns.appendChild(toggle);
      let toggleBtn = document.createElement("span");
      toggleBtn.className = "toggle-btn";
      toggle.appendChild(toggleBtn);
      box.appendChild(btns);

      document.querySelector(".row").appendChild(box);
    }

    // filter btns
    document.querySelectorAll(".filter-btns li span").forEach((el) => {
      el.addEventListener("click", (el) => {
        document.querySelectorAll(".filter-btns li span").forEach((el) => {
          el.parentElement.classList.remove("active");
        });
        el.target.parentElement.classList.add("active");

        if (el.target.dataset.btn === "all") {
          filter("flex", "flex");
        }
        if (el.target.dataset.btn === "active") {
          filter("flex", "none");
        }
        if (el.target.dataset.btn === "inactive") {
          filter("none", "flex");
        }
      });
    });

    // remove btn
    document.querySelectorAll(".box .btns .remove").forEach((el) => {
      el.addEventListener("click", (el) => {
        el.target.parentElement.parentElement.remove();
      });
    });

    // active btn toggle
    document.querySelectorAll(".toggle").forEach((el) => {
      el.addEventListener("click", (el) => {
        el.target.classList.toggle("active");
      });
    });

    // theme
    document.querySelector(".theme").addEventListener("click", (el) => {
      if (el.target.classList.contains("light")) {
        el.target.src = "/assets/images/icon-moon.svg";
        el.target.classList.toggle("light");
        el.target.classList.add("active");
        themeMode();
      } else {
        el.target.src = "/assets/images/icon-sun.svg";
        el.target.classList.toggle("light");
        el.target.classList.remove("active");
        themeMode();
      }
    });
  } catch {
    console.log("data not found");
  }
}
fetchData();

function filter(prop1, prop2) {
  document.querySelectorAll(".toggle").forEach((el) => {
    if (el.classList.contains("active")) {
      el.parentElement.parentElement.style.display = prop1;
    } else {
      el.parentElement.parentElement.style.display = prop2;
    }
  });
}

function themeMode() {
  document.body.classList.toggle("light");
  document.querySelector("header .container").classList.toggle("light");
  document.querySelector(".logo-name").classList.toggle("dark");
  document.querySelector(".filter").classList.toggle("light");
  document.querySelectorAll(".box").forEach((el) => {
    el.classList.toggle("light");
    el.children[0].classList.toggle("light");
    el.children[1].children[0].classList.toggle("light");
    el.children[1].children[1].classList.toggle("light");
  });
}
