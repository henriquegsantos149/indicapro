/**
 * INDICA PRO - GERENCIADOR DE ESTADOS E ROTEAMENTO SIMULADO
 * Suporte a Query Strings, Vitrine Dinâmica e Validação de Leads
 */

// 1. DADOS DE CATÁLOGO DOS PRÊMIOS (VITRINE)
const REWARDS_CATALOG = [
    {
        id: "ebook",
        points: 100,
        title: "Guia Digital Ambiental Pro: Carreiras Ambientais 2027",
        category: "Digital",
        banner: `<div class="banner-svg-wrapper" style="width: 100%; height: 180px; position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center; background: #0b0d19;">
            <div style="position: absolute; inset: -20px; background-image: url('images/capa-guia-digital.jpg'); background-size: cover; background-position: center; filter: blur(15px) brightness(0.4); z-index: 1;"></div>
            <img src="images/capa-guia-digital.jpg" alt="Guia Digital" style="position: relative; height: 100%; width: 100%; object-fit: contain; padding: 8px; z-index: 2; box-sizing: border-box; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));">
        </div>`
    },
    {
        id: "workshop-webgis",
        points: 100,
        title: "Workshop WebGIS na Prática",
        category: "Digital",
        banner: `<img src="images/workshop-webgis.jpg" class="reward-thumbnail-img" alt="Workshop WebGIS">`
    },
    {
        id: "acesso-vitalicio-pap",
        points: 200,
        title: "Acesso Vitalício ao PAP",
        category: "Digital",
        banner: `<div class="banner-svg-wrapper flex-center" style="background: #0b0d19; display:flex; justify-content:center; align-items:center; width:100%; height:180px; padding: 20px; box-sizing: border-box;">
            <img src="images/logo-pap-branco.png" style="width: 140px; height: auto; object-fit: contain;">
        </div>`
    },
    {
        id: "desconto-pos",
        points: 200,
        title: "50% de Desconto na Pós-Graduação",
        category: "Digital",
        banner: `<div class="banner-svg-wrapper" style="width: 100%; height: 180px; background: #0b0d19; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden; box-sizing: border-box;">
            <svg width="100%" height="100%" style="position:absolute; top:0; left:0; opacity: 0.1;" viewBox="0 0 320 180">
                <path d="M 0 30 H 320 M 0 60 H 320 M 0 90 H 320 M 0 120 H 320 M 0 150 H 320" stroke="#6FB03A" stroke-width="1"/>
                <path d="M 40 0 V 180 M 80 0 V 180 M 120 0 V 180 M 160 0 V 180 M 200 0 V 180 M 240 0 V 180 M 280 0 V 180" stroke="#6FB03A" stroke-width="1"/>
            </svg>
            <div style="font-family: var(--font-display, 'Bebas Neue', sans-serif); font-size: 1.2rem; font-weight: bold; color: #ffffff; letter-spacing: 1px; width: 100%; text-align: center; padding: 0 12px; box-sizing: border-box; white-space: nowrap; z-index: 2;">
                PÓS-GRADUAÇÃO
            </div>
            <div style="margin-top: 10px; background: linear-gradient(90deg, #6FB03A 0%, #31A8A8 100%); color: #0b0d19; font-weight: 800; font-size: 14px; padding: 4px 14px; border-radius: 20px; z-index: 2; box-shadow: 0 4px 15px rgba(111,176,58,0.3);">
                50% OFF
            </div>
        </div>`
    },
    {
        id: "credito-100",
        points: 200,
        title: "PIX de R$ 100",
        category: "Crédito Financeiro",
        banner: `<div class="banner-svg-wrapper cash-banner">
            <svg width="100%" height="100%" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="180" fill="#0b0d19" />
                <rect x="15" y="15" width="290" height="150" rx="10" stroke="#6FB03A" stroke-width="1.5" style="filter: drop-shadow(0px 0px 4px rgba(111,176,58,0.25));" />
                <text x="160" y="85" fill="#ffffff" font-family="'Montserrat', sans-serif" font-weight="900" font-size="34px" text-anchor="middle" style="letter-spacing:1px;">R$ 100</text>
                <text x="160" y="112" fill="#6FB03A" font-family="'Montserrat', sans-serif" font-weight="800" font-size="12px" text-anchor="middle" style="letter-spacing:1px;">CRÉDITO EM CONTA / PIX</text>
                <rect x="95" y="130" width="130" height="20" rx="10" fill="rgba(49,168,168,0.1)" stroke="#31A8A8" stroke-width="1"/>
                <text x="160" y="143" fill="#31A8A8" font-family="'Montserrat', sans-serif" font-weight="800" font-size="8px" text-anchor="middle">✔ PAGAMENTO GARANTIDO</text>
            </svg>
        </div>`
    },
    {
        id: "passaporte-ouro",
        points: 300,
        title: "Passaporte Ouro Ambiental Pro",
        category: "Digital",
        banner: `<img src="images/passaporte-ouro-nobg.png" class="reward-thumbnail-img" alt="Passaporte Ouro">`
    },
    {
        id: "bone-oficial",
        points: 300,
        title: "Boné Oficial Ambiental Pro",
        category: "Físico",
        banner: `<img src="images/bone.jpg" class="reward-thumbnail-img" alt="Boné Oficial">`
    },
    {
        id: "credito-500",
        points: 400,
        title: "PIX de R$ 500",
        category: "Crédito Financeiro",
        banner: `<div class="banner-svg-wrapper cash-banner">
            <svg width="100%" height="100%" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="180" fill="#0b0d19" />
                <rect x="15" y="15" width="290" height="150" rx="10" stroke="#4DA8DA" stroke-width="2" style="filter: drop-shadow(0px 0px 8px rgba(77,168,218,0.4));" />
                <text x="160" y="85" fill="#ffffff" font-family="'Montserrat', sans-serif" font-weight="900" font-size="36px" text-anchor="middle" style="letter-spacing:1px;">R$ 500</text>
                <text x="160" y="112" fill="#4DA8DA" font-family="'Montserrat', sans-serif" font-weight="800" font-size="12px" text-anchor="middle" style="letter-spacing:1px;">CRÉDITO EM CONTA / PIX</text>
                <rect x="95" y="130" width="130" height="20" rx="10" fill="rgba(77,168,218,0.15)" stroke="#4DA8DA" stroke-width="1"/>
                <text x="160" y="143" fill="#4DA8DA" font-family="'Montserrat', sans-serif" font-weight="800" font-size="8px" text-anchor="middle">✔ PAGAMENTO GARANTIDO</text>
            </svg>
        </div>`
    },
    {
        id: "credito-1000",
        points: 1200,
        title: "PIX de R$ 1.000",
        category: "Crédito Financeiro",
        banner: `<div class="banner-svg-wrapper cash-banner">
            <svg width="100%" height="100%" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#BF953F" />
                        <stop offset="25%" stop-color="#FCF6BA" />
                        <stop offset="50%" stop-color="#B38728" />
                        <stop offset="75%" stop-color="#FBF5B7" />
                        <stop offset="100%" stop-color="#AA771C" />
                    </linearGradient>
                </defs>
                <rect width="320" height="180" fill="#0b0d19" />
                <rect x="15" y="15" width="290" height="150" rx="10" stroke="url(#goldGrad)" stroke-width="2.5" style="filter: drop-shadow(0px 0px 12px rgba(252,246,186,0.5));" />
                <text x="160" y="85" fill="url(#goldGrad)" font-family="'Montserrat', sans-serif" font-weight="900" font-size="38px" text-anchor="middle" style="letter-spacing:1px;">R$ 1.000</text>
                <text x="160" y="112" fill="#FCF6BA" font-family="'Montserrat', sans-serif" font-weight="800" font-size="12px" text-anchor="middle" style="letter-spacing:1px;">CRÉDITO EM CONTA / PIX</text>
                <rect x="95" y="130" width="130" height="20" rx="10" fill="rgba(252,246,186,0.15)" stroke="url(#goldGrad)" stroke-width="1"/>
                <text x="160" y="143" fill="#FCF6BA" font-family="'Montserrat', sans-serif" font-weight="800" font-size="8px" text-anchor="middle">✔ PAGAMENTO GARANTIDO</text>
            </svg>
        </div>`
    }
];

// 1. CONFIGURAÇÕES PRINCIPAIS
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwryjgDzbvKrfDBxHEazypoBoQfuuZTgwOwdEJQ9OY1g4e27MCmXyYTwjVkxsccCTozRA/exec";

// Nomes de indicados para preenchimento automático em simulações
const MOCK_NAMES = ["Rodrigo Silva", "Fernanda Costa", "Thiago Oliveira", "Gabriel Vasconcelos", "Bruna Albuquerque", "Mariana Lins", "Lucas Fernandes", "Patricia Gouveia", "Ricardo Almeida"];

// 2. ESTADO GLOBAL DO USUÁRIO ATIVO
// 2. ESTADO GLOBAL DO USUÁRIO ATIVO
let userState = {
    name: "Aluno",
    email: "",
    pointsResgataveis: 0,
    pointsPendentes: 0,
    referrals: []
};

// Carrega o estado sincronizado do localStorage e URL
function loadState() {
    const saved = localStorage.getItem("indica_pro_state");
    if (saved) {
        try {
            userState = JSON.parse(saved);
            // FORCED RESET for the old state:
            if (userState.name === "Manoel") {
                userState.name = "Aluno";
                userState.email = "";
                userState.pointsResgataveis = 0;
                userState.pointsPendentes = 0;
                userState.referrals = [];
                saveStateToLocalStorage();
            }
            if (!userState.email) userState.email = "";
            if (!Array.isArray(userState.referrals)) userState.referrals = [];
        } catch(e) {
            console.error("Erro ao carregar localStorage", e);
            userState.referrals = [];
        }
    }
    
    // Sobrescreve com Query Strings se presentes na URL
    const urlParams = new URLSearchParams(window.location.search);
    const nome = urlParams.get("nome") || urlParams.get("aluno");
    const pontos = urlParams.get("pontos");
    const pendentes = urlParams.get("pendentes");
    
    let stateChanged = false;
    if (nome !== null) {
        userState.name = nome;
        stateChanged = true;
    }
    if (pontos !== null) {
        userState.pointsResgataveis = parseInt(pontos) || 0;
        stateChanged = true;
    }
    if (pendentes !== null) {
        userState.pointsPendentes = parseInt(pendentes) || 0;
        stateChanged = true;
    }
    
    if (stateChanged) {
        saveStateToLocalStorage();
    }
}

function saveStateToLocalStorage() {
    localStorage.setItem("indica_pro_state", JSON.stringify(userState));
}

// Inicialização Geral
document.addEventListener("DOMContentLoaded", () => {
    loadState();
    
    const isGuestPage = document.body.classList.contains("guest-view");
    
    if (isGuestPage) {
        initGuestPage();
    } else {
        initStudentPage();
    }
});

// ==========================================================================
// 4. LÓGICA DA PÁGINA 1: VISÃO DO ALUNO (PAINEL)
// ==========================================================================
function initStudentPage() {
    // Autenticação / Identificação do Aluno
    const authModal = document.getElementById("auth-modal");
    const authSubmitBtn = document.getElementById("auth-submit-btn");
    
    // Sincroniza os pontos com a Planilha do Google
    async function syncPointsWithDatabase() {
        if (!userState.name || userState.name === "Aluno") return;
        
        try {
            const response = await fetch(WEB_APP_URL + "?aluno=" + encodeURIComponent(userState.name));
            const data = await response.json();
            
            userState.pointsPendentes = data.pontosPendentes || 0;
            userState.pointsResgataveis = data.pontosResgataveis || 0;
            saveStateToLocalStorage();
            renderStudentView(); // Atualiza a tela com os pontos reais
        } catch (e) {
            console.error("Erro ao sincronizar pontos com a planilha:", e);
        }
    }

    if (authModal && (!userState.email || userState.name === "Aluno" || !userState.name)) {
        authModal.classList.remove("hidden");
    } else {
        syncPointsWithDatabase(); // Sincroniza se já estiver logado
    }
    
    if (authSubmitBtn) {
        authSubmitBtn.addEventListener("click", () => {
            const nameInput = document.getElementById("auth-name").value.trim();
            const emailInput = document.getElementById("auth-email").value.trim();
            
            if (nameInput && emailInput) {
                userState.name = nameInput;
                userState.email = emailInput;
                saveStateToLocalStorage();
                
                authModal.classList.add("hidden");
                renderStudentView(); // Atualiza nome imediatamente
                syncPointsWithDatabase(); // Busca os pontos na planilha
            } else {
                alert("Por favor, preencha todos os campos para continuar.");
            }
        });
    }

    // Elementos DOM do painel
    const copyLinkBtn = document.getElementById("copy-link-btn");
    const toggleSimBtn = document.getElementById("toggle-sim-btn");
    const simPanel = document.getElementById("simulation-panel");
    const presetBtns = document.querySelectorAll(".preset-btn");
    
    const simPtsInput = document.getElementById("sim-pts-input");
    const simPendInput = document.getElementById("sim-pend-input");
    const simAddRefBtn = document.getElementById("sim-add-ref-btn");
    const simRefName = document.getElementById("sim-ref-name");
    const simRefStatus = document.getElementById("sim-ref-status");
    const regulamentoLink = document.getElementById("regulamento-link");

    // Renderizar interface
    renderStudentView();

    // Configurar Listeners do Painel de Simulação
    if (toggleSimBtn && simPanel) {
        toggleSimBtn.addEventListener("click", () => {
            simPanel.classList.toggle("collapsed");
        });
    }

    // Botões Preset
    presetBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const user = e.target.getAttribute("data-user");
            const pts = e.target.getAttribute("data-pts");
            const pend = e.target.getAttribute("data-pend");
            
            // Recarrega a página com a nova Query String
            window.location.search = `?aluno=${user}&pontos=${pts}&pendentes=${pend}`;
        });
    });

    // Ajustes diretos sem recarregar
    if (simPtsInput && simPendInput) {
        simPtsInput.value = userState.pointsResgataveis;
        simPendInput.value = userState.pointsPendentes;

        simPtsInput.addEventListener("input", (e) => {
            userState.pointsResgataveis = parseInt(e.target.value) || 0;
            saveStateToLocalStorage();
            renderStudentView();
        });
        simPendInput.addEventListener("input", (e) => {
            userState.pointsPendentes = parseInt(e.target.value) || 0;
            saveStateToLocalStorage();
            renderStudentView();
        });
    }

    // Adição manual de indicação
    if (simAddRefBtn) {
        simAddRefBtn.addEventListener("click", () => {
            const name = simRefName.value.trim() || MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
            const status = simRefStatus.value;
            
            const newRef = {
                name: name,
                date: new Date().toISOString().split('T')[0],
                status: status,
                points: 200
            };

            userState.referrals.push(newRef);
            
            if (status === "validado") {
                userState.pointsResgataveis += 200;
                if (simPtsInput) simPtsInput.value = userState.pointsResgataveis;
            } else {
                userState.pointsPendentes += 200;
                if (simPendInput) simPendInput.value = userState.pointsPendentes;
            }

            saveStateToLocalStorage();
            simRefName.value = "";
            renderStudentView();
        });
    }

    // Copiar Link
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener("click", handleCopyReferralLink);
    }

    // Regulamento Alert
    if (regulamentoLink) {
        regulamentoLink.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Regulamento Indica Pro:\n\n1. O programa é de uso exclusivo para captar novos alunos.\n2. A cada matrícula validada, o aluno indicador ganha 200 pontos.\n3. Validação após superar o prazo legal de garantia/cancelamento de 15 dias.\n4. Prêmios físicos disponíveis apenas para entrega no Brasil.");
        });
    }
}

// Analisa os parâmetros da URL
function parseUrlParameters() {
    // Parâmetros são lidos na função global loadState()
}

// Renderiza elementos visuais do Aluno
function renderStudentView() {
    // 1. Nome do Aluno
    const welcomeEl = document.getElementById("welcome-message");
    if (welcomeEl) {
        welcomeEl.textContent = `Olá, ${userState.name}`;
    }

    // 2. Atualizar Contadores do Dashboard
    const ptsResgEl = document.getElementById("points-resgataveis-val");
    const ptsPendEl = document.getElementById("points-pendentes-val");
    
    if (ptsResgEl) ptsResgEl.textContent = userState.pointsResgataveis;
    if (ptsPendEl) ptsPendEl.textContent = userState.pointsPendentes;

    // 3. Atualizar Input do Link de Indicação (link dinâmico curto no formato solicitado)
    const referralLinkEl = document.getElementById("referral-link");
    if (referralLinkEl) {
        // Monta a URL dinamicamente para funcionar tanto nos testes locais quanto quando for para o ar
        let currentUrl = window.location.href.split('?')[0];
        let guestUrl = "";
        
        if (currentUrl.includes("index.html")) {
            guestUrl = currentUrl.replace("index.html", "convidado.html");
        } else {
            // Fallback caso hospede em subpasta
            guestUrl = currentUrl.endsWith("/") ? currentUrl + "convidado.html" : currentUrl + "/convidado.html";
        }
        
        const safeName = encodeURIComponent(userState.name);
        // Oculta o email na URL convertendo para Base64 simples (evita texto explícito)
        const safeEmail = btoa(userState.email); 
        
        referralLinkEl.value = `${guestUrl}?ref=${safeName}&em=${safeEmail}`;
    }

    // Atualizar botão de convite da simulação
    const simGoGuestBtn = document.getElementById("sim-go-guest-btn");
    if (simGoGuestBtn) {
        simGoGuestBtn.href = `convidado.html?ref=${encodeURIComponent(userState.name)}`;
    }

    // 4. Renderizar Vitrine de Prêmios
    renderRewardsGrid();

    // 5. Renderizar Histórico
    renderHistoryTable();
}

// Renderiza os Cards no Grid da Vitrine
function renderRewardsGrid() {
    const grid = document.getElementById("rewards-grid");
    if (!grid) return;

    grid.innerHTML = "";

    REWARDS_CATALOG.forEach(reward => {
        const isUnlocked = userState.pointsResgataveis >= reward.points;
        const missingPoints = reward.points - userState.pointsResgataveis;
        const progressPct = Math.min(100, (userState.pointsResgataveis / reward.points) * 100);

        const card = document.createElement("div");
        card.className = `reward-card ${isUnlocked ? 'unlocked' : 'locked'}`;

        let badgeClass = "badge-digital";
        if (reward.category === "Físico") badgeClass = "badge-fisico";
        if (reward.category === "Crédito Financeiro") badgeClass = "badge-financeiro";

        card.innerHTML = `
            <div class="reward-image-box">
                ${reward.banner}
                ${isUnlocked ? `<div class="reward-card-header unlocked">✔ Disponível</div>` : ''}
            </div>

            <div class="reward-details">
                <span class="reward-category-badge ${badgeClass}">${reward.category}</span>
                <h3 class="reward-title">${reward.title}</h3>
                <div class="reward-points">${reward.points} Pontos</div>

                ${!isUnlocked ? `
                <div class="reward-progress-box">
                    <span class="progress-text">Progresso (${Math.floor(progressPct)}%)</span>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${progressPct}%"></div>
                    </div>
                </div>
                ` : ''}

                <button class="reward-claim-btn" ${!isUnlocked ? 'disabled' : ''}>
                    ${isUnlocked ? 'Solicitar' : `Faltam ${missingPoints} Pts`}
                </button>
            </div>
        `;

        if (isUnlocked) {
            const btn = card.querySelector(".reward-claim-btn");
            btn.addEventListener("click", async () => {
                // Altera visual do botão
                const originalText = btn.textContent;
                btn.textContent = "Processando...";
                btn.disabled = true;

                try {
                    const formData = new URLSearchParams();
                    formData.append("action", "resgate");
                    formData.append("aluno", userState.name);
                    formData.append("emailAluno", userState.email);
                    formData.append("premio", reward.title);
                    formData.append("pontos", reward.points);

                    // Envia para a planilha
                    await fetch(WEB_APP_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        body: formData
                    });

                    // Atualiza os pontos locais
                    userState.pointsResgataveis -= reward.points;
                    saveStateToLocalStorage();
                    
                    const simPtsInput = document.getElementById("sim-pts-input");
                    if (simPtsInput) simPtsInput.value = userState.pointsResgataveis;

                    renderStudentView();

                    // Exibe confirmação modal
                    const modal = document.getElementById("claim-modal");
                    const mTitle = document.getElementById("modal-prize-title");
                    if (modal && mTitle) {
                        mTitle.textContent = reward.title;
                        modal.classList.remove("hidden");
                    }
                } catch (e) {
                    console.error("Erro ao solicitar resgate:", e);
                    alert("Ocorreu um erro ao processar seu resgate. Tente novamente.");
                    btn.textContent = originalText;
                    btn.disabled = false;
                }
            });
        }

        grid.appendChild(card);
    });

    // Fechar Modal
    const cModal = document.getElementById("claim-modal");
    const closeMBtn = document.getElementById("close-modal-btn");
    const confirmMBtn = document.getElementById("confirm-modal-btn");
    
    if (closeMBtn) closeMBtn.addEventListener("click", () => cModal.classList.add("hidden"));
    if (confirmMBtn) confirmMBtn.addEventListener("click", () => cModal.classList.add("hidden"));
}

// Renderiza a Tabela de Indicações / Estado Vazio
function renderHistoryTable() {
    const emptyState = document.getElementById("empty-history-state");
    const tableWrapper = document.getElementById("history-table-wrapper");
    const tbody = document.getElementById("history-table-body");

    if (!emptyState || !tableWrapper || !tbody) return;

    if (userState.referrals.length === 0) {
        emptyState.classList.remove("hidden");
        tableWrapper.classList.add("hidden");
    } else {
        emptyState.classList.add("hidden");
        tableWrapper.classList.remove("hidden");
        
        tbody.innerHTML = "";

        const sorted = [...userState.referrals].sort((a,b) => new Date(b.date) - new Date(a.date));

        sorted.forEach(ref => {
            const row = document.createElement("tr");

            const statusClass = ref.status === "validado" ? "val-ativo" : "val-pendente";
            const statusLabel = ref.status === "validado" ? "Validada" : "Pendente (Garantia)";
            const ptsClass = ref.status === "validado" ? "pts-green" : "pts-muted";
            const ptsText = ref.status === "validado" ? `+${ref.points}` : `(${ref.points} pendentes)`;

            const parts = ref.date.split("-");
            const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : ref.date;

            row.innerHTML = `
                <td><strong>${ref.name}</strong></td>
                <td>${formattedDate}</td>
                <td>
                    <span class="badge-status-ponto ${statusClass}">${statusLabel}</span>
                </td>
                <td>
                    <span class="history-points-val ${ptsClass}">${ptsText} pts</span>
                </td>
            `;

            tbody.appendChild(row);
        });
    }
}

// Copiar link personalizado
function handleCopyReferralLink() {
    const linkEl = document.getElementById("referral-link");
    const labelEl = document.getElementById("copy-btn-label");
    const iconCopy = document.getElementById("icon-copy");
    const iconSuccess = document.getElementById("icon-success");
    const btn = document.getElementById("copy-link-btn");

    if (!linkEl || !labelEl) return;

    navigator.clipboard.writeText(linkEl.value).then(() => {
        labelEl.textContent = "COPIADO COM SUCESSO!";
        if (iconCopy) iconCopy.classList.add("hidden");
        if (iconSuccess) iconSuccess.classList.remove("hidden");
        if (btn) {
            btn.style.background = "#10b981"; // Muda fundo pra verde mais escuro/diferente
            btn.style.color = "#ffffff";
        }

        setTimeout(() => {
            labelEl.textContent = "COPIAR MEU LINK DE INDICAÇÃO";
            if (iconCopy) iconCopy.classList.remove("hidden");
            if (iconSuccess) iconSuccess.classList.add("hidden");
            if (btn) {
                btn.style.background = "var(--color-green-tech)";
                btn.style.color = "#0b0d19";
            }
        }, 2000);
    });
}

// ==========================================================================
// 5. LÓGICA DA PÁGINA 2: VISÃO DO CONVIDADO (GUEST VIEW)
// ==========================================================================
function initGuestPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const refUser = urlParams.get("ref") || userState.name;
    
    let refEmail = "";
    try {
        if (urlParams.get("em")) refEmail = atob(urlParams.get("em"));
    } catch(e) {}

    const bannerTextEl = document.getElementById("banner-text");
    if (bannerTextEl) {
        bannerTextEl.innerHTML = `Você foi indicado por <strong>${refUser}</strong> para fazer parte do PAP!`;
    }

    const leadForm = document.getElementById("ref-lead-form");
    const leadSuccess = document.getElementById("lead-success-msg");
    const checkoutBtn = document.getElementById("checkout-cta-btn");

    if (leadForm) {
        leadForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("lead-name").value.trim();
            const email = document.getElementById("lead-email").value.trim();
            const relacao = document.getElementById("lead-relation") ? document.getElementById("lead-relation").value : "";
            const atuacao = document.getElementById("lead-occupation") ? document.getElementById("lead-occupation").value : "";
            const hobby = document.getElementById("lead-hobby") ? document.getElementById("lead-hobby").value : "";
            
            const submitBtn = document.getElementById("submit-lead-btn");
            
            if (name && email) {
                // Desabilitar botão para evitar duplo clique
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = "Validando...";
                }

                // 1. Enviar os dados para a Planilha (Google Sheets) via POST
                try {
                    const formData = new URLSearchParams();
                    formData.append("indicador", refUser);
                    formData.append("emailIndicador", refEmail); 
                    formData.append("convidado", name);
                    formData.append("email", email);
                    formData.append("relacao", relacao);
                    formData.append("atuacao", atuacao);
                    formData.append("hobby", hobby);

                    // Usamos fetch simples para o App Script (fire and forget)
                    await fetch(WEB_APP_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        body: formData
                    });
                } catch (err) {
                    console.error("Erro ao enviar para planilha, mas fluxo continua:", err);
                }

                // (Anotação legada removida pois agora lemos direto da planilha, mas para mock fallback mantemos local)
                const newRef = {
                    name: name,
                    date: new Date().toISOString().split('T')[0],
                    status: "pendente",
                    points: 200
                };
                userState.referrals.push(newRef);
                saveStateToLocalStorage();
                
                // 2. Ocultar formulário com animação
                leadForm.style.display = "none";
                
                // 3. Exibir aviso de sucesso
                if (leadSuccess) leadSuccess.classList.remove("hidden");
                
                // 4. Destravar botão de Checkout
                if (checkoutBtn) {
                    checkoutBtn.classList.remove("disabled");
                    checkoutBtn.classList.add("active");
                    checkoutBtn.setAttribute("aria-disabled", "false");
                    checkoutBtn.href = `https://voomp.com.br/checkout?ref=${encodeURIComponent(refUser)}`; // Ajustar URL real
                    
                    const lockIcon = checkoutBtn.querySelector(".lock-icon");
                    if (lockIcon) lockIcon.textContent = "✓";
                }
            }
        });
    }
}

// ==========================================================================
// 6. LÓGICA DA TELA 3: PAINEL ADMINISTRATIVO (ADMIN VIEW)
// ==========================================================================
function initAdminPage() {
    renderAdminTable();
}

function renderAdminTable() {
    const tbody = document.getElementById("admin-table-body");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    if (userState.referrals.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 30px;">Nenhuma indicação cadastrada no momento.</td></tr>`;
        return;
    }
    
    // Ordena pendentes primeiro
    const sorted = [...userState.referrals].sort((a,b) => {
        if (a.status === "pendente" && b.status !== "pendente") return -1;
        if (a.status !== "pendente" && b.status === "pendente") return 1;
        return new Date(b.date) - new Date(a.date);
    });
    
    sorted.forEach((ref) => {
        const row = document.createElement("tr");
        
        const statusClass = ref.status === "validado" ? "val-ativo" : "val-pendente";
        const statusLabel = ref.status === "validado" ? "Validada" : "Garantia 15 Dias";
        const ptsClass = ref.status === "validado" ? "pts-green" : "pts-muted";
        
        const originalIndex = userState.referrals.findIndex(r => r.name === ref.name && r.date === ref.date);
        
        let actionsHTML = "";
        if (ref.status === "pendente") {
            actionsHTML = `<button class="form-submit-btn" style="padding: 6px 12px; font-size: 10.5px; margin: 0; float: right; border-radius: var(--border-leaf-sm);" onclick="liberarPremio(${originalIndex})">Liberar Prêmio</button>`;
        } else {
            actionsHTML = `<span style="color: var(--color-green-tech); font-weight: 700; float: right;">Liberado ✓</span>`;
        }
        
        const parts = ref.date.split("-");
        const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : ref.date;
        
        row.innerHTML = `
            <td><strong>${userState.name}</strong></td>
            <td><strong>${ref.name}</strong></td>
            <td>${formattedDate}</td>
            <td><span class="badge-status-ponto ${statusClass}">${statusLabel}</span></td>
            <td><span class="history-points-val ${ptsClass}">200 pts</span></td>
            <td style="text-align: right;">${actionsHTML}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Ação de liberar pontos
window.liberarPremio = function(index) {
    if (index < 0 || index >= userState.referrals.length) return;
    
    const ref = userState.referrals[index];
    if (ref.status === "validado") return;
    
    ref.status = "validado";
    
    userState.pointsResgataveis += 200;
    userState.pointsPendentes = Math.max(0, userState.pointsPendentes - 200);
    
    saveStateToLocalStorage();
    renderAdminTable();
    
    alert(`Sucesso!\nA indicação de ${ref.name} foi validada.\n200 pontos foram transferidos para o saldo de ${userState.name}.`);
};



// ==========================================================================
// 7. NOVA LÓGICA DA PÁGINA DE CONVIDADO (OFERTA -> FORM -> CHECKOUT)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Transição Oferta -> Formulário
    const btnShowForm = document.getElementById('btn-show-form');
    const offerState = document.getElementById('offer-state');
    const formState = document.getElementById('form-state');
    const leadForm = document.getElementById('ref-lead-form');
    const btnCheckoutFinal = document.getElementById('btn-checkout-final');
    
    if (btnShowForm && offerState && formState) {
        btnShowForm.addEventListener('click', () => {
            offerState.classList.add('hidden');
            setTimeout(() => {
                formState.classList.remove('hidden');
            }, 400); // aguarda a opacidade terminar
        });
    }

    // 2. Transição Formulário -> Checkout (Submissão)
    if (leadForm) {
        // Remove old listener if any (since we are appending, we need to redefine or intercept)
        // Actually, the old listener was attached to submit. Let's just override it safely or let it run.
        // The easiest way is to clone and replace the form to remove old listeners.
        const newLeadForm = leadForm.cloneNode(true);
        leadForm.parentNode.replaceChild(newLeadForm, leadForm);

        newLeadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-lead-btn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Validando...";
            }

            const urlParams = new URLSearchParams(window.location.search);
            const refUser = urlParams.get('ref') || 'Indicação Anônima';

            // Dados do form
            const name = document.getElementById("lead-name").value;
            const email = document.getElementById("lead-email").value;
            const relacao = document.getElementById("lead-relation").value;
            const atuacao = document.getElementById("lead-occupation").value;
            const hobby = document.getElementById("lead-hobby").value;

            try {
                const formData = new URLSearchParams();
                formData.append("indicador", refUser);
                formData.append("convidado", name);
                formData.append("email", email);
                formData.append("relacao", relacao);
                formData.append("atuacao", atuacao);
                formData.append("hobby", hobby);

                await fetch(WEB_APP_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                });
            } catch (err) {
                console.error("Erro no envio:", err);
            }

            // Oculta Form, volta para Oferta, mas com Botão de Checkout ativado
            const formStateEl = document.getElementById('form-state');
            const offerStateEl = document.getElementById('offer-state');
            const btnShowFormEl = document.getElementById('btn-show-form');
            const btnCheckoutFinalEl = document.getElementById('btn-checkout-final');

            formStateEl.classList.add('hidden');
            setTimeout(() => {
                offerStateEl.classList.remove('hidden');
                btnShowFormEl.classList.add('hidden');
                btnCheckoutFinalEl.classList.remove('hidden');
                // Adiciona o ref URL
                btnCheckoutFinalEl.href = `https://voomp.com.br/checkout?ref=${encodeURIComponent(refUser)}`;
            }, 400);
        });
    }

    // 3. Ementa - Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.syllabus-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.add('hidden'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if(targetContent) {
                targetContent.classList.remove('hidden');
                // Timeout to allow display block before opacity transition
                setTimeout(() => targetContent.classList.add('active'), 10);
            }
        });
    });

    // 4. Ementa - Accordion
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        const body = acc.querySelector('.accordion-body');
        
        header.addEventListener('click', () => {
            const isOpen = acc.classList.contains('open');
            
            // Close all
            accordions.forEach(a => {
                a.classList.remove('open');
                a.querySelector('.accordion-body').style.maxHeight = null;
            });

            if (!isOpen) {
                acc.classList.add('open');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // 5. Smooth Scroll
    document.querySelectorAll('.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const btnBackOffer = document.getElementById('btn-back-offer');
    if (btnBackOffer) {
        btnBackOffer.addEventListener('click', () => {
            const formState = document.getElementById('form-state');
            const offerState = document.getElementById('offer-state');
            
            formState.classList.remove('active');
            formState.classList.add('hidden');
            
            offerState.classList.remove('hidden');
            offerState.classList.add('active');
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Override logic for btn-show-form
    let btnShowFormEl = document.getElementById('btn-show-form');
    if (btnShowFormEl) {
        // Clone to remove old listeners
        const newBtn = btnShowFormEl.cloneNode(true);
        btnShowFormEl.parentNode.replaceChild(newBtn, btnShowFormEl);
        btnShowFormEl = newBtn;
        
        const modalBackdrop = document.getElementById('modal-backdrop');
        const closeModalBtn = document.getElementById('close-modal-btn');
        
        btnShowFormEl.addEventListener('click', () => {
            if (modalBackdrop) {
                modalBackdrop.classList.remove('hidden');
            }
        });
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modalBackdrop.classList.add('hidden');
            });
        }
        
        // Optional: click outside to close
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                if (e.target === modalBackdrop) {
                    modalBackdrop.classList.add('hidden');
                }
            });
        }
    }
    
    // Make sure form submission hides modal and shows checkout button
    const leadFormEl = document.getElementById('ref-lead-form');
    if (leadFormEl) {
        // We will intercept submit
        leadFormEl.addEventListener('submit', (e) => {
            const modalBackdrop = document.getElementById('modal-backdrop');
            if (modalBackdrop) {
                modalBackdrop.classList.add('hidden'); // Close modal
            }
            // The original logic handles Voomp webhook and shows the btn-checkout-final
            // We just ensure btnShowForm is hidden and btnCheckoutFinal is shown.
            const btnS = document.getElementById('btn-show-form');
            const btnC = document.getElementById('btn-checkout-final');
            if (btnS) btnS.classList.add('hidden');
            if (btnC) btnC.classList.remove('hidden');
        });
    }
});
