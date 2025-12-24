/**
 * Kakao Login Button Web Component
 * Usage: <kakao-login-button height="45" width="auto" style-type="yellow" type="full" lang="ko" align="center"></kakao-login-button>
 */
class KakaoLoginButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['height', 'width', 'style-type', 'type', 'lang', 'align', 'radius', 'label'];
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const height = this.getAttribute('height') || '45';
        const width = this.getAttribute('width') || 'auto';
        const styleType = this.getAttribute('style-type') || 'yellow';
        const type = this.getAttribute('type') || 'full';
        const lang = this.getAttribute('lang') || 'ko';
        const align = this.getAttribute('align') || 'center';
        const radius = this.getAttribute('radius') || '12';
        
        const labels = {
            ko: ['카카오 로그인', '로그인'],
            en: ['Login with Kakao', 'Login']
        };
        
        let label = this.getAttribute('label');
        if (!label) {
            label = labels[lang] ? labels[lang][0] : labels.ko[0];
        }

        const isShort = type === 'short';
        const isWhite = styleType === 'white';
        const isLeft = align === 'left' && width !== 'auto';

        const symbolSvg = `<svg class="symbol" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 5c-7.18 0-13 4.477-13 10 0 3.57 2.414 6.64 6.1 8.47-.24.81-1.08 3.81-1.19 4.28-.08.35.14.35.31.24.67-.45 3.75-2.53 5.13-3.47.86.32 1.74.5 2.65.5 7.18 0 13-4.477 13-10S23.18 5 16 5z"/>
        </svg>`;

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: inline-block;
                width: ${width === '100%' ? '100%' : 'auto'};
            }
            .kakao-login-btn {
                --kakao-btn-height: ${height}px;
                --kakao-btn-width: ${width};
                --kakao-btn-bg: ${isWhite ? '#FFFFFF' : '#FEE500'};
                --kakao-btn-text: rgba(0, 0, 0, 0.85);
                --kakao-btn-radius: ${radius}px;
                
                --kakao-btn-font-size: calc(var(--kakao-btn-height) / 3);
                --kakao-btn-padding: calc(var(--kakao-btn-height) * 0.4);
                --kakao-btn-symbol-size: calc(var(--kakao-btn-height) * 0.4);
                --kakao-btn-symbol-margin: calc(var(--kakao-btn-height) * 0.18);

                display: flex;
                align-items: center;
                justify-content: ${isShort ? 'center' : (isLeft ? 'flex-start' : 'center')};
                height: var(--kakao-btn-height);
                width: var(--kakao-btn-width);
                padding: 0 ${isShort ? '0' : 'var(--kakao-btn-padding)'};
                background-color: var(--kakao-btn-bg);
                color: var(--kakao-btn-text);
                border-radius: var(--kakao-btn-radius);
                text-decoration: none;
                font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
                font-size: var(--kakao-btn-font-size);
                font-weight: 700;
                border: ${isWhite ? '1px solid rgba(0, 0, 0, 0.08)' : 'none'};
                cursor: pointer;
                box-sizing: border-box;
                white-space: nowrap;
                transition: filter 0.2s;
                outline: none;
                user-select: none;
            }
            .kakao-login-btn:hover { filter: brightness(0.96); }
            .kakao-login-btn:active { filter: brightness(0.92); }
            svg.symbol {
                width: var(--kakao-btn-symbol-size);
                height: var(--kakao-btn-symbol-size);
                margin-right: ${isShort ? '0' : 'var(--kakao-btn-symbol-margin)'};
                flex-shrink: 0;
                display: block;
                fill: currentColor;
            }
        </style>
        <button type="button" class="kakao-login-btn">
            ${symbolSvg}
            ${isShort ? '' : label}
        </button>
        `;
    }
}

customElements.define('kakao-login-button', KakaoLoginButton);
