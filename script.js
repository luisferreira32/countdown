class CountdownTimer {
    constructor() {
        this.countdownElement = document.getElementById('countdown');
        this.motivationElement = document.getElementById('motivation-quote');
        this.quoteTextElement = document.getElementById('quote-text');
        this.errorElement = document.getElementById('error-message');
        this.countdownLabelElement = document.getElementById('countdown-label');

        this.endDate = null;
        this.motivationQuotes = [];
        this.intervalId = null;
        this.isFinished = false;
        this.quoteTimeout = null;
        this.isQuoteVisible = false;

        this.init();
    }

    init() {
        this.parseUrlParameters();
        this.setupEventListeners();

        if (this.endDate) {
            this.startCountdown();
        } else {
            this.endDate = new Date('2025-09-06T20:58:00-06:00');
            this.startCountdown();
        }
    }

    parseUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const endDateParam = urlParams.get('endDate');
        const motivationParam = urlParams.get('motivation');

        if (endDateParam) {
            this.endDate = new Date(endDateParam);

            if (isNaN(this.endDate.getTime())) {
                console.error('Invalid endDate parameter');
                this.endDate = null;
            }
        }

        if (motivationParam) {
            try {
                const decodedMotivation = atob(motivationParam);
                this.motivationQuotes = decodedMotivation
                    .split(',')
                    .map(quote => quote.trim())
                    .filter(quote => quote.length > 0);
            } catch (error) {
                console.error('Error decoding motivation parameter:', error);
                this.motivationQuotes = [
                    "Almost there!",
                    "Just a bit longer!",
                    "Time flies by!",
                    "Thinking of you!",
                ];
            }
        } else {
            this.motivationQuotes = [
                "Almost there!",
                "Just a bit longer!",
                "Time flies by!",
                "Thinking of you!",
            ];
        }
    }

    setupEventListeners() {
        document.body.addEventListener('click', (e) => {
            if (!this.motivationElement.contains(e.target) && !this.isQuoteVisible) {
                this.showMotivationQuote(e.clientX, e.clientY);
            }
        });
    }

    startCountdown() {
        this.updateCountdown();
        this.intervalId = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.endDate.getTime() - now;

        if (distance < 0) {
            this.handleCountdownFinished();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let displayText;
        if (days > 0) {
            displayText = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            this.countdownLabelElement.textContent = 'Days : Hours : Minutes : Seconds';
        } else if (hours > 0) {
            displayText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            this.countdownLabelElement.textContent = 'Hours : Minutes : Seconds';
        } else {
            displayText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            this.countdownLabelElement.textContent = 'Minutes : Seconds';
        }

        this.countdownElement.textContent = displayText;

        if (distance < 60000) {
            this.countdownElement.classList.add('urgent');
        } else {
            this.countdownElement.classList.remove('urgent');
        }
    }

    handleCountdownFinished() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.isFinished = true;
        this.countdownElement.textContent = '00:00';
        this.countdownElement.classList.add('finished');
        this.countdownElement.classList.remove('urgent');
        this.countdownLabelElement.textContent = 'Time\'s Up!';
    }

    showMotivationQuote(mouseX = null, mouseY = null) {
        const quote = this.getRandomMotivationQuote();

        if (!quote) return;

        if (this.quoteTimeout) {
            clearTimeout(this.quoteTimeout);
        }

        this.isQuoteVisible = true;
        this.quoteTextElement.textContent = quote;

        if (mouseX !== null && mouseY !== null) {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const estimatedWidth = Math.min(400, viewportWidth * 0.8);
            const estimatedHeight = 100;

            let left = mouseX - estimatedWidth / 2;
            let top = mouseY - estimatedHeight / 2;

            left = Math.max(20, Math.min(left, viewportWidth - estimatedWidth - 20));
            top = Math.max(20, Math.min(top, viewportHeight - estimatedHeight - 20));

            this.motivationElement.style.left = left + 'px';
            this.motivationElement.style.top = top + 'px';
            this.motivationElement.style.transform = 'none';
        } else {
            this.motivationElement.style.left = '50%';
            this.motivationElement.style.top = '50%';
            this.motivationElement.style.transform = 'translate(-50%, -50%)';
        }

        this.motivationElement.classList.add('show');

        this.quoteTimeout = setTimeout(() => {
            this.motivationElement.classList.remove('show');
            this.isQuoteVisible = false;
            this.quoteTimeout = null;
        }, 3000);
    }

    getRandomMotivationQuote() {
        if (this.motivationQuotes.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * this.motivationQuotes.length);
        return this.motivationQuotes[randomIndex];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
});
