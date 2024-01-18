import otpGenerator from 'otp-generator';

const generateOtp = async () => {
    try {
        const otp: number = Number(
            otpGenerator.generate(5, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
            })
        );
        return otp;
    } catch (error) {
        console.log('error generating otp', error);
    }
};

generateOtp();

export default generateOtp;
