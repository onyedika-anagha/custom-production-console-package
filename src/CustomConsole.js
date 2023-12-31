class CustomConsole {
    constructor(errorEndpoint) {
        this.production = process.env.NODE_ENV === 'production';
        this.errorEndpoint = errorEndpoint || 'https://example.com/error-log';
    }

    log(...args) {
        if (this.production) {
            this.sendToServer('log', args.join(' '));
        } else {
            console.log(...args);
        }
    }

    error(...args) {
        if (this.production) {
            this.sendToServer('error', args.join(' '));
        } else {
            console.error(...args);
        }
    }

    sendToServer(type, message) {
        fetch(this.errorEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, message })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    }
}

module.exports = CustomConsole;
