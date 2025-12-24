const labels = {
    ko: ['카카오 로그인', '로그인'],
    en: ['Login with Kakao', 'Login']
};

const cssContent = `.kakao-login-btn {
    --kakao-btn-height: 45px;
    --kakao-btn-width: auto;
    --kakao-btn-bg: #FEE500;
    --kakao-btn-text: rgba(0, 0, 0, 0.85);
    --kakao-btn-radius: 12px;
    --kakao-btn-font-size: calc(var(--kakao-btn-height) / 3);
    --kakao-btn-padding: calc(var(--kakao-btn-height) * 0.4);
    --kakao-btn-symbol-size: calc(var(--kakao-btn-height) * 0.4);
    --kakao-btn-symbol-margin: calc(var(--kakao-btn-height) * 0.18);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--kakao-btn-height);
    width: var(--kakao-btn-width);
    padding: 0 var(--kakao-btn-padding);
    background-color: var(--kakao-btn-bg);
    color: var(--kakao-btn-text);
    border-radius: var(--kakao-btn-radius);
    text-decoration: none;
    font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    font-size: var(--kakao-btn-font-size);
    font-weight: 700;
    border: none;
    cursor: pointer;
    box-sizing: border-box;
    white-space: nowrap;
    transition: filter 0.2s, background-color 0.2s;
    outline: none;
}
.kakao-login-btn:hover { filter: brightness(0.96); }
.kakao-login-btn:active { filter: brightness(0.92); }
.kakao-login-btn svg.symbol {
    width: var(--kakao-btn-symbol-size);
    height: var(--kakao-btn-symbol-size);
    margin-right: var(--kakao-btn-symbol-margin);
    flex-shrink: 0;
    display: block;
    fill: currentColor;
}
.kakao-login-btn.white {
    --kakao-btn-bg: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.08);
}
.kakao-login-btn.left { justify-content: flex-start; }
.kakao-login-btn.short { padding: 0; width: var(--kakao-btn-height); justify-content: center; }
.kakao-login-btn.short svg.symbol { margin-right: 0; }`;

const symbolSvg = `<svg class="symbol" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 5c-7.18 0-13 4.477-13 10 0 3.57 2.414 6.64 6.1 8.47-.24.81-1.08 3.81-1.19 4.28-.08.35.14.35.31.24.67-.45 3.75-2.53 5.13-3.47.86.32 1.74.5 2.65.5 7.18 0 13-4.477 13-10S23.18 5 16 5z"/>
</svg>`;

const state = {
    style: 'yellow',
    type: 'full',
    widthMode: 'auto',
    widthCustom: 300,
    align: 'center',
    lang: 'ko',
    label: '카카오 로그인',
    height: 45,
    radius: 12,
    activeTab: 'html'
};

const previewContainer = document.getElementById('preview-container');
const codeDisplay = document.getElementById('code-display');
const copyBtn = document.getElementById('copy-btn');
const langSelect = document.getElementById('lang');
const labelSelect = document.getElementById('label-text');
const typeSelect = document.getElementById('type');
const widthModeSelect = document.getElementById('width-mode');
const widthSlider = document.getElementById('width-custom');
const alignSelect = document.getElementById('align');
const styleSelect = document.getElementById('style');
const heightInput = document.getElementById('height');
const radiusInput = document.getElementById('radius');
const tabBtns = document.querySelectorAll('.tab-btn');

function updateLabels() {
    const currentLabels = labels[state.lang];
    labelSelect.innerHTML = currentLabels.map(l => `<option value="${l}">${l}</option>`).join('');
    state.label = currentLabels[0];
}

function update() {
    state.style = styleSelect.value;
    state.type = typeSelect.value;
    state.widthMode = widthModeSelect.value;
    state.widthCustom = widthSlider.value;
    state.align = alignSelect.value;
    state.lang = langSelect.value;
    state.height = heightInput.value;
    state.radius = radiusInput.value;
    
    document.getElementById('height-val').textContent = state.height;
    document.getElementById('radius-val').textContent = state.radius;
    document.getElementById('width-val').textContent = state.widthCustom;

    const isShort = state.type === 'short';
    labelSelect.disabled = isShort;
    
    const isAuto = state.widthMode === 'auto';
    widthSlider.disabled = isAuto || state.widthMode === '100%';
    alignSelect.disabled = isShort || isAuto;

    let classes = ['kakao-login-btn'];
    if (state.style === 'white') classes.push('white');
    if (isShort) classes.push('short');
    if (!isShort && !isAuto && state.align === 'left') classes.push('left');

    let widthVal = 'auto';
    if (state.widthMode === '100%') widthVal = '100%';
    else if (state.widthMode === 'custom') widthVal = state.widthCustom + 'px';

    const styleAttrArr = [
        `--kakao-btn-height: ${state.height}px`,
        `--kakao-btn-radius: ${state.radius}px`
    ];
    if (widthVal !== 'auto') styleAttrArr.push(`--kakao-btn-width: ${widthVal}`);
    
    const styleAttr = `style="${styleAttrArr.join('; ')}"`;
    
    let html = `<button class="${classes.join(' ')}" ${styleAttr}>\n    ${symbolSvg}`;
    if (!isShort) {
        html += `\n    ${state.label}`;
    }
    html += `\n</button>`;

    previewContainer.innerHTML = html;
    
    if (state.activeTab === 'html') {
        codeDisplay.textContent = html;
    } else {
        codeDisplay.textContent = cssContent;
    }
}

langSelect.addEventListener('change', () => {
    state.lang = langSelect.value;
    updateLabels();
    update();
});

labelSelect.addEventListener('change', () => {
    state.label = labelSelect.value;
    update();
});

[styleSelect, typeSelect, widthModeSelect, widthSlider, alignSelect, heightInput, radiusInput].forEach(el => el.addEventListener('input', update));

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeTab = btn.dataset.tab;
        update();
    });
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(codeDisplay.textContent);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy', 2000);
});

updateLabels();
update();
