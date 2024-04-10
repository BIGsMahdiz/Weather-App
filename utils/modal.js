const modal = document.getElementById("modal");
const modalText = modal.querySelector("p");
const modalButton = document.getElementById("modal-button");

const showModal = (text) => {
  modalText.innerText = text;
  modal.style.display = "flex";
};

const removeModal = () => {
  modal.style.display = "none";
};

modalButton.addEventListener("click", removeModal);

export { showModal, removeModal };
