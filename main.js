const download = document.querySelector(".download");
const dark = document.querySelector('.dark');
const light = document.querySelector('.light');
const qrContainer = document.querySelector('#qr_code');
const qrText = document.querySelector('.qr_text');
const shareBtn = document.querySelector('.share_btn');
const sizes = document.querySelector('.sizes');

dark.addEventListener('input', handleDarkColor);
light.addEventListener('input', handleLightColor);
qrText.addEventListener('input', handleQRText);
sizes.addEventListener('change', handleSize);

const defaultUrl = 'https://google.com';

let colorLight = '#ffffff';
let colorDark = '#000000';
let text = defaultUrl;
let size = 300;

function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}


function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
    generateQRCode();
}


async function generateQRCode() {
    qrContainer.innerHTML = '';
    new QRCode('qr_code', {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl();
}


function handleSize(e) {
    size = e.target.value;
    generateQRCode();

}


function resolveDataUrl() {
    return new Promise((resolve, rejet) => {
        setTimeout(() => {
            const img = document.querySelector('#qr_code img');

            if (img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }

            const canvas = document.querySelector('canvas');
            resolve(canvas.toDataURL());

        })
    })
}