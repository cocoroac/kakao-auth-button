(function() {
    const constants = window.KAKAO_LOGIN_CONSTANTS;
    const labels = {
        ko: ['카카오 로그인', '로그인'],
        en: ['Login with Kakao', 'Login']
    };

    const defaults = {
        style: 'yellow',
        type: 'full',
        tagType: 'button',
        widthMode: 'auto',
        widthCustom: 300,
        align: 'center',
        lang: 'ko',
        label: '카카오 로그인',
        height: 45,
        radius: 12,
        activeTab: 'html'
    };

    let state = { ...defaults };

    const previewContainer = document.getElementById('preview-container');
    const codeDisplay = document.getElementById('code-display');
    const copyBtn = document.getElementById('copy-btn');
    const resetBtn = document.getElementById('reset-btn');
    const langSelect = document.getElementById('lang');
    const labelSelect = document.getElementById('label-text');
    const typeSelect = document.getElementById('type');
    const tagTypeSelect = document.getElementById('tag-type');
    const widthModeSelect = document.getElementById('width-mode');
    const widthSlider = document.getElementById('width-custom');
    const alignSelect = document.getElementById('align');
    const styleSelect = document.getElementById('style');
    const heightInput = document.getElementById('height');
    const radiusInput = document.getElementById('radius');
    const tabBtns = document.querySelectorAll('.tab-btn');

    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = constants.CSS_CONTENT;
        document.head.appendChild(style);
    }

    function loadStateFromUrl() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('style')) state.style = params.get('style');
        if (params.has('type')) state.type = params.get('type');
        if (params.has('tagType')) state.tagType = params.get('tagType');
        if (params.has('widthMode')) state.widthMode = params.get('widthMode');
        if (params.has('widthCustom')) state.widthCustom = parseInt(params.get('widthCustom'));
        if (params.has('align')) state.align = params.get('align');
        if (params.has('lang')) state.lang = params.get('lang');
        if (params.has('height')) state.height = parseInt(params.get('height'));
        if (params.has('radius')) state.radius = parseInt(params.get('radius'));
        
        syncUi();
        updateLabels();
        if (params.has('label')) {
            state.label = params.get('label');
            labelSelect.value = state.label;
        }
    }

    function syncUi() {
        styleSelect.value = state.style;
        typeSelect.value = state.type;
        tagTypeSelect.value = state.tagType;
        widthModeSelect.value = state.widthMode;
        widthSlider.value = state.widthCustom;
        alignSelect.value = state.align;
        langSelect.value = state.lang;
        heightInput.value = state.height;
        radiusInput.value = state.radius;
    }

    function updateUrl() {
        const params = new URLSearchParams();
        Object.keys(state).forEach(key => {
            if (key !== 'activeTab') {
                params.set(key, state[key]);
            }
        });
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }

    function updateLabels() {
        const currentLabels = labels[state.lang];
        labelSelect.innerHTML = currentLabels.map(l => `<option value="${l}">${l}</option>`).join('');
        if (!currentLabels.includes(state.label)) {
            state.label = currentLabels[0];
        }
        labelSelect.value = state.label;
    }

    function update() {
        state.style = styleSelect.value;
        state.type = typeSelect.value;
        state.tagType = tagTypeSelect.value;
        state.widthMode = widthModeSelect.value;
        state.widthCustom = widthSlider.value;
        state.align = alignSelect.value;
        state.lang = langSelect.value;
        state.label = labelSelect.value;
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
        
        let previewHtml = '';
        const classStr = classes.join(' ');
        if (state.tagType === 'button') {
            previewHtml = `<button type="button" class="${classStr}" ${styleAttr}>\n    ${constants.SYMBOL_SVG}\n    ${isShort ? '' : state.label}\n</button>`;
        } else if (state.tagType === 'anchor') {
            previewHtml = `<a href="#" class="${classStr}" ${styleAttr}>\n    ${constants.SYMBOL_SVG}\n    ${isShort ? '' : state.label}\n</a>`;
        } else if (state.tagType === 'div') {
            previewHtml = `<div role="button" tabindex="0" class="${classStr}" ${styleAttr}>\n    ${constants.SYMBOL_SVG}\n    ${isShort ? '' : state.label}\n</div>`;
        }
        previewContainer.innerHTML = previewHtml;
        
        if (state.activeTab === 'html') {
            codeDisplay.textContent = previewHtml;
        } else if (state.activeTab === 'css') {
            codeDisplay.textContent = constants.CSS_CONTENT;
        } else if (state.activeTab === 'component') {
            const baseUrl = window.location.href.split('?')[0].split('/').slice(0, -1).join('/');
            const compHtml = `<!-- 1. Include the constants and component -->\n<script src="${baseUrl}/js/shared.js"></script>\n<script src="${baseUrl}/js/kakao-login-button.js"></script>\n\n<!-- 2. Use the component -->\n<kakao-login-button \n  height="${state.height}" \n  width="${widthVal}" \n  style-type="${state.style}" \n  type="${state.type}" \n  lang="${state.lang}" \n  align="${state.align}" \n  radius="${state.radius}"\n></kakao-login-button>`;
            codeDisplay.textContent = compHtml;
        }

        updateUrl();
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

    [styleSelect, typeSelect, tagTypeSelect, widthModeSelect, widthSlider, alignSelect, heightInput, radiusInput].forEach(el => el.addEventListener('input', update));

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

    resetBtn.addEventListener('click', () => {
        state = { ...defaults };
        syncUi();
        updateLabels();
        update();
    });

    // Initialize
    injectStyles();
    loadStateFromUrl();
    update();
})();
