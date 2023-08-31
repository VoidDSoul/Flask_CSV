document.getElementById('csv-file').addEventListener('change', function() {
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = '';  // Clear the status message
    statusMessage.style.display = 'none';  // Hide the status message
});

document.getElementById('upload-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    try {
        const response = await fetch('/process', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.blob();
            const blob = new Blob([data], { type: 'text/csv' }); // Change the type to 'text/csv'
            const url = URL.createObjectURL(blob);

            const downloadButton = document.getElementById('download-button');
            downloadButton.href = url;
            downloadButton.style.display = 'block';

            const statusMessage = document.getElementById('status-message');
            statusMessage.textContent = 'File processed successfully!';
            statusMessage.style.color = 'green';
            statusMessage.style.display = 'block';

            // Reset the form after processing
            this.reset();
        } else {
            console.error('Server responded with an error:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
