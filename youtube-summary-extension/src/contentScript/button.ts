export const createMyButton = ({ text, onClick }: { text: string; onClick: () => void; }) => {
    const button = document.createElement('button');
    button.innerText = text;
    button.style.padding = '8px';
    button.style.margin = '4px';
    button.style.backgroundColor = '#FF0000';
    button.style.color = '#FFFFFF';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';

    button.addEventListener('click', onClick);

    return button;
};
