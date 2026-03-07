const allFilter = document.getElementById("allFilter");
const openFilter = document.getElementById("openFilter");
const closeFilter = document.getElementById("closeFilter");
const loading = document.getElementById("loading");
const contentArea = document.getElementById("contentArea");
const cardContainer = document.getElementById("cardContainer");
const my_modal_5 = document.getElementById("my_modal_5");

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
                <div class="flex gap-1 text-[10px]">
                  
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
};

const displayModal = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);
  my_modal_5.showModal();
};
