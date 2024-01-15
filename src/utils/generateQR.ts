import QRCode from 'qrcode';
const generateQRCode = async (table_number:number) => {
    try {
        const QR_Code:string=await QRCode.toDataURL(String(table_number));
        // console.log(QR_Code);
        return QR_Code;
        
    } catch (error) {
        console.log('Failed to generate QR_CODE:', error);
    }
}

// (async()=>{
//     const resp=await generateQRCode(5);
//     console.log(resp);
//     console.log(typeof resp);
// })()


export default generateQRCode;