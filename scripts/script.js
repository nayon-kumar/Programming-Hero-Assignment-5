const allFilter = document.getElementById("allFilter");
const openFilter = document.getElementById("openFilter");
const closeFilter = document.getElementById("closeFilter");
const loading = document.getElementById("loading");
const contentArea = document.getElementById("contentArea");
const cardContainer = document.getElementById("cardContainer");
const my_modal_5 = document.getElementById("my_modal_5");
const modalContainer = document.getElementById("modalContainer");
const searchBtn = document.getElementById("searchBtn");
const issusCount = document.getElementById("issusCount");
const noIssue = document.getElementById("noIssue");

// For toggle btn
allFilter.addEventListener("click", function () {
  openFilter.classList.remove("btn-primary");
  closeFilter.classList.remove("btn-primary");

  allFilter.classList.add("btn-primary");
});
openFilter.addEventListener("click", function () {
  allFilter.classList.remove("btn-primary");
  closeFilter.classList.remove("btn-primary");

  openFilter.classList.add("btn-primary");
});
closeFilter.addEventListener("click", function () {
  allFilter.classList.remove("btn-primary");
  openFilter.classList.remove("btn-primary");

  closeFilter.classList.add("btn-primary");
});

// Loading effect
const showLoading = () => {
  loading.classList.remove("hidden");
  loading.classList.add("flex");
  contentArea.classList.add("hidden");
};
const hideLoading = () => {
  loading.classList.add("hidden");
  loading.classList.remove("flex");
  contentArea.classList.remove("hidden");
};

// Load data
const loadData = async () => {
  showLoading();
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  hideLoading();
  displayData(data.data);
};
loadData();

// Create element
const createElements = (arrs) => {
  let elem = "";
  for (let arr of arrs) {
    if (arr == "bug") {
      elem =
        elem +
        `<p class="uppercase text-[#EF4444] bg-[#FECACA] rounded-full px-3 py-0.5">
      <i class="fa-solid fa-bug"></i> Bug
    </p>`;
    } else if (arr == "help wanted") {
      elem =
        elem +
        `<p class="uppercase text-[#D97706] bg-[#FDE68A] rounded-full px-3 py-0.5">
      <i class="fa-solid fa-life-ring"></i> Help wanted
    </p>`;
    } else if (arr == "enhancement") {
      elem =
        elem +
        `<p class="uppercase text-[#00A96E] bg-[#DEFCE8] rounded-full px-3 py-0.5">
      <i class="fa-brands fa-buffer"></i> Enhancement
    </p>`;
    } else {
      elem =
        elem +
        `<p class="uppercase text-black bg-blue-100 rounded-full px-3 py-0.5">
      <i class="fa-solid fa-fan"></i> ${arr}
    </p>`;
    }
  }
  return elem;
};

// Display data
const displayData = (datas) => {
  cardContainer.innerHTML = "";
  for (let data of datas) {
    let date = new Date(data.createdAt);
    let formatedDate = date.toLocaleDateString("en-US");
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="shadow-xl rounded-b-xl">
              <div onclick = "displayModal(${data.id})"
                class="p-4 border-t-5 ${data.status == "open" ? "border-[#00A96E]" : "border-[#A855F7]"}  rounded-xl cursor-pointer"
              >
                <div class="flex justify-between items-center">
                  <img src="${data.status == "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="${data.status}" />
                  <p
                    class="${data.priority == "high" ? "text-[#EF4444] bg-[#FEECEC]" : data.priority == "medium" ? "text-[#F59E0B] bg-[#FFF6D1]" : "text-[#9CA3AF] bg-[#EEEFF2]"}  px-5 rounded-full py-0.5 text-[12px] uppercase"
                  >
                    ${data.priority}
                  </p>
                </div>
                <h3 class="font-semibold mt-3 mb-2 text-[14px] line-clamp-1">
                  ${data.title}
                </h3>
                <p class="text-[#64748B] mb-3 text-[12px] line-clamp-2">
                  ${data.description}
                </p>
                <div class="flex flex-wrap gap-1 text-[10px]">
                  
                    ${createElements(data.labels)}
                </div>
              </div>
              <div
                class="border-t-2 border-b-2 border-gray-200 p-4 rounded-b-xl space-y-2"
              >
                <p class="text-[#64748B] text-[12px]">#by ${data.author}</p>
                <p class="text-[#64748B] text-[12px]">${formatedDate}</p>
              </div>
            </div>
    `;
    cardContainer.appendChild(div);
  }
  issusCount.innerText = datas.length;
  if (datas.length > 0) {
    noIssue.classList.add("hidden");
  } else {
    noIssue.classList.remove("hidden");
  }
};

// Display modal data
const displayModal = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const modalData = data.data;
  let date = new Date(modalData.createdAt);
  let formatedDate = date.toLocaleDateString("en-US");
  modalContainer.innerHTML = `
    <div>
            <h4 class="font-semibold text-[14px]">${modalData.title}</h4>
            <div class="flex flex-wrap items-center gap-1 text-[12px] mt-2">
              <p class="${modalData.status == "open" ? "bg-[#00A96E]" : "bg-[#A855F7]"} text-white px-2 py-0.5 rounded-full capitalize">
                ${modalData.status}
              </p>
              <p>Opened by ${modalData.author}</p>
              <p>${formatedDate}</p>
            </div>
            <div class="flex flex-wrap gap-1 text-[10px] mt-3">
              ${createElements(modalData.labels)}
            </div>
            <p class="text-[#64748B] text-[12px] mt-3 text-justify">
              ${modalData.description}
            </p>
            <div class="flex text-[12px] mt-3">
              <div class="flex-1">
                <p class="mb-1">Assignee:</p>
                <p class="font-semibold">${modalData.assignee ? modalData.assignee : "Not Assigned"}</p>
              </div>
              <div class="flex-1">
                <p class="mb-1">Priority:</p>
                <p
                  class="uppercase ${modalData.priority == "high" ? "bg-[#EF4444]" : modalData.priority == "medium" ? "bg-[#F59E0B]" : "bg-[#9CA3AF]"} text-white rounded-full px-2 py-0.5 inline"
                >
                  ${modalData.priority}
                </p>
              </div>
            </div>
          </div>
  `;
  my_modal_5.showModal();
};

// For all filter
allFilter.addEventListener("click", function () {
  loadData();
});

// For open filter
openFilter.addEventListener("click", function () {
  const openData = async () => {
    showLoading();
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();

    const onlyDatas = data.data;
    const newData = [];
    for (let onlyData of onlyDatas) {
      if (onlyData.status == "open") {
        newData.push(onlyData);
      }
    }
    hideLoading();
    displayData(newData);
  };
  openData();
});

// For close filter
closeFilter.addEventListener("click", function () {
  const openData = async () => {
    showLoading();
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();

    const onlyDatas = data.data;
    const newData = [];
    for (let onlyData of onlyDatas) {
      if (onlyData.status == "closed") {
        newData.push(onlyData);
      }
    }
    hideLoading();
    displayData(newData);
  };
  openData();
});

// For search data
searchBtn.addEventListener("click", function () {
  const searchInput = document.getElementById("searchInput").value.trim();
  const searchInputLower = searchInput.toLowerCase();
  const searchData = async () => {
    if (searchInputLower === "") {
      // IF user input space
      document.getElementById("searchInput").value = "";
      return;
    }

    allFilter.classList.add("btn-primary");
    openFilter.classList.remove("btn-primary");
    closeFilter.classList.remove("btn-primary");
    showLoading();
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInputLower}`;
    const res = await fetch(url);
    const data = await res.json();
    hideLoading();
    document.getElementById("searchInput").value = "";
    displayData(data.data);
  };
  searchData();
});
