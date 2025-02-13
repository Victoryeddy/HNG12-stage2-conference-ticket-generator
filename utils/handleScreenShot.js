import domtoimage from 'dom-to-image-more';

export const handleTicketDownload = async (elementRef) => {
    if (!elementRef) return;

    try {
        const dataUrl = await domtoimage.toPng(elementRef, {
            quality: 1, // High quality
            bgcolor: 'black', // Set a background color if needed
            filter: (node) => {
                // Optionally exclude elements if necessary
                return node.tagName !== 'BUTTON';
            }
        });

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'Ticket.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error taking screenshot:', error);
    }
};
