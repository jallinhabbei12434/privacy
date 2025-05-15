document.addEventListener("DOMContentLoaded", () => {
  // Elementos DOM
  const selectModelBtn = document.getElementById("selectModelBtn")
  const modelSelectModal = document.getElementById("modelSelectModal")
  const closeModalBtn = document.getElementById("closeModalBtn")
  const modelBtns = document.querySelectorAll(".model-btn")
  const cookieConsent = document.getElementById("cookieConsent")
  const acceptCookiesBtn = document.getElementById("acceptCookies")
  const miniCarouselSlides = document.getElementById("miniCarouselSlides")

  // Configuração do mini carrossel
  const slideImages = [
    "images/slides/slide1.jpg",
    "images/slides/slide2.jpg",
    "images/slides/slide3.jpg",
    "images/slides/slide4.jpg",
    "images/slides/slide5.jpg",
  ]

  // Carregar imagens no mini carrossel
  function loadMiniCarouselImages() {
    slideImages.forEach((image, index) => {
      const slide = document.createElement("div")
      slide.className = "slide"
      slide.style.backgroundImage = `url(${image})`
      miniCarouselSlides.appendChild(slide)
    })
  }

  // Iniciar o mini carrossel automático
  function startMiniCarousel() {
    const slides = document.querySelectorAll(".slide")
    if (slides.length === 0) return

    let currentIndex = 0
    const totalSlides = slides.length

    // Função para mover para o próximo slide
    function moveToNextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides
      miniCarouselSlides.style.transform = `translateX(-${currentIndex * 100}%)`
    }

    // Iniciar o intervalo
    setInterval(moveToNextSlide, 5000)
  }

  // Abrir modal de seleção de plataforma
  selectModelBtn.addEventListener("click", () => {
    modelSelectModal.style.display = "flex"
  })

  // Fechar modal de seleção de plataforma
  closeModalBtn.addEventListener("click", () => {
    modelSelectModal.style.display = "none"
  })

  // Fechar modal ao clicar fora
  modelSelectModal.addEventListener("click", (e) => {
    if (e.target === modelSelectModal) {
      modelSelectModal.style.display = "none"
    }
  })

  // Função para mostrar mensagem para iPhone
  function showIPhoneMessage() {
    // Criar o modal de mensagem
    const messageModal = document.createElement("div")
    messageModal.className = "modal iphone-message-modal"
    messageModal.style.display = "flex"

    // Conteúdo do modal
    messageModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Aviso - iPhone</h2>
                    <button class="close-btn" id="closeIPhoneMessageBtn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="iphone-message">
                        <img src="images/icons/iphone.png" alt="iPhone" style="width: 60px; margin-bottom: 15px;">
                        <p>No momento, o aplicativo Privacy não está disponível para dispositivos iPhone.</p>
                        <p>Nossa equipe está trabalhando para disponibilizar o app na App Store em breve.</p>
                        <p>Agradecemos sua compreensão e interesse!</p>
                    </div>
                </div>
            </div>
        `

    // Adicionar o modal ao corpo do documento
    document.body.appendChild(messageModal)

    // Fechar o modal de seleção de plataforma
    modelSelectModal.style.display = "none"

    // Configurar o botão de fechar
    const closeIPhoneMessageBtn = document.getElementById("closeIPhoneMessageBtn")
    closeIPhoneMessageBtn.addEventListener("click", () => {
      messageModal.remove()
    })

    // Fechar ao clicar fora do modal
    messageModal.addEventListener("click", (e) => {
      if (e.target === messageModal) {
        messageModal.remove()
      }
    })
  }

  // Selecionar plataforma e redirecionar para a página de tutorial
  modelBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const model = this.getAttribute("data-model")

      // Verificar se é iPhone
      if (model === "iphone") {
        // Mostrar mensagem para iPhone
        showIPhoneMessage()
        return
      }

      // Redirecionar para a página de tutorial específica da plataforma
      window.location.href = `tutorial-${model}.html`

      // Fechar o modal
      modelSelectModal.style.display = "none"
    })
  })

  // Cookie consent
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieConsent.style.display = "flex"
  } else {
    cookieConsent.style.display = "none"
  }

  acceptCookiesBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true")
    cookieConsent.style.display = "none"
  })

  // Inicializar o mini carrossel
  loadMiniCarouselImages()
  startMiniCarousel()
})
