/**
 * Kakao Login Button Web Component
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
        const constants = window.KAKAO_LOGIN_CONSTANTS || { SYMBOL_SVG: '', CSS_CONTENT: '' };
        
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

        this.shadowRoot.innerHTML = `
        <style>
            ${constants.CSS_CONTENT.replace('.kakao-login-btn', ':host .kakao-login-btn')}
            :host {
                display: inline-block;
                width: ${width === '100%' ? '100%' : 'auto'};
            }
            .kakao-login-btn {
                --kakao-btn-height: ${height}px;
                --kakao-btn-width: ${width};
                --kakao-btn-bg: ${isWhite ? '#FFFFFF' : '#FEE500'};
                --kakao-btn-radius: ${radius}px;
                
                justify-content: ${isShort ? 'center' : (isLeft ? 'flex-start' : 'center')};
                border: ${isWhite ? '1px solid rgba(0, 0, 0, 0.08)' : 'none'};
            }
            svg.symbol {
                margin-right: ${isShort ? '0' : 'var(--kakao-btn-symbol-margin)'};
            }
        </style>
        <button type="button" class="kakao-login-btn">
            ${constants.SYMBOL_SVG}
            ${isShort ? '' : label}
        </button>
        `;
    }
}

if (!customElements.get('kakao-login-button')) {
    customElements.define('kakao-login-button', KakaoLoginButton);
}
