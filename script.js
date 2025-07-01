
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessageDiv = document.getElementById('error-message');

    const signupContainer = document.getElementById('signup-form-container');
    const successContainer = document.getElementById('success-container');

    // ATUALIZADO: URL do seu backend já configurada.
    const backendUrl = 'https://english-bot-766507386853.us-central1.run.app/onboarding/signup';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Ativando...';
        errorMessageDiv.classList.add('hidden');
        errorMessageDiv.textContent = '';

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            level: document.getElementById('level').value,
            style: document.getElementById('style').value,
            translation: document.querySelector('input[name="translation"]:checked').value === 'true',
            beta_code: document.getElementById('beta_code').value
        };

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                signupContainer.classList.add('hidden');
                successContainer.classList.remove('hidden');
            } else {
                const errorData = await response.json();
                let friendlyMessage = 'Ocorreu um erro. Tente novamente.';
                if (errorData.error === 'Invalid beta code.') {
                    friendlyMessage = 'O código beta informado é inválido.';
                }
                showError(friendlyMessage);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            showError('Não foi possível conectar ao servidor. Verifique sua conexão.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Ativar meu Acesso';
        }
    });

    function showError(message) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.classList.remove('hidden');
    }
});
