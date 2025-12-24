window.KAKAO_LOGIN_CONSTANTS = {
    SYMBOL_SVG: `<svg class="symbol" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 5c-7.18 0-13 4.477-13 10 0 3.57 2.414 6.64 6.1 8.47-.24.81-1.08 3.81-1.19 4.28-.08.35.14.35.31.24.67-.45 3.75-2.53 5.13-3.47.86.32 1.74.5 2.65.5 7.18 0 13-4.477 13-10S23.18 5 16 5z"/>
</svg>`,
    CSS_CONTENT: `.kakao-login-btn {
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
    -webkit-font-smoothing: antialiased;
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
.kakao-login-btn.short svg.symbol { margin-right: 0; }`
};
