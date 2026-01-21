import app from "../src";

// 테스트용 홈 페이지
class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
        <h1 style="margin-bottom: 1rem;">🏠 Home Page</h1>
        <p style="margin-bottom: 2rem; color: #666;">
          Welcome to Modern App Test Environment!
        </p>
        
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button id="theme-btn" style="
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            background: #007bff;
            color: white;
            cursor: pointer;
          ">
            🌓 Toggle Theme
          </button>
          
          <button id="about-btn" style="
            padding: 0.5rem 1rem;
            border: 1px solid #007bff;
            border-radius: 4px;
            background: transparent;
            color: #007bff;
            cursor: pointer;
          ">
            ℹ️ About
          </button>
        </div>
        
        <p style="margin-top: 2rem; color: #999; font-size: 0.875rem;">
          Current Theme: <strong id="current-theme">${app.theme.get() || 'light'}</strong>
        </p>
      </div>
    `;

    this.querySelector('#theme-btn')?.addEventListener('click', () => {
      const newTheme = app.theme.get() === 'dark' ? 'light' : 'dark';
      app.theme.set(newTheme);
      
      const themeDisplay = this.querySelector('#current-theme');
      if (themeDisplay) themeDisplay.textContent = newTheme;
    });

    this.querySelector('#about-btn')?.addEventListener('click', () => {
      app.navigate('/about');
    });
  }
}

// 테스트용 About 페이지
class AboutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
        <h1 style="margin-bottom: 1rem;">ℹ️ About Page</h1>
        <p style="margin-bottom: 2rem; color: #666;">
          This is a test page for the Modern App framework.
        </p>
        
        <h2 style="margin-bottom: 1rem; font-size: 1.25rem;">Test Notifications</h2>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
          <button id="info-btn" style="padding: 0.5rem 1rem; border: none; border-radius: 4px; background: #17a2b8; color: white; cursor: pointer;">
            Info
          </button>
          <button id="success-btn" style="padding: 0.5rem 1rem; border: none; border-radius: 4px; background: #28a745; color: white; cursor: pointer;">
            Success
          </button>
          <button id="warning-btn" style="padding: 0.5rem 1rem; border: none; border-radius: 4px; background: #ffc107; color: #333; cursor: pointer;">
            Warning
          </button>
          <button id="error-btn" style="padding: 0.5rem 1rem; border: none; border-radius: 4px; background: #dc3545; color: white; cursor: pointer;">
            Error
          </button>
        </div>
        
        <button id="home-btn" style="
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          background: #007bff;
          color: white;
          cursor: pointer;
        ">
          🏠 Back to Home
        </button>
      </div>
    `;

    this.querySelector('#home-btn')?.addEventListener('click', () => {
      app.navigate('/');
    });

    this.querySelector('#info-btn')?.addEventListener('click', () => {
      app.info('This is an info message', { duration: 3000 });
    });
    
    this.querySelector('#success-btn')?.addEventListener('click', () => {
      app.success('Operation successful!', { duration: 3000 });
    });
    
    this.querySelector('#warning-btn')?.addEventListener('click', () => {
      app.warning('Please be careful', { duration: 3000 });
    });
    
    this.querySelector('#error-btn')?.addEventListener('click', () => {
      app.error('An error occurred', { duration: 3000 });
    });
  }
}

// 테스트용 404 페이지
class NotFoundPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div style="padding: 2rem; max-width: 800px; margin: 0 auto; text-align: center;">
        <h1 style="font-size: 4rem; margin-bottom: 1rem;">404</h1>
        <h2 style="margin-bottom: 1rem;">Page Not Found</h2>
        <p style="margin-bottom: 2rem; color: #666;">
          The page you're looking for doesn't exist.
        </p>
        
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button id="home-btn" style="
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            background: #007bff;
            color: white;
            cursor: pointer;
          ">
            🏠 Go Home
          </button>
          
          <button id="back-btn" style="
            padding: 0.5rem 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: transparent;
            cursor: pointer;
          ">
            ← Go Back
          </button>
        </div>
      </div>
    `;

    this.querySelector('#home-btn')?.addEventListener('click', () => {
      app.navigate('/');
    });
    
    this.querySelector('#back-btn')?.addEventListener('click', () => {
      window.history.back();
    });
  }
}

customElements.define('home-page', HomePage);
customElements.define('about-page', AboutPage);
customElements.define('notfound-page', NotFoundPage);
